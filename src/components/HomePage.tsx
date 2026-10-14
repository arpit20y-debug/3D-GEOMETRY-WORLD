import React, { useState } from 'react';
import {
  Sparkles,
  Layers,
  Video,
  Calculator,
  Compass,
  QrCode,
  ArrowRight,
  BookOpen,
  Award,
  Zap,
} from 'lucide-react';
import { ShapeId } from '../types/geometry';
import { SHAPES_LIST } from '../data/shapesData';
import { ShapeCard } from './ShapeCard';
import { getYoutubeEmbedUrl } from '../videoConfig';

interface HomePageProps {
  onSelectShape: (id: ShapeId) => void;
  videoUrls: Record<string, string>;
  onOpenQrModal: () => void;
  onOpenVideoModal: () => void;
  onOpenQuizModal: () => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectShape,
  videoUrls,
  onOpenQrModal,
  onOpenVideoModal,
  onOpenQuizModal,
}) => {
  const [filter, setFilter] = useState<'all' | 'polyhedra' | 'curved'>('all');

  const filteredShapes = SHAPES_LIST.filter((shape) => {
    if (filter === 'polyhedra') {
      return shape.properties.curvedSurfaces === 0;
    }
    if (filter === 'curved') {
      return shape.properties.curvedSurfaces > 0;
    }
    return true;
  });

  return (
    <div className="space-y-12 pb-16">
      {/* Hero Banner Section */}
      <section className="relative pt-10 sm:pt-16 pb-12 sm:pb-16 px-4 sm:px-6 lg:px-8 overflow-hidden text-center">
        {/* Glow orb background accents */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-gradient-to-tr from-cyan-600/15 via-blue-600/20 to-indigo-600/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute top-10 left-10 w-72 h-72 bg-cyan-500/10 rounded-full blur-2xl pointer-events-none" />
        <div className="absolute bottom-10 right-10 w-80 h-80 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />

        <div className="relative z-10 max-w-4xl mx-auto space-y-5">
          {/* Science Exhibition Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-cyan-950/80 border border-cyan-500/40 text-cyan-300 text-xs sm:text-sm font-semibold tracking-wide backdrop-blur-md shadow-lg">
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span>School Science Exhibition Project</span>
          </div>

          {/* Heading */}
          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-black tracking-tight text-white glow-cyan">
            3D GEOMETRY WORLD
          </h1>

          {/* Subtitle */}
          <p className="text-xl sm:text-2xl lg:text-3xl font-bold bg-gradient-to-r from-cyan-300 via-sky-200 to-blue-300 bg-clip-text text-transparent">
            “Explore Shapes. Discover Formulas. Learn in 3D.”
          </p>

          {/* Instruction */}
          <p className="text-sm sm:text-base text-slate-300 max-w-2xl mx-auto font-medium leading-relaxed bg-[#0b1633]/70 p-4 rounded-2xl border border-cyan-500/20 shadow-md">
            “Choose a 3D shape to watch its educational video and explore its properties.”
          </p>

          {/* Key Feature Badges */}
          <div className="pt-2 flex flex-wrap items-center justify-center gap-3 text-xs">
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300">
              <Zap className="w-3.5 h-3.5 text-cyan-400" />
              <span>Rotatable 3D Models</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300">
              <Video className="w-3.5 h-3.5 text-cyan-400" />
              <span>6 Video Lessons</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300">
              <Calculator className="w-3.5 h-3.5 text-cyan-400" />
              <span>Accurate Formulas &amp; Calculators</span>
            </div>
            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-900/80 border border-slate-700/80 text-slate-300">
              <BookOpen className="w-3.5 h-3.5 text-cyan-400" />
              <span>Step-by-Step Examples</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Shapes Showcase Grid */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Controls: Filter Bar */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 pb-6 border-b border-cyan-500/20">
          <div>
            <h2 className="text-xl sm:text-2xl font-bold text-white flex items-center gap-2">
              <Layers className="w-5 h-5 text-cyan-400" />
              <span>Select a 3D Geometric Shape</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">
              Click any card to open its full 3D interactive viewer, video lesson, and formula derivations.
            </p>
          </div>

          {/* Filter Pills */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-900/90 rounded-xl border border-slate-800">
            <button
              onClick={() => setFilter('all')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === 'all'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              All 6 Shapes
            </button>
            <button
              onClick={() => setFilter('polyhedra')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === 'polyhedra'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Polyhedra (Cube, Cuboid)
            </button>
            <button
              onClick={() => setFilter('curved')}
              className={`px-3 py-1 rounded-lg text-xs font-semibold transition-all ${
                filter === 'curved'
                  ? 'bg-cyan-500 text-slate-950 shadow-md font-bold'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              Curved Solids (Cylinder, Cone, Sphere, Hemisphere)
            </button>
          </div>
        </div>

        {/* 6 Shape Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 pt-8">
          {filteredShapes.map((shape) => {
            const hasVideo = Boolean(getYoutubeEmbedUrl(videoUrls[shape.id] || ''));
            return (
              <ShapeCard
                key={shape.id}
                shape={shape}
                onSelect={onSelectShape}
                hasVideo={hasVideo}
              />
            );
          })}
        </div>
      </section>

      {/* Exhibition Stand Card & Quick Video Setup Callout */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Exhibition QR Stand Banner */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#0c1836] to-[#070e24] border border-cyan-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300 mb-4 shadow-[0_0_15px_rgba(6,182,212,0.3)]">
                <QrCode className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Science Exhibition Stand QR Code
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                Print an official exhibition poster card with a scannable QR code so judges, teachers, and students can browse 3D Geometry World right on their smartphones.
              </p>
            </div>
            <button
              onClick={onOpenQrModal}
              className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors flex items-center justify-center gap-2 shadow-lg w-full sm:w-auto self-start"
            >
              <span>View &amp; Print Stand Card</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>

          {/* Exhibition Video Links & Quiz */}
          <div className="p-6 sm:p-7 rounded-3xl bg-gradient-to-br from-[#101a3b] to-[#091124] border border-blue-500/30 flex flex-col justify-between shadow-xl">
            <div>
              <div className="w-10 h-10 rounded-xl bg-blue-500/20 border border-blue-500/40 flex items-center justify-center text-blue-300 mb-4 shadow-[0_0_15px_rgba(59,130,246,0.3)]">
                <Video className="w-5 h-5" />
              </div>
              <h3 className="text-lg font-bold text-white mb-2">
                Your 6 Educational Videos
              </h3>
              <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
                You can easily paste your six YouTube video URLs into <code className="text-cyan-300 font-mono">src/videoConfig.ts</code> or test them live in the browser using the Video Config tool.
              </p>
            </div>
            <div className="flex flex-wrap gap-2.5">
              <button
                onClick={onOpenVideoModal}
                className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 hover:border-cyan-500/40 transition-colors flex items-center justify-center gap-2"
              >
                <span>Open Video Config</span>
              </button>

              <button
                onClick={onOpenQuizModal}
                className="py-2.5 px-4 rounded-xl text-xs font-bold uppercase tracking-wider bg-indigo-600 hover:bg-indigo-500 text-white transition-colors flex items-center justify-center gap-2 shadow-lg"
              >
                <Award className="w-4 h-4" />
                <span>Try Exhibition Quiz</span>
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
