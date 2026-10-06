import React from 'react';
import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

export const Footer: React.FC = () => {
  const { setIsPrivacyModalOpen } = useAuth();

  return (
    <footer className="mt-auto border-t border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] transition-colors duration-200">
      <div className="max-w-[1400px] mx-auto px-4 sm:px-6 py-8 sm:py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Column 1: Logo & Tagline */}
          <div className="space-y-3">
            <Link to="/" className="flex items-center gap-2.5 group">
              <svg
                width="24"
                height="16"
                viewBox="0 0 26 18"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="shrink-0"
              >
                <polygon points="5,2 21,2 24,7 2,7" fill="#FBBF24" />
                <polygon points="2,7 24,7 21,16 5,16" fill="#D97706" />
                <polygon points="2,7 5,2 5,16" fill="#B45309" opacity="0.4" />
              </svg>
              <span className="font-bold text-lg tracking-tight text-[#111827] dark:text-[#F9FAFB]">
                AuX
              </span>
            </Link>
            <p className="text-sm text-zinc-500 dark:text-zinc-400 leading-relaxed">
              Institutional Gold Derivatives Intelligence.
            </p>
          </div>

          {/* Column 2: Resources */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Resources
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400">
              <li>
                <a
                  href="https://www.mcxindia.com"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] transition-colors"
                >
                  MCX India
                </a>
              </li>
              <li>
                <a
                  href="https://www.sebi.gov.in"
                  target="_blank"
                  rel="noreferrer"
                  className="hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] transition-colors"
                >
                  SEBI Guidelines
                </a>
              </li>
              <li>
                <Link
                  to="/methodology"
                  className="hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] transition-colors"
                >
                  Documentation
                </Link>
              </li>
              <li>
                <button
                  type="button"
                  onClick={() => setIsPrivacyModalOpen(true)}
                  className="hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] transition-colors cursor-pointer text-left"
                >
                  Privacy Policy
                </button>
              </li>
            </ul>
          </div>

          {/* Column 3: Tools Used */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Tools Used
            </h3>
            <ul className="space-y-2 text-sm text-zinc-600 dark:text-zinc-400 font-mono text-xs">
              <li>React</li>
              <li>Tailwind</li>
              <li>Framer Motion</li>
              <li>Recharts</li>
            </ul>
          </div>

          {/* Column 4: Made by */}
          <div className="space-y-3">
            <h3 className="text-xs font-semibold uppercase tracking-wider text-zinc-400 dark:text-zinc-500">
              Made by
            </h3>
            <ul className="space-y-2 text-sm font-semibold text-amber-600 dark:text-amber-400">
              <li>Krish Raj</li>
              <li>Ananya Tiwari</li>
              <li>Kajal Kumari</li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="mt-8 sm:mt-12 pt-6 sm:pt-8 border-t border-[#E5E7EB] dark:border-[#27272A] flex flex-col sm:flex-row items-center justify-between gap-4 text-xs">
          <p className="text-zinc-500 dark:text-zinc-500 text-center sm:text-left">
            © 2026 AuX Terminal. All rights reserved.
          </p>
          <button
            type="button"
            onClick={() => setIsPrivacyModalOpen(true)}
            className="text-zinc-500 dark:text-zinc-400 hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] hover:underline cursor-pointer transition-colors"
          >
            Privacy Policy
          </button>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
