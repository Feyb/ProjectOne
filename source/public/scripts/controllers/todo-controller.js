import { todoService } from "../services/todo-service";

export default class TodoController {
  dialogId = "dialog";

  constructor() {
    this.todoService = todoService;
    this.todoContainer = document.querySelector("#todo-container");
    this.template = document.querySelector("#todo-template");
  }

  addEventListeners() {
    document.addEventListener("click", event => {
      if (event.target.dataset.action === 'edit') {
        editListener();
      }
      if (event.target.dataset.action === 'add') {

      }
      if (event.target.dataset.action === 'save') {

      }
      if (event.target.dataset.action === 'close') {

      }
      if (event.target.dataset.action === 'sortBy') {

      }
    });
  }

  renderTodos() {
    const todos = this.todoService.getTodos();
    const source = this.template.innerHTML;
    const template = Handlebars.compile(source);
    this.todoContainer.innerHTML = template({ todos });
  }

  showDialog() {
    const dialogElement = document.querySelector(`#${this.dialogId}`);
    dialogElement.show();
  }

  editListener() {
    showDialog();
  }
}

export const todoController = new TodoController();