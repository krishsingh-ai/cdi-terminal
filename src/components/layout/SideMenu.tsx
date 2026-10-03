import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Clock, TrendingUp, Shield, LogOut, ArrowRight, BarChart2, Compass, BookOpen, Info } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import { useGreeting } from '../../hooks/useGreeting';
import { cn } from '../../utils/cn';
import { getUserInitials } from '../../utils/initials';

export const SideMenu: React.FC = () => {
  const {
    session,
    logout,
    isSideMenuOpen,
    setIsSideMenuOpen,
    setIsAdminPanelOpen,
    tickers,
    flashingSymbol,
  } = useAuth();
  const greeting = useGreeting();
  const [currentTime, setCurrentTime] = useState<Date>(new Date());

  // Live clock updating every second
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  if (!isSideMenuOpen) {
    return null;
  }

  const displayName = session?.role === 'admin' ? 'Admin' : (session?.name || 'Operator');

  const handleAdminControlClick = () => {
    setIsSideMenuOpen(false);
    setIsAdminPanelOpen(true);
  };

  const handleLinkClick = () => {
    setIsSideMenuOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-50 flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsSideMenuOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs transition-opacity"
        />

        {/* Slide-in Drawer */}
        <motion.aside
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'tween', duration: 0.25, ease: 'easeOut' }}
          className="relative z-10 w-84 md:w-96 h-full border-l border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] text-[#111827] dark:text-[#F9FAFB] shadow-2xl flex flex-col justify-between overflow-y-auto"
        >
          {/* Top & Content Section */}
          <div className="p-6 space-y-6">
            {/* Header & Close */}
            <div className="flex items-center justify-between pb-4 border-b border-[#E5E7EB] dark:border-[#27272A]">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-zinc-100 dark:bg-zinc-800 flex items-center justify-center font-bold text-sm text-[#1E3A8A] dark:text-[#3B82F6] font-mono">
                  {session?.role === 'admin' ? 'A' : getUserInitials(session?.name || '')}
                </div>
                <div>
                  <h3 className="font-semibold text-sm leading-tight">{displayName}</h3>
                  <span className="text-[11px] font-mono text-zinc-500 uppercase tracking-wider">
                    {session?.role === 'admin' ? 'Institutional Admin' : 'Trading Desk Operator'}
                  </span>
                </div>
              </div>

              <button
                onClick={() => setIsSideMenuOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close menu"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Time-Based Greeting */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#09090B] space-y-1">
              <span className="text-[11px] text-zinc-500 dark:text-zinc-400 font-mono uppercase tracking-wider">
                Session Status
              </span>
              <p className="text-base font-semibold text-[#111827] dark:text-[#F9FAFB]">
                {greeting}, {displayName}.
              </p>
              <div className="flex items-center gap-1.5 pt-1 text-xs text-zinc-500 dark:text-zinc-400 font-mono">
                <Clock className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
                <span>{format(currentTime, 'HH:mm:ss')} (IST)</span>
              </div>
            </div>

            {/* Live Gold Ticker */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#09090B] space-y-3">
              <div className="flex items-center justify-between text-xs text-zinc-500 dark:text-zinc-400">
                <span className="inline-flex items-center gap-1.5 font-medium">
                  <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
                  Sample Gold Feed (MCX Specifications)
                </span>
                <span className="inline-flex items-center gap-1 text-[10px] font-mono text-emerald-600 dark:text-emerald-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  Simulated 5s Tick
                </span>
              </div>

              <div className="space-y-2">
                {tickers.map((t) => {
                  const isFlashing = flashingSymbol?.symbol === t.symbol;
                  const isPositive = t.changePercent >= 0;

                  return (
                    <div
                      key={t.symbol}
                      className={cn(
                        'flex items-center justify-between py-1.5 px-2 rounded-lg text-xs transition-colors duration-300 font-mono',
                        isFlashing
                          ? flashingSymbol.direction === 'up'
                            ? 'bg-emerald-50 dark:bg-emerald-950/40'
                            : 'bg-rose-50 dark:bg-rose-950/40'
                          : 'bg-white/70 dark:bg-[#18181B]/70 border border-[#E5E7EB]/50 dark:border-[#27272A]/50'
                      )}
                    >
                      <div>
                        <span className="font-semibold text-zinc-800 dark:text-zinc-200">
                          {t.symbol}
                        </span>
                        <span className="text-[10px] text-zinc-400 block font-sans">
                          {t.name}
                        </span>
                      </div>

                      <div className="text-right">
                        <span
                          className={cn(
                            'font-bold transition-all duration-300 block',
                            isFlashing
                              ? flashingSymbol.direction === 'up'
                                ? 'text-emerald-600 dark:text-emerald-400 scale-105'
                                : 'text-rose-600 dark:text-rose-400 scale-105'
                              : 'text-zinc-900 dark:text-zinc-100'
                          )}
                        >
                          ₹{t.price.toLocaleString('en-IN')}
                        </span>
                        <span
                          className={cn(
                            'text-[10px]',
                            isPositive
                              ? 'text-emerald-600 dark:text-emerald-400'
                              : 'text-rose-600 dark:text-rose-400'
                          )}
                        >
                          {isPositive ? '+' : ''}
                          {t.changePercent}%
                        </span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Middle: Navigation Shortcuts */}
            <div className="space-y-2">
              <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
                Shortcuts
              </span>
              <div className="grid grid-cols-1 gap-1.5 text-sm">
                <Link
                  to="/intelligence"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6] hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Compass className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      Pairwise Intelligence
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-[#1E3A8A] dark:group-hover:text-[#3B82F6] transition-all" />
                </Link>

                <Link
                  to="/backtest"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6] hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <BarChart2 className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      Walk-Forward Backtest
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-[#1E3A8A] dark:group-hover:text-[#3B82F6] transition-all" />
                </Link>

                <Link
                  to="/methodology"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6] hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <BookOpen className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      Methodology & Formulations
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-[#1E3A8A] dark:group-hover:text-[#3B82F6] transition-all" />
                </Link>

                <Link
                  to="/about"
                  onClick={handleLinkClick}
                  className="flex items-center justify-between p-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6] hover:bg-zinc-100/60 dark:hover:bg-zinc-800/40 transition-all group"
                >
                  <div className="flex items-center gap-2.5">
                    <Info className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                    <span className="font-medium text-zinc-800 dark:text-zinc-200">
                      About AuX Terminal
                    </span>
                  </div>
                  <ArrowRight className="w-3.5 h-3.5 text-zinc-400 group-hover:translate-x-0.5 group-hover:text-[#1E3A8A] dark:group-hover:text-[#3B82F6] transition-all" />
                </Link>
              </div>
            </div>
          </div>

          {/* Bottom Actions & Credits */}
          <div className="p-6 border-t border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30 space-y-4">
            {/* Admin Control Button: ONLY VISIBLE IF role === 'admin' */}
            {session?.role === 'admin' && (
              <button
                onClick={handleAdminControlClick}
                className="w-full py-2.5 px-4 rounded-lg bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#3B82F6] dark:hover:bg-[#2563eb] text-white font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2 shadow-sm"
              >
                <Shield className="w-4 h-4" />
                <span>Admin Surveillance Control</span>
              </button>
            )}

            {/* Logout Button */}
            <button
              onClick={logout}
              className="w-full py-2.5 px-4 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] hover:bg-red-50 dark:hover:bg-red-950/20 text-zinc-700 hover:text-red-600 dark:text-zinc-300 dark:hover:text-red-400 font-medium text-sm transition-colors cursor-pointer flex items-center justify-center gap-2"
            >
              <LogOut className="w-4 h-4" />
              <span>Terminate Session (Logout)</span>
            </button>

            {/* Made by Credits */}
            <div className="pt-2 text-center">
              <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 tracking-tight">
                Made by: Krish Raj, Ananya Tiwari, Kajal Kumari
              </span>
            </div>
          </div>
        </motion.aside>
      </div>
    </AnimatePresence>
  );
};

export default SideMenu;
