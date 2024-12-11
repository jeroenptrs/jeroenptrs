/// <reference types="react/canary" />

import React from "react";
import { ActivityIndicator } from "react-native";

import renderPokemon from "@/actions/renderPokemon";

function getRandomInt(_min: number, _max: number) {
	const min = Math.ceil(_min);
	const max = Math.floor(_max);
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

export default function Index() {
	const n = getRandomInt(1, 1025);
	return (
		<React.Suspense
			fallback={
				// The view that will render while the Server Function is awaiting data.
				<ActivityIndicator />
			}
		>
			{renderPokemon({ n })}
		</React.Suspense>
	);
}
