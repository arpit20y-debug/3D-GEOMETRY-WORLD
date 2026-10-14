/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

/**
 * ============================================================================
 * 🌟 3D GEOMETRY WORLD - EDUCATIONAL VIDEO URL CONFIGURATION SECTION 🌟
 * ============================================================================
 * 
 * PASTE YOUR SIX EDUCATIONAL VIDEO LINKS HERE!
 * 
 * Instructions:
 * 1. Paste each video URL inside the quotation marks "" for each shape below.
 * 2. Supported formats:
 *    - Standard YouTube: https://www.youtube.com/watch?v=VIDEO_ID
 *    - Short YouTube:    https://youtu.be/VIDEO_ID
 *    - Embed YouTube:    https://www.youtube.com/embed/VIDEO_ID
 *    - YouTube Shorts:   https://www.youtube.com/shorts/VIDEO_ID
 * 
 * If a video link is left as "", the corresponding shape page will automatically
 * display: "Educational video coming soon" instead of a broken player.
 * ============================================================================
 */
import { shapeVideos as defaultShapeVideos } from './videoConfig';

const shapeVideos = {
  cube: defaultShapeVideos.cube || "https://youtu.be/RDFYfAEx_yc?si=bfi05gEwRTbDy8hm",
  cuboid: defaultShapeVideos.cuboid || "https://youtu.be/FIYP3oDowWc?si=m4pj4LZ92A9xEDuO",
  cylinder: defaultShapeVideos.cylinder || "https://youtu.be/uIHDqtB8vrU?si=RhURmpIObyOeA2E2",
  cone: defaultShapeVideos.cone || "https://youtu.be/ODNssKSzSRA?si=_tUE4LfyE_QekcXB",
  sphere: defaultShapeVideos.sphere || "https://youtu.be/agWsyKYXFBw?si=4thUGfmQNtFF5VBg",
  hemisphere: defaultShapeVideos.hemisphere || "https://youtu.be/o_T-H4XnWIk?si=wZT9FJiuG23WNCTL"
};

import React, { useState, useEffect } from 'react';
import { ShapeId } from './types/geometry';
import { Navbar } from './components/Navbar';
import { Footer } from './components/Footer';
import { HomePage } from './components/HomePage';
import { ShapeDetailPage } from './components/ShapeDetailPage';
import { QrCodeModal } from './components/QrCodeModal';
import { VideoGuideModal } from './components/VideoGuideModal';
import { FormulaCheatsheetModal } from './components/FormulaCheatsheetModal';
import { ExhibitionQuizModal } from './components/ExhibitionQuizModal';

export default function App() {
  // Navigation state: null = HomePage, or ShapeId = ShapeDetailPage
  const [currentShapeId, setCurrentShapeId] = useState<ShapeId | null>(null);

  // Video URLs state: initialized with shapeVideos, ensuring valid URLs from config are preserved
  const [activeVideos, setActiveVideos] = useState<Record<string, string>>(() => {
    try {
      const saved = localStorage.getItem('3d_geometry_custom_videos');
      if (saved) {
        const parsed = JSON.parse(saved);
        // Clean empty entries so defaultShapeVideos take precedence
        const cleanSaved: Record<string, string> = {};
        for (const [k, v] of Object.entries(parsed)) {
          if (typeof v === 'string' && v.trim()) {
            cleanSaved[k] = v.trim();
          }
        }
        return { ...shapeVideos, ...defaultShapeVideos, ...cleanSaved };
      }
    } catch {
      // ignore
    }
    return { ...shapeVideos, ...defaultShapeVideos };
  });

  // Modals state
  const [isQrModalOpen, setIsQrModalOpen] = useState(false);
  const [isVideoModalOpen, setIsVideoModalOpen] = useState(false);
  const [isCheatsheetModalOpen, setIsCheatsheetModalOpen] = useState(false);
  const [isQuizModalOpen, setIsQuizModalOpen] = useState(false);

  // Handlers
  const handleSelectShape = (id: ShapeId) => {
    setCurrentShapeId(id);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleNavigateHome = () => {
    setCurrentShapeId(null);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleUpdateAllVideos = (updated: Record<string, string>) => {
    setActiveVideos(updated);
    try {
      localStorage.setItem('3d_geometry_custom_videos', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  const handleUpdateSingleVideo = (shapeId: ShapeId, newUrl: string) => {
    const updated = { ...activeVideos, [shapeId]: newUrl };
    setActiveVideos(updated);
    try {
      localStorage.setItem('3d_geometry_custom_videos', JSON.stringify(updated));
    } catch {
      // ignore
    }
  };

  return (
    <div className="min-h-screen bg-[#070d1e] text-slate-100 flex flex-col selection:bg-cyan-500 selection:text-slate-950">
      {/* Top Header / Navigation Bar */}
      <Navbar
        currentShapeId={currentShapeId}
        onSelectShape={handleSelectShape}
        onNavigateHome={handleNavigateHome}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
        onOpenCheatsheetModal={() => setIsCheatsheetModalOpen(true)}
        onOpenQuizModal={() => setIsQuizModalOpen(true)}
      />

      {/* Main View Router */}
      <main className="flex-1">
        {currentShapeId ? (
          <ShapeDetailPage
            shapeId={currentShapeId}
            videoUrl={activeVideos[currentShapeId] || ''}
            onNavigateHome={handleNavigateHome}
            onSelectShape={handleSelectShape}
            onUpdateVideoUrl={(newUrl) => handleUpdateSingleVideo(currentShapeId, newUrl)}
          />
        ) : (
          <HomePage
            onSelectShape={handleSelectShape}
            videoUrls={activeVideos}
            onOpenQrModal={() => setIsQrModalOpen(true)}
            onOpenVideoModal={() => setIsVideoModalOpen(true)}
            onOpenQuizModal={() => setIsQuizModalOpen(true)}
          />
        )}
      </main>

      {/* Footer */}
      <Footer
        onSelectShape={handleSelectShape}
        onOpenQrModal={() => setIsQrModalOpen(true)}
        onOpenVideoModal={() => setIsVideoModalOpen(true)}
        onOpenCheatsheetModal={() => setIsCheatsheetModalOpen(true)}
      />

      {/* Science Exhibition Stand QR Code Modal */}
      <QrCodeModal
        isOpen={isQrModalOpen}
        onClose={() => setIsQrModalOpen(false)}
        defaultUrl="https://3-d-geometry-world.vercel.app/"
      />

      {/* Video URLs Configuration & Test Modal */}
      <VideoGuideModal
        isOpen={isVideoModalOpen}
        onClose={() => setIsVideoModalOpen(false)}
        currentVideos={activeVideos}
        onUpdateVideos={handleUpdateAllVideos}
      />

      {/* Formula Cheatsheet Matrix Modal */}
      <FormulaCheatsheetModal
        isOpen={isCheatsheetModalOpen}
        onClose={() => setIsCheatsheetModalOpen(false)}
      />

      {/* Exhibition Interactive Quiz Challenge Modal */}
      <ExhibitionQuizModal
        isOpen={isQuizModalOpen}
        onClose={() => setIsQuizModalOpen(false)}
      />
    </div>
  );
}
