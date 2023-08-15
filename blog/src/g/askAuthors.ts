import inquirer from "inquirer";

import type { TFlags } from "../types";
import * as prompts from "./prompts";
import { splitCommaArray } from "../utils";

export default async function askAuthors(
  { authors }: TFlags,
  defaultAuthors?: string[],
): Promise<string[]> {
  if (authors) {
    return splitCommaArray(authors);
  }

  const answers = await inquirer.prompt([prompts.authors(defaultAuthors)]);

  return splitCommaArray(answers["authors"]);
}
