import type { ReactNode } from "react";
import { View } from "react-native";
import Text from "../site/Text";

export function Callout({
	emoji,
	text,
}: {
	emoji: ReactNode;
	text: ReactNode;
}) {
	return (
		<View className="bg-[--card-color] p-4 rounded flex-row gap-8 items-center mb-8">
			<Text className="outline outline-1 outline-[--border-color] p-2 rounded h-fit">
				{emoji}
			</Text>
			<Text className="flex-1 leading-7">{text}</Text>
		</View>
	);
}
