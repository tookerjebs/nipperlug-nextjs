'use client';

import React, { useEffect, useState } from 'react';
import { getClassSpriteData, getClassSpritesheetDimensions, loadClassSpriteData } from '../../utils/classIconUtils';

interface ClassIconProps {
  iconPath: string;
  width?: number;
  height?: number;
  className?: string;
  alt?: string;
  circular?: boolean; // If true, makes the icon circular
}

export const ClassIcon: React.FC<ClassIconProps> = ({ 
  iconPath, 
  width = 32, 
  height = 32, 
  className = '',
  alt,
  circular = false
}) => {
  const [spriteData, setSpriteData] = useState<ReturnType<typeof getClassSpriteData>>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const loadSprite = async () => {
      await loadClassSpriteData();
      const data = getClassSpriteData(iconPath);
      setSpriteData(data);
      setIsLoaded(true);
    };
    
    loadSprite();
  }, [iconPath]);

  // Don't render anything until loaded and sprite data is available
  if (!isLoaded || !spriteData) {
    return (
      <div 
        className={`inline-flex items-center justify-center ${className}`}
        style={{
          width: `${width}px`, 
          height: `${height}px`,
          borderRadius: circular ? '50%' : '0',
        }}
        title={alt || 'Class Icon'}
      />
    );
  }
  
  // Use the actual sprite dimensions from the spritesheet data
  const spriteWidth = spriteData.width;
  const spriteHeight = spriteData.height;
  
  let scale: number;
  let scaledWidth: number;
  let scaledHeight: number;
  
  if (circular) {
    // Circular mode: adaptive scaling based on sprite size
    const baseSize = 35; // Class icons are 35x35
    const sizeRatio = Math.max(spriteWidth, spriteHeight) / baseSize;
    
    // Calculate base scale to fit within container
    const baseScale = Math.min(width / spriteWidth, height / spriteHeight);
    
    // Apply adaptive scaling: larger sprites get boosted scale factor
    const adaptiveMultiplier = sizeRatio > 1 ? Math.min(1.2, 1 + (sizeRatio - 1) * 0.3) : 1;
    scale = baseScale * adaptiveMultiplier;
    
    // Ensure we don't exceed container bounds
    const maxScale = Math.min(width / spriteWidth, height / spriteHeight);
    scale = Math.min(scale, maxScale);
    
    scaledWidth = spriteWidth * scale;
    scaledHeight = spriteHeight * scale;
  } else {
    // Default mode: maintain aspect ratio, center in container
    scale = Math.min(width / spriteWidth, height / spriteHeight);
    scaledWidth = spriteWidth * scale;
    scaledHeight = spriteHeight * scale;
  }
  
  // Get dynamic spritesheet dimensions from the JSON metadata
  const { width: sheetWidth, height: sheetHeight } = getClassSpritesheetDimensions();
  const scaledSheetWidth = sheetWidth * scale;
  const scaledSheetHeight = sheetHeight * scale;
  
  // Calculate scaled position
  const scaledX = spriteData.x * scale;
  const scaledY = spriteData.y * scale;
  
  return (
    <div 
      className={`inline-flex items-center justify-center ${className}`}
      style={{
        width: `${width}px`, 
        height: `${height}px`,
      }}
      title={alt || 'Class Icon'}
    >
      <div
        style={{
          width: `${scaledWidth}px`,
          height: `${scaledHeight}px`,
          backgroundImage: 'url(/images/classes/class_icons_spritesheet.png)',
          backgroundPosition: `-${scaledX}px -${scaledY}px`,
          backgroundSize: `${scaledSheetWidth}px ${scaledSheetHeight}px`,
          backgroundRepeat: 'no-repeat',
          imageRendering: 'auto',
          borderRadius: circular ? '50%' : '0',
          overflow: circular ? 'hidden' : 'visible',
        }}
      />
    </div>
  );
};