'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import {
  Heart,
  DollarSign,
  Calendar,
  ExternalLink,
  CheckCircle,
  Clock,
  TrendingUp,
  Search,
  Filter,
} from 'lucide-react';

const contributionEntries = [
  {
    id: 'contrib-1',
    projectName: 'EcoCharge - Solar Powered Portable Battery',
    category: 'CleanTech',
    amount: 250,
    date: 'Jul 28, 2026',
    status: 'Active',
    rewardTier: 'Early Bird Pack',
    campaignSlug: 'ecocharge-solar-battery',
  },
  {
    id: 'contrib-2',
    projectName: 'Aura Glass - AR Smart Eyewear',
    category: 'Hardware',
    amount: 500,
    date: 'Jun 15, 2026',
    status: 'Active',
    rewardTier: 'Developer Edition',
    campaignSlug: 'aura-glass-ar',
  },
  {
    id: 'contrib-3',
    projectName: 'OceanClean - Automated Water Drone Cleaner',
    category: 'Environment',
    amount: 350,
    date: 'May 02, 2026',
    status: 'Completed',
    rewardTier: 'Supporter Tier',
    campaignSlug: 'oceanclean-water-drone',
  },
  {
    id: 'contrib-4',
    projectName: 'Pixel Odyssey - Retro RPG Game',
    category: 'Gaming',
    amount: 75,
    date: 'Apr 19, 2026',
    status: 'Completed',
    rewardTier: 'Digital Deluxe Edition',
    campaignSlug: 'pixel-odyssey-rpg',
  },
  {
    id: 'contrib-5',
    projectName: 'NeoBeats - Wireless Noise-Cancelling Headphones',
    category: 'Audio',
    amount: 400,
    date: 'Aug 01, 2026',
    status: 'Pending',
    rewardTier: 'VIP Backer Bundle',
    campaignSlug: 'neobeats-headphones',
  },
  {
    id: 'contrib-6',
    projectName: 'BioPlant - Smart Indoor Home Garden',
    category: 'Home & Living',
    amount: 765,
    date: 'Mar 11, 2026',
    status: 'Completed',
    rewardTier: 'Gardener Kit',
    campaignSlug: 'bioplant-indoor-garden',
  },
];

export default function UserContributionsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('All');

  const filteredContributions = contributionEntries.filter((item) => {
    const matchesSearch =
      item.projectName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesStatus =
      selectedStatus === 'All' || item.status === selectedStatus;
    return matchesSearch && matchesStatus;
  });

  const getStatusBadge = (status) => {
    switch (status) {
      case 'Active':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
            <Clock className="w-3.5 h-3.5" />
            Active
          </span>
        );
      case 'Completed':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-indigo-500/10 text-indigo-400 border border-indigo-500/20">
            <CheckCircle className="w-3.5 h-3.5" />
            Completed
          </span>
        );
      case 'Pending':
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-amber-500/10 text-amber-400 border border-amber-500/20">
            <Clock className="w-3.5 h-3.5" />
            Pending
          </span>
        );
      default:
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-slate-800 text-slate-300 border border-slate-700">
            {status}
          </span>
        );
    }
  };

  return (
    <div className="p-6 lg:p-8 space-y-8 bg-slate-950 text-slate-100 min-h-screen">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-white">
            My Contributions
          </h1>
          <p className="text-slate-400 mt-1">
            Track all the projects you&apos;ve supported
          </p>
        </div>
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 text-xs font-medium self-start md:self-auto">
          <Heart className="w-4 h-4 fill-indigo-400/20" />
          <span>Active Backer Community</span>
        </div>
      </div>

      {/* Summary Stats Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
        {/* Total Contributed Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm shadow-xl flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Total Contributed</p>
            <p className="text-3xl font-bold text-white mt-2">$2,340</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
              <TrendingUp className="w-3.5 h-3.5" />
              <span>+$400 this month</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <DollarSign className="w-6 h-6" />
          </div>
        </div>

        {/* Projects Backed Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm shadow-xl flex items-center justify-between">
          <div>
            <p className="text-sm font-medium text-slate-400">Projects Backed</p>
            <p className="text-3xl font-bold text-white mt-2">12</p>
            <div className="flex items-center gap-1.5 text-xs text-indigo-400 mt-2 font-medium">
              <Heart className="w-3.5 h-3.5" />
              <span>Across 6 categories</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-indigo-500/10 border border-indigo-500/20 flex items-center justify-center text-indigo-400">
            <Heart className="w-6 h-6" />
          </div>
        </div>

        {/* Active Campaigns Card */}
        <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 backdrop-blur-sm shadow-xl flex items-center justify-between sm:col-span-2 lg:col-span-1">
          <div>
            <p className="text-sm font-medium text-slate-400">Active Campaigns</p>
            <p className="text-3xl font-bold text-white mt-2">5</p>
            <div className="flex items-center gap-1.5 text-xs text-emerald-400 mt-2 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>7 completed successfully</span>
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
            <Clock className="w-6 h-6" />
          </div>
        </div>
      </div>

      {/* Filter and Search Controls */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4">
        {/* Filter Tabs */}
        <div className="flex items-center p-1 rounded-xl bg-slate-900/80 border border-slate-800/80 gap-1">
          {['All', 'Active', 'Completed', 'Pending'].map((status) => (
            <button
              key={status}
              onClick={() => setSelectedStatus(status)}
              className={`px-4 py-2 rounded-lg text-xs font-medium transition-all ${
                selectedStatus === status
                  ? 'bg-indigo-600 text-white shadow-md'
                  : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/50'
              }`}
            >
              {status}
            </button>
          ))}
        </div>

        {/* Search Input */}
        <div className="relative min-w-[240px]">
          <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-slate-500" />
          <input
            type="text"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-4 py-2 rounded-xl bg-slate-900/80 border border-slate-800/80 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-indigo-500 transition-colors"
          />
        </div>
      </div>

      {/* Contributions Table Container */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 backdrop-blur-sm overflow-hidden shadow-xl">
        <div className="px-6 py-5 border-b border-slate-800/80 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-indigo-400" />
            <h2 className="text-base font-semibold text-white">
              Contribution History
            </h2>
          </div>
          <span className="text-xs text-slate-400">
            Showing {filteredContributions.length} of {contributionEntries.length} entries
          </span>
        </div>

        {/* Desktop Table View */}
        <div className="hidden md:block overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800/60 bg-slate-950/40 text-xs font-semibold text-slate-400 uppercase tracking-wider">
                <th className="py-4 px-6">Project</th>
                <th className="py-4 px-6">Amount</th>
                <th className="py-4 px-6">Date</th>
                <th className="py-4 px-6">Status</th>
                <th className="py-4 px-6 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50 text-sm">
              {filteredContributions.length > 0 ? (
                filteredContributions.map((item) => (
                  <tr
                    key={item.id}
                    className="hover:bg-slate-800/30 transition-colors group"
                  >
                    <td className="py-4 px-6">
                      <div>
                        <div className="font-semibold text-slate-200 group-hover:text-indigo-400 transition-colors">
                          {item.projectName}
                        </div>
                        <div className="flex items-center gap-2 mt-1">
                          <span className="text-xs text-slate-400">
                            {item.rewardTier}
                          </span>
                          <span className="text-slate-600">•</span>
                          <span className="text-xs text-indigo-400/80 bg-indigo-500/10 px-2 py-0.5 rounded text-[10px]">
                            {item.category}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="py-4 px-6 font-semibold text-emerald-400">
                      ${item.amount.toLocaleString()}
                    </td>
                    <td className="py-4 px-6 text-slate-400">
                      <div className="flex items-center gap-1.5 text-xs">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        <span>{item.date}</span>
                      </div>
                    </td>
                    <td className="py-4 px-6">{getStatusBadge(item.status)}</td>
                    <td className="py-4 px-6 text-right">
                      <Link
                        href={`/campaigns/${item.campaignSlug}`}
                        className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-medium transition-all border border-slate-700/50 hover:border-indigo-500"
                      >
                        <span>View Project</span>
                        <ExternalLink className="w-3.5 h-3.5" />
                      </Link>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-slate-400 text-sm">
                    No contributions match your current filter criteria.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Mobile List Card View */}
        <div className="block md:hidden divide-y divide-slate-800/50">
          {filteredContributions.length > 0 ? (
            filteredContributions.map((item) => (
              <div key={item.id} className="p-5 space-y-3">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <span className="text-[10px] uppercase tracking-wider text-indigo-400 bg-indigo-500/10 px-2 py-0.5 rounded font-medium">
                      {item.category}
                    </span>
                    <h3 className="font-semibold text-slate-200 mt-1">
                      {item.projectName}
                    </h3>
                    <p className="text-xs text-slate-400 mt-0.5">
                      {item.rewardTier}
                    </p>
                  </div>
                  {getStatusBadge(item.status)}
                </div>

                <div className="flex items-center justify-between pt-2 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <Calendar className="w-3.5 h-3.5 text-slate-500" />
                    <span>{item.date}</span>
                  </div>
                  <div className="text-base font-bold text-emerald-400">
                    ${item.amount.toLocaleString()}
                  </div>
                </div>

                <div className="pt-2">
                  <Link
                    href={`/campaigns/${item.campaignSlug}`}
                    className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800/80 hover:bg-indigo-600 text-slate-200 hover:text-white text-xs font-medium transition-all border border-slate-700/50"
                  >
                    <span>View Project</span>
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            ))
          ) : (
            <div className="py-10 text-center text-slate-400 text-sm">
              No contributions match your current filter criteria.
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
