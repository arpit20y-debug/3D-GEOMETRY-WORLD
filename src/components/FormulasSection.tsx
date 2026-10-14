import React from 'react';
import { Sigma, Info, Sparkles, CheckCircle2 } from 'lucide-react';
import { ShapeData } from '../types/geometry';

interface FormulasSectionProps {
  shape: ShapeData;
}

export const FormulasSection: React.FC<FormulasSectionProps> = ({ shape }) => {
  const { formulas } = shape;

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0b1736]/75 to-slate-900/90 border border-cyan-500/25 p-5 sm:p-7 shadow-xl backdrop-blur-md">
      {/* Title Header */}
      <div className="flex items-center justify-between pb-5 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Sigma className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Mathematical Foundation
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Essential Formulas
            </h3>
          </div>
        </div>
        <span className="text-xs font-mono px-3 py-1 rounded-full bg-cyan-950/70 border border-cyan-500/30 text-cyan-300">
          Standard Metric & SI
        </span>
      </div>

      {/* 3 Main Formula Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-5">
        {/* LSA / CSA */}
        <div className="rounded-xl p-5 bg-gradient-to-b from-slate-950/80 to-[#071329]/90 border border-cyan-500/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-cyan-400 uppercase tracking-wider">
                {formulas.lsa.name}
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Area
              </span>
            </div>

            <div className="my-3 py-3 px-4 bg-cyan-950/40 rounded-xl border border-cyan-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-cyan-300 glow-cyan">
                {formulas.lsa.shortFormula}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {formulas.lsa.meaning}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <strong className="text-cyan-400">Derivation: </strong>
            {formulas.lsa.derivation}
          </div>
        </div>

        {/* TSA */}
        <div className="rounded-xl p-5 bg-gradient-to-b from-slate-950/80 to-[#08152e]/90 border border-blue-500/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-blue-400 uppercase tracking-wider">
                {formulas.tsa.name}
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Total Area
              </span>
            </div>

            <div className="my-3 py-3 px-4 bg-blue-950/40 rounded-xl border border-blue-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-blue-300 glow-blue">
                {formulas.tsa.shortFormula}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {formulas.tsa.meaning}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <strong className="text-blue-400">Derivation: </strong>
            {formulas.tsa.derivation}
          </div>
        </div>

        {/* Volume */}
        <div className="rounded-xl p-5 bg-gradient-to-b from-slate-950/80 to-[#061829]/90 border border-emerald-500/30 shadow-md flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-semibold text-emerald-400 uppercase tracking-wider">
                {formulas.volume.name}
              </span>
              <span className="text-[10px] text-slate-400 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
                Capacity
              </span>
            </div>

            <div className="my-3 py-3 px-4 bg-emerald-950/40 rounded-xl border border-emerald-500/20 text-center">
              <div className="text-2xl sm:text-3xl font-extrabold font-mono text-emerald-300">
                {formulas.volume.shortFormula}
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed mb-3">
              {formulas.volume.meaning}
            </p>
          </div>

          <div className="pt-3 border-t border-slate-800/80 text-[11px] text-slate-400">
            <strong className="text-emerald-400">Derivation: </strong>
            {formulas.volume.derivation}
          </div>
        </div>
      </div>

      {/* Variable Dictionary / Legend */}
      <div className="mt-4 pt-4 border-t border-cyan-500/15">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-300 mb-3 flex items-center gap-1.5">
          <Info className="w-3.5 h-3.5 text-cyan-400" />
          Formula Variables Defined
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-2.5">
          {formulas.variables.map((v) => (
            <div
              key={v.symbol}
              className="p-3 rounded-lg bg-slate-950/60 border border-slate-800/90 flex items-start gap-2.5"
            >
              <span className="px-2 py-1 rounded bg-cyan-950 text-cyan-300 font-mono font-bold text-xs border border-cyan-500/30">
                {v.symbol}
              </span>
              <div>
                <div className="text-xs font-semibold text-white">
                  {v.name} {v.unit ? `(${v.unit})` : ''}
                </div>
                <div className="text-[11px] text-slate-400 mt-0.5 leading-snug">
                  {v.description}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Special Mathematical Notes */}
      {formulas.specialNotes && (
        <div className="mt-4 p-3.5 rounded-xl bg-blue-950/30 border border-blue-500/30 flex items-start gap-2.5 text-xs text-blue-200">
          <Sparkles className="w-4 h-4 text-cyan-400 mt-0.5 shrink-0" />
          <div>
            <strong className="text-cyan-300 font-semibold">Exhibition Key Note: </strong>
            {formulas.specialNotes}
          </div>
        </div>
      )}
    </div>
  );
};
