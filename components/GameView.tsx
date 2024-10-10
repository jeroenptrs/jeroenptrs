import { useContext, useEffect, useRef } from "react";
import { Platform, View } from "react-native";
import { WebView } from "react-native-webview";

import {
	GameBoyScreenShieldBackgroundColor,
	GameBoyScreenShieldBlueStripe,
	GameBoyScreenShieldPurpleStripe,
} from "@/constants/colors";
import { useSpacing } from "@/constants/dimensions";
import { PostMessageContext } from "@/constants/messaging";

export function GameView() {
	const { dimensions, pad } = useSpacing();
	const [, setPostMessage] = useContext(PostMessageContext);
	const rnWebviewRef = useRef<WebView>();
	const iFrameRef = useRef<HTMLIFrameElement>();

	const isWeb = Platform.OS === "web";
	const uri = "https://jeroenpeeters.be/game";
	const rootOrigin = isWeb ? location.href : "";

	useEffect(() => {
		if (isWeb) {
			function postMessage(message: string) {
				iFrameRef.current?.contentWindow?.postMessage(message, rootOrigin);
			}

			setPostMessage(() => postMessage);
		} else {
			function postMessage(message: string) {
				rnWebviewRef.current?.postMessage(message);
			}

			setPostMessage(() => postMessage);
		}
	}, [isWeb, rootOrigin, setPostMessage]);

	return (
		<View
			style={{
				display: "flex",
				alignItems: "center",
				backgroundColor: GameBoyScreenShieldBackgroundColor,
				paddingBottom: pad(),
				height: dimensions.h + pad(2),
				maxHeight: dimensions.h + pad(2),
				width: dimensions.w + pad(4),
				borderRadius: pad() / 3,
				borderBottomRightRadius: pad(),
			}}
		>
			<View
				style={{
					height: pad(),
					maxHeight: pad(),
					width: "100%",
					flexDirection: "column",
					gap: pad(0.25),
					paddingVertical: pad() / 3,
					paddingHorizontal: pad(0.5),
				}}
			>
				<View
					style={{
						height: 1,
						width: "100%",
						backgroundColor: GameBoyScreenShieldPurpleStripe,
					}}
				/>
				<View
					style={{
						height: 1,
						width: "100%",
						backgroundColor: GameBoyScreenShieldBlueStripe,
					}}
				/>
			</View>
			<View
				style={{
					paddingHorizontal: pad(2),
				}}
			>
				{isWeb ? (
					<iframe
						ref={iFrameRef}
						src={uri}
						title="iframe containing my resume in game form!"
						style={{
							border: 0,
							width: dimensions.w,
							height: dimensions.h,
							maxHeight: dimensions.h,
						}}
					/>
				) : (
					<WebView
						ref={rnWebviewRef}
						javaScriptEnabled
						webviewDebuggingEnabled
						source={{ uri }}
						originWhitelist={["*"]}
						style={{
							width: dimensions.w,
							height: dimensions.h,
							maxHeight: dimensions.h,
						}}
					/>
				)}
			</View>
		</View>
	);
}
