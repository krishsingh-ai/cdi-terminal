import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Sun, Moon, User, Menu, Search } from 'lucide-react';
import { useTheme } from '../../hooks/useTheme';
import { useAuth } from '../../hooks/useAuth';
import { cn } from '../../utils/cn';
import { getUserInitials } from '../../utils/initials';

export type NavTab = string;

export const Header: React.FC = () => {
  const { theme, toggleTheme } = useTheme();
  const { session, setIsSideMenuOpen, setIsCommandOpen } = useAuth();

  const navLinks = [
    { name: 'Home', path: '/', end: true },
    { name: 'Intelligence', path: '/intelligence' },
    { name: 'Backtest', path: '/backtest' },
    { name: 'Methodology', path: '/methodology' },
    { name: 'About Us', path: '/about' },
  ];

  const handleUserButtonClick = () => {
    setIsSideMenuOpen(true);
  };

  const handleHamburgerClick = () => {
    setIsSideMenuOpen(true);
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white dark:bg-[#09090B] border-b border-[#E5E7EB] dark:border-[#27272A] transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-6 h-16 flex items-center justify-between">
        {/* Left: AuX Logo */}
        <Link
          to="/"
          className="flex items-center gap-2.5 group select-none py-1"
          aria-label="AuX Terminal Home"
        >
          {/* Minimal Geometric Gold Bar SVG */}
          <svg
            width="26"
            height="18"
            viewBox="0 0 26 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="shrink-0 transition-transform duration-150 group-hover:scale-105"
          >
            <polygon points="5,2 21,2 24,7 2,7" fill="#FBBF24" />
            <polygon points="2,7 24,7 21,16 5,16" fill="#D97706" />
            <polygon points="2,7 5,2 5,16" fill="#B45309" opacity="0.4" />
          </svg>
          <span className="font-bold text-xl tracking-tight text-[#111827] dark:text-[#F9FAFB] font-sans">
            AuX
          </span>
        </Link>

        {/* Center Navigation: 5 Tabs */}
        <nav className="hidden md:flex items-center space-x-8 h-full">
          {navLinks.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.end}
              className={({ isActive }) =>
                cn(
                  'relative h-full flex items-center text-sm font-medium transition-colors duration-150',
                  isActive
                    ? 'text-[#1E3A8A] dark:text-[#3B82F6]'
                    : 'text-zinc-500 hover:text-[#1E3A8A] dark:text-zinc-400 dark:hover:text-[#3B82F6]'
                )
              }
            >
              {({ isActive }) => (
                <>
                  <span>{item.name}</span>
                  {isActive && (
                    <span className="absolute bottom-0 left-0 right-0 h-[2px] bg-[#1E3A8A] dark:bg-[#3B82F6]" />
                  )}
                </>
              )}
            </NavLink>
          ))}
        </nav>

        {/* Right Controls: Theme Toggle, User Icon (Initials or A), Hamburger Menu */}
        <div className="flex items-center space-x-2">
          {/* Theme Toggle Button */}
          <button
            onClick={toggleTheme}
            className="p-2 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
            aria-label="Toggle theme"
            title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
          >
            {theme === 'dark' ? (
              <Sun className="w-4 h-4 text-amber-400" />
            ) : (
              <Moon className="w-4 h-4 text-zinc-600" />
            )}
          </button>

          {/* Command Palette Trigger Badge */}
          <button
            onClick={() => setIsCommandOpen(true)}
            className="hidden sm:inline-flex items-center gap-1.5 h-9 px-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50 dark:bg-[#18181B] text-zinc-600 dark:text-zinc-400 hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] hover:border-[#1E3A8A] dark:hover:border-[#3B82F6] transition-colors cursor-pointer text-xs font-mono"
            title="Open Command Palette (Ctrl+K / ⌘K)"
            aria-label="Open Command Palette"
          >
            <Search className="w-3.5 h-3.5 text-zinc-400" />
            <span className="font-semibold">
              {typeof navigator !== 'undefined' && /(Mac|iPhone|iPod|iPad)/i.test(navigator.userAgent || navigator.platform)
                ? '⌘K'
                : 'Ctrl K'}
            </span>
          </button>

          {/* User Icon Button with Role-Based Rendering */}
          <button
            onClick={handleUserButtonClick}
            className="h-9 min-w-9 px-2.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] text-zinc-700 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer flex items-center justify-center gap-1.5"
            aria-label="User Account and Session Controls"
            title={session?.name ? `Session: ${session.name} (${session.role})` : 'Terminal User'}
          >
            {session ? (
              session.role === 'admin' ? (
                <span className="font-bold text-xs text-[#1E3A8A] dark:text-[#3B82F6]">A</span>
              ) : (
                <span className="font-semibold text-xs tracking-wider font-mono">
                  {getUserInitials(session.name)}
                </span>
              )
            ) : (
              <User className="w-4 h-4" />
            )}
          </button>

          {/* Hamburger Menu Button */}
          <button
            onClick={handleHamburgerClick}
            className="p-2 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] text-zinc-600 dark:text-zinc-300 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer md:hidden"
            aria-label="Toggle Navigation Menu"
            title="Menu"
          >
            <Menu className="w-4 h-4" />
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;
