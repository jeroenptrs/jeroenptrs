import inquirer from "inquirer";

import type { TFlags } from "../types";
import * as prompts from "./prompts";
import { splitCommaArray } from "../utils";

export default async function askTags({ tags }: TFlags): Promise<string[]> {
  if (typeof tags === "string") {
    return splitCommaArray(tags, "lower");
  }

  const answers = await inquirer.prompt([prompts.newTags]);

  return splitCommaArray(answers["tags"], "lower");
}
