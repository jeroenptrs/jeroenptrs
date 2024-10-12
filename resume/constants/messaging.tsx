import {
	type Dispatch,
	type PropsWithChildren,
	type SetStateAction,
	createContext,
	useState,
} from "react";

type PostMessage = (message: string) => void;
type SetPostMessage = Dispatch<SetStateAction<PostMessage>>;

function noopPostMessage(message: string) {}
function noopSetPostMessage(value: SetStateAction<PostMessage>) {}

export const PostMessageContext = createContext<[PostMessage, SetPostMessage]>([
	noopPostMessage,
	noopSetPostMessage,
]);

export function Provider({ children }: PropsWithChildren<unknown>) {
	const postMessageState = useState<PostMessage>(noopPostMessage);
	return (
		<PostMessageContext.Provider value={postMessageState}>
			{children}
		</PostMessageContext.Provider>
	);
}
