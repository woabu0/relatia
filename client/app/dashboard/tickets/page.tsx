'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Ticket } from '../../../types';
import { apiService } from '../../../lib/api';
import TicketModal from '../../../components/ui/TicketModal';
import { Plus, Edit2, RefreshCw } from 'lucide-react';

export default function TicketsPage() {
  const { user } = useAuth();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTicket, setEditingTicket] = useState<Ticket | null>(null);

  useEffect(() => {
    fetchTickets();
  }, []);

  const fetchTickets = async () => {
    try {
      setLoading(true);
      const data = await apiService.getTickets();
      setTickets(data?.tickets ?? []);
    } catch (error) {
      console.error('Failed to fetch tickets:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleTicketAdded = (newTicket: Ticket) => {
    setTickets(prev => [newTicket, ...prev]);
  };

  const handleTicketUpdated = (updatedTicket: Ticket) => {
    setTickets(prev => prev.map(ticket => 
      ticket._id === updatedTicket._id ? updatedTicket : ticket
    ));
    setEditingTicket(null);
  };

  const getStatusColor = (status: Ticket['status']) => {
    switch (status) {
      case 'open': return 'bg-blue-500/20 text-blue-400 border-blue-500/30';
      case 'in-progress': return 'bg-yellow-500/20 text-yellow-400 border-yellow-500/30';
      case 'resolved': return 'bg-green-500/20 text-green-400 border-green-500/30';
      case 'closed': return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
      default: return 'bg-slate-500/20 text-slate-400 border-slate-500/30';
    }
  };

  const getPriorityColor = (priority: Ticket['priority']) => {
    switch (priority) {
      case 'low': return 'text-green-400';
      case 'medium': return 'text-yellow-400';
      case 'high': return 'text-orange-400';
      case 'urgent': return 'text-red-400';
      default: return 'text-slate-400';
    }
  };

  const openCreateModal = () => {
    setEditingTicket(null);
    setIsModalOpen(true);
  };

  const openEditModal = (ticket: Ticket) => {
    setEditingTicket(ticket);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingTicket(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading tickets...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Support Tickets</h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">
            {user?.role === 'admin' 
              ? 'Manage and resolve support tickets' 
              : 'Create and manage support tickets'}
          </p>
        </div>
        {user?.role !== 'admin' && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30"
          >
            <Plus className="h-5 w-5" />
            Create Ticket
          </button>
        )}
      </div>

      {/* Tickets List */}
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-semibold text-white">
            {user?.role === 'admin' ? 'All Tickets' : 'My Tickets'} ({tickets.length})
          </h3>
          <button
            onClick={fetchTickets}
            className="flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors text-slate-200"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
        
        <div className="p-4">
          {tickets.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">
                {user?.role === 'admin' ? 'No tickets found.' : 'You haven\'t created any tickets yet.'}
              </p>
              {user?.role !== 'admin' && (
                <button
                  onClick={openCreateModal}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Create your first ticket
                </button>
              )}
            </div>
          ) : (
            <div className="space-y-4">
              {tickets.map(ticket => (
                <div key={ticket._id} className="border border-slate-700 rounded-lg p-4 hover:bg-slate-700/50 transition-colors">
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <h4 className="font-medium text-lg text-white">{ticket.title}</h4>
                      <p className="text-slate-300 mt-1">{ticket.description}</p>
                      
                      <div className="flex items-center mt-3 space-x-4 text-sm flex-wrap gap-2">
                        <span className={`px-2 py-1 rounded-full border ${getStatusColor(ticket.status)}`}>
                          {ticket.status.replace('-', ' ')}
                        </span>
                        
                        <span className={`font-medium ${getPriorityColor(ticket.priority)}`}>
                          {ticket.priority} priority
                        </span>
                        
                        <span className="text-slate-400 capitalize">
                          {ticket.category.replace('-', ' ')}
                        </span>
                        
                        {user?.role === 'admin' && (
                          <span className="text-slate-400">
                            By: {ticket.createdBy.username}
                          </span>
                        )}
                      </div>
                      
                      <div className="flex items-center mt-2 space-x-2 text-xs text-slate-500">
                        <span>Created: {new Date(ticket.createdAt).toLocaleDateString()}</span>
                        <span>•</span>
                        <span>Updated: {new Date(ticket.updatedAt).toLocaleDateString()}</span>
                        {ticket.comments && ticket.comments.length > 0 && (
                          <>
                            <span>•</span>
                            <span>{ticket.comments.length} comments</span>
                          </>
                        )}
                      </div>
                    </div>
                    <div className="ml-4">
                      <button
                        onClick={() => openEditModal(ticket)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                        aria-label="Edit ticket"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {/* Modal */}
      <TicketModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={editingTicket ? handleTicketUpdated : handleTicketAdded}
        ticket={editingTicket}
      />
    </div>
  );
}
