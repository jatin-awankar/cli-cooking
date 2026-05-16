import { readNotes, writeNotes } from "../utils/db.js";
import chalk from "chalk";

const log = console.log;

export default function addCommand(program) {
  program
    .command("add")
    .argument("<note>")
    .description("Add a note")
    .action((note) => {
      const notes = readNotes();

      const newNote = {
        id: Date.now(),
        text: note,
      };

      notes.push(newNote);

      writeNotes(notes);

      log(chalk.green("Notes Added"));
    });
}
