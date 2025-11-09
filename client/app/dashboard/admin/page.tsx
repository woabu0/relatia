'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

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
      case 'open': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'in-progress': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'resolved': return 'bg-green-100 text-green-800 border-green-200';
      case 'closed': return 'bg-gray-100 text-gray-800 border-gray-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200';
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200';
      case 'urgent': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'technical': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'billing': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case 'feature-request': return 'bg-pink-100 text-pink-800 border-pink-200';
      case 'bug': return 'bg-red-100 text-red-800 border-red-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Redirecting...</p>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading admin dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
          <p className="text-gray-600">Manage users, tickets, and system settings</p>
        </div>
        <div className="flex space-x-3">
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
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Overview
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'border-blue-500 text-blue-600'
                : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
            }`}
          >
            Tickets ({tickets.length})
          </button>
        </nav>
      </div>

      {activeTab === 'overview' && (
        <div className="space-y-6">
          {/* Statistics Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Total Users Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-blue-100 rounded-lg">
                  <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197m13.5-9a2.5 2.5 0 11-5 0 2.5 2.5 0 015 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Users</p>
                  <p className="text-2xl font-bold text-gray-900">{userStats?.totalUsers || 0}</p>
                </div>
              </div>
            </div>

            {/* Total Tickets Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-green-100 rounded-lg">
                  <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Total Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{ticketStats?.totalTickets || 0}</p>
                </div>
              </div>
            </div>

            {/* Open Tickets Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-yellow-100 rounded-lg">
                  <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Open Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{ticketStats?.openTickets || 0}</p>
                </div>
              </div>
            </div>

            {/* Urgent Tickets Card */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
              <div className="flex items-center">
                <div className="p-3 bg-red-100 rounded-lg">
                  <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                  </svg>
                </div>
                <div className="ml-4">
                  <p className="text-sm font-medium text-gray-600">Urgent Tickets</p>
                  <p className="text-2xl font-bold text-gray-900">{ticketStats?.urgentTickets || 0}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Charts Section */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Tickets by Status */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tickets by Status</h3>
              <div className="space-y-4">
                {ticketStats?.ticketsByStatus?.map((status) => (
                  <div key={status._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${
                        status._id === 'open' ? 'bg-blue-500' :
                        status._id === 'in-progress' ? 'bg-yellow-500' :
                        status._id === 'resolved' ? 'bg-green-500' :
                        'bg-gray-500'
                      }`}></span>
                      <span className="text-sm font-medium text-gray-600 capitalize">{status._id}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-900">{status.count}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            status._id === 'open' ? 'bg-blue-500' :
                            status._id === 'in-progress' ? 'bg-yellow-500' :
                            status._id === 'resolved' ? 'bg-green-500' :
                            'bg-gray-500'
                          }`}
                          style={{ width: `${(status.count / (ticketStats?.totalTickets || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No ticket data available</p>
                )}
              </div>
            </div>

            {/* Tickets by Category */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Tickets by Category</h3>
              <div className="space-y-4">
                {ticketStats?.ticketsByCategory?.map((category) => (
                  <div key={category._id} className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <span className={`w-3 h-3 rounded-full ${
                        category._id === 'technical' ? 'bg-purple-500' :
                        category._id === 'billing' ? 'bg-indigo-500' :
                        category._id === 'feature-request' ? 'bg-pink-500' :
                        category._id === 'bug' ? 'bg-red-500' :
                        'bg-gray-500'
                      }`}></span>
                      <span className="text-sm font-medium text-gray-600 capitalize">{category._id.replace('-', ' ')}</span>
                    </div>
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-bold text-gray-900">{category.count}</span>
                      <div className="w-32 bg-gray-200 rounded-full h-2">
                        <div 
                          className={`h-2 rounded-full ${
                            category._id === 'technical' ? 'bg-purple-500' :
                            category._id === 'billing' ? 'bg-indigo-500' :
                            category._id === 'feature-request' ? 'bg-pink-500' :
                            category._id === 'bug' ? 'bg-red-500' :
                            'bg-gray-500'
                          }`}
                          style={{ width: `${(category.count / (ticketStats?.totalTickets || 1)) * 100}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                )) || (
                  <p className="text-gray-500 text-center py-4">No category data available</p>
                )}
              </div>
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="bg-white rounded-xl shadow-sm border border-gray-200">
          <div className="p-6 border-b border-gray-200">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="text-lg font-semibold text-gray-900">All Tickets</h3>
                <p className="text-gray-600">Manage and update ticket status</p>
              </div>
              <div className="text-sm text-gray-500">
                Showing {tickets.length} tickets
              </div>
            </div>
          </div>
          
          <div className="p-6">
            {tickets.length === 0 ? (
              <div className="text-center py-12">
                <svg className="mx-auto h-16 w-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                <p className="text-gray-500 text-lg mb-2">No tickets found</p>
                <p className="text-gray-400 text-sm">When users create tickets, they will appear here.</p>
              </div>
            ) : (
              <div className="space-y-4">
                {tickets.map((ticket) => (
                  <div 
                    key={ticket._id} 
                    className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-all cursor-pointer"
                    onClick={() => setSelectedTicket(ticket)}
                  >
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-3">
                          <h4 className="font-semibold text-gray-900 text-lg">{ticket.title}</h4>
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
                        
                        <p className="text-gray-600 mb-3 line-clamp-2">{ticket.description}</p>
                        
                        <div className="flex items-center space-x-6 text-sm text-gray-500">
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
                          className="text-sm border border-gray-300 rounded-md px-3 py-1 focus:outline-none focus:ring-2 focus:ring-blue-500 bg-white"
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
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="p-6">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{selectedTicket.title}</h2>
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
                  className="text-gray-400 hover:text-gray-600 p-2 rounded-full hover:bg-gray-100"
                >
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">Description</h3>
                  <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{selectedTicket.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-6">
                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Created By</h3>
                    <div className="bg-gray-50 p-4 rounded-lg">
                      <p className="font-medium text-gray-900">{selectedTicket.createdBy.username}</p>
                      <p className="text-gray-600 text-sm">{selectedTicket.createdBy.email}</p>
                      {selectedTicket.createdBy.companyName && (
                        <p className="text-gray-600 text-sm">{selectedTicket.createdBy.companyName}</p>
                      )}
                    </div>
                  </div>

                  <div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2">Ticket Information</h3>
                    <div className="bg-gray-50 p-4 rounded-lg space-y-2">
                      <div className="flex justify-between">
                        <span className="text-gray-600">Created:</span>
                        <span className="font-medium">{new Date(selectedTicket.createdAt).toLocaleDateString()}</span>
                      </div>
                      <div className="flex justify-between">
                        <span className="text-gray-600">Last Updated:</span>
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