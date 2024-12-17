"use client";

import { Link } from "expo-router";
import { twMerge } from "tailwind-merge";

import Text from "@/components/site/Text";
import { useFormatDate } from "@/hooks/useFormatDate";

export default function ArticleLink(props: {
	href: string;
	title: string;
	description: string;
	className?: string;
	publishedAt: string;
}) {
	const date = useFormatDate(new Date(props.publishedAt));
	return (
		<Link
			href={`/blog/post/${props.href}`}
			className={twMerge("flex flex-col gap-2", props.className)}
		>
			<Text className="font-serif text-3xl leading-7 text-[--primary-color]">
				{props.title}
			</Text>
			<Text className="opacity-65">{date}</Text>
			<Text>{props.description}</Text>
		</Link>
	);
}
