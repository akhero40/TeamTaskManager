import { Router } from "express";
import Task from "../models/Task.js";
import { authenticate } from "../middleware/auth.js";

const router = Router();

router.get("/", authenticate, async (req, res) => {
  try {
    const user = req.user;
    const now = new Date();

    let query = {};
    if (user.role === "MEMBER") {
      query = { assigneeId: user.id };
    }

    const totalTasks = await Task.countDocuments(query);
    const completedTasks = await Task.countDocuments({ ...query, status: "DONE" });
    const inProgressTasks = await Task.countDocuments({ ...query, status: "IN_PROGRESS" });
    const todoTasks = await Task.countDocuments({ ...query, status: "TODO" });

    const overdueTasks = await Task.countDocuments({
      ...query,
      dueDate: { $lt: now },
      status: { $ne: "DONE" },
    });

    res.json({
      totalTasks,
      completedTasks,
      inProgressTasks,
      todoTasks,
      overdueTasks,
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch dashboard data" });
  }
});

export default router;
