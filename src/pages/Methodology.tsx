import React from 'react';
import { BookOpen, Scale, Clock, Receipt, AlertTriangle } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import useDocumentTitle from '../hooks/useDocumentTitle';

export const Methodology: React.FC = () => {
  useDocumentTitle('Methodology | AuX Terminal');
  return (
    <div className="max-w-4xl mx-auto space-y-12 py-8">
      {/* Header */}
      <AnimateIn>
        <div className="space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] text-zinc-600 dark:text-zinc-400">
            <BookOpen className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
            Mathematical Specifications &amp; Exchange Rules
          </div>
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
            Quantitative Methodology
          </h1>
          <p className="text-base text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            Formal mathematical framework for purity basis normalization, zero look-ahead walk-forward simulations, and statutory transaction cost friction models on the Multi Commodity Exchange of India (MCX).
          </p>
        </div>
      </AnimateIn>

      {/* Section 1: Purity & Basis Normalization */}
      <AnimateIn delay={0.1}>
        <section className="space-y-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-5 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
              <Scale className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">
              1. Purity &amp; Basis Normalization
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            MCX lists gold contracts across divergent lot sizes (GOLDM 100g, GOLDTEN 10g, GOLDGUINEA 8g, and GOLDPETAL 1g) and purity fineness specifications (995 vs. 999). To evaluate true synthetic arbitrage rather than nominal price disparities, all price series are normalized into pure gold grams equivalents.
          </p>

          {/* Formula Box */}
          <div className="p-4 sm:p-5 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] font-mono text-xs md:text-sm text-[#111827] dark:text-[#F9FAFB] space-y-3 overflow-x-auto">
            <div className="text-zinc-400 dark:text-zinc-500 font-sans text-xs font-semibold uppercase tracking-wider">
              Formula: Purity Adjustment &amp; Standardized Spread
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
              Pure Gold Content (grams) = Quoted Weight × (Purity / 1000)
            </div>
            <div className="text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Normalized Basis Spread (S_t) = P_{`{Near, t}`} - P_{`{Far, t}`} × (Weight_{`{Near}`} / Weight_{`{Far}`})
            </div>
            <div className="text-[#1E3A8A] dark:text-[#3B82F6] font-semibold whitespace-nowrap">
              Rolling Z-Score: z_t = (S_t - μ_{`{30D, t}`}) / σ_{`{30D, t}`}
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            Where μ_{`{30D, t}`} and σ_{`{30D, t}`} denote the rolling 30-trading-day sample mean and standard deviation of the normalized spread, preventing parameter leakage from future price distributions.
          </p>
        </section>
      </AnimateIn>

      {/* Section 2: Walk-Forward Backtesting */}
      <AnimateIn delay={0.15}>
        <section className="space-y-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-5 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
              <Clock className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">
              2. Walk-Forward Backtesting (Zero Look-Ahead Bias)
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            Traditional backtests suffer from look-ahead bias by tuning entry thresholds over the entire test horizon. AuX enforces strict rolling out-of-sample walk-forward windows: 180 days of historical parameter training followed by 30 days of forward execution.
          </p>

          {/* Formula Box */}
          <div className="p-4 sm:p-5 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] font-mono text-xs md:text-sm text-[#111827] dark:text-[#F9FAFB] space-y-3 overflow-x-auto">
            <div className="text-zinc-400 dark:text-zinc-500 font-sans text-xs font-semibold uppercase tracking-wider">
              Simulation Regime &amp; Execution Gates
            </div>
            <div className="text-zinc-700 dark:text-zinc-300 whitespace-nowrap">
              Calibration Window: T_{`{calib}`} = [t - 180, t]  |  Execution Window: T_{`{exec}`} = [t, t + 30]
            </div>
            <div className="text-emerald-700 dark:text-emerald-400 font-bold whitespace-nowrap">
              Entry Gate: |z_t| &gt; 2.0σ  (Long spread if z &lt; -2.0, Short spread if z &gt; +2.0)
            </div>
            <div className="text-rose-600 dark:text-rose-400 font-bold whitespace-nowrap">
              Exit Gate: |z_t| ≤ 0.25σ (Target Mean Reversion) OR Stop-Loss: |z_t| ≥ 3.5σ
            </div>
          </div>

          <p className="text-xs text-zinc-500 dark:text-zinc-400 leading-relaxed">
            All positions undergo mandatory roll-forward liquidation 4 business days prior to tender delivery notice periods to eliminate physical delivery liabilities.
          </p>
        </section>
      </AnimateIn>

      {/* Section 3: Statutory & Exchange Transaction Costs */}
      <AnimateIn delay={0.2}>
        <section className="space-y-4 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-5 sm:p-8 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-blue-100 dark:bg-blue-950/60 flex items-center justify-center text-[#1E3A8A] dark:text-[#3B82F6]">
              <Receipt className="w-4 h-4" />
            </div>
            <h2 className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">
              3. Statutory &amp; Exchange Transaction Costs
            </h2>
          </div>

          <p className="text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            High-frequency relative-value strategies frequently degrade under realistic friction. AuX models real-world institutional Indian regulatory costs at the trade tick level:
          </p>

          {/* Formula Box */}
          <div className="p-4 sm:p-5 rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] font-mono text-xs md:text-sm text-[#111827] dark:text-[#F9FAFB] space-y-2.5 overflow-x-auto">
            <div className="text-zinc-400 dark:text-zinc-500 font-sans text-xs font-semibold uppercase tracking-wider">
              Statutory Friction Schedule (MCX Derivatives)
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              <div>• MCX Turnover Fee: 0.0021%</div>
              <div>• CTT (Sell Side): 0.0125%</div>
              <div>• Stamp Duty (Buy Side): 0.002%</div>
              <div>• SEBI Turnover Fee: ₹10 / Cr (0.0001%)</div>
              <div>• GST on Fees: 18.00%</div>
              <div>• Execution Slippage: 1 Minimum Tick (₹0.50/10g)</div>
            </div>
            <div className="pt-2 border-t border-[#E5E7EB] dark:border-[#27272A] text-[#1E3A8A] dark:text-[#3B82F6] font-bold whitespace-nowrap">
              Round-Trip Cost = ∑(Exchange Fees + CTT + Stamp Duty + Brokerage) × 1.18 + Slippage
            </div>
          </div>
        </section>
      </AnimateIn>

      {/* Disclaimer Box */}
      <AnimateIn delay={0.25}>
        <div className="p-5 sm:p-6 rounded-xl border border-amber-200 dark:border-amber-900/50 bg-amber-50/50 dark:bg-amber-950/20 text-zinc-700 dark:text-zinc-300 space-y-2">
          <div className="flex items-center gap-2 text-amber-700 dark:text-amber-400 font-semibold text-sm">
            <AlertTriangle className="w-4 h-4 shrink-0" />
            Institutional Research &amp; Regulatory Disclaimer
          </div>
          <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed">
            The analytics, volatility surfaces, cointegration z-scores, and walk-forward simulations generated by the AuX Terminal are engineered strictly for quantitative financial research, academic evaluation, and risk surveillance. Backtested returns reflect simulated performance and do not guarantee future profitability. Commodity futures and derivatives trading carries significant market, basis, and liquidity risks.
          </p>
        </div>
      </AnimateIn>
    </div>
  );
};

export default Methodology;
