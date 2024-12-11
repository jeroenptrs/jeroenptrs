import { promises as fs } from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distPath = join(root, "dist", "server");

async function createManifest() {
	const routesManifest = await import(`${distPath}/_expo/routes.json`, {
		assert: { type: "json" },
	});

	const apiRoutes = routesManifest.default.apiRoutes
		.map((route) => {
			return `  {
    file: "${route.file}",
    page: "${route.page}",
    namedRegex: new RegExp("${route.namedRegex}"),
    routeKeys: ${JSON.stringify(route.routeKeys)},
    module: import("./${route.file}"),
  },`;
		})
		.join("\n");

	const generated = `export default [
${apiRoutes}
] as Array<{
	file: string;
	page: string;
	namedRegex: RegExp;
	routeKeys: Record<string, string>;
	module: Promise<any>;
}>;
`;

	await fs.writeFile(join(distPath, "./apiRoutes.ts"), generated);

	await createRscImportFlow();
	await replaceRootWithSitePath();
}

async function getPre(rscFile, internalFiles) {
	const requireExternalIngest = "$$require_external('";
	const externalModuleNames = [];
	let externalModuleStartIndex = rscFile.indexOf(requireExternalIngest);
	while (externalModuleStartIndex !== -1) {
		const externalModuleEndIndex = rscFile.indexOf(
			"'",
			externalModuleStartIndex + requireExternalIngest.length,
		);
		externalModuleNames.push(
			rscFile.substring(
				externalModuleStartIndex + requireExternalIngest.length,
				externalModuleEndIndex,
			),
		);
		externalModuleStartIndex = rscFile.indexOf(
			requireExternalIngest,
			externalModuleStartIndex + 1,
		);
	}

	const mappedExternalModules = externalModuleNames.map((moduleName) => {
		const depConstName = `INTERNAL_${moduleName.replace(":", "_").toUpperCase()}`;
		return {
			depImport: `const ${depConstName} = require("${moduleName}");`,
			depKv: `    "${moduleName}": ${depConstName},`,
		};
	});

	if (internalFiles) {
		for (const fileName of internalFiles) {
			const fileConstName = fileName
				.replaceAll("/", "_")
				.replaceAll("-", "_")
				.toUpperCase();
			mappedExternalModules.push({
				depImport: `const ${fileConstName} = import("../../${fileName}");`,
				depKv: `    "${fileName}": ${fileConstName},`,
			});
		}
	}

	return `${mappedExternalModules.map(({ depImport }) => depImport).join("\n")}
function internal_require(internal_module_name) {
  const internal_module_map = {
${mappedExternalModules.map(({ depKv }) => depKv).join("\n")}
	}
  const internal_module_mapped_name = Object.keys(internal_module_map).find(internal_module_map_name =>\`\${ internal_module_name }\`.includes(internal_module_map_name));
  return internal_module_map[internal_module_mapped_name];
}
`;
}

async function createRscImportFlow() {
	// current assumption is that the only targets are [...rsc.js] and router.js
	// should this change, best to make it a bit more programmatically (should that be possible)

	// [...rsc.js]
	const rscFilePath = join(
		distPath,
		"_expo",
		"functions",
		"_flight",
		"[...rsc].js",
	);

	const rscWebDirPath = join(distPath, "_expo", "rsc", "web");
	const rscWebDirFiles = await fs.readdir(rscWebDirPath);
	const rscFile = await fs.readFile(rscFilePath, { encoding: "utf-8" });
	const rscFilePre = await getPre(
		rscFile,
		rscWebDirFiles.map((fileName) => `rsc/web/${fileName.replace(".js", "")}`),
	);

	await fs.writeFile(
		rscFilePath,
		`${rscFilePre}${rscFile
			.replace(
				"$$require_external=require",
				"$$$$require_external=internal_require",
			)
			.replace("await import(", "await $$$$require_external(")}`,
		{ encoding: "utf-8" },
	);

	// router.js
	const routerFilePath = join(rscWebDirPath, "router.js");
	const routerFile = await fs.readFile(routerFilePath, { encoding: "utf-8" });
	const routerFilePre = await getPre(routerFile);
	await fs.writeFile(
		routerFilePath,
		`${routerFilePre}${routerFile.replace(
			"exports=$$require_external",
			"exports=internal_require",
		)}`,
		{ encoding: "utf-8" },
	);
}

async function replaceRootWithSitePath() {
	async function replacer(dirPath, dirFiles) {
		for await (const dirFile of dirFiles) {
			const openedFile = await fs.readFile(join(dirPath, dirFile), {
				encoding: "utf-8",
			});

			if (openedFile.includes(root)) {
				await fs.writeFile(
					join(dirPath, dirFile),
					openedFile.replaceAll(root, "/be/jeroenpeeters"),
					{ encoding: "utf-8" },
				);
			}
		}
	}

	const clientPath = join(
		root,
		"dist",
		"client",
		"_expo",
		"static",
		"js",
		"web",
	);
	const serverPath = distPath;

	const clientFiles = (
		await fs.readdir(clientPath, {
			recursive: true,
		})
	).filter((dirent) => dirent.endsWith(".js"));

	await replacer(clientPath, clientFiles);

	const serverFiles = (
		await fs.readdir(serverPath, {
			recursive: true,
		})
	).filter((dirent) => dirent.endsWith(".js"));

	await replacer(serverPath, serverFiles);
}

createManifest();
