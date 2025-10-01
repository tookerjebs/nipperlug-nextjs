'use client';

import React, { useState } from 'react';
import { SortDirection } from '../config/columns';

interface SortableTableHeaderProps {
  title: string;
  sortKey: string;
  currentSort: { key: string; direction: SortDirection } | null;
  onSort: (key: string) => void;
  sortable?: boolean;
  width?: string;
  isLastColumn?: boolean;
}

// Helper function to get display title - abbreviate only specific long names
const getDisplayTitle = (title: string): { display: string; tooltip?: string } => {
  const abbreviations: Record<string, { display: string; tooltip: string }> = {
    'Ignore Penetration': { display: 'Ignore Pen.', tooltip: 'Ignore Penetration' }
  };

  const abbrev = abbreviations[title];
  return abbrev || { display: title };
};

export const SortableTableHeader: React.FC<SortableTableHeaderProps> = ({
  title,
  sortKey,
  currentSort,
  onSort,
  sortable = true,
  width,
  isLastColumn = false
}) => {
  const [showTooltip, setShowTooltip] = useState(false);
  const isActive = currentSort?.key === sortKey;
  const direction = isActive ? currentSort.direction : null;
  const { display, tooltip } = getDisplayTitle(title);

  const handleClick = () => {
    if (sortable) {
      onSort(sortKey);
    }
  };

  return (
    <th 
      className={`px-4 py-4 text-xs font-medium uppercase tracking-wider transition-colors relative ${
        !isLastColumn ? 'border-r border-border-dark' : ''
      } ${
        sortKey === 'name' ? 'text-left' : 'text-center'
      } ${
        isActive ? 'text-stat-offensive bg-theme-light/20' : 'text-game-gold'
      } ${
        sortable ? 'cursor-pointer hover:bg-theme-light/30' : ''
      }`}
      style={{ width, minWidth: width }}
      onClick={handleClick}
      onMouseEnter={() => tooltip && setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      <div className={`flex items-center gap-1 min-w-0 ${
        sortKey === 'name' ? 'justify-start' : 'justify-center'
      }`}>
        <span className={`leading-tight break-words ${
          sortKey === 'name' ? 'text-left' : 'text-center flex-1'
        }`} title={tooltip || title}>
          {display}
        </span>
        {sortable && (
          <div className="flex flex-col flex-shrink-0">
            {direction === 'asc' ? (
              // Show up arrow for ascending
              <svg className="w-3 h-3 text-stat-offensive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M14.707 12.707a1 1 0 01-1.414 0L10 9.414l-3.293 3.293a1 1 0 01-1.414-1.414l4-4a1 1 0 011.414 0l4 4a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
            ) : (
              // Show down arrow for descending
              <svg className="w-3 h-3 text-stat-offensive" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            )}
          </div>
        )}
      </div>

      {/* Tooltip for abbreviated columns */}
      {tooltip && showTooltip && (
        <div className="absolute top-full left-1/2 transform -translate-x-1/2 mt-1 px-2 py-1 bg-gray-900 text-white text-xs rounded shadow-lg z-50 whitespace-nowrap border border-gray-600">
          {tooltip}
          <div className="absolute bottom-full left-1/2 transform -translate-x-1/2 border-4 border-transparent border-b-gray-900"></div>
        </div>
      )}
    </th>
  );
};