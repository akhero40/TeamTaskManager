import { Router } from "express";
import Task from "../models/Task.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Get all tasks for the logged in user (or all if admin)
router.get("/", authenticate, async (req, res) => {
  try {
    const user = req.user;
    let tasks;

    if (user.role === "ADMIN") {
      tasks = await Task.find()
        .populate('projectId')
        .populate('assigneeId', 'name email');
    } else {
      tasks = await Task.find({ assigneeId: user.id })
        .populate('projectId')
        .populate('assigneeId', 'name email');
    }

    res.json(tasks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch tasks" });
  }
});

// Create a task (Admin only)
router.post("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const { title, description, projectId, assigneeId, dueDate } = req.body;

    const task = await Task.create({
      title,
      description,
      projectId,
      assigneeId: assigneeId || undefined,
      dueDate: dueDate ? new Date(dueDate) : null,
    });

    res.status(201).json(task);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to create task" });
  }
});

// Update a task (Members can update status, Admins can update anything)
router.patch("/:id", authenticate, async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, status, assigneeId, dueDate } = req.body;
    const user = req.user;

    const task = await Task.findById(id);
    if (!task) return res.status(404).json({ error: "Task not found" });

    // Members can only update status of their own tasks
    if (user.role === "MEMBER") {
      if (task.assigneeId?.toString() !== user.id) {
        return res.status(403).json({ error: "Cannot update someone else's task" });
      }
      
      const updatedTask = await Task.findByIdAndUpdate(
        id, 
        { status },
        { new: true }
      );
      return res.json(updatedTask);
    }

    // Admins can update anything
    const updatedTask = await Task.findByIdAndUpdate(
      id,
      {
        title,
        description,
        status,
        assigneeId,
        dueDate: dueDate ? new Date(dueDate) : undefined,
      },
      { new: true }
    );

    res.json(updatedTask);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to update task" });
  }
});

export default router;
