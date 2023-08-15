import { promises } from "node:fs";
import { resolve } from "node:path";

import ora from "ora";

import { getFolderPath, getISOTimestampFromDate } from "../utils";
import { ARTICLES_FOLDER } from "../constants";
import { extractIdentifiers } from "./extractIdentifiers";
import type { TMetadata } from "../types";

export default async function gPublishMdx(filePath: string): Promise<void> {
  const spinner = ora(`Processing ${filePath}`).start();
  const folderPath = getFolderPath();
  const targetPath = resolve(folderPath, ARTICLES_FOLDER, filePath);
  const now = new Date();
  const publishDate = getISOTimestampFromDate(now);
  const newFileName = `${publishDate}${filePath.substring(8)}`;
  const newFilePath = resolve(folderPath, ARTICLES_FOLDER, newFileName);

  const targetContent = await promises.readFile(targetPath, {
    encoding: "utf-8",
  });

  const [, , oldMetadataString] = extractIdentifiers(targetContent);
  const metadata: TMetadata = JSON.parse(oldMetadataString);
  metadata.published = now.getTime();

  const newMetadataString = JSON.stringify(metadata);
  const outputContent = targetContent.replace(
    oldMetadataString,
    newMetadataString,
  );

  spinner.text = `Removing ${filePath}`;
  await promises.rm(targetPath);

  spinner.text = `Writing to ${newFileName}`;
  await promises.writeFile(newFilePath, outputContent, { encoding: "utf-8" });
  spinner.text = `Published to ${newFileName}`;
  spinner.succeed();
}
