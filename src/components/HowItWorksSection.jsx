'use client';

import React, { useState } from 'react';
import { Compass, Lightbulb, ShieldCheck, Gift, ArrowRight, CheckCircle } from 'lucide-react';

const backerSteps = [
  {
    step: "01",
    title: "Discover Visionary Ideas",
    description: "Browse vetted campaigns spanning breakthrough tech, green energy, indie gaming, and creative arts.",
    icon: Compass,
    color: "from-indigo-500 to-cyan-400"
  },
  {
    step: "02",
    title: "Back with Confidence",
    description: "Pledge funds safely. Your capital is protected in smart escrow until campaign milestones are verified.",
    icon: ShieldCheck,
    color: "from-emerald-500 to-teal-400"
  },
  {
    step: "03",
    title: "Receive Exclusive Perks",
    description: "Unlock early-bird pricing, founder rewards, beta access, and direct updates from project creators.",
    icon: Gift,
    color: "from-purple-500 to-pink-500"
  }
];

const creatorSteps = [
  {
    step: "01",
    title: "Launch Your Campaign",
    description: "Define your story, set funding targets, upload media, and configure pledge tiers in under 10 minutes.",
    icon: Lightbulb,
    color: "from-amber-500 to-orange-400"
  },
  {
    step: "02",
    title: "Rally Global Backers",
    description: "Leverage our built-in community tools, social sharing features, and developer API integrations.",
    icon: Compass,
    color: "from-emerald-500 to-teal-400"
  },
  {
    step: "03",
    title: "Fulfill & Deliver",
    description: "Access funds seamlessly upon success, post milestone updates, and ship rewards to delighted supporters.",
    icon: CheckCircle,
    color: "from-cyan-500 to-blue-500"
  }
];

const HowItWorksSection = () => {
  const [activeTab, setActiveTab] = useState('backers');

  const steps = activeTab === 'backers' ? backerSteps : creatorSteps;

  return (
    <section id="how-it-works" className="py-20 md:py-28 relative bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-12">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Simple & Transparent
          </span>
          <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight">
            How <span className="gradient-text">FundPulse</span> Works
          </h2>
          <p className="text-base sm:text-lg text-slate-400">
            A frictionless platform built for dreamers, innovators, and supporters worldwide.
          </p>

          {/* Toggle Switch */}
          <div className="pt-4 inline-flex items-center rounded-2xl bg-slate-900 border border-slate-800 p-1.5">
            <button
              onClick={() => setActiveTab('backers')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'backers'
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Backers
            </button>
            <button
              onClick={() => setActiveTab('creators')}
              className={`px-6 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                activeTab === 'creators'
                  ? 'bg-gradient-to-r from-indigo-500 to-emerald-400 text-slate-950 shadow-md'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              For Campaign Creators
            </button>
          </div>
        </div>

        {/* Workflow Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 relative">
          {steps.map((item, idx) => {
            const Icon = item.icon;
            return (
              <div 
                key={item.step}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md transition duration-300 hover:border-slate-700 hover:bg-slate-900 group"
              >
                <div className="flex items-center justify-between mb-6">
                  <span className="text-4xl font-extrabold text-slate-700 group-hover:text-slate-500 transition-colors">
                    {item.step}
                  </span>
                  <div className={`flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br ${item.color} text-slate-950 font-bold shadow-md`}>
                    <Icon className="h-6 w-6" />
                  </div>
                </div>

                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-emerald-300 transition-colors">
                  {item.title}
                </h3>
                
                <p className="text-sm text-slate-300 leading-relaxed">
                  {item.description}
                </p>

                {idx < 2 && (
                  <div className="hidden md:block absolute -right-4 top-1/2 -translate-y-1/2 z-10">
                    <ArrowRight className="h-6 w-6 text-slate-600" />
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default HowItWorksSection;
