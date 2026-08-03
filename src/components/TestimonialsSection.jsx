'use client';

import React from 'react';
import { Star, Quote, ChevronLeft, ChevronRight } from 'lucide-react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay, Pagination, Navigation } from 'swiper/modules';

import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const TESTIMONIALS = [
  {
    quote: "FundPulse made our fundraising campaign seamless. We reached our $150,000 target in under 48 hours thanks to the passionate backer community and intuitive tools.",
    author: "Sarah Lin",
    role: "Founder, BioClean Energy",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80",
    raised: "$185,000 Raised",
    rating: 5
  },
  {
    quote: "The milestone-based escrow gave our backers complete peace of mind. As a first-time indie game developer, the support we received exceeded all expectations.",
    author: "Marcus Thorne",
    role: "Lead Director, Arcane Light",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80",
    raised: "$94,200 Raised",
    rating: 5
  },
  {
    quote: "From setting up our project page to integrating developer webhooks, the platform was incredibly responsive. Best crowdfunding experience by far.",
    author: "Dr. Elena Rostova",
    role: "Robotics Engineer, AeroPlant",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80",
    raised: "$142,500 Raised",
    rating: 5
  },
  {
    quote: "The continuous vital tracking ring project reached over 4,000 backers within 2 weeks! The automated backer updates and dashboard made management effortless.",
    author: "Alex Rivera",
    role: "CTO, NEXUS Health Labs",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80",
    raised: "$389,000 Raised",
    rating: 5
  },
  {
    quote: "Deploying off-grid solar water stations was a dream that became reality on FundPulse. Community backers from 45 countries joined forces with us.",
    author: "Amara Okezie",
    role: "Director, Clean Waters Initiative",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80",
    raised: "$67,800 Raised",
    rating: 5
  }
];

const TestimonialsSection = () => {
  return (
    <section className="py-20 md:py-28 relative bg-slate-950 overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/2 left-10 w-96 h-96 bg-indigo-500/5 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-96 h-96 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto space-y-4 mb-14">
          <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
            Creator & Backer Feedback
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
            Loved by <span className="gradient-text">Innovators Worldwide</span>
          </h2>
          <p className="text-base text-slate-400">
            See how visionary creators transformed their concepts into thriving enterprises with community support.
          </p>
        </div>

        {/* Swiper Testimonials Slider */}
        <div className="relative">
          <Swiper
            modules={[Autoplay, Pagination, Navigation]}
            loop={true}
            speed={600}
            autoplay={{
              delay: 5000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true
            }}
            pagination={{
              clickable: true,
              el: '.testimonial-swiper-pagination',
              bulletActiveClass: '!bg-emerald-400 !w-6',
              bulletClass: 'inline-block h-2 w-2 rounded-full bg-slate-700 transition-all duration-300 cursor-pointer mx-1'
            }}
            navigation={{
              nextEl: '.testimonial-next-btn',
              prevEl: '.testimonial-prev-btn',
            }}
            breakpoints={{
              640: { slidesPerView: 1, spaceBetween: 24 },
              768: { slidesPerView: 2, spaceBetween: 24 },
              1024: { slidesPerView: 3, spaceBetween: 30 }
            }}
            className="w-full py-4 px-1"
          >
            {TESTIMONIALS.map((t, idx) => (
              <SwiperSlide key={idx} className="h-full">
                <div className="relative flex flex-col justify-between h-full rounded-3xl border border-slate-800 bg-slate-900/60 p-8 backdrop-blur-md transition-all duration-300 hover:border-slate-700 hover:bg-slate-900 shadow-xl">
                  
                  <div>
                    {/* Stars & Quote Icon */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="flex items-center gap-1">
                        {[...Array(t.rating)].map((_, i) => (
                          <Star key={i} className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ))}
                      </div>
                      <Quote className="h-7 w-7 text-indigo-400/40" />
                    </div>

                    {/* Quote Text */}
                    <p className="text-sm text-slate-300 leading-relaxed italic mb-6">
                      &quot;{t.quote}&quot;
                    </p>
                  </div>

                  {/* Author Card Footer */}
                  <div className="flex items-center justify-between pt-4 border-t border-slate-800/80 mt-auto">
                    <div className="flex items-center gap-3">
                      <img
                        src={t.avatar}
                        alt={t.author}
                        className="h-10 w-10 rounded-full object-cover ring-2 ring-indigo-500/30"
                      />
                      <div>
                        <div className="text-sm font-bold text-white">{t.author}</div>
                        <div className="text-xs text-slate-400">{t.role}</div>
                      </div>
                    </div>

                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-[11px] font-semibold text-emerald-400 border border-emerald-500/20 whitespace-nowrap">
                      {t.raised}
                    </span>
                  </div>

                </div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* Slider Controls */}
          <div className="flex items-center justify-between mt-8 pt-4">
            <div className="flex items-center gap-3">
              <button 
                className="testimonial-prev-btn flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition"
                aria-label="Previous Testimonial"
              >
                <ChevronLeft className="h-4 w-4" />
              </button>
              <button 
                className="testimonial-next-btn flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:border-emerald-500 hover:text-emerald-400 transition"
                aria-label="Next Testimonial"
              >
                <ChevronRight className="h-4 w-4" />
              </button>
            </div>

            <div className="testimonial-swiper-pagination flex items-center"></div>

            <span className="text-xs text-slate-500">
              Verified Creator Reviews
            </span>
          </div>

        </div>

      </div>
    </section>
  );
};

export default TestimonialsSection;

