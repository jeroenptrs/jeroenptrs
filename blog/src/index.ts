import { join, parse, resolve } from "node:path";

import { rimraf } from "rimraf";

import handleMdxData from "./handleMdxData";
import buildReactComponent from "./buildReactComponent";
import {
  fetchAllPages,
  getFolderPath,
  getOutputPath,
  writeToFile,
} from "./utils";
import type { TTags } from "./types";
import buildTagComponent from "./buildTagComponent";
import buildArticleComponent from "./buildArticleComponent";
import { MAIN_FOLDER } from "./constants";

async function pageGeneration(): Promise<void> {
  const folderPath = getFolderPath();
  const pages = await fetchAllPages(folderPath);
  const tags: TTags = {};

  await rimraf(resolve(folderPath, join(MAIN_FOLDER)));

  for await (const page of pages) {
    const parsedPage = getOutputPath(parse(page));
    const inputFilePath = resolve(folderPath, page);
    const parsedInputFile = parse(inputFilePath);
    let renderedComponent: string;

    if (parsedInputFile.ext !== ".mdx" && parsedInputFile.ext !== ".tsx") {
      throw new Error("Unknown Extension");
    }

    if (parsedInputFile.ext === ".mdx") {
      const { Component, title, tags: _tags, metadata } = await handleMdxData(
        inputFilePath,
      );

      renderedComponent = buildArticleComponent(
        Component,
        title,
        _tags,
        metadata,
      );

      for (const tag of _tags) {
        const tagData = { title, path: parsedPage };
        if (Object.keys(tags).includes(tag)) {
          tags[tag]?.push(tagData);
        } else {
          tags[tag] = [tagData];
        }
      }
    } else {
      const { default: Component } = await import(
        inputFilePath
      );
      renderedComponent = buildReactComponent(Component);
    }

    writeToFile(
      resolve(folderPath, MAIN_FOLDER, parsedPage),
      renderedComponent,
    );
  }

  for (const [tag, tagArray] of Object.entries(tags)) {
    const renderedComponent = buildTagComponent(tag, tagArray);

    writeToFile(
      resolve(
        folderPath,
        MAIN_FOLDER,
        "tags",
        getOutputPath(parse(tag)),
      ),
      renderedComponent,
    );
  }
}

pageGeneration();
