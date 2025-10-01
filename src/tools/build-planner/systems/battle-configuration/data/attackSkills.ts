// Attack skills data - one skill per class (for 3 classes initially)

import type { AttackSkill } from '../types';

export const attackSkillsData: AttackSkill[] = [
  {
    id: 'blader_blade_scud',
    name: 'Blade Scud',
    description: 'A powerful blade technique that increases attack power and critical rate',
    classId: 'blader',
    stats: {
      attack: 150,
      criticalRate: 8,
      attackRate: 12
    }
  },
  {
    id: 'wizard_meteor_strike',
    name: 'Meteor Strike',
    description: 'A devastating magic attack that boosts magic power and penetration',
    classId: 'wizard',
    stats: {
      magicAttack: 180,
      penetration: 15,
      accuracy: 10
    }
  },
  {
    id: 'warrior_berserker_rage',
    name: 'Berserker Rage',
    description: 'An intense combat state that dramatically increases physical damage',
    classId: 'warrior',
    stats: {
      attack: 200,
      criticalDamage: 25,
      attackRate: 15
    }
  }
];

/**
 * Get attack skills available for a specific character class
 * @param characterClass The character class to get skills for
 * @returns Array of attack skills for the class
 */
export function getAttackSkillsForClass(characterClass: string): AttackSkill[] {
  return attackSkillsData.filter(skill => skill.classId === characterClass);
}

/**
 * Get an attack skill by its ID
 * @param skillId The skill ID to find
 * @returns The attack skill or undefined if not found
 */
export function getAttackSkillById(skillId: string): AttackSkill | undefined {
  return attackSkillsData.find(skill => skill.id === skillId);
}