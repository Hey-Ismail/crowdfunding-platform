'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, Users, Heart, CheckCircle2 } from 'lucide-react';

const HeroSection = () => {
  return (
    <section className="relative pt-32 pb-20 md:pt-40 md:pb-28 overflow-hidden bg-mesh-radial">
      {/* Subtle Background Glow Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
          
          {/* Left Column: Headline & Action */}
          <div className="lg:col-span-7 space-y-8 text-center lg:text-left">
            
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300 backdrop-blur-md">
              <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
              <span>Next-Generation Crowdfunding Engine</span>
              <span className="h-1 w-1 rounded-full bg-indigo-400"></span>
              <span className="text-emerald-400">Web3 & Fiat Ready</span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
              Turn Ambitious <span className="gradient-text">Ideas</span> Into World-Changing <span className="gradient-emerald-text">Reality</span>.
            </h1>

            {/* Description */}
            <p className="text-lg sm:text-xl text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
              FundPulse connects visionary creators with a global network of passionate backers. Transparent milestones, zero upfront fees, and instant community support.
            </p>

            {/* Call to Actions */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4">
              <Link 
                href="/campaigns"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-7 py-4 text-base font-semibold text-slate-950 shadow-lg shadow-emerald-500/25 transition-all hover:scale-[1.02] hover:shadow-emerald-500/40 active:scale-95"
              >
                <span>Explore Featured Projects</span>
                <ArrowRight className="h-5 w-5" />
              </Link>

              <Link 
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700/80 px-6 py-4 text-base font-semibold text-slate-200 transition-all hover:bg-slate-700 hover:text-white hover:border-slate-600"
              >
                <span>Start a Campaign</span>
              </Link>
            </div>

            {/* Micro Feature Indicators */}
            <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-sm text-slate-400 border-t border-slate-800/80">
              <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-400" />
                <span>100% Escrow Protection</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="h-4 w-4 text-indigo-400" />
                <span>Verified Creator Profiles</span>
              </div>
              <div className="flex items-center gap-2">
                <TrendingUp className="h-4 w-4 text-cyan-400" />
                <span>Real-Time Payouts</span>
              </div>
            </div>
          </div>

          {/* Right Column: Hero Spotlight Card */}
          <div className="lg:col-span-5">
            <div className="relative mx-auto max-w-md lg:max-w-none">
              
              {/* Decorative Card Glow */}
              <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-emerald-500 to-purple-500 opacity-30 blur-xl"></div>
              
              {/* Glass Featured Hero Card */}
              <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
                
                {/* Hero Card Image Container */}
                <div className="relative h-56 w-full overflow-hidden rounded-2xl">
                  <img
                    src="/images/campaigns/eco-drone.jpg"
                    alt="Featured Campaign AeroPlant"
                    className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-transparent to-transparent"></div>
                  
                  {/* Badge */}
                  <span className="absolute top-3 left-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-slate-950 shadow-md backdrop-blur-md">
                    🔥 Featured Campaign
                  </span>
                  
                  <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/70 px-3 py-1 text-xs font-medium text-white backdrop-blur-md">
                    <Users className="h-3.5 w-3.5 text-emerald-400" />
                    <span>1,840 Backers</span>
                  </span>
                </div>

                {/* Card Content */}
                <div className="mt-5 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">Eco & Green</span>
                    <span className="text-xs font-medium text-slate-400">6 Days Left</span>
                  </div>

                  <h3 className="text-xl font-bold text-white leading-snug hover:text-emerald-400 transition cursor-pointer">
                    AeroPlant: Autonomous Solar Reforestation Drone
                  </h3>

                  <p className="text-sm text-slate-300 line-clamp-2">
                    AI-guided autonomous drone system capable of planting 5,000 native trees per day in devastated ecosystems.
                  </p>

                  {/* Progress Bar */}
                  <div className="space-y-2 pt-2">
                    <div className="flex items-center justify-between text-sm">
                      <span className="font-bold text-emerald-400">$142,500 <span className="font-normal text-slate-400">raised</span></span>
                      <span className="font-bold text-white">95%</span>
                    </div>
                    <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400" style={{ width: '95%' }}></div>
                    </div>
                    <div className="flex items-center justify-between text-xs text-slate-400 pt-1">
                      <span>Goal: $150,000</span>
                      <span>Target Date: Aug 30</span>
                    </div>
                  </div>

                  {/* Creator Info Footer */}
                  <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                    <div className="flex items-center gap-2.5">
                      <div className="h-8 w-8 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-bold text-white">
                        DR
                      </div>
                      <div>
                        <div className="text-xs font-semibold text-white">Dr. Elena Rostova</div>
                        <div className="text-[10px] text-slate-400">Verified Innovator</div>
                      </div>
                    </div>

                    <Link 
                      href="/campaigns"
                      className="rounded-lg bg-emerald-500/20 border border-emerald-500/40 px-3 py-1.5 text-xs font-semibold text-emerald-300 hover:bg-emerald-500 hover:text-slate-950 transition"
                    >
                      Back Project
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default HeroSection;
