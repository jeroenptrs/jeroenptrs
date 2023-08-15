import inquirer from "inquirer";

import type { TFlags } from "../types";
import * as prompts from "./prompts";

export default async function askTitle(
  { title }: TFlags,
  oldTitle?: string,
): Promise<string> {
  if (title) {
    return title;
  }

  const answers = await inquirer.prompt([prompts.title(oldTitle)]);

  return answers["title"];
}
