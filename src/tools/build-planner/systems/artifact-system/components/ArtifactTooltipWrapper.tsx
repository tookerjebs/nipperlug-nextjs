/**
 * Artifact Tooltip Wrapper
 * Handles tooltip positioning and mouse following like equipment system
 */

import React, { useRef, useEffect, useState } from 'react';
import ArtifactTooltip from './ArtifactTooltip';
import { ConfiguredArtifact } from '../types';

interface ArtifactTooltipWrapperProps {
  artifact: ConfiguredArtifact;
  visible: boolean;
  mouseX?: number;
  mouseY?: number;
  slotX?: number;
  slotY?: number;
  width?: number;
  height?: number;
}

const ArtifactTooltipWrapper: React.FC<ArtifactTooltipWrapperProps> = ({
  artifact,
  visible,
  mouseX,
  mouseY,
  slotX,
  slotY,
  width,
  height,
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipDimensions, setTooltipDimensions] = useState({ width: 250, height: 300 });

  // Measure tooltip dimensions after render
  useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      setTooltipDimensions(prev => {
        if (prev.width !== rect.width || prev.height !== rect.height) {
          return { width: rect.width, height: rect.height };
        }
        return prev;
      });
    }
  }, [artifact]);

  // Calculate intelligent tooltip positioning
  const calculateTooltipPosition = () => {
    // Use mouse position if available, otherwise use slot center as fallback
    const referenceX = mouseX !== undefined ? mouseX : 
                      (slotX !== undefined && width !== undefined) ? slotX + width / 2 : 
                      0;
    
    const referenceY = mouseY !== undefined ? mouseY : 
                      (slotY !== undefined && height !== undefined) ? slotY + height / 2 : 
                      0;

    const tooltipWidth = tooltipDimensions.width;
    const tooltipHeight = tooltipDimensions.height;
    const margin = 15;

    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;

    // Determine best position based on available space
    const spaceRight = viewportWidth - referenceX;
    const spaceLeft = referenceX;
    const spaceBottom = viewportHeight - referenceY;
    const spaceTop = referenceY;

    let finalX, finalY;

    // Horizontal positioning: prefer right, fall back to left if not enough space
    if (spaceRight >= tooltipWidth + margin) {
      finalX = referenceX + margin;
    } else if (spaceLeft >= tooltipWidth + margin) {
      finalX = referenceX - tooltipWidth - margin;
    } else {
      // Not enough space on either side, position to fit in viewport
      finalX = Math.max(10, Math.min(referenceX - tooltipWidth / 2, viewportWidth - tooltipWidth - 10));
    }

    // Vertical positioning: prefer centered, adjust if near edges
    if (spaceTop >= tooltipHeight / 2 && spaceBottom >= tooltipHeight / 2) {
      // Enough space above and below, center vertically
      finalY = referenceY - tooltipHeight / 2;
    } else if (spaceBottom >= tooltipHeight + margin) {
      // Not enough space to center, but enough below
      finalY = referenceY + margin;
    } else if (spaceTop >= tooltipHeight + margin) {
      // Not enough space below, but enough above
      finalY = referenceY - tooltipHeight - margin;
    } else {
      // Not enough space above or below, fit in viewport
      finalY = Math.max(10, Math.min(referenceY - tooltipHeight / 2, viewportHeight - tooltipHeight - 10));
    }

    return {
      left: `${finalX}px`,
      top: `${finalY}px`
    };
  };

  if (!visible || !artifact) return null;

  const tooltipPosition = calculateTooltipPosition();

  return (
    <div
      ref={tooltipRef}
      className="fixed glass-panel-dark z-50 p-3 text-sm min-w-[280px] bg-opacity-90 pointer-events-none"
      style={{
        ...tooltipPosition,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        borderColor: 'rgba(80, 80, 100, 0.4)',
      }}
    >
      <ArtifactTooltip artifact={artifact} />
    </div>
  );
};

export default ArtifactTooltipWrapper;

