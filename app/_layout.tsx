import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import { useColorScheme } from "nativewind";
import { useEffect } from "react";

import "../global.css";
import { useTailwind } from "@/hooks/useTailwind";

export default function RootLayout() {
	const config = useTailwind();
	const { colorScheme, setColorScheme } = useColorScheme();

	useEffect(() => {
		// TODO: allow theme switching, for now stay on dark mode
		setColorScheme("dark");
	}, []);

	const siteTheme = {
		light: {
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
			},
		},
		dark: {
			...DarkTheme,
			colors: {
				...DarkTheme.colors,
				background: "rgb(19, 23, 31)",
				card: config.theme.colors.slate[900],
				text: "#fff",
			},
		},
	};

	return (
		<ThemeProvider value={siteTheme[colorScheme as "light" | "dark"]}>
			<Head>
				<title>Jeroen Peeters</title>
			</Head>
			<Stack screenOptions={{ headerShown: false }} />
		</ThemeProvider>
	);
}
