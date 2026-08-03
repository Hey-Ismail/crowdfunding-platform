'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Rocket, Mail, CheckCircle2, ArrowRight } from 'lucide-react';
import { GithubIcon, TwitterIcon, LinkedinIcon, FacebookIcon } from '@/components/BrandIcons';

const Footer = () => {
  const [email, setEmail] = useState('');
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (email.trim()) {
      setSubscribed(true);
      setEmail('');
      setTimeout(() => setSubscribed(false), 5000);
    }
  };

  return (
    <footer className="bg-slate-950 border-t border-slate-800 text-slate-400">
      
      {/* Top Footer Section */}
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12">
          
          {/* Brand Col */}
          <div className="lg:col-span-2 space-y-4">
            <Link href="/" className="flex items-center gap-3 font-semibold tracking-tight text-white">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 to-emerald-400 text-white shadow-md">
                <Rocket className="h-5 w-5 -rotate-45" />
              </div>
              <span className="text-xl font-bold tracking-tight text-white">
                Fund<span className="text-emerald-400">Pulse</span>
              </span>
            </Link>
            
            <p className="text-sm text-slate-400 max-w-sm leading-relaxed">
              Empowering global creators to launch breakthrough ideas with transparent crowdfunding, escrow protection, and community backing.
            </p>

            {/* Newsletter Subscription */}
            <div className="pt-2">
              <h4 className="text-xs font-semibold text-white uppercase tracking-wider mb-2">
                Subscribe to Weekly Digest
              </h4>
              {subscribed ? (
                <div className="flex items-center gap-2 text-sm text-emerald-400 font-medium">
                  <CheckCircle2 className="h-4 w-4" />
                  <span>Thanks for subscribing! Check your inbox soon.</span>
                </div>
              ) : (
                <form onSubmit={handleSubscribe} className="flex max-w-md gap-2">
                  <div className="relative flex-1">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="Enter your email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-900 py-2.5 pl-9 pr-3 text-xs text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none"
                    />
                  </div>
                  <button
                    type="submit"
                    className="inline-flex items-center gap-1 rounded-xl bg-emerald-500 px-4 py-2.5 text-xs font-bold text-slate-950 transition hover:bg-emerald-400 active:scale-95"
                  >
                    <span>Join</span>
                    <ArrowRight className="h-3.5 w-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Explore Platform
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/campaigns" className="hover:text-emerald-400 transition">
                  Top Campaigns
                </Link>
              </li>
              <li>
                <a href="#how-it-works" className="hover:text-emerald-400 transition">
                  How it Works
                </a>
              </li>
              <li>
                <a href="#stats" className="hover:text-emerald-400 transition">
                  Platform Impact
                </a>
              </li>
              <li>
                <Link href="/login" className="hover:text-emerald-400 transition">
                  Backer Login
                </Link>
              </li>
              <li>
                <Link href="/register" className="hover:text-emerald-400 transition">
                  Create Account
                </Link>
              </li>
            </ul>
          </div>

          {/* Categories */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Categories
            </h4>
            <ul className="space-y-2.5 text-sm">
              <li>
                <Link href="/campaigns?category=tech" className="hover:text-emerald-400 transition">
                  Tech & Artificial Intelligence
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=eco" className="hover:text-emerald-400 transition">
                  Eco & Green Innovation
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=games" className="hover:text-emerald-400 transition">
                  Indie Games & Media
                </Link>
              </li>
              <li>
                <Link href="/campaigns?category=community" className="hover:text-emerald-400 transition">
                  Community Impact
                </Link>
              </li>
            </ul>
          </div>

          {/* Developer & Social Profiles */}
          <div>
            <h4 className="text-xs font-bold text-white uppercase tracking-wider mb-4">
              Connect & Socials
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a
                  href="https://github.com"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-xl bg-slate-900 border border-slate-800 px-3 py-2 text-xs font-semibold text-slate-200 hover:border-emerald-500/50 hover:text-white transition shadow-sm"
                >
                  <GithubIcon className="h-4 w-4 text-emerald-400" />
                  <span>GitHub Repository</span>
                </a>
              </li>
              <li className="flex items-center gap-2.5 pt-2">
                <a 
                  href="https://linkedin.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition hover:scale-110 shadow-sm"
                  aria-label="LinkedIn Profile"
                  title="LinkedIn"
                >
                  <LinkedinIcon className="h-4 w-4" />
                </a>
                <a 
                  href="https://facebook.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition hover:scale-110 shadow-sm"
                  aria-label="Facebook Profile"
                  title="Facebook"
                >
                  <FacebookIcon className="h-4 w-4" />
                </a>
                <a 
                  href="https://github.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition hover:scale-110 shadow-sm"
                  aria-label="GitHub Profile"
                  title="GitHub"
                >
                  <GithubIcon className="h-4 w-4" />
                </a>
                <a 
                  href="https://x.com" 
                  target="_blank" 
                  rel="noreferrer"
                  className="flex h-9 w-9 items-center justify-center rounded-xl bg-slate-900 border border-slate-800 text-slate-400 hover:text-emerald-400 hover:border-emerald-500/50 transition hover:scale-110 shadow-sm"
                  aria-label="Twitter Profile"
                  title="Twitter (X)"
                >
                  <TwitterIcon className="h-4 w-4" />
                </a>
              </li>
            </ul>
          </div>

        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-slate-900 bg-slate-950/90 py-6">
        <div className="mx-auto flex max-w-7xl flex-col sm:flex-row items-center justify-between gap-4 px-4 sm:px-6 lg:px-8 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} FundPulse Crowdfunding Engine. All rights reserved.
          </div>
          <div className="flex items-center gap-6">
            <a href="#" className="hover:text-slate-400 transition">Privacy Policy</a>
            <a href="#" className="hover:text-slate-400 transition">Terms of Service</a>
            <a href="#" className="hover:text-slate-400 transition">Security & Escrow</a>
          </div>
        </div>
      </div>

    </footer>
  );
};

export default Footer;

