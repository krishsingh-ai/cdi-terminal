import React from 'react';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

interface LayoutProps {
  children?: React.ReactNode;
}

export const Layout: React.FC<LayoutProps> = ({ children }) => {
  const { session, consent } = useAuth();

  return (
    <div
      className={cn(
        'min-h-screen flex flex-col bg-white dark:bg-[#09090B] text-[#111827] dark:text-[#F9FAFB] transition-all duration-300',
        !session && consent !== null && 'filter blur-sm pointer-events-none select-none'
      )}
    >
      <Header />
      <main className="flex-1 max-w-[1400px] w-full mx-auto px-6 py-8">
        {children ?? <Outlet />}
      </main>
      <Footer />
    </div>
  );
};

export default Layout;
