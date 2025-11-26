'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { Lead, Task, Ticket } from '../../../types';
import LeadModal from '../../../components/ui/LeadModal';
import TicketModal from '../../../components/ui/TicketModal';
import TicketsList from '../../../components/ui/TicketList';
import { apiService } from '../../../lib/api';
import { Plus } from 'lucide-react';

export default function UserDashboard() {
  const { user } = useAuth();
  const router = useRouter();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [tasks, setTasks] = useState<Task[]>([]);
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [activeTab, setActiveTab] = useState<'leads' | 'tasks' | 'tickets'>('leads');
  const [loading, setLoading] = useState(true);
  const [isLeadModalOpen, setIsLeadModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);
  const [isTicketModalOpen, setIsTicketModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    if (user && user.role !== 'user') {
      router.push(`/dashboard/${user.role}`);
    } else if (user) {
      fetchInitialData();
    }
  }, [user, router]);

  const fetchInitialData = async () => {
    try {
      setLoading(true);
      await Promise.all([fetchLeads(), fetchTasks(), fetchTickets()]);
    } catch (error) {
      console.error('Error fetching initial data:', error);
    } finally {
      setLoading(false);
    }
  };

  const fetchLeads = async () => {
    try {
      const data = await apiService.getLeads();
      setLeads(data?.leads ?? []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLeads([]);
    }
  };

  const fetchTasks = async () => {
    try {
      const data = await apiService.getTasks();
      setTasks(data?.tasks ?? []);
    } catch (error) {
      console.error('Failed to fetch tasks:', error);
      setTasks([]);
    }
  };

  const fetchTickets = async () => {
    try {
      const data = await apiService.getTickets();
      setTickets(data?.tickets ?? []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
      setTickets([]);
    }
  };

  const handleLeadAdded = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleTaskAdded = (newTask: Task) => {
    setTasks(prev => [newTask, ...prev]);
  };

  const handleTicketCreated = (newTicket: Ticket) => {
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleLeadUpdated = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead => 
      lead._id === updatedLead._id ? updatedLead : lead
    ));
    setEditingLead(null);
    setIsLeadModalOpen(false);
  };

  const handleTicketUpdated = (updatedTicket: Ticket) => {
    setTickets(prev => prev.map(ticket => 
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    ));
    setEditingTicket(null);
    setIsTicketModalOpen(false);
  };

  const openLeadModal = (lead?: Lead) => {
    setEditingLead(lead || null);
    setIsLeadModalOpen(true);
  };

  const closeLeadModal = () => {
    setIsLeadModalOpen(false);
    setEditingLead(null);
  };

  const openTicketModal = (ticket?: Ticket) => {
    setEditingTicket(ticket || null);
    setIsTicketModalOpen(true);
  };

  const closeTicketModal = () => {
    setIsTicketModalOpen(false);
    setEditingTicket(null);
  };

  const handleDeleteLead = async (leadId: string) => {
    if (!confirm('Are you sure you want to delete this lead?')) {
      return;
    }

    try {
      await apiService.deleteLead(leadId);
      setLeads(prev => prev.filter(lead => lead._id !== leadId));
    } catch (error) {
      console.error('Failed to delete lead:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete lead');
    }
  };

  const handleDeleteTask = async (taskId: string) => {
    if (!confirm('Are you sure you want to delete this task?')) {
      return;
    }

    try {
      await apiService.deleteTask(taskId);
      setTasks(prev => prev.filter(task => task._id !== taskId));
    } catch (error) {
      console.error('Failed to delete task:', error);
      alert(error instanceof Error ? error.message : 'Failed to delete task');
    }
  };

  const formatPhoneNumber = (phone: string) => {
    return phone.replace(/\D/g, '');
  };

  const getWhatsAppUrl = (phone: string) => {
    const formattedPhone = formatPhoneNumber(phone);
    return `https://wa.me/${formattedPhone}`;
  };

  if (!user || user.role !== 'user') {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p>Redirecting...</p>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <svg className="animate-spin h-8 w-8 text-blue-600 mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          <p className="text-slate-600">Loading your data...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">

      {/* Tab Navigation */}
      <div className="border-b border-slate-700">
        <nav className="-mb-px flex space-x-8">
          <button
            onClick={() => setActiveTab('leads')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'leads'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
            }`}
          >
            Leads ({leads.length})
          </button>
          <button
            onClick={() => setActiveTab('tasks')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tasks'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
            }`}
          >
            Tasks ({tasks.length})
          </button>
          <button
            onClick={() => setActiveTab('tickets')}
            className={`py-2 px-1 border-b-2 font-medium text-sm ${
              activeTab === 'tickets'
                ? 'border-blue-500 text-blue-400'
                : 'border-transparent text-slate-400 hover:text-slate-300 hover:border-slate-600'
            }`}
          >
            Tickets ({tickets.length})
          </button>
        </nav>
      </div>

      {/* Content based on active tab */}
      {activeTab === 'leads' && (
        <div className="space-y-6">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">My Leads</h2>
              <p className="text-sm text-slate-400 mt-1">Manage your customer leads</p>
            </div>
            <button
              onClick={() => openLeadModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30"
            >
              <Plus className="h-5 w-5" />
              Add Lead
            </button>
          </div>
          
          {/* Leads List */}
          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-semibold text-white">All Leads ({leads.length})</h3>
              <button
                onClick={fetchLeads}
                className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors text-slate-200"
              >
                Refresh
              </button>
            </div>
            <div className="p-4">
              {leads.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400 mb-4">No leads yet.</p>
                  <button
                    onClick={() => openLeadModal()}
                    className="text-blue-400 hover:text-blue-300 font-medium"
                  >
                    Add your first lead
                  </button>
                </div>
              ) : (
                <div className="space-y-3">
                  {leads.map(lead => (
                    <div key={lead._id} className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg text-white">{lead.name}</h4>
                          <div className="flex items-center space-x-4 mt-1">
                            <span className="text-slate-300">{lead.email}</span>
                            <a 
                              href={getWhatsAppUrl(lead.phone)}
                              target="_blank"
                              rel="noopener noreferrer"
                              className="text-green-400 hover:text-green-300 font-medium"
                            >
                              {lead.phone}
                            </a>
                          </div>
                          {lead.company && <p className="text-slate-300 mt-1">{lead.company}</p>}
                          {lead.notes && <p className="text-slate-400 text-sm mt-1">{lead.notes}</p>}
                          <div className="flex items-center mt-2 space-x-2">
                            <span className="text-xs text-slate-500">
                              Added: {new Date(lead.createdAt).toLocaleDateString()}
                            </span>
                            <span className="text-xs text-slate-500">•</span>
                            <span className="text-xs text-slate-500 capitalize">
                              Source: {lead.source}
                            </span>
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            lead.status === 'new' ? 'bg-blue-500/20 text-blue-400' :
                            lead.status === 'contacted' ? 'bg-yellow-500/20 text-yellow-400' :
                            lead.status === 'qualified' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {lead.status}
                          </span>
                          <button
                            onClick={() => openLeadModal(lead)}
                            className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                            aria-label="Edit lead"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                            </svg>
                          </button>
                          <button
                            onClick={() => handleDeleteLead(lead._id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            aria-label="Delete lead"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>

          {/* Lead Modal */}
          <LeadModal
            isOpen={isLeadModalOpen}
            onClose={closeLeadModal}
            onSuccess={editingLead ? handleLeadUpdated : handleLeadAdded}
            lead={editingLead}
          />
        </div>
      )}

      {activeTab === 'tasks' && (
        <div className="space-y-6">
          {/* Tasks List */}
          <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700">
            <div className="p-4 border-b border-slate-700 flex justify-between items-center">
              <h3 className="font-semibold text-white">My Tasks ({tasks.length})</h3>
              <button
                onClick={fetchTasks}
                className="text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors text-slate-200"
              >
                Refresh
              </button>
            </div>
            <div className="p-4">
              {tasks.length === 0 ? (
                <div className="text-center py-8">
                  <p className="text-slate-400">No tasks yet.</p>
                </div>
              ) : (
                <div className="space-y-3">
                  {tasks.map(task => (
                    <div key={task._id} className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <h4 className="font-medium text-lg text-white">{task.title}</h4>
                          {task.description && <p className="text-slate-300 mt-1">{task.description}</p>}
                          <div className="flex items-center mt-2 space-x-4 text-sm text-slate-400">
                            <span>
                              Due: {new Date(task.dueDate).toLocaleDateString()}
                            </span>
                            <span>•</span>
                            <span className={`font-medium ${
                              task.priority === 'high' ? 'text-red-400' :
                              task.priority === 'medium' ? 'text-yellow-400' :
                              'text-green-400'
                            }`}>
                              {task.priority} priority
                            </span>
                            {task.relatedTo && (
                              <>
                                <span>•</span>
                                <span className="text-blue-400">
                                  Related to: {task.relatedTo.id.name}
                                </span>
                              </>
                            )}
                          </div>
                        </div>
                        <div className="flex items-center space-x-2 ml-4">
                          <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                            task.status === 'pending' ? 'bg-slate-500/20 text-slate-400' :
                            task.status === 'in-progress' ? 'bg-blue-500/20 text-blue-400' :
                            task.status === 'completed' ? 'bg-green-500/20 text-green-400' :
                            'bg-red-500/20 text-red-400'
                          }`}>
                            {task.status.replace('-', ' ')}
                          </span>
                          <button
                            onClick={() => handleDeleteTask(task._id)}
                            className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                            aria-label="Delete task"
                          >
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                            </svg>
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {activeTab === 'tickets' && (
        <div className="space-y-6">
          {/* Header with Add Button */}
          <div className="flex justify-between items-center">
            <div>
              <h2 className="text-2xl font-bold text-white">My Tickets</h2>
              <p className="text-sm text-slate-400 mt-1">Create and manage support tickets</p>
            </div>
            <button
              onClick={() => openTicketModal()}
              className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30"
            >
              <Plus className="h-5 w-5" />
              Create Ticket
            </button>
          </div>
          <TicketsList userRole={user.role} />
        </div>
      )}

      {/* Ticket Modal */}
      <TicketModal
        isOpen={isTicketModalOpen}
        onClose={closeTicketModal}
        onSuccess={editingTicket ? handleTicketUpdated : handleTicketCreated}
        ticket={editingTicket}
      />
    </div>
  );
}