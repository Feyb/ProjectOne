import { orderStore } from '../services/todo-store.js';
import { SecurityUtil } from '../utils/security.js';

export class TodosController {

  getTodos = async (req, res) => {
    res.json((await orderStore.all(SecurityUtil.currentUser(req)) || []))
  };

  addTodo = async (req, res) => {
    res.json(await orderStore.add(req.body.name, SecurityUtil.currentUser(req)));
  };

  // TODO edit
  editTodo = async (req, res) => {
    res.json(await orderStore.get(req.params.id, SecurityUtil.currentUser(req)));
  };

  deleteTodo = async (req, res) => {
    res.json(await orderStore.delete(req.params.id, SecurityUtil.currentUser(req))); // TODO should return 402 if not ok
  };
}

export const todosController = new TodosController();
