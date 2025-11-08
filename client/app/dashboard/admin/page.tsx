'use client';

import { useAuth } from '../../../contexts/AuthContext';
import { useRouter } from 'next/navigation';
import { useEffect } from 'react';

export default function AdminDashboard() {
  const { user } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (user && user.role !== 'admin') {
      router.push(`/dashboard/${user.role}`);
    }
  }, [user, router]);

  if (!user || user.role !== 'admin') {
    return (
      <div className="flex items-center justify-center min-h-64">
        <p>Redirecting...</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 text-black">
      <p>Welcome to the Admin Dashboard!</p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="bg-white p-6 rounded-lg border">System Users</div>
        <div className="bg-white p-6 rounded-lg border">All Organizations</div>
        <div className="bg-white p-6 rounded-lg border">System Settings</div>
      </div>
    </div>
  );
}