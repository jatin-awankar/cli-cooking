import { spawn } from "child_process";

function runProcess(command, args) {
  const child = spawn(command, args, {
    stdio: "inherit",
    shell: true,
  });

  child.on("close", (code) => {
    console.log(`\nProcess exited with code ${code}`);
  });

  child.on("error", (err) => {
    console.error("Failed to start process:");
    console.error(err.message);
  });
}

export default runProcess;
