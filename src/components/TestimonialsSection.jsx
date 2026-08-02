'use client';

import React from 'react';
import { Star, Quote } from 'lucide-react';

const testimonials = [
  {
    quote: "FundPulse made our fundraising campaign seamless. We reached our $150,000 target in under 48 hours thanks to the passionate backer community and intuitive tools.",
    author: "Sarah Lin",
    role: "Founder, BioClean Energy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    raised: "$185,000 Raised"
  },
  {
    quote: "The milestone-based escrow gave our backers complete peace of mind. As a first-time indie game developer, the support we received exceeded all expectations.",
    author: "Marcus Thorne",
    role: "Lead Director, Arcane Light",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    raised: "$94,200 Raised"
  },
  {
    quote: "From setting up our project page to integrating developer webhooks, the platform was incredibly responsive. Best crowdfunding experience by far.",
    author: "Elena Rostova",
    role: "Robotics Engineer, AeroPlant",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    raised: "$142,500 Raised"
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 relative bg-slate-950">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        <div className="text-center max-w-3xl mx-auto space-y-4 mb-16">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Creator Success Stories
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by <span className="gradient-text">Innovators Worldwide</span>
          </h2>
          <p className="text-base text-slate-400">
            See how visionary creators transformed their concepts into thriving enterprises.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <div
              key={idx}
              className="relative flex flex-col justify-between rounded-3xl border border-slate-800 bg-slate-900/50 p-8 backdrop-blur-md transition duration-300 hover:border-slate-700 hover:bg-slate-900"
            >
              <Quote className="h-8 w-8 text-indigo-400/40 mb-4" />

              <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                &quot;{t.quote}&quot;
              </p>

              <div className="flex items-center justify-between pt-4 border-t border-slate-800">
                <div className="flex items-center gap-3">
                  <image
                    src={t.avatar}
                    alt={t.author}
                    className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                  />
                  <div>
                    <div className="text-sm font-bold text-white">{t.author}</div>
                    <div className="text-xs text-slate-400">{t.role}</div>
                  </div>
                </div>

                <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20">
                  {t.raised}
                </span>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;
