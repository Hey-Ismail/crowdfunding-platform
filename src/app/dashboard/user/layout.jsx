import UserSidebar from '@/components/UserSidebar';

const UserDashboardLayout = ({ children }) => {
  return (
    <div className="flex min-h-screen bg-slate-950">
      <UserSidebar />
      <main className="flex-1 overflow-y-auto">
        {children}
      </main>
    </div>
  );
};

export default UserDashboardLayout;
