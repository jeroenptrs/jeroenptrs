import "server-only";

import { Image, Text, View } from "react-native";

export async function Pokemon({ n }: { n: number }) {
	const res = await fetch(`https://pokeapi.co/api/v2/pokemon/${n}`);
	const json = await res.json();
	return (
		<View style={{ padding: 8, borderWidth: 1 }}>
			<Text style={{ fontWeight: "bold", fontSize: 24, color: "#ffffff" }}>
				{json.name}
			</Text>
			<Image
				source={{ uri: json.sprites.front_default }}
				style={{ width: 100, height: 100 }}
			/>

			{json.abilities.map((ability) => (
				<Text key={ability.ability.name} style={{ color: "#ffffff" }}>
					- {ability.ability.name}
				</Text>
			))}
		</View>
	);
}
