import { getTodos } from "../services/todoService.js";
import { renderTodos, info } from "../utils/ui.js";

export default function (program) {
  program
    .command("list")
    .description("List all todos")
    .action(() => {
      const todos = getTodos();

      if (todos.length === 0) {
        info("No todos found");
        return;
      }

      renderTodos(todos);
    });
}
