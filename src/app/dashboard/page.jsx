'use client';

import React from 'react';
import {
  TrendingUp,
  Users,
  Wallet,
  FolderOpen,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Clock,
  Target,
  Zap,
} from 'lucide-react';

const stats = [
  {
    label: 'Total Raised',
    value: '$24,580',
    change: '+12.5%',
    up: true,
    icon: Wallet,
    color: 'emerald',
  },
  {
    label: 'Active Campaigns',
    value: '3',
    change: '+1 this week',
    up: true,
    icon: FolderOpen,
    color: 'indigo',
  },
  {
    label: 'Total Backers',
    value: '1,247',
    change: '+8.3%',
    up: true,
    icon: Users,
    color: 'teal',
  },
  {
    label: 'Conversion Rate',
    value: '4.2%',
    change: '-0.3%',
    up: false,
    icon: TrendingUp,
    color: 'amber',
  },
];

const colorMap = {
  emerald: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/20',
    text: 'text-emerald-400',
    glow: 'shadow-emerald-500/5',
  },
  indigo: {
    bg: 'bg-indigo-500/10',
    border: 'border-indigo-500/20',
    text: 'text-indigo-400',
    glow: 'shadow-indigo-500/5',
  },
  teal: {
    bg: 'bg-teal-500/10',
    border: 'border-teal-500/20',
    text: 'text-teal-400',
    glow: 'shadow-teal-500/5',
  },
  amber: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/20',
    text: 'text-amber-400',
    glow: 'shadow-amber-500/5',
  },
};

const recentActivity = [
  {
    icon: Zap,
    title: 'New backer joined "EcoSmart Hub"',
    time: '2 minutes ago',
    amount: '+$50',
  },
  {
    icon: Target,
    title: '"AI Study Buddy" hit 75% goal',
    time: '1 hour ago',
    amount: null,
  },
  {
    icon: Sparkles,
    title: 'Campaign "GreenPod" went live',
    time: '3 hours ago',
    amount: null,
  },
  {
    icon: Zap,
    title: '5 new backers joined "GreenPod"',
    time: '5 hours ago',
    amount: '+$240',
  },
  {
    icon: Clock,
    title: '"EcoSmart Hub" ending in 3 days',
    time: '12 hours ago',
    amount: null,
  },
];

export default function DashboardPage() {
  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-8 space-y-8">
      {/* Page Header */}
      <div className="space-y-1">
        <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
          Welcome back 👋
        </h1>
        <p className="text-sm text-slate-400">
          Here&apos;s what&apos;s happening with your campaigns today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          const colors = colorMap[stat.color];

          return (
            <div
              key={stat.label}
              className={`group relative rounded-2xl border border-slate-800/80 bg-slate-900/50 p-5 transition-all duration-300 hover:border-slate-700/80 hover:bg-slate-900/80 hover:shadow-xl ${colors.glow}`}
            >
              <div className="flex items-start justify-between">
                <div
                  className={`flex h-10 w-10 items-center justify-center rounded-xl ${colors.bg} border ${colors.border}`}
                >
                  <Icon className={`h-5 w-5 ${colors.text}`} />
                </div>
                <span
                  className={`inline-flex items-center gap-1 text-xs font-semibold ${stat.up ? 'text-emerald-400' : 'text-rose-400'
                    }`}
                >
                  {stat.up ? (
                    <ArrowUpRight className="h-3 w-3" />
                  ) : (
                    <ArrowDownRight className="h-3 w-3" />
                  )}
                  {stat.change}
                </span>
              </div>
              <div className="mt-4 space-y-0.5">
                <p className="text-2xl font-bold text-white">{stat.value}</p>
                <p className="text-xs text-slate-500 font-medium">
                  {stat.label}
                </p>
              </div>
            </div>
          );
        })}
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
        {/* Recent Activity */}
        <div className="xl:col-span-2 rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6">
          <div className="flex items-center justify-between mb-5">
            <h2 className="text-base font-bold text-white">
              Recent Activity
            </h2>
            <button className="text-xs font-medium text-emerald-400 hover:text-emerald-300 transition cursor-pointer">
              View all
            </button>
          </div>
          <div className="space-y-1">
            {recentActivity.map((item, i) => {
              const Icon = item.icon;
              return (
                <div
                  key={i}
                  className="flex items-center gap-4 rounded-xl px-3 py-3 transition-colors hover:bg-slate-800/40"
                >
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-slate-800/80 border border-slate-700/50">
                    <Icon className="h-4 w-4 text-slate-400" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-slate-200 truncate">
                      {item.title}
                    </p>
                    <p className="text-[11px] text-slate-500">{item.time}</p>
                  </div>
                  {item.amount && (
                    <span className="text-sm font-semibold text-emerald-400 shrink-0">
                      {item.amount}
                    </span>
                  )}
                </div>
              );
            })}
          </div>
        </div>

        {/* Quick Actions */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-6">
          <h2 className="text-base font-bold text-white mb-5">
            Quick Actions
          </h2>
          <div className="space-y-3">
            <a
              href="/dashboard/create"
              className="group flex items-center gap-3 rounded-xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3.5 transition-all hover:bg-emerald-500/10 hover:border-emerald-500/30"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="h-4 w-4 text-emerald-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-emerald-300">
                  Create Campaign
                </p>
                <p className="text-[11px] text-slate-500">
                  Launch a new project
                </p>
              </div>
            </a>

            <a
              href="/dashboard/wallet"
              className="group flex items-center gap-3 rounded-xl border border-slate-800/60 bg-slate-800/20 px-4 py-3.5 transition-all hover:bg-slate-800/40 hover:border-slate-700/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-indigo-500/10 border border-indigo-500/20">
                <Wallet className="h-4 w-4 text-indigo-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  Withdraw Funds
                </p>
                <p className="text-[11px] text-slate-500">
                  Manage your earnings
                </p>
              </div>
            </a>

            <a
              href="/dashboard/analytics"
              className="group flex items-center gap-3 rounded-xl border border-slate-800/60 bg-slate-800/20 px-4 py-3.5 transition-all hover:bg-slate-800/40 hover:border-slate-700/60"
            >
              <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-teal-500/10 border border-teal-500/20">
                <TrendingUp className="h-4 w-4 text-teal-400" />
              </div>
              <div>
                <p className="text-sm font-semibold text-slate-200">
                  View Analytics
                </p>
                <p className="text-[11px] text-slate-500">
                  Track performance
                </p>
              </div>
            </a>
          </div>

          {/* Mini Info Card */}
          <div className="mt-5 rounded-xl border border-indigo-500/15 bg-indigo-500/5 p-4">
            <div className="flex items-center gap-2 mb-2">
              <Target className="h-4 w-4 text-indigo-400" />
              <span className="text-xs font-bold text-indigo-300">
                Pro Tip
              </span>
            </div>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Campaigns with regular updates get 3x more backers. Keep your
              supporters engaged!
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
