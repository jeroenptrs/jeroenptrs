import { join, parse, resolve } from "node:path";

import type { ReactNode } from "react";
import { rimraf } from "rimraf";

import handleMdxData from "./handleMdxData";
import buildReactComponent from "./buildReactComponent";
import {
  fetchAllPages,
  getFolderPath,
  getOutputPath,
  writeToFile,
} from "./utils";

const MAIN_FOLDER = "../../docs";

async function pageGeneration(): Promise<void> {
  const folderPath = getFolderPath();
  const pages = await fetchAllPages(folderPath);
  const tags: string[] = [];

  await rimraf(resolve(folderPath, join(MAIN_FOLDER)));

  for await (const page of pages) {
    const inputFilePath = resolve(folderPath, page);
    const parsedInputFile = parse(inputFilePath);
    let Component: () => ReactNode;
    let title: string | undefined;

    if (parsedInputFile.ext !== ".mdx" && parsedInputFile.ext !== ".tsx") {
      throw new Error("Unknown Extension");
    }

    if (parsedInputFile.ext === ".mdx") {
      const { Component: _Component, title: _title, tags: _tags = [] } =
        await handleMdxData(inputFilePath);
      Component = _Component as unknown as () => ReactNode;
      title = _title;
      for (const tag of _tags) {
        if (tags.includes(tag)) {
          continue;
        }

        tags.push(tag);
      }
    } else {
      const { default: _Component, title: _title } = await import(
        inputFilePath
      );
      Component = _Component;
      title = _title;
    }

    const renderedComponent = buildReactComponent(Component, title);
    const parsedPage = getOutputPath(parse(page));

    writeToFile(
      resolve(folderPath, MAIN_FOLDER, parsedPage),
      renderedComponent,
    );
  }

  // TODO: write tags
  console.log(tags.sort());
}

pageGeneration();
