import React, { useState, useEffect } from 'react';
import {
  ArrowLeft,
  Home,
  ChevronLeft,
  ChevronRight,
  Sparkles,
  Layers,
  Sigma,
  Video,
  BookOpen,
  Sliders,
  Share2,
} from 'lucide-react';
import { ShapeData, ShapeId } from '../types/geometry';
import { SHAPES_LIST, SHAPES_DATA } from '../data/shapesData';
import { ThreeShapeViewer } from './ThreeShapeViewer';
import { VideoPlayer } from './VideoPlayer';
import { PropertiesSection } from './PropertiesSection';
import { FormulasSection } from './FormulasSection';
import { NumericalExampleCard } from './NumericalExampleCard';
import { InteractiveCalculatorCard } from './InteractiveCalculatorCard';
import { RealLifeExamplesSection } from './RealLifeExamplesSection';

interface ShapeDetailPageProps {
  shapeId: ShapeId;
  videoUrl: string;
  onNavigateHome: () => void;
  onSelectShape: (shapeId: ShapeId) => void;
  onUpdateVideoUrl?: (newUrl: string) => void;
}

export const ShapeDetailPage: React.FC<ShapeDetailPageProps> = ({
  shapeId,
  videoUrl,
  onNavigateHome,
  onSelectShape,
  onUpdateVideoUrl,
}) => {
  const shape = SHAPES_DATA[shapeId] || SHAPES_DATA.cube;
  const [customScale, setCustomScale] = useState<Record<string, number>>({});

  // Scroll to top when shape changes
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    setCustomScale({});
  }, [shapeId]);

  // Next / Previous shape navigation
  const currentIndex = SHAPES_LIST.findIndex((s) => s.id === shapeId);
  const prevShape = SHAPES_LIST[(currentIndex - 1 + SHAPES_LIST.length) % SHAPES_LIST.length];
  const nextShape = SHAPES_LIST[(currentIndex + 1) % SHAPES_LIST.length];

  return (
    <div className="min-h-screen pb-20">
      {/* Top Navigation & Breadcrumbs Bar */}
      <div className="sticky top-0 z-30 bg-[#070d1e]/90 backdrop-blur-md border-b border-cyan-500/20 py-3.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3">
          {/* Navigation Buttons: Back to All Shapes & Home */}
          <div className="flex items-center gap-2 sm:gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-slate-800/80 hover:bg-slate-700/80 text-slate-200 hover:text-white border border-slate-700 hover:border-cyan-500/40 transition-all shadow-sm"
            >
              <ArrowLeft className="w-4 h-4 text-cyan-400" />
              <span>Back to All Shapes</span>
            </button>

            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs sm:text-sm font-semibold bg-cyan-950/60 hover:bg-cyan-900/60 text-cyan-300 hover:text-cyan-200 border border-cyan-500/30 transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Home</span>
            </button>
          </div>

          {/* Quick Shape Selector Pills */}
          <div className="flex items-center gap-1 overflow-x-auto py-1 scrollbar-none">
            {SHAPES_LIST.map((s) => (
              <button
                key={s.id}
                onClick={() => onSelectShape(s.id)}
                className={`px-2.5 py-1 rounded-lg text-xs font-semibold whitespace-nowrap transition-all ${
                  s.id === shapeId
                    ? 'bg-cyan-500 text-slate-950 shadow-[0_0_12px_rgba(6,182,212,0.5)] font-bold'
                    : 'text-slate-400 hover:text-slate-200 hover:bg-slate-800/60'
                }`}
              >
                {s.name}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Main Content Container */}
      <div className="max-w-7xl mx-auto px-4 sm:px-8 pt-6 sm:pt-8 space-y-8">
        {/* Shape Hero Title & Definition */}
        <div className="p-6 sm:p-8 rounded-3xl bg-gradient-to-r from-slate-900/95 via-[#0b1b3e]/85 to-slate-900/95 border border-cyan-500/30 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-96 h-96 bg-cyan-500/10 rounded-full blur-3xl pointer-events-none" />
          
          <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-6">
            <div className="max-w-3xl">
              <div className="flex items-center gap-2 mb-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold tracking-wider uppercase bg-cyan-950 text-cyan-300 border border-cyan-500/30">
                  {shape.category}
                </span>
                <span className="text-xs text-slate-400">
                  3D Geometry Exhibition
                </span>
              </div>

              <h1 className="text-3xl sm:text-5xl font-black tracking-tight text-white glow-cyan">
                {shape.name.toUpperCase()}
              </h1>

              <p className="text-base sm:text-lg font-medium text-cyan-200/90 mt-2">
                {shape.tagline}
              </p>

              <p className="text-sm sm:text-base text-slate-300 mt-4 leading-relaxed bg-slate-950/40 p-4 rounded-xl border border-slate-800/80">
                <strong className="text-white">Definition: </strong>
                {shape.definition}
              </p>
            </div>

            {/* Quick Stats Pill Panel */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2.5 bg-slate-950/80 p-4 rounded-2xl border border-cyan-500/20 shrink-0 text-center">
              <div className="p-2">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Faces</span>
                <span className="text-xl font-bold font-mono text-cyan-300">{shape.properties.faces}</span>
              </div>
              <div className="p-2">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Edges</span>
                <span className="text-xl font-bold font-mono text-blue-300">{shape.properties.edges}</span>
              </div>
              <div className="p-2">
                <span className="text-[10px] uppercase text-slate-400 block font-semibold">Vertices</span>
                <span className="text-xl font-bold font-mono text-indigo-300">{shape.properties.vertices}</span>
              </div>
              <div className="col-span-2 sm:col-span-3 pt-2 border-t border-slate-800 text-[11px] text-cyan-400/90 font-mono">
                Formula: {shape.formulas.volume.shortFormula}
              </div>
            </div>
          </div>
        </div>

        {/* 3D Model & Video Dual Stage */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Left Column: Interactive 3D Model Studio */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-cyan-400" />
                <span>Interactive 3D Model Studio</span>
              </h2>
              <span className="text-xs text-slate-400 font-mono">
                360° Realtime View
              </span>
            </div>

            <ThreeShapeViewer
              shapeId={shape.id}
              height="450px"
              autoRotateDefault={true}
              interactiveControls={true}
              customScale={customScale}
            />

            <p className="text-xs text-slate-400 text-center">
              💡 Drag with mouse or finger to rotate • Scroll to zoom • Use controls above to switch wireframe
            </p>
          </div>

          {/* Right Column: Educational Video Section */}
          <div className="space-y-3">
            <div className="flex items-center justify-between px-1">
              <h2 className="text-lg font-bold text-white flex items-center gap-2">
                <Video className="w-5 h-5 text-cyan-400" />
                <span>Educational Video Lesson</span>
              </h2>
              <span className="text-xs text-slate-400">
                16:9 HD Player
              </span>
            </div>

            <VideoPlayer
              rawUrl={videoUrl}
              shapeName={shape.name}
              onUpdateUrl={onUpdateVideoUrl}
            />

            <div className="p-3 rounded-xl bg-slate-900/60 border border-slate-800 text-xs text-slate-300 flex items-center gap-2">
              <BookOpen className="w-4 h-4 text-cyan-400 shrink-0" />
              <span>
                Watch the video to understand geometric derivation, cross-sections, and real applications.
              </span>
            </div>
          </div>
        </div>

        {/* Geometric Properties Section */}
        <PropertiesSection
          properties={shape.properties}
          shapeName={shape.name}
        />

        {/* Accurate Mathematical Formulas */}
        <FormulasSection shape={shape} />

        {/* Optional "Understand with an Example" Section */}
        <NumericalExampleCard
          example={shape.numericalExample}
          shapeName={shape.name}
        />

        {/* Dynamic Science Lab Dimension Calculator (Interactive) */}
        <InteractiveCalculatorCard
          shape={shape}
          onScaleChange={setCustomScale}
        />

        {/* Real-Life Everyday Examples */}
        <RealLifeExamplesSection
          examples={shape.realLifeExamples}
          shapeName={shape.name}
        />

        {/* Bottom Navigation Buttons & Previous/Next Links */}
        <div className="pt-8 border-t border-cyan-500/20 flex flex-col sm:flex-row items-center justify-between gap-4">
          <button
            onClick={() => onSelectShape(prevShape.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs font-semibold"
          >
            <ChevronLeft className="w-4 h-4 text-cyan-400" />
            <span>Previous: {prevShape.name}</span>
          </button>

          <div className="flex items-center gap-3">
            <button
              onClick={onNavigateHome}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-slate-950 font-bold text-xs uppercase tracking-wider shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all"
            >
              <Home className="w-4 h-4" />
              <span>Back to All Shapes</span>
            </button>
          </div>

          <button
            onClick={() => onSelectShape(nextShape.id)}
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-slate-300 hover:text-white border border-slate-700 transition-all text-xs font-semibold"
          >
            <span>Next: {nextShape.name}</span>
            <ChevronRight className="w-4 h-4 text-cyan-400" />
          </button>
        </div>
      </div>
    </div>
  );
};
