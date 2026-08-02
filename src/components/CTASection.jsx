'use client';

import React from 'react';
import Link from 'next/link';
import { Rocket, ArrowRight, Sparkles } from 'lucide-react';

const CTASection = () => {
  return (
    <section className="relative py-20 overflow-hidden bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="relative overflow-hidden rounded-3xl border border-indigo-500/30 bg-gradient-to-r from-indigo-950 via-slate-900 to-slate-950 p-10 sm:p-16 shadow-2xl">
          
          {/* Background Ambient Glow */}
          <div className="absolute top-0 right-0 -mt-12 -mr-12 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl pointer-events-none"></div>
          <div className="absolute bottom-0 left-0 -mb-12 -ml-12 h-96 w-96 rounded-full bg-indigo-500/10 blur-3xl pointer-events-none"></div>

          <div className="relative z-10 max-w-3xl space-y-6 text-center sm:text-left">
            <div className="inline-flex items-center gap-2 rounded-full border border-emerald-500/30 bg-emerald-500/10 px-4 py-1.5 text-xs font-semibold text-emerald-300">
              <Sparkles className="h-4 w-4" />
              <span>Zero Upfront Fees • Instant Global Reach</span>
            </div>

            <h2 className="text-3xl sm:text-5xl font-extrabold text-white tracking-tight leading-tight">
              Ready to Launch Your Next Big <span className="gradient-emerald-text">Innovation</span>?
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl leading-relaxed">
              Join thousands of creators who turned their dreams into funded realities. Setup takes less than 10 minutes.
            </p>

            <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
              <Link 
                href="/register"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 px-8 py-4 text-base font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:scale-[1.02] hover:shadow-emerald-500/40 active:scale-95"
              >
                <Rocket className="h-5 w-5" />
                <span>Start Your Campaign Today</span>
              </Link>

              <Link 
                href="/campaigns"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-900/80 px-6 py-4 text-base font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
              >
                <span>Browse Active Projects</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
};

export default CTASection;
