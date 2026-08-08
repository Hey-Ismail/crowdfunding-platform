'use client';

import { DashboardSidebar } from '@/components';
import { usePathname, useRouter } from 'next/navigation';
import { useSession } from '@/lib/auth-client';
import { useEffect } from 'react';

const DashboardLayout = ({ children }) => {
    const pathname = usePathname();
    const router = useRouter();
    const { data: session, isPending } = useSession();

    const isUserDashboard = pathname?.startsWith('/dashboard/user');
    const userRole = session?.user?.role || 'supporter';

    useEffect(() => {
        if (!isPending && session?.user) {
            if (userRole === 'supporter' && !isUserDashboard) {
                router.push('/dashboard/user');
            } else if (userRole === 'creator' && isUserDashboard) {
                router.push('/dashboard');
            }
        }
    }, [session, isPending, pathname, userRole, router]);

    if (isPending) {
        return (
            <div className="flex min-h-screen bg-slate-950 items-center justify-center">
                <div className="flex flex-col items-center gap-3">
                    <div className="h-8 w-8 animate-spin rounded-full border-4 border-slate-800 border-t-emerald-500"></div>
                    <p className="text-sm font-medium text-slate-400">Loading your dashboard...</p>
                </div>
            </div>
        );
    }

    // For the supporter dashboard, we don't want to render the creator layout wrapper
    // because /dashboard/user/layout.jsx already provides the UserSidebar and main content area.
    if (isUserDashboard) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-slate-950">
            <DashboardSidebar />
            <main className="flex-1 overflow-y-auto">
                {children}
            </main>
        </div>
    );
};

export default DashboardLayout;