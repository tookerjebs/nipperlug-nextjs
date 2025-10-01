/**
 * EquipmentGrid Component
 * Responsible for rendering the SVG grid of equipment slots
 * Extracted from EquipmentSystem.tsx to improve component separation
 */

import React from 'react';
import EquipmentSlot from './EquipmentSlot';
import { 
  SVG_DIMENSIONS, 
  SLOT_POSITIONS, 
  SLOT_SIZES,
  getSlotDimensions
} from '../config/layoutConfig';

// Define slot position and size interface
export interface SlotConfig {
  id: string;
  x: number;
  y: number;
  width: number;
  height: number;
}

// Define slot rendering interface
export interface EquipmentGridProps {
  // Callback for when a slot is clicked
  onSlotClick: (slotId: string) => void;
  
  // Callback for when a slot is hovered
  onSlotHover: (slotId: string | undefined, position?: { 
    slotX: number;
    slotY: number;
    width: number;
    height: number;
  }) => void;
  
  // Callback for when mouse moves within a slot
  onSlotMouseMove: (slotId: string, position: { 
    mouseX: number;
    mouseY: number;
    slotX: number;
    slotY: number;
    width: number;
    height: number;
  }) => void;
  
  // Currently hovered slot ID
  hoveredSlotId?: string;
  
  // Function to check if a slot has an item
  hasItemInSlot: (slotId: string) => boolean;
  
  // Function to get the image path for an item in a slot
  getItemImagePath: (slotId: string) => string | undefined;
}

const EquipmentGrid: React.FC<EquipmentGridProps> = ({ 
  onSlotClick, 
  onSlotHover, 
  onSlotMouseMove,
  hoveredSlotId,
  hasItemInSlot,
  getItemImagePath
}) => {
  // Render all slots using the configuration from layoutConfig
  const renderAllSlots = () => {
    return Object.keys(SLOT_POSITIONS).map(slotId => {
      const { x, y, width, height } = getSlotDimensions(slotId);
      
      return (
        <EquipmentSlot
          key={slotId}
          id={slotId}
          x={x}
          y={y}
          width={width}
          height={height}
          isHovered={hoveredSlotId === slotId}
          hasItem={hasItemInSlot(slotId)}
          itemImagePath={getItemImagePath(slotId)}
          onClick={onSlotClick}
          onMouseEnter={(id, position) => onSlotHover(id, position)}
          onMouseMove={(id, position) => onSlotMouseMove(id, position)}
          onMouseLeave={() => onSlotHover(undefined)}
        />
      );
    });
  };

  return (
    <svg
      viewBox={`0 0 ${SVG_DIMENSIONS.width} ${SVG_DIMENSIONS.height}`}
      className="w-full h-full max-w-[500px] max-h-[800px] rounded-lg"
      style={{ 
        background: 'linear-gradient(135deg, rgba(15, 15, 20, 0.95) 0%, rgba(25, 25, 35, 0.85) 100%)',
        border: '3px solid rgba(64, 64, 80, 0.6)',
        boxShadow: `
          0 8px 16px rgba(0, 0, 0, 0.4),
          inset 0 1px 0 rgba(255, 255, 255, 0.1),
          0 0 20px rgba(255, 255, 255, 0.05)
        `
      }}
    >
      {/* Define filters for glow effects */}
      <defs>
        <filter id="glow" x="-20%" y="-20%" width="140%" height="140%">
          <feGaussianBlur stdDeviation="2" result="blur" />
          <feComposite in="SourceGraphic" in2="blur" operator="over" />
        </filter>
      </defs>
      
      {/* Render all equipment slots from the configuration */}
      {renderAllSlots()}
    </svg>
  );
};

export default EquipmentGrid;