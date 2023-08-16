import { promises } from "node:fs";
import { resolve } from "node:path";

import ora from "ora";

import { getFolderPath } from "../utils";
import { ARTICLES_FOLDER } from "../constants";
import extractIdentifiers from "./extractIdentifiers";
import type { TMetadata } from "../types";
import extractFileName from "./extractFileName";
import setFile from "./setFile";

export default async function gPublishMdx(filePath: string): Promise<void> {
  const spinner = ora(`Processing ${filePath}`).start();
  const [targetPath, targetContent, , , oldMetadataString] =
    await extractIdentifiers(filePath);

  const folderPath = getFolderPath();
  const fileName = extractFileName(filePath);
  const [now, newFileName] = setFile(fileName);
  const newFilePath = resolve(folderPath, ARTICLES_FOLDER, newFileName);

  const metadata: TMetadata = JSON.parse(oldMetadataString);
  metadata.published = now;
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
