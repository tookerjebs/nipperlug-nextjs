interface SpriteFrame {
  frame: { x: number; y: number; w: number; h: number };
}

interface SpriteData {
  x: number;
  y: number;
  width: number;
  height: number;
}

interface SpritesheetMeta {
  size: { w: number; h: number };
}

let spriteFrames: Record<string, SpriteFrame> | null = null;
let spritesheetMeta: SpritesheetMeta | null = null;
let loadingPromise: Promise<Record<string, SpriteFrame>> | null = null;

export async function loadSpriteData(): Promise<Record<string, SpriteFrame>> {
  if (spriteFrames) return spriteFrames;
  
  if (loadingPromise) return loadingPromise;
  
  if (typeof window !== 'undefined') {
    loadingPromise = fetch('/spritesheet-stat-icons.json')
      .then(response => response.json())
      .then(data => {
        spriteFrames = data.frames;
        spritesheetMeta = data.meta;
        return spriteFrames || {};
      })
      .catch(error => {
        console.error('Failed to load sprite data:', error);
        return {};
      });
    
    return loadingPromise;
  }
  
  return {}; // Return empty object if not loaded (server-side)
}

export function getSpritesheetDimensions(): { width: number; height: number } {
  if (spritesheetMeta) {
    return { width: spritesheetMeta.size.w, height: spritesheetMeta.size.h };
  }
  // Fallback dimensions if meta data isn't loaded yet
  return { width: 4234, height: 42 };
}

export function getSpriteData(iconPath: string): SpriteData | null {
  if (!iconPath) return null;
  
  // If sprites aren't loaded yet, try to load them synchronously if possible
  if (!spriteFrames && typeof window !== 'undefined') {
    // Trigger loading but don't wait for it
    loadSpriteData();
    return null;
  }
  
  if (!spriteFrames) return null;
  
  // Extract filename: "/images/stat icons/attack_icon.png" -> "attack_icon.png"
  const filename = iconPath.split('/').pop();
  
  if (!filename || !spriteFrames[filename]) {
    return null;
  }
  
  const frame = spriteFrames[filename].frame;
  return {
    x: frame.x,
    y: frame.y,
    width: frame.w,
    height: frame.h
  };
}

// Preload sprite data immediately when this module loads (client-side only)
if (typeof window !== 'undefined') {
  // Start loading immediately
  loadSpriteData();
  
  // Also try to load when DOM is ready in case the above doesn't work
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => loadSpriteData());
  } else {
    loadSpriteData();
  }
}

