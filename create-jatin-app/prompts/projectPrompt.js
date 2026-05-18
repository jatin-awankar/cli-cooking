import inquirer from "inquirer";

const FRAMEWORK_CHOICES = [
  {
    name: "Vanilla Node (minimal starter)",
    value: "vanilla",
    description: "Plain Node.js app with src/index",
  },
  {
    name: "Express (REST API server)",
    value: "express",
    description: "Express server with a sample route",
  },
  {
    name: "Next.js (React full-stack)",
    value: "next",
    description: "Next.js App Router project",
  },
  {
    name: "React + Vite (SPA)",
    value: "react-vite",
    description: "Vite-powered React single-page app",
  },
];

function validateProjectName(input) {
  const name = input.trim();

  if (!name) {
    return "Project name is required";
  }

  if (!/^[a-z0-9][a-z0-9._-]*$/i.test(name)) {
    return "Use letters, numbers, dots, hyphens, or underscores (must start with a letter or number)";
  }

  return true;
}

export default async function runProjectPrompt() {
  return inquirer.prompt([
    {
      type: "input",
      name: "projectName",
      message: "Project name:",
      default: "my-app",
      validate: validateProjectName,
    },
    {
      type: "select",
      name: "framework",
      message: "Choose framework:",
      choices: FRAMEWORK_CHOICES,
      default: "vanilla",
      loop: false,
      pageSize: 8,
    },
    {
      type: "confirm",
      name: "typescript",
      message: "Use TypeScript?",
      default: (answers) =>
        answers.framework === "next" || answers.framework === "react-vite",
    },
    {
      type: "confirm",
      name: "installDependencies",
      message: "Install dependencies?",
      default: true,
    },
    {
      type: "confirm",
      name: "gitInit",
      message: "Initialize git repository?",
      default: true,
    },
  ]);
}
