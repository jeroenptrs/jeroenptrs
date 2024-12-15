"use client";

import { Text as _Text, type TextProps } from "react-native";
import { twMerge } from "tailwind-merge";

export default function Text(props: TextProps) {
	return (
		<_Text
			{...props}
			selectable
			className={twMerge(
				"text-[--text-color] text-base font-sans",
				props.className,
			)}
		/>
	);
}
