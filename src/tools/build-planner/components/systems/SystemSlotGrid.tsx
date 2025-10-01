'use client';

import { SystemSlot as SystemSlotType, SystemCategory } from '@/tools/build-planner/types/systems';
import SystemSlot from './SystemSlot';
import { cn } from '@/tools/build-planner/lib/utils';
import { useEffect, useState, useMemo, useCallback, memo } from 'react';

interface SystemSlotGridProps {
  categories: SystemCategory[];
  selectedSlotId?: string | null;
  onSlotClick?: (slot: SystemSlotType) => void;
  className?: string;
  slotSize?: 'sm' | 'md' | 'lg';
  gridCols?: number;
}

// Move static objects outside the component to prevent recreation on each render
const slotSizeMap = {
  sm: { min: '2.5rem', preferred: '3rem' }, // 40px min, 48px preferred
  md: { min: '3rem', preferred: '4rem' },   // 48px min, 64px preferred  
  lg: { min: '3.5rem', preferred: '5rem' }  // 56px min, 80px preferred
};

// Tailwind grid column classes
const gridColsClasses = {
  2: 'grid-cols-2',
  3: 'grid-cols-3',
  4: 'grid-cols-4',
  5: 'grid-cols-5',
  6: 'grid-cols-6',
  7: 'grid-cols-7',
  8: 'grid-cols-8',
  9: 'grid-cols-9',
  10: 'grid-cols-10',
  12: 'grid-cols-12'
};
type GridColsKeys = keyof typeof gridColsClasses;

// Dynamic size classes for responsive grid
const emptyDynamicSizeClasses = {
  sm: 'min-w-10 min-h-10 aspect-square',
  md: 'min-w-12 min-h-12 aspect-square',
  lg: 'min-w-14 min-h-14 aspect-square'
};

function SystemSlotGrid({
  categories,
  selectedSlotId,
  onSlotClick,
  className = '',
  slotSize = 'md',
  gridCols = 10
}: SystemSlotGridProps) {
  // Responsive grid columns based on screen size
  const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 1024);
  
  // Update window width on resize with debounce
  useEffect(() => {
    let timeoutId: NodeJS.Timeout;
    
    const handleResize = () => {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        setWindowWidth(window.innerWidth);
      }, 200); // 200ms debounce
    };
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(timeoutId);
    };
  }, []);
  
  // Memoize the responsive grid columns calculation
  const responsiveGridCols = useMemo(() => {
    // Adjust these breakpoints as needed
    if (windowWidth < 640) { // Small mobile
      return slotSize === 'sm' ? 4 : slotSize === 'md' ? 3 : 2;
    } else if (windowWidth < 768) { // Large mobile
      return slotSize === 'sm' ? 6 : slotSize === 'md' ? 5 : 4;
    } else if (windowWidth < 1024) { // Tablet
      return slotSize === 'sm' ? 8 : slotSize === 'md' ? 7 : 6;
    } else { // Desktop
      return gridCols;
    }
  }, [windowWidth, slotSize, gridCols]);
  
  const currentSlotSize = slotSizeMap[slotSize];
  
  // Use custom grid columns or responsive grid columns
  const useCustomGrid = gridCols !== 10;

  // Memoize the responsive grid class calculation
  const responsiveGridClass = useMemo(() => cn(
    'grid gap-2',
    gridColsClasses[(useCustomGrid ? gridCols : responsiveGridCols) as GridColsKeys] || 'grid-cols-4',
    'sm:' + (gridColsClasses[Math.min(useCustomGrid ? gridCols : responsiveGridCols + 2, 12) as GridColsKeys] || 'grid-cols-6'),
    'md:' + (gridColsClasses[Math.min(useCustomGrid ? gridCols : responsiveGridCols + 3, 12) as GridColsKeys] || 'grid-cols-8'),
    'lg:' + (gridColsClasses[(useCustomGrid ? gridCols : 10) as GridColsKeys] || 'grid-cols-10')
  ), [useCustomGrid, gridCols, responsiveGridCols]);

  // Memoize the slot click handler
  const handleSlotClick = useCallback((slot: SystemSlotType) => {
    if (onSlotClick) {
      onSlotClick(slot);
    }
  }, [onSlotClick]);

  return (
    <div className={cn('space-y-6', className)}>
      {categories.map((category) => (
        <div key={category.id} className="space-y-3 rounded-lg border border-gray-700 glass-panel-light p-3">
          {/* Category Header */}
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-semibold text-white">
              {category.displayName}
            </h3>
            <div className="flex items-center space-x-2">
              <span className="text-sm font-medium text-gray-300">
                {category.slots.filter(slot => slot.isOccupied).length}/{category.slots.length}
              </span>
              <div className="game-progress-bar w-16">
                <div 
                  className="game-progress-fill bg-gray-400"
                  style={{ width: `${category.slots.length > 0 ? (category.slots.filter(slot => slot.isOccupied).length / category.slots.length) * 100 : 0}%` }}
                />
              </div>
            </div>
          </div>
          
          {/* Slots Grid - Now using Tailwind's responsive classes */}
          <div className={cn(
            responsiveGridClass,
            'mx-auto max-w-full px-2',
            'sm:max-w-3xl sm:px-0',
            'md:max-w-4xl',
            'lg:max-w-5xl'
          )}>
            {category.slots.map((slot) => (
              <SystemSlot
                key={slot.id}
                slot={slot}
                isSelected={selectedSlotId === slot.id}
                onClick={handleSlotClick}
                size={slotSize}
                useDynamicSizing={true}
              />
            ))}
            
            {/* Empty slots to fill the grid if needed */}
            {Array.from({ length: Math.max(0, category.maxSlots - category.slots.length) }).map((_, index) => (
              <div
                key={`empty-${index}`}
                className={cn(
                  'border-2 border-dashed border-border-dark rounded-lg bg-theme-darker',
                  emptyDynamicSizeClasses[slotSize]
                )}
              />
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// Wrap with React.memo to prevent unnecessary re-renders
export default memo(SystemSlotGrid);
