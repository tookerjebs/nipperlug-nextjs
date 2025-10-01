// Slot grid component for Platinum Merit System
'use client';

import React from 'react';
import { PlatinumMeritSlotGridProps, PlatinumMeritArrow } from '../types/index';
import { PlatinumMeritSlot } from './PlatinumMeritSlot';

export const PlatinumMeritSlotGrid: React.FC<PlatinumMeritSlotGridProps> = ({ category }) => {
  const { gridSize, slots, gridElements } = category;

  return (
    <div className="space-y-3">
      {/* Grid Layout */}
      <div 
        className="grid gap-x-1 gap-y-3 justify-items-center relative"
        style={{ 
          gridTemplateColumns: `repeat(${gridSize.cols}, 1fr)`,
          gridTemplateRows: `repeat(${gridSize.rows}, 1fr)`
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
            const arrowSymbol = {
              up: '↑',
              down: '↓',
              left: '←',
              right: '→',
              'up-right': '↗',
              'up-left': '↖',
              'down-right': '↘',
              'down-left': '↙'
            }[arrowElement.direction];
            
            return (
              <div
                key={element.id}
                className="w-12 h-12 flex items-center justify-center text-3xl text-gray-200 font-black"
                style={{
                  gridColumn: element.gridPosition.col + 1,
                  gridRow: element.gridPosition.row + 1,
                  textShadow: '1px 1px 2px rgba(0,0,0,0.5)'
                }}
              >
                {arrowSymbol}
              </div>
            );
          }
          return null;
        })}
      </div>
    </div>
  );
};