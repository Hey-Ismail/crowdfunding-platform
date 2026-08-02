'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { Sparkles, Menu, X, ArrowRight, Rocket } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';

const Navbar = () => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-slate-900/90 backdrop-blur-md border-b border-slate-800/80 py-3 shadow-xl shadow-black/20' 
          : 'bg-transparent py-5'
      }`}
    >
      <div className="mx-auto flex w-full max-w-7xl items-center justify-between px-4 sm:px-6 lg:px-8">
        
        {/* Brand Logo */}
        <Link 
          href="/" 
          className="group flex items-center gap-3 font-semibold tracking-tight text-white transition hover:opacity-90"
        >
          <div className="relative flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Rocket className="h-5 w-5 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 opacity-40 blur-sm group-hover:opacity-75 transition duration-300"></div>
          </div>
          <div className="flex flex-col">
            <span className="text-xl font-bold tracking-tight text-white flex items-center gap-1.5">
              Fund<span className="text-emerald-400">Pulse</span>
              <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
            </span>
            <span className="text-[10px] tracking-wider text-slate-400 uppercase font-medium -mt-1">
              Crowdfunding Engine
            </span>
          </div>
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden items-center gap-8 lg:flex" aria-label="Primary Desktop Navigation">
          <Link 
            href="/campaigns" 
            className="text-sm font-medium text-slate-300 transition-colors hover:text-emerald-400"
          >
            Explore Campaigns
          </Link>
          <a 
            href="#how-it-works" 
            className="text-sm font-medium text-slate-300 transition-colors hover:text-emerald-400"
          >
            How it Works
          </a>
          <a 
            href="#stats" 
            className="text-sm font-medium text-slate-300 transition-colors hover:text-emerald-400"
          >
            Platform Impact
          </a>
        </nav>

        {/* Action Buttons */}
        <div className="hidden items-center gap-4 lg:flex">
          <Link 
            href="/login" 
            className="text-sm font-medium text-slate-300 transition hover:text-white px-3 py-2"
          >
            Log in
          </Link>

          <Link 
            href="/register" 
            className="inline-flex items-center gap-2 rounded-xl bg-slate-800/80 border border-slate-700 px-4 py-2.5 text-sm font-medium text-white transition-all hover:bg-slate-700 hover:border-slate-600 shadow-sm"
          >
            Sign up
          </Link>

          <a
            href="https://github.com/Hey-Ismail/crowdfunding-platform"
            target="_blank"
            rel="noreferrer"
            className="group relative inline-flex items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-emerald-500 to-teal-500 px-4 py-2.5 text-sm font-semibold text-slate-950 transition-all hover:from-emerald-400 hover:to-teal-400 hover:shadow-lg hover:shadow-emerald-500/25 active:scale-95"
          >
            <GithubIcon className="h-4 w-4" />
            <span>Developer Hub</span>
          </a>
        </div>

        {/* Mobile Menu Toggle Button */}
        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex h-10 w-10 items-center justify-center rounded-xl border border-slate-800 bg-slate-900 text-slate-300 transition hover:bg-slate-800 hover:text-white lg:hidden"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </div>

      {/* Mobile Navigation Menu Dropdown */}
      {mobileMenuOpen && (
        <div className="mt-3 mx-4 rounded-2xl border border-slate-800 bg-slate-900/95 p-5 shadow-2xl backdrop-blur-xl lg:hidden animate-in fade-in slide-in-from-top-4 duration-200">
          <nav className="flex flex-col gap-3">
            <Link 
              href="/campaigns"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
            >
              <span>Explore Campaigns</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </Link>
            <a 
              href="#how-it-works"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
            >
              <span>How it Works</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </a>
            <a 
              href="#stats"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-between rounded-xl bg-slate-800/50 px-4 py-3 text-sm font-medium text-slate-200 hover:bg-slate-800 hover:text-emerald-400"
            >
              <span>Platform Impact</span>
              <ArrowRight className="h-4 w-4 text-slate-400" />
            </a>

            <div className="my-2 h-px bg-slate-800"></div>

            <div className="grid grid-cols-2 gap-3">
              <Link 
                href="/login"
                onClick={() => setMobileMenuOpen(false)}
                className="flex justify-center rounded-xl border border-slate-700 bg-slate-800 px-4 py-3 text-sm font-medium text-white hover:bg-slate-700"
              >
                Log in
              </Link>
              <Link 
                href="/register"
                onClick={() => setMobileMenuOpen(false)}
                className="flex justify-center rounded-xl bg-emerald-500 px-4 py-3 text-sm font-semibold text-slate-950 hover:bg-emerald-400"
              >
                Register
              </Link>
            </div>

            <a
              href="https://github.com/Hey-Ismail/crowdfunding-platform"
              target="_blank"
              rel="noreferrer"
              onClick={() => setMobileMenuOpen(false)}
              className="mt-2 flex items-center justify-center gap-2 rounded-xl border border-slate-700 bg-slate-950 px-4 py-3 text-sm font-medium text-slate-300 hover:text-white"
            >
              <GithubIcon className="h-4 w-4" />
              <span>Developer GitHub</span>
            </a>
          </nav>
        </div>
      )}
    </header>
  );
};

export default Navbar;