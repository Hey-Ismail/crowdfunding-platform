'use client';

import React, { useState } from 'react';
import Link from 'next/link';

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
    setTimeout(() => {
      setIsLoading(false);
      setIsSuccess(true);
    }, 1200);
  };

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-mesh-radial">

      {/* Ambient Neon Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-[400px] h-[400px] bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md space-y-8 z-10">

        {/* Brand Header with Glowing Title */}
        <div className="text-center space-y-3">
          {/* <Link href="/" className="inline-block group">
            <span className="text-3xl font-extrabold tracking-tight text-white">
              Fund<span className="text-emerald-400">Pulse</span>
            </span>
          </Link> */}

          <div className="pt-1 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Sign In to <span className="gradient-emerald-text drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">FundPulse</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Welcome back! Please enter your details below.
            </p>
          </div>
        </div>

        {/* Glowing Glass Card */}
        <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/70 p-8 sm:p-10 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl space-y-6">

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Signed in successfully!</h3>
              <p className="text-xs text-slate-300">
                Redirecting you to the platform campaigns portal...
              </p>
              <Link
                href="/campaigns"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-gradient-to-r from-emerald-400 to-teal-400 px-6 py-3 text-xs font-bold text-slate-950 hover:opacity-90 transition shadow-lg shadow-emerald-500/30"
              >
                Go to Campaigns
              </Link>
            </div>
          ) : (
            <>
              {/* Social Login Buttons */}
              <div className="grid grid-cols-2 gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                  }}
                  className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                >
                  GitHub
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setIsLoading(true);
                    setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                  }}
                  className="flex items-center justify-center rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 hover:text-white"
                >
                  Google
                </button>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-slate-800"></div>
                <span className="absolute bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  or sign in with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="user@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 transition"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-semibold text-slate-300">
                      Password
                    </label>
                    <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 transition font-medium">
                      Forgot password?
                    </a>
                  </div>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 pr-16 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 transition"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-medium"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                </div>

                {/* Remember Me */}
                <div className="flex items-center justify-between pt-1">
                  <label className="flex items-center gap-2.5 cursor-pointer text-xs text-slate-300">
                    <input
                      type="checkbox"
                      checked={rememberMe}
                      onChange={(e) => setRememberMe(e.target.checked)}
                      className="h-4 w-4 rounded border-slate-700 bg-slate-950 text-emerald-500 focus:ring-emerald-500"
                    />
                    <span>Remember me for 30 days</span>
                  </label>
                </div>

                {/* Glowing Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 p-0.5 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 active:scale-[0.99] disabled:opacity-70"
                >
                  <span className="block w-full rounded-[11px] bg-slate-950 px-6 py-3.5 text-center text-sm font-bold text-emerald-400 group-hover:bg-transparent group-hover:text-slate-950 transition duration-300">
                    {isLoading ? 'Signing In...' : 'Sign In to Account'}
                  </span>
                </button>

              </form>
            </>
          )}

        </div>

        {/* Footer Link to Register */}
        <p className="text-center text-xs text-slate-400">
          Don&apos;t have an account?{' '}
          <Link href="/register" className="font-bold text-emerald-400 hover:text-emerald-300 transition">
            Create an account
          </Link>
        </p>

      </div>
    </div>
  );
}
