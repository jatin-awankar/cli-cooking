#!/usr/bin/env node

import { program } from "commander";
import addCommand from "./commands/add.js";
import listCommand from "./commands/list.js";
import removeCommand from "./commands/remove.js";
import clearCommand from "./commands/clear.js";

program.name("notes").description("CLI notes app").version("1.0.0");

addCommand(program);
listCommand(program);
removeCommand(program);
clearCommand(program);

program.parse(process.argv);
