"use client";

import type { PropsWithChildren, ReactElement, ReactNode } from "react";

import Text from "@/components/site/Text";
import { Callout } from "@/components/blog/Callout";
import { View } from "react-native";
import { type ExternalPathString, Link } from "expo-router";
import { twMerge } from "tailwind-merge";

export function Span({ children }: PropsWithChildren<unknown>) {
	return <Text className="leading-7">{children}</Text>;
}

export function Paragraph({ children }: PropsWithChildren<unknown>) {
	return <Text className="block mb-8 leading-7">{children}</Text>;
}

export function HR({ className }: { className?: string }) {
	return (
		<View
			className={twMerge("block mb-8 h-0.5 bg-[--card-color]", className)}
		/>
	);
}

export function Anchor({
	href,
	children,
}: PropsWithChildren<{ title: string; href: string }>) {
	return (
		<Text className="leading-7 underline">
			<Link
				href={href as ExternalPathString}
				target="_blank"
				rel="noopener noreferrer"
			>
				{children}
			</Link>
		</Text>
	);
}

export function Img({
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
			title={alt}
			className="my-4 w-full rounded outline outline-4 outline-[--border-color]"
		/>
	);
}

export function Div(props: PropsWithChildren<{ "data-node-type"?: string }>) {
	if ("data-node-type" in props) {
		const isCallout = props["data-node-type"] === "callout";

		if (isCallout) {
			const [calloutEmoji, calloutText] = props.children as [
				ReactElement,
				ReactElement,
			];

			return (
				<Callout
					emoji={calloutEmoji.props.children}
					text={calloutText.props.children}
				/>
			);
		}
	}

	return <div {...props} />;
}
