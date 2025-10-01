'use client';

import React from 'react';
import { StatIcon } from '../../build-planner/components/StatIcon';

interface StatIconClientProps {
  statId: string;
  width?: number;
  height?: number;
  className?: string;
  fallbackColor?: string; // Made optional since we're not using it anymore
}

export const StatIconClient: React.FC<StatIconClientProps> = ({ 
  statId, 
  width = 40, 
  height = 40, 
  className = ''
}) => {
  return (
    <StatIcon 
      statId={statId} 
      width={width} 
      height={height}
      fill={false}
      circular={false}
      className={className}
    />
  );
};