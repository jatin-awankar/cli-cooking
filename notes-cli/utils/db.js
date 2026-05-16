import { existsSync, mkdirSync, readFileSync, writeFileSync } from "fs";
import { dirname, join } from "path";
import { fileURLToPath } from "url";
import chalk from "chalk";

const log = console.log;

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "../data/notes.json");

export function readNotes() {
  if (!existsSync(dbPath)) {
    return [];
  }

  try {
    const data = readFileSync(dbPath, "utf8");
    const notes = JSON.parse(data);
    return Array.isArray(notes) ? notes : [];
  } catch {
    log(chalk.red("Could not read notes file."));
    return [];
  }
}

export function writeNotes(notes) {
  mkdirSync(dirname(dbPath), { recursive: true });
  writeFileSync(dbPath, JSON.stringify(notes, null, 2));
}
