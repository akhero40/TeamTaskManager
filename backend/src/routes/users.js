import { Router } from "express";
import User from "../models/User.js";
import { authenticate, requireAdmin } from "../middleware/auth.js";

const router = Router();

// Get all users (Admin only, needed to assign tasks)
router.get("/", authenticate, requireAdmin, async (req, res) => {
  try {
    const users = await User.find().select('name email role');
    res.json(users);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Failed to fetch users" });
  }
});

export default router;
