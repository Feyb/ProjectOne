import TodoService from "../services/todo-service.js";

export default class TodoController {
  dialogId = "dialog";

  containerId = "todo-container";

  templateId = "todo-template";

  sortId = "sort-select";

  constructor() {
    this.todoService = new TodoService();
    this.todoContinerElement = document.querySelector(`#${this.containerId}`);
    this.templateElement = document.querySelector(`#${this.templateId}`);
    this.dialogElement = document.querySelector(`#${this.dialogId}`);
    this.sortElement = document.querySelector(`#${this.sortId}`);
    this.formData = document.forms.form;
    this.sortByDirection = null;
  }

  addEventListeners() {
    document.addEventListener("click", event => {
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
        this.delete(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'finished') {
        this.toggleFinished(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'deleteAll') {
        this.deleteAll();
      }
      if (event.target.dataset.action === 'sortDirection') {
        this.sortByDirection = event.target.value
      }
    });

    document.addEventListener("submit", (event) => {
      event.preventDefault();
      if (this.formData.id.value) {
        this.editTodo(this.formData.id.value);
      } else {
        this.addTodo();
      }

      this.closeDialog();
      this.renderTodos();
    });

    this.sortElement.addEventListener("change", event => this.sortBy(event.target.value));
  }

  deleteAll() {
    this.todoService.deleteAll();
    this.renderTodos();
  }

  renderTodos() {
    const todos = this.todoService.getTodos();
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

  editListener(id) {
    const todo = this.todoService.getTodoById(parseInt(id, 10));

    this.formData.id.value = todo.id;
    this.formData.title.value = todo.title;
    this.formData.description.value = todo.description;
    this.formData.dueDate.value = todo.dueDate;
    this.formData.priority.value = todo.priority;
    this.formData.finished.checked = todo.finished;

    this.showDialog();
  }

  delete(id) {
    this.todoService.deleteTodoById(id);
    this.renderTodos();
  }

  addTodo() {
    const newTodo = {
      title: this.formData.title.value,
      description: this.formData.description.value,
      dueDate: this.formData.dueDate.value,
      createdAt: new Date(Date.now()),
      priority: this.formData.priority.value,
      finished: this.formData.finished.value
    }
    this.todoService.addTodo(newTodo);
  }

  editTodo(id) {
    const editTodo = this.todoService.getTodoById(parseInt(id, 10));

    editTodo.title = this.formData.title.value
    editTodo.description = this.formData.description.value;
    editTodo.dueDate = this.formData.dueDate.value;
    editTodo.priority = this.formData.priority.value;
    editTodo.finished = this.formData.finished.value;

    this.todoService.updateTodoById(id, editTodo);
  }

  toggleFinished(id) {
    const editTodo = this.todoService.getTodoById(parseInt(id, 10));

    editTodo.finished = !editTodo.finished;

    this.todoService.updateTodoById(id, editTodo);
    this.renderTodos();
  }

  sortBy(value) {
    this.todos = this.todoService.sortBy(value, 'asc');
    this.renderTodos();
  }

}
