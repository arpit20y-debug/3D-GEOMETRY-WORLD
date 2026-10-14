import React, { useEffect, useRef, useState } from 'react';
import QRCode from 'qrcode';
import { QrCode, X, Printer, Download, Copy, Check, ExternalLink, Sparkles, Smartphone } from 'lucide-react';

interface QrCodeModalProps {
  isOpen: boolean;
  onClose: () => void;
  defaultUrl?: string;
}

export const QrCodeModal: React.FC<QrCodeModalProps> = ({
  isOpen,
  onClose,
  defaultUrl = 'https://3-d-geometry-world.vercel.app/',
}) => {
  const [url, setUrl] = useState(defaultUrl);
  const [copied, setCopied] = useState(false);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const printAreaRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!isOpen) return;
    const canvas = canvasRef.current;
    if (canvas) {
      QRCode.toCanvas(
        canvas,
        url || 'https://3-d-geometry-world.vercel.app/',
        {
          width: 260,
          margin: 2,
          color: {
            dark: '#070d1e',
            light: '#ffffff',
          },
        },
        (err) => {
          if (err) console.error('QR code generation error:', err);
        }
      );
    }
  }, [isOpen, url]);

  if (!isOpen) return null;

  const handleCopy = () => {
    navigator.clipboard.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleDownload = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = '3D-Geometry-World-Exhibition-QR.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-fadeIn">
      <div className="w-full max-w-lg rounded-3xl bg-[#091124] border border-cyan-500/40 p-6 sm:p-8 shadow-2xl relative max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 p-2 rounded-xl text-slate-400 hover:text-white hover:bg-slate-800 transition-colors"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="flex items-center gap-3 mb-4">
          <div className="w-11 h-11 rounded-2xl bg-cyan-500/15 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shadow-[0_0_20px_rgba(6,182,212,0.3)]">
            <QrCode className="w-6 h-6" />
          </div>
          <div>
            <span className="text-[11px] font-semibold uppercase tracking-wider text-cyan-400">
              Science Exhibition Stand Card
            </span>
            <h3 className="text-xl font-bold text-white">
              Official Exhibition QR Code
            </h3>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed mb-4">
          Visitors at your school science exhibition booth can scan this QR code with any mobile camera to open <strong>3D Geometry World</strong> instantly on their phones.
        </p>

        {/* QR Code Printable Card Preview */}
        <div
          ref={printAreaRef}
          className="my-4 p-5 rounded-2xl bg-white text-slate-900 shadow-xl flex flex-col items-center text-center border-4 border-cyan-400"
        >
          <div className="text-xs font-black uppercase tracking-widest text-cyan-700 mb-0.5">
            School Science Exhibition
          </div>
          <div className="text-2xl font-black tracking-tight text-slate-900 font-sans">
            3D GEOMETRY WORLD
          </div>
          <div className="text-xs font-semibold text-slate-600 mb-3">
            Explore Shapes • Discover Formulas • Learn in 3D
          </div>

          {/* Canvas QR Code */}
          <div className="p-2 bg-slate-50 rounded-xl border border-slate-200 shadow-inner">
            <canvas ref={canvasRef} className="rounded-lg shadow-sm" />
          </div>

          <div className="mt-3 flex items-center gap-1.5 text-xs font-bold text-slate-800">
            <Smartphone className="w-4 h-4 text-cyan-600" />
            <span>Scan with any smartphone camera to start!</span>
          </div>
          <div className="text-[10px] text-slate-500 font-mono mt-1 max-w-[240px] truncate">
            {url}
          </div>
        </div>

        {/* Target URL Selector */}
        <div className="mt-4 p-3 rounded-xl bg-slate-950/80 border border-slate-800">
          <label className="text-[11px] font-semibold text-slate-400 uppercase tracking-wider block mb-1.5">
            QR Target Public URL
          </label>
          <div className="flex gap-2">
            <input
              type="text"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              className="flex-1 px-3 py-1.5 text-xs font-mono rounded-lg bg-slate-900 border border-cyan-500/30 text-cyan-200 focus:outline-none focus:ring-1 focus:ring-cyan-400"
            />
            <button
              onClick={handleCopy}
              className="px-3 py-1.5 rounded-lg text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied' : 'Copy'}</span>
            </button>
          </div>
          <p className="text-[11px] text-slate-400 mt-1.5">
            Points to your permanent shared deployment URL.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="grid grid-cols-2 gap-3 mt-5">
          <button
            onClick={handleDownload}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-cyan-500 hover:bg-cyan-400 text-slate-950 flex items-center justify-center gap-1.5 transition-colors shadow-lg"
          >
            <Download className="w-4 h-4" />
            <span>Download QR PNG</span>
          </button>

          <button
            onClick={handlePrint}
            className="py-2.5 px-4 rounded-xl text-xs font-semibold bg-slate-800 hover:bg-slate-700 text-white flex items-center justify-center gap-1.5 transition-colors border border-slate-700"
          >
            <Printer className="w-4 h-4" />
            <span>Print Stand Card</span>
          </button>
        </div>
      </div>
    </div>
  );
};
