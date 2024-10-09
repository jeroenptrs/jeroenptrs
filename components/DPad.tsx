import { useCallback, useState } from "react";
import { Pressable, View } from "react-native";

import { BlackButton } from "@/constants/colors";
import { padFactory, useSpacing } from "@/constants/dimensions";

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
	| { type: "vertical"; position: "top" | "bottom" };

function Button(props: ButtonType) {
	const { buttonPadding, contentPadding } = useButtonPadding();
	const [isPressed, setIsPressed] = useState(false);
	const pressIn = useCallback(() => {
		setIsPressed(true);
	}, []);
	const pressOut = useCallback(() => {
		setIsPressed(false);
	}, []);
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

	// todo View -> Pressable
	return (
		<Pressable
			onPressIn={pressIn}
			onPressOut={pressOut}
			style={{
				height: type === "vertical" ? buttonPadding * 1.5 : buttonPadding,
				width: type === "horizontal" ? buttonPadding * 1.5 : buttonPadding,
				padding: contentPadding,
				backgroundColor: isPressed ? pressed : backgroundColor,
				borderTopLeftRadius:
					position === "bottom" || position === "right" ? 0 : 2,
				borderTopRightRadius:
					position === "bottom" || position === "left" ? 0 : 2,
				borderBottomLeftRadius:
					position === "top" || position === "right" ? 0 : 2,
				borderBottomRightRadius:
					position === "top" || position === "left" ? 0 : 2,
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
						position === "bottom"
							? contentPadding
							: position !== "top"
								? contentPadding / 2
								: 0,
				},
				shadowOpacity: position !== "top" && !isPressed ? 0.1 : 0,
				top: position === "top" && isPressed ? 2 : 0,
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
			<Button type="vertical" position="top" />
			<View
				style={{
					flexDirection: "row",
				}}
			>
				<Button type="horizontal" position="left" />
				<MiddleButton />
				<Button type="horizontal" position="right" />
			</View>
			<Button type="vertical" position="bottom" />
		</View>
	);
}
