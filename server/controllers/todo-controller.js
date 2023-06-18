import { todoStore } from '../services/todo-store.js';
import { SecurityUtil } from '../utils/security.js';

export class TodosController {

  getTodos = async (req, res) => {
    res.json((await todoStore.all(SecurityUtil.currentUser(req)) || []))
  };

  addTodo = async (req, res) => {
    res.json(await todoStore.add(req.body.name, SecurityUtil.currentUser(req)));
  };

  // TODO edit
  editTodo = async (req, res) => {
    res.json(await todoStore.get(req.params.id, SecurityUtil.currentUser(req)));
  };

  deleteTodo = async (req, res) => {
    res.json(await todoStore.delete(req.params.id, SecurityUtil.currentUser(req))); // TODO should return 402 if not ok
  };
}

export const todosController = new TodosController();
