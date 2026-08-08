import React from 'react';
import { getCampaignById } from '@/lib/actions/campaigns';
import { Clock, Users, Target, Calendar, ArrowLeft, Heart, Share2, Sparkles, AlertCircle, Gift } from 'lucide-react';
import Link from 'next/link';

export default async function CampaignDetailsPage({ params }) {
  const { id } = await params;
  
  let campaign = null;
  try {
    campaign = await getCampaignById(id);
  } catch (error) {
    console.error(error);
  }

  if (!campaign) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-6">
        <AlertCircle className="h-16 w-16 text-rose-500 mb-4" />
        <h1 className="text-2xl font-bold text-white mb-2">Campaign Not Found</h1>
        <p className="text-slate-400 mb-6">The campaign you are looking for does not exist or has been removed.</p>
        <Link href="/" className="px-6 py-2 bg-emerald-500 text-slate-950 font-bold rounded-xl hover:bg-emerald-400 transition-colors">
          Return Home
        </Link>
      </div>
    );
  }

  const raisedAmount = campaign.raisedAmount || 0;
  const targetAmount = campaign.funding_goal || 1;
  const progressPercentage = Math.min(100, Math.round((raisedAmount / targetAmount) * 100));
  const daysLeft = campaign.deadline ? Math.max(0, Math.ceil((new Date(campaign.deadline) - new Date()) / (1000 * 60 * 60 * 24))) : 0;
  const avatarUrl = `https://api.dicebear.com/7.x/avataaars/svg?seed=${campaign.creator_name || 'Creator'}`;

  return (
    <div className="min-h-screen bg-slate-950 pt-24 pb-20 text-slate-100 selection:bg-emerald-500/30">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Navigation & Actions */}
        <div className="flex items-center justify-between mb-8">
          <Link href="/campaigns" className="inline-flex items-center gap-2 text-sm font-semibold text-slate-400 hover:text-emerald-400 transition-colors">
            <ArrowLeft className="h-4 w-4" />
            Back to Campaigns
          </Link>
          <div className="flex gap-3">
            <button className="h-10 w-10 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-rose-400 hover:border-rose-500/30 transition-all">
              <Heart className="h-4 w-4" />
            </button>
            <button className="h-10 w-10 rounded-full border border-slate-800 bg-slate-900/50 flex items-center justify-center text-slate-400 hover:text-indigo-400 hover:border-indigo-500/30 transition-all">
              <Share2 className="h-4 w-4" />
            </button>
          </div>
        </div>

        {/* Main Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          
          {/* Left Column: Image & Story */}
          <div className="lg:col-span-8 space-y-10">
            {/* Image Hero */}
            <div className="relative h-[300px] md:h-[450px] w-full rounded-3xl overflow-hidden border border-slate-800/80 shadow-2xl">
              <img 
                src={campaign.campaign_image_url || 'https://via.placeholder.com/800x450'} 
                alt={campaign.campaign_title}
                className="absolute inset-0 w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-slate-950/20 to-transparent opacity-80"></div>
              
              <div className="absolute bottom-6 left-6 right-6">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 text-xs font-bold uppercase tracking-wider mb-3 backdrop-blur-md">
                  <Sparkles className="h-3 w-3" />
                  {campaign.category || 'General'}
                </span>
                <h1 className="text-3xl md:text-5xl font-extrabold text-white leading-tight">
                  {campaign.campaign_title}
                </h1>
              </div>
            </div>

            {/* Creator Info */}
            <div className="flex items-center gap-4 py-4 border-y border-slate-800/60">
              <img src={avatarUrl} alt={campaign.creator_name} className="h-14 w-14 rounded-full border-2 border-slate-800 bg-slate-900" />
              <div>
                <p className="text-sm text-slate-400">Created by</p>
                <p className="text-lg font-bold text-white">{campaign.creator_name || 'Anonymous Creator'}</p>
              </div>
            </div>

            {/* Story */}
            <div className="prose prose-invert prose-emerald max-w-none">
              <h2 className="text-2xl font-bold text-white border-b border-slate-800 pb-2 mb-6">About this campaign</h2>
              <p className="text-slate-300 leading-relaxed whitespace-pre-wrap text-lg">
                {campaign.campaign_story}
              </p>
            </div>
          </div>

          {/* Right Column: Funding Box & Rewards */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Funding Sticky Box */}
            <div className="sticky top-24 rounded-3xl border border-slate-800/80 bg-slate-900/60 p-6 sm:p-8 backdrop-blur-xl shadow-2xl">
              <div className="h-2 w-full rounded-full bg-slate-800 overflow-hidden mb-6">
                <div 
                  className="h-full rounded-full bg-gradient-to-r from-emerald-500 to-teal-400"
                  style={{ width: `${progressPercentage}%` }}
                ></div>
              </div>

              <div className="space-y-6">
                <div>
                  <div className="text-4xl font-black text-emerald-400 flex items-baseline gap-1">
                    <span className="text-2xl">$</span>
                    {raisedAmount.toLocaleString()}
                  </div>
                  <p className="text-slate-400 mt-1 font-medium">
                    raised of <span className="text-white font-bold">${targetAmount.toLocaleString()}</span> goal
                  </p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Users className="h-4 w-4 text-indigo-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Backers</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{campaign.backersCount || 0}</div>
                  </div>
                  <div className="rounded-2xl bg-slate-950/50 border border-slate-800 p-4">
                    <div className="flex items-center gap-2 text-slate-400 mb-1">
                      <Clock className="h-4 w-4 text-amber-400" />
                      <span className="text-xs font-semibold uppercase tracking-wider">Days Left</span>
                    </div>
                    <div className="text-2xl font-bold text-white">{daysLeft}</div>
                  </div>
                </div>

                <button className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-6 py-4 text-base font-bold text-slate-950 transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95">
                  Back this project
                </button>
                <p className="text-center text-xs text-slate-500 mt-2">
                  Minimum contribution: <span className="font-bold text-slate-300">${campaign.minimum_Contribution || 1}</span>
                </p>
              </div>
            </div>

            {/* Rewards Card */}
            {campaign.reward_info && (
              <div className="rounded-3xl border border-slate-800/80 bg-slate-900/40 p-6 backdrop-blur-md shadow-lg mt-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="p-2 rounded-lg bg-pink-500/10 border border-pink-500/20">
                    <Gift className="h-5 w-5 text-pink-400" />
                  </div>
                  <h3 className="text-xl font-bold text-white">Campaign Rewards</h3>
                </div>
                <p className="text-slate-300 text-sm leading-relaxed whitespace-pre-wrap">
                  {campaign.reward_info}
                </p>
              </div>
            )}
            
          </div>
        </div>
      </div>
    </div>
  );
}
