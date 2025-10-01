// Equipment System UI Component
// Implements a grid of equipment slots with different sizes arranged in three columns, with hover and click interactions.

import React, { useState, useEffect, useRef, useCallback } from 'react';
import EquipmentGrid from './components/EquipmentGrid'; // Import the extracted EquipmentGrid component
import EquipmentSlotModal from './components/EquipmentSlotModal'; // Import the modal component
import { useEquipmentSystemStore } from './stores/equipmentSystemStore';
import { systemConfig as equipmentSystemConfig } from './stores/equipmentSystemStore';
import UnifiedEquipmentTooltip from './components/UnifiedEquipmentTooltip'; // Import the unified tooltip component
import { isEpaulet } from './components/UnifiedEquipmentTooltip';

// Export the equipment system config for build sharing
export { equipmentSystemConfig };

const EquipmentSystem: React.FC = () => {
  // Use the equipment system store for state management
  const { isModalOpen, selectedSlotId, openModal, closeModal, getConfiguredEquipment } = useEquipmentSystemStore();

  // Utility function to get equipment for any slot using the new generic method
  const getEquipmentForSlot = (slotId: string) => {
    return getConfiguredEquipment(slotId) || null;
  };
  const [hoveredSlotId, setHoveredSlotId] = useState<string | undefined>(undefined);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0, slotX: 0, slotY: 0, width: 0, height: 0, mouseX: 0, mouseY: 0 });
  const hoverTimeoutRef = useRef<number | null>(null);
  
  // Initialize the equipment system when the component mounts
  useEffect(() => {
    useEquipmentSystemStore.getState().initializeSystem();
    
    // Cleanup: only clean up UI state, not equipment selections
    return () => {
      // Close any open modals when switching away from the system
      useEquipmentSystemStore.getState().closeModal();
      
      // Clear any pending timeouts
      if (hoverTimeoutRef.current !== null) {
        window.clearTimeout(hoverTimeoutRef.current);
      }
    };
  }, []);

  // Handle slot click - opens the modal for the selected slot
  const handleSlotClick = (slotId: string) => {
    openModal(slotId);
  };

  // Handle modal close
  const handleCloseModal = () => {
    closeModal();
  };

  // Handle slot hover with debounce for tooltip
  const handleSlotHover = (slotId: string | undefined, position?: { slotX: number; slotY: number; width: number; height: number }) => {
    // Clear any existing timeout
    if (hoverTimeoutRef.current !== null) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    
    if (slotId) {
      // Set hover state immediately (no delay on enter)
      setHoveredSlotId(slotId);
      
      // Store the slot position for tooltip positioning if provided
      if (position) {
        setTooltipPosition({
          x: 0, y: 0, // Keep these for backwards compatibility
          slotX: position.slotX, 
          slotY: position.slotY,
          width: position.width,
          height: position.height,
          mouseX: position.slotX + position.width / 2, // Initial mouse position at slot center
          mouseY: position.slotY + position.height / 2
        });
      }
    } else {
      // Small delay before removing tooltip to prevent flickering
      hoverTimeoutRef.current = window.setTimeout(() => {
        setHoveredSlotId(undefined);
        hoverTimeoutRef.current = null;
      }, 50); // 50ms delay
    }
  };

  // Handle mouse movement within a slot for tooltip following (throttled for performance)
  const handleSlotMouseMove = useCallback((slotId: string, position: { mouseX: number; mouseY: number; slotX: number; slotY: number; width: number; height: number }) => {
    // Only update if this is the currently hovered slot
    if (hoveredSlotId === slotId) {
      setTooltipPosition(prev => ({
        ...prev,
        mouseX: position.mouseX,
        mouseY: position.mouseY,
        slotX: position.slotX,
        slotY: position.slotY,
        width: position.width,
        height: position.height
      }));
    }
  }, [hoveredSlotId]);

  // Check if a slot has an item
  const hasItemInSlot = (slotId: string): boolean => {
    return !!getEquipmentForSlot(slotId);
  };

  // Get the image path for an item in a slot
  const getItemImagePath = (slotId: string): string | undefined => {
    const equipment = getEquipmentForSlot(slotId);
    return equipment?.imagePath;
  };

  // SVG viewBox is set to maintain aspect ratio while being responsive
  return (
    <div className="w-full h-full flex items-center justify-center p-4">
      {/* Use the extracted EquipmentGrid component */}
      <EquipmentGrid
        onSlotClick={handleSlotClick}
        onSlotHover={handleSlotHover}
        onSlotMouseMove={handleSlotMouseMove}
        hoveredSlotId={hoveredSlotId}
        hasItemInSlot={hasItemInSlot}
        getItemImagePath={getItemImagePath}
      />
      
      {/* Equipment Slot Modal */}
      {isModalOpen && selectedSlotId && (
        <EquipmentSlotModal
          slotId={selectedSlotId as string} 
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      )}

      {/* Unified Equipment Tooltip - Show for any slot with configured equipment */}
      {hoveredSlotId && (
        (() => {
          // Get the appropriate item for the tooltip using unified equipment detection
          const item = getEquipmentForSlot(hoveredSlotId);
          
          return item && (
            <UnifiedEquipmentTooltip
              item={item}
              visible={true}
              x={tooltipPosition.x}
              y={tooltipPosition.y}
              slotX={tooltipPosition.slotX}
              slotY={tooltipPosition.slotY}
              width={tooltipPosition.width}
              height={tooltipPosition.height}
              mouseX={tooltipPosition.mouseX}
              mouseY={tooltipPosition.mouseY}
            />
          );
        })()
      )}
    </div>
  );
};

export default EquipmentSystem;