interface Env {
	ASSETS: Fetcher;
}

export default {
	async fetch(request, env): Promise<Response> {
		// TODO: rsc logic
		// const url = new URL(request.url);
		// if (url.pathname.startsWith("/api/")) {
		// 	// TODO: Add your custom /api/* logic here.
		// 	return new Response("Ok");
		// }

		// Passes the incoming request through to the assets binding.
		// No asset matched this request, so this will evaluate `not_found_handling` behavior.
		return env.ASSETS.fetch(request);
	},
} satisfies ExportedHandler<Env>;
