import { writeNotes } from "../utils/db.js";
import chalk from "chalk";

const log = console.log;

export default function clearCommand(program) {
  program
    .command("clear")
    .description("Remove all notes")

    .action(() => {
      writeNotes([]);

      log(chalk.green("All notes cleared"));
    });
}
