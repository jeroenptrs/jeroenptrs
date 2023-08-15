import { promises } from "node:fs";
import { join, parse, resolve } from "node:path";
import type { ParsedPath } from "node:path";

import { evaluate } from "@mdx-js/mdx";
import type { RunnerOptions } from "@mdx-js/mdx/lib/util/resolve-evaluate-options";
import * as provider from "@mdx-js/react";
import runtime from "react/jsx-runtime";
import { renderToString } from "react-dom/server";
import { rimraf } from "rimraf";

import HtmlShell from "./HtmlShell";

const MAIN_FOLDER = "../../docs";

function getFolderPath(): string {
  if (
    !process.cwd().endsWith("blog") && !process.cwd().endsWith("jeroenptrs")
  ) {
    throw new Error("Unknown path");
  }

  return process.cwd().endsWith("blog")
    ? resolve(process.cwd(), "pages")
    : resolve(process.cwd(), "blog", "pages");
}

async function fetchAllPages(folderPath: string): Promise<string[]> {
  let pages: string[] = [];

  for await (const pageOrDir of await promises.readdir(folderPath)) {
    const pageOrDirInfo = await promises.lstat(resolve(folderPath, pageOrDir));

    if (pageOrDirInfo.isDirectory()) {
      const dirPages = await fetchAllPages(join(folderPath, pageOrDir));
      pages = pages.concat(dirPages.map((page) => join(pageOrDir, page)));
    } else {
      pages.push(pageOrDir);
    }
  }

  return pages;
}

function getOutputPath({ dir, name }: ParsedPath): string {
  return join(dir, `${name}.html`);
}

async function writeToFile(path: string, output: string): Promise<void> {
  const { dir } = parse(path);
  await promises.mkdir(dir, { recursive: true });
  promises.writeFile(path, output, { encoding: "utf-8" });
}

async function pageGeneration(): Promise<void> {
  const folderPath = getFolderPath();
  const pages = await fetchAllPages(folderPath);

  await rimraf(resolve(folderPath, join(MAIN_FOLDER)));

  for await (const page of pages) {
    const inputFilePath = resolve(folderPath, page);
    const parsedInputFile = parse(inputFilePath);
    let renderedComponent: string;
    let parsedPage: string;

    if (parsedInputFile.ext !== ".mdx" && parsedInputFile.ext !== ".tsx") {
      throw new Error("Unknown Extension");
    }

    if (parsedInputFile.ext === ".mdx") {
      const md = await promises.readFile(inputFilePath, { encoding: "utf-8" });
      const { default: Component, title } = await evaluate(md, {
        ...provider,
        ...runtime as RunnerOptions,
        development: false,
      });

      renderedComponent = `<!doctype html>${
        renderToString(
          <HtmlShell title={title as string | undefined}>
            <Component />
          </HtmlShell>,
        )
      }`;

      parsedPage = getOutputPath(parse(page));
    } else {
      const { default: Component, title } = await import(inputFilePath);

      renderedComponent = `<!doctype html>${
        renderToString(
          <HtmlShell title={title}>
            <Component />
          </HtmlShell>,
        )
      }`;

      parsedPage = getOutputPath(parse(page));
    }

    writeToFile(
      resolve(folderPath, MAIN_FOLDER, parsedPage),
      renderedComponent,
    );
  }
}

pageGeneration();
