#!/usr/bin/env node

import { program } from "commander";
import runCommand from "./commands/run.js";

program.name("devrunner").description("Developer Runner CLI").version("1.0.0");

runCommand(program);

program.parse(process.argv);
