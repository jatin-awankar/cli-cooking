import runGitCommand from "../utils/gitRunner.js";

export default function branchCommand(program) {
  program
    .command("branch")
    .description("Show the branches of the repository")
    .action(() => {
      runGitCommand(["branch"]);
    });
}
