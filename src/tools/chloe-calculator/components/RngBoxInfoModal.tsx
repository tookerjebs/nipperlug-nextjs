'use client';

import React from 'react';
import { X } from 'lucide-react';

interface RngBoxInfoModalProps {
  isOpen: boolean;
  onClose: () => void;
  itemName: string;
  recipeName: string;
  itemType: 'cartridge' | 'dice';
  outputQuantity: number;
}

const RngBoxInfoModal: React.FC<RngBoxInfoModalProps> = ({
  isOpen,
  onClose,
  itemName,
  recipeName,
  itemType,
  outputQuantity
}) => {
  if (!isOpen) return null;

  const isCartridge = itemType === 'cartridge';
  
  // Extract the box name from recipe (remove " x 1" suffix)
  const boxName = recipeName.replace(/ x \d+$/, '');
  
  // Extract the specific item name for display
  const displayItemName = itemName;

  // Create specific example based on item type
  const examplePrice = isCartridge ? '50k' : '10k';
  const exampleBoxPrice = isCartridge ? '~150k' : '~500k';

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-theme-dark border border-border-light rounded-lg max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-light">
          <h3 className="text-lg font-medium text-white">RNG Box Pricing</h3>
          <button onClick={onClose} className="text-gray-400 hover:text-white">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content */}
        <div className="p-4 space-y-4">
          <div>
            <p className="text-gray-300 text-sm mb-3">
              This recipe creates a <strong>{boxName}</strong> containing ~{outputQuantity} {displayItemName}s.
            </p>
            
            <p className="text-gray-400 text-xs mb-3">
              (~{outputQuantity} is an average from testing - actual results may vary)
            </p>
            
            <div className="bg-green-900/20 border border-green-600/30 rounded p-3 mb-3">
              <div className="text-green-400 font-medium mb-1">Enter:</div>
              <div className="text-sm text-gray-300">
                Price of x1 <strong>{displayItemName}</strong>
              </div>
            </div>

            <div className="bg-red-900/20 border border-red-600/30 rounded p-3">
              <div className="text-red-400 font-medium mb-1">Don't enter:</div>
              <div className="text-sm text-gray-300">
                Price of the <strong>{boxName}</strong> itself
              </div>
            </div>
          </div>

          <div className="text-xs text-gray-400 bg-theme-darker p-3 rounded">
            Example: If individual <strong>{displayItemName}</strong>s sell for {examplePrice} each, enter {examplePrice.replace('k', ',000')}
          </div>
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-border-light">
          <button
            onClick={onClose}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded transition-colors"
          >
            Got it
          </button>
        </div>
      </div>
    </div>
  );
};

export default RngBoxInfoModal;