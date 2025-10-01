/**
 * Utility functions to detect and categorize RNG box items
 */

export interface RngBoxInfo {
  isRngBox: boolean;
  type: 'cartridge' | 'dice' | null;
  outputQuantity: number;
}

/**
 * Detects if a recipe produces RNG box items and returns relevant information
 */
export function detectRngBox(recipeName: string, recipeOutput: string, outputQuantity: number): RngBoxInfo {
  // Check for Shape Cartridge items
  if (recipeName.includes('Shape Cartridge') && recipeOutput.includes('Cartridge Roulette')) {
    return {
      isRngBox: true,
      type: 'cartridge',
      outputQuantity
    };
  }

  // Check for Disc items (created from Dice)
  if (recipeName.includes('Disc') && recipeOutput.includes('Dice')) {
    return {
      isRngBox: true,
      type: 'dice',
      outputQuantity
    };
  }

  return {
    isRngBox: false,
    type: null,
    outputQuantity
  };
}

/**
 * Gets user-friendly explanation for RNG box types
 */
export function getRngBoxExplanation(type: 'cartridge' | 'dice'): string {
  switch (type) {
    case 'cartridge':
      return 'This recipe creates a Cartridge Roulette box that contains multiple Shape Cartridges when opened.';
    case 'dice':
      return 'This recipe creates a Dice box that contains multiple Disc items when opened.';
    default:
      return '';
  }
}