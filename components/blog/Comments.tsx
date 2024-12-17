"use client";

import {
	AppBskyFeedDefs,
	AppBskyFeedPost,
	type AppBskyFeedGetPostThread,
} from "@atproto/api";
import { type ExternalPathString, Link } from "expo-router";
import { View } from "react-native";

import { H2 } from "@/components/blog/Headers";
import { HR } from "@/components/blog//mdTags";
import Text from "@/components/site/Text";

const sortByLikes = (a: unknown, b: unknown) => {
	if (
		!AppBskyFeedDefs.isThreadViewPost(a) ||
		!AppBskyFeedDefs.isThreadViewPost(b)
	) {
		return 0;
	}
	return (b.post.likeCount ?? 0) - (a.post.likeCount ?? 0);
};

function Comment({ comment }: { comment: AppBskyFeedDefs.ThreadViewPost }) {
	const author = comment.post.author;
	const avatarClassName = "h-4 w-4 shrink-0 rounded-full bg-gray-300";

	if (!AppBskyFeedPost.isRecord(comment.post.record)) return null;

	return (
		<View className="my-4 text-sm">
			<View className="flex max-w-xl flex-col gap-2">
				<Link
					className="flex flex-row items-center gap-2 hover:underline"
					href={`https://bsky.app/profile/${author.did}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					{author.avatar ? (
						<img
							src={comment.post.author.avatar}
							alt="avatar"
							className={avatarClassName}
						/>
					) : (
						<View className={avatarClassName} />
					)}
					<Text className="line-clamp-1">
						{author.displayName ?? author.handle}{" "}
						<Text className="text-[--text-color] opacity-65">
							@{author.handle}
						</Text>
					</Text>
				</Link>
				<Link
					href={`https://bsky.app/profile/${author.did}/post/${comment.post.uri.split("/").pop()}`}
					target="_blank"
					rel="noreferrer noopener"
				>
					<Text>{comment.post.record.text}</Text>
					<Actions post={comment.post} />
				</Link>
			</View>
			{comment.replies && comment.replies.length > 0 && (
				<View className="mt-4 border-l-2 border-[--border-color] pl-4">
					{comment.replies.sort(sortByLikes).map((reply) => {
						if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null;
						return <Comment key={reply.post.uri} comment={reply} />;
					})}
				</View>
			)}
		</View>
	);
}

const Actions = ({ post }: { post: AppBskyFeedDefs.PostView }) => (
	<View className="mt-2 flex w-full max-w-[150px] flex-row items-center justify-between opacity-60">
		<View className="flex flex-row items-center gap-1.5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				className="size-4 stroke-[--primary-color]"
			>
				<title>Reply</title>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
				/>
			</svg>

			<Text className="text-xs">{post.replyCount ?? 0}</Text>
		</View>
		<View className="flex flex-row items-center gap-1.5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="size-4 stroke-[--primary-color]"
			>
				<title>Repost</title>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
				/>
			</svg>
			<Text className="text-xs">{post.repostCount ?? 0}</Text>
		</View>
		<View className="flex flex-row items-center gap-1.5">
			<svg
				xmlns="http://www.w3.org/2000/svg"
				fill="none"
				viewBox="0 0 24 24"
				stroke-width="1.5"
				stroke="currentColor"
				className="size-4 stroke-[--primary-color]"
			>
				<title>Like</title>
				<path
					stroke-linecap="round"
					stroke-linejoin="round"
					d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
				/>
			</svg>
			<Text className="text-xs">{post.likeCount ?? 0}</Text>
		</View>
	</View>
);

export function Comments({
	uri,
	replies,
}: { uri: string; replies: AppBskyFeedDefs.ThreadViewPost["replies"] }) {
	const sortedReplies = (replies ?? [])?.sort(sortByLikes);

	return (
		<>
			<H2 className="mt-8">Comments</H2>
			<Text className="mt-2 text-sm">
				Reply on Bluesky{" "}
				<Link
					href={uri as ExternalPathString}
					className="underline"
					target="_blank"
					rel="noreferrer noopener"
				>
					here
				</Link>{" "}
				to join the conversation.
			</Text>
			<HR className="mt-4 mb-4 bg-[--primary-color] opacity-35" />
			{sortedReplies.map((reply) => {
				if (!AppBskyFeedDefs.isThreadViewPost(reply)) return null;
				return <Comment key={reply.post.uri} comment={reply} />;
			})}
		</>
	);
}
