import { Router } from "express";
import { addTask,  deleteTask, getAllTasks, getTaskById, updateTask } from "../controllers/task.controller.js";

const router = Router();

router.get('/tasks', getAllTasks );
router.get('/tasks/:id', getTaskById);
router.post('/tasks', addTask );
router.delete('/tasks/:id', deleteTask );
router.put('/tasks/:id', updateTask );



export default router;