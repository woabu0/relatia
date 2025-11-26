'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Users, Ticket, Clock, AlertTriangle } from 'lucide-react';
import MetricCard from '../../../components/ui/MetricCard';

interface Ticket {
  _id: string;
  title: string;
  description: string;
  status: 'open' | 'in-progress' | 'resolved' | 'closed';
  priority: 'low' | 'medium' | 'high' | 'urgent';
  category: string;
  createdBy: {
    _id: string;
    username: string;
    email: string;
    companyName?: string;
  };
  assignedTo?: {
    _id: string;
    username: string;
    email: string;
  };
  createdAt: string;
  updatedAt: string;
}

interface TicketStats {
  totalTickets: number;
  openTickets: number;
  inProgressTickets: number;
  resolvedTickets: number;
  urgentTickets: number;
  recentTickets: number;
  ticketsByCategory: { _id: string; count: number }[];
  ticketsByStatus: { _id: string; count: number }[];
}

interface UserStats {
  totalUsers: number;
  adminUsers: number;
  regularUsers: number;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [ticketStats, setTicketStats] = useState<TicketStats | null>(null);
  const [userStats, setUserStats] = useState<UserStats | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'overview' | 'tickets'>('overview');
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push(`/dashboard/${user.role}`);
    } else if (user) {
      fetchDashboardData();
    }
  }, [user, router]);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);
      await Promise.all([fetchTicketStats(), fetchUserStats(), fetchTickets()]);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError('Failed to load dashboard data. Please check if the server is running.');
    } finally {
      setLoading(false);
    }
  };

  const fetchTicketStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/tickets/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch ticket stats: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setTicketStats(data);
    } catch (error) {
      console.error('Failed to fetch ticket stats:', error);
      // Don't set error here to avoid blocking the entire dashboard
    }
  };

  const fetchUserStats = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/users/stats`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch user stats: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setUserStats(data);
    } catch (error) {
      console.error('Failed to fetch user stats:', error);
      // Don't set error here to avoid blocking the entire dashboard
    }
  };

  const fetchTickets = async () => {
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      const response = await fetch(`${API_URL}/tickets`, {
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });
      
      if (!response.ok) {
        throw new Error(`Failed to fetch tickets: ${response.status} ${response.statusText}`);
      }
      
      const data = await response.json();
      setTickets(data.tickets || []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setError('Failed to load tickets. Please check your connection.');
    }
  };

  const updateTicketStatus = async (ticketId: string, status: Ticket['status']) => {
    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ status })
      });

      if (response.ok) {
        // Refresh tickets and stats
        fetchTickets();
        fetchTicketStats();
      } else {
        throw new Error('Failed to update ticket status');
      }
    } catch (error) {
      console.error('Failed to update ticket:', error);
      alert('Failed to update ticket status. Please try again.');
    }
  };

  const deleteTicket = async (ticketId: string) => {
    if (!confirm('Are you sure you want to delete this ticket? This action cannot be undone.')) {
      return;
    }

    try {
      const token = localStorage.getItem('token');
      const response = await fetch(`${API_URL}/tickets/${ticketId}`, {
        method: 'DELETE',
        headers: {
          'Authorization': `Bearer ${token}`
        }
      });

      if (response.ok) {
        // Refresh tickets and stats
        fetchTickets();
        fetchTicketStats();
        setSelectedTicket(null);
      } else {
        throw new Error('Failed to delete ticket');
      }
    } catch (error) {
      console.error('Failed to delete ticket:', error);
      alert('Failed to delete ticket. Please try again.');
    }
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'in-progress': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'resolved': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'closed': return 'bg-slate-100 text-slate-700 border-slate-700';
      default: return 'bg-slate-100 text-slate-700 border-slate-700';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'bg-emerald-100 text-emerald-700 border-emerald-200';
      case 'medium': return 'bg-amber-100 text-amber-700 border-amber-200';
      case 'high': return 'bg-orange-100 text-orange-700 border-orange-200';
      case 'urgent': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-700';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-blue-100 text-blue-700 border-blue-200';
      case 'billing': return 'bg-sky-100 text-sky-700 border-sky-200';
      case 'feature-request': return 'bg-cyan-100 text-cyan-700 border-cyan-200';
      case 'bug': return 'bg-red-100 text-red-700 border-red-200';
      default: return 'bg-slate-100 text-slate-700 border-slate-700';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-300">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-slate-300">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Admin Dashboard</h1>
          <p className="text-sm sm:text-base text-slate-300">Manage users, tickets, and system settings</p>
        </div>
        <div className="flex space-x-3 w-full sm:w-auto">
          <button
            onClick={fetchDashboardData}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors flex items-center space-x-2"
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            <span>Refresh Data</span>
          </button>
        </div>
      </div>

      {/* Error Display */}
      {error && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-4">
          <div className="flex items-center">
            <svg className="w-5 h-5 text-red-400 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <p className="text-red-800">{error}</p>
          </div>
        </div>
      )}

      {/* Tab Navigation */}
      <div className="border-b border-gray-200">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('overview')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'overview'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-slate-400 hover:text-slate-200 hover:border-slate-600'
            }`}
          >
            Tickets ({tickets.length})
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            <MetricCard
              icon={Users}
              label="Total Users"
              value={userStats?.totalUsers || 0}
              change="+15%"
              trend="up"
              color="blue"
              size="lg"
            />
            <MetricCard
              icon={Ticket}
              label="Total Tickets"
              value={ticketStats?.totalTickets || 0}
              change="+8%"
              trend="up"
              color="purple"
              size="lg"
            />
            <MetricCard
              icon={Clock}
              label="Open Tickets"
              value={ticketStats?.openTickets || 0}
              change="-12%"
              trend="down"
              color="cyan"
              size="lg"
            />
            <MetricCard
              icon={AlertTriangle}
              label="Urgent Tickets"
              value={ticketStats?.urgentTickets || 0}
              change="+5%"
              trend="up"
              color="red"
              size="lg"
            />
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
            {/* Tickets by Status */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-white">Tickets by status</h3>
              <div className="space-y-4">
                {ticketStats?.ticketsByStatus?.map((status) => (
                  <div key={status._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${
                        status._id === 'open' ? 'bg-blue-500' :
                        status._id === 'in-progress' ? 'bg-sky-400' :
                        status._id === 'resolved' ? 'bg-emerald-500' :
                        'bg-slate-300'
                      }`}></span>
                      <span className="text-sm font-medium capitalize text-slate-500">{status._id}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-white">{status.count}</span>
                      <div className="h-2 w-32 rounded-full bg-slate-200">
                        <div 
                          className={`h-2 rounded-full ${
                            status._id === 'open' ? 'bg-blue-500' :
                            status._id === 'in-progress' ? 'bg-sky-400' :
                            status._id === 'resolved' ? 'bg-emerald-500' :
                            'bg-slate-300'
                          }`}
                          style={{ width: `${(status.count / (ticketStats?.totalTickets || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <p className="py-4 text-center text-sm text-slate-400">No ticket data available</p>
                )}
              </div>
            </div>

            {/* Tickets by Category */}
            <div className="rounded-2xl border border-slate-700 bg-slate-800 p-6 shadow-sm">
              <h3 className="mb-4 text-lg font-semibold text-white">Tickets by category</h3>
              <div className="space-y-4">
                {ticketStats?.ticketsByCategory?.map((category) => (
                  <div key={category._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${
                        category._id === 'technical' ? 'bg-blue-500' :
                        category._id === 'billing' ? 'bg-sky-400' :
                        category._id === 'feature-request' ? 'bg-cyan-400' :
                        category._id === 'bug' ? 'bg-red-500' :
                        'bg-slate-300'
                      }`}></span>
                      <span className="text-sm font-medium capitalize text-slate-500">{category._id.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-semibold text-white">{category.count}</span>
                      <div className="h-2 w-32 rounded-full bg-slate-200">
                        <div 
                          className={`h-2 rounded-full ${
                            category._id === 'technical' ? 'bg-blue-500' :
                            category._id === 'billing' ? 'bg-sky-400' :
                            category._id === 'feature-request' ? 'bg-cyan-400' :
                            category._id === 'bug' ? 'bg-red-500' :
                            'bg-slate-300'
                          }`}
                          style={{ width: `${(category.count / (ticketStats?.totalTickets || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <p className="py-4 text-center text-sm text-slate-400">No category data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="rounded-2xl border border-slate-700 bg-slate-800 shadow-sm">
          <div className="border-b border-slate-700 p-6">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-white">All tickets</h3>
                <p className="text-sm text-slate-500">Manage and update ticket status</p>
              </div>
              <div className="text-sm text-slate-500">
                Showing {tickets.length} tickets
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto mb-4 h-16 w-16 text-slate-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="mb-2 text-lg text-slate-600">No tickets found</p>
                <p className="text-sm text-slate-400">When users create tickets, they will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket._id} 
                    className="cursor-pointer rounded-2xl border border-slate-700 p-4 transition hover:border-blue-200 hover:shadow-md"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="text-lg font-semibold text-white">{ticket.title}</h4>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(ticket.status)}`}>
                            {ticket.status.replace('-', ' ')}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getPriorityColor(ticket.priority)}`}>
                            {ticket.priority}
                          </span>
                          <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getCategoryColor(ticket.category)}`}>
                            {ticket.category.replace('-', ' ')}
                          </span>
                        </div>
                        
                        <p className="mb-3 line-clamp-2 text-slate-600">{ticket.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-slate-500">
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                            </svg>
                            <span>By: {ticket.createdBy.username}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                            </svg>
                            <span>{new Date(ticket.createdAt).toLocaleDateString()}</span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center space-x-2 ml-4">
                        <select
                          value={ticket.status}
                          onChange={(e) => updateTicketStatus(ticket._id, e.target.value as Ticket['status'])}
                          onClick={(e) => e.stopPropagation()}
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-slate-800"
                        >
                          <option value="open">Open</option>
                          <option value="in-progress">In Progress</option>
                          <option value="resolved">Resolved</option>
                          <option value="closed">Closed</option>
                        </select>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Ticket Detail Modal */}
      {selectedTicket && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4 z-50">
          <div className="bg-slate-800 rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-white">{selectedTicket.title}</h2>
                  <div className="flex items-center space-x-3 mt-2">
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getStatusColor(selectedTicket.status)}`}>
                      {selectedTicket.status.replace('-', ' ')}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getPriorityColor(selectedTicket.priority)}`}>
                      {selectedTicket.priority}
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-medium border ${getCategoryColor(selectedTicket.category)}`}>
                      {selectedTicket.category.replace('-', ' ')}
                    </span>
                  </div>
                </div>
                <button
                  onClick={() => setSelectedTicket(null)}
                  className="text-gray-400 hover:text-slate-300 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-white mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTicket.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Created By</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-white">{selectedTicket.createdBy.username}</p>
                      <p className="text-slate-300 text-sm">{selectedTicket.createdBy.email}</p>
                      {selectedTicket.createdBy.companyName && (
                        <p className="text-slate-300 text-sm">{selectedTicket.createdBy.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-white mb-2">Ticket Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-slate-300">Created:</span>
                        <span className="font-medium">{new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-slate-300">Last Updated:</span>
                        <span className="font-medium">{new Date(selectedTicket.updatedAt).toLocaleDateString()}</span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="flex justify-end space-x-3 pt-6 border-t border-gray-200">
                  <button
                    onClick={() => deleteTicket(selectedTicket._id)}
                    className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors"
                  >
                    Delete Ticket
                  </button>
                  <button
                    onClick={() => setSelectedTicket(null)}
                    className="bg-gray-600 text-white px-4 py-2 rounded-lg hover:bg-gray-700 transition-colors"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}