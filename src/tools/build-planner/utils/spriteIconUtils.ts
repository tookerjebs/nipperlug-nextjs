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
  
  // Use dynamic import with caching to avoid multiple fetches
  loadingPromise = import('../../../lib/game-data/spritesheet-stat-icons.json')
    .then(module => {
      spriteFrames = module.default.frames;
      spritesheetMeta = module.default.meta;
      return spriteFrames || {};
    })
    .catch(error => {
      console.error('Failed to load sprite data:', error);
      return {};
    });
  
  return loadingPromise;
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
  
  // Ensure sprite data is loaded
  if (!spriteFrames) {
    loadSpriteData();
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

