'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { ChevronDown, ChevronUp, Settings } from 'lucide-react';
import { EXTREME_CORES, getCorePriceName } from '@/tools/extreme-upgrade-calculator/data/extreme-upgrade-data';
import { usePriceStore } from '@/stores/priceStore';

export default function CorePriceConfig() {
  const { getPrice, setPrice, hasPrice, prices } = usePriceStore();
  const [isExpanded, setIsExpanded] = useState(false);

  const handlePriceChange = (coreLevel: number, value: string) => {
    const numericValue = parseInt(value.replace(/\s/g, ''));
    if (!isNaN(numericValue) && numericValue >= 0) {
      const priceName = getCorePriceName(coreLevel);
      setPrice(priceName, numericValue);
    } else if (value === '') {
      // Allow clearing the field
      const priceName = getCorePriceName(coreLevel);
      setPrice(priceName, 0);
    }
  };

  const formatInputValue = (value: string) => {
    // Remove non-digits
    const numericValue = value.replace(/\D/g, '');
    // Add spaces for consistency
    return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ' ');
  };

  return (
    <div className="glass-panel p-6 mb-6">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group hover:bg-foreground/5 p-4 -m-4 rounded-lg transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Settings className="w-6 h-6 text-game-gold" />
            <h3 className="text-xl font-semibold text-game-gold">Core Prices (Optional)</h3>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
              {isExpanded ? 'Hide Settings' : 'Show Settings'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-game-gold" />
            ) : (
              <ChevronDown className="w-5 h-5 text-game-gold" />
            )}
          </div>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[1000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {EXTREME_CORES.map((core) => {
              const priceName = getCorePriceName(core.level);
              const currentPrice = getPrice(priceName) || 0;

              return (
                <div key={core.level} className="glass-panel-light p-4">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="relative w-10 h-10">
                      <Image
                        src={core.imagePath}
                        alt={`Core Level ${core.level}`}
                        fill
                        className="object-contain"
                      />
                    </div>
                    <div>
                      <div className="font-semibold">Level {core.level}</div>
                      <div className="text-xs text-orange-400">{core.power} power</div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <input
                      type="text"
                      value={formatInputValue(currentPrice.toString())}
                      onChange={(e) => handlePriceChange(core.level, e.target.value)}
                      placeholder="0"
                      className="w-full px-3 py-2 bg-theme-dark border border-border-dark rounded-md text-sm focus:outline-none focus:border-orange-400"
                    />
                    <div className="text-xs text-foreground/50 text-center">
                      Price in Alz
                    </div>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
}