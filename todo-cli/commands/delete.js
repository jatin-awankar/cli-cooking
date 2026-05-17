import inquirer from "inquirer";

import { deleteTodo } from "../services/todoService.js";

import { success } from "../utils/ui.js";

export default function (program) {
  program
    .command("delete")
    .description("Delete todo")
    .argument("<id>", "Todo ID")
    .action(async (id) => {
      const answer = await inquirer.prompt([
        {
          type: "confirm",
          name: "confirm",
          message: "Are you sure you want to delete?",
        },
      ]);

      if (!answer.confirm) {
        return;
      }

      deleteTodo(id);

      success("Todo deleted");
    });
}
