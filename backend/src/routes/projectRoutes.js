import express from "express";
import { 
  createProject, 
  getProjects, 
  getProjectById, 
  addMember 
} from "../controllers/projectController.js";
import { protect } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/", protect, createProject);
router.get("/", protect, getProjects);
router.get("/:id", protect, getProjectById);
router.post("/:id/invite", protect, addMember);

export default router;