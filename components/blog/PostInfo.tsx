"use client";

import { View } from "react-native";
import { type ExternalPathString, Link } from "expo-router";

import Text from "@/components/site/Text";

type PostInfo = {
	likeCount?: number;
	repostCount?: number;
	replyCount?: number;
};

export function PostInfo({
	uri,
	post,
}: {
	uri: string;
	post: PostInfo;
}) {
	return (
		<Link
			href={uri as ExternalPathString}
			target="_blank"
			rel="noreferrer noopener"
			className="flex items-center hover:underline gap-2 text-lg"
		>
			<View className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					className="size-5 fill-[--primary-color] stroke-[--primary-color]"
				>
					<title>Like</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
					/>
				</svg>

				<Text className="ml-1">{post.likeCount ?? 0} likes</Text>
			</View>
			<View className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="none"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					className="size-5 stroke-[--primary-color]"
				>
					<title>Repost</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
					/>
				</svg>
				<Text className="ml-1">{post.repostCount ?? 0} reposts</Text>
			</View>
			<View className="flex items-center">
				<svg
					xmlns="http://www.w3.org/2000/svg"
					fill="currentColor"
					stroke="currentColor"
					viewBox="0 0 24 24"
					stroke-width="1.5"
					className="size-5 fill-[--primary-color] stroke-[--primary-color]"
				>
					<title>Reply</title>
					<path
						stroke-linecap="round"
						stroke-linejoin="round"
						d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
					/>
				</svg>
				<Text className="ml-1">{post.replyCount ?? 0} replies</Text>
			</View>
		</Link>
	);
}
