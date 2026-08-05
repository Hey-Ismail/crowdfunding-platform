'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [role, setRole] = useState('backer'); // 'backer' | 'creator'
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (isSuccess) {
      const t = setTimeout(() => router.push('/login'), 1500);
      return () => clearTimeout(t);
    }
  }, [isSuccess, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }
    setIsLoading(true);
    setError(null);

    try {
      const { data, error } = await signUp.email({
        email,
        password,
        name: email.split('@')[0],
      });

      if (error) {
        console.error('signUp returned error:', error);
        const message = error?.message || error?.status || error?.reason || (typeof error === 'string' ? error : null) || JSON.stringify(error) || 'Unable to create account. Please try again.';
        setError(message);
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('signUp threw exception:', err);
      const message = err?.message || (typeof err === 'string' ? err : null) || JSON.stringify(err) || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
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
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-mesh-radial">

      {/* Ambient Neon Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[550px] h-[550px] bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-100 h-100 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

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
              Create Your <span className="gradient-emerald-text drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">Account</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Join thousands of backers and creators worldwide.
            </p>
          </div>
        </div>

        {/* Glowing Glass Card */}
        <div className="rounded-3xl border border-emerald-500/20 bg-slate-900/70 p-8 sm:p-10 shadow-2xl shadow-emerald-500/10 backdrop-blur-xl space-y-6">

          {isSuccess ? (
            <div className="py-8 text-center space-y-4">
              <h3 className="text-xl font-bold text-white">Welcome to FundPulse!</h3>
              <p className="text-xs text-slate-300">
                Your account has been created successfully. Redirecting you to the sign in page...
              </p>
              <Link
                href="/login"
                className="mt-4 inline-flex items-center justify-center rounded-xl bg-linear-to-r from-emerald-400 to-teal-400 px-6 py-3 text-xs font-bold text-slate-950 hover:opacity-90 transition shadow-lg shadow-emerald-500/30"
              >
                Go to Login
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
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${role === 'backer'
                      ? 'bg-linear-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
                      : 'text-slate-400 hover:text-white'
                      }`}
                  >
                    Backer / Supporter
                  </button>
                  <button
                    type="button"
                    onClick={() => setRole('creator')}
                    className={`py-2.5 rounded-xl text-xs font-semibold transition-all ${role === 'creator'
                      ? 'bg-linear-to-r from-emerald-400 to-teal-400 text-slate-950 font-bold shadow-md shadow-emerald-500/20'
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
                  or register with email
                </span>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">

                {error && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-medium text-rose-300">
                    {error}
                  </div>
                )}

                {/* Email Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Email Address
                  </label>
                  <input
                    type="email"
                    required
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-slate-800 bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-500 focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 transition"
                  />
                </div>

                {/* Password Field */}
                <div className="space-y-2">
                  <label className="block text-xs font-semibold text-slate-300">
                    Password
                  </label>
                  <div className="relative">
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required
                      placeholder="At least 8 characters"
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

                {/* Glowing Submit Button */}
                <button
                  type="submit"
                  disabled={isLoading || !agreeTerms}
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 p-0.5 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 active:scale-[0.99] disabled:opacity-50"
                >
                  <span className="block w-full rounded-[11px] bg-slate-950 px-6 py-3.5 text-center text-sm font-bold text-emerald-400 group-hover:bg-transparent group-hover:text-slate-950 transition duration-300">
                    {isLoading ? 'Creating Account...' : 'Create Account'}
                  </span>
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