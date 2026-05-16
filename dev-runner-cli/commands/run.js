import runProcess from "../utils/processRunner.js";

export default function runCommand(program) {
  program
    .command("run")
    .alias("exec")
    .description("Run a command (e.g. devrunner run node app.js)")
    .allowUnknownOption()
    .argument("<command>", "Command to execute")
    .argument("[args...]", "Arguments for command")
    .action((command, args) => {
      runProcess(command, args);
    });
}
