/**
 * Column configuration for the mob table
 * Defines which columns are available, their visibility, and sorting behavior
 */

import { getDisplayName } from './fieldMappings';

export interface TableColumn {
  key: string;
  title: string;
  visible: boolean;
  required?: boolean;
  sortable?: boolean;
  width?: string;
  category: 'basic' | 'offensive' | 'defensive' | 'skills';
}

export const COLUMN_CATEGORIES = {
  basic: 'Basic Information',
  offensive: 'Offensive Stats',
  defensive: 'Defensive Stats',
  skills: 'Attack Skills'
} as const;

export const DEFAULT_COLUMNS: TableColumn[] = [
  // Basic Info - Most important fields visible by default
  { key: 'name', title: getDisplayName('name'), visible: true, required: true, sortable: true, width: '250px', category: 'basic' },
  { key: 'level', title: getDisplayName('level'), visible: true, required: true, sortable: true, width: '80px', category: 'basic' },
  { key: 'hp', title: getDisplayName('hp'), visible: true, sortable: true, width: '110px', category: 'basic' },
  
  // Offensive Stats - Attack-related stats
  { key: 'attackRate', title: getDisplayName('attackRate'), visible: true, sortable: true, width: '100px', category: 'offensive' },
  { key: 'penetration', title: getDisplayName('penetration'), visible: true, sortable: true, width: '110px', category: 'offensive' },
  { key: 'ignoreAccuracy', title: getDisplayName('ignoreAccuracy'), visible: false, sortable: true, width: '110px', category: 'offensive' },
  { key: 'ignoreDamageReduction', title: getDisplayName('ignoreDamageReduction'), visible: false, sortable: true, width: '150px', category: 'offensive' },
  { key: 'ignorePenetration', title: getDisplayName('ignorePenetration'), visible: false, sortable: true, width: '150px', category: 'offensive' },
  { key: 'absoluteDamage', title: getDisplayName('absoluteDamage'), visible: false, sortable: true, width: '140px', category: 'offensive' },
  { key: 'hpProportionDamage', title: getDisplayName('hpProportionDamage'), visible: false, sortable: true, width: '140px', category: 'offensive' },
  
  // Defensive Stats - Defense-related stats and resistances
  { key: 'defense', title: getDisplayName('defense'), visible: true, sortable: true, width: '90px', category: 'defensive' },
  { key: 'defenseRate', title: getDisplayName('defenseRate'), visible: false, sortable: true, width: '100px', category: 'defensive' },
  { key: 'hpRecharge', title: getDisplayName('hpRecharge'), visible: false, sortable: true, width: '110px', category: 'defensive' },
  { key: 'damageReduction', title: getDisplayName('damageReduction'), visible: false, sortable: true, width: '90px', category: 'defensive' },
  { key: 'evasion', title: getDisplayName('evasion'), visible: false, sortable: true, width: '80px', category: 'defensive' },
  { key: 'resistCritRate', title: getDisplayName('resistCritRate'), visible: true, sortable: true, width: '90px', category: 'defensive' },
  { key: 'resistSkillAmp', title: getDisplayName('resistSkillAmp'), visible: true, sortable: true, width: '90px', category: 'defensive' },
  { key: 'resistCritDamage', title: getDisplayName('resistCritDamage'), visible: true, sortable: true, width: '90px', category: 'defensive' },
  { key: 'resistSuppress', title: getDisplayName('resistSuppress'), visible: false, sortable: true, width: '120px', category: 'defensive' },
  { key: 'resistSilence', title: getDisplayName('resistSilence'), visible: false, sortable: true, width: '120px', category: 'defensive' },
  { key: 'resistDiffDamage', title: getDisplayName('resistDiffDamage'), visible: false, sortable: true, width: '140px', category: 'defensive' },
  
  // Attack Skills - Primary and Secondary attacks
  { key: 'primaryAttackMin', title: getDisplayName('primaryAttackMin'), visible: false, sortable: true, width: '110px', category: 'skills' },
  { key: 'primaryAttackMax', title: getDisplayName('primaryAttackMax'), visible: false, sortable: true, width: '110px', category: 'skills' },
  { key: 'secondaryAttackMin', title: getDisplayName('secondaryAttackMin'), visible: false, sortable: true, width: '110px', category: 'skills' },
  { key: 'secondaryAttackMax', title: getDisplayName('secondaryAttackMax'), visible: false, sortable: true, width: '110px', category: 'skills' },
];

export type SortDirection = 'asc' | 'desc' | null;

export interface SortConfig {
  key: string;
  direction: SortDirection;
}