import { loadTodos, saveTodos } from "../utils/storage.js";

export function addTodo(text) {
  const todos = loadTodos();
  const todo = {
    id: Date.now(),
    text,
    completed: false,
    createdAt: new Date().toISOString(),
  };

  todos.push(todo);

  saveTodos(todos);

  return todo;
}

export function getTodos() {
  return loadTodos();
}

export function completeTodo(id) {
  const todos = loadTodos();

  const todo = todos.find((todo) => todo.id === Number(id));

  if (!todo) {
    return null;
  }

  todo.completed = true;

  saveTodos(todos);

  return todo;
}

export function deleteTodo(id) {
  const todos = loadTodos();

  const filtered = todos.filter((todo) => todo.id !== Number(id));

  saveTodos(filtered);
}

export function clearCompletedTodos() {
  const todos = loadTodos();

  const activeTodos = todos.filter((todo) => !todo.completed);

  saveTodos(activeTodos);
}
