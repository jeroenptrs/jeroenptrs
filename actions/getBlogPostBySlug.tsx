"use server";

import request from "graphql-request";
import Markdown from "markdown-to-jsx";

import {
	HASHNODE_GQL_ENDPOINT,
	HASHNODE_PUBLICATION_HOST,
} from "@/constants/hashnode";
import { SinglePostByPublicationDocument } from "@/generated/graphql";
import { H1, H2, H3 } from "@/components/blog/Headers";
import Text from "@/components/site/Text";
import { Img, Paragraph } from "@/components/blog/mdTags";

export default async function getBlogPostBySlug(slug: string) {
	const data = await request(
		HASHNODE_GQL_ENDPOINT,
		SinglePostByPublicationDocument,
		{
			slug,
			host: HASHNODE_PUBLICATION_HOST,
		},
	);

	console.log(data.publication?.post?.content.markdown);

	return (
		<>
			<H1 isTitle>{data.publication?.post?.title}</H1>
			<H3 isSubtitle>{data.publication?.post?.subtitle ?? ""}</H3>
			<Markdown
				options={{
					overrides: {
						h1: H1,
						h2: H2,
						h3: H3,
						span: Text,
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
		</>
	);
}
