import runGitCommand from "../utils/gitRunner.js";

export default function statusCommand(program) {
  program
    .command("status")
    .description("Show the status of the repository")
    .action(() => {
      runGitCommand(["status"]);
    });
}
