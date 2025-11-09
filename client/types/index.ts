export interface Lead {
    _id: string;
    name: string;
    email: string;
    phone: string;
    company?: string;
    source: "website" | "referral" | "social" | "direct" | "other";
    status: "new" | "contacted" | "qualified" | "lost";
    notes?: string;
    createdBy: {
      _id: string;
      username: string;
      email: string;
    };
    lastContacted?: string;
    nextFollowUp?: string;
    createdAt: string;
    updatedAt: string;
  }
  
  export interface Task {
    _id: string;
    title: string;
    description?: string;
    dueDate: string;
    priority: "low" | "medium" | "high";
    status: "pending" | "in-progress" | "completed" | "cancelled";
    relatedTo?: {
      type: "lead";
      id: Lead;
    };
    createdBy: {
      _id: string;
      username: string;
      email: string;
    };
    createdAt: string;
    updatedAt: string;
  }

  // Add these to your existing types

export interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: "open" | "in-progress" | "resolved" | "closed";
  priority: "low" | "medium" | "high" | "urgent";
  category: "technical" | "billing" | "feature-request" | "bug" | "other";
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  comments: Comment[];
  attachments?: string[];
  createdAt: string;
  updatedAt: string;
}

export interface Comment {
  text: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
}

export interface TicketsResponse {
  tickets: Ticket[];
}