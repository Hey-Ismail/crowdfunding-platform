'use client';

import React, { useState } from 'react';
import {
  Sparkles,
  CreditCard,
  Check,
  Zap,
  Star,
  HelpCircle,
  ChevronDown,
  ShieldCheck,
} from 'lucide-react';

const packages = [
  {
    id: 'starter',
    name: 'Starter',
    fp: '500 FP',
    fpAmount: 500,
    price: '$4.99',
    unitPrice: '$0.0099 / FP',
    description: 'Perfect for quick contributions to individual project goals.',
    badge: null,
    features: [
      '500 FP added instantly',
      'Back any active campaign',
      'Standard support',
    ],
    popular: false,
  },
  {
    id: 'popular',
    name: 'Popular',
    fp: '1,500 FP',
    fpAmount: 1500,
    price: '$12.99',
    unitPrice: '$0.0086 / FP',
    description: 'Our most selected package for active community supporters.',
    badge: 'Most Popular',
    features: [
      '1,500 FP + 100 Bonus FP',
      'Back unlimited campaigns',
      'Early access to new launches',
      'Supporter badge on profile',
    ],
    popular: true,
  },
  {
    id: 'pro',
    name: 'Pro',
    fp: '5,000 FP',
    fpAmount: 5000,
    price: '$39.99',
    unitPrice: '$0.0079 / FP',
    description: 'Ideal for power backers looking for maximum campaign impact.',
    badge: 'Best Value',
    features: [
      '5,000 FP + 500 Bonus FP',
      'Priority campaign backing',
      'Exclusive creator updates',
      'Dedicated support',
    ],
    popular: false,
  },
  {
    id: 'enterprise',
    name: 'Enterprise',
    fp: '15,000 FP',
    fpAmount: 15000,
    price: '$99.99',
    unitPrice: '$0.0066 / FP',
    description: 'Designed for institutions, organizations, and major backers.',
    badge: null,
    features: [
      '15,000 FP + 2,000 Bonus FP',
      'VIP Backer status & perks',
      'Custom campaign matching',
      'Direct line to platform team',
    ],
    popular: false,
  },
];

const faqs = [
  {
    question: 'What are FP credits and how do they work?',
    answer:
      'FP (FundPulse) credits are our platform utility tokens. 1 FP credit equals $0.01 in backing value. You can use FP credits to fund campaigns instantly without re-entering payment details each time.',
  },
  {
    question: 'Do FP credits expire?',
    answer:
      'No! Your purchased FP credits never expire and remain safely in your FundPulse balance until you decide to back a campaign.',
  },
  {
    question: 'Can I request a refund for unused credits?',
    answer:
      'Yes, unused FP credits purchased within the last 30 days are eligible for a full refund back to your original payment method. Contact our support team for assistance.',
  },
];

export default function PurchaseCreditsPage() {
  const [openFaq, setOpenFaq] = useState(null);
  const [selectedPkg, setSelectedPkg] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [purchasedSuccess, setPurchasedSuccess] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaq(openFaq === index ? null : index);
  };

  const handlePurchase = (pkg) => {
    setSelectedPkg(pkg);
    setPurchasing(true);
    setTimeout(() => {
      setPurchasing(false);
      setPurchasedSuccess(`Successfully purchased ${pkg.fp}! Your credits have been added.`);
      setTimeout(() => setPurchasedSuccess(null), 4000);
    }, 1200);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 p-4 md:p-8 lg:p-10 space-y-10">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4 border-b border-slate-800/80 pb-6">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold tracking-tight text-white flex items-center gap-3">
            Purchase Credits
            <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              <Zap className="w-3.5 h-3.5 mr-1" /> Instant Deposit
            </span>
          </h1>
          <p className="mt-2 text-slate-400 text-base">
            Buy FP credits to back your favorite campaigns
          </p>
        </div>
      </div>

      {/* Notification Toast if purchased */}
      {purchasedSuccess && (
        <div className="bg-emerald-950/80 border border-emerald-500/50 text-emerald-200 px-5 py-4 rounded-xl flex items-center justify-between shadow-lg shadow-emerald-950/50 animate-fade-in">
          <div className="flex items-center gap-3">
            <Check className="w-5 h-5 text-emerald-400" />
            <span>{purchasedSuccess}</span>
          </div>
          <button
            onClick={() => setPurchasedSuccess(null)}
            className="text-emerald-400 hover:text-emerald-200 text-sm font-medium"
          >
            Dismiss
          </button>
        </div>
      )}

      {/* Current Balance Card */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 md:p-8 backdrop-blur-sm relative overflow-hidden group">
        {/* Decorative gradient glow */}
        <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl group-hover:bg-emerald-500/15 transition-all duration-500" />
        <div className="absolute -left-20 -top-20 w-64 h-64 bg-indigo-500/10 rounded-full blur-3xl" />

        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
          <div className="space-y-1">
            <div className="flex items-center gap-2 text-slate-400 text-sm font-medium">
              <Sparkles className="w-4 h-4 text-emerald-400" />
              <span>Current Account Balance</span>
            </div>
            <div className="flex items-baseline gap-3 pt-1">
              <span className="text-4xl md:text-5xl font-extrabold text-white tracking-tight">
                2,450
              </span>
              <span className="text-xl md:text-2xl font-semibold text-emerald-400">
                FP credits
              </span>
            </div>
            <p className="text-xs text-slate-400 pt-1">
              Equivalent to <span className="text-slate-300 font-medium">$24.50 USD</span> backing power
            </p>
          </div>

          <div className="flex items-center gap-3 self-start md:self-auto bg-slate-800/40 p-3 rounded-xl border border-slate-700/50">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center text-emerald-400">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <p className="text-xs text-slate-300 font-medium">Secure Transactions</p>
              <p className="text-[11px] text-slate-500">256-bit encrypted checkout</p>
            </div>
          </div>
        </div>
      </div>

      {/* Credit Packages Grid */}
      <div className="space-y-4">
        <div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2">
            <CreditCard className="w-5 h-5 text-indigo-400" />
            Select Credit Package
          </h2>
          <p className="text-sm text-slate-400 mt-1">
            Choose a tier below to replenish your FP balance instantly.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {packages.map((pkg) => {
            const isPopular = pkg.popular;
            return (
              <div
                key={pkg.id}
                className={`rounded-2xl bg-slate-900/50 backdrop-blur-sm p-6 flex flex-col justify-between relative transition-all duration-300 hover:-translate-y-1 ${
                  isPopular
                    ? 'border-2 border-emerald-500/40 shadow-xl shadow-emerald-950/30'
                    : 'border border-slate-800/80 hover:border-slate-700'
                }`}
              >
                {/* Badge if present */}
                {pkg.badge && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2">
                    <span
                      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold tracking-wide ${
                        isPopular
                          ? 'bg-gradient-to-r from-emerald-500 to-teal-500 text-slate-950 shadow-md'
                          : 'bg-gradient-to-r from-indigo-500 to-purple-500 text-white shadow-md'
                      }`}
                    >
                      <Star className="w-3 h-3 fill-current" />
                      {pkg.badge}
                    </span>
                  </div>
                )}

                <div className="space-y-5 pt-2">
                  {/* Package Header */}
                  <div>
                    <h3 className="text-lg font-bold text-white">{pkg.name}</h3>
                    <div className="mt-2 flex items-baseline gap-1">
                      <span className="text-3xl font-extrabold text-white">
                        {pkg.fp}
                      </span>
                    </div>
                    <p className="text-xs text-slate-400 mt-1">{pkg.description}</p>
                  </div>

                  {/* Price */}
                  <div className="py-3 border-y border-slate-800/80">
                    <div className="flex items-baseline justify-between">
                      <span className="text-2xl font-bold text-emerald-400">
                        {pkg.price}
                      </span>
                      <span className="text-xs text-slate-400">{pkg.unitPrice}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5">
                    <p className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
                      Included Perks
                    </p>
                    <ul className="space-y-2 text-sm text-slate-300">
                      {pkg.features.map((feature, idx) => (
                        <li key={idx} className="flex items-start gap-2">
                          <Check className="w-4 h-4 text-emerald-400 shrink-0 mt-0.5" />
                          <span>{feature}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>

                {/* Action Button */}
                <div className="pt-6 mt-6 border-t border-slate-800/60">
                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={purchasing && selectedPkg?.id === pkg.id}
                    className={`w-full py-3 px-4 rounded-xl font-medium text-sm flex items-center justify-center gap-2 transition-all duration-200 shadow-md ${
                      isPopular
                        ? 'bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-semibold shadow-emerald-950/40'
                        : 'bg-emerald-600 hover:bg-emerald-500 text-white shadow-slate-950/40'
                    } disabled:opacity-50 disabled:cursor-not-allowed`}
                  >
                    {purchasing && selectedPkg?.id === pkg.id ? (
                      <>
                        <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                        <span>Processing...</span>
                      </>
                    ) : (
                      <>
                        <CreditCard className="w-4 h-4" />
                        <span>Purchase</span>
                      </>
                    )}
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* FAQ Section */}
      <div className="rounded-2xl border border-slate-800/80 bg-slate-900/50 p-6 md:p-8 space-y-6">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
            <HelpCircle className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white">Frequently Asked Questions</h2>
            <p className="text-sm text-slate-400">
              Everything you need to know about purchasing and using FP credits
            </p>
          </div>
        </div>

        <div className="space-y-3 pt-2">
          {faqs.map((faq, index) => {
            const isOpen = openFaq === index;
            return (
              <div
                key={index}
                className="rounded-xl border border-slate-800/80 bg-slate-900/80 overflow-hidden transition-colors"
              >
                <button
                  onClick={() => toggleFaq(index)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left hover:bg-slate-800/40 transition-colors"
                >
                  <span className="font-semibold text-slate-200 text-base">
                    {faq.question}
                  </span>
                  <ChevronDown
                    className={`w-5 h-5 text-slate-400 transition-transform duration-200 shrink-0 ml-4 ${
                      isOpen ? 'rotate-180 text-emerald-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-4 pt-1 text-slate-400 text-sm border-t border-slate-800/60 leading-relaxed">
                    {faq.answer}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
