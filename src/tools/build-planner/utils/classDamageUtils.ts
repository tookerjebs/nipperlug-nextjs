/**
 * Class-based damage type detection utilities
 * Determines whether a character class uses sword or magic damage
 */

import type { CharacterClass } from '../systems/class/types';

/**
 * Get the primary damage type for a character class
 */
export function getClassDamageType(characterClass: CharacterClass): 'sword' | 'magic' {
  const MAGIC_CLASSES: CharacterClass[] = ['wizard', 'dark_mage', 'force_archer', 'force_gunner'];
  return MAGIC_CLASSES.includes(characterClass) ? 'magic' : 'sword';
}

/**
 * Get the primary stats used by a character class for damage calculations
 */
export function getClassPrimaryStats(characterClass: CharacterClass) {
  const damageType = getClassDamageType(characterClass);
  return {
    damageType,
    baseAttackStat: damageType === 'magic' ? 'magicAttack' : 'attack',
    skillAmpStat: damageType === 'magic' ? 'magicSkillAmp' : 'swordSkillAmp'
  };
}

/**
 * Check if a character class is compatible with a specific damage type
 */
export function isClassCompatibleWithDamageType(
  characterClass: CharacterClass, 
  damageType: 'sword' | 'magic'
): boolean {
  return getClassDamageType(characterClass) === damageType;
}