// Passive Skills Data
import { PassiveSkill } from '../types';

export const PASSIVE_SKILLS_DATA: PassiveSkill[] = [
  {
    id: 'vitality-master',
    name: 'Vitality Master',
    description: 'Increases HP and HP-related stats',
    icon: '/images/passives-general/vitality-master.png',
    maxLevel: 10,
    stats: [
      { level: 1, statId: 'hp', value: 76 },
      { level: 2, statId: 'hp', value: 133 },
      { level: 3, statId: 'hp', value: 190 },
      { level: 4, statId: 'hp', value: 247 },
      { level: 5, statId: 'hp', value: 304 },
      { level: 6, statId: 'hp', value: 361 },
      { level: 7, statId: 'hp', value: 418 },
      { level: 8, statId: 'hp', value: 475 },
      { level: 9, statId: 'hp', value: 532 },
      { level: 10, statId: 'hp', value: 589 }
    ]
  },
  {
    id: 'sixth-sense',
    name: 'Sixth Sense',
    description: 'Enhances critical rate and evasion',
    icon: '/images/passives-general/sixth-sense.png',
    maxLevel: 3,
    stats: [
      { level: 1, statId: 'defenseRate', value: 212 },
      { level: 2, statId: 'defenseRate', value: 425 },
      { level: 3, statId: 'defenseRate', value: 638 }
    ]
  },
  {
    id: 'sharp-eyes',
    name: 'Sharp Eyes',
    description: 'Improves accuracy and critical damage',
    icon: '/images/passives-general/sharp-eyes.png',
    maxLevel: 9,
    stats: [
      { level: 1, statId: 'attackRate', value: 95 },
      { level: 2, statId: 'attackRate', value: 190 },
      { level: 3, statId: 'attackRate', value: 285 },
      { level: 4, statId: 'attackRate', value: 380 },
      { level: 5, statId: 'attackRate', value: 475 },
      { level: 6, statId: 'attackRate', value: 570 },
      { level: 7, statId: 'attackRate', value: 665 },
      { level: 8, statId: 'attackRate', value: 760 },
      { level: 9, statId: 'attackRate', value: 855 }
    ]
  },
  {
    id: 'ruling-force',
    name: 'Ruling Force',
    description: 'Increases attack power and magic attack',
    icon: '/images/passives-general/ruling-force.png',
    maxLevel: 3,
    stats: [
      { level: 1, statId: 'magicAttack', value: 60 },
      { level: 2, statId: 'magicAttack', value: 102 },
      { level: 3, statId: 'magicAttack', value: 144 }
    ]
  },
  {
    id: 'reflex',
    name: 'Reflex',
    description: 'Enhances evasion and attack rate',
    icon: '/images/passives-general/reflex.png',
    maxLevel: 9,
    stats: [
      { level: 1, statId: 'defenseRate', value: 57 },
      { level: 2, statId: 'defenseRate', value: 114 },
      { level: 3, statId: 'defenseRate', value: 171 },
      { level: 4, statId: 'defenseRate', value: 228 },
      { level: 5, statId: 'defenseRate', value: 285 },
      { level: 6, statId: 'defenseRate', value: 342 },
      { level: 7, statId: 'defenseRate', value: 399 },
      { level: 8, statId: 'defenseRate', value: 456 },
      { level: 9, statId: 'defenseRate', value: 513 }
    ]
  },
  {
    id: 'offensive-sense',
    name: 'Offensive Sense',
    description: 'Boosts all offensive capabilities',
    icon: '/images/passives-general/offensive-sense.png',
    maxLevel: 9,
    stats: [
      { level: 1, statId: 'attack', value: 24 },
      { level: 2, statId: 'attack', value: 30 },
      { level: 3, statId: 'attack', value: 36 },
      { level: 4, statId: 'attack', value: 41 },
      { level: 5, statId: 'attack', value: 47 },
      { level: 6, statId: 'attack', value: 53 },
      { level: 7, statId: 'attack', value: 58 },
      { level: 8, statId: 'attack', value: 64 },
      { level: 9, statId: 'attack', value: 70 },
    ]
  },
  {
    id: 'mana-mastery',
    name: 'Mana Mastery',
    description: 'Increases MP and magic-related stats',
    icon: '/images/passives-general/mana-mastery.png',
    maxLevel: 10,
    stats: [
      { level: 1, statId: 'mp', value: 28 },
      { level: 2, statId: 'mp', value: 38 },
      { level: 3, statId: 'mp', value: 47 },
      { level: 4, statId: 'mp', value: 57 },
      { level: 5, statId: 'mp', value: 66 },
      { level: 6, statId: 'mp', value: 76 },
      { level: 7, statId: 'mp', value: 85 },
      { level: 8, statId: 'mp', value: 95 },
      { level: 9, statId: 'mp', value: 104 },
      { level: 10, statId: 'mp', value: 114 }
    ]
  },
  {
    id: 'impact-control',
    name: 'Impact Control',
    description: 'Enhances critical damage and penetration',
    icon: '/images/passives-general/impact-control.png',
    maxLevel: 3,
    stats: [
      { level: 1, statId: 'attack', value: 60 },
      { level: 2, statId: 'attack', value: 102 },
      { level: 3, statId: 'attack', value: 144 }
    ]
  },
  {
    id: 'force-control',
    name: 'Force Control',
    description: 'Improves magic attack and skill amplification',
    icon: '/images/passives-general/force-control.png',
    maxLevel: 9,
    stats: [
      { level: 1, statId: 'magicAttack', value: 24 },
      { level: 2, statId: 'magicAttack', value: 30 },
      { level: 3, statId: 'magicAttack', value: 36 },
      { level: 4, statId: 'magicAttack', value: 41 },
      { level: 5, statId: 'magicAttack', value: 47 },
      { level: 6, statId: 'magicAttack', value: 53 },
      { level: 7, statId: 'magicAttack', value: 58 },
      { level: 8, statId: 'magicAttack', value: 64 },
      { level: 9, statId: 'magicAttack', value: 70 }
    ]
  },
  {
    id: 'eyes-of-mind',
    name: 'Eyes of Mind',
    description: 'Increases max critical rate and resistance',
    icon: '/images/passives-general/eyes-of-mind.png',
    maxLevel: 3,
    stats: [
      { level: 1, statId: 'attackRate', value: 349 },
      { level: 2, statId: 'attackRate', value: 699 },
      { level: 3, statId: 'attackRate', value: 1048}
    ]
  },
  {
    id: 'defensive-sense',
    name: 'Defensive Sense',
    description: 'Enhances all defensive capabilities',
    icon: '/images/passives-general/defensive-sense.png',
    maxLevel: 9,
    stats: [
      { level: 1, statId: 'defense', value: 22 },
      { level: 2, statId: 'defense', value: 26 },
      { level: 3, statId: 'defense', value: 30 },
      { level: 4, statId: 'defense', value: 34 },
      { level: 5, statId: 'defense', value: 38 },
      { level: 6, statId: 'defense', value: 41 },
      { level: 7, statId: 'defense', value: 45 },
      { level: 8, statId: 'defense', value: 49 },
      { level: 9, statId: 'defense', value: 53 },
    ]
  },
  {
    id: 'damage-absorb',
    name: 'Damage Absorb',
    description: 'Provides HP absorption and damage reduction',
    icon: '/images/passives-general/damage-absorb.png',
    maxLevel: 3,
    stats: [
      { level: 1, statId: 'defense', value: 41 },
      { level: 2, statId: 'defense', value: 64 },
      { level: 3, statId: 'defense', value: 87 }
    ]
  }
];

// Helper function to get a passive skill by ID
export const getPassiveSkillById = (id: string): PassiveSkill | undefined => {
  return PASSIVE_SKILLS_DATA.find(skill => skill.id === id);
};

// Helper function to get stat value for a specific skill and level
export const getSkillStatValue = (skillId: string, level: number): Record<string, number> => {
  const skill = getPassiveSkillById(skillId);
  if (!skill || level < 1 || level > skill.maxLevel) {
    return {};
  }

  const levelStats = skill.stats.filter(stat => stat.level === level);
  const result: Record<string, number> = {};
  
  levelStats.forEach(stat => {
    result[stat.statId] = stat.value;
  });

  return result;
};