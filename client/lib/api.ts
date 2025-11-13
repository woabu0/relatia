const DEFAULT_API_BASE_URL = "http://localhost:8000/api";

const sanitizeBaseUrl = (value: string) => value.replace(/\/+$/, "");

export const API_BASE_URL = sanitizeBaseUrl(
  process.env.NEXT_PUBLIC_API_URL ?? DEFAULT_API_BASE_URL,
);

type RequestOptions = RequestInit & {
  skipAuth?: boolean;
};

class ApiService {
  private buildUrl(endpoint: string) {
    return `${API_BASE_URL}${endpoint.startsWith("/") ? "" : "/"}${endpoint}`;
  }

  private buildHeaders(
    options: RequestOptions,
    token: string | null,
  ): Headers {
    const headers = new Headers(options.headers ?? undefined);

    const hasBody =
      options.body !== undefined && !(options.body instanceof FormData);

    if (hasBody && !headers.has("Content-Type")) {
      headers.set("Content-Type", "application/json");
    }

    if (!options.skipAuth && token && !headers.has("Authorization")) {
      headers.set("Authorization", `Bearer ${token}`);
    }

    return headers;
  }

  private async request(endpoint: string, options: RequestOptions = {}) {
    const token = typeof window !== "undefined" ? localStorage.getItem("token") : null;

    const response = await fetch(this.buildUrl(endpoint), {
      ...options,
      headers: this.buildHeaders(options, token),
    });

    const contentType = response.headers.get("Content-Type");
    const canParseJson = contentType?.includes("application/json");
    const payload = canParseJson ? await response.json().catch(() => ({})) : null;

    if (!response.ok) {
      const message =
        (payload && typeof payload === "object" && "message" in payload
          ? (payload as { message?: string }).message
          : undefined) ?? `API error: ${response.status}`;
      throw new Error(message);
    }

    return payload;
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request("/auth/login", {
      method: "POST",
      body: JSON.stringify({ email, password }),
      skipAuth: true,
    });
  }

  async register(userData: unknown) {
    return this.request("/auth/register", {
      method: "POST",
      body: JSON.stringify(userData),
      skipAuth: true,
    });
  }

  // Lead endpoints
  async createLead(leadData: unknown) {
    return this.request("/leads", {
      method: "POST",
      body: JSON.stringify(leadData),
    });
  }

  async getLeads(filters?: { status?: string; source?: string }) {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append("status", filters.status);
    if (filters?.source) queryParams.append("source", filters.source);

    const query = queryParams.toString();
    return this.request(`/leads${query ? `?${query}` : ""}`);
  }

  async updateLead(leadId: string, updateData: unknown) {
    return this.request(`/leads/${leadId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  async deleteLead(leadId: string) {
    return this.request(`/leads/${leadId}`, {
      method: "DELETE",
    });
  }

  // Task endpoints
  async createTask(taskData: unknown) {
    return this.request("/tasks", {
      method: "POST",
      body: JSON.stringify(taskData),
    });
  }

  async getTasks(params?: { status?: string; priority?: string; page?: number; limit?: number }) {
    const search = new URLSearchParams();
    if (params?.status) search.append("status", params.status);
    if (params?.priority) search.append("priority", params.priority);
    if (params?.page) search.append("page", params.page.toString());
    if (params?.limit) search.append("limit", params.limit.toString());

    const query = search.toString();
    return this.request(`/tasks${query ? `?${query}` : ""}`);
  }

  async updateTask(taskId: string, updateData: unknown) {
    return this.request(`/tasks/${taskId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  async deleteTask(taskId: string) {
    return this.request(`/tasks/${taskId}`, {
      method: "DELETE",
    });
  }

  // Ticket endpoints
  async createTicket(ticketData: unknown) {
    return this.request("/tickets", {
      method: "POST",
      body: JSON.stringify(ticketData),
    });
  }

  async getTickets(params?: {
    status?: string;
    priority?: string;
    category?: string;
    page?: number;
    limit?: number;
  }) {
    const search = new URLSearchParams();
    if (params?.status) search.append("status", params.status);
    if (params?.priority) search.append("priority", params.priority);
    if (params?.category) search.append("category", params.category);
    if (params?.page) search.append("page", params.page.toString());
    if (params?.limit) search.append("limit", params.limit.toString());

    const query = search.toString();
    return this.request(`/tickets${query ? `?${query}` : ""}`);
  }

  async updateTicket(ticketId: string, updateData: unknown) {
    return this.request(`/tickets/${ticketId}`, {
      method: "PUT",
      body: JSON.stringify(updateData),
    });
  }

  async deleteTicket(ticketId: string) {
    return this.request(`/tickets/${ticketId}`, {
      method: "DELETE",
    });
  }

  async getTicketStats() {
    return this.request("/tickets/stats");
  }

  async getUserStats() {
    return this.request("/users/stats");
  }
}

export const apiService = new ApiService();