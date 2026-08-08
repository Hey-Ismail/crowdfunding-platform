'use client';

import React from 'react';
import Link from 'next/link';
import { useSession } from '@/lib/auth-client';
import {
  Sparkles,
  Wallet,
  Heart,
  FolderOpen,
  ArrowUpRight,
  Clock,
  TrendingUp,
  Users,
  Eye,
} from 'lucide-react';

export default function UserDashboardPage() {
  const { data: session } = useSession();
  const userName = session?.user?.name ? session.user.name.split(' ')[0] : '';

  // Hardcoded Stats Data
  const stats = [
    {
      id: 'available-credits',
      label: 'Available Credits',
      value: '2,450 FP',
      change: '+150 FP this month',
      isPositive: true,
      icon: Sparkles,
      color: 'emerald',
      bgGlow: 'from-emerald-500/10 to-teal-500/5',
      iconBg: 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400',
      badgeBg: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20',
    },
    {
      id: 'total-contributed',
      label: 'Total Contributed',
      value: '$2,340',
      change: '+$450 from last month',
      isPositive: true,
      icon: Wallet,
      color: 'indigo',
      bgGlow: 'from-indigo-500/10 to-purple-500/5',
      iconBg: 'bg-indigo-500/10 border-indigo-500/20 text-indigo-400',
      badgeBg: 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20',
    },
    {
      id: 'projects-backed',
      label: 'Projects Backed',
      value: '12',
      change: '2 backed this month',
      isPositive: true,
      icon: Heart,
      color: 'teal',
      bgGlow: 'from-teal-500/10 to-emerald-500/5',
      iconBg: 'bg-teal-500/10 border-teal-500/20 text-teal-400',
      badgeBg: 'bg-teal-500/10 text-teal-400 border-teal-500/20',
    },
    {
      id: 'active-campaigns',
      label: 'Active Campaigns',
      value: '5',
      change: '3 ending soon',
      isPositive: false,
      icon: FolderOpen,
      color: 'amber',
      bgGlow: 'from-amber-500/10 to-orange-500/5',
      iconBg: 'bg-amber-500/10 border-amber-500/20 text-amber-400',
      badgeBg: 'bg-amber-500/10 text-amber-400 border-amber-500/20',
    },
  ];

  // Hardcoded Recent Contributions (Last 4)
  const recentContributions = [
    {
      id: 'contrib-1',
      projectName: 'PulseRing X: Next-Gen Continuous Vital Tracking',
      category: 'Tech & AI',
      amount: '$500',
      date: 'Aug 04, 2026',
      status: 'Active',
      statusColor: 'emerald',
    },
    {
      id: 'contrib-2',
      projectName: 'NeuraVision: Quantum Neural Spatial AR Headset',
      category: 'Tech & AI',
      amount: '$750',
      date: 'Jul 28, 2026',
      status: 'Completed',
      statusColor: 'indigo',
    },
    {
      id: 'contrib-3',
      projectName: 'OceanGuard: Autonomous Solar Cleanup Vessel',
      category: 'Eco & Green',
      amount: '$250',
      date: 'Jul 15, 2026',
      status: 'Active',
      statusColor: 'emerald',
    },
    {
      id: 'contrib-4',
      projectName: 'Aetheria: Chronicles of the Floating Realm',
      category: 'Games & Media',
      amount: '$840',
      date: 'Jun 30, 2026',
      status: 'Processing',
      statusColor: 'amber',
    },
  ];

  // Helper for status badge styles
  const getStatusBadgeClass = (statusColor) => {
    switch (statusColor) {
      case 'emerald':
        return 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';
      case 'indigo':
        return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
      case 'amber':
        return 'bg-amber-500/10 text-amber-400 border-amber-500/20';
      default:
        return 'bg-slate-800 text-slate-300 border-slate-700';
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 space-y-8 text-slate-100">
      {/* ═══════════════════════════════════════════
          1. WELCOME HEADER
      ═══════════════════════════════════════════ */}
      <div className="relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
        {/* Decorative Background Accents */}
        <div className="pointer-events-none absolute -right-16 -top-16 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-16 left-1/3 h-64 w-64 rounded-full bg-indigo-500/10 blur-3xl"></div>

        <div className="relative z-10 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400 mb-2">
              <Sparkles className="h-3.5 w-3.5" />
              <span>Supporter Overview</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white flex items-center gap-2">
              Welcome back{userName ? `, ${userName}` : ''} 👋
            </h1>
            <p className="text-sm sm:text-base text-slate-400 font-medium">
              Here&apos;s your activity overview
            </p>
          </div>

          <div className="flex items-center gap-3">

            <Link
              href="/"
              className="inline-flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-600 px-4 py-2.5 text-xs font-bold text-slate-950 hover:from-emerald-400 hover:to-teal-500 transition-all duration-200 shadow-lg shadow-emerald-500/20 cursor-pointer"
            >
              <span>Explore Projects</span>
              <ArrowUpRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          2. STATS ROW (4 CARDS)
      ═══════════════════════════════════════════ */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
        {stats.map((stat) => {
          const IconComponent = stat.icon;
          return (
            <div
              key={stat.id}
              className={`relative overflow-hidden rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-xl hover:border-slate-700/80 transition-all duration-300 group hover:-translate-y-0.5`}
            >
              {/* Card Subtle Top Glow */}
              <div
                className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${stat.bgGlow}`}
              ></div>

              <div className="flex items-center justify-between mb-4">
                <span className="text-xs font-semibold tracking-wider uppercase text-slate-400">
                  {stat.label}
                </span>
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl border ${stat.iconBg} shadow-inner group-hover:scale-110 transition-transform duration-300`}
                >
                  <IconComponent className="h-5 w-5" />
                </div>
              </div>

              <div className="space-y-2">
                <div className="text-2xl sm:text-3xl font-black text-white tracking-tight">
                  {stat.value}
                </div>

                <div className="flex items-center gap-1.5 pt-1">
                  <span
                    className={`inline-flex items-center gap-1 rounded-md border px-2 py-0.5 text-[11px] font-semibold ${stat.badgeBg}`}
                  >
                    {stat.isPositive ? (
                      <TrendingUp className="h-3 w-3" />
                    ) : (
                      <Clock className="h-3 w-3" />
                    )}
                    {stat.change}
                  </span>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* ═══════════════════════════════════════════
          MAIN CONTENT GRID:
          3. RECENT CONTRIBUTIONS & 4. RECOMMENDED CAMPAIGNS
      ═══════════════════════════════════════════ */}
      <div className="space-y-4">
        {/* ═══════════════════════════════════════════
            3. RECENT CONTRIBUTIONS
        ═══════════════════════════════════════════ */}
        <div className="space-y-4">
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 sm:p-6 backdrop-blur-xl shadow-xl space-y-6">
            {/* Section Header */}
            <div className="flex items-center justify-between border-b border-slate-800/60 pb-4">
              <div className="flex items-center gap-3">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-indigo-500/10 border border-indigo-500/20 text-indigo-400">
                  <Wallet className="h-4 w-4" />
                </div>
                <div>
                  <h2 className="text-lg font-bold text-white tracking-tight">
                    Recent Contributions
                  </h2>
                  <p className="text-xs text-slate-400">
                    Your last 4 backed projects and pledge statuses
                  </p>
                </div>
              </div>

              <Link
                href="/dashboard/user/contributions"
                className="inline-flex items-center gap-1.5 text-xs font-semibold text-indigo-400 hover:text-indigo-300 transition-colors group cursor-pointer"
              >
                <span>View All</span>
                <ArrowUpRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>

            {/* Table / List View */}
            <div className="divide-y divide-slate-800/60 overflow-hidden">
              {recentContributions.map((item) => (
                <div
                  key={item.id}
                  className="py-4 first:pt-0 last:pb-0 flex flex-col sm:flex-row sm:items-center justify-between gap-3 hover:bg-slate-800/20 rounded-xl px-2 sm:px-3 transition-colors duration-200"
                >
                  <div className="flex items-start gap-3 min-w-0 flex-1">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-slate-800/80 border border-slate-700/60 text-slate-300 mt-0.5 sm:mt-0">
                      <Heart className="h-4 w-4 text-emerald-400" />
                    </div>
                    <div className="min-w-0 flex-1 space-y-1">
                      <p className="text-sm font-semibold text-white truncate hover:text-emerald-400 transition-colors">
                        {item.projectName}
                      </p>
                      <div className="flex items-center gap-2 text-xs text-slate-400 flex-wrap">
                        <span className="rounded-md bg-slate-800 px-2 py-0.5 text-[10px] font-medium text-slate-300">
                          {item.category}
                        </span>
                        <span className="text-slate-600">•</span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3 text-slate-500" />
                          {item.date}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center justify-between sm:justify-end gap-4 shrink-0 border-t sm:border-t-0 border-slate-800/40 pt-2 sm:pt-0">
                    <div className="text-left sm:text-right">
                      <span className="text-sm font-bold text-white block">
                        {item.amount}
                      </span>
                      <span className="text-[10px] text-slate-500 uppercase tracking-wider block">
                        Pledged
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-flex items-center rounded-full border px-2.5 py-1 text-xs font-semibold ${getStatusBadgeClass(
                          item.statusColor
                        )}`}
                      >
                        {item.status}
                      </span>
                      <button
                        aria-label={`View details for ${item.projectName}`}
                        className="h-8 w-8 flex items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 hover:text-white hover:bg-slate-800 hover:border-slate-700 transition-colors cursor-pointer"
                      >
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
