import { promises } from "node:fs";

import { evaluate } from "@mdx-js/mdx";
import type { RunnerOptions } from "@mdx-js/mdx/lib/util/resolve-evaluate-options";
import * as provider from "@mdx-js/react";
import runtime from "react/jsx-runtime";

import type { TMetadata } from "./types";

export default async function handleMdxData(inputFilePath: string) {
  const md = await promises.readFile(inputFilePath, { encoding: "utf-8" });
  const { default: Component, title, tags, metadata, description } =
    await evaluate(md, {
      ...provider,
      ...runtime as RunnerOptions,
      development: false,
    });

  return {
    Component,
    title: title as string,
    tags: tags as string[],
    description: description as string,
    metadata: metadata as TMetadata,
  };
}
