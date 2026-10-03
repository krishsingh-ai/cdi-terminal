import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, Loader2, AlertCircle, User, Lock } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';

export const AuthModal: React.FC = () => {
  const { session, login, consent } = useAuth();

  const [activeTab, setActiveTab] = useState<'user' | 'admin'>('user');
  const [name, setName] = useState('');
  const [adminUsername, setAdminUsername] = useState('');
  const [adminPassword, setAdminPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  // If already logged in, do not render modal
  if (session) {
    return null;
  }

  // On first visit, show the consent banner first; show login modal once dismissed
  if (consent === null) {
    return null;
  }

  const handleTabChange = (tab: 'user' | 'admin') => {
    setActiveTab(tab);
    setError(null);
  };

  const handleUserSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      setError('Please enter your name to initialize terminal access.');
      return;
    }
    setError(null);
    login(name.trim(), 'user');
  };

  const handleAdminSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!adminUsername.trim() || !adminPassword.trim()) {
      setError('Username and password are required.');
      return;
    }

    if (adminUsername.trim() !== 'admin' || adminPassword !== 'admin123') {
      setError('Invalid administrative credentials. Access denied.');
      return;
    }

    setError(null);
    setIsLoading(true);

    // Fake 1.5-second loading spinner to simulate institutional server check
    setTimeout(() => {
      setIsLoading(false);
      login('Admin', 'admin');
    }, 1500);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Unescapable backdrop: clicking does nothing */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/70 backdrop-blur-md"
        />

        {/* Modal Card */}
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 15 }}
          transition={{ duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-md rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] p-8 shadow-2xl text-[#111827] dark:text-[#F9FAFB]"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header & Logo */}
          <div className="text-center space-y-2">
            <div className="inline-flex items-center justify-center gap-2">
              <svg
                width="28"
                height="19"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <polygon points="5,2 21,2 24,7 2,7" fill="#FBBF24" />
                <polygon points="2,7 24,7 21,16 5,16" fill="#D97706" />
                <polygon points="2,7 5,2 5,16" fill="#B45309" opacity="0.4" />
              </svg>
              <span className="font-bold text-2xl tracking-tight font-sans">AuX</span>
            </div>
            <h2 className="text-base font-semibold tracking-tight">
              Institutional Clearance Required
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Please initialize your session to access commodity derivatives intelligence.
            </p>
          </div>

          {/* Tab Selector: [User] and [Admin] */}
          <div className="mt-6 flex border-b border-[#E5E7EB] dark:border-[#27272A]">
            <button
              type="button"
              onClick={() => handleTabChange('user')}
              disabled={isLoading}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium transition-colors relative cursor-pointer',
                activeTab === 'user'
                  ? 'text-[#1E3A8A] dark:text-[#3B82F6] font-semibold'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                <User className="w-3.5 h-3.5" />
                User
              </span>
              {activeTab === 'user' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E3A8A] dark:bg-[#3B82F6]" />
              )}
            </button>

            <button
              type="button"
              onClick={() => handleTabChange('admin')}
              disabled={isLoading}
              className={cn(
                'flex-1 py-2.5 text-sm font-medium transition-colors relative cursor-pointer',
                activeTab === 'admin'
                  ? 'text-[#1E3A8A] dark:text-[#3B82F6] font-semibold'
                  : 'text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200'
              )}
            >
              <span className="inline-flex items-center gap-1.5">
                <Shield className="w-3.5 h-3.5" />
                Admin
              </span>
              {activeTab === 'admin' && (
                <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E3A8A] dark:bg-[#3B82F6]" />
              )}
            </button>
          </div>

          {/* Error Message */}
          {error && (
            <div className="mt-4 p-3 rounded-lg border border-red-200 dark:border-red-900/50 bg-red-50 dark:bg-red-950/30 text-red-600 dark:text-red-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Form Content */}
          <div className="mt-6">
            {activeTab === 'user' ? (
              <form onSubmit={handleUserSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="user-name" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Operator / Trader Name
                  </label>
                  <input
                    id="user-name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Krish Raj"
                    autoFocus
                    className="w-full px-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50 dark:bg-[#09090B] text-sm text-[#111827] dark:text-[#F9FAFB] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#3B82F6] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-2.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#3B82F6] dark:hover:bg-[#2563eb] text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
                >
                  Initialize Session
                </button>
              </form>
            ) : (
              <form onSubmit={handleAdminSubmit} className="space-y-4">
                <div className="space-y-1.5">
                  <label htmlFor="admin-user" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Admin Username
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                    <input
                      id="admin-user"
                      type="text"
                      value={adminUsername}
                      onChange={(e) => setAdminUsername(e.target.value)}
                      placeholder="admin"
                      disabled={isLoading}
                      autoFocus
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50 dark:bg-[#09090B] text-sm text-[#111827] dark:text-[#F9FAFB] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#3B82F6] transition-all disabled:opacity-50"
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label htmlFor="admin-pass" className="text-xs font-medium text-zinc-600 dark:text-zinc-400">
                    Security Key
                  </label>
                  <div className="relative">
                    <Lock className="w-4 h-4 absolute left-3 top-3 text-zinc-400" />
                    <input
                      id="admin-pass"
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="••••••••"
                      disabled={isLoading}
                      className="w-full pl-9 pr-3.5 py-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50 dark:bg-[#09090B] text-sm text-[#111827] dark:text-[#F9FAFB] placeholder:text-zinc-400 focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#3B82F6] transition-all disabled:opacity-50 font-mono"
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full py-2.5 rounded-lg bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#3B82F6] dark:hover:bg-[#2563eb] text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm disabled:opacity-75 disabled:cursor-not-allowed"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-4 h-4 animate-spin" />
                      <span>Verifying Institutional Clearance...</span>
                    </>
                  ) : (
                    <span>Authenticate Console</span>
                  )}
                </button>
              </form>
            )}
          </div>

          <div className="mt-6 pt-4 border-t border-[#E5E7EB] dark:border-[#27272A] text-center">
            <span className="text-[11px] text-zinc-400 font-mono">
              Session snapshot active upon authentication
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AuthModal;
