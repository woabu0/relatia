import { Request, Response } from "express";
import User from "../models/user.model";

export const getUserStats = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalUsers = await User.countDocuments();
    const adminUsers = await User.countDocuments({ role: "admin" });
    const regularUsers = await User.countDocuments({ role: "user" });

    res.json({
      totalUsers,
      adminUsers,
      regularUsers
    });
  } catch (error: unknown) {
    console.error("Get user stats error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getAllUsers = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const users = await User.find()
      .select("-password -__v")
      .sort({ createdAt: -1 });

    res.json({ users });
  } catch (error: unknown) {
    console.error("Get all users error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};