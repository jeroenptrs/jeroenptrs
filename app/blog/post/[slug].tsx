/// <reference types="react/canary" />

import { useLocalSearchParams } from "expo-router";
import React from "react";
import { ActivityIndicator, View } from "react-native";

import getBlogPostBySlug from "@/actions/getBlogPostBySlug";

export default function Slug() {
	const { slug } = useLocalSearchParams();

	return (
		<View>
			<React.Suspense
				fallback={
					// The view that will render while the Server Function is awaiting data.
					<ActivityIndicator />
				}
			>
				{getBlogPostBySlug(slug as string)}
			</React.Suspense>
		</View>
	);
}
