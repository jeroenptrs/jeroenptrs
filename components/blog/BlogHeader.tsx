import { View } from "react-native";
import { Link } from "expo-router";

import Text from "@/components/site/Text";

export default function BlogHeader() {
	return (
		<View className="flex flex-1 flex-row justify-between items-center">
			<Text className="text-xl">
				<Link href="/blog">Jeroen Peeters' writing</Link>
			</Text>
			<View>
				<Text className="underline">
					<Link href="/">home</Link>
				</Text>
			</View>{" "}
			{/* TODO: switch theme */}
		</View>
	);
}
