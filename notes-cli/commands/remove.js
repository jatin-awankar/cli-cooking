import { readNotes, writeNotes } from "../utils/db.js";
import chalk from "chalk";

const log = console.log;

export default function removeCommand(program) {
  program
    .command("remove")
    .argument("<index>")
    .description("Remove a note")

    .action((index) => {
      const notes = readNotes();

      const parsed = Number(index);
      const noteIndex = parsed - 1;

      if (
        !Number.isInteger(parsed) ||
        parsed < 1 ||
        noteIndex >= notes.length
      ) {
        log(chalk.red("Invalid index"));
        return;
      }

      notes.splice(noteIndex, 1);

      writeNotes(notes);

      log(chalk.green("Note removed"));
    });
}
