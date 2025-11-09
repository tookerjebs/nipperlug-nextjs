'use client';

import React from 'react';
import { usePlatinumMeritStore } from '../stores/platinumMeritStore';
import { PlatinumSpecialMasterySlot } from './PlatinumSpecialMasterySlot';
import type { PlatinumSpecialMasterySectionProps } from '../types/index';

export const PlatinumSpecialMasterySection: React.FC<PlatinumSpecialMasterySectionProps> = ({
  categoryId
}) => {
  const { getSpecialMasteryStats } = usePlatinumMeritStore();
  const statOptions = getSpecialMasteryStats(categoryId);
  
  if (!statOptions || statOptions.length === 0) {
    return null;
  }
  
  return (
    <div className="mt-8 pt-6 border-t border-gray-700">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-game-platinum">Special Mastery</h3>
        <p className="text-sm text-gray-400 mt-1">
          Select stats for your special mastery slots. Both slots share the same stat pool.
        </p>
      </div>
      
      <div className="flex gap-4 justify-center">
        <PlatinumSpecialMasterySlot
          categoryId={categoryId}
          slotIndex={0}
          statOptions={statOptions}
        />
        <PlatinumSpecialMasterySlot
          categoryId={categoryId}
          slotIndex={1}
          statOptions={statOptions}
        />
      </div>
    </div>
  );
};

