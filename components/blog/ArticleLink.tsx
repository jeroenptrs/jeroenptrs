"use client";

import { Link, type LinkProps } from "expo-router";
import { twMerge } from "tailwind-merge";

import Text from "@/components/site/Text";
import { useFormatDate } from "@/hooks/useFormatDate";

export default function ArticleLink(props: {
	href: string;
	title: string;
	className?: string;
	publishedAt: string;
}) {
	const date = useFormatDate(new Date(props.publishedAt));
	return (
		<Link
			href={props.href as LinkProps["href"]}
			className={twMerge("flex flex-col gap-2", props.className)}
		>
			<Text className="font-serif text-3xl text-[--primary-color]">
				{props.title}
			</Text>
			<Text className="text-[--text-color]">{date}</Text>
		</Link>
	);
}
