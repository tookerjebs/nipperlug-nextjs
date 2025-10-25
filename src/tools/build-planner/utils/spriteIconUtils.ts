import spritesheetData from '../../../lib/game-data/spritesheet-stat-icons.json';

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

// Static import - data is available synchronously at module load
const spriteFrames: Record<string, SpriteFrame> = spritesheetData.frames;
const spritesheetMeta: SpritesheetMeta = spritesheetData.meta;

// No longer needed - data is loaded statically
export function loadSpriteData(): Record<string, SpriteFrame> {
  return spriteFrames;
}

export function getSpritesheetDimensions(): { width: number; height: number } {
  return { width: spritesheetMeta.size.w, height: spritesheetMeta.size.h };
}

export function getSpriteData(iconPath: string): SpriteData | null {
  if (!iconPath) return null;
  
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

