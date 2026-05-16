import { readNotes } from "../utils/db.js";
import chalk from "chalk";

const log = console.log;

export default function listCommand(program) {
  program
    .command("list")
    .description("List all notes")

    .action(() => {
      const notes = readNotes();

      if (notes.length === 0) {
        log(chalk.yellow("No notes found"));
        return;
      }

      notes.forEach((note, index) => {
        log(`${index + 1}. ${note.text}`);
      });
    });
}
