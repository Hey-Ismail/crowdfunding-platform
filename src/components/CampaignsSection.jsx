'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CAMPAIGNS, CAMPAIGN_CATEGORIES } from '@/data/campaigns';
import { Search, Heart, Clock, Users, ArrowUpRight, Sparkles, Filter, Trophy, DollarSign } from 'lucide-react';

const badgeStyles = {
  emerald: "bg-emerald-500/20 text-emerald-300 border-emerald-500/30",
  indigo: "bg-indigo-500/20 text-indigo-300 border-indigo-500/30",
  purple: "bg-purple-500/20 text-purple-300 border-purple-500/30",
  amber: "bg-amber-500/20 text-amber-300 border-amber-500/30",
};

const CampaignsSection = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchQuery, setSearchQuery] = useState("");
  const [likedCampaigns, setLikedCampaigns] = useState({});

  const toggleLike = (id) => {
    setLikedCampaigns(prev => ({ ...prev, [id]: !prev[id] }));
  };

  // Sort campaigns by highest raised amount first (Top Funded)
  const sortedTopCampaigns = [...MOCK_CAMPAIGNS].sort((a, b) => b.raisedAmount - a.raisedAmount);

  const filteredCampaigns = sortedTopCampaigns.filter(campaign => {
    const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  // Limit display to top 6 campaigns
  const top6Campaigns = filteredCampaigns.slice(0, 6);

  return (
    <section className="py-20 md:py-28 relative bg-slate-900/40" id="top-campaigns">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Trophy className="h-4 w-4" />
              <span>Leaderboard</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Top Funded <span className="gradient-text">Campaigns</span>
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-xl">
              Projects that raised the maximum amount of funding from our global backer community.
            </p>
          </div>

          <Link 
            href="/campaigns"
            className="inline-flex items-center gap-2 text-sm font-semibold text-emerald-400 hover:text-emerald-300 transition group"
          >
            <span>View All Projects</span>
            <ArrowUpRight className="h-4 w-4 transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </Link>
        </div>

        {/* Filters & Search Controls */}
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 mb-10 pb-6 border-b border-slate-800">
          
          {/* Category Tabs */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 lg:pb-0 scrollbar-none">
            {CAMPAIGN_CATEGORIES.map(category => (
              <button
                key={category}
                onClick={() => setSelectedCategory(category)}
                className={`px-4 py-2 rounded-xl text-sm font-medium whitespace-nowrap transition-all duration-200 ${
                  selectedCategory === category
                    ? "bg-emerald-500 text-slate-950 shadow-md font-semibold"
                    : "bg-slate-800/60 text-slate-300 hover:bg-slate-800 hover:text-white border border-slate-700/50"
                }`}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Search Bar */}
          <div className="relative min-w-[280px]">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search top projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>
        </div>

        {/* Top 6 Campaign Grid */}
        {top6Campaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {top6Campaigns.map((campaign, index) => {
              const progressPercentage = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
              const isLiked = likedCampaigns[campaign.id];

              return (
                <div 
                  key={campaign.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  {/* Image Cover Container */}
                  <div className="relative h-56 w-full overflow-hidden bg-slate-950">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Rank Badge */}
                    <span className="absolute top-3 left-3 flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-extrabold text-amber-400 border border-amber-500/30 backdrop-blur-md shadow-md">
                      #{index + 1} Top Funded
                    </span>

                    {/* Like Button */}
                    <button
                      onClick={() => toggleLike(campaign.id)}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-slate-300 backdrop-blur-md transition hover:scale-110 hover:text-rose-400"
                      aria-label="Save campaign"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-6 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-2">
                        <span className="text-emerald-400">{campaign.category}</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          {campaign.daysLeft}d left
                        </span>
                      </div>

                      <h3 className="text-xl font-bold text-white leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                        {campaign.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {campaign.shortDescription}
                      </p>
                    </div>

                    {/* Total Amount Raised Display (Prominent) */}
                    <div className="rounded-2xl bg-slate-950/70 border border-slate-800 p-3.5 space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-xs text-slate-400 font-medium">Total Amount Raised</span>
                        <span className="text-xs font-bold text-emerald-400">{progressPercentage}%</span>
                      </div>
                      <div className="text-2xl font-black text-white flex items-center gap-1">
                        <span className="text-emerald-400">$</span>
                        {campaign.raisedAmount.toLocaleString()}
                        <span className="text-xs font-medium text-slate-400 ml-1">raised</span>
                      </div>

                      {/* Progress Bar */}
                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400 pt-0.5">
                        <span>Target: ${campaign.targetAmount.toLocaleString()}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-emerald-400" />
                          {campaign.backersCount} backers
                        </span>
                      </div>
                    </div>

                    {/* Creator Snippet & CTA */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={campaign.creatorAvatar} 
                          alt={campaign.creatorName}
                          className="h-7 w-7 rounded-full object-cover ring-1 ring-slate-700" 
                        />
                        <span className="text-xs font-medium text-slate-300 truncate max-w-[120px]">
                          {campaign.creatorName}
                        </span>
                      </div>

                      <Link
                        href={`/campaigns`}
                        className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-4 py-2 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-95 shadow-md shadow-emerald-500/20"
                      >
                        <span>Back Project</span>
                      </Link>
                    </div>

                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          <div className="text-center py-16 rounded-3xl border border-slate-800 bg-slate-900/30">
            <Filter className="mx-auto h-10 w-10 text-slate-500 mb-3" />
            <h3 className="text-lg font-semibold text-white">No campaigns found</h3>
            <p className="text-sm text-slate-400 mt-1">Try adjusting your search query or category filter.</p>
            <button
              onClick={() => { setSelectedCategory("All"); setSearchQuery(""); }}
              className="mt-4 inline-flex items-center rounded-xl bg-slate-800 px-4 py-2 text-xs font-medium text-emerald-400 hover:bg-slate-700"
            >
              Reset Filters
            </button>
          </div>
        )}

      </div>
    </section>
  );
};

export default CampaignsSection;

