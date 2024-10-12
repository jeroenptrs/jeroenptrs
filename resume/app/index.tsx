import { View } from "react-native";

import { AB } from "@/components/AB";
import { DPad } from "@/components/DPad";
import { Container } from "@/components/GameBoyContainer";
import { GameView } from "@/components/GameView";
import { SelectStart } from "@/components/SelectStart";
import { useSpacing } from "@/constants/dimensions";

export default function Index() {
	const { pad } = useSpacing();
	return (
		<Container>
			<GameView />
			<View
				style={{
					width: "100%",
					flexDirection: "row",
					justifyContent: "space-between",
					marginTop: pad(4),
					alignSelf: "center",
				}}
			>
				<DPad />
				<AB />
			</View>
			<SelectStart />
		</Container>
	);
}
