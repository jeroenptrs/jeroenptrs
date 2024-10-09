import { Provider } from "@/constants/messaging";
import { Stack } from "expo-router";

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
