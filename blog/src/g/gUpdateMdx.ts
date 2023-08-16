import { promises } from "node:fs";
import { resolve } from "node:path";

import ora from "ora";

import type { TFlags, TMetadata } from "../types";
import extractIdentifiers from "./extractIdentifiers";
import askTitle from "./askTitle";
import askFile from "./askFile";
import extractFileName from "./extractFileName";
import setFile from "./setFile";
import askAuthors from "./askAuthors";
import askTags from "./askTags";
import { getFolderPath } from "../utils";
import { ARTICLES_FOLDER } from "../constants";

export default async function gUpdateMdx(
  filePath: string,
  flags: TFlags,
  updateChoices: string[],
) {
  const [
    targetPath,
    targetContent,
    oldTitleString,
    oldTagsString,
    oldMetadataString,
  ] = await extractIdentifiers(filePath);
  const oldTitle = oldTitleString.substring(1, oldTitleString.length - 1);
  const oldTags: string[] = JSON.parse(oldTagsString);
  const oldMetadata: TMetadata = JSON.parse(oldMetadataString);

  const title = updateChoices.includes("title")
    ? await askTitle(
      flags,
      oldTitle,
    )
    : undefined;

  const file = updateChoices.includes("file")
    ? await askFile(flags, extractFileName(filePath))
    : undefined;

  const tags = updateChoices.includes("tags") ? await askTags(flags) : [];

  const authors = updateChoices.includes("authors")
    ? await askAuthors(flags, oldMetadata.authors)
    : undefined;

  const spinner = ora(`Processing ${filePath}`).start();

  const newTitle = title ?? oldTitle;
  const newFile = file
    ? setFile(file, new Date(oldMetadata.created)).at(1) as string
    : filePath;
  const newTags = tags.length > 0
    ? [...new Set([...oldTags, ...tags])]
    : oldTags;
  const newMetadata = oldMetadata;
  if (authors) {
    newMetadata.authors = authors;
  }

  const folderPath = getFolderPath();
  const newFilePath = resolve(folderPath, ARTICLES_FOLDER, newFile);
  const newTitleString = `"${newTitle}"`;
  const newTagString = JSON.stringify(newTags);
  const newMetadataString = JSON.stringify(newMetadata);
  const outputContent = targetContent
    .replace(oldTitleString, newTitleString)
    .replace(oldTagsString, newTagString)
    .replace(oldMetadataString, newMetadataString);

  spinner.text = `Removing ${filePath}`;
  await promises.rm(targetPath);

  spinner.text = `Updating ${newFile}`;
  await promises.writeFile(newFilePath, outputContent, { encoding: "utf-8" });
  spinner.text = `Updated ${newFile}`;

  spinner.succeed();
}
