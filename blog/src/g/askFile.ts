import inquirer from "inquirer";

import type { TFlags } from "../types";
import * as prompts from "./prompts";

export default async function askFile(
  { file }: TFlags,
  title: string,
): Promise<string> {
  if (file) {
    return file;
  }

  const formattedTitle = title.toLowerCase().split(" ").slice(0, 2).join("-");
  const answers = await inquirer.prompt([prompts.file(formattedTitle)]);

  return answers["file"].toLowerCase();
}
