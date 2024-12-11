import {
	rmSync,
	mkdirSync,
	readdirSync,
	renameSync,
	existsSync,
	lstatSync,
	copyFileSync,
} from "node:fs";
import { join } from "node:path";

const root = process.cwd();
const distPath = join(root, "dist");
const clientPath = join(distPath, "client");
const unusedIndexHtml = join(distPath, "index.html");
const clientIndexHtml = join(distPath, "client", "index.html");
const serverIndexHtml = join(distPath, "server", "index.html");

if (existsSync(unusedIndexHtml)) {
	rmSync(unusedIndexHtml);
}

if (!existsSync(clientIndexHtml)) {
	copyFileSync(serverIndexHtml, clientIndexHtml);
}

const distAssets = readdirSync(distPath);
const excludedPaths = ["client", "server"];
for (const asset of distAssets) {
	if (excludedPaths.includes(asset)) {
		continue;
	}

	const assetPath = join(distPath, asset);
	const assetInfo = lstatSync(assetPath);
	const targetPath = join(clientPath, asset);

	if (assetInfo.isFile()) {
		if (!existsSync(targetPath)) {
			renameSync(assetPath, targetPath);
		}
	}

	if (assetInfo.isDirectory()) {
		if (!existsSync(targetPath)) {
			mkdirSync(targetPath);
		}

		moveDir(asset);

		if (existsSync(assetPath)) {
			rmSync(assetPath, { recursive: true });
		}
	}
}

function moveDir(dirName) {
	const dirPath = join(distPath, dirName);
	const dirAssets = readdirSync(dirPath, { recursive: true });
	for (const asset of dirAssets) {
		const assetPath = join(dirPath, asset);
		const assetInfo = lstatSync(assetPath);
		const targetPath = join(clientPath, dirName, asset);

		if (assetInfo.isDirectory()) {
			if (!existsSync(targetPath)) {
				mkdirSync(targetPath);
			}
		}

		if (assetInfo.isFile()) {
			if (!existsSync(targetPath)) {
				renameSync(assetPath, targetPath);
			}
		}
	}

	if (existsSync(dirPath)) {
		rmSync(dirPath, { recursive: true });
	}
}
