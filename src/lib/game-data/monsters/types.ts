/**
 * Shared Monster Data Types
 * Used by both Build Planner and Mob Table tools
 */

export interface RawMonsterData {
  // Core identification
  id: string;
  dungeonId?: string; // Optional since not all monsters have dungeon IDs
  
  // Basic Information
  name: string;
  level: number;
  exp: number;
  hp: number;
  
  // Combat Stats
  defense: number;
  attackRate: number;
  defenseRate: number;
  hpRecharge: number;
  accuracy: number;
  penetration: number;
  damageReduction: number;
  evasion: number;
  resistCritRate: number;
  
  // Attack Skills
  primaryAttackMin: number;
  primaryAttackMax: number;
  secondaryAttackMin: number;
  secondaryAttackMax: number;
  
  // Combat Immunities
  ignoreAccuracy: number;
  ignoreDamageReduction: number;
  ignorePenetration: number;
  absoluteDamage: number;
  
  // Resistances
  resistSkillAmp: number;
  resistCritDamage: number;
  resistSuppress: number;
  resistSilence: number;
  resistDiffDamage: number;
  
  // Special Stats
  hpProportionDamage: number;
  serverBossType: number;
}

export interface MonsterStats {
  // Core identification
  id: string;
  dungeonId?: string;
  
  // Basic Information
  name: string;
  level: number;
  exp: number;
  hp: number;
  
  // Combat Stats
  defense: number;
  attackRate: number;
  defenseRate: number;
  hpRecharge: number;
  accuracy: number;
  penetration: number;
  damageReduction: number;
  evasion: number;
  resistCritRate: number;
  
  // Attack Skills
  primaryAttackMin: number;
  primaryAttackMax: number;
  secondaryAttackMin: number;
  secondaryAttackMax: number;
  
  // Combat Immunities
  ignoreAccuracy: number;
  ignoreDamageReduction: number;
  ignorePenetration: number;
  absoluteDamage: number;
  
  // Resistances
  resistSkillAmp: number;
  resistCritDamage: number;
  resistSuppress: number;
  resistSilence: number;
  resistDiffDamage: number;
  
  // Special Stats
  hpProportionDamage: number;
  serverBossType: number;
  
  // Computed property for backward compatibility
  isABoss: boolean;
}

export interface MonsterSearchFilters {
  minLevel?: number;
  maxLevel?: number;
  bossOnly?: boolean; // Keep for backward compatibility
  serverBossType?: number; // New field for specific boss type filtering
  dungeonId?: string;
}