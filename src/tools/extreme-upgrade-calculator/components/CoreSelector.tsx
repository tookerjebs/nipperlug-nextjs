'use client';

import React from 'react';
import Image from 'next/image';
import { EXTREME_CORES, getCoreByLevel } from '@/tools/extreme-upgrade-calculator/data/extreme-upgrade-data';

interface CoreSelectorProps {
  selectedLevel: number | null;
  onSelect: (level: number | null) => void;
  disabled?: boolean;
}

export default function CoreSelector({ selectedLevel, onSelect, disabled = false }: CoreSelectorProps) {
  const [isOpen, setIsOpen] = React.useState(false);

  const selectedCore = selectedLevel ? getCoreByLevel(selectedLevel) : null;

  const handleSelect = (level: number | null) => {
    onSelect(level);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      {/* Selected Core Display / Empty Slot */}
      <button
        onClick={() => !disabled && setIsOpen(!isOpen)}
        disabled={disabled}
        className={`
          w-16 h-16 border border-gray-500 rounded-lg
          flex items-center justify-center
          transition-all duration-200
          ${disabled 
            ? 'opacity-50 cursor-not-allowed' 
            : 'hover:border-orange-400 hover:bg-orange-400/10 cursor-pointer'
          }
          ${selectedCore ? 'border-orange-400 bg-orange-400/20' : ''}
        `}
      >
        {selectedCore ? (
          <div className="relative w-12 h-12">
            <Image
              src={selectedCore.imagePath}
              alt={`Extreme Core Level ${selectedCore.level}`}
              fill
              className="object-contain"
            />
          </div>
        ) : (
          <div className="text-gray-500 text-xl">+</div>
        )}
      </button>

      {/* Modal */}
      {isOpen && !disabled && (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
          {/* Backdrop */}
          <div 
            className="absolute inset-0 bg-black/50 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Modal Content */}
          <div className="relative glass-panel w-full max-w-md max-h-[80vh] overflow-hidden" style={{ borderRadius: '0' }}>
            <div className="p-6">
              <div className="mb-4">
              <h4 className="text-sm font-semibold text-foreground/80 mb-2">Select Extreme Core</h4>
              
              {/* Clear Selection */}
              <button
                onClick={() => handleSelect(null)}
                className="w-full text-left px-3 py-2 rounded-md hover:bg-theme-light text-sm text-red-400 mb-2"
              >
                Clear Selection
              </button>
            </div>

            {/* Core Grid */}
            <div className="grid grid-cols-4 gap-2">
              {EXTREME_CORES.map((core) => (
                <button
                  key={core.level}
                  onClick={() => handleSelect(core.level)}
                  className={`
                    relative p-2 rounded-lg border transition-all duration-200
                    ${selectedLevel === core.level 
                      ? 'border-orange-400 bg-orange-400/20' 
                      : 'border-border-dark hover:border-orange-400/50 hover:bg-orange-400/10'
                    }
                  `}
                >
                  <div className="relative w-8 h-8 mx-auto mb-1">
                    <Image
                      src={core.imagePath}
                      alt={`Core Level ${core.level}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-xs text-center">
                    <div className="font-semibold">Lv.{core.level}</div>
                  </div>
                </button>
              ))}
            </div>

            {/* Core Info */}
            {selectedLevel && selectedCore && (
              <div className="mt-3 pt-3 border-t border-border-dark">
                <div className="text-sm">
                  <div className="font-semibold">Level {selectedCore.level} Core</div>
                </div>
              </div>
            )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}