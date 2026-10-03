import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Shield, X, Trash2, Database, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { useAuth } from '../../hooks/useAuth';
import type { SessionHistoryEntry } from '../../types/auth';

function readSessionHistory(): SessionHistoryEntry[] {
  try {
    const raw = localStorage.getItem('aux_session_history');
    const list: SessionHistoryEntry[] = raw ? JSON.parse(raw) : [];
    return list
      .sort((a, b) => (b.logoutTime || 0) - (a.logoutTime || 0))
      .slice(0, 100);
  } catch (err) {
    console.error('Failed to parse session history:', err);
    return [];
  }
}

export const AdminSurveillanceModal: React.FC = () => {
  const { isAdminPanelOpen, setIsAdminPanelOpen, session } = useAuth();
  const [refreshKey, setRefreshKey] = useState(0);

  if (!isAdminPanelOpen || session?.role !== 'admin') {
    return null;
  }

  // Derive history directly on render
  // eslint-disable-next-line react-hooks/exhaustive-deps
  const history = readSessionHistory();

  const handleClearHistory = () => {
    const confirmed = window.confirm(
      'Are you sure you want to permanently clear all recorded user session history? This action cannot be undone.'
    );
    if (confirmed) {
      localStorage.removeItem('aux_session_history');
      setRefreshKey((k) => k + 1);
    }
  };

  const formatDuration = (ms: number): string => {
    if (!ms || ms < 1000) return '< 1s';
    const totalSecs = Math.floor(ms / 1000);
    const mins = Math.floor(totalSecs / 60);
    const secs = totalSecs % 60;
    if (mins === 0) return `${secs}s`;
    return `${mins}m ${secs}s`;
  };

  return (
    <AnimatePresence key={refreshKey}>
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsAdminPanelOpen(false)}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        />

        {/* Modal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.98, y: 15 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.98, y: 15 }}
          transition={{ duration: 0.2, ease: 'easeOut' }}
          className="relative z-10 w-full max-w-5xl max-h-[85vh] flex flex-col rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-2xl text-[#111827] dark:text-[#F9FAFB] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between px-6 py-4 border-b border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/60 dark:bg-zinc-900/40">
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
                <Shield className="w-4 h-4" />
              </div>
              <div>
                <h2 className="text-base font-semibold tracking-tight">
                  Admin Surveillance Console
                </h2>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  Audit trail of user terminal sessions and delta activity snapshots
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              {history.length > 0 && (
                <button
                  onClick={handleClearHistory}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white text-xs font-medium transition-colors cursor-pointer shadow-sm"
                >
                  <Trash2 className="w-3.5 h-3.5" />
                  Clear History
                </button>
              )}
              <button
                onClick={() => setIsAdminPanelOpen(false)}
                className="p-1.5 rounded-lg text-zinc-400 hover:text-zinc-600 dark:hover:text-zinc-200 hover:bg-zinc-100 dark:hover:bg-zinc-800 transition-colors cursor-pointer"
                aria-label="Close modal"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
          </div>

          {/* Body / Table */}
          <div className="flex-1 overflow-auto p-6">
            {history.length === 0 ? (
              <div className="text-center py-16 space-y-3">
                <Database className="w-10 h-10 mx-auto text-zinc-400 dark:text-zinc-600" />
                <h3 className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">
                  No Session History Recorded
                </h3>
                <p className="text-xs text-zinc-500 max-w-sm mx-auto">
                  User sessions and their activity snapshots are automatically compiled and stored in localStorage upon logout.
                </p>
              </div>
            ) : (
              <div className="rounded-lg border border-[#E5E7EB] dark:border-[#27272A] overflow-hidden">
                <table className="w-full text-left text-xs border-collapse">
                  <thead>
                    <tr className="bg-zinc-100/80 dark:bg-zinc-800/60 border-b border-[#E5E7EB] dark:border-[#27272A] text-zinc-500 dark:text-zinc-400 font-medium">
                      <th className="py-3 px-4">Operator Name</th>
                      <th className="py-3 px-4">Consent</th>
                      <th className="py-3 px-4">Login Time</th>
                      <th className="py-3 px-4">Logout Time</th>
                      <th className="py-3 px-4">Duration</th>
                      <th className="py-3 px-4 text-right">Signals Viewed</th>
                      <th className="py-3 px-4 text-right">Backtests Run</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#27272A]">
                    {history.map((entry, idx) => {
                      let formattedLogin = 'N/A';
                      let formattedLogout = 'N/A';
                      try {
                        formattedLogin = format(new Date(entry.loginTime), 'yyyy-MM-dd HH:mm:ss');
                        formattedLogout = format(new Date(entry.logoutTime), 'yyyy-MM-dd HH:mm:ss');
                      } catch {
                        // ignore formatting fallback
                      }

                      return (
                        <tr
                          key={`${entry.loginTime}-${idx}`}
                          className="even:bg-zinc-50/50 dark:even:bg-zinc-800/30 hover:bg-zinc-100/50 dark:hover:bg-zinc-800/60 transition-colors"
                        >
                          <td className="py-3 px-4 font-semibold text-[#111827] dark:text-[#F9FAFB]">
                            {entry.name}
                          </td>
                          <td className="py-3 px-4">
                            {entry.consentAccepted === true ? (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-emerald-50 dark:bg-emerald-950/50 text-emerald-700 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800/50 font-mono">
                                ✅ Accepted
                              </span>
                            ) : (
                              <span className="inline-flex items-center px-2 py-0.5 rounded-full text-[11px] font-medium bg-amber-50 dark:bg-amber-950/50 text-amber-700 dark:text-amber-400 border border-amber-200 dark:border-amber-800/50 font-mono">
                                ⚠️ Unknown
                              </span>
                            )}
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                            {formattedLogin}
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                            {formattedLogout}
                          </td>
                          <td className="py-3 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                            <span className="inline-flex items-center gap-1">
                              <Clock className="w-3 h-3 text-zinc-400" />
                              {formatDuration(entry.duration)}
                            </span>
                          </td>
                          <td className="py-3 px-4 font-mono text-right font-semibold text-[#1E3A8A] dark:text-[#3B82F6]">
                            +{entry.sessionActivity?.signalsViewed ?? 0}
                          </td>
                          <td className="py-3 px-4 font-mono text-right font-semibold text-[#1E3A8A] dark:text-[#3B82F6]">
                            +{entry.sessionActivity?.backtestsRun ?? 0}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            )}
          </div>

          {/* Footer Bar */}
          <div className="px-6 py-3 border-t border-[#E5E7EB] dark:border-[#27272A] bg-zinc-50/60 dark:bg-zinc-900/40 flex items-center justify-between text-xs text-zinc-500">
            <span>
              Showing {history.length} {history.length === 1 ? 'entry' : 'entries'} (capped at 100)
            </span>
            <span className="font-mono text-[11px]">
              Storage Key: aux_session_history
            </span>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
};

export default AdminSurveillanceModal;
