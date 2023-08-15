import type { MDXContent } from "mdx/types";
import { renderToString } from "react-dom/server";

import HtmlShell from "./HtmlShell";
import { TMetadata } from "./types";

export default function buildArticleComponent(
  Component: MDXContent,
  title: string,
  tags: string[],
  metadata: TMetadata,
): string {
  // TODO: handle tags and metadata
  return `<!doctype html>${
    renderToString(
      <HtmlShell title={title}>
        <Component />
      </HtmlShell>,
    )
  }`;
}
