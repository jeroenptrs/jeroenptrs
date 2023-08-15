import inquirer from "inquirer";

import type { TFlags } from "../types";
import * as prompts from "./prompts";

export default async function askTitle({ title }: TFlags): Promise<string> {
  if (title) {
    return title;
  }

  const answers = await inquirer.prompt([prompts.title]);

  return answers["title"];
}
