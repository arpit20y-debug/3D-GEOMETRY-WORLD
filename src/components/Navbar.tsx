import React from 'react';
import {
  Box,
  QrCode,
  Video,
  Table,
  Award,
  Sparkles,
  ExternalLink,
} from 'lucide-react';
import { ShapeId } from '../types/geometry';
import { SHAPES_LIST } from '../data/shapesData';

interface NavbarProps {
  currentShapeId?: ShapeId | null;
  onSelectShape: (id: ShapeId) => void;
  onNavigateHome: () => void;
  onOpenQrModal: () => void;
  onOpenVideoModal: () => void;
  onOpenCheatsheetModal: () => void;
  onOpenQuizModal: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  currentShapeId,
  onSelectShape,
  onNavigateHome,
  onOpenQrModal,
  onOpenVideoModal,
  onOpenCheatsheetModal,
  onOpenQuizModal,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-[#070d1e]/90 backdrop-blur-xl border-b border-cyan-500/20 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-4">
        {/* Brand / Logo */}
        <button
          onClick={onNavigateHome}
          className="flex items-center gap-2.5 text-left group focus:outline-none"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-cyan-600 via-blue-600 to-indigo-600 flex items-center justify-center text-white shadow-[0_0_20px_rgba(6,182,212,0.5)] group-hover:shadow-[0_0_30px_rgba(6,182,212,0.8)] transition-all">
            <Box className="w-5 h-5 group-hover:rotate-12 transition-transform duration-300" />
          </div>
          <div>
            <div className="text-base sm:text-lg font-black tracking-wider text-white flex items-center gap-1.5">
              <span>3D GEOMETRY WORLD</span>
              <span className="hidden sm:inline-block w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(6,182,212,0.9)]" />
            </div>
            <div className="text-[10px] text-cyan-400 font-medium tracking-wide">
              School Science Exhibition
            </div>
          </div>
        </button>

        {/* Action Controls & Modal Triggers */}
        <div className="flex items-center gap-2 sm:gap-2.5">
          {/* Quick Cheatsheet Modal */}
          <button
            onClick={onOpenCheatsheetModal}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
            title="View All Formulas Cheatsheet"
          >
            <Table className="w-4 h-4 text-cyan-400" />
            <span className="hidden md:inline">Cheatsheet</span>
          </button>

          {/* Exhibition Quiz */}
          <button
            onClick={onOpenQuizModal}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-indigo-950/50 hover:bg-indigo-900/50 text-indigo-200 hover:text-white border border-indigo-500/30 hover:border-indigo-400 transition-colors flex items-center gap-1.5"
            title="Interactive Quiz Challenge"
          >
            <Award className="w-4 h-4 text-indigo-400" />
            <span className="hidden md:inline">Quiz</span>
          </button>

          {/* Video URL Config Modal */}
          <button
            onClick={onOpenVideoModal}
            className="p-2 sm:px-3 sm:py-1.5 rounded-xl text-xs font-semibold bg-slate-900/80 hover:bg-slate-800 text-slate-300 hover:text-cyan-300 border border-slate-700/80 hover:border-cyan-500/40 transition-colors flex items-center gap-1.5"
            title="Configure Educational Video URLs"
          >
            <Video className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Videos Config</span>
          </button>

          {/* QR Code Science Exhibition Stand Button */}
          <button
            onClick={onOpenQrModal}
            className="py-1.5 px-3 sm:px-3.5 rounded-xl text-xs font-bold uppercase tracking-wider bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-slate-950 shadow-[0_0_15px_rgba(6,182,212,0.4)] transition-all flex items-center gap-1.5"
          >
            <QrCode className="w-4 h-4" />
            <span className="hidden sm:inline">Exhibition QR</span>
          </button>
        </div>
      </div>
    </header>
  );
};
