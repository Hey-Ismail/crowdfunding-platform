'use client';

import React from 'react';
import { PLATFORM_STATS } from '@/data/campaigns';
import { DollarSign, Award, Globe, Lock } from 'lucide-react';

const iconsMap = [DollarSign, Award, Globe, Lock];

const StatsBanner = () => {
  return (
    <section id="stats" className="relative py-12 bg-slate-950/60 border-y border-slate-800/80">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {PLATFORM_STATS.map((stat, idx) => {
            const Icon = iconsMap[idx] || DollarSign;
            return (
              <div 
                key={stat.label}
                className="relative overflow-hidden rounded-2xl border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-md transition-all hover:border-slate-700 hover:bg-slate-900/80 group"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                    {stat.label}
                  </span>
                  <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-800/80 text-emerald-400 group-hover:bg-emerald-500/20 group-hover:text-emerald-300 transition-colors">
                    <Icon className="h-5 w-5" />
                  </div>
                </div>

                <div className="mt-4">
                  <div className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white group-hover:text-emerald-400 transition-colors">
                    {stat.value}
                  </div>
                  <div className="mt-1 text-xs text-slate-400 flex items-center gap-1.5">
                    <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400"></span>
                    <span>{stat.change}</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default StatsBanner;
