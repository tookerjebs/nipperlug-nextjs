/**
 * Extreme Upgrade System Data
 * Contains all data needed for extreme upgrade calculations
 */

export interface ExtremeCore {
  level: number;
  power: number;
  imagePath: string;
}

export interface ServerConfig {
  name: string;
  displayName: string;
  hasResetOutcome: boolean;
  baseLevel: {
    oneHanded: number[];
    twoHanded: number[];
    armor: number[];
    bike: number[];
  };
}

export interface EquipmentType {
  id: string;
  name: string;
  displayName: string;
  maxCores: number[];
  upgradeCosts: {
    alz: number[];
    coreCount: number[];
  };
  statBonuses: {
    [level: number]: string[];
  };
}

// Core power values for levels 1-12
export const EXTREME_CORES: ExtremeCore[] = [
  { level: 1, power: 1, imagePath: '/images/extreme-upgrade/extreme-core-1-2-3.png' },
  { level: 2, power: 2, imagePath: '/images/extreme-upgrade/extreme-core-1-2-3.png' },
  { level: 3, power: 3, imagePath: '/images/extreme-upgrade/extreme-core-1-2-3.png' },
  { level: 4, power: 4, imagePath: '/images/extreme-upgrade/extreme-core-4-5-6.png' },
  { level: 5, power: 8, imagePath: '/images/extreme-upgrade/extreme-core-4-5-6.png' },
  { level: 6, power: 10, imagePath: '/images/extreme-upgrade/extreme-core-4-5-6.png' },
  { level: 7, power: 12, imagePath: '/images/extreme-upgrade/extreme-core-7-8-9.png' },
  { level: 8, power: 20, imagePath: '/images/extreme-upgrade/extreme-core-7-8-9.png' },
  { level: 9, power: 24, imagePath: '/images/extreme-upgrade/extreme-core-7-8-9.png' },
  { level: 10, power: 36, imagePath: '/images/extreme-upgrade/extreme-core-10-11-12.png' },
  { level: 11, power: 42, imagePath: '/images/extreme-upgrade/extreme-core-10-11-12.png' },
  { level: 12, power: 48, imagePath: '/images/extreme-upgrade/extreme-core-10-11-12.png' },
];

// Factor values for success rate calculation (same for all equipment types)
export const EXTREME_FACTORS = [2, 3, 4, 5, 6, 6, 6]; // For levels 1-7

// Server configurations
export const SERVER_CONFIGS: ServerConfig[] = [
  {
    name: 'other',
    displayName: 'Other',
    hasResetOutcome: false,
    baseLevel: {
      oneHanded: [2, 12, 36, 180, 360, 370, 400],
      twoHanded: [3, 18, 54, 270, 290, 350, 400],
      armor: [2, 12, 36, 180, 360, 370, 400],
      bike: [2, 12, 36, 180, 360, 370, 400],
    },
  },
  {
    name: 'standard',
    displayName: 'Standard Servers',
    hasResetOutcome: true,
    baseLevel: {
      oneHanded: [2, 12, 36, 80, 180, 180, 180],
      twoHanded: [3, 18, 54, 120, 270, 270, 270],
      armor: [2, 12, 36, 80, 180, 180, 180],
      bike: [2, 12, 36, 80, 180, 180, 180],
    },
  },
];

// Equipment type configurations
export const EQUIPMENT_TYPES: EquipmentType[] = [
  {
    id: 'oneHanded',
    name: 'oneHanded',
    displayName: '1-Handed Weapon',
    maxCores: [2, 4, 6, 8, 10, 10, 10], // For levels 1-7
    upgradeCosts: {
      alz: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000],
      coreCount: [2, 4, 6, 8, 10, 10, 10],
    },
    statBonuses: {
      1: ['+20 All Attack', '+50 Attack Rate'],
      2: ['+60 All Attack', '+120 Attack Rate', '+80 Accuracy'],
      3: ['+100 All Attack', '+190 Attack Rate', '+140 Accuracy', '+7% Critical Damage'],
      4: ['+130 All Attack', '+270 Attack Rate', '+200 Accuracy', '+15% Critical Damage', '+30 Penetration'],
      5: ['+160 All Attack', '+360 Attack Rate', '+260 Accuracy', '+23% Critical Damage', '+55 Penetration'],
      6: ['+200 All Attack', '+460 Attack Rate', '+330 Accuracy', '+31% Critical Damage', '+80 Penetration'],
      7: ['+250 All Attack', '+600 Attack Rate', '+420 Accuracy', '+40% Critical Damage', '+110 Penetration'],
    },
  },
  {
    id: 'twoHanded',
    name: 'twoHanded',
    displayName: '2-Handed Weapon',
    maxCores: [3, 6, 9, 12, 15, 15, 15], // For levels 1-7
    upgradeCosts: {
      alz: [20000000, 40000000, 60000000, 80000000, 100000000, 120000000, 140000000],
      coreCount: [3, 6, 9, 12, 15, 15, 15],
    },
    statBonuses: {
      1: ['+40 All Attack', '+100 Attack Rate'],
      2: ['+120 All Attack', '+240 Attack Rate', '+160 Accuracy'],
      3: ['+200 All Attack', '+380 Attack Rate', '+280 Accuracy', '+14% Critical Damage'],
      4: ['+260 All Attack', '+540 Attack Rate', '+400 Accuracy', '+30% Critical Damage', '+60 Penetration'],
      5: ['+320 All Attack', '+720 Attack Rate', '+520 Accuracy', '+46% Critical Damage', '+110 Penetration'],
      6: ['+400 All Attack', '+920 Attack Rate', '+660 Accuracy', '+62% Critical Damage', '+160 Penetration'],
      7: ['+500 All Attack', '+1200 Attack Rate', '+840 Accuracy', '+80% Critical Damage', '+220 Penetration'],
    },
  },
  {
    id: 'armor',
    name: 'armor',
    displayName: 'Armor',
    maxCores: [2, 4, 6, 8, 10, 10, 10], // For levels 1-7
    upgradeCosts: {
      alz: [10000000, 20000000, 30000000, 40000000, 50000000, 60000000, 70000000],
      coreCount: [2, 4, 6, 8, 10, 10, 10],
    },
    statBonuses: {
      1: ['+20 Defense', '+30 Defense Rate'],
      2: ['+50 Defense', '+90 Defense Rate', '+12 Damage Reduction'],
      3: ['+80 Defense', '+130 Defense Rate', '+24 Damage Reduction', '+3% All Skill Amp'],
      4: ['+110 Defense', '+170 Defense Rate', '+25 Ignore Penetration', '+36 Damage Reduction', '+6% All Skill Amp'],
      5: ['+140 Defense', '+210 Defense Rate', '+50 Ignore Penetration', '+48 Damage Reduction', '+9% All Skill Amp'],
      6: ['+180 Defense', '+260 Defense Rate', '+75 Ignore Penetration', '+60 Damage Reduction', '+12% All Skill Amp'],
      7: ['+230 Defense', '+320 Defense Rate', '+100 Ignore Penetration', '+75 Damage Reduction', '+16% All Skill Amp'],
    },
  },
  {
    id: 'bike',
    name: 'bike',
    displayName: 'Bike',
    maxCores: [2, 4, 6, 8, 10, 10, 10], // For levels 1-7
    upgradeCosts: {
      alz: [20000000, 40000000, 60000000, 80000000, 100000000, 120000000, 140000000],
      coreCount: [2, 4, 6, 8, 10, 10, 10],
    },
    statBonuses: {
      1: ['+30 Defense', '+40 Defense Rate'],
      2: ['+80 Defense', '+100 Defense Rate', '+120 Accuracy'],
      3: ['+120 Defense', '+160 Defense Rate', '+240 Accuracy', '+4% All Skill Amp'],
      4: ['+160 Defense', '+220 Defense Rate', '+360 Accuracy', '+7% All Skill Amp', '+50 Penetration'],
      5: ['+200 Defense', '+280 Defense Rate', '+480 Accuracy', '+10% All Skill Amp', '+100 Penetration', '+60 Ignore Penetration'],
      6: ['+250 Defense', '+350 Defense Rate', '+600 Accuracy', '+13% All Skill Amp', '+150 Penetration', '+90 Ignore Penetration'],
      7: ['+300 Defense', '+420 Defense Rate', '+720 Accuracy', '+16% All Skill Amp', '+200 Penetration', '+120 Ignore Penetration'],
    },
  },
];

// Helper functions
export function calculateSuccessRate(
  equipmentType: string,
  currentLevel: number,
  serverConfig: ServerConfig,
  totalCorePower: number
): number {
  if (currentLevel < 1 || currentLevel > 7) return 0;
  
  const factor = EXTREME_FACTORS[currentLevel - 1];
  const baseLevel = serverConfig.baseLevel[equipmentType as keyof typeof serverConfig.baseLevel][currentLevel - 1];
  
  const successRate = (factor * totalCorePower) / (100 * baseLevel);
  return Math.min(successRate, 1); // Cap at 100%
}

export function getEquipmentTypeById(id: string): EquipmentType | undefined {
  return EQUIPMENT_TYPES.find(type => type.id === id);
}

export function getServerConfigByName(name: string): ServerConfig | undefined {
  return SERVER_CONFIGS.find(config => config.name === name);
}

export function getCoreByLevel(level: number): ExtremeCore | undefined {
  return EXTREME_CORES.find(core => core.level === level);
}

export function getMaxCoresForLevel(equipmentType: string, level: number): number {
  const equipment = getEquipmentTypeById(equipmentType);
  if (!equipment || level < 1 || level > 7) return 0;
  return equipment.maxCores[level - 1];
}

export function getUpgradeCost(equipmentType: string, level: number): { alz: number; coreCount: number } {
  const equipment = getEquipmentTypeById(equipmentType);
  if (!equipment || level < 1 || level > 7) return { alz: 0, coreCount: 0 };
  
  return {
    alz: equipment.upgradeCosts.alz[level - 1],
    coreCount: equipment.upgradeCosts.coreCount[level - 1],
  };
}

export function getStatBonuses(equipmentType: string, level: number): string[] {
  const equipment = getEquipmentTypeById(equipmentType);
  if (!equipment || !equipment.statBonuses[level]) return [];
  return equipment.statBonuses[level];
}

// Core price item names for price store integration
export const EXTREME_CORE_PRICE_NAMES = [
  'Extreme Core (Lv. 1)',
  'Extreme Core (Lv. 2)',
  'Extreme Core (Lv. 3)',
  'Extreme Core (Lv. 4)',
  'Extreme Core (Lv. 5)',
  'Extreme Core (Lv. 6)',
  'Extreme Core (Lv. 7)',
  'Extreme Core (Lv. 8)',
  'Extreme Core (Lv. 9)',
  'Extreme Core (Lv. 10)',
  'Extreme Core (Lv. 11)',
  'Extreme Core (Lv. 12)',
];

export function getCorePriceName(level: number): string {
  if (level < 1 || level > 12) return '';
  return EXTREME_CORE_PRICE_NAMES[level - 1];
}

export function getBaseLevel(equipmentType: string, level: number, serverConfig: ServerConfig): number {
  if (level < 1 || level > 7) return 0;
  return serverConfig.baseLevel[equipmentType as keyof typeof serverConfig.baseLevel][level - 1];
}

export function checkMinimumPowerRequirement(
  equipmentType: string,
  level: number,
  serverConfig: ServerConfig,
  totalCorePower: number
): boolean {
  // Only apply minimum power requirement for non-standard servers (servers without reset outcome)
  if (serverConfig.hasResetOutcome) {
    return true; // Standard servers don't have this restriction
  }
  
  const baseLevel = getBaseLevel(equipmentType, level, serverConfig);
  return totalCorePower >= baseLevel;
}