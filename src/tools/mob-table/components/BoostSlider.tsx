import React from 'react';

interface BoostSliderProps {
  currentLevel: number;
  onLevelChange: (level: number) => void;
}

export const BoostSlider: React.FC<BoostSliderProps> = ({
  currentLevel,
  onLevelChange
}) => {
  return (
    <div className="flex items-center gap-3 px-2 py-1">
      <label className="text-xs font-medium text-foreground/70 whitespace-nowrap">
        Boost:
      </label>
      
      <div className="relative flex items-center gap-2">
        <input
          type="range"
          min="0"
          max="5"
          value={currentLevel}
          onChange={(e) => onLevelChange(Number(e.target.value))}
          className="w-24 h-1 bg-component-card rounded appearance-none cursor-pointer slider"
          style={{
            background: `linear-gradient(to right, #f59e0b 0%, #f59e0b ${currentLevel * 20}%, #374151 ${currentLevel * 20}%, #374151 100%)`
          }}
        />
        
        <span className="text-xs font-bold text-game-gold min-w-[3ch] text-center">
          {currentLevel}
        </span>
      </div>
    </div>
  );
};