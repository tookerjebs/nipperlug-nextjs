/**
 * Artifact System Component
 * Main component for the artifact system
 */

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { ArtifactType } from './types';
import { useArtifactSystemStore } from './stores/artifactSystemStore';
import ArtifactSlot from './components/ArtifactSlot';
import ArtifactSelectionModal from './components/ArtifactSelectionModal';
import ArtifactUpgradeModal from './components/ArtifactUpgradeModal';
import ArtifactTooltipWrapper from './components/ArtifactTooltipWrapper';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';

const ArtifactSystem: React.FC = () => {
  const {
    configuredArtifacts,
    isModalOpen,
    selectedArtifactType,
    openModal,
    closeModal,
    selectArtifact,
    initializeSystem,
    calculateTotalStats,
  } = useArtifactSystemStore();
  
  const [hoveredArtifactType, setHoveredArtifactType] = useState<ArtifactType | null>(null);
  const [tooltipPosition, setTooltipPosition] = useState({ 
    mouseX: 0, 
    mouseY: 0, 
    slotX: 0, 
    slotY: 0, 
    width: 0, 
    height: 0 
  });
  const hoverTimeoutRef = useRef<number | null>(null);
  
  // Initialize the system when component mounts
  useEffect(() => {
    initializeSystem();
    
    return () => {
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, [initializeSystem]);
  
  // Handle slot click
  const handleSlotClick = (artifactType: ArtifactType) => {
    const artifact = configuredArtifacts[artifactType];
    if (artifact) {
      // Open upgrade modal if artifact is configured
      openModal(artifactType);
    } else {
      // Open selection modal if slot is empty
      openModal(artifactType);
    }
  };
  
  // Handle slot hover
  const handleSlotHover = (artifactType: ArtifactType | null, event?: React.MouseEvent) => {
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (artifactType) {
      setHoveredArtifactType(artifactType);
      if (event) {
        const rect = event.currentTarget.getBoundingClientRect();
        setTooltipPosition({
          mouseX: event.clientX,
          mouseY: event.clientY,
          slotX: rect.left,
          slotY: rect.top,
          width: rect.width,
          height: rect.height,
        });
      }
    } else {
      // Small delay before removing tooltip
      hoverTimeoutRef.current = window.setTimeout(() => {
        setHoveredArtifactType(null);
        hoverTimeoutRef.current = null;
      }, 50);
    }
  };
  
  // Handle mouse movement within a slot for tooltip following
  const handleSlotMouseMove = useCallback((artifactType: ArtifactType, event: React.MouseEvent) => {
    if (hoveredArtifactType === artifactType) {
      const rect = event.currentTarget.getBoundingClientRect();
      setTooltipPosition(prev => ({
        ...prev,
        mouseX: event.clientX,
        mouseY: event.clientY,
        slotX: rect.left,
        slotY: rect.top,
        width: rect.width,
        height: rect.height,
      }));
    }
  }, [hoveredArtifactType]);
  
  // Get already equipped artifacts
  const alreadyEquipped: ArtifactType[] = Object.entries(configuredArtifacts)
    .filter(([_, artifact]) => artifact !== null)
    .map(([type, _]) => type as ArtifactType);
  
  // Determine which modal to show
  const showSelectionModal = isModalOpen && selectedArtifactType && !configuredArtifacts[selectedArtifactType];
  const showUpgradeModal = isModalOpen && selectedArtifactType && configuredArtifacts[selectedArtifactType];
  
  const totalStats = calculateTotalStats();
  
  return (
    <div className="w-full h-full flex flex-col items-center justify-center p-4">
      {/* Header with Total Stats Button */}
      <div className="mb-6 flex justify-end w-full max-w-md">
        <TotalStatsButton
          totalStats={totalStats}
          systemName="Artifact"
        />
      </div>
      
      {/* Artifact Slots - 3 stacked */}
      <div className="flex flex-col items-center space-y-4">
        <ArtifactSlot
          artifactType="dawn"
          isConfigured={configuredArtifacts.dawn !== null}
          isHovered={hoveredArtifactType === 'dawn'}
          onClick={() => handleSlotClick('dawn')}
          onMouseEnter={(e) => handleSlotHover('dawn', e)}
          onMouseMove={(e) => handleSlotMouseMove('dawn', e)}
          onMouseLeave={() => handleSlotHover(null)}
        />
        <ArtifactSlot
          artifactType="dusk"
          isConfigured={configuredArtifacts.dusk !== null}
          isHovered={hoveredArtifactType === 'dusk'}
          onClick={() => handleSlotClick('dusk')}
          onMouseEnter={(e) => handleSlotHover('dusk', e)}
          onMouseMove={(e) => handleSlotMouseMove('dusk', e)}
          onMouseLeave={() => handleSlotHover(null)}
        />
        <ArtifactSlot
          artifactType="midnight"
          isConfigured={configuredArtifacts.midnight !== null}
          isHovered={hoveredArtifactType === 'midnight'}
          onClick={() => handleSlotClick('midnight')}
          onMouseEnter={(e) => handleSlotHover('midnight', e)}
          onMouseMove={(e) => handleSlotMouseMove('midnight', e)}
          onMouseLeave={() => handleSlotHover(null)}
        />
      </div>
      
      {/* Selection Modal - Opens when clicking empty slot */}
      {showSelectionModal && selectedArtifactType && (
        <ArtifactSelectionModal
          isOpen={true}
          onClose={closeModal}
          onSelectArtifact={(type) => {
            selectArtifact(type);
            // After selecting, open the upgrade modal
            setTimeout(() => {
              openModal(type);
            }, 100);
          }}
          alreadyEquipped={alreadyEquipped}
        />
      )}
      
      {/* Upgrade Modal - Opens when clicking configured artifact */}
      {showUpgradeModal && selectedArtifactType && (
        <ArtifactUpgradeModal
          isOpen={true}
          onClose={closeModal}
          artifactType={selectedArtifactType}
        />
      )}
      
      {/* Tooltip - Shows on hover */}
      {hoveredArtifactType && configuredArtifacts[hoveredArtifactType] && (
        <ArtifactTooltipWrapper
          artifact={configuredArtifacts[hoveredArtifactType]!}
          visible={true}
          mouseX={tooltipPosition.mouseX}
          mouseY={tooltipPosition.mouseY}
          slotX={tooltipPosition.slotX}
          slotY={tooltipPosition.slotY}
          width={tooltipPosition.width}
          height={tooltipPosition.height}
        />
      )}
    </div>
  );
};

export default ArtifactSystem;

