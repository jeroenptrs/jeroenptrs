import {
	DarkTheme,
	DefaultTheme,
	ThemeProvider,
} from "@react-navigation/native";
import { Stack } from "expo-router";
import Head from "expo-router/head";
import { useColorScheme } from "nativewind";

import "../global.css";
import { useTailwind } from "@/hooks/useTailwind";

export default function RootLayout() {
	const config = useTailwind();
	const { colorScheme } = useColorScheme();

	const siteTheme = {
		light: {
			...DefaultTheme,
			colors: {
				...DefaultTheme.colors,
				border: config.theme.colors.gray[100],
				primary: config.theme.colors.teal[350],
			},
		},
		dark: {
			...DarkTheme,
			colors: {
				...DarkTheme.colors,
				border: config.theme.colors.slate[850],
				background: "rgb(19, 23, 31)",
				card: config.theme.colors.slate[900],
				text: config.theme.colors.white,
				primary: config.theme.colors.teal[250],
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
