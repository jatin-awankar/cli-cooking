#!/usr/bin/env node

import { program } from "commander";
import scaffold from "./utils/scaffold.js";

const args = process.argv.slice(2);

if (args[0] === "create-app") {
  program
    .name("project-j")
    .version("1.0.0")
    .command("create-app")
    .argument("<project-name>", "Folder name for the new project")
    .description("Create a new app from the basic template")
    .action(scaffold);

  program.parse(process.argv);
} else if (args[0] && !args[0].startsWith("-")) {
  scaffold(args[0]);
} else {
  program
    .name("project-j")
    .version("1.0.0")
    .description("Scaffold new projects");

  program
    .command("create-app")
    .argument("<project-name>", "Folder name for the new project")
    .description("Create a new app from the basic template")
    .action(scaffold);

  program.parse(process.argv);
}
