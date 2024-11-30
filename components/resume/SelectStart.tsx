import { useState } from "react";
import { Text, View } from "react-native";

import { Pressable } from "@/components/resume/Pressable";
import {
	BlackButton,
	GameBoyScreenShieldBackgroundColor,
} from "@/components/resume/colors";
import { useSpacing } from "@/hooks/resume/dimensions";

function RotatedButton({ type }: { type: "select" | "start" }) {
	const { default: backgroundColor, pressed } = BlackButton;
	const { pad } = useSpacing();

	const [isPressed, setIsPressed] = useState(false);

	return (
		<View
			style={{
				transform: [{ rotate: "-21deg" }],
				alignItems: "center",
			}}
		>
			<Pressable
				type={type}
				setIsPressed={setIsPressed}
				style={{
					backgroundColor: `${GameBoyScreenShieldBackgroundColor}22`,
					padding: 4,
					borderRadius: pad(),
				}}
			>
				<View
					style={{
						width: pad(2),
						height: pad(0.5),
						borderRadius: pad(),
						backgroundColor: isPressed ? pressed : backgroundColor,
					}}
				/>
			</Pressable>
			<Text>{type.toUpperCase()}</Text>
		</View>
	);
}

export function SelectStart() {
	const { pad } = useSpacing();
	return (
		<View
			style={{
				width: "100%",
				flexDirection: "row",
				justifyContent: "center",
				gap: 2,
				marginVertical: pad(2),
				alignItems: "center",
			}}
		>
			<RotatedButton type="select" />
			<RotatedButton type="start" />
		</View>
	);
}
