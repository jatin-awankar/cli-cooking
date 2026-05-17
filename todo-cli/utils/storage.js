import fs from "fs";
import path from "path";
import { TODOS_PATH } from "./paths.js";

export function loadTodos() {
  try {
    if (!fs.existsSync(TODOS_PATH)) {
      return [];
    }

    const raw = fs.readFileSync(TODOS_PATH, "utf8").trim();

    if (!raw) {
      return [];
    }

    return JSON.parse(raw);
  } catch (error) {
    console.error("Failed to load todos");
    process.exit(1);
  }
}

export function saveTodos(todos) {
  try {
    fs.mkdirSync(path.dirname(TODOS_PATH), { recursive: true });
    fs.writeFileSync(TODOS_PATH, JSON.stringify(todos, null, 2));
  } catch (error) {
    console.error("Failed to save todos");
    process.exit(1);
  }
}
