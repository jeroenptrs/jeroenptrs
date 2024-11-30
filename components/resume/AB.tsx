import { useState } from "react";
import { Text, View } from "react-native";

import {
	GameBoyScreenShieldBackgroundColor,
	PurpleButton,
} from "@/components/resume/colors";
import { useSpacing } from "@/hooks/resume/dimensions";
import { Pressable } from "@/components/resume/Pressable";

function Circle({ type }: { type: "a" | "b" }) {
	const { default: backgroundColor, pressed } = PurpleButton;
	const { pad } = useSpacing();
	const [isPressed, setIsPressed] = useState(false);
	return (
		<Pressable
			type={type}
			setIsPressed={setIsPressed}
			style={{
				width: pad(2),
				height: pad(2),
				borderRadius: pad(),
				backgroundColor: isPressed ? pressed : backgroundColor,
			}}
		/>
	);
}

export function AB() {
	const { pad } = useSpacing();
	const thirdedPad = pad() / 3;
	const totalSize = 2 * (pad() + thirdedPad);
	return (
		<View
			style={{
				flexDirection: "column",
				width: pad(5.5),
				gap: 4,
				transform: [{ rotate: "-21deg" }, { translateY: pad() }],
			}}
		>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					backgroundColor: `${GameBoyScreenShieldBackgroundColor}22`,
					borderRadius: totalSize,
					padding: thirdedPad,
					height: totalSize,
				}}
			>
				<Circle type="a" />
				<Circle type="b" />
			</View>
			<View
				style={{
					flexDirection: "row",
					justifyContent: "space-between",
					marginHorizontal: pad() + 2,
				}}
			>
				<Text>A</Text>
				<Text>B</Text>
			</View>
		</View>
	);
}
