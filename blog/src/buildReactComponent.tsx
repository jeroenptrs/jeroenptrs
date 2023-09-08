import { renderToString } from "react-dom/server";
import type { ReactNode } from "react";

import HtmlShell from "./HtmlShell";
import { TData } from "./types";

export default function buildReactComponent(
  Component: (props: TData) => ReactNode,
  data: TData,
  title?: string,
): string {
  return `<!doctype html>${
    renderToString(
      <HtmlShell title={title}>
        <Component {...data} />
      </HtmlShell>,
    )
  }`;
}
