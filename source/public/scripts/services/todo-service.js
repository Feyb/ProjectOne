import { sortByAsc, sortByDesc } from '../util.js';
import { todoStorage } from "./data/storage.js";

export default class TodoService {
  constructor() {
    this.todoStorage = todoStorage;
  }

  getTodos() {
    return this.todoStorage.todos;
  }

  getTodoById(id) {
    return this.findTodoById(id);
  }

  addTodo(todo) {
    this.todoStorage.addTodo(todo);
  }

  deleteTodoById(id) {
    this.todoStorage.deleteTodoById(id);
  }

  updateTodoById(id, updatedTodo) {
    const index = this.findTodoIndexById(id);
    if (index !== -1) {
      this.todoStorage.todos[index] = updatedTodo;
      this.todoStorage.saveTodos();
    }
  }

  updateAllTodos(updatedTodos) {
    this.todoStorage.todos = updatedTodos;
    this.todoStorage.saveTodos();
  }

  toggleFinished(todoId) {
    const index = this.findTodoIndexById(todoId);
    if (index !== -1) {
      const current = this.todoStorage.todos[index].finished;
      this.todoStorage.todos[index].finished = !current;
    }
  }

  findTodoIndexById(id) {
    return this.todoStorage.todos.findIndex(
      (todo) => todo.id === parseInt(id, 10)
    );
  }

  findTodoById(id) {
    return this.todoStorage.todos.find(
      (todo) => todo.id === parseInt(id, 10)
    );
  }

  sortBy(property, type) {
    if (type === 'asc') {
      return this.todoStorage.todos.sort((a, b) => sortByAsc(a, b, property));
    }
    return this.todoStorage.todos.sort((a, b) => sortByDesc(a, b, property));
  }
}

export const todoService = new TodoService();
