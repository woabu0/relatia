import { Request, Response } from "express";
import Ticket from "../models/ticket.model";

export const createTicket = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { title, description, priority, category } = req.body;
    
    if (!title || !description || !category) {
      return res.status(400).json({ message: "Title, description and category are required" });
    }

    const ticket = await Ticket.create({
      title,
      description,
      priority: priority || "medium",
      category,
      createdBy: req.user.id
    });

    const populatedTicket = await Ticket.findById(ticket._id)
      .populate("createdBy", "username email")
      .select("-__v");

    res.status(201).json({
      message: "Ticket created successfully",
      ticket: populatedTicket
    });
  } catch (error: unknown) {
    console.error("Create ticket error:", error);
    res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getTickets = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { status, priority, category, page = 1, limit = 10 } = req.query;
    
    // Admin can see all tickets, regular users only see their own
    const filter: any = req.user.role === "admin" ? {} : { createdBy: req.user.id };
    
    // Add optional filters
    if (status) filter.status = status;
    if (priority) filter.priority = priority;
    if (category) filter.category = category;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const tickets = await Ticket.find(filter)
      .populate("createdBy", "username email companyName")
      .populate("assignedTo", "username email")
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Ticket.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.json({ 
      tickets,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalTickets: total,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error: unknown) {
    console.error("Get tickets error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getTicketById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { ticketId } = req.params;

    // Admin can see any ticket, regular users only their own
    const filter: any = { _id: ticketId };
    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
    }

    const ticket = await Ticket.findOne(filter)
      .populate("createdBy", "username email companyName")
      .populate("assignedTo", "username email")
      .select("-__v");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ ticket });
  } catch (error: unknown) {
    console.error("Get ticket by ID error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateTicket = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { ticketId } = req.params;
    const updateData = req.body;

    // Admin can update any ticket, regular users only their own
    const filter: any = { _id: ticketId };
    if (req.user.role !== "admin") {
      filter.createdBy = req.user.id;
      // Regular users can only update certain fields
      delete updateData.status;
      delete updateData.assignedTo;
    }

    const ticket = await Ticket.findOneAndUpdate(
      filter,
      updateData,
      { new: true, runValidators: true }
    )
    .populate("createdBy", "username email companyName")
    .populate("assignedTo", "username email")
    .select("-__v");

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket updated successfully", ticket });
  } catch (error: unknown) {
    console.error("Update ticket error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getTicketStats = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const totalTickets = await Ticket.countDocuments();
    const openTickets = await Ticket.countDocuments({ status: "open" });
    const inProgressTickets = await Ticket.countDocuments({ status: "in-progress" });
    const resolvedTickets = await Ticket.countDocuments({ status: "resolved" });
    const urgentTickets = await Ticket.countDocuments({ priority: "urgent" });

    // Tickets by category
    const ticketsByCategory = await Ticket.aggregate([
      {
        $group: {
          _id: "$category",
          count: { $sum: 1 }
        }
      }
    ]);

    // Tickets by status
    const ticketsByStatus = await Ticket.aggregate([
      {
        $group: {
          _id: "$status",
          count: { $sum: 1 }
        }
      }
    ]);

    // Recent tickets (last 7 days)
    const sevenDaysAgo = new Date();
    sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
    const recentTickets = await Ticket.countDocuments({
      createdAt: { $gte: sevenDaysAgo }
    });

    res.json({
      totalTickets,
      openTickets,
      inProgressTickets,
      resolvedTickets,
      urgentTickets,
      recentTickets,
      ticketsByCategory,
      ticketsByStatus
    });
  } catch (error: unknown) {
    console.error("Get ticket stats error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteTicket = async (req: Request, res: Response) => {
  try {
    if (!req.user || req.user.role !== "admin") {
      return res.status(403).json({ message: "Access denied" });
    }

    const { ticketId } = req.params;

    const ticket = await Ticket.findByIdAndDelete(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Ticket not found" });
    }

    res.json({ message: "Ticket deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete ticket error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};