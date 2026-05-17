#!/usr/bin/env node

import { Command } from "commander";

import registerAddCommand from "./commands/add.js";
import registerListCommand from "./commands/list.js";
import registerDoneCommand from "./commands/done.js";
import registerDeleteCommand from "./commands/delete.js";
import registerClearCommand from "./commands/clear.js";

const program = new Command();

program.name("todo").description("Professional Todo CLI").version("1.0.0");

registerAddCommand(program);
registerListCommand(program);
registerDoneCommand(program);
registerDeleteCommand(program);
registerClearCommand(program);

program.parse();
