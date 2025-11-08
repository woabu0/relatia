import { Request, Response } from "express";
import Task from "../models/task.model";

export const createTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { title, description, dueDate, priority, relatedTo } = req.body;
    
    if (!title || !dueDate) {
      return res.status(400).json({ message: "Title and due date are required" });
    }

    const taskData: any = {
      title,
      description,
      dueDate: new Date(dueDate),
      priority: priority || "medium",
      status: "pending",
      createdBy: req.user.id
    };

    if (relatedTo && relatedTo.id) {
      taskData.relatedTo = relatedTo;
    }

    const task = await Task.create(taskData);

    let populatedTask = await Task.findById(task._id)
      .populate("createdBy", "username email name")
      .select("-__v");
    
    if (task.relatedTo && task.relatedTo.id) {
      populatedTask = await Task.findById(task._id)
        .populate("createdBy", "username email name")
        .populate("relatedTo.id", "name email phone company")
        .select("-__v");
    }

    res.status(201).json({
      message: "Task created successfully",
      task: populatedTask
    });
  } catch (error: unknown) {
    console.error("Create task error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export const getTasks = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { status, priority, page = 1, limit = 10 } = req.query;
    
    const filter: any = { createdBy: req.user.id };
    
    if (status) filter.status = status;
    if (priority) filter.priority = priority;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const tasks = await Task.find(filter)
      .populate("createdBy", "username email name")
      .populate("relatedTo.id", "name email phone company")
      .select("-__v")
      .sort({ dueDate: 1, priority: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Task.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.json({ 
      tasks,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalTasks: total,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error: unknown) {
    console.error("Get tasks error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getTaskById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { taskId } = req.params;

    const task = await Task.findOne({ 
      _id: taskId, 
      createdBy: req.user.id 
    })
    .populate("createdBy", "username email name")
    .populate("relatedTo.id", "name email phone company")
    .select("-__v");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ task });
  } catch (error: unknown) {
    console.error("Get task by ID error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { taskId } = req.params;
    const updateData = req.body;

    const task = await Task.findOneAndUpdate(
      { _id: taskId, createdBy: req.user.id },
      updateData,
      { new: true, runValidators: true }
    )
    .populate("createdBy", "username email name")
    .populate("relatedTo.id", "name email phone company")
    .select("-__v");

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task updated successfully", task });
  } catch (error: unknown) {
    console.error("Update task error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteTask = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { taskId } = req.params;

    const task = await Task.findOneAndDelete({ 
      _id: taskId, 
      createdBy: req.user.id 
    });

    if (!task) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.json({ message: "Task deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete task error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};