import { todoService } from "../services/todo-service.js";

export default class TodoController {
  dialogId = "dialog";
  containerId = "todo-container";
  templateId = "todo-template";
  sortId = "sort-select";
  userNameId = "user-name"

  constructor() {
    this.todoContinerElement = document.querySelector(`#${this.containerId}`);
    this.templateElement = document.querySelector(`#${this.templateId}`);
    this.dialogElement = document.querySelector(`#${this.dialogId}`);
    this.sortElement = document.querySelector(`#${this.sortId}`);
    this.loggedInUser = document.querySelector(`#${this.userNameId}`);
    this.formData = document.forms.form;
    this.sortByDirection = null;
    this.sortBy = '_id';
  }

  addEventListeners() {
    document.addEventListener("click", async event => {
      if (event.target.dataset.action === 'edit') {
        this.editListener(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'add') {
        this.showDialog();
      }
      if (event.target.dataset.action === 'close') {
        this.closeDialog();
      }
      if (event.target.dataset.action === 'delete') {
        await this.delete(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'finished') {
        await this.toggleFinished(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'deleteAll') {
        await this.deleteAll();
      }
    });

    document.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (this.formData.id.value) {
        await this.editTodo(this.formData.id.value);
      } else {
        await this.addTodo();
      }

      this.closeDialog();
      this.renderTodos();
    });

    document.addEventListener("change", async (event) => {
      if (event.target.dataset.action === 'sortBy') {
        this.getTodosSortBy(event.target.value)
      }
    });
  }

  async deleteAll() {
    await todoService.deleteAll();
    this.renderTodos();
  }

  async renderTodos() {
    const todos = await todoService.getTodos(this.sortBy);
    const source = this.templateElement.innerHTML;
    const template = Handlebars.compile(source);
    this.todoContinerElement.innerHTML = template({ todos });
  }

  showDialog() {
    // this.dialog.attachShadow({ mode: 'open' });
    this.dialogElement.showModal();
  }

  closeDialog() {
    // this.dialog.attachShadow({ mode: 'closed' });
    this.dialogElement.close();
    this.formData.reset();
  }

  async editListener(id) {
    const todo = await todoService.getTodoById(id);

    this.formData.id.value = id;
    this.formData.title.value = todo.title;
    this.formData.description.value = todo.description;
    this.formData.dueDate.value = todo.dueDate;
    this.formData.priority.value = todo.priority;
    this.formData.finished.checked = todo.finished;

    this.showDialog();
  }

  async delete(id) {
    await todoService.deleteTodoById(id);
    this.renderTodos();
  }

  async addTodo() {
    const newTodo = {
      title: this.formData.title.value,
      description: this.formData.description.value,
      dueDate: this.formData.dueDate.value,
      priority: this.formData.priority.value,
      finished: this.formData.finished.value,
      userName: this.loggedInUser
    };
    await todoService.addTodo(newTodo);
  }

  async editTodo(id) {
    const todo = {
      title: this.formData.title.value,
      description: this.formData.description.value,
      dueDate: this.formData.dueDate.value,
      priority: this.formData.priority.value,
      finished: this.formData.finished.value
    }

    await todoService.updateTodoById(id, todo);
  }

  async toggleFinished(id) {
    const editTodo = await todoService.getTodoById(id);

    editTodo.finished = !editTodo.finished;

    await todoService.updateTodoById(id, editTodo);
    this.renderTodos();
  }

  getTodosSortBy(value) {
    this.sortBy = value;
    this.renderTodos();
  }

}
