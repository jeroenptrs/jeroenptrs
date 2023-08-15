import { promises } from "node:fs";
import { join, parse, resolve } from "node:path";
import type { ParsedPath } from "node:path";

export function getFolderPath(): string {
  if (
    !process.cwd().endsWith("blog") && !process.cwd().endsWith("jeroenptrs")
  ) {
    throw new Error("Unknown path");
  }

  return process.cwd().endsWith("blog")
    ? resolve(process.cwd(), "pages")
    : resolve(process.cwd(), "blog", "pages");
}

export async function fetchAllPages(folderPath: string): Promise<string[]> {
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

export function getOutputPath({ dir, name }: ParsedPath): string {
  return join(dir, `${name}.html`);
}

export async function writeToFile(path: string, output: string): Promise<void> {
  const { dir } = parse(path);
  await promises.mkdir(dir, { recursive: true });
  promises.writeFile(path, output, { encoding: "utf-8" });
}

export function getISOTimestampFromDate(date: Date): string {
  return date.toISOString().substring(0, 10).replaceAll("-", "");
}

export function splitCommaArray(
  _arrayString: string,
  forceCase?: "lower" | "upper",
): string[] {
  if (_arrayString === "") {
    return [];
  }

  let arrayString = _arrayString;

  if (forceCase === "lower") {
    arrayString = _arrayString.toLowerCase();
  } else if (forceCase === "upper") {
    arrayString = _arrayString.toUpperCase();
  }

  return arrayString.split(",").map((e) => e.trim());
}
