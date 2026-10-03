import React, { useState, useRef, useEffect } from 'react';
import {
  ResponsiveContainer,
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from 'recharts';
import { ChevronDown, ChevronUp, Compass, Layers, CheckCircle2 } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import { useTheme } from '../hooks/useTheme';
import { pairwiseData, contractLifecycleData } from '../data/mockData';
import { cn } from '../utils/cn';
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

const CustomChartTooltip: React.FC<CustomTooltipProps> = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <div className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#18181B] shadow-xl text-xs font-mono space-y-1">
        <p className="font-semibold text-zinc-500 mb-1">Time: {label}</p>
        {payload.map((entry, index) => (
          <div key={`item-${index}`} className="flex justify-between gap-4">
            <span style={{ color: entry.color }}>{entry.name}:</span>
            <span className="font-bold text-zinc-900 dark:text-zinc-100">
              ₹{Number(entry.value).toFixed(2)}
            </span>
          </div>
        ))}
      </div>
    );
  }
  return null;
};

export const Intelligence: React.FC = () => {
  useDocumentTitle('Intelligence | AuX Terminal');
  const { theme } = useTheme();
  const { incrementStat } = useAuth();
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const hasCountedSignal = useRef(false);
  const hasCountedContract = useRef(false);

  useEffect(() => {
    if (!hasCountedSignal.current) {
      hasCountedSignal.current = true;
      incrementStat('signalsViewed');
    }
  }, [incrementStat]);


  const isDark = theme === 'dark';
  const navyColor = isDark ? '#3B82F6' : '#1E3A8A';
  const gridColor = isDark ? '#27272A' : '#E5E7EB';
  const textColor = isDark ? '#A1A1AA' : '#6B7280';
  const bandColor = isDark ? '#52525B' : '#9CA3AF';
  const meanColor = isDark ? '#71717A' : '#6B7280';

  return (
    <div className="space-y-10 py-6">
      {/* Header */}
      <AnimateIn>
        <div className="space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] text-zinc-600 dark:text-zinc-400">
            <Compass className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
            Statistical Arbitrage & Spread Surveillance
          </div>
          <h1 className="text-3xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
            Pairwise Intelligence
          </h1>
          <p className="text-sm text-zinc-500 dark:text-zinc-400 max-w-2xl">
            Real-time basis spread analytics, cointegration z-score tracking, and contract lifecycle monitoring between MCX gold contracts.
          </p>
        </div>
      </AnimateIn>

      {/* Top Row: 3 Clean Metric Cards */}
      <AnimateIn delay={0.1}>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Card 1: Z-Score */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Statistical Z-Score
              </span>
              <span className="inline-flex items-center gap-1 text-[11px] px-2 py-0.5 rounded-full bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400 font-mono">
                <CheckCircle2 className="w-3 h-3" />
                {pairwiseData.status}
              </span>
            </div>
            <div className="font-mono text-3xl font-bold text-[#1E3A8A] dark:text-[#3B82F6]">
              +{pairwiseData.zScore.toFixed(2)}σ
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Within normal 95% stationary bounds (|z| &lt; 2.0). Mean reversion bias active.
            </p>
          </div>

          {/* Card 2: Current Spread */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Current Spread (Basis)
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                {pairwiseData.unit}
              </span>
            </div>
            <div className="font-mono text-3xl font-bold text-[#111827] dark:text-[#F9FAFB]">
              ₹{pairwiseData.currentSpread.toFixed(2)}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400">
              Divergence of <strong className="font-mono text-zinc-700 dark:text-zinc-300">+₹11.50</strong> against rolling mean baseline.
            </p>
          </div>

          {/* Card 3: Rolling Mean & Bounds */}
          <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-3 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
            <div className="flex items-center justify-between">
              <span className="text-xs font-medium text-zinc-500 dark:text-zinc-400">
                Rolling Mean (30D)
              </span>
              <span className="text-[11px] font-mono text-zinc-400">
                Std Dev: ₹{pairwiseData.stdDev.toFixed(2)}
              </span>
            </div>
            <div className="font-mono text-3xl font-bold text-[#111827] dark:text-[#F9FAFB]">
              ₹{pairwiseData.rollingMean.toFixed(2)}
            </div>
            <p className="text-xs text-zinc-500 dark:text-zinc-400 font-mono">
              +2σ: ₹{pairwiseData.upperBand.toFixed(1)} • -2σ: ₹{pairwiseData.lowerBand.toFixed(1)}
            </p>
          </div>
        </div>
      </AnimateIn>

      {/* Middle: Pairwise Intelligence Chart */}
      <AnimateIn delay={0.15}>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-6 space-y-6 transition-all duration-200 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#27272A]">
            <div>
              <h2 className="text-base font-semibold text-[#111827] dark:text-[#F9FAFB]">
                Pairwise Intelligence: {pairwiseData.pair}
              </h2>
              <p className="text-xs text-zinc-500 dark:text-zinc-400 mt-0.5">
                Intraday basis tracking relative to empirical ±2.0σ Bollinger reversion thresholds
              </p>
            </div>

            <div className="flex items-center gap-4 text-xs font-mono">
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 bg-[#1E3A8A] dark:bg-[#3B82F6]"></span>
                <span className="text-zinc-600 dark:text-zinc-300">Spread</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dashed border-zinc-400"></span>
                <span className="text-zinc-400">±2σ Bands</span>
              </div>
              <div className="flex items-center gap-1.5">
                <span className="w-3 h-0.5 border-t border-dotted border-zinc-400"></span>
                <span className="text-zinc-400">Mean</span>
              </div>
            </div>
          </div>

          <div className="h-80 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={pairwiseData.chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke={gridColor} />
                <XAxis
                  dataKey="time"
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
                  domain={['auto', 'auto']}
                />
                <Tooltip content={<CustomChartTooltip />} />
                <Line
                  type="monotone"
                  dataKey="upperBand"
                  name="+2σ Upper Band"
                  stroke={bandColor}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="mean"
                  name="Rolling Mean"
                  stroke={meanColor}
                  strokeDasharray="2 2"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="lowerBand"
                  name="-2σ Lower Band"
                  stroke={bandColor}
                  strokeDasharray="4 4"
                  strokeWidth={1.5}
                  dot={false}
                />
                <Line
                  type="monotone"
                  dataKey="spread"
                  name="Current Spread"
                  stroke={navyColor}
                  strokeWidth={2.5}
                  dot={false}
                  activeDot={{ r: 5, fill: navyColor }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </div>
      </AnimateIn>

      {/* Bottom: Contract Lifecycle & Liquidity Accordion Table */}
      <AnimateIn delay={0.2}>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] overflow-hidden transition-all duration-200 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          {/* Collapsible Header */}
          <button
            onClick={() => {
              if (!isAccordionOpen && !hasCountedContract.current) {
                hasCountedContract.current = true;
                incrementStat('contractsExplored');
              }
              setIsAccordionOpen((prev) => !prev);
            }}
            className="w-full px-6 py-4 flex items-center justify-between text-left cursor-pointer hover:bg-zinc-100/50 dark:hover:bg-zinc-800/40 transition-colors"
          >
            <div className="flex items-center gap-3">
              <Layers className="w-5 h-5 text-[#1E3A8A] dark:text-[#3B82F6]" />
              <div>
                <h3 className="text-sm font-semibold text-[#111827] dark:text-[#F9FAFB]">
                  Contract Lifecycle & Liquidity
                </h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400">
                  {isAccordionOpen
                    ? '10 institutional gold derivative contracts active on exchange'
                    : 'Click to expand: View All Active Contracts'}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-2 text-xs font-medium text-zinc-500 dark:text-zinc-400">
              <span>{isAccordionOpen ? 'Collapse Table' : 'Expand Table'}</span>
              {isAccordionOpen ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </div>
          </button>

          {/* Accordion Table Content */}
          {isAccordionOpen && (
            <div className="border-t border-[#E5E7EB] dark:border-[#27272A] overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="bg-zinc-100/80 dark:bg-zinc-800/60 border-b border-[#E5E7EB] dark:border-[#27272A] text-zinc-500 dark:text-zinc-400 font-medium">
                    <th className="py-3 px-6">Contract Symbol</th>
                    <th className="py-3 px-4">Expiry Date</th>
                    <th className="py-3 px-4">Days to Expiry (DTE)</th>
                    <th className="py-3 px-4 text-right">24h Volume (Lots)</th>
                    <th className="py-3 px-4 text-right">Open Interest (OI)</th>
                    <th className="py-3 px-4 text-right">Settlement Price</th>
                    <th className="py-3 px-6 text-center">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#E5E7EB] dark:divide-[#27272A]">
                  {contractLifecycleData.map((contract) => (
                    <tr
                      key={contract.symbol}
                      className="even:bg-white dark:even:bg-[#18181B] odd:bg-zinc-50/50 dark:odd:bg-zinc-900/30 transition-colors duration-150 hover:text-[#1E3A8A] dark:hover:text-[#3B82F6] hover:bg-blue-50/30 dark:hover:bg-blue-950/20"
                    >
                      <td className="py-3.5 px-6 font-bold font-mono">
                        {contract.symbol}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-zinc-600 dark:text-zinc-400">
                        {contract.expiry}
                      </td>
                      <td className="py-3.5 px-4 font-mono">
                        <span className={cn(
                          'px-2 py-0.5 rounded text-[11px] font-semibold',
                          contract.dte <= 5
                            ? 'bg-amber-100 dark:bg-amber-950/60 text-amber-700 dark:text-amber-400'
                            : 'text-zinc-700 dark:text-zinc-300'
                        )}>
                          {contract.dte}d
                        </span>
                      </td>
                      <td className="py-3.5 px-4 font-mono text-right text-zinc-700 dark:text-zinc-300">
                        {contract.volume.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-right text-zinc-700 dark:text-zinc-300">
                        {contract.openInterest.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-4 font-mono text-right font-semibold text-zinc-900 dark:text-zinc-100">
                        ₹{contract.closePrice.toLocaleString('en-IN')}
                      </td>
                      <td className="py-3.5 px-6 text-center">
                        <span
                          className={cn(
                            'inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold uppercase tracking-wider',
                            contract.status === 'ACTIVE'
                              ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 dark:text-emerald-400'
                              : 'bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400'
                          )}
                        >
                          <span
                            className={cn(
                              'w-1.5 h-1.5 rounded-full',
                              contract.status === 'ACTIVE' ? 'bg-emerald-500' : 'bg-amber-500'
                            )}
                          />
                          {contract.status === 'ACTIVE' ? 'Active' : 'Expiring Soon'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </AnimateIn>
    </div>
  );
};

export default Intelligence;
