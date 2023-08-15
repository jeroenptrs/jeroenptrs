import { promises } from "node:fs";

import { evaluate } from "@mdx-js/mdx";
import type { RunnerOptions } from "@mdx-js/mdx/lib/util/resolve-evaluate-options";
import * as provider from "@mdx-js/react";
import runtime from "react/jsx-runtime";

export default async function handleMdxData(inputFilePath: string) {
  const md = await promises.readFile(inputFilePath, { encoding: "utf-8" });
  const { default: Component, title, tags } = await evaluate(md, {
    ...provider,
    ...runtime as RunnerOptions,
    development: false,
  });

  // TODO: add metadata

  return {
    Component,
    title: title as string,
    tags: tags as string[],
  };
}
