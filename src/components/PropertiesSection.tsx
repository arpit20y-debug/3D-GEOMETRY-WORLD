import React from 'react';
import { Layers, ShieldCheck, Box, CircleDot, Milestone } from 'lucide-react';
import { ShapeProperties } from '../types/geometry';

interface PropertiesSectionProps {
  properties: ShapeProperties;
  shapeName: string;
}

export const PropertiesSection: React.FC<PropertiesSectionProps> = ({
  properties,
  shapeName,
}) => {
  return (
    <div className="w-full rounded-2xl bg-gradient-to-br from-slate-900/90 via-[#0c1836]/80 to-slate-900/90 border border-cyan-500/25 p-5 sm:p-7 shadow-xl backdrop-blur-md">
      {/* Header */}
      <div className="flex items-center justify-between pb-5 border-b border-cyan-500/20">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.2)]">
            <Layers className="w-5 h-5" />
          </div>
          <div>
            <span className="text-xs font-semibold tracking-wider uppercase text-cyan-400">
              Anatomy & Topology
            </span>
            <h3 className="text-lg sm:text-xl font-bold text-white">
              Geometric Properties
            </h3>
          </div>
        </div>
        <span className="text-xs text-slate-400 bg-slate-800/80 px-3 py-1 rounded-full border border-slate-700">
          3D Attributes
        </span>
      </div>

      {/* Grid of Key Numerical Counts */}
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3 my-5">
        {/* Faces */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Faces
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-cyan-300 font-mono">
            {properties.faces}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Total Surfaces</span>
        </div>

        {/* Edges */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Edges
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-blue-300 font-mono">
            {properties.edges}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Boundary lines</span>
        </div>

        {/* Vertices */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Vertices
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-indigo-300 font-mono">
            {properties.vertices}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Corner points</span>
        </div>

        {/* Curved Surfaces */}
        <div className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Curved Surfaces
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-teal-300 font-mono">
            {properties.curvedSurfaces}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Smooth skins</span>
        </div>

        {/* Circular Bases */}
        <div className="col-span-2 sm:col-span-1 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 text-center flex flex-col justify-center">
          <span className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold mb-1">
            Circular Bases
          </span>
          <span className="text-2xl sm:text-3xl font-extrabold text-sky-300 font-mono">
            {properties.circularBases}
          </span>
          <span className="text-[10px] text-slate-500 mt-1">Flat circles</span>
        </div>
      </div>

      {/* Face Description */}
      {properties.faceDescription && (
        <div className="p-3 rounded-xl bg-slate-950/60 border border-slate-800 text-xs sm:text-sm text-slate-300 flex items-center gap-2 mb-4">
          <Box className="w-4 h-4 text-cyan-400 shrink-0" />
          <span>
            <strong className="text-white">Face Composition: </strong>
            {properties.faceDescription}
          </span>
        </div>
      )}

      {/* Summary Bullet Points */}
      <div className="space-y-2 pt-2">
        <h4 className="text-xs font-semibold uppercase tracking-wider text-slate-400 mb-2">
          Key Geometric Rules
        </h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
          {properties.summaryPoints.map((pt, i) => (
            <div
              key={i}
              className="p-3 rounded-lg bg-slate-950/50 border border-slate-800/80 flex items-start gap-2.5 text-xs text-slate-300"
            >
              <ShieldCheck className="w-4 h-4 text-cyan-400 shrink-0 mt-0.5" />
              <span>{pt}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
