import { useCallback, useContext } from "react";
import { type PressableProps, Pressable as RNPressable } from "react-native";

import { PostMessageContext } from "@/state/resume/messaging";

type Props = PressableProps & {
	type: string;
	setIsPressed: (pressed: boolean) => void;
};

export function Pressable({ type, setIsPressed, ...props }: Props) {
	const [postMessage] = useContext(PostMessageContext);
	const pressIn = useCallback(() => {
		setIsPressed(true);
		postMessage(`${type}-true`);
	}, [postMessage, setIsPressed, type]);
	const pressOut = useCallback(() => {
		setIsPressed(false);
		postMessage(`${type}-false`);
	}, [postMessage, setIsPressed, type]);

	return (
		<RNPressable
			{...props}
			onPressIn={pressIn}
			onPressOut={pressOut}
			onPress={pressOut}
			pressRetentionOffset={0}
			hitSlop={0}
		/>
	);
}
