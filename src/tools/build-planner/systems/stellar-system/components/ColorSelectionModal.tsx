'use client';

import { useState } from 'react';
import { X } from 'lucide-react';
import { nodeColors, NodeColor } from '../data/stellar-data';
import { cn } from '@/tools/build-planner/lib/utils';

interface ColorSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  nodeId: number;
  currentColor?: string;
  onColorSelect: (nodeId: number, colorKey: string) => void;
}

export default function ColorSelectionModal({
  isOpen,
  onClose,
  nodeId,
  currentColor,
  onColorSelect
}: ColorSelectionModalProps) {
  const [selectedColor, setSelectedColor] = useState<string>(currentColor || '');

  if (!isOpen) return null;

  const handleColorSelect = (colorKey: string) => {
    setSelectedColor(colorKey);
    onColorSelect(nodeId, colorKey);
    onClose();
  };

  const handleRemoveColor = () => {
    setSelectedColor('');
    onColorSelect(nodeId, '');
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative glass-panel w-full max-w-md overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <div>
            <h2 className="text-xl font-bold text-white">
              Select Node Color
            </h2>
            <p className="text-sm text-gray-400">
              Node {nodeId}
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-theme-light rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* Color Options */}
        <div className="p-4">
          <div className="flex flex-wrap justify-center gap-3">
            {Object.entries(nodeColors).map(([colorKey, color]) => {
              const isSelected = selectedColor === colorKey;
              
              return (
                <button
                  key={colorKey}
                  onClick={() => handleColorSelect(colorKey)}
                  className={cn(
                    'flex flex-col items-center p-3 rounded-lg border-2 transition-all min-w-[80px]',
                    isSelected
                      ? 'border-game-highlight bg-game-highlight/20 text-white shadow-lg'
                      : 'border-border-dark hover:border-gray-400 bg-theme-dark text-gray-300 hover:bg-theme-lighter'
                  )}
                >
                  {/* Color Preview */}
                  <div 
                    className="w-10 h-10 rounded-full border-2 mb-1.5 flex-shrink-0"
                    style={{
                      backgroundColor: color.cssColor,
                      borderColor: color.borderColor,
                      boxShadow: `0 0 12px ${color.glowColor}`
                    }}
                  />
                  
                  {/* Color Name */}
                  <div className="font-medium text-center text-sm">{color.name}</div>
                  
                  {/* Selection Indicator */}
                  {isSelected && (
                    <div className="w-3 h-3 rounded-full bg-game-highlight mt-1 flex items-center justify-center">
                      <div className="w-1.5 h-1.5 rounded-full bg-white" />
                    </div>
                  )}
                </button>
              );
            })}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-dark flex justify-between">
          {currentColor ? (
            <button
              onClick={handleRemoveColor}
              className="px-4 py-2 game-button bg-stat-offensive-bg text-stat-offensive hover:border-stat-offensive hover:text-white rounded-lg transition-colors"
            >
              Remove Current Color
            </button>
          ) : (
            <div />
          )}
          
          <div className="flex space-x-2">
            <button
              onClick={onClose}
              className="px-4 py-2 game-button hover:bg-theme-lighter text-white rounded-lg transition-colors"
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}