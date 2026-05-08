import express from "express";
import { 
  createTask, 
  getTasks, 
  updateTaskStatus, 
  getDashboard 
} from "../controllers/taskController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/dashboard", protect, getDashboard); 
router.post("/", protect, createTask);
router.get("/", protect, getTasks);
router.put("/:id", protect, updateTaskStatus);

export default router;