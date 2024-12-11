// inspo https://github.com/heineiuo/expo-adapter-workers/blob/main/src/createRequestHandler.ts

import apiRoutesManifest from "../dist/server/apiRoutes";

interface Env {
	CLIENT: Fetcher;
}

function updateRequestWithConfig(
	request: Request,
	config: (typeof apiRoutesManifest)[number],
) {
	const params: Record<string, string> = {};
	const url = new URL(request.url);
	const match = config.namedRegex.exec(url.pathname);
	if (match?.groups) {
		for (const [key, value] of Object.entries(match.groups)) {
			const namedKey = config.routeKeys[key];
			params[namedKey] = value;
		}
	}

	return params;
}

export default {
	async fetch(request, env, ctx): Promise<Response> {
		const { pathname } = new URL(request.url);

		for await (const route of apiRoutesManifest) {
			if (!route.namedRegex.test(pathname)) {
				continue;
			}

			const fn = await route.module;

			if (fn instanceof Response) {
				return fn;
			}

			const routeHandler = fn?.[request.method];
			if (!routeHandler) {
				return new Response("Method not allowed", {
					status: 405,
					headers: {
						"Content-Type": "text/plain",
					},
				});
			}

			const params = updateRequestWithConfig(request, route);

			try {
				return (await routeHandler(request, params, env, ctx)) as Response;
			} catch (error) {
				if (error instanceof Error) {
					console.error("logApiRouteExecutionError", error);
				}

				return new Response("Internal server error", {
					status: 500,
					headers: {
						"Content-Type": "text/plain",
					},
				});
			}
		}

		// TODO: rsc logic

		return env.CLIENT.fetch(request);
	},
} satisfies ExportedHandler<Env>;
