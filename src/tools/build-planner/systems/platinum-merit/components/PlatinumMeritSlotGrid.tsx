// Slot grid component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritSlotGridProps, PlatinumMeritArrow } from '../types/index';
import { PlatinumMeritSlot } from './PlatinumMeritSlot';
import { ArrowIcon } from './ArrowIcon';

export const PlatinumMeritSlotGrid: React.FC<PlatinumMeritSlotGridProps> = ({ category }) => {
  const { gridSize, slots, gridElements } = category;

  return (
    <div className="space-y-3 w-full max-w-full">
      {/* Scrollable container with scaling on smaller screens */}
      <div className="overflow-x-auto overflow-y-visible pb-4 w-full max-w-full">
        {/* Grid Layout with minimum width to prevent extreme shrinking */}
        <div 
          className="grid gap-x-1 gap-y-3 justify-items-center relative mx-auto"
          style={{ 
            gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
            gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`,
            minWidth: '600px', // Prevent grid from becoming too small
            maxWidth: '100%'
          }}
        >
        {/* Render slots with explicit grid positioning */}
        {slots.map(slot => (
          <div
            key={slot.id}
            style={{
              gridColumn: slot.gridPosition.col + 1,
              gridRow: slot.gridPosition.row + 1
            }}
          >
            <PlatinumMeritSlot slot={slot} />
          </div>
        ))}

        {/* Render grid elements (arrows) with explicit positioning */}
        {gridElements?.map(element => {
          if ('type' in element && element.type === 'arrow') {
            const arrowElement = element as PlatinumMeritArrow;
            
            return (
              <div
                key={element.id}
                className="w-12 h-12 flex items-center justify-center text-gray-200"
                style={{
                  gridColumn: element.gridPosition.col + 1,
                  gridRow: element.gridPosition.row + 1,
                  filter: 'drop-shadow(1px 1px 2px rgba(0,0,0,0.5))'
                }}
              >
                <ArrowIcon 
                  direction={arrowElement.direction} 
                  size={48}
                  className="text-gray-200"
                />
              </div>
            );
          }
          return null;
        })}
        </div>
      </div>
    </div>
  );
};