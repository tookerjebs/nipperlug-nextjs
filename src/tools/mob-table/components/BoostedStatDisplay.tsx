import React from 'react';
import { BoostedStat } from '../utils/boostCalculator';

interface BoostedStatDisplayProps {
  label: string;
  boostedStat: BoostedStat;
  showPercentage?: boolean;
}

export const BoostedStatDisplay: React.FC<BoostedStatDisplayProps> = ({
  label,
  boostedStat,
  showPercentage = true
}) => {
  const { original, boosted, percentage } = boostedStat;
  const isBoosted = boosted !== original;

  return (
    <div className="flex justify-between items-center py-1">
      <span className="text-foreground/80 text-sm">{label}:</span>
      <div className="flex items-center gap-2">
        {isBoosted && (
          <span className="text-foreground/60 text-sm line-through">
            {original.toLocaleString()}
          </span>
        )}
        <span className={`font-medium ${isBoosted ? 'text-game-gold' : 'text-foreground'}`}>
          {boosted.toLocaleString()}
        </span>
        {isBoosted && showPercentage && (
          <span className="text-xs text-game-gold bg-game-gold/20 px-1 rounded">
            +{percentage}%
          </span>
        )}
      </div>
    </div>
  );
};