import { DeviceType, deviceType } from "expo-device";
import type { PropsWithChildren } from "react";
import { View } from "react-native";
import { useSafeAreaInsets } from "react-native-safe-area-context";

import { BackgroundColor, GameBoyBackgroundColor } from "@/constants/colors";
import { useSpacing } from "@/constants/dimensions";

export function Container({ children }: PropsWithChildren<unknown>) {
	const insets = useSafeAreaInsets();
	const { dimensions, isSmallScreen, pad } = useSpacing();
	const showOuter = deviceType !== DeviceType.PHONE && !isSmallScreen;
	return (
		<View
			style={{
				flex: 1,
				backgroundColor: isSmallScreen
					? GameBoyBackgroundColor
					: BackgroundColor,
				alignItems: "center",
				justifyContent: "center",
			}}
		>
			<View
				style={[
					{
						backgroundColor: GameBoyBackgroundColor,
						display: "flex",
						alignItems: "center",
						padding: pad(),
						paddingTop: insets.top > 0 ? insets.top : undefined,
						width: dimensions.w + pad(6),
					},
					showOuter
						? {
								borderRadius: pad() / 3,
								borderBottomRightRadius: pad(),
								shadowColor: "black",
								shadowOffset: {
									width: 4,
									height: 4,
								},
								shadowRadius: 8,
								shadowOpacity: 0.5,
							}
						: {
								height: "100%",
								justifyContent: "center",
							},
				]}
			>
				{children}
			</View>
		</View>
	);
}
