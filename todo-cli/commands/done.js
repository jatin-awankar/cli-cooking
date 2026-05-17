import { completeTodo } from "../services/todoService.js";

import { success, error } from "../utils/ui.js";

export default function (program) {
  program
    .command("done")
    .description("Mark todo complete")
    .argument("<id>", "Todo ID")
    .action((id) => {
      const todo = completeTodo(id);

      if (!todo) {
        error("Todo not found");
        return;
      }

      success(`Completed: ${todo.text}`);
    });
}
