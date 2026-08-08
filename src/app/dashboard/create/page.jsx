'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Rocket,
  Image as ImageIcon,
  Tag,
  AlignLeft,
  Target,
  DollarSign,
  Calendar,
  Gift,
  AlertCircle,
  CheckCircle2,
} from 'lucide-react';
import { useSession } from '@/lib/auth-client';
import { createCampaing } from '@/lib/actions/campaigns';

export default function CreateCampaignPage() {
  const router = useRouter();
  const { data: session } = useSession();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [createdId, setCreatedId] = useState(null);

  const [formData, setFormData] = useState({
    campaign_title: '',
    campaign_story: '',
    category: 'Technology',
    funding_goal: '',
    minimum_Contribution: '',
    deadline: '',
    reward_info: '',
    campaign_image_url: '',
  });

  const categories = [
    'Technology',
    'Art',
    'Community',
    'Health',
    'Education',
    'Environment',
    'Games',
  ];

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setError('');
    setSuccess('');

    // Prepare data to send
    const campaignData = {
      ...formData,
      funding_goal: Number(formData.funding_goal),
      minimum_Contribution: Number(formData.minimum_Contribution),
      creator_name: session?.user?.name || 'Anonymous Creator',
      creator_email: session?.user?.email || '',
      createdAt: new Date().toISOString(),
    };

    try {
      const result = await createCampaing(campaignData);

      console.log('Campaign created:', result);

      if (result.insertedId) {
        setCreatedId(result.insertedId);
        setSuccess('Campaign successfully created and published!');
        
        // Reset form or redirect
        setTimeout(() => {
          router.push(`/campaigns/${result.insertedId}`);
        }, 2000);
      } else {
        throw new Error('Failed to retrieve campaign ID.');
      }

    } catch (err) {
      console.error(err);
      setError(err.message || 'Something went wrong while connecting to the server.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 p-4 sm:p-6 lg:p-8 text-slate-100">
      <div className="max-w-4xl mx-auto space-y-8">

        {/* Header Section */}
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 rounded-full bg-emerald-500/10 border border-emerald-500/20 px-3 py-1 text-xs font-semibold text-emerald-400">
            <Rocket className="h-3.5 w-3.5" />
            <span>Launch Pad</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight text-white">
            Create New Campaign
          </h1>
          <p className="text-sm text-slate-400">
            Fill in the details below to launch your project and start gathering support.
          </p>
        </div>

        {/* Alerts */}
        {error && (
          <div className="flex items-center gap-3 rounded-xl border border-rose-500/20 bg-rose-500/10 p-4 text-sm text-rose-400 shadow-md">
            <AlertCircle className="h-5 w-5 shrink-0" />
            <p>{error}</p>
          </div>
        )}

        {success && (
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 rounded-xl border border-emerald-500/20 bg-emerald-500/10 p-4 text-sm text-emerald-400 shadow-md">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="h-5 w-5 shrink-0" />
              <p>{success}</p>
            </div>
            {createdId && (
              <button
                onClick={() => router.push(`/campaigns/${createdId}`)}
                className="shrink-0 px-4 py-1.5 rounded-lg bg-emerald-500 text-slate-950 font-bold hover:bg-emerald-400 transition-colors"
              >
                View Campaign
              </button>
            )}
          </div>
        )}

        {/* Form Container */}
        <form onSubmit={handleSubmit} className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 sm:p-8 backdrop-blur-xl shadow-2xl space-y-6">

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">

            {/* Title */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Rocket className="h-4 w-4 text-emerald-400" />
                Campaign Title
              </label>
              <input
                type="text"
                name="campaign_title"
                required
                value={formData.campaign_title}
                onChange={handleChange}
                placeholder="e.g., Help us build a solar-powered water pump"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
              />
            </div>

            {/* Category */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Tag className="h-4 w-4 text-indigo-400" />
                Category
              </label>
              <select
                name="category"
                required
                value={formData.category}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none appearance-none"
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat} className="bg-slate-900 text-white">
                    {cat}
                  </option>
                ))}
              </select>
            </div>

            {/* Deadline */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Calendar className="h-4 w-4 text-rose-400" />
                Deadline
              </label>
              <input
                type="date"
                name="deadline"
                required
                value={formData.deadline}
                onChange={handleChange}
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
              />
            </div>

            {/* Funding Goal */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Target className="h-4 w-4 text-teal-400" />
                Funding Goal ($)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <DollarSign className="h-4 w-4" />
                </div>
                <input
                  type="number"
                  name="funding_goal"
                  min="1"
                  required
                  value={formData.funding_goal}
                  onChange={handleChange}
                  placeholder="10000"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Minimum Contribution */}
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <DollarSign className="h-4 w-4 text-amber-400" />
                Minimum Contribution ($)
              </label>
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400">
                  <DollarSign className="h-4 w-4" />
                </div>
                <input
                  type="number"
                  name="minimum_Contribution"
                  min="1"
                  required
                  value={formData.minimum_Contribution}
                  onChange={handleChange}
                  placeholder="10"
                  className="w-full rounded-xl border border-slate-700 bg-slate-800/50 pl-9 pr-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
                />
              </div>
            </div>

            {/* Image URL */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <ImageIcon className="h-4 w-4 text-fuchsia-400" />
                Campaign Image URL
              </label>
              <input
                type="url"
                name="campaign_image_url"
                required
                value={formData.campaign_image_url}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none"
              />
            </div>

            {/* Story */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <AlignLeft className="h-4 w-4 text-cyan-400" />
                Campaign Story
              </label>
              <textarea
                name="campaign_story"
                required
                rows="5"
                value={formData.campaign_story}
                onChange={handleChange}
                placeholder="Tell supporters why they should back your project..."
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none resize-none"
              />
            </div>

            {/* Rewards */}
            <div className="md:col-span-2 space-y-2">
              <label className="text-sm font-semibold text-slate-300 flex items-center gap-2">
                <Gift className="h-4 w-4 text-pink-400" />
                Reward Information
              </label>
              <textarea
                name="reward_info"
                required
                rows="3"
                value={formData.reward_info}
                onChange={handleChange}
                placeholder="What will supporters receive? (e.g., Early bird access, T-shirt, etc.)"
                className="w-full rounded-xl border border-slate-700 bg-slate-800/50 px-4 py-3 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-colors outline-none resize-none"
              />
            </div>

          </div>

          <div className="pt-4 border-t border-slate-800/60">
            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full md:w-auto relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-8 py-3.5 text-sm font-bold text-slate-950 transition-all hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <span className="flex items-center justify-center gap-2">
                  <div className="h-4 w-4 animate-spin rounded-full border-2 border-slate-950 border-t-transparent"></div>
                  Publishing...
                </span>
              ) : (
                'Launch Campaign'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
