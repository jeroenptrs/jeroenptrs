import chalk from "chalk";
import chokidar from "chokidar";

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

  await exec("pnpm", ["format"], { stdio: "inherit" });
  console.log("");

  await pageGeneration();
  console.log("");

  await exec("pnpm", ["format:html"], { stdio: "inherit" });
  console.log("");

  await exec("pnpm", ["build:design"], { stdio: "inherit" });
  console.log("");

  await exec("pnpm", ["build:wc"], { stdio: "inherit" });
  console.log("");

  const msDiff = Math.abs(now - Date.now());
  console.log(
    chalk.greenBright.bold(`✨ Done in ${Math.abs(msDiff / 1000)}s!`),
  );
}

chokidar.watch("pages").on("change", watch);

watch();
