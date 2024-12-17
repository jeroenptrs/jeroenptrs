"use client";

import type { TextProps } from "react-native";

import Text from "@/components/site/Text";
import { twMerge } from "tailwind-merge";

export function H1({ isTitle, ...props }: TextProps & { isTitle?: true }) {
	return (
		<Text
			{...props}
			className={twMerge(
				"font-serif text-3xl",
				isTitle ? ["text-[--primary-color] mb-1"] : [],
				props.className,
			)}
		/>
	);
}

export function H2(props: TextProps) {
	return (
		<Text
			{...props}
			className={twMerge("font-serif text-2xl", props.className)}
		/>
	);
}

export function H3({
	isSubtitle,
	...props
}: TextProps & { isSubtitle?: true }) {
	return (
		<Text
			{...props}
			className={twMerge(
				"text-xl",
				isSubtitle ? ["opacity-65 mb-8"] : [],
				props.className,
			)}
		/>
	);
}
