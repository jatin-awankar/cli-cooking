import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { spawn } from "child_process";
import chalk from "chalk";

const log = console.log;

const __dirname = path.dirname(fileURLToPath(import.meta.url));

function copyRecursive(src, dest) {
  const stats = fs.statSync(src);

  if (stats.isDirectory()) {
    fs.mkdirSync(dest, { recursive: true });

    for (const file of fs.readdirSync(src)) {
      copyRecursive(path.join(src, file), path.join(dest, file));
    }
  } else {
    fs.copyFileSync(src, dest);
  }
}

export default function scaffold(projectName) {
  if (!projectName || projectName.startsWith("-")) {
    log(chalk.red("Please provide a project name."));
    process.exit(1);
  }

  const templatePath = path.join(__dirname, "../templates/basic");
  const targetPath = path.join(process.cwd(), projectName);

  if (fs.existsSync(targetPath)) {
    log(chalk.red(`Folder "${projectName}" already exists.`));
    process.exit(1);
  }

  copyRecursive(templatePath, targetPath);

  const packagePath = path.join(targetPath, "package.json");
  if (fs.existsSync(packagePath)) {
    const pkg = JSON.parse(fs.readFileSync(packagePath, "utf8"));
    pkg.name = projectName;
    fs.writeFileSync(packagePath, JSON.stringify(pkg, null, 2));
  }

  log(
    "Project " +
      chalk.yellow(`${projectName}`) +
      " created at " +
      chalk.blue(`${targetPath}`),
  );

  if (!fs.existsSync(packagePath)) {
    return;
  }

  const child = spawn("npm", ["install"], {
    cwd: targetPath,
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (code) => {
    if (code === 0) {
      log(chalk.green("Dependencies installed"));
    } else {
      log(chalk.red("npm install failed"));
      process.exit(code ?? 1);
    }
  });
}
