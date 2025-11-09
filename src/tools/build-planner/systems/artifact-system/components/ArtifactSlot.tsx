/**
 * Artifact Slot Component
 * Displays a single square artifact slot
 * Styled to match equipment system slots
 */

import React from 'react';
import Image from 'next/image';
import { ArtifactType } from '../types';

interface ArtifactSlotProps {
  artifactType: ArtifactType;
  isConfigured: boolean;
  isHovered: boolean;
  onClick: () => void;
  onMouseEnter: (e: React.MouseEvent) => void;
  onMouseMove?: (e: React.MouseEvent) => void;
  onMouseLeave: () => void;
}

const ArtifactSlot: React.FC<ArtifactSlotProps> = ({
  artifactType,
  isConfigured,
  isHovered,
  onClick,
  onMouseEnter,
  onMouseMove,
  onMouseLeave,
}) => {
  const getArtifactName = () => {
    switch (artifactType) {
      case 'dawn':
        return 'Dawn';
      case 'dusk':
        return 'Dusk';
      case 'midnight':
        return 'Midnight';
    }
  };
  
  const getImagePath = () => {
    switch (artifactType) {
      case 'dawn':
        return '/images/artifacts/artifact-dawn.png';
      case 'dusk':
        return '/images/artifacts/artifact-dusk.png';
      case 'midnight':
        return '/images/artifacts/artifact-midnight.png';
    }
  };
  
  return (
    <div
      className="relative w-24 h-24 rounded-lg transition-all duration-200 cursor-pointer flex items-center justify-center overflow-hidden"
      style={{
        background: isHovered 
          ? 'linear-gradient(135deg, rgba(30, 30, 38, 0.9) 0%, rgba(45, 45, 55, 0.7) 100%)'
          : 'linear-gradient(135deg, rgba(20, 20, 28, 0.8) 0%, rgba(35, 35, 45, 0.6) 100%)',
        border: isHovered 
          ? '3px solid rgba(120, 120, 140, 0.9)' 
          : isConfigured 
            ? '2px solid rgba(255, 215, 0, 0.4)' 
            : '2px solid rgba(60, 60, 75, 0.6)',
        boxShadow: isConfigured ? '0 4px 8px rgba(0, 0, 0, 0.3)' : 'none',
        filter: 'drop-shadow(2px 2px 3px rgba(0, 0, 0, 0.3))',
      }}
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseMove={onMouseMove}
      onMouseLeave={onMouseLeave}
    >
      {/* Subtle inner highlight for hover */}
      {isHovered && (
        <div
          className="absolute inset-[1px] rounded-lg pointer-events-none"
          style={{
            border: '0.5px solid rgba(255, 215, 0, 0.4)',
          }}
        />
      )}
      
      {isConfigured ? (
        <Image
          src={getImagePath()}
          alt={getArtifactName()}
          width={80}
          height={80}
          className="w-20 h-20 object-contain pointer-events-none"
          onError={(e) => {
            const target = e.target as HTMLImageElement;
            target.style.display = 'none';
          }}
        />
      ) : (
        <div className="text-gray-500 text-xs text-center">
          <div>+</div>
          <div className="text-[10px] mt-1">{getArtifactName()}</div>
        </div>
      )}
    </div>
  );
};

export default ArtifactSlot;

