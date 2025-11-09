/**
 * Artifact Selection Modal
 * Allows user to select which artifact to equip
 * Styled to match equipment system modals
 */

import React from 'react';
import Image from 'next/image';
import { ArtifactType } from '../types';
import { getAllArtifactDefinitions } from '../data/artifacts-data';

interface ArtifactSelectionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectArtifact: (artifactType: ArtifactType) => void;
  alreadyEquipped: ArtifactType[]; // Artifacts already equipped (to prevent duplicates)
}

const ArtifactSelectionModal: React.FC<ArtifactSelectionModalProps> = ({
  isOpen,
  onClose,
  onSelectArtifact,
  alreadyEquipped,
}) => {
  if (!isOpen) return null;
  
  const artifacts = getAllArtifactDefinitions();
  
  const getImagePath = (artifactType: ArtifactType) => {
    switch (artifactType) {
      case 'dawn':
        return '/images/artifacts/artifact-dawn.png';
      case 'dusk':
        return '/images/artifacts/artifact-dusk.png';
      case 'midnight':
        return '/images/artifacts/artifact-midnight.png';
    }
  };
  
  const handleSelect = (artifactType: ArtifactType) => {
    if (alreadyEquipped.includes(artifactType)) {
      return; // Don't allow selecting already equipped artifact
    }
    onSelectArtifact(artifactType);
    onClose();
  };
  
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4">
      <div className="glass-panel-dark w-full max-w-2xl lg:max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto dark-scrollbar">
        {/* Header */}
        <div className="pb-3 mb-4 border-b border-game-gold flex justify-between items-center">
          <div className="flex flex-col">
            <h2 className="text-lg sm:text-xl font-bold text-game-gold glow-text-sm">Select Artifact</h2>
            <p className="text-foreground text-sm mt-1">
              <span className="text-game-highlight font-medium">Choose an artifact to equip</span>
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-white focus:outline-none p-1 rounded-md hover:bg-gray-700 transition-colors"
            aria-label="Close"
          >
            <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>
        
        {/* Artifact Selection Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {artifacts.map(artifact => {
            const isEquipped = alreadyEquipped.includes(artifact.artifactType);
            
            return (
              <div
                key={artifact.artifactType}
                onClick={() => handleSelect(artifact.artifactType)}
                className={`
                  group relative bg-theme-dark rounded-lg border transition-all duration-200 cursor-pointer overflow-hidden
                  ${isEquipped 
                    ? 'border-gray-600 opacity-50 cursor-not-allowed' 
                    : 'border-border-dark hover:border-game-gold hover:shadow-md hover:shadow-game-gold/10'
                  }
                `}
              >
                {/* Header with image and name */}
                <div className="flex flex-col items-center p-3 border-b border-gray-700/30">
                  <Image
                    src={getImagePath(artifact.artifactType)}
                    alt={artifact.name}
                    width={64}
                    height={64}
                    className="w-16 h-16 object-contain mb-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <h4 className="text-sm font-medium text-foreground text-center leading-tight" title={artifact.name}>
                    {artifact.name}
                  </h4>
                </div>

                {/* Stats section */}
                <div className="p-3 h-24 flex flex-col justify-center">
                  <div className="text-xs text-gray-400 space-y-1">
                    <div>{artifact.uniqueSlots.length} Unique, {artifact.assembledSlots.length} Assembled</div>
                    <div>Max Level: {artifact.maxLevel}</div>
                    {isEquipped && (
                      <div className="text-red-400 mt-1">Already equipped</div>
                    )}
                  </div>
                </div>

                {/* Selection indicator */}
                {!isEquipped && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-game-highlight rounded-full opacity-0 group-hover:opacity-100 transition-opacity" />
                )}
              </div>
            );
          })}
        </div>
        
        {/* Info */}
        <div className="mt-4 text-xs text-gray-400 text-center">
          You can equip one artifact of each grade (Dawn, Dusk, Midnight)
        </div>
      </div>
    </div>
  );
};

export default ArtifactSelectionModal;
