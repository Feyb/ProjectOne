import { todoStore } from '../services/todo-store.js';
import { SecurityUtil } from '../utils/security.js';

export class TodosController {

  getTodos = async (req, res) => {
    res.json((await todoStore.all(req.query.sortBy, SecurityUtil.currentUser(req)) || []))
  };

  addTodo = async (req, res) => {
    const todo = req.body
    todo.userName = SecurityUtil.currentUser(req);
    res.json(await todoStore.add(todo));
  };

  getTodoById = async (req, res) => {
    const r = await todoStore.get(req.params.id);
    console.log(r)
    res.json(r);
  };

  updateTodo = async (req, res) => {
    res.json(await todoStore.update(req.params.id, req.body));
  };

  deleteTodo = async (req, res) => {
    res.json(await todoStore.delete(req.params.id, SecurityUtil.currentUser(req))); // TODO should return 402 if not ok
  };
}

export const todoController = new TodosController();
