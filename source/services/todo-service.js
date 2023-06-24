import { httpService } from './http-service.js';

class TodoService {
  async addTodo(todo) {
    return httpService.ajax("POST", "/todos/", todo);
  }

  async updateTodoById(id, todo) {
    return httpService.ajax("PUT", `/todos/${id}`, todo);
  }

  async getTodos(sortBy) {
    return httpService.ajax("GET", `/todos?sortBy=${sortBy}`, undefined);
  }

  async getTodoById(id) {
    return httpService.ajax("GET", `/todos/${id}`, undefined);
  }

  async deleteTodoById(id) {
    return httpService.ajax("DELETE", `/todos/${id}`, undefined);
  }

  async deleteAll() {
    return httpService.ajax("DELETE", `/todos/`, undefined);
  }
}

export const todoService = new TodoService();
