import React from 'react';
import { ArrowRight, Sparkles, PlayCircle, Layers } from 'lucide-react';
import { ShapeData } from '../types/geometry';
import { ThreeShapeViewer } from './ThreeShapeViewer';

interface ShapeCardProps {
  shape: ShapeData;
  onSelect: (shapeId: ShapeData['id']) => void;
  hasVideo: boolean;
}

export const ShapeCard: React.FC<ShapeCardProps> = ({
  shape,
  onSelect,
  hasVideo,
}) => {
  return (
    <div
      onClick={() => onSelect(shape.id)}
      className="glow-card rounded-2xl overflow-hidden cursor-pointer flex flex-col justify-between group p-5 border border-cyan-500/20 hover:border-cyan-400/50 transition-all duration-300"
    >
      <div>
        {/* Card Header */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-[11px] font-semibold tracking-wider uppercase text-cyan-400 bg-cyan-950/80 px-2.5 py-1 rounded-full border border-cyan-500/30">
            {shape.category.split('/')[0].trim()}
          </span>

          {hasVideo ? (
            <span className="inline-flex items-center gap-1 text-[11px] text-emerald-300 font-medium bg-emerald-950/70 px-2 py-0.5 rounded-full border border-emerald-500/30">
              <PlayCircle className="w-3 h-3 text-emerald-400" />
              Video Ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 text-[11px] text-slate-400 bg-slate-900/60 px-2 py-0.5 rounded-full border border-slate-800">
              Video Available
            </span>
          )}
        </div>

        {/* 3D Visual Preview Area */}
        <div className="w-full my-2 relative">
          <ThreeShapeViewer
            shapeId={shape.id}
            height="210px"
            autoRotateDefault={true}
            interactiveControls={false}
            compact={true}
          />
          <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded bg-slate-950/80 backdrop-blur-sm border border-slate-800 text-[10px] text-slate-400 pointer-events-none">
            Touch to interact
          </div>
        </div>

        {/* Shape Name & Short Description */}
        <div className="mt-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-extrabold text-white group-hover:text-cyan-300 transition-colors flex items-center gap-2">
              {shape.name}
            </h3>
            <span className="text-xs font-mono text-cyan-400/80 bg-slate-900 px-2 py-0.5 rounded border border-slate-800">
              {shape.properties.faces} {shape.properties.faces === 1 ? 'Surface' : 'Surfaces'}
            </span>
          </div>

          <p className="text-xs text-slate-300 line-clamp-2 mt-2 leading-relaxed">
            {shape.definition}
          </p>
        </div>

        {/* Quick Attribute Pills */}
        <div className="flex flex-wrap gap-1.5 my-3 pt-2 border-t border-slate-800/80">
          <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[11px] font-mono text-cyan-300 border border-cyan-500/20">
            TSA: {shape.formulas.tsa.shortFormula}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[11px] font-mono text-blue-300 border border-blue-500/20">
            V: {shape.formulas.volume.shortFormula}
          </span>
          <span className="px-2 py-0.5 rounded-md bg-slate-950 text-[11px] font-mono text-slate-400 border border-slate-800">
            Edges: {shape.properties.edges}
          </span>
        </div>
      </div>

      {/* Explore Shape Action Button */}
      <div className="mt-2 pt-3 border-t border-slate-800/60">
        <button
          onClick={(e) => {
            e.stopPropagation();
            onSelect(shape.id);
          }}
          className="w-full py-2.5 px-4 rounded-xl font-semibold text-xs tracking-wide uppercase bg-gradient-to-r from-cyan-600 via-cyan-500 to-blue-600 hover:from-cyan-500 hover:via-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.3)] group-hover:shadow-[0_0_25px_rgba(6,182,212,0.5)] transition-all flex items-center justify-center gap-2"
        >
          <span>Explore Shape</span>
          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
        </button>
      </div>
    </div>
  );
};
