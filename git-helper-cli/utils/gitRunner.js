import { spawn } from "child_process";

function runGitCommand(args) {
  const child = spawn("git", args, {
    stdio: "inherit",
  });

  child.on("close", (code) => {
    console.log(`\nGit process exited with code ${code}`);
  });

  child.on("error", (err) => {
    console.error("Git command failed");
    console.error(err.message);
  });
}

export default runGitCommand;
