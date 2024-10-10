import { Stack } from "expo-router";

import "@/assets/css/index.css";
import { Provider } from "@/constants/messaging";

export default function RootLayout() {
	return (
		<Provider>
			<Stack>
				<Stack.Screen
					name="index"
					options={{
						headerShown: false,
					}}
				/>
			</Stack>
		</Provider>
	);
}
