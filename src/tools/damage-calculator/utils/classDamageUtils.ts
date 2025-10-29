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
