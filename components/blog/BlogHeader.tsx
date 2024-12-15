import { View } from "react-native";

import Text from "@/components/site/Text";

export default function BlogHeader() {
	return (
		<View className="flex flex-1 flex-row justify-between">
			<Text className="text-xl">Jeroen Peeters' blog</Text>
			<View /> {/* TODO: switch theme */}
		</View>
	);
}
