#!/usr/bin/env node

import { Command } from "commander";

import chalk from "chalk";

import runProjectPrompt from "./prompts/projectPrompt.js";
import generateProject from "./generators/projectGenerators.js";

const program = new Command();

program
  .name("create-jatin-app")
  .description("Interactive project scaffolding CLI")
  .version("1.0.0");

program.action(async () => {
  try {
    const answers = await runProjectPrompt();

    await generateProject(answers);
  } catch (error) {
    if (error?.name === "ExitPromptError") {
      console.log(chalk.yellow("\nCancelled."));
      process.exit(0);
    }

    console.error(chalk.red(error.message ?? error));
    process.exit(1);
  }
});

program.parse();
