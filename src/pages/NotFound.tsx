import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import useDocumentTitle from '../hooks/useDocumentTitle';

export const NotFound: React.FC = () => {
  useDocumentTitle('404 Not Found | AuX Terminal');

  return (
    <div className="min-h-[calc(100vh-220px)] flex items-center justify-center py-12 px-4">
      <AnimateIn className="w-full max-w-md">
        <div className="flex flex-col items-center justify-center text-center p-6 sm:p-8 md:p-12 rounded-2xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-sm space-y-6">
          <div className="space-y-2">
            <span className="font-mono text-6xl sm:text-7xl md:text-8xl font-bold tracking-tight text-[#1E3A8A] dark:text-[#3B82F6] block select-none">
              404
            </span>
            <h1 className="text-xl md:text-2xl font-semibold text-[#111827] dark:text-[#F9FAFB] tracking-tight">
              Route not found on the AuX Terminal.
            </h1>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The requested page does not exist. Return to the terminal to continue your analysis.
          </p>

          <div className="pt-2">
            <Link to="/">
              <Button variant="primary" icon={<ArrowLeft className="w-4 h-4" />}>
                Return to Home
              </Button>
            </Link>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
};

export default NotFound;
