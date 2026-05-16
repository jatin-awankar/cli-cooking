import runGitCommand from "../utils/gitRunner.js";

export default function logCommand(program) {
  program
    .command("log")
    .description("Show the log of the repository")
    .action(() => {
      runGitCommand(["log"]);
    });
}
