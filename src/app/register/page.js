'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { signUp } from '@/lib/auth-client';

export default function RegisterPage() {
  const router = useRouter();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [profilePicUrl, setProfilePicUrl] = useState('');
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('supporter'); // 'supporter' | 'creator'
  const [showPassword, setShowPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [fieldErrors, setFieldErrors] = useState({});

  useEffect(() => {
    if (isSuccess) {
      const t = setTimeout(() => router.push('/login'), 1500);
      return () => clearTimeout(t);
    }
  }, [isSuccess, router]);

  const validateForm = () => {
    const errors = {};
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name.trim()) {
      errors.name = 'Full Name is required.';
    }

    if (!email.trim()) {
      errors.email = 'Email address is required.';
    } else if (!emailRegex.test(email.trim())) {
      errors.email = 'Please enter a valid email format (e.g. user@example.com).';
    }

    if (profilePicUrl.trim() && !/^https?:\/\/.+/.test(profilePicUrl.trim())) {
      errors.profilePicUrl = 'Please enter a valid URL starting with http:// or https://';
    }

    if (!password) {
      errors.password = 'Password is required.';
    } else if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }

    if (!role) {
      errors.role = 'Please select a role.';
    }

    setFieldErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);

    if (!validateForm()) {
      return;
    }

    if (!agreeTerms) {
      setError('You must agree to the Terms of Service and Privacy Policy to continue.');
      return;
    }

    setIsLoading(true);

    try {
      const { data, error: signUpError } = await signUp.email({
        email: email.trim(),
        password,
        name: name.trim(),
        image: profilePicUrl.trim() || undefined,
        role
      });

      if (signUpError) {
        console.error('signUp returned error:', signUpError);
        let message = signUpError?.message || signUpError?.status || signUpError?.reason || (typeof signUpError === 'string' ? signUpError : null);
        if (!message || message.includes('APIError') || message.includes('Object')) {
          message = 'Unable to create account. Email may already exist or input is invalid.';
        }
        if (typeof message === 'string' && (message.toLowerCase().includes('exist') || message.toLowerCase().includes('already'))) {
          setFieldErrors((prev) => ({ ...prev, email: 'This email address is already registered. Please sign in or use a different email.' }));
        } else {
          setError(message);
        }
        return;
      }

      setIsSuccess(true);
    } catch (err) {
      console.error('signUp threw exception:', err);
      const message = err?.message || (typeof err === 'string' ? err : null) || 'Something went wrong. Please try again.';
      setError(message);
    } finally {
      setIsLoading(false);
    }
  };

  // Password strength calculation
  const getPasswordStrength = () => {
    if (!password) return { label: 'None', width: '0%', color: 'bg-slate-800' };
    if (password.length < 6) return { label: 'Weak (min 6 chars)', width: '33%', color: 'bg-rose-500' };
    if (password.length < 10 || !/\d/.test(password)) return { label: 'Good', width: '66%', color: 'bg-amber-400' };
    return { label: 'Strong', width: '100%', color: 'bg-emerald-400' };
  };

  const strength = getPasswordStrength();

  return (
    <div className="min-h-screen pt-32 pb-24 bg-slate-950 text-slate-100 flex flex-col justify-center items-center px-4 sm:px-6 lg:px-8 relative overflow-hidden bg-mesh-radial">

      {/* Ambient Neon Glow Spheres */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-137.5 h-137.5 bg-emerald-500/15 rounded-full blur-3xl pointer-events-none"></div>
      <div className="absolute bottom-10 right-10 w-100 h-100 bg-indigo-600/15 rounded-full blur-3xl pointer-events-none"></div>

      {/* Main Card Container */}
      <div className="relative w-full max-w-md space-y-8 z-10">

        {/* Brand Header with Glowing Title */}
        <div className="text-center space-y-3">
          <div className="pt-1 space-y-2">
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white tracking-tight">
              Create Your <span className="gradient-emerald-text drop-shadow-[0_0_20px_rgba(16,185,129,0.35)]">Account</span>
            </h1>
            <p className="text-xs sm:text-sm text-slate-400">
              Join thousands of supporters and creators worldwide.
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
              {/* Registration Method B: Social Sign Up */}
              <div className="space-y-2">
                <span className="block text-[11px] font-semibold text-slate-400 uppercase tracking-wider text-center">
                  Social Registration
                </span>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 hover:text-white cursor-pointer"
                  >
                    GitHub
                  </button>

                  <button
                    type="button"
                    onClick={() => {
                      setIsLoading(true);
                      setTimeout(() => { setIsLoading(false); setIsSuccess(true); }, 1000);
                    }}
                    className="flex items-center justify-center gap-2 rounded-xl border border-slate-800 bg-slate-950 py-3 text-xs font-semibold text-slate-200 transition hover:bg-slate-800 hover:border-slate-700 hover:text-white cursor-pointer"
                  >
                    Google
                  </button>
                </div>
              </div>

              {/* Divider */}
              <div className="relative flex items-center justify-center py-2">
                <div className="w-full border-t border-slate-800"></div>
                <span className="absolute bg-slate-900 px-3 text-[11px] font-semibold text-slate-500 uppercase tracking-wider">
                  or register with form
                </span>
              </div>

              {/* Registration Method A: Form with Input Fields */}
              <form onSubmit={handleSubmit} className="space-y-4" noValidate>

                {error && (
                  <div className="rounded-xl border border-rose-500/30 bg-rose-500/10 px-4 py-3 text-xs font-medium text-rose-300">
                    {error}
                  </div>
                )}

                {/* 1. Name Field */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-name" className="block text-xs font-semibold text-slate-300">
                    Full Name <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="reg-name"
                    type="text"
                    placeholder="e.g. Jane Doe"
                    value={name}
                    onChange={(e) => {
                      setName(e.target.value);
                      if (fieldErrors.name) setFieldErrors({ ...fieldErrors, name: null });
                    }}
                    className={`w-full rounded-xl border ${fieldErrors.name ? 'border-rose-500 focus:ring-rose-500/25' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/25'} bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition`}
                  />
                  {fieldErrors.name && (
                    <p className="text-[11px] font-medium text-rose-400">{fieldErrors.name}</p>
                  )}
                </div>

                {/* 2. Email Field */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-email" className="block text-xs font-semibold text-slate-300">
                    Email Address <span className="text-emerald-400">*</span>
                  </label>
                  <input
                    id="reg-email"
                    type="email"
                    placeholder="john@example.com"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                      if (fieldErrors.email) setFieldErrors({ ...fieldErrors, email: null });
                    }}
                    className={`w-full rounded-xl border ${fieldErrors.email ? 'border-rose-500 focus:ring-rose-500/25' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/25'} bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition`}
                  />
                  {fieldErrors.email && (
                    <p className="text-[11px] font-medium text-rose-400">{fieldErrors.email}</p>
                  )}
                </div>

                {/* 3. Profile Picture URL Field */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-avatar" className="block text-xs font-semibold text-slate-300">
                    Profile Picture URL <span className="text-slate-500 font-normal">(Optional)</span>
                  </label>
                  <input
                    id="reg-avatar"
                    type="url"
                    placeholder="https://example.com/avatar.jpg"
                    value={profilePicUrl}
                    onChange={(e) => {
                      setProfilePicUrl(e.target.value);
                      if (fieldErrors.profilePicUrl) setFieldErrors({ ...fieldErrors, profilePicUrl: null });
                    }}
                    className={`w-full rounded-xl border ${fieldErrors.profilePicUrl ? 'border-rose-500 focus:ring-rose-500/25' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/25'} bg-slate-950 py-3 px-4 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition`}
                  />
                  {fieldErrors.profilePicUrl && (
                    <p className="text-[11px] font-medium text-rose-400">{fieldErrors.profilePicUrl}</p>
                  )}
                </div>

                {/* 4. Role Drop-down Select */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-role" className="block text-xs font-semibold text-slate-300">
                    Account Role <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <select
                      id="reg-role"
                      value={role}
                      onChange={(e) => {
                        setRole(e.target.value);
                        if (fieldErrors.role) setFieldErrors({ ...fieldErrors, role: null });
                      }}
                      className={`w-full rounded-xl border ${fieldErrors.role ? 'border-rose-500' : 'border-slate-800'} bg-slate-950 py-3 px-4 text-sm text-white focus:border-emerald-500 focus:outline-none focus:ring-2 focus:ring-emerald-500/25 transition appearance-none cursor-pointer pr-10`}
                    >
                      <option value="supporter" className="bg-slate-900 text-white">Supporter</option>
                      <option value="creator" className="bg-slate-900 text-white">Creator</option>
                    </select>
                    <div className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-slate-400">
                      <svg className="w-4 h-4 fill-current" viewBox="0 0 20 20">
                        <path d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" />
                      </svg>
                    </div>
                  </div>
                  {fieldErrors.role && (
                    <p className="text-[11px] font-medium text-rose-400">{fieldErrors.role}</p>
                  )}
                </div>

                {/* 5. Password Field */}
                <div className="space-y-1.5">
                  <label htmlFor="reg-password" className="block text-xs font-semibold text-slate-300">
                    Password <span className="text-emerald-400">*</span>
                  </label>
                  <div className="relative">
                    <input
                      id="reg-password"
                      type={showPassword ? 'text' : 'password'}
                      placeholder="At least 6 characters"
                      value={password}
                      onChange={(e) => {
                        setPassword(e.target.value);
                        if (fieldErrors.password) setFieldErrors({ ...fieldErrors, password: null });
                      }}
                      className={`w-full rounded-xl border ${fieldErrors.password ? 'border-rose-500 focus:ring-rose-500/25' : 'border-slate-800 focus:border-emerald-500 focus:ring-emerald-500/25'} bg-slate-950 py-3 px-4 pr-16 text-sm text-white placeholder-slate-500 focus:outline-none focus:ring-2 transition`}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-4 top-1/2 -translate-y-1/2 text-xs text-slate-400 hover:text-white font-medium"
                    >
                      {showPassword ? 'Hide' : 'Show'}
                    </button>
                  </div>
                  {fieldErrors.password && (
                    <p className="text-[11px] font-medium text-rose-400">{fieldErrors.password}</p>
                  )}

                  {/* Password Strength Indicator */}
                  {password && (
                    <div className="space-y-1 pt-1">
                      <div className="flex items-center justify-between text-[10px] text-slate-400">
                        <span>Password Strength</span>
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
                  className="w-full relative group overflow-hidden rounded-xl bg-gradient-to-r from-emerald-400 via-teal-400 to-indigo-500 p-0.5 shadow-xl shadow-emerald-500/25 transition-all hover:shadow-emerald-500/40 active:scale-[0.99] disabled:opacity-50 cursor-pointer"
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