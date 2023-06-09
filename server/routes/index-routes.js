import express from 'express';
import { indexController } from '../controllers/index-controller.js';

const router = express.Router();

router.post("/login", indexController.login);

export const indexRoutes = router;
