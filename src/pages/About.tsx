import React from 'react';
import { Award, Code2, Users, Cpu, ShieldCheck } from 'lucide-react';
import AnimateIn from '../components/ui/AnimateIn';
import useDocumentTitle from '../hooks/useDocumentTitle';

export const About: React.FC = () => {
  useDocumentTitle('About Us | AuX Terminal');
  const teamMembers = [
    {
      initials: 'KR',
      name: 'Krish Raj',
      role: 'Lead Architect & Quant Engineer',
      focus:
        'System architecture, cointegration z-score modeling, walk-forward simulation engine, and session surveillance cryptography.',
    },
    {
      initials: 'AT',
      name: 'Ananya Tiwari',
      role: 'Quant Strategist & Frontend Engineer',
      focus:
        'Volatility skew mapping, pairwise spread analytics, high-density visualization, and minimalist financial interface design.',
    },
    {
      initials: 'KK',
      name: 'Kajal Kumari',
      role: 'Financial Data & Systems Engineer',
      focus:
        'MCX exchange telemetry normalization, contract lifecycle pipelines, and regulatory transaction friction models.',
    },
  ];

  return (
    <div className="max-w-5xl mx-auto space-y-16 py-8">
      {/* Hero Section */}
      <AnimateIn>
        <div className="max-w-3xl space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-mono border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] text-zinc-600 dark:text-zinc-400">
            <Users className="w-3.5 h-3.5 text-[#1E3A8A] dark:text-[#3B82F6]" />
            Engineering Team &amp; Mission
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
            About AuX
          </h1>
          <p className="text-base sm:text-lg text-zinc-600 dark:text-zinc-400 leading-relaxed font-normal">
            AuX was built to resolve structural pricing inefficiencies across physical gold flows and multi-tenor financial futures. Engineered with institutional rigor, the terminal bridges mathematical purity normalization with deterministic execution algorithms.
          </p>
        </div>
      </AnimateIn>

      {/* Team Section (3-Column Grid) */}
      <AnimateIn delay={0.1}>
        <div className="space-y-6">
          <div>
            <h2 className="text-2xl font-bold tracking-tight text-[#111827] dark:text-[#F9FAFB]">
              Core Development Team
            </h2>
            <p className="text-sm text-zinc-500 dark:text-zinc-400">
              Quantitative researchers and software engineers behind the AuX Terminal
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {teamMembers.map((member) => (
              <div
                key={member.name}
                className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-5 sm:p-6 space-y-4 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]"
              >
                {/* Circular Avatar Placeholder with Initials */}
                <div className="w-14 h-14 rounded-full border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center justify-center font-bold text-lg font-mono text-[#1E3A8A] dark:text-[#3B82F6] shadow-sm">
                  {member.initials}
                </div>

                <div className="space-y-1">
                  <h3 className="text-lg font-bold text-[#111827] dark:text-[#F9FAFB]">
                    {member.name}
                  </h3>
                  <div className="text-xs font-semibold text-[#1E3A8A] dark:text-[#3B82F6] font-mono">
                    {member.role}
                  </div>
                </div>

                <p className="text-xs text-zinc-600 dark:text-zinc-400 leading-relaxed pt-2 border-t border-[#E5E7EB] dark:border-[#27272A]">
                  {member.focus}
                </p>
              </div>
            ))}
          </div>
        </div>
      </AnimateIn>

      {/* HACK IN HILLS '26 — PS 03 Section */}
      <AnimateIn delay={0.15}>
        <div className="rounded-xl border border-[#E5E7EB] dark:border-[#27272A] bg-[#F9FAFB] dark:bg-[#18181B] p-5 sm:p-8 space-y-6 transition-all duration-200 hover:-translate-y-0.5 hover:border-[#1E3A8A] dark:hover:border-[#3B82F6]">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-[#E5E7EB] dark:border-[#27272A]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-lg bg-amber-100 dark:bg-amber-950/60 flex items-center justify-center text-amber-600 dark:text-amber-400">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <span className="text-[11px] font-mono font-semibold uppercase tracking-wider text-amber-600 dark:text-amber-400">
                  National Hackathon Submission
                </span>
                <h2 className="text-xl font-bold text-[#111827] dark:text-[#F9FAFB]">
                  HACK IN HILLS &apos;26 — Problem Statement 03
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-mono font-medium border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] text-zinc-700 dark:text-zinc-300">
                Category: Quantitative FinTech &amp; Web3
              </span>
            </div>
          </div>

          <div className="space-y-4 text-sm text-zinc-600 dark:text-zinc-400 leading-relaxed">
            <p>
              Under <strong>Problem Statement 03</strong>, the objective was to engineer an institutional-grade Commodity Derivatives Intelligence Terminal capable of processing domestic Indian commodity contracts (MCX) alongside international benchmarks (COMEX).
            </p>
            <p>
              AuX solves key structural hurdles in Indian commodity markets:
            </p>
            <ul className="grid grid-cols-1 md:grid-cols-2 gap-3 pt-2 text-xs font-mono">
              <li className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center gap-2">
                <Cpu className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] shrink-0" />
                <span>Deterministic Walk-Forward Simulation</span>
              </li>
              <li className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center gap-2">
                <ShieldCheck className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] shrink-0" />
                <span>Exchange &amp; Statutory Friction Model (CTT/GST)</span>
              </li>
              <li className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center gap-2">
                <Code2 className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] shrink-0" />
                <span>Purity Normalization (995 vs 999 Fineness)</span>
              </li>
              <li className="p-3 rounded-lg border border-[#E5E7EB] dark:border-[#27272A] bg-white dark:bg-[#09090B] flex items-center gap-2">
                <Award className="w-4 h-4 text-[#1E3A8A] dark:text-[#3B82F6] shrink-0" />
                <span>Institutional Client-Side Audit Surveillance</span>
              </li>
            </ul>
          </div>
        </div>
      </AnimateIn>
    </div>
  );
};

export default About;
