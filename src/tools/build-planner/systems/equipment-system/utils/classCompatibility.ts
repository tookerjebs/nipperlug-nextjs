/**
 * Class compatibility utility for equipment filtering
 * Maps weapon types to compatible character classes based on actual game mechanics
 */

import type { CharacterClass } from '../../class/types';

/**
 * Armor weight types
 */
export type ArmorWeight = 'light' | 'medium' | 'heavy';

/**
 * Mapping of weapon types to compatible character classes
 * Based on actual Cabal Online game mechanics
 */
export const weaponClassCompatibility: Record<string, CharacterClass[]> = {
  // Magic weapons - can be used by magic-based classes
  orb: ['wizard', 'force_archer', 'force_gunner', 'dark_mage', 'force_shielder', 'force_blader'],
  crystal: ['wizard', 'force_archer', 'force_gunner', 'dark_mage', 'force_shielder', 'force_blader'],
  
  // Melee weapons - can be used by melee-based classes
  blade: ['force_shielder', 'force_blader', 'blader'],
  katana: ['force_shielder', 'force_blader', 'blader'],
  
  // Heavy weapons - warrior only
  greatsword: ['warrior'],
  daikatana: ['warrior'],
  
  // Throwing weapons - gladiator only
  chakram: ['gladiator']
};

/**
 * Mapping of character classes to their compatible armor weight
 * Based on actual Cabal Online game mechanics
 */
export const classArmorWeightMapping: Record<CharacterClass, ArmorWeight> = {
  // Light armor classes (high defense rate, lower defense)
  blader: 'light',
  wizard: 'light', 
  dark_mage: 'light',
  
  // Medium armor classes (balanced stats)
  force_archer: 'medium',
  force_gunner: 'medium', 
  gladiator: 'heavy',
  
  // Heavy armor classes (high defense, lower defense rate)
  warrior: 'heavy',
  force_blader: 'medium',
  force_shielder: 'heavy'
};

/**
 * Armor weight display names and stat characteristics
 */
export const armorWeightInfo = {
  light: { 
    displayName: 'Suit',
    description: 'Light armor with high defense rate but lower defense'
  },
  medium: { 
    displayName: 'Coat',
    description: 'Medium armor with balanced defense and defense rate'
  },
  heavy: { 
    displayName: 'Plate',
    description: 'Heavy armor with high defense but lower defense rate'
  }
};

/**
 * Check if a weapon type is compatible with a character class
 * @param weaponType The weapon type (e.g., 'orb', 'blade', 'greatsword')
 * @param characterClass The character class to check compatibility for
 * @returns true if the weapon is compatible with the class
 */
export function isWeaponCompatibleWithClass(weaponType: string, characterClass: CharacterClass): boolean {
  const compatibleClasses = weaponClassCompatibility[weaponType];
  if (!compatibleClasses) {
    // If weapon type is not in our mapping, allow it (fallback for unknown weapons)
    return true;
  }
  
  return compatibleClasses.includes(characterClass);
}

/**
 * Get all weapon types compatible with a character class
 * @param characterClass The character class
 * @returns Array of compatible weapon types
 */
export function getCompatibleWeaponTypes(characterClass: CharacterClass): string[] {
  return Object.entries(weaponClassCompatibility)
    .filter(([_, classes]) => classes.includes(characterClass))
    .map(([weaponType, _]) => weaponType);
}

/**
 * Filter weapons array based on character class compatibility
 * @param weapons Array of weapons to filter
 * @param characterClass The character class to filter for (null = show all)
 * @returns Filtered array of weapons
 */
export function filterWeaponsByClass<T extends { type: string }>(
  weapons: T[], 
  characterClass: CharacterClass | null
): T[] {
  if (!characterClass) {
    return weapons; // Show all weapons if no class is selected
  }
  
  return weapons.filter(weapon => isWeaponCompatibleWithClass(weapon.type, characterClass));
}

/**
 * Check if an armor weight is compatible with a character class
 * @param armorWeight The armor weight ('light', 'medium', 'heavy')
 * @param characterClass The character class to check compatibility for
 * @returns true if the armor weight is compatible with the class
 */
export function isArmorWeightCompatibleWithClass(armorWeight: ArmorWeight, characterClass: CharacterClass): boolean {
  const compatibleWeight = classArmorWeightMapping[characterClass];
  return armorWeight === compatibleWeight;
}

/**
 * Get the compatible armor weight for a character class
 * @param characterClass The character class
 * @returns The compatible armor weight
 */
export function getCompatibleArmorWeight(characterClass: CharacterClass): ArmorWeight {
  return classArmorWeightMapping[characterClass];
}

/**
 * Filter armor array based on character class compatibility
 * @param armors Array of armors to filter
 * @param characterClass The character class to filter for (null = show all)
 * @returns Filtered array of armors
 */
export function filterArmorsByClass<T extends { weight?: ArmorWeight }>(
  armors: T[], 
  characterClass: CharacterClass | null
): T[] {
  if (!characterClass) {
    return armors; // Show all armor weights when no class is selected
  }
  
  const compatibleWeight = getCompatibleArmorWeight(characterClass);
  return armors.filter(armor => {
    // If armor doesn't have a weight property, allow it (boots, gloves, etc.)
    if (!armor.weight) {
      return true;
    }
    // If armor has a weight property, only show compatible weight
    return armor.weight === compatibleWeight;
  });
}