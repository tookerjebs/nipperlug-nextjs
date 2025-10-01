/**
 * Equipment System Layout Configuration
 * Contains constants and configuration for the equipment grid layout
 */

// Slot width constants
export const SLOT_SIZES = {
  extraSmall: {
    width: 37.5,
    height: 40
  },
  small: {
    width: 80,
    height: 40
  },
  medium: {
    width: 80,
    height: 80
  },
  large: {
    width: 80,
    height: 110
  }
};

// Gap between slots
export const SLOT_GAP = 5;

// SVG container dimensions
export const SVG_DIMENSIONS = {
  width: 300,
  height: 500
};

// Slot positions configuration
// This replaces the hardcoded x, y coordinates in the original component
export const SLOT_POSITIONS = {
  // Left Column - Weapon slots
  'amulet': { x: 10, y: 10, size: 'small' },
  'ring-1': { x: 10, y: 10 + SLOT_SIZES.small.height + SLOT_GAP, size: 'extraSmall' },
  'ring-2': { 
    x: 10 + SLOT_SIZES.extraSmall.width + SLOT_GAP, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'ring-3': { 
    x: 10, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'ring-4': { 
    x: 10 + SLOT_SIZES.extraSmall.width + SLOT_GAP, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'weapon-main': { 
    x: 10, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP, 
    size: 'large' 
  },
  'gloves': { 
    x: 10, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP, 
    size: 'medium' 
  },
  'effector-1': { 
    x: 10, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.medium.height + SLOT_GAP, 
    size: 'small' 
  },
  'effector-2': { 
    x: 10, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },
  'arcana-1': { 
    x: 10, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },

  // Middle Column - Armor slots
  'armor-helmet': { x: 110, y: 10, size: 'medium' },
  'carnelian': { x: 110, y: 10 + SLOT_SIZES.medium.height + SLOT_GAP, size: 'small' },
  'armor-body': { 
    x: 110, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'large' 
  },
  'earring-1': { 
    x: 110, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'earring-2': { 
    x: 110 + SLOT_SIZES.extraSmall.width + SLOT_GAP, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'bracelet-1': { 
    x: 110, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'bracelet-2': { 
    x: 110 + SLOT_SIZES.extraSmall.width + SLOT_GAP, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP, 
    size: 'extraSmall' 
  },
  'brooch': { 
    x: 110, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP, 
    size: 'small' 
  },
  'charm': { 
    x: 110, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },
  'talisman': { 
    x: 110, 
    y: 10 + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.extraSmall.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },

  // Right Column - Accessory slots
  'bike': { x: 210, y: 10, size: 'small' },
  'epaulet': { x: 210, y: 10 + SLOT_SIZES.small.height + SLOT_GAP, size: 'small' },
  'belt-1': { 
    x: 210, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },
  'weapon-sub': { 
    x: 210, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'large' 
  },
  'armor-boots': { 
    x: 210, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP, 
    size: 'medium' 
  },
  'effector-3': { 
    x: 210, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.medium.height + SLOT_GAP, 
    size: 'small' 
  },
  'effector-4': { 
    x: 210, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },
  'arcana-2': { 
    x: 210, 
    y: 10 + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.large.height + SLOT_GAP + SLOT_SIZES.medium.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP + SLOT_SIZES.small.height + SLOT_GAP, 
    size: 'small' 
  },
};

// Helper function to get width and height from slot size name
export const getSlotDimensions = (slotId: string) => {
  const position = SLOT_POSITIONS[slotId as keyof typeof SLOT_POSITIONS];
  if (!position) return { width: 0, height: 0, x: 0, y: 0 };

  const size = position.size as keyof typeof SLOT_SIZES;
  return {
    width: SLOT_SIZES[size].width,
    height: SLOT_SIZES[size].height,
    x: position.x,
    y: position.y
  };
};