import React from 'react';
import { Box, Sparkles, QrCode, Video, Table } from 'lucide-react';
import { ShapeId } from '../types/geometry';
import { SHAPES_LIST } from '../data/shapesData';

interface FooterProps {
  onSelectShape: (id: ShapeId) => void;
  onOpenQrModal: () => void;
  onOpenVideoModal: () => void;
  onOpenCheatsheetModal: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectShape,
  onOpenQrModal,
  onOpenVideoModal,
  onOpenCheatsheetModal,
}) => {
  return (
    <footer className="bg-[#050916] border-t border-cyan-500/20 pt-12 pb-8 text-slate-400 text-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 pb-8 border-b border-slate-800">
          {/* Col 1: Brand & Tagline */}
          <div className="md:col-span-2 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 border border-cyan-500/40 flex items-center justify-center text-cyan-300">
                <Box className="w-4 h-4" />
              </div>
              <span className="text-base font-black text-white tracking-wider">
                3D GEOMETRY WORLD
              </span>
            </div>
            <p className="text-cyan-300 font-medium">
              &ldquo;Explore Shapes. Discover Formulas. Learn in 3D.&rdquo;
            </p>
            <p className="text-slate-400 text-xs leading-relaxed max-w-md">
              Created for the School Science Exhibition. An interactive platform showcasing 3D stereometry, exact surface area &amp; volume formulas, step-by-step mathematical derivations, and video lessons.
            </p>
          </div>

          {/* Col 2: Shape Links */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 flex items-center gap-1.5">
              <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
              Explore 3D Shapes
            </h4>
            <ul className="space-y-1.5">
              {SHAPES_LIST.map((shape) => (
                <li key={shape.id}>
                  <button
                    onClick={() => onSelectShape(shape.id)}
                    className="hover:text-cyan-300 transition-colors text-left"
                  >
                    {shape.name} <span className="text-slate-600">({shape.formulas.volume.shortFormula})</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Exhibition Quick Tools */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3">
              Exhibition Booth Tools
            </h4>
            <ul className="space-y-2">
              <li>
                <button
                  onClick={onOpenQrModal}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <QrCode className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Generate Exhibition QR Code</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenVideoModal}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Video className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Configure Video Links</span>
                </button>
              </li>
              <li>
                <button
                  onClick={onOpenCheatsheetModal}
                  className="hover:text-cyan-300 transition-colors flex items-center gap-1.5"
                >
                  <Table className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Master Formulas Table</span>
                </button>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom copyright & exhibition badge */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3 text-[11px] text-slate-500">
          <div>
            © {new Date().getFullYear()} 3D Geometry World • School Science Exhibition Project
          </div>
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-cyan-400" />
            <span>Interactive 3D WebGL • Real-Time Physics &amp; Mathematics</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
