'use client';

import React from 'react';
import { OverlordSkillGridProps } from '../types/index';
import { OverlordSkillSlot } from './OverlordSkillSlot';

export const OverlordSkillGrid: React.FC<OverlordSkillGridProps> = ({ category }) => {
  // Create a 4x4 grid array
  const grid = Array(4).fill(null).map(() => Array(4).fill(null));

  // Place skills in their grid positions
  category.skills.forEach(skill => {
    if (skill.gridPosition) {
      const row = skill.gridPosition.row; // Grid positions are already 0-based
      const col = skill.gridPosition.col; // Grid positions are already 0-based
      if (row >= 0 && row < 4 && col >= 0 && col < 4) {
        grid[row][col] = skill;
      }
    }
  });

  return (
    <div className="relative">
      {/* Skills Grid - 4x4 layout matching prototype */}
      <div 
        className="grid gap-3 max-w-lg mx-auto p-4 relative"
        style={{
          gridTemplateColumns: 'repeat(4, 1fr)',
          gridTemplateRows: 'repeat(4, 1fr)',
          // Add column separator lines using theme colors
          backgroundImage: `
            linear-gradient(rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.2)),
            linear-gradient(rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.2)),
            linear-gradient(rgba(255, 215, 0, 0.2), rgba(255, 215, 0, 0.2))
          `,
          backgroundSize: '1px 100%, 1px 100%, 1px 100%',
          backgroundPosition: '25% 0, 50% 0, 75% 0',
          backgroundRepeat: 'no-repeat'
        }}
      >
        {/* Render grid cells */}
        {grid.map((row, rowIndex) =>
          row.map((skill, colIndex) => (
            <div
              key={`${rowIndex}-${colIndex}`}
              className="relative flex flex-col items-center gap-1"
              style={{
                gridRow: rowIndex + 1,
                gridColumn: colIndex + 1,
                minHeight: '80px'
              }}
            >
              {skill ? (
                <OverlordSkillSlot skill={skill} />
              ) : (
                <div className="w-12 h-12 bg-transparent" />
              )}
            </div>
          ))
        )}
      </div>
    </div>
  );
};