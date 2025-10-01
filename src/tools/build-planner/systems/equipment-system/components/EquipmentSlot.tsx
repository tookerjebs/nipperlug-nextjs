/**
 * EquipmentSlot Component
 * Represents a single equipment slot in the grid
 * Extracted from renderSlot function in EquipmentSystem.tsx
 */

import React from 'react';

// Define the props interface for the EquipmentSlot component
export interface EquipmentSlotProps {
  // Slot identifier
  id: string;
  
  // Position and size
  x: number;
  y: number;
  width: number;
  height: number;
  
  // State
  isHovered: boolean;
  hasItem: boolean;
  
  // Item image if equipped
  itemImagePath?: string;
  
  // Event handlers
  onClick: (id: string) => void;
  onMouseEnter: (id: string, position: { slotX: number; slotY: number; width: number; height: number }) => void;
  onMouseMove: (id: string, position: { mouseX: number; mouseY: number; slotX: number; slotY: number; width: number; height: number }) => void;
  onMouseLeave: () => void;
}

const EquipmentSlot: React.FC<EquipmentSlotProps> = ({
  id,
  x,
  y,
  width,
  height,
  isHovered,
  hasItem,
  itemImagePath,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave
}) => {
  return (
    <g>
      <defs>
        <filter id="dropShadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
        </filter>
        
        <filter id="activeGlow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="2" dy="2" stdDeviation="3" floodOpacity="0.3"/>
          <feDropShadow dx="0" dy="0" stdDeviation="4" floodColor="rgba(255, 215, 0, 0.3)" floodOpacity="1"/>
        </filter>
        
        <linearGradient id="slotGradientDefault" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 20, 28, 0.8)" />
            <stop offset="100%" stopColor="rgba(35, 35, 45, 0.6)" />
          </linearGradient>
          
          <linearGradient id="slotGradientActive" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(20, 20, 28, 0.8)" />
            <stop offset="100%" stopColor="rgba(35, 35, 45, 0.6)" />
          </linearGradient>
          
          <linearGradient id="slotGradientHover" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="rgba(30, 30, 38, 0.9)" />
            <stop offset="100%" stopColor="rgba(45, 45, 55, 0.7)" />
          </linearGradient>
      </defs>
      {/* Base slot - seamless grid style */}
      <rect
        id={id}
        x={x}
        y={y}
        width={width}
        height={height}
        rx={8}
        ry={8}
        fill={isHovered ? 'url(#slotGradientHover)' : 'url(#slotGradientDefault)'}
        stroke={isHovered ? 'rgba(120, 120, 140, 0.9)' : (hasItem ? 'rgba(255, 215, 0, 0.4)' : 'rgba(60, 60, 75, 0.6)')}
        strokeWidth={isHovered ? 3 : (hasItem ? 2 : 2)}
        filter="url(#dropShadow)"
        className="transition-all duration-200 cursor-pointer"
        onClick={() => onClick(id)}
        onMouseEnter={(event) => {
          // Get the SVG element and its bounding rect to convert SVG coordinates to screen coordinates
          const svgElement = (event.target as SVGElement).ownerSVGElement;
          if (svgElement) {
            const svgRect = svgElement.getBoundingClientRect();
            const svgViewBox = svgElement.viewBox.baseVal;
            
            // Calculate the scale factors
            const scaleX = svgRect.width / svgViewBox.width;
            const scaleY = svgRect.height / svgViewBox.height;
            
            // Convert SVG coordinates to screen coordinates
            const screenX = svgRect.left + (x * scaleX);
            const screenY = svgRect.top + (y * scaleY);
            const screenWidth = width * scaleX;
            const screenHeight = height * scaleY;
            
            onMouseEnter(id, {
              slotX: screenX,
              slotY: screenY,
              width: screenWidth,
              height: screenHeight
            });
          } else {
            // Fallback to original coordinates if SVG element not found
            onMouseEnter(id, {
              slotX: x,
              slotY: y,
              width: width,
              height: height
            });
          }
        }}
        onMouseMove={(event) => {
          // Get the SVG element and its bounding rect to convert SVG coordinates to screen coordinates
          const svgElement = (event.target as SVGElement).ownerSVGElement;
          if (svgElement) {
            const svgRect = svgElement.getBoundingClientRect();
            const svgViewBox = svgElement.viewBox.baseVal;
            
            // Calculate the scale factors
            const scaleX = svgRect.width / svgViewBox.width;
            const scaleY = svgRect.height / svgViewBox.height;
            
            // Convert SVG coordinates to screen coordinates
            const screenX = svgRect.left + (x * scaleX);
            const screenY = svgRect.top + (y * scaleY);
            const screenWidth = width * scaleX;
            const screenHeight = height * scaleY;
            
            // Get mouse position
            const mouseX = event.clientX;
            const mouseY = event.clientY;
            
            onMouseMove(id, {
              mouseX: mouseX,
              mouseY: mouseY,
              slotX: screenX,
              slotY: screenY,
              width: screenWidth,
              height: screenHeight
            });
          }
        }}
        onMouseLeave={onMouseLeave}
      />
      
      {/* Configured item display */}
      {hasItem && itemImagePath && (
        <image
          href={itemImagePath}
          x={x + width * 0.1}
          y={y + height * 0.1}
          width={width * 0.8}
          height={height * 0.8}
          className="pointer-events-none"
        />
      )}
      
      {/* Subtle inner highlight for hover */}
      {isHovered && (
        <rect
          x={x + 1}
          y={y + 1}
          width={width - 2}
          height={height - 2}
          rx={1}  /* Minimal radius for inner highlight */
          ry={1}  /* Minimal radius for inner highlight */
          className="fill-none stroke-game-gold stroke-[0.5px] opacity-40"
        />
      )}
    </g>
  );
};

export default EquipmentSlot;