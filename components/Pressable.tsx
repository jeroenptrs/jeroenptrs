import { useCallback, useContext } from "react";
import { Pressable as RNPressable, PressableProps } from "react-native";

import { PostMessageContext } from "@/constants/messaging";

type Props = PressableProps & {
  type: string;
  setIsPressed: (pressed: boolean) => void;
};

export function Pressable({ type, setIsPressed, ...props }: Props) {
  const [postMessage] = useContext(PostMessageContext);
  const pressIn = useCallback(() => {
    setIsPressed(true);
    postMessage(`${type}-true`);
  }, [postMessage]);
  const pressOut = useCallback(() => {
    setIsPressed(false);
    postMessage(`${type}-false`);
  }, [postMessage]);

  return <RNPressable {...props} onPressIn={pressIn} onPressOut={pressOut} />;
}
