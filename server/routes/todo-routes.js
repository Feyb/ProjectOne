import express from 'express';
import { todoController } from '../controllers/todo-controller.js';

const router = express.Router();

router.get("/", todoController.getTodos);
router.post("/", todoController.addTodo);
router.get("/:id/", todoController.getTodoById);
router.put("/:id/", todoController.updateTodo);
router.delete("/:id/", todoController.deleteTodo);

export const todoRoutes = router;
