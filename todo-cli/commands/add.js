import ora from "ora";

import { addTodo } from "../services/todoService.js";
import { success } from "../utils/ui.js";

export default function (program) {
  program
    .command("add")
    .description("Add a todo")
    .argument("<text>", "Todo text")
    .action(async (text) => {
      const spinner = ora("Creating todo").start();

      await new Promise((resolve) => {
        setTimeout(resolve, 500);
      });

      const todo = addTodo(text);

      spinner.stop();

      success(`Todo added: ${todo.text}`);
    });
}
