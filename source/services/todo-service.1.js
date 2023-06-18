import { sortByDate, sortByNumber, sortByString } from "../util.js";

export default class TodoService {
  constructor() {

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
    this.todoStorage.deleteById(id);
  }

  deleteAll() {
    this.todoStorage.wipeData();
  }

  updateTodoById(id, updatedTodo) {
    const index = this.findTodoIndexById(id);
    if (index !== -1) {
      this.todoStorage.todos[index] = updatedTodo;
      this.todoStorage.save();
    }
  }

  updateAllTodos(updatedTodos) {
    this.todoStorage.todos = updatedTodos;
    this.todoStorage.save();
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


}
