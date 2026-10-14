import React, { useState } from 'react';
import { Play, VideoOff, ExternalLink, Sparkles, CheckCircle2 } from 'lucide-react';
import { getYoutubeEmbedUrl } from '../videoConfig';

interface VideoPlayerProps {
  rawUrl: string;
  shapeName: string;
  onUpdateUrl?: (newUrl: string) => void;
}

export const VideoPlayer: React.FC<VideoPlayerProps> = ({
  rawUrl,
  shapeName,
  onUpdateUrl,
}) => {
  const [testInput, setTestInput] = useState('');
  const [showTestInput, setShowTestInput] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);

  const embedUrl = getYoutubeEmbedUrl(rawUrl);
  const hasValidVideo = Boolean(embedUrl);

  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (onUpdateUrl && testInput.trim()) {
      onUpdateUrl(testInput.trim());
      setSaveSuccess(true);
      setShowTestInput(false);
      setTimeout(() => setSaveSuccess(false), 3000);
    }
  };

  return (
    <div className="w-full rounded-2xl overflow-hidden bg-slate-900/90 border border-cyan-500/30 shadow-2xl backdrop-blur-xl">
      {/* Player Top Bar */}
      <div className="px-4 py-3 bg-gradient-to-r from-slate-900 via-slate-800 to-slate-900 border-b border-cyan-500/20 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-cyan-400/80 shadow-[0_0_8px_rgba(6,182,212,0.8)]" />
          <h4 className="text-sm font-semibold text-slate-200 tracking-wide">
            Educational Video: <span className="text-cyan-400">{shapeName}</span>
          </h4>
        </div>
        <div className="flex items-center gap-2">
          {hasValidVideo ? (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-emerald-950/80 text-emerald-300 border border-emerald-500/40">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              Ready
            </span>
          ) : (
            <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-950/60 text-amber-300 border border-amber-500/30">
              Awaiting Link
            </span>
          )}

          {/* Quick test URL toggle button for exhibition presenter */}
          {onUpdateUrl && (
            <button
              onClick={() => setShowTestInput(!showTestInput)}
              className="text-xs px-2.5 py-1 rounded-md bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-cyan-300 border border-slate-700 transition-colors"
            >
              {showTestInput ? 'Cancel' : 'Test URL'}
            </button>
          )}
        </div>
      </div>

      {/* Optional Quick Link Tester Bar */}
      {showTestInput && (
        <form onSubmit={handleApplyUrl} className="p-3 bg-slate-950/90 border-b border-cyan-500/30 flex flex-col sm:flex-row gap-2">
          <input
            type="url"
            value={testInput}
            onChange={(e) => setTestInput(e.target.value)}
            placeholder="Paste your YouTube video link here..."
            className="flex-1 px-3 py-1.5 text-xs rounded-lg bg-slate-900 border border-cyan-500/40 text-slate-100 placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-cyan-400"
          />
          <button
            type="submit"
            className="px-3 py-1.5 text-xs font-semibold rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 transition-colors whitespace-nowrap"
          >
            Apply to Preview
          </button>
        </form>
      )}

      {saveSuccess && (
        <div className="p-2 bg-emerald-950/90 border-b border-emerald-500/40 flex items-center justify-center gap-2 text-xs text-emerald-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          Preview video updated! To make it permanent, also update <code className="font-mono bg-emerald-900/50 px-1 rounded">shapeVideos</code> in <code className="font-mono bg-emerald-900/50 px-1 rounded">src/videoConfig.ts</code>.
        </div>
      )}

      {/* Responsive 16:9 Video Container */}
      <div className="relative w-full aspect-video bg-[#040814] flex items-center justify-center">
        {hasValidVideo && embedUrl ? (
          <iframe
            src={embedUrl}
            title={`${shapeName} Educational Video`}
            className="absolute inset-0 w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          /* "Educational video coming soon" Placeholder */
          <div className="flex flex-col items-center justify-center p-6 text-center max-w-md">
            <div className="w-16 h-16 rounded-2xl bg-cyan-950/60 border border-cyan-500/30 flex items-center justify-center text-cyan-400 mb-4 shadow-[0_0_20px_rgba(6,182,212,0.25)]">
              <VideoOff className="w-8 h-8 opacity-80" />
            </div>

            <h3 className="text-lg sm:text-xl font-bold text-slate-100 mb-2">
              Educational video coming soon
            </h3>

            <p className="text-xs sm:text-sm text-slate-400 mb-4 leading-relaxed">
              The educational video for the <strong className="text-cyan-300">{shapeName}</strong> will appear here once the URL is added to the configuration.
            </p>

            <div className="p-3 rounded-xl bg-slate-950/80 border border-slate-800 text-left w-full text-xs text-slate-400 font-mono">
              <div className="text-[11px] text-cyan-400 font-sans font-semibold mb-1 flex items-center gap-1">
                <Sparkles className="w-3 h-3" />
                How to add your video:
              </div>
              <div>Open file: <span className="text-slate-200">src/videoConfig.ts</span></div>
              <div className="mt-1 text-slate-300">
                shapeVideos.{shapeName.toLowerCase()} = &quot;YOUR_YOUTUBE_URL&quot;
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
