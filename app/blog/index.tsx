/// <reference types="react/canary" />

import React from "react";
import { ActivityIndicator, View } from "react-native";
import getBlogPosts from "@/actions/getBlogPosts";

export default function Index() {
	return (
		<View>
			<React.Suspense
				fallback={
					// The view that will render while the Server Function is awaiting data.
					<ActivityIndicator />
				}
			>
				<View className="flex-col gap-8">{getBlogPosts()}</View>
			</React.Suspense>
		</View>
	);
}
