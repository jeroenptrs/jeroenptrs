import { promises } from "node:fs";
import { resolve } from "node:path";

import { getFolderPath } from "../utils";
import { ARTICLES_FOLDER } from "../constants";

export default async function extractIdentifiers(
  filePath: string,
): Promise<[string, string, string, string, string]> {
  const folderPath = getFolderPath();
  const targetPath = resolve(folderPath, ARTICLES_FOLDER, filePath);
  const targetContent = await promises.readFile(targetPath, {
    encoding: "utf-8",
  });

  const identifiers = extractIdentifiersFromSource(targetContent);

  return [targetPath, targetContent, ...identifiers];
}

function extractIdentifiersFromSource(
  source: string,
): [string, string, string] {
  const TITLE = "export const title = ";
  const TAGS = "export const tags = ";
  const METADATA = "export const metadata = ";

  const titleIndex = source.indexOf(TITLE) + TITLE.length;
  const tagsIndex = source.indexOf(TAGS) + TAGS.length;
  const metadataIndex = source.indexOf(METADATA) + METADATA.length;

  const title = source.substring(
    titleIndex,
    source.indexOf("\n", titleIndex) - 1,
  );

  const tags = source.substring(tagsIndex, source.indexOf("\n", tagsIndex) - 1);

  const metadata = source.substring(
    metadataIndex,
    source.indexOf("\n", metadataIndex) - 1,
  );

  return [
    title,
    tags,
    metadata,
  ];
}
