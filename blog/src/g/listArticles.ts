import { promises } from "node:fs";
import { resolve } from "node:path";

import { getFolderPath } from "../utils";
import { ARTICLES_FOLDER } from "../constants";

export default async function listArticles(): Promise<string[]> {
  const folderPath = getFolderPath();
  const [, ...articles] = await promises.readdir(
    resolve(folderPath, ARTICLES_FOLDER),
  );
  return articles;
}
