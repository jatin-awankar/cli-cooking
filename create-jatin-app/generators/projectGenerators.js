import path from "path";

import fs from "fs-extra";

import chalk from "chalk";

import ora from "ora";

import { getFrameworkGenerator } from "./frameworks/index.js";
import { installDependencies, initializeGit } from "./packageManager.js";

const GITIGNORE_BY_FRAMEWORK = {
  vanilla: "node_modules\ndist\n",
  express: "node_modules\ndist\n.env\n",
  next: "node_modules\n.next\nout\n.env\n",
  "react-vite": "node_modules\ndist\n.env\n",
};

async function createGitignore(projectPath, framework) {
  const content =
    GITIGNORE_BY_FRAMEWORK[framework] ?? GITIGNORE_BY_FRAMEWORK.vanilla;

  await fs.writeFile(path.join(projectPath, ".gitignore"), content);
}

export default async function generateProject(options) {
  const {
    projectName,
    framework,
    typescript,
    installDependencies: shouldInstall,
    gitInit,
  } = options;

  const spinner = ora("Creating project...").start();

  const projectPath = path.join(process.cwd(), projectName);

  if (await fs.pathExists(projectPath)) {
    spinner.fail(`Directory "${projectName}" already exists`);
    process.exit(1);
  }

  try {
    await fs.ensureDir(projectPath);

    spinner.text = `Scaffolding ${framework} project...`;

    const generate = getFrameworkGenerator(framework);
    const { nextSteps } = await generate(projectPath, typescript);

    await createGitignore(projectPath, framework);

    spinner.succeed("Project created");

    if (shouldInstall) {
      await installDependencies(projectPath);
    }

    if (gitInit) {
      await initializeGit(projectPath);
    }

    console.log(chalk.green(`\n✔ Project ${projectName} ready`));
    console.log(chalk.dim(`  Framework: ${framework}`));
    console.log(chalk.cyan(`  cd ${projectName}`));

    for (const step of nextSteps) {
      console.log(chalk.cyan(`  ${step}`));
    }
  } catch (error) {
    spinner.fail("Project creation failed");
    await fs.remove(projectPath);
    console.error(chalk.red(error.message ?? error));
    process.exit(1);
  }
}
