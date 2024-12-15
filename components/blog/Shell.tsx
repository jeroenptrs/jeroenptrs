"use client";

import { ScrollView, View, type ViewProps } from "react-native";
import { twMerge } from "tailwind-merge";
import { vars } from "nativewind";

import BlogHeader from "@/components/blog/BlogHeader";
import { useThemeVars } from "@/constants/useThemeVars";

export default function Shell(props: ViewProps) {
	const themeVars = useThemeVars();
	return (
		<ScrollView className="overflow-y-scroll" style={vars(themeVars)}>
			<View className="block">
				<View
					className={twMerge(
						"max-w-2xl flex-col mx-auto px-5 py-7 pt-12",
						props.className,
					)}
				>
					<BlogHeader />
				</View>
				<View className="block">
					<View
						{...props}
						className={twMerge(
							"max-w-2xl flex-1 flex-col mx-auto px-5 py-7 pb-12",
							props.className,
						)}
					/>
				</View>
			</View>
		</ScrollView>
	);
}
