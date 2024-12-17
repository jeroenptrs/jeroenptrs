"use server";

import { View } from "react-native";
import request from "graphql-request";
import Markdown from "markdown-to-jsx";
import { AppBskyFeedDefs, type AppBskyFeedGetPostThread } from "@atproto/api";

import {
	HASHNODE_GQL_ENDPOINT,
	HASHNODE_PUBLICATION_HOST,
} from "@/constants/hashnode";
import { SinglePostByPublicationDocument } from "@/generated/graphql";
import { H1, H2, H3 } from "@/components/blog/Headers";
import {
	Anchor,
	Div,
	HR,
	Img,
	Paragraph,
	Span,
} from "@/components/blog/mdTags";
import Text from "@/components/site/Text";
import { useFormatDate } from "@/hooks/useFormatDate";
import { Comments } from "@/components/blog/Comments";
import { PostInfo } from "@/components/blog/PostInfo";
import { ArticleHead } from "@/components/blog/ArticleHead";

const getPostThread = async (postKey: string) => {
	const res = await fetch(
		`https://public.api.bsky.app/xrpc/app.bsky.feed.getPostThread?uri=at://did:plc:pzzad434irrxjjcrrpl7f74d/app.bsky.feed.post/${postKey}`,
		{
			method: "GET",
			headers: {
				Accept: "application/json",
			},
			cache: "no-store",
		},
	);
	if (!res.ok) {
		console.error(await res.text());
		throw new Error("Failed to fetch post thread");
	}
	const data = (await res.json()) as AppBskyFeedGetPostThread.OutputSchema;
	if (!AppBskyFeedDefs.isThreadViewPost(data.thread)) {
		throw new Error("Could not find thread");
	}
	return data.thread;
};

export default async function getBlogPostBySlug(slug: string) {
	const data = await request(
		HASHNODE_GQL_ENDPOINT,
		SinglePostByPublicationDocument,
		{
			slug,
			host: HASHNODE_PUBLICATION_HOST,
		},
	);

	const publishDate = useFormatDate(
		new Date(data.publication?.post?.publishedAt as string),
		false,
	);
	const updatedDate = data.publication?.post?.updatedAt
		? useFormatDate(new Date(data.publication?.post?.updatedAt), false)
		: undefined;

	const postKey = (
		data.publication?.post?.tags?.find(({ name }) => name.startsWith("bsky:"))
			?.name ?? ""
	).replace("bsky:", "");

	let postInfo: Partial<{
		likeCount?: number;
		repostCount?: number;
		replyCount?: number;
	}> = {};
	let replies: AppBskyFeedDefs.ThreadViewPost["replies"] = [];

	if (postKey.length > 0) {
		const thread = await getPostThread(postKey);
		postInfo = thread.post;
		replies = thread.replies ?? [];
	}

	const postUrl = `https://bsky.app/profile/jeroenpeeters.be/post/${postKey}`;

	// TODO: custom og images
	// TODO: store og data in CF KV (how?)
	const ogImage = `https://dynamic-og-image-generator.vercel.app//api/generate?title=${encodeURIComponent(`${data.publication?.post?.title}`)}&author=Jeroen%20Peeters&avatar=${encodeURIComponent("https://github.com/jeroenptrs.png")}&websiteUrl=${encodeURIComponent("https://jeroenpeeters.be/blog")}&theme=Default`;

	return (
		<>
			<ArticleHead>
				<meta property="og:type" content="article" />
				<meta
					property="og:url"
					content={`https://jeroenpeeters.be/blog/post/${slug}`}
				/>
				<meta property="og:title" content={data.publication?.post?.title} />
				<meta
					property="og:description"
					content={data.publication?.post?.title}
				/>
				<meta property="og:image" content={ogImage} />
			</ArticleHead>
			<H1 isTitle>{data.publication?.post?.title}</H1>
			<Text className="opacity-65 mb-8 text-sm">
				{publishDate}
				{updatedDate ? ` (Updated ${updatedDate})` : null}
			</Text>
			<Markdown
				options={{
					overrides: {
						a: {
							component: Anchor,
						},
						div: {
							component: Div,
						},
						h1: H1,
						h2: H2,
						h3: H3,
						hr: {
							component: HR,
						},
						span: {
							component: Span,
						},
						img: {
							component: Img,
						},
						p: {
							component: Paragraph,
						},
					},
				}}
			>
				{
					data.publication?.post?.content.markdown.replaceAll(
						' align="center")',
						")",
					) as string
				}
			</Markdown>
			{postKey.length > 0 ? (
				<>
					<PostInfo uri={postUrl} post={postInfo} />
					<Comments uri={postUrl} replies={replies} />
				</>
			) : null}
			<View style={{ marginBottom: 64 }} />
		</>
	);
}
