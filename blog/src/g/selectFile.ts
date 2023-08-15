import inquirer from "inquirer";
import ora from "ora";

import type { TFlags } from "../types";
import * as prompts from "./prompts";
import listArticles from "./listArticles";

export default async function selectFile({ file }: TFlags): Promise<string> {
  const spinner = ora("Loading articles").start();
  const fileList = await listArticles();
  spinner.succeed();

  if (file && fileList.includes(file)) {
    return file;
  }

  const answers = await inquirer.prompt([prompts.selectFile(fileList)]);

  return answers["selectFile"];
}
