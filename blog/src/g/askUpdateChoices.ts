import inquirer from "inquirer";

import { TFlags } from "../types";
import { updateChoices } from "./prompts";

export default async function askUpdateChoices(
  flags: TFlags,
): Promise<string[]> {
  const { title, file, tags, authors } = flags;
  if (!!title && !!file && !!tags && !!authors) {
    return ["title", "file", "tags", "authors"];
  }
  const answers = await inquirer.prompt(updateChoices(flags));
  const answerArray: string[] = answers["updateChoices"];

  if (title) {
    answerArray.push("title");
  }

  if (file) {
    answerArray.push("file");
  }

  if (tags) {
    answerArray.push("tags");
  }

  if (authors) {
    answerArray.push("authors");
  }

  return answerArray;
}
