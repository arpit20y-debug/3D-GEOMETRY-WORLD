import React, { useState } from 'react';
import { Sliders, RotateCcw, Zap } from 'lucide-react';
import { ShapeData } from '../types/geometry';

interface InteractiveCalculatorCardProps {
  shape: ShapeData;
  onScaleChange?: (params: Record<string, number>) => void;
}

export const InteractiveCalculatorCard: React.FC<InteractiveCalculatorCardProps> = ({
  shape,
  onScaleChange,
}) => {
  // Initialize parameter values
  const [params, setParams] = useState<Record<string, number>>(() => {
    const init: Record<string, number> = {};
    shape.calculator.params.forEach((p) => {
      init[p.symbol] = p.defaultValue;
    });
    return init;
  });

  const handleSliderChange = (symbol: string, value: number) => {
    const updated = { ...params, [symbol]: value };
    setParams(updated);
    if (onScaleChange) {
      onScaleChange(updated);
    }
  };

  const resetParams = () => {
    const init: Record<string, number> = {};
    shape.calculator.params.forEach((p) => {
      init[p.symbol] = p.defaultValue;
    });
    setParams(init);
    if (onScaleChange) {
      onScaleChange(init);
    }
  };

  const results = shape.calculator.calculate(params);

  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0a1533]/80 to-slate-900/90 border border-blue-500/25 p-5 sm:p-7 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-blue-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-blue-500/15 border border-blue-500/30 flex items-center justify-center text-blue-400 shadow-[0_0_15px_rgba(59,130,246,0.2)]">
            <Sliders className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-blue-400 flex items-center gap-1">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              Live Science Lab
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Dynamic Dimension Calculator
            </h3>
          </div>
        </div>

        <button
          onClick={resetParams}
          className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium text-slate-300 hover:text-white bg-slate-800/80 hover:bg-slate-700/80 border border-slate-700 transition-colors"
          title="Reset to default dimensions"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <p className="text-xs text-slate-400 mt-2 mb-4">
        Adjust the sliders below. Notice how the values and the 3D model above adapt simultaneously in real-time!
      </p>

      {/* Sliders Area */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 my-3">
        {shape.calculator.params.map((p) => {
          const val = params[p.symbol] ?? p.defaultValue;
          return (
            <div
              key={p.symbol}
              className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 hover:border-cyan-500/30 transition-colors"
            >
              <div className="flex justify-between items-center mb-2">
                <label className="text-xs font-medium text-slate-300">
                  {p.label}
                </label>
                <span className="px-2.5 py-0.5 rounded-md text-xs font-mono font-bold bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {val} {p.unit}
                </span>
              </div>
              <input
                type="range"
                min={p.min}
                max={p.max}
                step={p.step}
                value={val}
                onChange={(e) => handleSliderChange(p.symbol, parseFloat(e.target.value))}
                className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-cyan-400 focus:outline-none"
              />
              <div className="flex justify-between text-[10px] text-slate-500 mt-1 font-mono">
                <span>{p.min} {p.unit}</span>
                <span>{p.max} {p.unit}</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Calculated Results Display */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-3">
        {/* LSA/CSA */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-cyan-500/30 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-medium text-cyan-400 uppercase tracking-wide block">
              {results.lsa.label}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block mb-1">
              Formula: {results.lsa.formula}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">
            {results.lsa.value} <span className="text-xs font-sans text-cyan-300">{results.lsa.unit}</span>
          </div>
        </div>

        {/* TSA */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-blue-500/30 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-medium text-blue-400 uppercase tracking-wide block">
              {results.tsa.label}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block mb-1">
              Formula: {results.tsa.formula}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">
            {results.tsa.value} <span className="text-xs font-sans text-blue-300">{results.tsa.unit}</span>
          </div>
        </div>

        {/* Volume */}
        <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-slate-950 border border-emerald-500/30 flex flex-col justify-between">
          <div>
            <span className="text-[11px] font-medium text-emerald-400 uppercase tracking-wide block">
              {results.volume.label}
            </span>
            <span className="text-[10px] font-mono text-slate-500 block mb-1">
              Formula: {results.volume.formula}
            </span>
          </div>
          <div className="text-2xl font-bold font-mono text-white mt-2">
            {results.volume.value} <span className="text-xs font-sans text-emerald-300">{results.volume.unit}</span>
          </div>
        </div>
      </div>

      {results.secondary && (
        <div className="mt-3 p-2.5 rounded-lg bg-slate-950/80 border border-slate-800 text-xs flex items-center justify-between text-slate-400">
          <span>{results.secondary.label}</span>
          <span className="font-mono font-bold text-slate-200">
            {results.secondary.value} {results.secondary.unit || ''}
          </span>
        </div>
      )}
    </div>
  );
};
