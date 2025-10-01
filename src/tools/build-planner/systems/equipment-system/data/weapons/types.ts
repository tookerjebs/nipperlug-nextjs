/**
 * Shared weapon types and interfaces
 * Contains all weapon-related type definitions used across weapon files
 */

export interface WeaponStats {
  attack?: number;
  magicAttack?: number;
  attackRate?: number;
  accuracy?: number;
  criticalRate?: number;
  criticalDamage?: number;
  penetration?: number;
  allAttackUp?: number;
  allSkillAmp?: number;
}

export interface WeaponUpgradeStats {
  allAttackUp: number;
  attackRate: number;
  accuracy: number;
  criticalDamage: number;
  penetration: number;
}

export interface ExtremeUpgradeLevel {
  allAttackUp?: number;
  attackRate?: number;
  accuracy?: number;
  criticalDamage?: number;
  penetration?: number;
}

export interface DivineUpgradeLevel {
  allAttackUp?: number;
  attackRate?: number;
  accuracy?: number;
  criticalDamage?: number;
  penetration?: number;
}

export interface EpicOption {
  criticalDamage: number;
  criticalRate: number;
  allSkillAmp: number;
}

export interface SlotOption {
  criticalDamage: number;
  criticalRate: number;
  swordSkillAmp: number;
  magicSkillAmp: number;
}

export interface WeaponGradeData {
  baseStats: WeaponStats;
  maxExtremeLevel: number;
  imagePath: string;
}

export interface WeaponTemplate {
  type: string;
  subtype: string;
  material: string;
  class: string;
  maxSlots: number;
  handType: WeaponStatType; // 'oneHanded' or 'twoHanded'
  grades: Record<string, WeaponGradeData>;
}

export interface Weapon {
  id: string;
  name: string;
  type: string;
  subtype: string;
  material: string;
  class: string;
  grade: string;
  handType: WeaponStatType; // 'oneHanded' or 'twoHanded'
  imagePath: string;
  baseStats: WeaponStats;
  maxSlots: number;
  maxExtremeLevel: number;
}

export type WeaponStatType = 'oneHanded' | 'twoHanded';