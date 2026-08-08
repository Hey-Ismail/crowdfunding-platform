'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import {
  Rocket,
  Home,
  Compass,
  Heart,
  Sparkles,
  Receipt,
  LogOut,
  ChevronLeft,
  ChevronRight,
  Shield,
} from 'lucide-react';
import { authClient, useSession } from '@/lib/auth-client';

const UserSidebar = () => {
  const pathname = usePathname();
  const router = useRouter();
  const { data: session, isPending } = useSession();
  const user = session?.user;

  const [collapsed, setCollapsed] = useState(false);

  const handleSignout = async () => {
    await authClient.signOut({
      fetchOptions: {
        onSuccess: () => {
          router.push('/login');
        },
      },
    });
  };

  const navItems = [
    {
      href: '/dashboard/user',
      icon: Home,
      label: 'Home',
      exact: true,
    },
    {
      href: '/campaigns',
      icon: Compass,
      label: 'Explore Campaigns',
    },
    {
      href: '/dashboard/user/contributions',
      icon: Heart,
      label: 'My Contributions',
    },
    {
      href: '/dashboard/user/purchase-credits',
      icon: Sparkles,
      label: 'Purchase Credits',
    },
    {
      href: '/dashboard/user/payment-history',
      icon: Receipt,
      label: 'Payment History',
    },
  ];

  const isActive = (href, exact = false) => {
    if (exact) return pathname === href;
    return pathname === href || pathname.startsWith(href + '/');
  };

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
        collapsed ? 'w-[76px]' : 'w-[270px]'
      } min-h-screen`}
    >
      {/* ═══ LOGO ═══ */}
      <div className="flex items-center justify-between px-4 py-5 border-b border-slate-800/60">
        <Link
          href="/"
          className="group flex items-center gap-3 font-semibold tracking-tight text-white transition hover:opacity-90 overflow-hidden"
        >
          <div className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-gradient-to-tr from-indigo-600 via-indigo-500 to-emerald-400 text-white shadow-md shadow-indigo-500/20 group-hover:scale-105 transition-transform duration-300">
            <Rocket className="h-4 w-4 text-white transform -rotate-45 group-hover:rotate-0 transition-transform duration-300" />
          </div>
          {!collapsed && (
            <div className="flex flex-col min-w-0">
              <span className="text-lg font-bold tracking-tight text-white flex items-center gap-1.5">
                Fund<span className="text-emerald-400">Pulse</span>
                <span className="inline-block h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse"></span>
              </span>
            </div>
          )}
        </Link>

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

      {/* ═══ USER INFO ═══ */}
      <div className="px-3 pt-4 pb-3">
        <div
          className={`flex items-center rounded-xl border border-slate-800/80 bg-slate-900/60 backdrop-blur-sm ${
            collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-3'
          } transition-all duration-300`}
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            {user?.image ? (
              <img
                src={user.image}
                alt={user.name || 'User'}
                className="h-9 w-9 rounded-full border-2 border-emerald-400/50 object-cover"
              />
            ) : (
              <div className="flex h-9 w-9 items-center justify-center rounded-full bg-gradient-to-br from-indigo-500 to-emerald-400 text-[11px] font-bold text-white border-2 border-emerald-400/30">
                {isPending ? '…' : getInitials(user?.name)}
              </div>
            )}
            <span className="absolute -bottom-0.5 -right-0.5 h-2.5 w-2.5 rounded-full border-2 border-slate-950 bg-emerald-400"></span>
          </div>

          {!collapsed && (
            <div className="min-w-0 flex-1">
              <p className="text-sm font-semibold text-white truncate">
                {isPending ? 'Loading...' : user?.name || 'Guest User'}
              </p>
              <div className="flex items-center gap-1.5 mt-0.5">
                <span className="inline-flex items-center gap-1 rounded-md bg-emerald-500/10 border border-emerald-500/20 px-1.5 py-0.5 text-[10px] font-semibold text-emerald-300 uppercase tracking-wider">
                  <Shield className="h-2.5 w-2.5" />
                  Supporter
                </span>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* ═══ NAVIGATION ═══ */}
      <nav
        className="flex-1 px-3 pb-4 space-y-1"
        aria-label="User Dashboard Navigation"
      >
        {!collapsed && (
          <div className="flex items-center gap-2 px-2 mb-3 mt-1">
            <span className="text-[10px] font-bold uppercase tracking-widest text-slate-600">
              Menu
            </span>
            <div className="flex-1 h-px bg-slate-800/60"></div>
          </div>
        )}

        {navItems.map((item) => {
          const Icon = item.icon;
          const active = isActive(item.href, item.exact);

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`group relative flex items-center rounded-xl transition-all duration-200 ${
                collapsed ? 'justify-center p-2.5' : 'gap-3 px-3 py-2.5'
              } ${
                active
                  ? 'bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 shadow-sm shadow-emerald-500/5'
                  : 'text-slate-400 hover:bg-slate-800/50 hover:text-slate-200 border border-transparent'
              }`}
              title={collapsed ? item.label : undefined}
            >
              {/* Active indicator bar */}
              {active && (
                <div className="absolute left-0 top-1/2 -translate-y-1/2 h-5 w-[3px] rounded-r-full bg-emerald-400 shadow-sm shadow-emerald-400/40"></div>
              )}

              <Icon
                className={`h-[18px] w-[18px] shrink-0 transition-all duration-200 ${
                  active
                    ? 'text-emerald-400'
                    : 'text-slate-500 group-hover:text-slate-300'
                }`}
              />

              {!collapsed && (
                <span
                  className={`text-[13px] font-medium ${
                    active
                      ? 'text-emerald-300'
                      : 'text-slate-300 group-hover:text-white'
                  }`}
                >
                  {item.label}
                </span>
              )}
            </Link>
          );
        })}
      </nav>

      {/* ═══ FOOTER ═══ */}
      <div className="border-t border-slate-800/60 p-3 space-y-3">
        {/* Sign Out */}
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

        {/* Branding */}
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

export default UserSidebar;
