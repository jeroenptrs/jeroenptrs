import chalk from "chalk";

import pageGeneration from ".";
import { exec } from "./utils";

async function watch() {
  const now = Date.now();
  console.log(chalk.bgYellow.bold("\n----------------------"));
  console.log(chalk.bgYellow.bold("---Changes-detected---"));
  console.log(
    chalk.bgYellow.bold(
      `-${(new Date(now)).toISOString().substring(0, 19)}--`,
    ),
  );
  console.log(chalk.bgYellow.bold("----------------------\n"));

  await exec("yarn", ["format"], { stdio: "inherit" });
  console.log("");

  await pageGeneration();
  console.log("");

  await exec("yarn", ["format:html"], { stdio: "inherit" });
  console.log("");

  await exec("yarn", ["build:design"], { stdio: "inherit" });
  console.log("");

  const msDiff = Math.abs(now - Date.now());
  console.log(
    chalk.greenBright.bold(`✨ Done in ${Math.abs(msDiff / 1000)}s!`),
  );
}

watch();
