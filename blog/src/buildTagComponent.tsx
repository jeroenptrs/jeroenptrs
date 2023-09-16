import { renderToString } from "react-dom/server";

import HtmlShell from "./HtmlShell";
import TagPage from "./TagPage";
import { TTag } from "./types";

export default function buildTagComponent(
  tag: string,
  tagArray: Array<TTag>,
): string {
  const capitalizedTag = tag[0]?.toLocaleUpperCase() +
    tag.substring(1).replace("-", " ");
  return `<!doctype html>${
    renderToString(
      <HtmlShell title={capitalizedTag} tags={[tag]}>
        <>
          <h1>{capitalizedTag}</h1>
          <TagPage tag={tagArray} />
        </>
      </HtmlShell>,
    )
  }`;
}
