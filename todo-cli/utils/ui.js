import chalk from "chalk";
import Table from "cli-table3";

const log = console.log;

export function success(message) {
  log(chalk.green(`✔ ${message}`));
}

export function error(message) {
  console.error(chalk.red(`✖ ${message}`));
}

export function info(message) {
  log(chalk.blue(message));
}

export function renderTodos(todos) {
  const table = new Table({
    head: ["ID", "Task", "Status"],
  });

  todos.forEach((todo) => {
    table.push([
      todo.id,
      todo.text,
      todo.completed ? chalk.green("DONE") : chalk.yellow("PENDING"),
    ]);
  });

  console.log(table.toString());
}
