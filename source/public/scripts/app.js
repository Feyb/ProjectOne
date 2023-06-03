import TodoController from "./controllers/todo-controller.js";
import { dateNow, initTheme, registerThemeToggle } from './util.js';

initTheme();
registerThemeToggle("theme-toggle");

const todo = new TodoController();
todo.renderTodos();
todo.addEventListeners();

dateNow();

