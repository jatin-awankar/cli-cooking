#!/usr/bin/env node

import { program } from "commander";
import statusCommand from "./commands/status.js";
import logCommand from "./commands/log.js";
import branchCommand from "./commands/branch.js";

program.name("git-helper").description("Git Helper CLI").version("1.0.0");

if (process.argv[2] === "status") {
  statusCommand(program);
} else if (process.argv[2] === "log") {
  logCommand(program);
} else if (process.argv[2] === "branch") {
  branchCommand(program);
} else {
  console.error("Invalid command");
  process.exit(1);
}

program.parse(process.argv);
