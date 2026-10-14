import React from 'react';
import { Calculator, ArrowRight, CheckCircle, BookOpen } from 'lucide-react';
import { NumericalExampleData } from '../types/geometry';

interface NumericalExampleCardProps {
  example: NumericalExampleData;
  shapeName: string;
}

export const NumericalExampleCard: React.FC<NumericalExampleCardProps> = ({
  example,
  shapeName,
}) => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0d1b3e]/80 to-slate-900/90 border border-cyan-500/25 p-5 sm:p-7 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Step-by-Step Problem Solving
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Understand with an Example
            </h3>
          </div>
        </div>

        {/* Given values badge */}
        <div className="flex flex-wrap items-center gap-2">
          <span className="text-xs text-slate-400 font-medium">Given:</span>
          {example.given.map((g) => (
            <span
              key={g.symbol}
              className="px-2.5 py-1 rounded-lg text-xs font-mono font-semibold bg-cyan-950/80 border border-cyan-500/30 text-cyan-300"
            >
              {g.symbol} = {g.value} {g.unit}
            </span>
          ))}
        </div>
      </div>

      {/* Problem Scenario */}
      <div className="py-4">
        <p className="text-sm sm:text-base text-slate-300 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <strong className="text-cyan-300">Question: </strong>
          {example.scenario}
        </p>
      </div>

      {/* Step by step calculations */}
      <div className="space-y-4 my-2">
        {example.steps.map((step, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/60 border border-cyan-500/15 hover:border-cyan-500/35 transition-all"
          >
            <div className="flex items-center gap-2 mb-2">
              <span className="w-6 h-6 rounded-full bg-cyan-500/20 text-cyan-300 text-xs font-bold flex items-center justify-center border border-cyan-500/30">
                {idx + 1}
              </span>
              <h4 className="text-sm font-semibold text-slate-200">
                {step.label}
              </h4>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-3 pt-2 text-xs sm:text-sm font-mono">
              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider font-sans text-slate-500 block mb-1">
                  Formula
                </span>
                <span className="text-cyan-300 font-semibold">{step.formula}</span>
              </div>

              <div className="bg-slate-900/90 p-2.5 rounded-lg border border-slate-800">
                <span className="text-[10px] uppercase tracking-wider font-sans text-slate-500 block mb-1">
                  Substitution
                </span>
                <span className="text-slate-300">{step.substitution}</span>
              </div>

              <div className="bg-cyan-950/50 p-2.5 rounded-lg border border-cyan-500/40 flex items-center justify-between">
                <div>
                  <span className="text-[10px] uppercase tracking-wider font-sans text-cyan-400 block mb-1">
                    Final Result
                  </span>
                  <span className="text-base font-bold text-white font-mono">{step.result}</span>
                </div>
                <CheckCircle className="w-5 h-5 text-cyan-400" />
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Conclusion */}
      <div className="mt-4 p-3.5 rounded-xl bg-gradient-to-r from-cyan-950/50 via-slate-900/50 to-blue-950/50 border border-cyan-500/20 flex items-start gap-2.5">
        <CheckCircle className="w-5 h-5 text-cyan-400 mt-0.5 shrink-0" />
        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
          <strong className="text-white">Summary: </strong>
          {example.conclusion}
        </p>
      </div>
    </div>
  );
};
