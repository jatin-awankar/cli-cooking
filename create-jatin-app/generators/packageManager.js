import { spawn } from "child_process";

import ora from "ora";

export async function installDependencies(projectPath) {
  return new Promise((resolve, reject) => {
    const spinner = ora("Installing dependencies...").start();

    const child = spawn("npm", ["install"], {
      cwd: projectPath,
      stdio: "ignore",
      shell: true,
    });

    child.on("close", (code) => {
      if (code === 0) {
        spinner.succeed("Dependencies installed");

        resolve();
      } else {
        spinner.fail("Dependency installation failed");

        reject();
      }
    });
  });
}

export async function initializeGit(projectPath) {
  return new Promise((resolve) => {
    const spinner = ora("Initializing git...").start();

    const child = spawn("git", ["init"], {
      cwd: projectPath,
      stdio: "ignore",
      shell: true,
    });

    child.on("close", () => {
      spinner.succeed("Git initialized");

      resolve();
    });
  });
}
