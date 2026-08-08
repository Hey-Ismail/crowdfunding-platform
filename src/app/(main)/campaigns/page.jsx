'use client';

import React, { useState, useMemo } from 'react';
import { Search, Filter, Clock, Users, Heart, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';

const CATEGORIES = [
  'All',
  'Technology',
  'Art',
  'Health',
  'Education',
  'Environment',
];
import Link from 'next/link';
import { getAllCampaigns } from '@/lib/actions/campaigns';

export default function ExploreCampaignsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [likedCampaigns, setLikedCampaigns] = useState({});
  const [backedCampaigns, setBackedCampaigns] = useState({});
  const [campaignList, setCampaignList] = useState([]);
  const [loading, setLoading] = useState(true);

  React.useEffect(() => {
    const fetchCampaigns = async () => {
      try {
        const data = await getAllCampaigns();
        setCampaignList(data.reverse()); // Show newest first
      } catch (err) {
        console.error("Failed to load campaigns", err);
      } finally {
        setLoading(false);
      }
    };
    fetchCampaigns();
  }, []);

  // Toggle favorite / heart
  const toggleLike = (id) => {
    setLikedCampaigns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Toggle back status
  const handleBackProject = (id) => {
    setBackedCampaigns((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  // Filter logic
  const filteredCampaigns = useMemo(() => {
    return campaignList.filter((campaign) => {
      const matchesCategory =
        selectedCategory === 'All' || campaign.category === selectedCategory;
      const matchesSearch =
        campaign.campaign_title?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.creator_name?.toLowerCase().includes(searchQuery.toLowerCase()) ||
        campaign.campaign_story?.toLowerCase().includes(searchQuery.toLowerCase());
      return matchesCategory && matchesSearch;
    });
  }, [campaignList, selectedCategory, searchQuery]);



  return (
    <div className="min-h-screen bg-slate-950 p-6 lg:p-8 text-slate-100">
      <div className="max-w-7xl mx-auto space-y-8">
        {/* Header Section */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6 ">
          <div className="space-y-1">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-10 mt-12">
              <Sparkles className="w-3.5 h-3.5" />
              Discover & Support Innovations
            </div>
            <h1 className="text-2xl lg:text-3xl font-bold text-white tracking-tight">
              Explore Campaigns
            </h1>
            <p className="text-sm text-slate-400">
              Discover projects that need your support
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto">
            <div className="bg-slate-900/80 border border-slate-800 px-4 py-2 rounded-xl text-xs text-slate-400 flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              <span><strong className="text-white font-bold">{campaignList.length}</strong> Active Projects</span>
            </div>
          </div>
        </div>

        {/* Search Bar & Filter Controls */}
        <div className="bg-slate-900/50 border border-slate-800/80 rounded-2xl p-4 lg:p-6 space-y-4">
          <div className="flex flex-col md:flex-row gap-4 items-stretch md:items-center justify-between">
            {/* Search Bar */}
            <div className="relative flex-1">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="Search by title, creator, or keyword..."
                className="w-full bg-slate-950/80 border border-slate-800 text-slate-100 placeholder-slate-500 text-sm rounded-xl pl-11 pr-4 py-3 focus:outline-none focus:border-emerald-500/50 focus:ring-1 focus:ring-emerald-500/50 transition-all"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white bg-slate-800 px-2 py-1 rounded-md"
                >
                  Clear
                </button>
              )}
            </div>

            {/* Filter Indicator Label */}
            <div className="hidden lg:flex items-center gap-2 text-xs text-slate-400 px-1">
              <Filter className="w-4 h-4 text-indigo-400" />
              <span>Categories:</span>
            </div>
          </div>

          {/* Filter Buttons (Pills) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
            {CATEGORIES.map((category) => {
              const isActive = selectedCategory === category;
              return (
                <button
                  key={category}
                  onClick={() => setSelectedCategory(category)}
                  className={`px-4 py-2 rounded-xl text-xs font-semibold whitespace-nowrap transition-all duration-200 cursor-pointer ${isActive
                    ? 'bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/15 border border-emerald-400/30'
                    : 'bg-slate-950/60 text-slate-400 hover:text-white hover:bg-slate-800/80 border border-slate-800/80'
                    }`}
                >
                  {category}
                </button>
              );
            })}
          </div>
        </div>

        {/* Campaigns Grid */}
        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="h-8 w-8 animate-spin rounded-full border-2 border-emerald-500 border-t-transparent"></div>
          </div>
        ) : filteredCampaigns.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredCampaigns.map((campaign) => {
              const isLiked = !!likedCampaigns[campaign._id];

              const raisedAmount = campaign.raisedAmount || 0;
              const targetAmount = campaign.funding_goal || 1;
              const progressPercentage = Math.min(100, Math.round((raisedAmount / targetAmount) * 100));
              const daysLeft = campaign.deadline ? Math.max(0, Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : 0;
              const fallbackGradient = 'from-emerald-500/20 via-teal-600/20 to-indigo-700/20';
              const imageUrl = campaign.campaign_image_url || null;

              return (
                <div
                  key={campaign._id}
                  className="group rounded-2xl border border-slate-800/80 bg-slate-900/50 overflow-hidden flex flex-col justify-between h-full transition-all duration-300 hover:border-slate-700/80 hover:shadow-2xl hover:shadow-emerald-500/5"
                >
                  {/* Image Cover Container */}
                  <div
                    className={`h-48 relative overflow-hidden bg-gradient-to-br ${fallbackGradient} flex flex-col justify-between`}
                  >
                    {imageUrl && (
                      <img src={imageUrl} alt={campaign.campaign_title} className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                    )}
                    {/* Subtle Grid Overlay effect */}
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80 pointer-events-none" />

                    {/* Top Bar inside placeholder */}
                    <div className="relative z-10 flex items-center justify-between p-4">
                      <span className="px-3 py-1 rounded-full text-xs font-semibold bg-slate-950/70 backdrop-blur-md text-emerald-400 border border-emerald-500/20 shadow-sm">
                        {campaign.category || 'General'}
                      </span>
                      <button
                        onClick={() => toggleLike(campaign._id)}
                        aria-label="Bookmark campaign"
                        className={`h-9 w-9 rounded-full bg-slate-950/70 backdrop-blur-md border border-white/10 flex items-center justify-center transition-all duration-200 cursor-pointer ${isLiked
                          ? 'text-rose-500 bg-rose-500/20 border-rose-500/40 shadow-lg shadow-rose-500/20'
                          : 'text-slate-300 hover:text-rose-400 hover:bg-slate-900/90'
                          }`}
                      >
                        <Heart
                          className={`w-4 h-4 ${isLiked ? 'fill-rose-500' : ''
                            }`}
                        />
                      </button>
                    </div>
                  </div>

                  {/* Card Body */}
                  <div className="p-5 space-y-4 flex-1 flex flex-col justify-between">
                    <div className="space-y-2">
                      <p className="text-xs font-medium text-indigo-400">
                        by {campaign.creator_name || 'Anonymous Creator'}
                      </p>
                      <h3 className="text-lg font-bold text-white group-hover:text-emerald-400 transition-colors line-clamp-1">
                        {campaign.campaign_title}
                      </h3>
                      <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                        {campaign.campaign_story}
                      </p>
                    </div>

                    {/* Progress Bar & Amount Raised */}
                    <div className="space-y-2 pt-2 border-t border-slate-800/60">
                      <div className="flex items-center justify-between text-xs">
                        <div>
                          <span className="font-bold text-white text-sm">
                            ${raisedAmount.toLocaleString()}
                          </span>{' '}
                          <span className="text-slate-400 font-normal">
                            raised of ${targetAmount.toLocaleString()}
                          </span>
                        </div>
                        <span className="font-bold text-emerald-400">
                          {progressPercentage}%
                        </span>
                      </div>

                      {/* Progress Bar using emerald-500 color */}
                      <div className="w-full h-2 rounded-full bg-slate-800 overflow-hidden">
                        <div
                          className="h-full rounded-full bg-emerald-500 transition-all duration-500 ease-out"
                          style={{
                            width: `${progressPercentage}%`,
                          }}
                        />
                      </div>
                    </div>

                    {/* Meta Information Badges */}
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/80">
                        <Clock className="w-3.5 h-3.5 text-indigo-400" />
                        <span>{daysLeft} days left</span>
                      </div>
                      <div className="flex items-center gap-1.5 bg-slate-950/60 px-2.5 py-1 rounded-lg border border-slate-800/80">
                        <Users className="w-3.5 h-3.5 text-emerald-400" />
                        <span>{campaign.backersCount || 0} backers</span>
                      </div>
                    </div>

                    {/* Action Button */}
                    <Link
                      href={`/campaigns/${campaign._id}`}
                      className="w-full mt-2 inline-flex items-center justify-center gap-2 rounded-xl px-4 py-2.5 text-sm font-semibold transition-all duration-200 cursor-pointer bg-gradient-to-r from-emerald-500 to-indigo-600 text-white shadow-lg shadow-emerald-500/10 hover:shadow-emerald-500/20 hover:from-emerald-400 hover:to-indigo-500 group"
                    >
                      Details
                      <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        ) : (
          /* Empty State */
          <div className="rounded-2xl border border-slate-800/80 bg-slate-900/40 p-12 text-center space-y-3">
            <p className="text-slate-300 font-semibold">No campaigns found</p>
            <p className="text-slate-500 text-sm max-w-sm mx-auto">
              Try adjusting your search query or switching categories to explore other active projects.
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setSelectedCategory('All');
              }}
              className="mt-2 text-xs font-semibold text-emerald-400 hover:text-emerald-300 underline underline-offset-4"
            >
              Reset Filters
            </button>
          </div>
        )}


      </div>
    </div>
  );
}
