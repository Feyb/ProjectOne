import { todoController } from "./controllers/todo-controller.js";
import { dateNow, registerThemeToggle } from './util.js';

todoController.renderTodos();
dateNow();
registerThemeToggle("theme-toggle");
