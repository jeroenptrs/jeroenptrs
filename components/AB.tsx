import { useCallback, useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";

import {
	GameBoyScreenShieldBackgroundColor,
	PurpleButton,
} from "@/constants/colors";
import { useSpacing } from "@/constants/dimensions";
import { PostMessageContext } from "@/constants/messaging";

function Circle({type}: { type: "a" | "b" }) {
	const { default: backgroundColor, pressed } = PurpleButton;
	const { pad } = useSpacing();
	const [postMessage] = useContext(PostMessageContext);
	const [isPressed, setIsPressed] = useState(false);
	const pressIn = useCallback(() => {
		setIsPressed(true);
		postMessage(`${type}-true`);
	}, [postMessage]);
	const pressOut = useCallback(() => {
		setIsPressed(false);
		postMessage(`${type}-false`);
	}, [postMessage]);
	return (
		<Pressable
			onPressIn={pressIn}
			onPressOut={pressOut}
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
