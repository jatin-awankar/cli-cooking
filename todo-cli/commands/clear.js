import inquirer from "inquirer";

import { clearCompletedTodos } from "../services/todoService.js";

import { success } from "../utils/ui.js";

export default function (program) {
  program
    .command("clear")
    .description("Clear completed todos")
    .action(async () => {
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Delete completed todos?",
        },
      ]);

      if (!answer.confirm) {
        return;
      }

      clearCompletedTodos();

      success("Completed todos cleared");
    });
}
