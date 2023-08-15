import type { MDXContent } from "mdx/types";
import { renderToString } from "react-dom/server";

import HtmlShell from "./HtmlShell";

export default function buildArticleComponent(
  Component: MDXContent,
  title?: string,
): string {
  return `<!doctype html>${
    renderToString(
      <HtmlShell title={title}>
        <Component />
      </HtmlShell>,
    )
  }`;
}
