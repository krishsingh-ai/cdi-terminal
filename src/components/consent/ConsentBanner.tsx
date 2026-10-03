import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield } from 'lucide-react';
import { useAuth } from '../../hooks/useAuth';

export const ConsentBanner: React.FC = () => {
  const {
    isConsentBannerVisible,
    acceptConsent,
    declineConsent,
    isPrivacyModalOpen,
    setIsPrivacyModalOpen,
  } = useAuth();

  // Keyboard Navigation: Enter = Accept All, Escape = Decline (only when privacy modal is NOT open)
  useEffect(() => {
    if (!isConsentBannerVisible) return;

    const handleKeyDown = (e: KeyboardEvent) => {
      // Don't trigger if user is typing in an input
      const target = e.target as HTMLElement;
      if (target && ['INPUT', 'TEXTAREA', 'SELECT'].includes(target.tagName)) {
        return;
      }

      if (e.key === 'Enter') {
        e.preventDefault();
        acceptConsent();
      } else if (e.key === 'Escape' && !isPrivacyModalOpen) {
        e.preventDefault();
        declineConsent();
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isConsentBannerVisible, isPrivacyModalOpen, acceptConsent, declineConsent]);

  return (
    <AnimatePresence>
      {isConsentBannerVisible && (
        <div className="fixed bottom-6 left-0 right-0 z-40 flex justify-center px-4 pointer-events-none">
          <motion.div
            initial={{ y: 100, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 100, opacity: 0 }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            className="w-full max-w-2xl rounded-2xl border border-[#E5E7EB] dark:border-[#27272A] bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl shadow-2xl p-6 text-[#111827] dark:text-[#F9FAFB] pointer-events-auto"
            role="region"
            aria-label="Privacy and cookie consent banner"
          >
            <div className="flex flex-col sm:flex-row items-start gap-4">
              {/* Icon Container */}
              <div className="w-10 h-10 rounded-xl bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center shrink-0 text-[#1E3A8A] dark:text-[#3B82F6]">
                <Shield className="w-5 h-5" />
              </div>

              {/* Content Body */}
              <div className="flex-1 space-y-2">
                <h2 className="text-sm font-semibold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
                  We value your privacy — and your right to know.
                </h2>
                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
                  We use local storage to persist your sessions, track analytics activity, and store performance snapshots. All data stays in your browser and is never sent to external servers.
                </p>

                {/* Actions: Stacked on mobile, inline on desktop */}
                <div className="pt-2 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2">
                    <button
                      type="button"
                      onClick={acceptConsent}
                      className="px-4 py-2 rounded-lg bg-[#1E3A8A] hover:bg-[#1e40af] dark:bg-[#3B82F6] dark:hover:bg-[#2563eb] text-white text-xs font-semibold transition-colors cursor-pointer shadow-sm text-center focus:outline-none focus:ring-2 focus:ring-[#1E3A8A] dark:focus:ring-[#3B82F6]"
                    >
                      Accept All
                    </button>
                    <button
                      type="button"
                      onClick={declineConsent}
                      className="px-4 py-2 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-transparent hover:bg-zinc-100 dark:hover:bg-zinc-800 text-zinc-700 dark:text-zinc-300 text-xs font-semibold transition-colors cursor-pointer text-center focus:outline-none focus:ring-2 focus:ring-zinc-400"
                    >
                      Decline
                    </button>
                  </div>

                  <button
                    type="button"
                    onClick={() => setIsPrivacyModalOpen(true)}
                    className="text-xs text-zinc-500 dark:text-zinc-400 hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] underline underline-offset-4 cursor-pointer text-left sm:text-right transition-colors focus:outline-none"
                  >
                    Learn more
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default ConsentBanner;
