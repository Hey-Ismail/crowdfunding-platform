'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Rocket, User, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';

export default function RegisterPage() {
  const [role, setRole] = useState('backer'); // 'backer' | 'creator'
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!agreeTerms) return;
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: 'None', width: '0%', color: 'bg-slate-800' };
    if (password.length < 6) return { label: 'Weak', width: '33%', color: 'bg-rose-500' };
    if (password.length < 10) return { label: 'Good', width: '66%', color: 'bg-amber-400' };
    return { label: 'Strong', width: '100%', color: 'bg-emerald-400' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      
      {/* Subtle Background Glows */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md space-y-8 z-10">
        
        {/* Brand Header */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-3 group">
            <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-xl shadow-indigo-500/25 group-hover:scale-105 transition duration-300">
              <Rocket className="h-6 w-6 -rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Fund<span className="text-emerald-400">Pulse</span>
            </span>
          </Link>

          <div className="pt-1">
            <h1 className="text-2xl sm:text-3xl font-extrabold text-white tracking-tight">
              Create Account
            </h1>
            <p className="text-sm text-slate-400 mt-1">
              Join thousands of backers and creators worldwide.
            </p>
          </div>
        </div>

        {/* Fresh Clean Card */}
        <div className="rounded-3xl border border-slate-800 bg-slate-900/70 p-8 sm:p-10 shadow-2xl shadow-black/50 backdrop-blur-xl space-y-6">
          
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Welcome to FundPulse!</h3>
              <p className="text-xs text-slate-300">
                Your account has been created successfully.
              </p>
              <Link 
                href="/campaigns"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-3 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition shadow-lg shadow-emerald-500/25"
              >
                Explore Campaigns
              </Link>
            </div>
          ) : (
            <>
              {/* Role Switcher Pills */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300 mb-1">
                  Account Type
                </label>
                <div className="grid grid-cols-2 gap-2 rounded-2xl bg-slate-950 border border-slate-800 p-1.5">
                  <button
                    type="button"
                    onClick={() => setRole('backer')}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      role === 'backer'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Backer / Supporter
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('creator')}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${
                      role === 'creator'
                        ? 'bg-gradient-to-r from-emerald-500 to-teal-400 text-slate-950 font-bold shadow-md'
                        : 'text-slate-400 hover:text-white'
                    }`}
                  >
                    Project Creator
                  </button>
                </div>
              </div>

              {/* Social Sign Up */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                  }}
                  className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                >
                  <GithubIcon className="h-4 w-4 text-emerald-400" />
                  <span>GitHub</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                  }}
                  className="flex items-center justify-center gap-2.5 rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                >
                  <svg className="h-4 w-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  <span>Google</span>
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-slate-800"></div>
                <span className="absolute bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  or register with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                
                {/* Full Name Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Full Name
                  </label>
                  <div className="relative">
                    <User className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="text"
                      required
                      placeholder="John Doe"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                  </div>
                </div>

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Email Address
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type="email"
                      required
                      placeholder="john@example.com"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                  </div>
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 8 characters"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                    >
                      {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                    </button>
                  </div>

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Strength</span>
                        <span className="font-semibold text-slate-200">{strength.label}</span>
                      </div>
                      <div className="h-1.5 w-full rounded-full bg-slate-950 overflow-hidden border border-slate-800">
                        <div className={`h-full rounded-full transition-all duration-300 ${strength.color}`} style={{ width: strength.width }}></div>
                      </div>
                    </div>
                  )}
                </div>

                {/* Terms Agreement Checkbox */}
                <div className="pt-1">
                  <label className="flex items-start gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      required
                      checked={agreeTerms}
                      onChange={(e) => setAgreeTerms(e.target.checked)}
                      className="mt-0.5 h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>
                      I agree to the{' '}
                      <a href="#" className="text-emerald-400 hover:underline">Terms of Service</a>{' '}
                      and{' '}
                      <a href="#" className="text-emerald-400 hover:underline">Privacy Policy</a>.
                    </span>
                  </label>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !agreeTerms}
                  className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 via-teal-400 to-indigo-500 py-3.5 text-sm font-bold text-slate-950 shadow-xl shadow-emerald-500/20 transition hover:opacity-95 active:scale-[0.99] disabled:opacity-50"
                >
                  {isLoading ? (
                    <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                  ) : (
                    <>
                      <span>Create Account</span>
                      <ArrowRight className="h-4 w-4" />
                    </>
                  )}
                </button>

              </form>
            </>
          )}

        </div>

        {/* Footer Switch to Login */}
        <p className="text-center text-xs text-slate-400">
          Already have an account?{' '}
          <Link href="/login" className="font-bold text-emerald-400 hover:text-emerald-300 transition">
            Sign in
          </Link>
        </p>

      </div>
    </div>
  );
}
