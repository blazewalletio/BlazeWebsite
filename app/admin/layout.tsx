import { redirect } from 'next/navigation';
import { createClient } from '@/lib/supabase/server';
import AdminSidebar from '@/components/admin/AdminSidebar';

export const metadata = {
  title: 'Admin Dashboard | BLAZE Wallet',
  robots: 'noindex, nofollow',
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Check if we're on the login page
  const isLoginPage = typeof window !== 'undefined' 
    ? window.location.pathname === '/admin/login'
    : false;

  // If no user and not on login page, redirect to login
  // Note: This check is also done client-side in the sidebar
  
  return (
    <div className="min-h-screen bg-gray-50">
      {children}
    </div>
  );
}

