'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Rocket,
  LayoutDashboard,
  Heart,
  PlusCircle,
  Settings,
  HelpCircle,
  LogOut,
  Bell,
  ChevronLeft,
  ChevronRight,
  Wallet,
  Users,
  BarChart3,
  FolderOpen,
  Shield,
  Sparkles,
  CreditCard,
  MessageSquare,
  Bookmark,
  TrendingUp,
} from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';

const DashboardSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [collapsed, setCollapsed] = useState(false);
  const [notifications, setNotifications] = useState(3);
  const [activeSection, setActiveSection] = useState('main');

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  // Navigation sections based on routes
  const navSections = [
    {
      id: 'main',
      label: 'Main',
      items: [
        {
          href: '/dashboard',
          icon: LayoutDashboard,
          label: 'Dashboard',
          exact: true,
        },
        {
          href: '/dashboard/suppoter',
          icon: Heart,
          label: 'Supporters',
        },
        {
          href: '/dashboard/campaigns',
          icon: FolderOpen,
          label: 'My Campaigns',
        },
        {
          href: '/dashboard/analytics',
          icon: BarChart3,
          label: 'Analytics',
        },
      ],
    },
    {
      id: 'funding',
      label: 'Funding',
      items: [
        {
          href: '/dashboard/create',
          icon: PlusCircle,
          label: 'Create Campaign',
          accent: true,
        },
        {
          href: '/dashboard/wallet',
          icon: Wallet,
          label: 'Wallet',
        },
        {
          href: '/dashboard/transactions',
          icon: CreditCard,
          label: 'Transactions',
        },
        {
          href: '/dashboard/bookmarks',
          icon: Bookmark,
          label: 'Saved Campaigns',
        },
      ],
    },
    {
      id: 'community',
      label: 'Community',
      items: [
        {
          href: '/dashboard/backers',
          icon: Users,
          label: 'Backers',
        },
        {
          href: '/dashboard/messages',
          icon: MessageSquare,
          label: 'Messages',
          badge: 2,
        },
        {
          href: '/dashboard/trending',
          icon: TrendingUp,
          label: 'Trending',
        },
      ],
    },
    {
      id: 'account',
      label: 'Account',
      items: [
        {
          href: '/dashboard/settings',
          icon: Settings,
          label: 'Settings',
        },
        {
          href: '/dashboard/security',
          icon: Shield,
          label: 'Security',
        },
        {
          href: '/dashboard/help',
          icon: HelpCircle,
          label: 'Help Center',
        },
      ],
    },
  ];

  const isActive = (href, exact = false) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

  // User initials fallback
  const getInitials = (name) => {
    if (!name) return 'U';
    return name
      .split(' ')
      .map((n) => n[0])
      .join('')
      .toUpperCase()
      .slice(0, 2);
  };

  return (
    <aside
      className={`relative flex flex-col border-r border-slate-800/80 bg-slate-950 transition-all duration-300 ease-in-out ${
        collapsed ? 'w-[76px]' : 'w-[280px]'
      } min-h-screen`}
    >
      {/* ═══════════════════════════════════════════
          LOGO SECTION
      ═══════════════════════════════════════════ */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800/60">
        <Link
          href="/"
          className="group flex items-center gap-3 font-semibold tracking-tight text-white transition hover:opacity-90 overflow-hidden"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Rocket className="h-4 w-4 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
            <div className="absolute -inset-0.5 rounded-xl bg-gradient-to-tr from-indigo-500 to-emerald-400 opacity-30 blur-sm group-hover:opacity-60 transition duration-300"></div>
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Fund<span className="text-emerald-400">Pulse</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
              <span className="text-[9px] tracking-wider text-slate-500 uppercase font-medium -mt-0.5">
                Dashboard
              </span>
            </div>
          )}
        </Link>

        {/* Collapse Toggle */}
        <button
          onClick={() => setCollapsed(!collapsed)}
          className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg border border-slate-800 bg-slate-900 text-slate-400 transition-all hover:bg-slate-800 hover:text-white hover:border-slate-700 cursor-pointer"
          aria-label={collapsed ? 'Expand sidebar' : 'Collapse sidebar'}
        >
          {collapsed ? (
            <ChevronRight className="h-3.5 w-3.5" />
          ) : (
            <ChevronLeft className="h-3.5 w-3.5" />
          )}
        </button>
      </div>

      {/* ═══════════════════════════════════════════
          CREDITS BAR + USER AVATAR
      ═══════════════════════════════════════════ */}
      <div className="px-3 pt-4 pb-2">
        <div
          className={`flex items-center rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm ${
            collapsed ? 'justify-center p-2' : 'justify-between px-3 py-2.5'
          } transition-all duration-300`}
        >
          {!collapsed && (
            <div className="flex items-center gap-2 min-w-0">
              <div className="flex h-7 w-7 shrink-0 items-center justify-center rounded-lg bg-emerald-500/10 border border-emerald-500/20">
                <Sparkles className="h-3.5 w-3.5 text-emerald-400" />
              </div>
              <div className="flex flex-col min-w-0">
                <span className="text-[10px] uppercase tracking-wider text-slate-500 font-medium">
                  Available Credits
                </span>
                <span className="text-sm font-bold text-white">
                  2,450{' '}
                  <span className="text-emerald-400 text-[10px] font-semibold">
                    FP
                  </span>
                </span>
              </div>
            </div>
          )}

          {/* User Avatar */}
          <div className="relative shrink-0">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || 'User'}
                className="h-8 w-8 rounded-full border-2 border-emerald-400/50 object-cover shadow-sm shadow-emerald-500/10"
              />
            ) : (
              <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 text-[11px] font-bold text-white border-2 border-emerald-400/30 shadow-sm">
                {isPending ? '…' : getInitials(user?.name)}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400"></span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════════
          USER ROLE + NAME
      ═══════════════════════════════════════════ */}
      {!collapsed && (
        <div className="px-4 py-2">
          <div className="flex items-center gap-3">
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {isPending ? 'Loading...' : user?.name || 'Guest User'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-indigo-500/10 border border-indigo-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-indigo-300 uppercase tracking-wider">
                  <Shield className="h-2.5 w-2.5" />
                  Creator
                </span>
                <span className="text-[10px] text-slate-500">
                  {user?.email ? `• ${user.email.split('@')[0]}` : ''}
                </span>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* ═══════════════════════════════════════════
          NOTIFICATION BELL
      ═══════════════════════════════════════════ */}
      <div className="px-3 pb-3">
        <Link
          href="/dashboard/notifications"
          className={`group flex items-center rounded-xl border border-slate-800/60 bg-slate-900/40 transition-all duration-200 hover:bg-slate-800/60 hover:border-slate-700/80 ${
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
          }`}
        >
          <div className="relative shrink-0">
            <Bell className="h-4 w-4 text-slate-400 group-hover:text-emerald-400 transition-colors" />
            {notifications > 0 && (
              <span className="absolute -top-1.5 -right-1.5 flex h-4 w-4 items-center justify-center rounded-full bg-rose-500 text-[9px] font-bold text-white shadow-sm shadow-rose-500/30 animate-pulse">
                {notifications}
              </span>
            )}
          </div>
          {!collapsed && (
            <div className="flex items-center justify-between flex-1 min-w-0">
              <span className="text-xs font-medium text-slate-300 group-hover:text-white transition-colors">
                Notifications
              </span>
              {notifications > 0 && (
                <span className="text-[10px] font-semibold text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-md px-1.5 py-0.5">
                  {notifications} new
                </span>
              )}
            </div>
          )}
        </Link>
      </div>

      {/* ═══════════════════════════════════════════
          NAVIGATION — SECTIONS BASED ON ROUTES
      ═══════════════════════════════════════════ */}
      <nav
        className="flex-1 overflow-y-auto px-3 pb-4 space-y-5 scrollbar-thin scrollbar-track-transparent scrollbar-thumb-slate-800"
        aria-label="Dashboard Navigation"
      >
        {navSections.map((section) => (
          <div key={section.id}>
            {/* Section Header */}
            {!collapsed && (
              <div className="flex items-center gap-2 px-2 mb-2">
                <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
                  {section.label}
                </span>
                <div className="flex-1 h-px bg-slate-800/60"></div>
              </div>
            )}

            {/* Section collapsed separator */}
            {collapsed && section.id !== 'main' && (
              <div className="mx-auto mb-2 h-px w-6 bg-slate-800/60"></div>
            )}

            {/* Nav Items */}
            <div className="space-y-0.5">
              {section.items.map((item) => {
                const Icon = item.icon;
                const active = isActive(item.href, item.exact);

                return (
                  <Link
                    key={item.href}
                    href={item.href}
                    className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                      collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2'
                    } ${
                      active
                        ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/5'
                        : item.accent
                        ? 'text-emerald-400 hover:bg-emerald-500/5 border border-transparent hover:border-emerald-500/10'
                        : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
                    }`}
                    title={collapsed ? item.label : undefined}
                  >
                    {/* Active indicator */}
                    {active && (
                      <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-emerald-400 shadow-sm shadow-emerald-400/40"></div>
                    )}

                    <Icon
                      className={`h-4 w-4 shrink-0 transition-all duration-200 ${
                        active
                          ? 'text-emerald-400'
                          : item.accent
                          ? 'text-emerald-400 group-hover:scale-110'
                          : 'text-slate-500 group-hover:text-slate-300'
                      }`}
                    />

                    {!collapsed && (
                      <>
                        <span
                          className={`text-[13px] font-medium flex-1 ${
                            active
                              ? 'text-emerald-300'
                              : item.accent
                              ? 'text-emerald-400'
                              : 'text-slate-300 group-hover:text-white'
                          }`}
                        >
                          {item.label}
                        </span>

                        {/* Badge */}
                        {item.badge && (
                          <span className="flex h-5 min-w-5 items-center justify-center rounded-full bg-indigo-500/15 border border-indigo-500/25 px-1.5 text-[10px] font-bold text-indigo-300">
                            {item.badge}
                          </span>
                        )}
                      </>
                    )}

                    {/* Collapsed badge */}
                    {collapsed && item.badge && (
                      <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-indigo-500 text-[9px] font-bold text-white">
                        {item.badge}
                      </span>
                    )}
                  </Link>
                );
              })}
            </div>
          </div>
        ))}
      </nav>

      {/* ═══════════════════════════════════════════
          FOOTER — SIGN OUT + BRANDING
      ═══════════════════════════════════════════ */}
      <div className="border-t border-slate-800/60 p-3 space-y-3">
        {/* Sign Out Button */}
        <button
          onClick={handleSignout}
          className={`group flex w-full items-center rounded-xl border border-rose-500/15 bg-rose-500/5 transition-all duration-300 hover:bg-rose-500/10 hover:border-rose-500/30 cursor-pointer ${
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
          }`}
          title={collapsed ? 'Sign out' : undefined}
        >
          <LogOut className="h-4 w-4 text-rose-400/70 group-hover:text-rose-400 transition-colors shrink-0" />
          {!collapsed && (
            <span className="text-xs font-semibold text-rose-400/70 group-hover:text-rose-400 transition-colors">
              Sign out
            </span>
          )}
        </button>

        {/* Mini Footer Branding */}
        {!collapsed && (
          <div className="flex items-center justify-between px-1">
            <span className="text-[10px] text-slate-600">
              © {new Date().getFullYear()} FundPulse
            </span>
            <div className="flex items-center gap-1">
              <span className="h-1 w-1 rounded-full bg-emerald-500/40"></span>
              <span className="text-[9px] text-slate-600 tracking-wider uppercase">
                v1.0
              </span>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
};

export default DashboardSidebar;