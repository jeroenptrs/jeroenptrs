"use server";

import { Pokemon } from "@/components/test/Pokemon";

export default async function renderPokemon({ n }: { n: number }) {
	// Securely fetch data from an API, and read environment variables...
	return <Pokemon n={n} />;
}
