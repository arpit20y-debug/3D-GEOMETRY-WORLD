/**
 * ============================================================================
 * 3D GEOMETRY WORLD - EDUCATIONAL VIDEO CONFIGURATION
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
 * If a video link is left as "", the page will automatically display
 * "Educational video coming soon" with a clean placeholder.
 * ============================================================================
 */

export const shapeVideos = {
  cube: "https://youtu.be/RDFYfAEx_yc?si=bfi05gEwRTbDy8hm",
  cuboid: "https://youtu.be/FIYP3oDowWc?si=m4pj4LZ92A9xEDuO",
  cylinder: "https://youtu.be/uIHDqtB8vrU?si=RhURmpIObyOeA2E2",
  cone: "https://youtu.be/ODNssKSzSRA?si=_tUE4LfyE_QekcXB",
  sphere: "https://youtu.be/agWsyKYXFBw?si=4thUGfmQNtFF5VBg",
  hemisphere: "https://youtu.be/o_T-H4XnWIk?si=wZT9FJiuG23WNCTL"
};

/**
 * Automatically converts any supported YouTube URL into a responsive embed URL.
 * Supports:
 * - youtube.com/watch?v=ID
 * - youtu.be/ID
 * - youtube.com/embed/ID
 * - youtube.com/shorts/ID
 * - Handles timestamps (e.g. ?t=45s or &start=45)
 */
export function getYoutubeEmbedUrl(rawUrl: string): string | null {
  if (!rawUrl || typeof rawUrl !== 'string') return null;
  const trimmed = rawUrl.trim();
  if (!trimmed) return null;

  try {
    // 1. Direct embed URL
    if (trimmed.includes('youtube.com/embed/')) {
      return trimmed;
    }

    // 2. youtu.be/ID
    const youtuBeMatch = trimmed.match(/youtu\.be\/([a-zA-Z0-9_-]{11})/);
    if (youtuBeMatch && youtuBeMatch[1]) {
      const videoId = youtuBeMatch[1];
      const timeMatch = trimmed.match(/[?&]t=([0-9]+[s]?)/);
      const startParam = timeMatch ? `?start=${parseInt(timeMatch[1], 10)}` : '';
      return `https://www.youtube.com/embed/${videoId}${startParam}`;
    }

    // 3. youtube.com/watch?v=ID
    const watchMatch = trimmed.match(/[?&]v=([a-zA-Z0-9_-]{11})/);
    if (watchMatch && watchMatch[1]) {
      const videoId = watchMatch[1];
      const timeMatch = trimmed.match(/[?&]t=([0-9]+[s]?)/);
      const startParam = timeMatch ? `?start=${parseInt(timeMatch[1], 10)}` : '';
      return `https://www.youtube.com/embed/${videoId}${startParam}`;
    }

    // 4. youtube.com/shorts/ID
    const shortsMatch = trimmed.match(/youtube\.com\/shorts\/([a-zA-Z0-9_-]{11})/);
    if (shortsMatch && shortsMatch[1]) {
      const videoId = shortsMatch[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }

    // Fallback: If it's already an https iframe link
    if (trimmed.startsWith('https://')) {
      return trimmed;
    }

    return null;
  } catch {
    return null;
  }
}
