'use client';

import { useState, useEffect } from 'react';
import { Ticket } from '../../types';
import { apiService, API_BASE_URL } from '../../lib/api';
import Modal from './Modal';

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: (ticket: Ticket) => void;
  ticket?: Ticket | null;
}

export default function TicketModal({ isOpen, onClose, onSuccess, ticket }: TicketModalProps) {
  const isEdit = !!ticket;
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Ticket['priority'],
    category: 'technical' as Ticket['category']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (ticket) {
      setFormData({
        title: ticket.title || '',
        description: ticket.description || '',
        priority: ticket.priority || 'medium',
        category: ticket.category || 'technical'
      });
    } else {
      setFormData({
        title: '',
        description: '',
        priority: 'medium',
        category: 'technical'
      });
    }
    setError('');
  }, [ticket, isOpen]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      if (isEdit && ticket) {
        const result = await apiService.updateTicket(ticket._id, formData);
        if (!result?.ticket) {
          throw new Error('Ticket was updated but response was missing data.');
        }
        onSuccess(result.ticket);
      } else {
        const result = await apiService.createTicket(formData);
        if (!result?.ticket) {
          throw new Error('Ticket was created but response was missing data.');
        }
        onSuccess(result.ticket);
      }
      onClose();
    } catch (error: unknown) {
      console.error(`Failed to ${isEdit ? 'update' : 'create'} ticket:`, error);
      setError(
        error instanceof Error
          ? error.message
          : `Cannot connect to server. Please make sure the backend is running at ${API_BASE_URL}.`
      );
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={isEdit ? 'Edit Ticket' : 'Create Support Ticket'}
      size="md"
    >
      {error && (
        <div className="mb-4 p-3 bg-red-500/20 border border-red-500/50 text-red-300 rounded-lg">
          <strong>Error:</strong> {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
            required
            disabled={loading}
            placeholder="Brief description of the issue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-slate-300 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent placeholder:text-slate-400"
            required
            disabled={loading}
            placeholder="Detailed description of the issue..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-slate-600 bg-slate-700 text-white rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              required
              disabled={loading}
            >
              <option value="technical">Technical</option>
              <option value="billing">Billing</option>
              <option value="feature-request">Feature Request</option>
              <option value="bug">Bug Report</option>
              <option value="other">Other</option>
            </select>
          </div>
        </div>
        
        <div className="flex justify-end gap-3 pt-4 border-t border-slate-700">
          <button
            type="button"
            onClick={onClose}
            disabled={loading}
            className="px-4 py-2 rounded-lg border border-slate-600 text-slate-300 hover:bg-slate-700 transition-colors disabled:opacity-50"
          >
            Cancel
          </button>
          <button 
            type="submit" 
            disabled={loading}
            className="px-6 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            {loading ? (
              <span className="flex items-center">
                <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {isEdit ? 'Updating...' : 'Creating...'}
              </span>
            ) : (
              isEdit ? 'Update Ticket' : 'Create Ticket'
            )}
          </button>
        </div>
      </form>
    </Modal>
  );
}

