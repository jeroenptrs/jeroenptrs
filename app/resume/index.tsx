import { View } from "react-native";

import { AB } from "@/components/resume/AB";
import { DPad } from "@/components/resume/DPad";
import { Container } from "@/components/resume/GameBoyContainer";
import { GameView } from "@/components/resume/GameView";
import { SelectStart } from "@/components/resume/SelectStart";
import { useSpacing } from "@/hooks/resume/dimensions";

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
