'use client';

import { useState } from 'react';
import { Ticket } from '../../types';

interface CreateTicketFormProps {
  onTicketCreated: (ticket: Ticket) => void;
}

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

export default function CreateTicketForm({ onTicketCreated }: CreateTicketFormProps) {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium' as Ticket['priority'],
    category: 'technical' as Ticket['category']
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    
    try {
      const token = localStorage.getItem('token');
      if (!token) {
        setError('No authentication token found. Please log in again.');
        setLoading(false);
        return;
      }

      const response = await fetch(`${API_URL}/tickets`, {
        method: 'POST',
        headers: { 
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
      });
      
      if (response.ok) {
        const result = await response.json();
        onTicketCreated(result.ticket);
        setFormData({ 
          title: '', 
          description: '', 
          priority: 'medium',
          category: 'technical'
        });
      } else {
        const errorData = await response.json();
        setError(errorData.message || 'Failed to create ticket');
      }
    } catch (error: unknown) {
      console.error('Failed to create ticket:', error);
      setError(error instanceof Error ? error.message : 'Cannot connect to server.');
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
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold mb-4">Create Support Ticket</h3>
      
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Title *
          </label>
          <input
            type="text"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
            placeholder="Brief description of the issue"
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Description *
          </label>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            rows={4}
            className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            disabled={loading}
            placeholder="Detailed description of the issue..."
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Priority
            </label>
            <select
              name="priority"
              value={formData.priority}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              disabled={loading}
            >
              <option value="low">Low</option>
              <option value="medium">Medium</option>
              <option value="high">High</option>
              <option value="urgent">Urgent</option>
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Category *
            </label>
            <select
              name="category"
              value={formData.category}
              onChange={handleChange}
              className="w-full border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
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
        
        <div className="flex justify-end">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-purple-600 text-white px-6 py-2 rounded-md hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
          >
            {loading ? 'Creating Ticket...' : 'Create Ticket'}
          </button>
        </div>
      </form>
    </div>
  );
}