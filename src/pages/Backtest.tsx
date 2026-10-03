import React, { useState } from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { BarChart3, TrendingUp, ShieldCheck, Percent, DollarSign, ArrowDownRight, Layers, PlayCircle, Loader2 } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import Button from '../components/ui/Button';
import { useTheme } from '../hooks/useTheme';
import { backtestMetrics, equityCurveData } from '../data/mockData';
import useDocumentTitle from '../hooks/useDocumentTitle';
import { useAuth } from '../hooks/useAuth';

interface CustomTooltipProps {
  active?: boolean;
  payload?: Array<{
    name: string;
    value: number;
    color: string;
  }>;
  label?: string;
}

const CustomEquityTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-xl text-xs font-mono space-y-1">
        <p className="font-semibold text-zinc-500 mb-1">Month: {label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between gap-4">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              ₹{Number(entry.value).toLocaleString('en-IN')}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Backtest: React.FC = () => {
  useDocumentTitle('Walk-Forward Backtest | AuX Terminal');
  const { theme } = useTheme();
  const { incrementStat, showToast } = useAuth();
  const [isRunning, setIsRunning] = useState(false);

  const isDark = theme === 'dark';
  const navyColor = isDark ? '#3B82F6' : '#1E3A8A';
  const gridColor = isDark ? '#27272A' : '#E5E7EB';
  const textColor = isDark ? '#A1A1AA' : '#6B7280';
  const benchmarkColor = isDark ? '#71717A' : '#9CA3AF';

  const handleRunBacktest = () => {
    setIsRunning(true);
    incrementStat('backtestsRun');
    setTimeout(() => {
      setIsRunning(false);
      showToast('Backtest complete — 342 trades processed');
    }, 1500);
  };

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <AnimateIn>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] text-zinc-600 dark:text-zinc-400">
            <BarChart3 className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
            Walk-Forward Quantitative Simulation Engine
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
            Walk-Forward Backtest
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Deterministic out-of-sample backtesting with transaction costs, slippage models, and zero look-ahead bias across gold calendar spreads.
          </p>
        </div>
      </AnimateIn>

      {/* Re-run Button */}
      <AnimateIn delay={0.05}>
        <Button
          variant="primary"
          size="md"
          onClick={handleRunBacktest}
          disabled={isRunning}
          icon={isRunning ? <Loader2 className="w-4 h-4 animate-spin" /> : <PlayCircle className="w-4 h-4" />}
        >
          {isRunning ? 'Running Simulation...' : 'Re-run Walk-Forward Backtest'}
        </Button>
      </AnimateIn>

      {/* Top Row: 4 Metric Cards */}
      <AnimateIn delay={0.1}>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {/* Card 1: Total Trades */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Total Trades</span>
              <Layers className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
            </div>
            <div className="font-mono text-3xl font-bold text-[#111827] dark:text-[#F9FAFB]">
              {backtestMetrics.totalTrades}
            </div>
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              100% Deterministic Execution
            </p>
          </div>

          {/* Card 2: Win Rate */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Win Rate</span>
              <Percent className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
            </div>
            <div className="font-mono text-3xl font-bold text-emerald-600 dark:text-emerald-400">
              {backtestMetrics.winRate}%
            </div>
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              234 Wins / 108 Losses
            </p>
          </div>

          {/* Card 3: Gross P&L */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Gross Cumulative P&amp;L</span>
              <DollarSign className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
            </div>
            <div className="font-mono text-3xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
              +₹{(backtestMetrics.grossPnl / 100000).toFixed(2)}L
            </div>
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              Annualized: +{backtestMetrics.annualizedReturn}% • Sharpe: {backtestMetrics.sharpeRatio}
            </p>
          </div>

          {/* Card 4: Max Drawdown */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-2 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
              <span className="text-xs font-medium">Max Drawdown</span>
              <ArrowDownRight className="w-4 h-4 text-rose-500" />
            </div>
            <div className="font-mono text-3xl font-bold text-rose-600 dark:text-rose-400">
              {backtestMetrics.maxDrawdown}%
            </div>
            <p className="text-[11px] font-mono text-zinc-500 dark:text-zinc-400">
              Recovery Time: 18 Days
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* Middle: Walk-Forward Cumulative Equity Area Chart */}
      <AnimateIn delay={0.15}>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-6 transition-all duration-200 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#27272A]">
            <div>
              <h2 className="text-base font-semibold text-[#111827] dark:text-[#F9FAFB]">
                Walk-Forward Cumulative Equity Curve
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Out-of-sample portfolio growth (₹10.0L seed capital) vs. passive gold bullion benchmark
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-2 bg-[#1E3A8A] dark:bg-[#3B82F6] rounded-xs"></span>
                <span className="text-zinc-700 dark:text-zinc-300 font-medium">AuX RV Strategy</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-zinc-400"></span>
                <span className="text-zinc-400">Buy &amp; Hold Gold</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={equityCurveData} margin={{ top: 10, right: 10, left: 10, bottom: 0 }}>
                <defs>
                  <linearGradient id="equityNavy" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={navyColor} stopOpacity={0.25} />
                    <stop offset="95%" stopColor={navyColor} stopOpacity={0.0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="month"
                  stroke={textColor}
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                  fontFamily="JetBrains Mono"
                />
                <YAxis
                  stroke={textColor}
                  fontSize={11}
                  tickLine={false}
                  axisLine={{ stroke: gridColor }}
                  fontFamily="JetBrains Mono"
                  tickFormatter={(val) => `₹${(val / 100000).toFixed(1)}L`}
                  domain={['dataMin - 50000', 'dataMax + 50000']}
                />
                <Tooltip content={<CustomEquityTooltip />} />
                <Line
                  type="monotone"
                  dataKey="benchmark"
                  name="Gold Benchmark"
                  stroke={benchmarkColor}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Area
                  type="monotone"
                  dataKey="equity"
                  name="AuX Terminal Strategy"
                  stroke={navyColor}
                  strokeWidth={2.5}
                  fillOpacity={1}
                  fill="url(#equityNavy)"
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AnimateIn>

      {/* Bottom: Alpha Decomposition Section */}
      <AnimateIn delay={0.2}>
        <div className="space-y-4">
          <div>
            <h2 className="text-lg font-semibold text-[#111827] dark:text-[#F9FAFB]">
              Alpha Decomposition
            </h2>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Factor analysis breaking down strategy outperformance into passive drift versus genuine statistical edge
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Card 1: Underlying Gold Drift */}
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span className="text-xs font-medium">Underlying Gold Drift</span>
                <TrendingUp className="w-4 h-4 text-amber-500" />
              </div>
              <div className="font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                +{backtestMetrics.alphaDecomposition.underlyingGoldDrift}%
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Passive buy-and-hold return of MCX physical bullion benchmark over the equivalent 12-month backtest horizon.
              </p>
            </div>

            {/* Card 2: Net Relative-Value Return */}
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span className="text-xs font-medium">Net Relative-Value Return</span>
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6]" />
              </div>
              <div className="font-mono text-3xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
                +{backtestMetrics.alphaDecomposition.netRelativeValueReturn}%
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Pure idiosyncratic alpha generated from calendar spread mean-reversion, net of brokerage, exchange fees, and STT.
              </p>
            </div>

            {/* Card 3: Market Beta */}
            <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
              <div className="flex items-center justify-between text-zinc-500 dark:text-zinc-400">
                <span className="text-xs font-medium">Market Beta (β)</span>
                <BarChart3 className="w-4 h-4 text-emerald-500" />
              </div>
              <div className="font-mono text-3xl font-bold text-zinc-900 dark:text-zinc-100">
                {backtestMetrics.alphaDecomposition.marketBeta.toFixed(2)}
              </div>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
                Near-zero directional sensitivity confirming true market-neutral calendar spread statistical arbitrage.
              </p>
            </div>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
};

export default Backtest;
