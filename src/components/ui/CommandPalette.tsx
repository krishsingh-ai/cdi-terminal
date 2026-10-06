import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Command } from 'cmdk';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Search,
  Home,
  BarChart3,
  TrendingUp,
  BookOpen,
  Users,
  Coins,
  Sun,
  Moon,
  LogOut,
} from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';
import { useTheme } from '../../hooks/useTheme';
import { goldTickerData } from '../../data/mockData';

export interface CommandPaletteProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const CommandPalette: React.FC<CommandPaletteProps> = ({
  isOpen: propIsOpen,
  onClose: propOnClose,
}) => {
  const navigate = useNavigate();
  const { theme, toggleTheme } = useTheme();
  const { logout, showToast, isCommandOpen, setIsCommandOpen } = useAuth();

  const isOpen = propIsOpen !== undefined ? propIsOpen : isCommandOpen;
  const handleClose = () => {
    if (propOnClose) {
      propOnClose();
    } else {
      setIsCommandOpen(false);
    }
  };

  const handleNavigate = (path: string) => {
    handleClose();
    navigate(path);
  };

  const handleToggleTheme = () => {
    handleClose();
    toggleTheme();
  };

  const handleLogout = () => {
    handleClose();
    logout();
  };

  const handleMarketLookup = (symbol: string) => {
    handleClose();
    const item = goldTickerData.find((t) => t.symbol === symbol);
    if (item) {
      showToast(`${item.symbol}: ₹${item.price.toLocaleString('en-IN')}.00`);
    } else {
      showToast(`${symbol}: ₹79,397.40`);
    }
  };

  const getMarketPrice = (symbol: string): string => {
    const item = goldTickerData.find((t) => t.symbol === symbol);
    return item ? `₹${item.price.toLocaleString('en-IN')}.00` : '₹79,397.40';
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center pt-[10vh] sm:pt-[15vh] px-4">
          {/* Glassmorphic backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.15 }}
            onClick={handleClose}
            className="fixed inset-0 bg-black/60 backdrop-blur-sm"
          />

          {/* Centered Modal with dark glassmorphism & 1px border */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: -10 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: -10 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-[92vw] sm:max-w-xl overflow-hidden rounded-xl border border-zinc-700/60 dark:border-zinc-800 bg-[#09090b]/85 backdrop-blur-xl shadow-2xl text-zinc-100"
            role="dialog"
            aria-modal="true"
            aria-label="Command Palette"
            onClick={(e) => e.stopPropagation()}
          >
            <Command
              label="AuX Terminal Command Palette"
              className="w-full flex flex-col font-sans"
            >
              {/* Search Bar */}
              <div className="flex items-center px-4 border-b border-zinc-800/80 bg-zinc-900/30">
                <Search className="w-4 h-4 text-zinc-400 shrink-0 mr-3" />
                <Command.Input
                  autoFocus
                  placeholder="Type a command or search..."
                  className="w-full h-12 bg-transparent text-sm text-zinc-100 placeholder:text-zinc-500 focus:outline-none"
                />
                <kbd className="hidden sm:inline-flex items-center px-1.5 py-0.5 text-[10px] font-mono text-zinc-400 bg-zinc-800/80 border border-zinc-700/60 rounded">
                  ESC
                </kbd>
              </div>

              {/* Grouped Results List */}
              <Command.List className="max-h-80 overflow-y-auto p-2 scrollbar-thin">
                <Command.Empty className="py-8 text-center text-xs text-zinc-500 font-mono">
                  No matching commands or assets found.
                </Command.Empty>

                {/* 1. Navigation Group */}
                <Command.Group
                  heading="Navigation"
                  className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-500 mb-2"
                >
                  <Command.Item
                    value="home navigation dashboard overview terminal"
                    onSelect={() => handleNavigate('/')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Home className="w-4 h-4 text-zinc-400" />
                      <span>Home</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Jump</span>
                  </Command.Item>

                  <Command.Item
                    value="intelligence pairwise spread basis volatility analytics"
                    onSelect={() => handleNavigate('/intelligence')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <BarChart3 className="w-4 h-4 text-zinc-400" />
                      <span>Intelligence</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Jump</span>
                  </Command.Item>

                  <Command.Item
                    value="backtest walk-forward equity alpha simulation"
                    onSelect={() => handleNavigate('/backtest')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <TrendingUp className="w-4 h-4 text-zinc-400" />
                      <span>Backtest</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Jump</span>
                  </Command.Item>

                  <Command.Item
                    value="methodology math purity transaction costs zero look-ahead bias"
                    onSelect={() => handleNavigate('/methodology')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <BookOpen className="w-4 h-4 text-zinc-400" />
                      <span>Methodology</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Jump</span>
                  </Command.Item>

                  <Command.Item
                    value="about us team hack in hills mission developers"
                    onSelect={() => handleNavigate('/about')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Users className="w-4 h-4 text-zinc-400" />
                      <span>About Us</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">Jump</span>
                  </Command.Item>
                </Command.Group>

                {/* 2. Market Data Group */}
                <Command.Group
                  heading="Market Data"
                  className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-500 mb-2"
                >
                  <Command.Item
                    value="goldm mcx gold mini 100g price market data"
                    onSelect={() => handleMarketLookup('GOLDM')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>GOLDM (Gold Mini 100g)</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">
                      {getMarketPrice('GOLDM')}
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="goldten mcx gold ten 10g price market data"
                    onSelect={() => handleMarketLookup('GOLDTEN')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>GOLDTEN (Gold 10g)</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">
                      {getMarketPrice('GOLDTEN')}
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="goldguinea mcx gold guinea 8g price market data"
                    onSelect={() => handleMarketLookup('GOLDGUINEA')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>GOLDGUINEA (Gold Guinea 8g)</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">
                      {getMarketPrice('GOLDGUINEA')}
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="goldpetal mcx gold petal 1g price market data"
                    onSelect={() => handleMarketLookup('GOLDPETAL')}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      <Coins className="w-4 h-4 text-amber-400" />
                      <span>GOLDPETAL (Gold Petal 1g)</span>
                    </div>
                    <span className="text-xs font-mono text-emerald-400">
                      {getMarketPrice('GOLDPETAL')}
                    </span>
                  </Command.Item>
                </Command.Group>

                {/* 3. Actions Group */}
                <Command.Group
                  heading="Actions"
                  className="[&_[cmdk-group-heading]]:px-2.5 [&_[cmdk-group-heading]]:py-1.5 [&_[cmdk-group-heading]]:text-[10px] [&_[cmdk-group-heading]]:font-mono [&_[cmdk-group-heading]]:uppercase [&_[cmdk-group-heading]]:tracking-wider [&_[cmdk-group-heading]]:text-zinc-500 mb-1"
                >
                  <Command.Item
                    value="toggle theme switch light dark mode"
                    onSelect={handleToggleTheme}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-[#1E3A8A]/30 data-[selected=true]:text-white hover:bg-[#1E3A8A]/30 hover:text-white"
                  >
                    <div className="flex items-center gap-2.5">
                      {theme === 'dark' ? (
                        <Sun className="w-4 h-4 text-amber-400" />
                      ) : (
                        <Moon className="w-4 h-4 text-blue-400" />
                      )}
                      <span>Toggle Theme</span>
                    </div>
                    <span className="text-[10px] font-mono text-zinc-500">
                      {theme === 'dark' ? 'Light Mode' : 'Dark Mode'}
                    </span>
                  </Command.Item>

                  <Command.Item
                    value="logout terminate session sign out clearance exit"
                    onSelect={handleLogout}
                    className="flex items-center justify-between px-3 py-2.5 rounded-lg text-sm text-zinc-300 transition-colors cursor-pointer data-[selected=true]:bg-rose-950/40 data-[selected=true]:text-rose-200 hover:bg-rose-950/40 hover:text-rose-200"
                  >
                    <div className="flex items-center gap-2.5">
                      <LogOut className="w-4 h-4 text-rose-400" />
                      <span className="text-rose-300">Logout</span>
                    </div>
                    <span className="text-[10px] font-mono text-rose-400">Clear Session</span>
                  </Command.Item>
                </Command.Group>
              </Command.List>

              {/* Bottom Footer with Keyboard Hints */}
              <div className="flex items-center justify-between px-3 sm:px-4 py-2 border-t border-zinc-800/80 bg-zinc-900/40 text-[10px] sm:text-[11px] font-mono text-zinc-500 overflow-x-auto">
                <div className="flex items-center gap-2 sm:gap-3 shrink-0">
                  <span>
                    <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px]">
                      ↑↓
                    </kbd>{' '}
                    navigate
                  </span>
                  <span>
                    <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px]">
                      ↵
                    </kbd>{' '}
                    select
                  </span>
                  <span>
                    <kbd className="px-1 py-0.5 rounded bg-zinc-800 border border-zinc-700 text-zinc-400 text-[10px]">
                      esc
                    </kbd>{' '}
                    close
                  </span>
                </div>
                <div className="hidden sm:flex items-center gap-1.5 text-zinc-400">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                  <span>AuX Command</span>
                </div>
              </div>
            </Command>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default CommandPalette;
