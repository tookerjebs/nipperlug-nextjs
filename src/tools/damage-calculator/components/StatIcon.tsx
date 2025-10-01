'use client';

import React, { useEffect, useState } from 'react';
import { getStatInfo } from '../data/stats-config';
import { getSpritesheetDimensions, loadSpriteData, getSpriteData } from '../utils/spriteIconUtils';

interface StatIconProps {
  statId: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  fill?: boolean; // If true, stretches to fill container exactly
  circular?: boolean; // If true, makes the icon circular (for stellar system)
}

export const StatIcon: React.FC<StatIconProps> = ({ 
  statId, 
  width = 32, 
  height = 32, 
  className = '',
  alt,
  fill = false,
  circular = false
}) => {
  const [spriteData, setSpriteData] = useState<any>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  // Detect PVP/PVE variants and extract base stat
  const getVariantInfo = (id: string) => {
    if (id.startsWith('pvp')) {
      const baseStatId = id.substring(3, 4).toLowerCase() + id.substring(4);
      return { variant: 'PVP', baseStatId };
    }
    if (id.startsWith('pve')) {
      const baseStatId = id.substring(3, 4).toLowerCase() + id.substring(4);
      return { variant: 'PVE', baseStatId };
    }
    return { variant: null, baseStatId: id };
  };

  const { variant, baseStatId } = getVariantInfo(statId);
  const statInfo = getStatInfo(baseStatId);

  useEffect(() => {
    const loadSprite = async () => {
      await loadSpriteData();
      if (statInfo?.icon) {
        const data = getSpriteData(statInfo.icon);
        setSpriteData(data);
      }
      setIsLoaded(true);
    };
    
    loadSprite();
  }, [statInfo?.icon]);

  // Don't render anything until loaded and sprite data is available
  if (!isLoaded || !spriteData || !statInfo) {
    return (
      <div 
        className={`inline-flex items-center justify-center relative ${className}`}
        style={{
          width: `${width}px`, 
          height: `${height}px`,
        }}
      />
    );
  }
  
  // Use the actual sprite dimensions from the spritesheet data
  // This handles varying icon sizes (34x34, 36x34, 40x40, etc.) automatically
  const spriteWidth = spriteData.width;
  const spriteHeight = spriteData.height;
  
  let scale: number;
  let scaledWidth: number;
  let scaledHeight: number;
  
  if (fill && !circular) {
    // Fill mode only: stretch to exact dimensions
    scale = Math.max(width / spriteWidth, height / spriteHeight);
    scaledWidth = width;
    scaledHeight = height;
  } else if (circular) {
    // Circular mode: adaptive scaling based on sprite size
    // Larger sprites get less aggressive scaling to prevent them from being too small
    const baseSize = 34; // Most common sprite size as reference
    const sizeRatio = Math.max(spriteWidth, spriteHeight) / baseSize;
    
    // Calculate base scale to fit within container
    const baseScale = Math.min(width / spriteWidth, height / spriteHeight);
    
    // Apply adaptive scaling: larger sprites get boosted scale factor
    // This prevents large sprites from appearing disproportionately small
    const adaptiveMultiplier = sizeRatio > 1 ? Math.min(1.2, 1 + (sizeRatio - 1) * 0.3) : 1;
    scale = baseScale * adaptiveMultiplier;
    
    // Ensure we don't exceed container bounds
    const maxScale = Math.min(width / spriteWidth, height / spriteHeight);
    scale = Math.min(scale, maxScale);
    
    scaledWidth = spriteWidth * scale;
    scaledHeight = spriteHeight * scale;
  } else {
    // Fit mode: maintain aspect ratio, center in container
    // Scale based on the actual sprite dimensions to fit within the requested size
    scale = Math.min(width / spriteWidth, height / spriteHeight);
    scaledWidth = spriteWidth * scale;
    scaledHeight = spriteHeight * scale;
  }
  
  // Get dynamic spritesheet dimensions from the JSON metadata
  const { width: sheetWidth, height: sheetHeight } = getSpritesheetDimensions();
  const scaledSheetWidth = sheetWidth * scale;
  const scaledSheetHeight = sheetHeight * scale;
  
  // Calculate scaled position
  const scaledX = spriteData.x * scale;
  const scaledY = spriteData.y * scale;
  
  return (
    <div 
      className={`inline-flex items-center justify-center relative ${className}`}
      style={{
        width: `${width}px`, 
        height: `${height}px`,
      }}
      title={alt || (variant ? `${variant} ${statInfo.name}` : statInfo.name)}
    >
      <div
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          backgroundImage: 'url(/spritesheet-stat-icons.png)',
          backgroundPosition: `-${scaledX}px -${scaledY}px`,
          backgroundSize: `${scaledSheetWidth}px ${scaledSheetHeight}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: scale <= 1 ? 'pixelated' : 'auto',
          borderRadius: circular ? '50%' : '0',
          overflow: circular ? 'hidden' : 'visible',
        }}
      />
      
      {/* Variant Overlay - Only render on client side */}
      {variant && (
        <div 
          className={`stat-variant-overlay stat-${variant.toLowerCase()}-overlay`}
          style={{
            fontSize: `${Math.max(8, width * 0.25)}px`, // Responsive font size
          }}
        >
          <span className="stat-variant-text">
            {variant}
          </span>
        </div>
      )}
    </div>
  );
};