"use server";

import request from "graphql-request";

import {
	HASHNODE_GQL_ENDPOINT,
	HASHNODE_PUBLICATION_HOST,
} from "@/constants/hashnode";
import { PostsByPublicationDocument } from "@/generated/graphql";
import ArticleLink from "@/components/blog/ArticleLink";

export default async function getBlogPosts() {
	const data = await request(
		HASHNODE_GQL_ENDPOINT,
		PostsByPublicationDocument,
		{
			first: 20,
			host: HASHNODE_PUBLICATION_HOST,
		},
	);

	// TODO: pagination through older articles, write some good ones first ;)

	return (
		<>
			{data.publication?.posts.edges.map(({ node }) => (
				<ArticleLink
					key={node.id}
					href={node.url.substring("https://jeroenpeeters.be".length)}
					publishedAt={node.publishedAt}
					title={node.title}
				/>
			))}
		</>
	);
}
