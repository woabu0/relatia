'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Lead } from '../../../types';
import { apiService } from '../../../lib/api';
import LeadModal from '../../../components/ui/LeadModal';
import { Plus, Edit2, Trash2, RefreshCw } from 'lucide-react';

export default function LeadsPage() {
  const { user } = useAuth();
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingLead, setEditingLead] = useState<Lead | null>(null);

  useEffect(() => {
    if (user) {
      fetchLeads();
    }
  }, [user]);

  const fetchLeads = async () => {
    try {
      setLoading(true);
      const data = await apiService.getLeads();
      setLeads(data?.leads ?? []);
    } catch (error) {
      console.error('Failed to fetch leads:', error);
      setLeads([]);
    } finally {
      setLoading(false);
    }
  };

  const handleLeadAdded = (newLead: Lead) => {
    setLeads(prev => [newLead, ...prev]);
  };

  const handleLeadUpdated = (updatedLead: Lead) => {
    setLeads(prev => prev.map(lead => 
      lead._id === updatedLead._id ? updatedLead : lead
    ));
    setEditingLead(null);
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

  const getWhatsAppUrl = (phone: string) => {
    const formattedPhone = phone.replace(/\D/g, '');
    return `https://wa.me/${formattedPhone}`;
  };

  const openCreateModal = () => {
    setEditingLead(null);
    setIsModalOpen(true);
  };

  const openEditModal = (lead: Lead) => {
    setEditingLead(lead);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditingLead(null);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-64">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading leads...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header with Add Button */}
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold text-white">Leads Management</h1>
          <p className="text-sm sm:text-base text-slate-400 mt-2">Manage your customer leads</p>
        </div>
        {user?.role !== 'admin' && (
          <button
            onClick={openCreateModal}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors shadow-lg shadow-blue-500/30"
          >
            <Plus className="h-5 w-5" />
            Add Lead
          </button>
        )}
      </div>

      {/* Leads List */}
      <div className="bg-slate-800 rounded-xl shadow-sm border border-slate-700">
        <div className="p-4 border-b border-slate-700 flex justify-between items-center">
          <h3 className="font-semibold text-white">My Leads ({leads.length})</h3>
          <button
            onClick={fetchLeads}
            className="flex items-center gap-2 text-sm bg-slate-700 hover:bg-slate-600 px-3 py-1.5 rounded-lg transition-colors text-slate-200"
          >
            <RefreshCw className="h-4 w-4" />
            Refresh
          </button>
        </div>
        <div className="p-4">
          {leads.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-slate-400 mb-4">No leads yet.</p>
              {user?.role !== 'admin' && (
                <button
                  onClick={openCreateModal}
                  className="text-blue-400 hover:text-blue-300 font-medium"
                >
                  Add your first lead
                </button>
              )}
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
                        onClick={() => openEditModal(lead)}
                        className="p-2 text-blue-400 hover:text-blue-300 hover:bg-blue-500/10 rounded-lg transition-colors"
                        aria-label="Edit lead"
                      >
                        <Edit2 className="h-4 w-4" />
                      </button>
                      <button
                        onClick={() => handleDeleteLead(lead._id)}
                        className="p-2 text-red-400 hover:text-red-300 hover:bg-red-500/10 rounded-lg transition-colors"
                        aria-label="Delete lead"
                      >
                        <Trash2 className="h-4 w-4" />
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
      <LeadModal
        isOpen={isModalOpen}
        onClose={closeModal}
        onSuccess={editingLead ? handleLeadUpdated : handleLeadAdded}
        lead={editingLead}
      />
    </div>
  );
}
