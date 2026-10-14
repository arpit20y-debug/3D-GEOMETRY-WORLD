import React from 'react';
import { X, Table, Sparkles, Printer, CheckCircle } from 'lucide-react';
import { SHAPES_LIST } from '../data/shapesData';

interface FormulaCheatsheetModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const FormulaCheatsheetModal: React.FC<FormulaCheatsheetModalProps> = ({
  isOpen,
  onClose,
}) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-5xl rounded-3xl bg-[#091124] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative max-h-[92vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Table className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Science Exhibition Cheatsheet
            </span>
            <h3 className="text-xl sm:text-2xl font-bold text-white">
              Master 3D Formulas & Geometry Reference
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 mb-5 leading-relaxed">
          Comprehensive comparison of all 6 core 3D geometric shapes, their topological properties, and exact mathematical formulas.
        </p>

        {/* Responsive Table */}
        <div className="overflow-x-auto rounded-2xl border border-cyan-500/25 bg-slate-950/80 shadow-inner">
          <table className="w-full text-left text-xs sm:text-sm">
            <thead className="bg-slate-900/90 text-cyan-400 uppercase text-[11px] font-bold tracking-wider border-b border-cyan-500/20">
              <tr>
                <th className="py-3 px-4">Shape</th>
                <th className="py-3 px-3 text-center">F / E / V</th>
                <th className="py-3 px-4">Curved / Lat. Area</th>
                <th className="py-3 px-4">Total Surface Area</th>
                <th className="py-3 px-4">Volume</th>
                <th className="py-3 px-4 hidden md:table-cell">Key Variable(s)</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 font-mono">
              {SHAPES_LIST.map((shape) => (
                <tr key={shape.id} className="hover:bg-slate-900/50 transition-colors">
                  <td className="py-3 px-4 font-sans font-bold text-white">
                    <div className="flex items-center gap-2">
                      <span className="w-2 h-2 rounded-full bg-cyan-400" />
                      <span>{shape.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-3 text-center text-slate-300">
                    <span className="text-cyan-300 font-bold">{shape.properties.faces}</span> /{' '}
                    <span className="text-blue-300">{shape.properties.edges}</span> /{' '}
                    <span className="text-indigo-300">{shape.properties.vertices}</span>
                  </td>
                  <td className="py-3 px-4 text-cyan-300 font-bold">
                    {shape.formulas.lsa.shortFormula}
                  </td>
                  <td className="py-3 px-4 text-blue-300 font-bold">
                    {shape.formulas.tsa.shortFormula}
                  </td>
                  <td className="py-3 px-4 text-emerald-300 font-bold">
                    {shape.formulas.volume.shortFormula}
                  </td>
                  <td className="py-3 px-4 text-slate-400 font-sans text-xs hidden md:table-cell">
                    {shape.formulas.variables.map((v) => v.symbol).join(', ')}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Legend */}
        <div className="mt-4 p-3 rounded-xl bg-slate-900/50 border border-slate-800 flex flex-wrap items-center justify-between gap-3 text-xs text-slate-400">
          <div className="flex items-center gap-4">
            <span><strong className="text-white">F:</strong> Faces</span>
            <span><strong className="text-white">E:</strong> Edges</span>
            <span><strong className="text-white">V:</strong> Vertices</span>
            <span><strong className="text-cyan-300">π:</strong> 22/7 (≈ 3.14159)</span>
          </div>

          <button
            onClick={() => window.print()}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs font-semibold"
          >
            <Printer className="w-3.5 h-3.5" />
            <span>Print Cheatsheet</span>
          </button>
        </div>
      </div>
    </div>
  );
};
