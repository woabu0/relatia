import { Request, Response } from "express";
import Lead from "../models/lead.model";

export const createLead = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { name, email, phone, company, source, notes, status } = req.body;
    
    if (!name || !email || !phone) {
      return res.status(400).json({ message: "Name, email and phone are required" });
    }

    const lead = await Lead.create({
      name,
      email,
      phone,
      company,
      source: source || "website",
      status: status || "new",
      notes,
      createdBy: req.user.id
    });

    const populatedLead = await Lead.findById(lead._id)
      .populate("createdBy", "username email name")
      .select("-__v");

    res.status(201).json({
      message: "Lead created successfully",
      lead: populatedLead
    });
  } catch (error: unknown) {
    console.error("Create lead error:", error);
    
    // Handle MongoDB duplicate key error
    if (error instanceof Error && 'code' in error && error.code === 11000) {
      return res.status(400).json({ 
        message: "A lead with this email or phone already exists" 
      });
    }
    
    res.status(500).json({ 
      message: "Server error", 
      error: error instanceof Error ? error.message : 'Unknown error' 
    });
  }
};

export const getLeads = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { status, source, page = 1, limit = 10 } = req.query;
    
    const filter: any = { createdBy: req.user.id };
    
    if (status) filter.status = status;
    if (source) filter.source = source;

    const pageNum = parseInt(page as string);
    const limitNum = parseInt(limit as string);
    const skip = (pageNum - 1) * limitNum;

    const leads = await Lead.find(filter)
      .populate("createdBy", "username email name")
      .select("-__v")
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limitNum);

    const total = await Lead.countDocuments(filter);
    const totalPages = Math.ceil(total / limitNum);

    res.json({ 
      leads,
      pagination: {
        currentPage: pageNum,
        totalPages,
        totalLeads: total,
        hasNext: pageNum < totalPages,
        hasPrev: pageNum > 1
      }
    });
  } catch (error: unknown) {
    console.error("Get leads error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const getLeadById = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { leadId } = req.params;

    const lead = await Lead.findOne({ 
      _id: leadId, 
      createdBy: req.user.id 
    })
    .populate("createdBy", "username email name")
    .select("-__v");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ lead });
  } catch (error: unknown) {
    console.error("Get lead by ID error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const updateLead = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { leadId } = req.params;
    const updateData = req.body;

    const lead = await Lead.findOneAndUpdate(
      { _id: leadId, createdBy: req.user.id },
      updateData,
      { new: true, runValidators: true }
    )
    .populate("createdBy", "username email name")
    .select("-__v");

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead updated successfully", lead });
  } catch (error: unknown) {
    console.error("Update lead error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};

export const deleteLead = async (req: Request, res: Response) => {
  try {
    if (!req.user) {
      return res.status(401).json({ message: "User not authenticated" });
    }

    const { leadId } = req.params;

    const lead = await Lead.findOneAndDelete({ 
      _id: leadId, 
      createdBy: req.user.id 
    });

    if (!lead) {
      return res.status(404).json({ message: "Lead not found" });
    }

    res.json({ message: "Lead deleted successfully" });
  } catch (error: unknown) {
    console.error("Delete lead error:", error);
    res.status(500).json({ 
      message: "Server error",
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
};