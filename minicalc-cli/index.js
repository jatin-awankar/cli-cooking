#!/usr/bin/env node

import { program } from "commander";
import greetCommand from "./commands/greet.js";
import addCommand from "./commands/add.js";
import subCommand from "./commands/sub.js";
import mulCommand from "./commands/mul.js";
import divCommand from "./commands/div.js";
import modCommand from "./commands/mod.js";

program.name("minicalc").description("Minimal Calculator CLI").version("1.0.0");

if (process.argv[2] === "greet") {
  greetCommand(process.argv[3], process.argv[4]);
} else if (process.argv[2] === "add") {
  addCommand(process.argv[3], process.argv[4]);
} else if (process.argv[2] === "sub") {
  subCommand(process.argv[3], process.argv[4]);
} else if (process.argv[2] === "mul") {
  mulCommand(process.argv[3], process.argv[4]);
} else if (process.argv[2] === "div") {
  divCommand(process.argv[3], process.argv[4]);
} else if (process.argv[2] === "mod") {
  modCommand(process.argv[3], process.argv[4]);
} else {
  console.error("Invalid command");
  process.exit(1);
}

console.log(process.argv);
