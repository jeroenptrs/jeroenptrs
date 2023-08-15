import { promises } from "node:fs";
import { resolve } from "node:path";
import { getFolderPath } from "../utils";
import {
  ARTICLES_FOLDER,
  METADATA_IDENTIFIER,
  TAGS_IDENTIFIER,
  TEMPLATE_LOCATION,
  TITLE_IDENTIFIER,
} from "../constants";

export default async function gNewMdx(
  file: string,
  title: string,
  tags: string,
  metadata: string,
): Promise<void> {
  const folderPath = getFolderPath();
  const outputLocation = resolve(folderPath, ARTICLES_FOLDER, file);
  const templateLocation = resolve(folderPath, TEMPLATE_LOCATION);

  const template = await promises.readFile(templateLocation, {
    encoding: "utf-8",
  });

  const outputContent = template
    .replace(TITLE_IDENTIFIER, `"${title}"`)
    .replace(TAGS_IDENTIFIER, tags)
    .replace(METADATA_IDENTIFIER, metadata);

  await promises.writeFile(outputLocation, outputContent, {
    encoding: "utf-8",
  });
}
