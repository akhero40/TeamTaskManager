import { Router } from "express";
import Project from "../models/Project.js";
import Task from "../models/Task.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Get all projects (Admins see all, Members see projects they have tasks in)
router.get("/", authenticate, async (req, res) => {
  try {
    const user = req.user;
    let projects;

    if (user.role === "ADMIN") {
      projects = await Project.find()
        .populate('ownerId', 'name email')
        .populate('tasks');
    } else {
      // Find all tasks assigned to the user to get the project IDs
      const assignedTasks = await Task.find({ assigneeId: user.id });
      const projectIds = assignedTasks.map(t => t.projectId);

      projects = await Project.find({ _id: { $in: projectIds } })
        .populate('ownerId', 'name email')
        .populate('tasks');
    }

    res.json(projects);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch projects" });
  }
});

// Create a project (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const { name, description } = req.body;
    const user = req.user;

    const project = await Project.create({
      name,
      description,
      ownerId: user.id,
    });

    res.status(201).json(project);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create project" });
  }
});

export default router;
