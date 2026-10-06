import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Shield, Lock, Eye, Database, Clock, Mail } from 'lucide-react';
import Button from '../ui/Button';

export interface PrivacyPolicyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const PrivacyPolicyModal: React.FC<PrivacyPolicyModalProps> = ({ isOpen, onClose }) => {
  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
    }
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-black/70 backdrop-blur-md"
          />

          {/* Modal Container (~600px wide) */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            transition={{ duration: 0.2, ease: 'easeOut' }}
            className="relative z-10 w-full max-w-xl max-h-[85vh] flex flex-col rounded-2xl border border-[#E5E7EB] dark:border-[#27272A] bg-white/95 dark:bg-[#18181B]/95 backdrop-blur-xl shadow-2xl text-[#111827] dark:text-[#F9FAFB] overflow-hidden"
            role="dialog"
            aria-modal="true"
            aria-label="Privacy Policy"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-lg bg-blue-50 dark:bg-blue-950/60 flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
                  <Shield className="w-4 h-4" />
                </div>
                <div>
                  <h2 className="text-base font-semibold tracking-tight">Privacy Policy</h2>
                  <p className="text-xs text-zinc-500 dark:text-zinc-400">
                    Client-side surveillance &amp; cookie consent framework
                  </p>
                </div>
              </div>

              <button
                onClick={onClose}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="flex-1 overflow-y-auto p-4 sm:p-6 space-y-6 text-sm text-zinc-600 dark:text-zinc-300">
              {/* Section 1: What we store */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Database className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                  <h3>What we store</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  We track your session ID, operator name, login and logout timestamps, analytics views, and session duration (along with trading terminal telemetry). This telemetry is retained strictly to maintain user performance records across trading sessions.
                </p>
              </section>

              {/* Section 2: Where it's stored */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Lock className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                  <h3>Where it&apos;s stored</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  All session data and user metrics are stored entirely within your browser&apos;s local storage. No telemetry or personally identifiable information ever leaves your device or transfers to third-party cloud servers.
                </p>
              </section>

              {/* Section 3: Who can see it */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Eye className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                  <h3>Who can see it</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  Information is only visible to authorized administrators through the Admin → Users and Surveillance console on this device. Standard operators and guests cannot view or alter other user histories.
                </p>
              </section>

              {/* Section 4: How long we keep it */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Clock className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                  <h3>How long we keep it</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  We maintain a rolling audit trail of up to the last 100 sessions. Records persist until an administrator executes the &quot;Clear History&quot; action or you clear your browser application storage.
                </p>
              </section>

              {/* Section 5: Your rights */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Shield className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                  <h3>Your rights</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  You have the right to decline consent at any time. When declined, no session activities or analytics tallies will be recorded, and any previously saved surveillance data is erased.
                </p>
              </section>

              {/* Section 6: Contact */}
              <section className="space-y-1.5">
                <div className="flex items-center gap-2 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  <Mail className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
                  <h3>Contact</h3>
                </div>
                <p className="text-xs leading-relaxed pl-6 text-zinc-500 dark:text-zinc-400">
                  For privacy inquiries, audit verification, or rights management, reach out to our team at{' '}
                  <a
                    href="mailto:privacy@aux-terminal.app"
                    className="text-[#1E3A8A] dark:text-[#3B82F6] hover:underline font-mono"
                  >
                    privacy@aux-terminal.app
                  </a>
                  .
                </p>
              </section>
            </div>

            {/* Footer of modal */}
            <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-t border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/50 dark:bg-zinc-900/30">
              <span className="text-xs font-mono text-zinc-400">
                Last updated: September 28, 2026
              </span>
              <Button variant="secondary" size="sm" onClick={onClose}>
                Close
              </Button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

export default PrivacyPolicyModal;
