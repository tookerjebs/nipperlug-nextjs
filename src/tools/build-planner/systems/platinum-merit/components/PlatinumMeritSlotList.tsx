// Simple list view for Platinum Merit slots (temporary until grid positions are defined)
'use client';

import React from 'react';
import { PlatinumMeritSlotGridProps } from '../types/index';
import { PlatinumMeritSlot } from './PlatinumMeritSlot';

export const PlatinumMeritSlotList: React.FC<PlatinumMeritSlotGridProps> = ({ category }) => {
  const { slots } = category;

  return (
    <div className="space-y-3 w-full">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {slots.map(slot => (
          <div key={slot.id} className="flex justify-center">
            <PlatinumMeritSlot slot={slot} />
          </div>
        ))}
      </div>
    </div>
  );
};

