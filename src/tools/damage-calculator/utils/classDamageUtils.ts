/**
 * Damage type utilities for the simplified damage calculator
 * Works with sword/magic damage types directly without class dependencies
 */

/**
 * Get the primary stats used by a damage type for damage calculations
 */
export function getDamageTypeStats(damageType: 'sword' | 'magic') {
  return {
    damageType,
    baseAttackStat: damageType === 'magic' ? 'magicAttack' : 'attack',
    skillAmpStat: damageType === 'magic' ? 'magicSkillAmp' : 'swordSkillAmp'
  };
}

// Legacy function for backward compatibility - now just returns the damage type
export function getClassDamageType(characterClass: any): 'sword' | 'magic' {
  // Default to sword for backward compatibility
  return 'sword';
}

// Legacy function for backward compatibility
export function getClassPrimaryStats(characterClass: any) {
  return getDamageTypeStats('sword');
}