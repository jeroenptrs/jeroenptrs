import { DefaultTheme, ThemeProvider } from "@react-navigation/native";
import { Stack } from "expo-router";

import { Provider } from "@/state/resume/messaging";
import "@/assets/css/resume/index.css";

export default function RootLayout() {
	return (
		<ThemeProvider value={DefaultTheme}>
			<Provider>
				<Stack screenOptions={{ headerShown: false }} />
			</Provider>
		</ThemeProvider>
	);
}
