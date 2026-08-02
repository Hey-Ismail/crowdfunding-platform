'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { MOCK_CAMPAIGNS, CAMPAIGN_CATEGORIES } from '@/data/campaigns';
import { Search, Heart, Clock, Users, ArrowUpRight, Sparkles, Filter } from 'lucide-react';

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

  const filteredCampaigns = MOCK_CAMPAIGNS.filter(campaign => {
    const matchesCategory = selectedCategory === "All" || campaign.category === selectedCategory;
    const matchesSearch = campaign.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
                          campaign.shortDescription.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <section className="py-20 md:py-28 relative bg-slate-900/40">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-emerald-400 mb-2">
              <Sparkles className="h-4 w-4" />
              <span>Explore Opportunities</span>
            </div>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Featured <span className="gradient-text">Campaigns</span>
            </h2>
            <p className="mt-2 text-base text-slate-400 max-w-xl">
              Back revolutionary projects, support innovative creators, and receive exclusive rewards.
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
              placeholder="Search projects..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full rounded-xl border border-slate-700 bg-slate-950/80 py-2.5 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
            />
          </div>
        </div>

        {/* Campaign Grid */}
        {filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredCampaigns.map(campaign => {
              const progressPercentage = Math.min(100, Math.round((campaign.raisedAmount / campaign.targetAmount) * 100));
              const isLiked = likedCampaigns[campaign.id];

              return (
                <div 
                  key={campaign.id}
                  className="group relative flex flex-col overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 shadow-lg backdrop-blur-md transition-all duration-300 hover:-translate-y-1.5 hover:border-slate-700 hover:shadow-2xl hover:shadow-emerald-500/10"
                >
                  {/* Image Container */}
                  <div className="relative h-48 w-full overflow-hidden bg-slate-950">
                    <img
                      src={campaign.image}
                      alt={campaign.title}
                      className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent opacity-80"></div>
                    
                    {/* Badge */}
                    <span className={`absolute top-3 left-3 rounded-full border px-3 py-1 text-[11px] font-semibold backdrop-blur-md ${badgeStyles[campaign.badgeColor] || badgeStyles.emerald}`}>
                      {campaign.badge}
                    </span>

                    {/* Bookmark / Like Button */}
                    <button
                      onClick={() => toggleLike(campaign.id)}
                      className="absolute top-3 right-3 flex h-8 w-8 items-center justify-center rounded-full bg-slate-950/70 text-slate-300 backdrop-blur-md transition hover:scale-110 hover:text-rose-400"
                      aria-label="Save campaign"
                    >
                      <Heart className={`h-4 w-4 ${isLiked ? 'fill-rose-500 text-rose-500' : ''}`} />
                    </button>
                  </div>

                  {/* Body Content */}
                  <div className="flex flex-1 flex-col justify-between p-5 space-y-4">
                    <div>
                      <div className="flex items-center justify-between text-xs font-semibold text-slate-400 mb-1.5">
                        <span className="text-emerald-400">{campaign.category}</span>
                        <span className="flex items-center gap-1 text-slate-400">
                          <Clock className="h-3.5 w-3.5" />
                          {campaign.daysLeft}d left
                        </span>
                      </div>

                      <h3 className="text-lg font-bold text-white leading-snug line-clamp-2 group-hover:text-emerald-300 transition-colors">
                        {campaign.title}
                      </h3>

                      <p className="mt-2 text-xs text-slate-300 line-clamp-2 leading-relaxed">
                        {campaign.shortDescription}
                      </p>
                    </div>

                    {/* Progress Bar & Financial Metrics */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/80">
                      <div className="flex items-center justify-between text-xs">
                        <span className="font-bold text-white">${campaign.raisedAmount.toLocaleString()}</span>
                        <span className="font-bold text-emerald-400">{progressPercentage}%</span>
                      </div>

                      <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500"
                          style={{ width: `${progressPercentage}%` }}
                        ></div>
                      </div>

                      <div className="flex items-center justify-between text-[11px] text-slate-400">
                        <span>Goal: ${campaign.targetAmount.toLocaleString()}</span>
                        <span className="flex items-center gap-1">
                          <Users className="h-3 w-3 text-slate-400" />
                          {campaign.backersCount} backers
                        </span>
                      </div>
                    </div>

                    {/* Creator Snippet & CTA Action */}
                    <div className="flex items-center justify-between pt-2">
                      <div className="flex items-center gap-2">
                        <img 
                          src={campaign.creatorAvatar} 
                          alt={campaign.creatorName}
                          className="h-6 w-6 rounded-full object-cover ring-1 ring-slate-700" 
                        />
                        <span className="text-xs font-medium text-slate-300 truncate max-w-[100px]">
                          {campaign.creatorName}
                        </span>
                      </div>

                      <Link
                        href={`/campaigns`}
                        className="inline-flex items-center gap-1 rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400 active:scale-95 shadow-sm"
                      >
                        <span>Back Now</span>
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
