import { renderToString } from "react-dom/server";

import HtmlShell from "./HtmlShell";
import TagPage from "./TagPage";
import { TTag } from "./types";

export default function buildTagComponent(
  tag: string,
  tagArray: Array<TTag>,
): string {
  return `<!doctype html>${
    renderToString(
      <HtmlShell title={tag}>
        <>
          <h1>{tag}</h1>
          <TagPage tag={tagArray} />
        </>
      </HtmlShell>,
    )
  }`;
}
