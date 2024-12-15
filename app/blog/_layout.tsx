import { Stack } from "expo-router";
import React from "react";

import Shell from "@/components/blog/Shell";

export default function BlogLayout() {
	return (
		<Shell>
			<Stack screenOptions={{ headerShown: false }} />
		</Shell>
	);
}
