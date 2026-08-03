'use client';

import React from 'react';
import Link from 'next/link';
import { ArrowRight, Sparkles, ShieldCheck, TrendingUp, Users, CheckCircle2, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation, EffectFade } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import 'swiper/css/effect-fade';

const HERO_SLIDES = [
  {
    id: 'slide-1',
    tag: 'Next-Gen Eco & Green Tech',
    heading: 'Turn Ambitious Green Ideas Into Reality',
    title: 'AeroPlant: Autonomous Solar Reforestation Drones',
    description: 'AI-guided autonomous drone fleets planting 5,000 native trees per day in devastated ecosystems. Join 1,840+ forward-thinking backers.',
    raisedAmount: '$142,500',
    targetAmount: '$150,000',
    percentage: 95,
    backers: '1,840 Backers',
    badge: '🌱 Green Innovation',
    category: 'Eco & Sustainability',
    image: '/images/campaigns/eco-drone.jpg',
    creator: 'Dr. Elena Rostova',
    creatorAvatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-2',
    tag: 'Revolutionary Wearable AI',
    heading: 'Empower High-Impact Health Intelligence',
    title: 'PulseRing X: Next-Gen Continuous Vital Tracking',
    description: 'Medical-grade biometric intelligence in a sleek titanium ring with zero subscription fees. Backed by over 4,120 global health enthusiasts.',
    raisedAmount: '$389,000',
    targetAmount: '$200,000',
    percentage: 194,
    backers: '4,120 Backers',
    badge: '⚡ Tech & AI Breakthrough',
    category: 'Tech & Wearables',
    image: '/images/campaigns/smart-ring.jpg',
    creator: 'NEXUS Health Labs',
    creatorAvatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80'
  },
  {
    id: 'slide-3',
    tag: 'Holographic Spatial Computing',
    heading: 'Fund The Future of Neural AR Hardware',
    title: 'NeuraVision: Quantum Spatial Holographic Headset',
    description: 'Ultra-lightweight spatial AR computing headset with real-time neural eye tracking and crisp holographic display overlay.',
    raisedAmount: '$275,000',
    targetAmount: '$250,000',
    percentage: 110,
    backers: '2,940 Backers',
    badge: '🔮 Spatial AR Hardware',
    category: 'Spatial Tech & AI',
    image: '/images/campaigns/quantum-headset.jpg',
    creator: 'NeuraLab Systems',
    creatorAvatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80'
  }
];

const HeroSection = () => {
  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden bg-mesh-radial">
      {/* Subtle Background Spheres */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute top-1/3 right-10 w-[400px] h-[400px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        
        {/* Swiper Hero Container */}
        <Swiper
          modules={[Autoplay, Pagination, Navigation, EffectFade]}
          effect="fade"
          fadeEffect={{ crossFade: true }}
          loop={true}
          speed={800}
          autoplay={{
            delay: 6000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          pagination={{
            clickable: true,
            el: '.hero-swiper-pagination',
            bulletActiveClass: '!bg-emerald-400 !w-8',
            bulletClass: 'inline-block h-2 w-2 rounded-full bg-slate-600 transition-all duration-300 cursor-pointer mx-1'
          }}
          navigation={{
            nextEl: '.hero-next-btn',
            prevEl: '.hero-prev-btn',
          }}
          className="w-full relative"
        >
          {HERO_SLIDES.map((slide) => (
            <SwiperSlide key={slide.id}>
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center py-4">
                
                {/* Left Column: Banner Text Content */}
                <div className="lg:col-span-7 space-y-6 text-center lg:text-left">
                  
                  {/* Tag Pill */}
                  <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-4 py-2 text-xs font-semibold text-indigo-300 backdrop-blur-md">
                    <Sparkles className="h-4 w-4 text-emerald-400 animate-pulse" />
                    <span>{slide.tag}</span>
                    <span className="h-1 w-1 rounded-full bg-indigo-400"></span>
                    <span className="text-emerald-400">Escrow Backed</span>
                  </div>

                  {/* Banner Heading */}
                  <h1 className="text-3xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-white leading-[1.15]">
                    {slide.heading.split(' ').map((word, i) => (
                      <span key={i} className={i % 2 === 1 ? 'gradient-text mr-2' : 'mr-2'}>
                        {word}
                      </span>
                    ))}
                  </h1>

                  {/* Banner Subtitle / Description */}
                  <div className="space-y-2">
                    <h3 className="text-lg font-bold text-emerald-400 tracking-wide">
                      {slide.title}
                    </h3>
                    <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto lg:mx-0 leading-relaxed font-normal">
                      {slide.description}
                    </p>
                  </div>

                  {/* Action Buttons */}
                  <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-4 pt-2">
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

                  {/* Platform Trust Highlights */}
                  <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-6 text-xs sm:text-sm text-slate-400 border-t border-slate-800/80">
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
                      <span>Instant Milestone Payouts</span>
                    </div>
                  </div>
                </div>

                {/* Right Column: Hero Spotlight Banner Card */}
                <div className="lg:col-span-5">
                  <div className="relative mx-auto max-w-md lg:max-w-none">
                    
                    {/* Glow backdrop */}
                    <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-indigo-500 via-emerald-500 to-purple-500 opacity-30 blur-xl"></div>
                    
                    {/* Glass Hero Card */}
                    <div className="relative overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/90 p-6 shadow-2xl backdrop-blur-xl">
                      
                      {/* Image Banner */}
                      <div className="relative h-60 w-full overflow-hidden rounded-2xl">
                        <img
                          src={slide.image}
                          alt={slide.title}
                          className="h-full w-full object-cover transition-transform duration-700 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/90 via-transparent to-transparent"></div>
                        
                        <span className="absolute top-3 left-3 rounded-full bg-emerald-500/90 px-3 py-1 text-xs font-semibold text-slate-950 shadow-md backdrop-blur-md">
                          {slide.badge}
                        </span>
                        
                        <span className="absolute top-3 right-3 flex items-center gap-1 rounded-full bg-slate-950/80 px-3 py-1 text-xs font-medium text-white backdrop-blur-md border border-slate-800">
                          <Users className="h-3.5 w-3.5 text-emerald-400" />
                          <span>{slide.backers}</span>
                        </span>
                      </div>

                      {/* Card Body */}
                      <div className="mt-5 space-y-4">
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-medium text-emerald-400 uppercase tracking-wider">{slide.category}</span>
                          <span className="text-xs font-medium text-slate-400">Live Campaign</span>
                        </div>

                        <h3 className="text-lg font-bold text-white leading-snug line-clamp-2">
                          {slide.title}
                        </h3>

                        {/* Progress */}
                        <div className="space-y-2 pt-1">
                          <div className="flex items-center justify-between text-sm">
                            <span className="font-bold text-emerald-400">{slide.raisedAmount} <span className="font-normal text-slate-400">raised</span></span>
                            <span className="font-bold text-white">{slide.percentage}%</span>
                          </div>
                          <div className="h-2.5 w-full rounded-full bg-slate-800 overflow-hidden">
                            <div 
                              className="h-full rounded-full bg-gradient-to-r from-indigo-500 to-emerald-400 transition-all duration-500" 
                              style={{ width: `${Math.min(100, slide.percentage)}%` }}
                            ></div>
                          </div>
                          <div className="flex items-center justify-between text-xs text-slate-400">
                            <span>Goal: {slide.targetAmount}</span>
                            <span>Status: Active</span>
                          </div>
                        </div>

                        {/* Creator Info Footer */}
                        <div className="flex items-center justify-between pt-3 border-t border-slate-800">
                          <div className="flex items-center gap-2.5">
                            <img 
                              src={slide.creatorAvatar} 
                              alt={slide.creator} 
                              className="h-8 w-8 rounded-full object-cover ring-2 ring-emerald-500/30"
                            />
                            <div>
                              <div className="text-xs font-semibold text-white">{slide.creator}</div>
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
            </SwiperSlide>
          ))}
        </Swiper>

        {/* Carousel Nav & Pagination Controls */}
        <div className="flex items-center justify-between pt-6 border-t border-slate-800/60 mt-4">
          <div className="flex items-center gap-3">
            <button 
              className="hero-prev-btn flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition disabled:opacity-50"
              aria-label="Previous Slide"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button 
              className="hero-next-btn flex h-10 w-10 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-300 hover:border-emerald-500 hover:text-emerald-400 transition disabled:opacity-50"
              aria-label="Next Slide"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          <div className="hero-swiper-pagination flex items-center"></div>

          <div className="hidden sm:block text-xs font-medium text-slate-400">
            Auto-sliding • Swipe to explore
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;

