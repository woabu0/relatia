const API_BASE_URL = 'http://localhost:8000/api';

class ApiService {
  private async request(endpoint: string, options: RequestInit = {}) {
    const token = localStorage.getItem('token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { Authorization: `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    const response = await fetch(`${API_BASE_URL}${endpoint}`, config);
    
    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(errorData.message || `API error: ${response.status}`);
    }
    
    return response.json();
  }

  // Auth endpoints
  async login(email: string, password: string) {
    return this.request('/auth/login', {
      method: 'POST',
      body: JSON.stringify({ email, password }),
    });
  }

  async register(userData: any) {
    return this.request('/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // Lead endpoints
  async createLead(leadData: any) {
    return this.request('/leads', {
      method: 'POST',
      body: JSON.stringify(leadData),
    });
  }

  async getLeads(filters?: { status?: string; source?: string }) {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.source) queryParams.append('source', filters.source);
    
    const query = queryParams.toString();
    return this.request(`/leads${query ? `?${query}` : ''}`);
  }

  async updateLead(leadId: string, updateData: any) {
    return this.request(`/leads/${leadId}`, {
      method: 'PUT',
      body: JSON.stringify(updateData),
    });
  }

  // Call endpoints
  async scheduleCall(callData: any) {
    return this.request('/calls', {
      method: 'POST',
      body: JSON.stringify(callData),
    });
  }

  async getCalls(filters?: { status?: string; type?: string }) {
    const queryParams = new URLSearchParams();
    if (filters?.status) queryParams.append('status', filters.status);
    if (filters?.type) queryParams.append('type', filters.type);
    
    const query = queryParams.toString();
    return this.request(`/calls${query ? `?${query}` : ''}`);
  }

  async updateCallStatus(callId: string, status: string, notes?: string, outcome?: string) {
    return this.request(`/calls/${callId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status, notes, outcome }),
    });
  }
}

export const apiService = new ApiService();