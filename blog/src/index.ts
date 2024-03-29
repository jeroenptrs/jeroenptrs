import { join, parse, resolve } from "node:path";

import chalk from "chalk";
import { Feed } from "feed";
import { rimraf } from "rimraf";

import handleMdxData from "./handleMdxData";
import buildReactComponent from "./buildReactComponent";
import {
  fetchAllPages,
  getFolderPath,
  getOutputPath,
  writeToFile,
} from "./utils";
import type { TData } from "./types";
import buildTagComponent from "./buildTagComponent";
import buildArticleComponent from "./buildArticleComponent";
import { MAIN_FOLDER } from "./constants";

export default async function pageGeneration(): Promise<void> {
  const folderPath = getFolderPath();
  const pages = await fetchAllPages(folderPath);
  const data: TData = { pages: [], tags: {} };

  pages.splice(0, 1); // remove .gitkeep

  console.log(chalk.red(`🚮 Clearing ${MAIN_FOLDER}`));
  await rimraf(resolve(folderPath, join(MAIN_FOLDER)));

  // TODO: add page name and info to an array called pages (rename current pages to _pages)
  for await (const page of pages) {
    const parsedPage = getOutputPath(parse(page));
    const inputFilePath = resolve(folderPath, page);
    const parsedInputFile = parse(inputFilePath);

    if (parsedInputFile.ext !== ".mdx" && parsedInputFile.ext !== ".tsx") {
      throw new Error("Unknown Extension");
    }

    if (parsedInputFile.ext === ".mdx") {
      const { title, tags: _tags, metadata, description } = await handleMdxData(
        inputFilePath,
      );

      if (!parsedPage.startsWith("entries")) {
        continue;
      }

      if (process.env["IGNORE_NOT_PUBLISHED"] && !metadata.published) {
        console.log(chalk.yellow(`Skipping ${page}`));
        continue;
      }

      for (const tag of _tags) {
        const tagData = { title, path: parsedPage };
        if (Object.keys(data.tags).includes(tag)) {
          data.tags[tag]?.push(tagData);
        } else {
          data.tags[tag] = [tagData];
        }
      }

      data.pages.push({
        title,
        metadata,
        description,
        tags: _tags,
        file: parsedPage,
      });
    }
  }

  // TODO: take pages (with new info) and generate the pages based off of that data
  for await (const page of pages) {
    const parsedPage = getOutputPath(parse(page));
    const inputFilePath = resolve(folderPath, page);
    const parsedInputFile = parse(inputFilePath);
    let renderedComponent: string;

    if (parsedInputFile.base === ".gitkeep") {
      continue;
    }

    console.log(`Processing ${chalk.cyan(page)}`);
    if (parsedInputFile.ext === ".mdx") {
      const { Component, title, tags: _tags, metadata } = await handleMdxData(
        inputFilePath,
      );

      if (
        process.env["IGNORE_NOT_PUBLISHED"] && !metadata.published &&
        parsedPage.startsWith("entries")
      ) {
        console.log(chalk.yellow(`Skipping ${page}`));
        continue;
      }

      renderedComponent = buildArticleComponent(
        Component,
        title,
        _tags,
        metadata,
      );
    } else {
      const { default: Component } = await import(
        inputFilePath
      );
      renderedComponent = buildReactComponent(Component, data);
    }

    await writeToFile(
      resolve(folderPath, MAIN_FOLDER, parsedPage),
      renderedComponent,
    );

    console.log(chalk.green(`Generated ${parsedPage}`));
  }

  console.log("🔖 Processing tags");
  for await (const [tag, tagArray] of Object.entries(data.tags)) {
    const renderedComponent = buildTagComponent(tag, tagArray);
    await writeToFile(
      resolve(
        folderPath,
        MAIN_FOLDER,
        "tags",
        getOutputPath(parse(tag)),
      ),
      renderedComponent,
    );

    console.log(chalk.green(`Generated tag ${tag}`));
  }

  console.log("🗞️  Processing rss");
  const feed = new Feed({
    title: "jeroenpeeters.be",
    description: "Personal blog of Jeroen Peeters",
    id: "https://jeroenpeeters.be",
    link: "https://jeroenpeeters.be",
    language: "en",
    favicon: "https://jeroenpeeters.be/favicon.ico",
    copyright: `All rights reserved ${
      (new Date()).getFullYear()
    }, Jeroen Peeters`,
    author: {
      name: "Jeroen Peeters",
      email: "contact@jeroenpeeters.be",
      link: "https://jeroenpeeters.be",
    },
  });

  for (const page of data.pages) {
    feed.addItem({
      title: page.title,
      id: page.file,
      link: `https://jeroenpeeters.be/${page.file}`,
      description: page.description,
      content: page.description,
      date: new Date(page.metadata.published || page.metadata.created),
      category: page.tags.map((name) => ({ name })),
    });
  }

  for (const tag in data.tags) {
    feed.addCategory(tag);
  }

  await writeToFile(resolve(folderPath, MAIN_FOLDER, "rss.xml"), feed.rss2());
  console.log(chalk.green(`Generated rss feed`));
}
