import { renderToString } from "react-dom/server";
import type { ReactNode } from "react";

import HtmlShell from "./HtmlShell";

export default function buildReactComponent(
  Component: () => ReactNode,
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
