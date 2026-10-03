import React from 'react';
import { Link } from 'react-router-dom';
import {
  TrendingUp,
  Activity,
  Layers,
  ArrowRight,
  ArrowUpRight,
  ArrowDownRight,
  PlusCircle,
  Database,
} from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { useAuth } from '../hooks/useAuth';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { pairwiseData } from '../data/mockData';

export const Home: React.FC = () => {
  useDocumentTitle('AuX | Commodity Derivatives Intelligence Terminal');
  const { session, stats, incrementStat, tickers } = useAuth();

  return (
    <div className="space-y-16 py-8 md:py-16">
      {/* Hero Section */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column */}
        <AnimateIn className="lg:col-span-7">
          <div className="space-y-6">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] text-zinc-600 dark:text-zinc-400">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
              Institutional Gold Terminal
            </div>

            <h1 className="text-4xl md:text-6xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB] leading-[1.1]">
              Next-Generation Gold Derivatives Intelligence.
            </h1>

            <p className="text-lg md:text-xl text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
              AuX is a next-generation commodity derivatives intelligence platform engineered for quantitative researchers, commodity desks, and institutional traders. By synthesizing multi-tenor implied volatilities, physical inventory flows, and macroeconomic risk factors, AuX delivers uncompromised clarity in gold pricing dynamics.
            </p>

            <div className="space-y-3 pt-2">
              <div className="flex flex-wrap items-center gap-4">
                <Link to="/intelligence">
                  <Button variant="primary" size="lg" icon={<ArrowRight className="w-4 h-4" />}>
                    Launch Terminal
                  </Button>
                </Link>
                <Link to="/methodology">
                  <Button variant="secondary" size="lg">
                    View Methodology
                  </Button>
                </Link>
              </div>
              <p className="text-xs font-mono text-zinc-400 dark:text-zinc-500">
                Press Ctrl+K for command palette
              </p>
            </div>
          </div>
        </AnimateIn>

        {/* Right Column: Live Market Snapshot Card */}
        <AnimateIn delay={0.1} className="lg:col-span-5">
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6] space-y-4">
            {/* Top Badge Row */}
            <div className="flex items-center justify-between pb-1">
              <div className="inline-flex items-center gap-2 text-[11px] font-mono tracking-wider uppercase text-zinc-600 dark:text-zinc-400">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>SAMPLE GOLD FEED (MCX SPECIFICATIONS)</span>
              </div>
              <TrendingUp className="w-3.5 h-3.5 text-amber-500" />
            </div>

            {/* Column Headers */}
            <div className="grid grid-cols-3 text-[11px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 pb-2 border-b border-[#E5E7EB] dark:border-[#27272A]">
              <span>Symbol</span>
              <span className="text-center">Price</span>
              <span className="text-right">Change</span>
            </div>

            {/* Four Ticker Rows */}
            <div className="space-y-3">
              {tickers.map((t) => {
                const isPositive = t.changePercent >= 0;
                const absPercent = Math.abs(t.changePercent);
                return (
                  <div
                    key={t.symbol}
                    className="grid grid-cols-3 items-center text-xs"
                  >
                    <span className="font-bold text-[#111827] dark:text-[#F9FAFB]">
                      {t.symbol}
                    </span>
                    <span className="font-mono text-zinc-800 dark:text-zinc-200 text-center">
                      ₹{t.price.toLocaleString('en-IN')}
                    </span>
                    <span
                      className={`font-mono text-right flex items-center justify-end gap-1 ${
                        isPositive
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }`}
                    >
                      {isPositive ? (
                        <>
                          <ArrowUpRight className="w-3.5 h-3.5 shrink-0" />
                          <span>▲ {t.changePercent}%</span>
                        </>
                      ) : (
                        <>
                          <ArrowDownRight className="w-3.5 h-3.5 shrink-0" />
                          <span>▼ {absPercent}%</span>
                        </>
                      )}
                    </span>
                  </div>
                );
              })}
            </div>

            {/* Bottom Section: Pairwise Signal */}
            <div className="pt-4 border-t border-[#E5E7EB] dark:border-[#27272A] space-y-2.5">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-[10px] font-mono uppercase tracking-wider text-zinc-400 dark:text-zinc-500 block">
                    PAIRWISE SIGNAL
                  </span>
                  <span className="text-xs font-semibold text-[#111827] dark:text-[#F9FAFB]">
                    GOLDM vs GOLDTEN
                  </span>
                </div>
                <span className="px-2 py-0.5 rounded text-[10px] font-mono font-medium border border-blue-200 dark:border-blue-900 bg-blue-50 dark:bg-blue-950/50 text-[#1E3A8A] dark:text-[#3B82F6]">
                  {pairwiseData.status}
                </span>
              </div>

              <div className="flex items-center justify-between text-xs pt-0.5">
                <span className="text-zinc-500 dark:text-zinc-400">Z-Score:</span>
                <span className="font-mono font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
                  +{pairwiseData.zScore.toFixed(2)}σ
                </span>
              </div>

              <div className="flex items-center justify-between text-xs">
                <span className="text-zinc-500 dark:text-zinc-400">Current Spread:</span>
                <span className="font-mono font-semibold text-zinc-900 dark:text-zinc-100">
                  ₹{pairwiseData.currentSpread.toFixed(2)}/g
                </span>
              </div>
            </div>
          </div>
        </AnimateIn>
      </div>

      {/* Feature Cards Section */}
      <AnimateIn delay={0.15}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Feature Card 1 */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
              <TrendingUp className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F9FAFB]">
                Volatility Surface & Term Structure
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Real-time forward curve modeling, cross-tenor basis tracking, and implied volatility skew surfaces across active MCX and COMEX gold contracts.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#27272A]">
              <span className="font-mono text-xs font-semibold text-[#1E3A8A] dark:text-[#3B82F6]">
                ATM Vol: 14.82% • 30D Skew: -1.24%
              </span>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
              <Activity className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F9FAFB]">
                Systematic Relative-Value Backtesting
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Deterministic walk-forward backtesting with transaction costs, slippage models, and automated stop-loss regimes tailored for calendar spreads.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#27272A]">
              <span className="font-mono text-xs font-semibold text-[#1E3A8A] dark:text-[#3B82F6]">
                Sharpe: 2.41 • Max DD: -3.8%
              </span>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-4 hover:border-zinc-300 dark:hover:border-zinc-700 transition-colors duration-200">
            <div className="w-10 h-10 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
              <Layers className="w-5 h-5" />
            </div>
            <div className="space-y-2">
              <h3 className="text-lg font-semibold text-[#111827] dark:text-[#F9FAFB]">
                Physical-to-Financial Basis Analytics
              </h3>
              <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
                Unify domestic physical spot premiums, vault inventory flows, and import duty dynamics with financial futures for institutional arbitrage detection.
              </p>
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#27272A]">
              <span className="font-mono text-xs font-semibold text-[#1E3A8A] dark:text-[#3B82F6]">
                Basis: +₹142/10g • Z-Score: +2.18σ
              </span>
            </div>
          </div>
        </div>
      </AnimateIn>

      {/* Step 1 Requirement: Session Telemetry Sandbox (Dummy Increment Buttons) */}
      <AnimateIn delay={0.25}>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-6">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#27272A]">
            <div>
              <div className="inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-[#1E3A8A] dark:text-[#3B82F6]">
                <Database className="w-3.5 h-3.5" />
                Session Telemetry Sandbox
              </div>
              <h3 className="text-lg font-bold text-[#111827] dark:text-[#F9FAFB] mt-0.5">
                Snapshot & Activity Differential Testing
              </h3>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-1">
                Active Session: <strong className="text-zinc-700 dark:text-zinc-300">{session?.name || 'Unauthenticated'}</strong> ({session?.role || 'None'}).
                Increment stats below; upon logout, the delta will be archived in <code className="font-mono">aux_session_history</code>.
              </p>
            </div>

            <div className="flex items-center gap-2">
              <span className="text-xs font-mono text-zinc-500 bg-white dark:bg-[#09090B] px-3 py-1.5 rounded-lg border border-[#E5E7EB] dark:border-[#27272A]">
                Login Snapshot: {session?.snapshot?.signalsViewed ?? 0}s / {session?.snapshot?.backtestsRun ?? 0}b / {session?.snapshot?.contractsExplored ?? 0}c
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            {/* Stat 1: Signals Viewed */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Signals Viewed</span>
                <span className="font-mono text-xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
                  {stats.signalsViewed}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                icon={<PlusCircle className="w-3.5 h-3.5" />}
                onClick={() => incrementStat('signalsViewed')}
              >
                + View Signal
              </Button>
            </div>

            {/* Stat 2: Backtests Run */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Backtests Run</span>
                <span className="font-mono text-xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
                  {stats.backtestsRun}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                icon={<PlusCircle className="w-3.5 h-3.5" />}
                onClick={() => incrementStat('backtestsRun')}
              >
                + Run Backtest
              </Button>
            </div>

            {/* Stat 3: Contracts Explored */}
            <div className="p-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-medium text-zinc-500">Contracts Explored</span>
                <span className="font-mono text-xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
                  {stats.contractsExplored}
                </span>
              </div>
              <Button
                variant="outline"
                size="sm"
                className="w-full text-xs"
                icon={<PlusCircle className="w-3.5 h-3.5" />}
                onClick={() => incrementStat('contractsExplored')}
              >
                + Explore Contract
              </Button>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
};

export default Home;
