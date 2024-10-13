import { createRootRoute } from "@tanstack/react-router";
import { Outlet, ScrollRestoration } from "@tanstack/react-router";
import { Body, Head, Html, Meta, Scripts } from "@tanstack/start";

import stylesCss from "../styles.css?url";

export const Route = createRootRoute({
	meta: () => [
		{
			charSet: "utf-8",
		},
		{
			name: "viewport",
			content: "width=device-width, initial-scale=1",
		},
		{
			title: "jeroenpeeters.be",
		},
	],
	links: () => [
		{
			rel: "shortcut icon",
			href: "/favicon.ico",
		},
		{
			rel: "preconnect",
			href: "https://fonts.googleapis.com",
		},
		{
			rel: "preconnect",
			href: "https://fonts.gstatic.com",
			crossOrigin: "",
		},
		{
			rel: "stylesheet",
			href: "https://fonts.googleapis.com/css2?family=Noto+Sans:ital,wght@0,100..900;1,100..900&family=Noto+Serif:wght@600&display=swap",
		},
		{
			rel: "preload",
			href: stylesCss,
			as: "style",
		},
		{
			rel: "stylesheet",
			href: stylesCss,
		},
	],
	component: RootComponent,
});

function RootComponent() {
	return (
		<RootDocument>
			<Outlet />
		</RootDocument>
	);
}

function RootDocument({ children }: { children: React.ReactNode }) {
	return (
		<Html>
			<Head>
				<Meta />
			</Head>
			<Body>
				{children}
				<ScrollRestoration />
				<Scripts />
			</Body>
		</Html>
	);
}
