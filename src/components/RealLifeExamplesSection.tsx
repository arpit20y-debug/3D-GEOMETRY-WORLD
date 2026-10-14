import React from 'react';
import { Compass, Sparkles } from 'lucide-react';
import { RealLifeExample } from '../types/geometry';

interface RealLifeExamplesSectionProps {
  examples: RealLifeExample[];
  shapeName: string;
}

export const RealLifeExamplesSection: React.FC<RealLifeExamplesSectionProps> = ({
  examples,
  shapeName,
}) => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0a1636]/75 to-slate-900/90 border border-cyan-500/25 p-5 sm:p-7 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Compass className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Applications & Everyday Life
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Real-Life Examples of {shapeName}
            </h3>
          </div>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          Everyday Physics
        </span>
      </div>

      <p className="text-xs sm:text-sm text-slate-300 my-4 leading-relaxed">
        Geometry isn&apos;t just textbook theory—3D shapes form the physical structure of everyday consumer objects, architecture, nature, and engineering:
      </p>

      {/* Examples Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {examples.map((item, idx) => (
          <div
            key={idx}
            className="p-4 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/40 hover:shadow-[0_4px_20px_rgba(6,182,212,0.15)] transition-all group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between mb-3">
                <span className="text-3xl p-2 rounded-xl bg-slate-900 border border-slate-800 group-hover:scale-110 transition-transform">
                  {item.emoji}
                </span>
                <span className="text-[10px] font-semibold uppercase tracking-wider text-cyan-400/90 bg-cyan-950/60 px-2 py-0.5 rounded border border-cyan-500/20">
                  {item.category}
                </span>
              </div>
              <h4 className="text-sm font-bold text-white group-hover:text-cyan-300 transition-colors">
                {item.name}
              </h4>
              <p className="text-xs text-slate-400 mt-1.5 leading-relaxed">
                {item.description}
              </p>
            </div>

            <div className="mt-3 pt-2 border-t border-slate-900 flex items-center gap-1 text-[11px] text-cyan-400/80">
              <Sparkles className="w-3 h-3 text-cyan-400" />
              <span>Natural 3D geometry</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
