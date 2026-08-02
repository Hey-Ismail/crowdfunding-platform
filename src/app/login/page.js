'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Rocket, Mail, Lock, Eye, EyeOff, ArrowRight, Sparkles, CheckCircle2 } from 'lucide-react';
import { GithubIcon } from '@/components/BrandIcons';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsLoading(true);
    // Simulate auth API delay
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="relative min-h-screen pt-28 pb-16 flex items-center justify-center bg-mesh-radial px-4 sm:px-6 lg:px-8">
      
      {/* Background Ambient Glows */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-indigo-500/10 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-1/4 right-10 w-[350px] h-[350px] bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"></div>

      <div className="relative w-full max-w-md space-y-8">
        
        {/* Header Branding */}
        <div className="text-center space-y-3">
          <Link href="/" className="inline-flex items-center gap-2.5 group">
            <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-gradient-to-tr from-indigo-600 to-emerald-400 text-white shadow-lg shadow-indigo-500/20 group-hover:scale-105 transition duration-300">
              <Rocket className="h-6 w-6 -rotate-45" />
            </div>
            <span className="text-2xl font-bold tracking-tight text-white">
              Fund<span className="text-emerald-400">Pulse</span>
            </span>
          </Link>

          <div className="inline-flex items-center gap-2 rounded-full border border-indigo-500/30 bg-indigo-500/10 px-3.5 py-1 text-xs font-semibold text-indigo-300">
            <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
            <span>Welcome Back</span>
          </div>

          <h1 className="text-2xl font-extrabold text-white tracking-tight">
            Sign in to your account
          </h1>
          <p className="text-xs text-slate-400">
            Access your backed campaigns, project updates, and creator dashboard.
          </p>
        </div>

        {/* Card Container */}
        <div className="relative overflow-hidden rounded-3xl border border-slate-800 bg-slate-900/80 p-8 shadow-2xl backdrop-blur-xl">
          
          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-full bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 animate-bounce">
                <CheckCircle2 className="h-8 w-8" />
              </div>
              <h3 className="text-xl font-bold text-white">Signed in successfully!</h3>
              <p className="text-xs text-slate-400">
                Redirecting you to your account dashboard...
              </p>
              <Link 
                href="/campaigns"
                className="mt-4 inline-flex items-center justify-center gap-2 rounded-xl bg-emerald-500 px-6 py-2.5 text-xs font-bold text-slate-950 hover:bg-emerald-400 transition"
              >
                Go to Campaigns
              </Link>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5">
              
              {/* Email Input */}
              <div className="space-y-1.5">
                <label className="block text-xs font-semibold text-slate-300">
                  Email Address
                </label>
                <div className="relative">
                  <Mail className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type="email"
                    required
                    placeholder="name@company.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                  />
                </div>
              </div>

              {/* Password Input */}
              <div className="space-y-1.5">
                <div className="flex items-center justify-between">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition">
                    Forgot password?
                  </a>
                </div>
                <div className="relative">
                  <Lock className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-500" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-slate-700/80 bg-slate-950/80 py-3 pl-10 pr-10 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-1 focus:ring-emerald-500 transition"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
              </div>

              {/* Remember Me */}
              <div className="flex items-center justify-between pt-1">
                <label className="flex items-center gap-2 cursor-pointer text-xs text-slate-300">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500 focus:ring-offset-slate-900"
                  />
                  <span>Remember me for 30 days</span>
                </label>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500 to-teal-400 py-3.5 text-sm font-bold text-slate-950 shadow-lg shadow-emerald-500/25 transition hover:scale-[1.01] hover:shadow-emerald-500/40 active:scale-95 disabled:opacity-70"
              >
                {isLoading ? (
                  <div className="h-5 w-5 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></div>
                ) : (
                  <>
                    <span>Sign In</span>
                    <ArrowRight className="h-4 w-4" />
                  </>
                )}
              </button>

              {/* Divider */}
              <div className="relative my-4 flex items-center justify-center">
                <div className="w-full border-t border-slate-800"></div>
                <span className="absolute bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  Or continue with
                </span>
              </div>

              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                  }}
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/80 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
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
                  className="flex items-center justify-center gap-2 rounded-xl border border-slate-700/80 bg-slate-950/80 py-2.5 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:text-white"
                >
                  <svg className="h-4 w-4 text-rose-400" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M12.48 10.92v3.28h7.84c-.24 1.84-.853 3.187-1.787 4.133-1.147 1.147-2.933 2.4-6.053 2.4-4.827 0-8.6-3.893-8.6-8.72s3.773-8.72 8.6-8.72c2.6 0 4.507 1.027 5.907 2.347l2.307-2.307C18.747 1.44 15.907 0 12.48 0 5.867 0 .307 5.387.307 12s5.56 12 12.173 12c3.573 0 6.267-1.173 8.373-3.36 2.16-2.16 2.84-5.213 2.84-7.667 0-.76-.053-1.467-.173-2.053H12.48z"/>
                  </svg>
                  <span>Google</span>
                </button>
              </div>

            </form>
          )}

        </div>

        {/* Footer Link to Register */}
        <p className="text-center text-xs text-slate-400">
          Don't have an account yet?{' '}
          <Link href="/register" className="font-semibold text-emerald-400 hover:text-emerald-300 transition">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
