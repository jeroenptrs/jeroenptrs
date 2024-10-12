import { useState } from "react";
import { View } from "react-native";

import { BlackButton } from "@/constants/colors";
import { padFactory, useSpacing } from "@/constants/dimensions";
import { Pressable } from "@/components/Pressable";

function useButtonPadding() {
	const { pad } = useSpacing();
	const contentPadding = 4; // pad() / 6
	const buttonPadding = pad() + 2 * contentPadding;
	return {
		buttonPadding,
		contentPadding,
		pad: padFactory(buttonPadding),
	};
}

type ButtonType =
	| { type: undefined }
	| { type: "horizontal"; position: "left" | "right" }
	| { type: "vertical"; position: "up" | "down" };

function Button(props: ButtonType) {
	const { buttonPadding, contentPadding } = useButtonPadding();
	const [isPressed, setIsPressed] = useState(false);
	const { default: backgroundColor, pressed } = BlackButton;
	if (typeof props.type === "undefined") {
		return (
			<View
				style={{
					height: buttonPadding,
					width: buttonPadding,
					backgroundColor,
				}}
			/>
		);
	}

	const { type, position } = props;

	return (
		<Pressable
			type={position}
			setIsPressed={setIsPressed}
			style={{
				height: type === "vertical" ? buttonPadding * 1.5 : buttonPadding,
				width: type === "horizontal" ? buttonPadding * 1.5 : buttonPadding,
				padding: contentPadding,
				backgroundColor: isPressed ? pressed : backgroundColor,
				borderTopLeftRadius:
					position === "down" || position === "right" ? 0 : 2,
				borderTopRightRadius:
					position === "down" || position === "left" ? 0 : 2,
				borderBottomLeftRadius:
					position === "up" || position === "right" ? 0 : 2,
				borderBottomRightRadius:
					position === "up" || position === "left" ? 0 : 2,
				shadowColor: "black",
				shadowRadius: 2,
				shadowOffset: {
					width:
						position === "right"
							? contentPadding
							: position === "left"
								? -contentPadding / 2
								: 0,
					height:
						position === "down"
							? contentPadding
							: position !== "up"
								? contentPadding / 2
								: 0,
				},
				shadowOpacity: position !== "up" && !isPressed ? 0.1 : 0,
				top: position === "up" && isPressed ? 2 : 0,
				// left: position === "left" && isPressed ? contentPadding : 0,
			}}
		/>
	);
}

const MiddleButton = () => <Button type={undefined} />;

export function DPad() {
	const { pad } = useButtonPadding();

	return (
		<View
			style={{
				flexDirection: "column",
				alignItems: "center",
				width: pad(4),
				height: pad(4),
			}}
		>
			<Button type="vertical" position="up" />
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<Button type="horizontal" position="left" />
				<MiddleButton />
				<Button type="horizontal" position="right" />
			</View>
			<Button type="vertical" position="down" />
		</View>
	);
}
