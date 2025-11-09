/**
 * Shared armor types and interfaces
 * Contains all armor-related type definitions used across files
 */

export interface ArmorStats {
  defense?: number;
  defenseRate?: number;
  damageReduction?: number;
  hp?: number;
  allSkillAmp?: number;
  ignorePenetration?: number | null;
  resistCriticalDamage?: number;
  resistSkillAmp?: number;
}

export interface ArmorExtremeUpgradeLevel {
  defense?: number;
  defenseRate?: number;
  damageReduction?: number;
  allSkillAmp?: number;
  ignorePenetration?: number | null;
}

export interface ArmorDivineUpgradeLevel {
  defense?: number;
  defenseRate?: number;
  damageReduction?: number;
  resistCriticalDamage?: number;
  resistSkillAmp?: number;
  allSkillAmp?: number;
  hp?: number;
  allAttackUp?: number;
  accuracy?: number;
  resistCriticalRate?: number;
  ignoreAccuracy?: number;
  maxHpStealPerHit?: number;
  ignorePenetration?: number;
}

export interface ArmorEpicOption {
  swordSkillAmp?: number;
  magicSkillAmp?: number;
  allSkillAmp?: number;
  resistCriticalDamage?: number;
  resistSkillAmp?: number;
  damageReduction?: number;
  criticalDamage?: number;
  criticalRate?: number;
}

export interface ArmorSlotOption {
  swordSkillAmp: number;
  maxCriticalRate?: number;
  magicSkillAmp: number;
  criticalDamage?: number;
  criticalRate?: number;
}

export interface ArmorGradeData {
  baseStats: ArmorStats;
  maxExtremeLevel: number;
  imagePath: string;
  description?: string;
}

export interface ArmorTemplate {
  type: string; // 'armor'
  subtype: string; // 'body', 'helmet', 'gauntlet', 'shoes'
  weight?: 'light' | 'medium' | 'heavy'; // Only for body armor
  material: string;
  class: string;
  maxSlots: number;
  grades: Record<string, ArmorGradeData>;
}

export interface Armor {
  id: string;
  name: string;
  type: string; // 'armor'
  subtype: string; // 'body', 'helmet', 'gauntlet', 'shoes'
  weight?: 'light' | 'medium' | 'heavy'; // Only for body armor
  material: string;
  class: string;
  grade: string;
  imagePath: string;
  description?: string;
  baseStats: ArmorStats;
  maxSlots: number;
  maxExtremeLevel: number;
}

// Type identifiers for different armor subtypes
export type ArmorStatType = 'body' | 'helmet' | 'gauntlet' | 'shoes';