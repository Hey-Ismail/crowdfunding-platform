'use client';

import React from 'react';
import { ShieldCheck, Lock, Award, Zap, CheckCircle2 } from 'lucide-react';

const trustFeatures = [
  {
    title: "Bank-Grade Escrow Vaults",
    description: "Pledged funds are held securely in escrow until campaign targets and verified milestones are met.",
    icon: Lock,
    highlight: "100% Protected"
  },
  {
    title: "Verified Creator Profiles",
    description: "Every campaign creator undergoes mandatory identity checks and background verification before launch.",
    icon: ShieldCheck,
    highlight: "KYC Verified"
  },
  {
    title: "Transparent Progress Tracking",
    description: "Track project updates, expense reports, and shipping milestones directly on the campaign portal.",
    icon: Award,
    highlight: "Real-Time Updates"
  },
  {
    title: "Instant Web3 & Fiat Checkout",
    description: "Support campaigns seamlessly using standard credit cards, Apple Pay, Stripe, or crypto wallets.",
    icon: Zap,
    highlight: "Multi-Currency"
  }
];

const TrustSection = () => {
  return (
    <section className="py-20 bg-slate-900/80 border-y border-slate-800">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Backed by Trust
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Security & Integrity at <span className="gradient-emerald-text">Every Step</span>
          </h2>
          <p className="text-base text-slate-300">
            We put backer safety and creator accountability at the core of our platform architecture.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {trustFeatures.map((feature) => {
            const Icon = feature.icon;
            return (
              <div 
                key={feature.title}
                className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-950 p-6 transition duration-300 hover:border-slate-700 hover:bg-slate-950/80 group"
              >
                <div className="flex items-center justify-between mb-4">
                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 group-hover:bg-emerald-500 group-hover:text-slate-950 transition-colors">
                    <Icon className="h-6 w-6" />
                  </div>
                  <span className="rounded-full bg-slate-800 px-3 py-1 text-[10px] font-semibold text-emerald-400 border border-slate-700">
                    {feature.highlight}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-white mb-2 group-hover:text-emerald-300 transition-colors">
                  {feature.title}
                </h3>
                
                <p className="text-xs text-slate-400 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};

export default TrustSection;
