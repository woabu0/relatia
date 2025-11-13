'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useEffect, useState } from 'react';
import { Ticket } from '../../../types';
import CreateTicketForm from '../../../components/ui/CreateTicketForm';
import TicketsList from '../../../components/ui/TicketList';

export default function TicketsPage() {
  const { user } = useAuth();

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Support Tickets</h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2">
          {user?.role === 'admin' 
            ? 'Manage and resolve support tickets' 
            : 'Create and manage support tickets'}
        </p>
      </div>

      {user?.role !== 'admin' && (
        <CreateTicketForm onTicketCreated={() => {}} />
      )}
      <TicketsList userRole={user?.role || 'user'} />
    </div>
  );
}

