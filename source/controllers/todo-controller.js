import { httpService } from '../services/http-service.js';
import { todoService } from "../services/todo-service.js";

export default class TodoController {
  dialogId = "dialog";
  containerId = "todo-container";
  templateId = "todo-template";
  sortId = "sort-select";
  sortByDirectionId = "sort-direction";
  userNameId = "user-name";
  filterId = "filter";

  constructor() {
    this.todoContinerElement = document.querySelector(`#${this.containerId}`);
    this.templateElement = document.querySelector(`#${this.templateId}`);
    this.dialogElement = document.querySelector(`#${this.dialogId}`);
    this.sortElement = document.querySelector(`#${this.sortId}`);
    this.loggedInUser = document.querySelector(`#${this.userNameId}`);
    this.filterBtn = document.querySelector(`#${this.filterId}`);
    this.sortByDirectionBtn = document.querySelector(`#${this.sortByDirectionId}`);
    this.saveBtn = document.querySelector('#save-todo');
    this.formData = document.forms.form;
    this.sortByDirection = true;
    this.sortBy = '_id';
    this.filter = false;
  }

  addEventListeners() {
    // all click actions
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
        console.log('hii')
        await this.delete(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'finished') {
        await this.toggleFinished(event.target.dataset.id);
      }
      if (event.target.dataset.action === 'sortByDirection') {
        this.changeSortByDirection();
      }
      if (event.target.dataset.action === 'filter') {
        this.hideShowFinished();
      }
      if (event.target.dataset.action && event.target.dataset.action !== 'sortBy') {
        this.renderTodos();
      }
    });

    // form validation
    this.formData.addEventListener('keyup', () => { this.validateForm() });
    this.formData.addEventListener('change', () => { this.validateForm() });

    // submit form
    document.addEventListener("submit", async (event) => {
      event.preventDefault();
      if (this.formData.id.value) {
        await this.editTodo(this.formData.id.value);
      } else {
        await this.addTodo();
      }

      this.closeDialog();
    });

    //sort
    document.addEventListener("change", async (event) => {
      if (event.target.dataset.action === 'sortBy') {
        this.getTodosSortBy(event.target.value)
      }
    });

    // handlebars
    Handlebars.registerHelper('times', function (n, block) {
      var accum = '';
      for (var i = 0; i < n; ++i)
        accum += block.fn(i);
      return accum;
    });
  }

  hideShowFinished() {
    this.filter = !this.filter;
  }

  changeSortByDirection() {
    this.sortByDirection = !this.sortByDirection;
  }

  validateForm() {
    let isValid = true;
    // Iterate over the form elements and check their validity
    for (let i = 0; i < form.elements.length; i++) {
      if (!form.elements[i].checkValidity()) {
        isValid = false;
        break;
      }
    }
    this.saveBtn.disabled = !isValid;
  }

  async deleteAll() {
    await todoService.deleteAll();
  }

  async renderTodos() {
    const loggedIn = httpService.hasAuthToken();
    let todos = [];
    if (loggedIn) {
      todos = await todoService.getTodos(this.sortBy, this.sortByDirection, this.filter);
    }

    const source = this.templateElement.innerHTML;
    const template = Handlebars.compile(source);
    this.todoContinerElement.innerHTML = template({ todos });
  }

  showDialog() {
    this.dialogElement.showModal();
  }

  closeDialog() {
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
    this.formData.userName = todo.userName;

    this.validateForm();

    this.showDialog();
  }

  async delete(id) {
    await todoService.deleteTodoById(id);
  }

  async addTodo() {
    const newTodo = {
      title: this.formData.title.value,
      description: this.formData.description.value,
      dueDate: this.formData.dueDate.value,
      priority: this.formData.priority.value,
      finished: this.formData.finished.checked,
      userName: this.loggedInUser
    };

    console.log(this.formData.finished.checked);

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
  }

  getTodosSortBy(value) {
    this.sortBy = value;
    this.renderTodos();
  }

}
