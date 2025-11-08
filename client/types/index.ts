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