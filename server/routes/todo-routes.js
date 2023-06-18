import express from 'express';
import { todosController } from '../controllers/todo-controller.js';

const router = express.Router();

router.get("/", todosController.getTodos);
router.post("/", todosController.addTodo);
router.get("/:id/", todosController.editTodo); // TODO Edit
router.delete("/:id/", todosController.deleteTodo);

export const todoRoutes = router;
