"use client";

import type { PropsWithChildren } from "react";

import Text from "@/components/site/Text";

export function Paragraph({ children }: PropsWithChildren<unknown>) {
	return <Text className="block mb-2">{children}</Text>;
}

export function Img({
	title,
	alt,
	src,
}: {
	title?: string;
	alt?: string;
	src: string;
}) {
	return (
		<img
			src={src}
			alt={alt}
			title={title}
			className="my-4 max-w-[42rem] mx-auto"
		/>
	);
}
