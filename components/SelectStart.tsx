import { useCallback, useContext, useState } from "react";
import { Pressable, Text, View } from "react-native";

import {
	BlackButton,
	GameBoyScreenShieldBackgroundColor,
} from "@/constants/colors";
import { useSpacing } from "@/constants/dimensions";
import { PostMessageContext } from "@/constants/messaging";

function RotatedButton({ type }: { type: "select" | "start" }) {
	const { default: backgroundColor, pressed } = BlackButton;
	const { pad } = useSpacing();
	const [postMessage] = useContext(PostMessageContext);

	const [isPressed, setIsPressed] = useState(false);
	const pressIn = useCallback(() => {
		setIsPressed(true);
		postMessage(`${type}-true`);
	}, [postMessage, type]);
	const pressOut = useCallback(() => {
		setIsPressed(false);
		postMessage(`${type}-false`);
	}, [postMessage, type]);
	return (
		<View
			style={{
				transform: [{ rotate: "-21deg" }],
				alignItems: "center",
			}}
		>
			<Pressable
				onPressIn={pressIn}
				onPressOut={pressOut}
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
