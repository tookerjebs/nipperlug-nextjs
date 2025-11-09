// SVG Arrow Icon Component for Platinum Merit System
// Provides thick, game-accurate arrows including curved paths

import React from 'react';

interface ArrowIconProps {
  direction: 'up' | 'down' | 'left' | 'right' | 
             'up-right' | 'down-right' | 'up-left' | 'down-left';
  className?: string;
  size?: number;
}

export const ArrowIcon: React.FC<ArrowIconProps> = ({ 
  direction, 
  className = '', 
  size = 48 
}) => {
  const strokeWidth = 6; // Thicker stroke like in-game
  const arrowheadStrokeWidth = 6; // Thick arrowhead stroke
  const color = 'currentColor';
  
  // Unified arrowhead shape - pointing right, double width (8 units), 1.5x height (6 units)
  // Base arrowhead: M 32 18 L 40 24 L 32 30 (pointing right, tip at x=40, base at x=32, center y=24)
  const baseArrowheadPath = 'M 32 18 L 40 24 L 32 30';
  const arrowheadBaseX = 32; // X position where arrowhead base connects to shaft
  const arrowheadTipX = 40; // X position of arrowhead tip
  
  // Helper to render arrowhead at a specific position and rotation
  const renderArrowhead = (x: number, y: number, rotation: number) => (
    <path 
      d={baseArrowheadPath}
      stroke={color}
      strokeWidth={arrowheadStrokeWidth}
      fill="none"
      strokeLinecap="round"
      strokeLinejoin="round"
      transform={`translate(${x - 40}, ${y - 24}) rotate(${rotation} 40 24)`}
    />
  );
  
  // Helper to render arrow shaft
  const renderShaft = (path: string) => (
    <path 
      d={path}
      stroke={color}
      strokeWidth={strokeWidth}
      fill="none"
      strokeLinecap="round"
    />
  );

  const renderArrow = () => {
    switch (direction) {
      case 'up':
        return (
          <>
            {renderShaft('M 24 40 L 24 8')}
            {renderArrowhead(24, 8, -90)}
          </>
        );
      
      case 'down':
        return (
          <>
            {renderShaft('M 24 8 L 24 40')}
            {renderArrowhead(24, 40, 90)}
          </>
        );
      
      case 'left':
        return (
          <>
            {renderShaft('M 40 24 L 8 24')}
            {renderArrowhead(8, 24, 180)}
          </>
        );
      
      case 'right':
        return (
          <>
            {renderShaft('M 8 24 L 40 24')}
            {renderArrowhead(40, 24, 0)}
          </>
        );
      
      case 'up-right':
        // Curved arrow: starts going up, then curves to the right
        const upRightControlY = 20; // Control point Y - adjust this to change curve sharpness
        return (
          <>
            {renderShaft(`M 24 40 Q 24 ${upRightControlY} ${arrowheadBaseX} ${upRightControlY}`)}
            {renderArrowhead(arrowheadTipX, upRightControlY, 0)}
          </>
        );
      
      case 'up-left':
        // Curved arrow: starts going up, then curves to the left
        // For left arrows, arrowhead base is at x=16 (since arrowhead is flipped)
        const upLeftControlY = 20; // Control point Y - adjust this to change curve sharpness
        const leftArrowheadBaseX = 16; // Base X for left-pointing arrowhead
        const leftArrowheadTipX = 8; // Tip X for left-pointing arrowhead
        return (
          <>
            {renderShaft(`M 24 40 Q 24 ${upLeftControlY} ${leftArrowheadBaseX} ${upLeftControlY}`)}
            {renderArrowhead(leftArrowheadTipX, upLeftControlY, 180)}
          </>
        );
      
      case 'down-left':
        // Curved arrow: starts going down, then curves to the left
        const downLeftControlY = 28; // Control point Y - adjust this to change curve sharpness
        const leftArrowheadBaseX2 = 16; // Base X for left-pointing arrowhead
        const leftArrowheadTipX2 = 8; // Tip X for left-pointing arrowhead
        return (
          <>
            {renderShaft(`M 24 8 Q 24 ${downLeftControlY} ${leftArrowheadBaseX2} ${downLeftControlY}`)}
            {renderArrowhead(leftArrowheadTipX2, downLeftControlY, 180)}
          </>
        );
      
      case 'down-right':
        // Curved arrow: starts going down, then curves to the right
        const downRightControlY = 28; // Control point Y - adjust this to change curve sharpness
        return (
          <>
            {renderShaft(`M 24 8 Q 24 ${downRightControlY} ${arrowheadBaseX} ${downRightControlY}`)}
            {renderArrowhead(arrowheadTipX, downRightControlY, 0)}
          </>
        );
      
      default:
        return null;
    }
  };

  return (
    <svg 
      viewBox="0 0 48 48" 
      className={className}
      width={size}
      height={size}
      style={{ display: 'block' }}
    >
      {renderArrow()}
    </svg>
  );
};

