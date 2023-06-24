import LoginController from './controllers/login-controller.js';
import ThemeController from "./controllers/theme-controller.js";
import TodoController from "./controllers/todo-controller.js";

const login = new LoginController();
login.renderMenu();
login.addEventListeners();

const todo = new TodoController();
todo.renderTodos();
todo.addEventListeners();

const theme = new ThemeController();
theme.registerThemeToggle();
theme.headerShadow();
