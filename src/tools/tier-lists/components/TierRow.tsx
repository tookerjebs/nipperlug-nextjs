'use client';

import { useState } from 'react';
import { TierData } from '../types';
import { TIER_COLORS } from '../config';
import { ClassIcon } from '../../../components/ui/ClassIcon';

interface TierRowProps {
  tierData: TierData;
  tierListId: string;
}

const getTierColors = (tier: string) => {
  return TIER_COLORS[tier as keyof typeof TIER_COLORS] || TIER_COLORS.default;
};

export default function TierRow({ tierData, tierListId }: TierRowProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const colors = getTierColors(tierData.tier);

  return (
    <div className="glass-panel border-2 rounded-lg transition-all duration-200 mb-2 overflow-hidden">
      {/* Tier Row Header */}
      <div 
        className="flex items-stretch cursor-pointer hover:bg-black/20 transition-colors duration-200"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        {/* Tier Label - Classic tier list style */}
        <div className={`${colors.label} w-16 sm:w-20 flex items-center justify-center font-bold text-xl sm:text-2xl border-r-2 ${colors.border} flex-shrink-0`}>
          {tierData.label}
        </div>

        {/* Class Icons Container */}
        <div className="flex-1 p-2 sm:p-3 min-h-[70px] sm:min-h-[80px] flex items-center">
          <div className="flex flex-wrap gap-1.5 sm:gap-2 w-full">
            {tierData.classes.map((classInfo) => (
              <div key={classInfo.slug} className="flex flex-col items-center group cursor-pointer">
                <div className="w-10 h-10 sm:w-12 sm:h-12 mb-1 flex items-center justify-center">
                  <ClassIcon
                    iconPath={classInfo.icon}
                    width={40}
                    height={40}
                    alt={`${classInfo.name} Icon`}
                  />
                </div>
                <span className="text-xs text-foreground/90 group-hover:text-game-highlight transition-colors text-center block leading-tight max-w-[50px] sm:max-w-[60px] break-words">
                  {classInfo.name}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* Expand/Collapse Indicator */}
        <div className="w-10 sm:w-12 flex items-center justify-center text-foreground/60 border-l border-gray-600/30">
          <svg 
            className={`w-4 h-4 sm:w-5 sm:h-5 transition-transform duration-200 ${isExpanded ? 'rotate-180' : ''}`}
            fill="none" 
            stroke="currentColor" 
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
          </svg>
        </div>
      </div>

      {/* Expanded Content */}
      {isExpanded && (
        <div className={`border-t-2 ${colors.border} ${colors.bg} p-3 sm:p-4 md:p-6 animate-slideDown`}>
          <div className="space-y-3 sm:space-y-4">
            {tierData.classes.map((classInfo) => (
              <div key={classInfo.slug} className="text-foreground/90 leading-relaxed">
                <p className="text-sm sm:text-base break-words hyphens-auto">{classInfo.description}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}