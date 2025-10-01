/**
 * Mapping from field names to user-friendly display names
 */
export const FIELD_DISPLAY_NAMES: Record<string, string> = {
  // Basic Information
  'name': 'Name',
  'level': 'Level',
  'exp': 'EXP',
  'hp': 'HP',

  // Combat Stats
  'defense': 'Defense',
  'attackRate': 'Attack Rate',
  'defenseRate': 'Defense Rate',
  'hpRecharge': 'HP Recharge',
  'accuracy': 'Accuracy',
  'penetration': 'Penetration',
  'damageReduction': 'DMG Reduction',
  'evasion': 'Evasion',
  'resistCritRate': 'Resist Crit Rate',

  // Attack Skills
  'primaryAttackMin': 'Primary Attack Min',
  'primaryAttackMax': 'Primary Attack Max',
  'secondaryAttackMin': 'Secondary Attack Min',
  'secondaryAttackMax': 'Secondary Attack Max',

  // Combat Immunities
  'ignoreAccuracy': 'Ignore Accuracy',
  'ignoreDamageReduction': 'Ignore Damage Reduction',
  'ignorePenetration': 'Ignore Penetration',
  'absoluteDamage': 'Absolute Damage',

  // Resistances
  'resistSkillAmp': 'Resist Skill Amp',
  'resistCritDamage': 'Resist Crit DMG',
  'resistSuppress': 'Suppress Resist',
  'resistSilence': 'Silence Resist',
  'resistDiffDamage': 'Diff DMG Resist',

  // Special Stats
  'hpProportionDamage': 'HP % Damage',
};

/**
 * Get the user-friendly display name for a field
 */
export function getDisplayName(fieldKey: string): string {
  return FIELD_DISPLAY_NAMES[fieldKey] || fieldKey;
}

/**
 * Field categories for organizing the display
 */
export const FIELD_CATEGORIES: Record<string, string[]> = {
  'Basic Information': ['name', 'level', 'hp', 'exp'],
  'General Attack Skills': ['primaryAttackMin', 'primaryAttackMax', 'secondaryAttackMin', 'secondaryAttackMax'],
  'Offensive Stats': ['attackRate', 'accuracy', 'penetration', 'ignoreAccuracy', 'ignoreDamageReduction', 'ignorePenetration', 'absoluteDamage', 'hpProportionDamage'],
  'Defensive Stats': ['defense', 'defenseRate', 'hpRecharge', 'damageReduction', 'evasion', 'resistCritRate', 'resistSkillAmp', 'resistCritDamage', 'resistSuppress', 'resistSilence', 'resistDiffDamage'],
};

/**
 * Get all available field keys (excluding movement and behavior stats)
 */
export function getAvailableFields(): string[] {
  return Object.keys(FIELD_DISPLAY_NAMES);
}

/**
 * Get categorized fields for display
 */
export function getCategorizedFields(): Record<string, Array<{key: string, label: string}>> {
  const result: Record<string, Array<{key: string, label: string}>> = {};
  
  Object.entries(FIELD_CATEGORIES).forEach(([category, fields]) => {
    result[category] = fields
      .filter(field => FIELD_DISPLAY_NAMES[field]) // Only include fields that have display names
      .map(field => ({
        key: field,
        label: FIELD_DISPLAY_NAMES[field]
      }));
  });
  
  return result;
}

/**
 * Check if a field should be displayed (not a movement/behavior stat)
 */
export function shouldDisplayField(fieldKey: string): boolean {
  // Movement and behavior stats to exclude
  const excludedFields = [
    'MoveSpeed', 'ChasSpeed', 'FindCount', 'FindInterval', 'MoveInterval', 
    'ChasInterval', 'AlertRange', 'Limt0Range', 'Limt1Range', 'AggroPattern',
    'Aggressive', 'Cooperate', 'Escape', 'Attack', 'AttkPattern'
  ];
  
  return !excludedFields.includes(fieldKey);
}