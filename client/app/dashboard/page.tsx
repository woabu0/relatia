'use client';

import { useRouter } from 'next/navigation';
import { useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { BarChart3, Users, Ticket, TrendingUp } from 'lucide-react';
import MetricCard from '../../components/ui/MetricCard';

export default function DashboardPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        // Stay on dashboard overview
      } else {
        router.push('/login');
      }
    }
  }, [user, loading, router]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-slate-300">Loading...</p>
        </div>
      </div>
    );
  }

  const stats = [
    { label: 'Total Leads', value: '0', icon: Users, color: 'blue' as const, change: '+12%', trend: 'up' as const },
    { label: 'Active Tickets', value: '0', icon: Ticket, color: 'purple' as const, change: '-5%', trend: 'down' as const },
    { label: 'Conversion Rate', value: '0%', icon: TrendingUp, color: 'green' as const, change: '+24%', trend: 'up' as const },
    { label: 'Tasks Completed', value: '0', icon: BarChart3, color: 'yellow' as const, change: '+8%', trend: 'up' as const },
  ];

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl sm:text-3xl font-bold text-white">Dashboard Overview</h1>
        <p className="text-sm sm:text-base text-slate-400 mt-2">Welcome back, {user?.username}!</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => (
          <MetricCard
            key={stat.label}
            icon={stat.icon}
            label={stat.label}
            value={stat.value}
            change={stat.change}
            trend={stat.trend}
            color={stat.color}
            size="lg"
          />
        ))}
      </div>

      <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
        <h2 className="text-xl font-semibold text-white mb-4">Quick Actions</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <a
            href="/dashboard/leads"
            className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-white"
          >
            <Users className="h-5 w-5 mb-2" />
            <p className="font-medium">Manage Leads</p>
          </a>
          <a
            href="/dashboard/tickets"
            className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-white"
          >
            <Ticket className="h-5 w-5 mb-2" />
            <p className="font-medium">View Tickets</p>
          </a>
          <a
            href="/dashboard"
            className="p-4 bg-slate-700 rounded-lg hover:bg-slate-600 transition-colors text-white"
          >
            <BarChart3 className="h-5 w-5 mb-2" />
            <p className="font-medium">View Analytics</p>
          </a>
        </div>
      </div>
    </div>
  );
}
