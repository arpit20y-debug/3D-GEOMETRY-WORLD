import React, { useState } from 'react';
import { X, Video, Copy, Check, ExternalLink, Code2, Sparkles, CheckCircle2 } from 'lucide-react';
import { shapeVideos, getYoutubeEmbedUrl } from '../videoConfig';
import { SHAPES_LIST } from '../data/shapesData';

interface VideoGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
  currentVideos: Record<string, string>;
  onUpdateVideos?: (updated: Record<string, string>) => void;
}

export const VideoGuideModal: React.FC<VideoGuideModalProps> = ({
  isOpen,
  onClose,
  currentVideos,
  onUpdateVideos,
}) => {
  const [copied, setCopied] = useState(false);
  const [localVideos, setLocalVideos] = useState<Record<string, string>>(currentVideos);
  const [savedSuccess, setSavedSuccess] = useState(false);

  if (!isOpen) return null;

  const handleInputChange = (key: string, val: string) => {
    setLocalVideos((prev) => ({ ...prev, [key]: val }));
  };

  const handleSaveToPreview = () => {
    if (onUpdateVideos) {
      onUpdateVideos(localVideos);
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  const codeSnippet = `// File: src/videoConfig.ts
export const shapeVideos = {
  cube: "${localVideos.cube || ''}",
  cuboid: "${localVideos.cuboid || ''}",
  cylinder: "${localVideos.cylinder || ''}",
  cone: "${localVideos.cone || ''}",
  sphere: "${localVideos.sphere || ''}",
  hemisphere: "${localVideos.hemisphere || ''}"
};`;

  const handleCopyCode = () => {
    navigator.clipboard.writeText(codeSnippet);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-2xl rounded-3xl bg-[#091124] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <Video className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Video Integration Center
            </span>
            <h3 className="text-xl font-bold text-white">
              Educational Video URLs Configuration
            </h3>
          </div>
        </div>

        <p className="text-xs sm:text-sm text-slate-300 leading-relaxed mb-4">
          Paste your existing YouTube educational video links below. You can test them immediately in this preview, or copy the configuration code to keep permanently in <code className="font-mono text-cyan-300 bg-slate-900 px-1.5 py-0.5 rounded">src/videoConfig.ts</code>.
        </p>

        {/* Inputs for each shape */}
        <div className="space-y-3 my-4">
          {SHAPES_LIST.map((shape) => {
            const currentVal = localVideos[shape.id] || '';
            const isValid = Boolean(getYoutubeEmbedUrl(currentVal));
            return (
              <div
                key={shape.id}
                className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3"
              >
                <div className="w-28 flex items-center gap-2">
                  <span className="text-sm font-bold text-white">{shape.name}</span>
                  {isValid ? (
                    <span className="w-2 h-2 rounded-full bg-emerald-400 shadow-[0_0_6px_rgba(52,211,153,0.8)]" />
                  ) : (
                    <span className="w-2 h-2 rounded-full bg-slate-600" />
                  )}
                </div>

                <div className="flex-1">
                  <input
                    type="url"
                    value={currentVal}
                    onChange={(e) => handleInputChange(shape.id, e.target.value)}
                    placeholder={`e.g. https://www.youtube.com/watch?v=... for ${shape.name}`}
                    className="w-full px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-slate-700 focus:border-cyan-400 text-slate-100 placeholder-slate-500 focus:outline-none"
                  />
                </div>

                <div className="text-[11px] font-mono shrink-0">
                  {isValid ? (
                    <span className="text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> Valid
                    </span>
                  ) : (
                    <span className="text-slate-500">Coming soon</span>
                  )}
                </div>
              </div>
            );
          })}
        </div>

        {/* Action button to apply preview changes */}
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3 pt-2">
          <button
            onClick={handleSaveToPreview}
            className="w-full sm:w-auto py-2.5 px-5 rounded-xl text-xs font-bold bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors shadow-lg"
          >
            Apply to Current Session
          </button>

          {savedSuccess && (
            <span className="text-xs text-emerald-400 flex items-center gap-1 font-semibold">
              <Check className="w-4 h-4" /> Applied to interactive preview!
            </span>
          )}
        </div>

        {/* Code to copy for permanent update */}
        <div className="mt-6 pt-5 border-t border-slate-800">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-slate-400 flex items-center gap-1.5">
              <Code2 className="w-4 h-4 text-cyan-400" />
              Copy for <code className="text-cyan-300">src/videoConfig.ts</code>
            </span>
            <button
              onClick={handleCopyCode}
              className="px-2.5 py-1 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-cyan-300 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Code'}</span>
            </button>
          </div>

          <pre className="p-3.5 rounded-xl bg-slate-950 border border-cyan-500/20 text-slate-300 text-xs font-mono overflow-x-auto">
            {codeSnippet}
          </pre>
        </div>
      </div>
    </div>
  );
};
