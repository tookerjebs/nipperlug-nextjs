// Battle modes data - just battle mode 3 for simplicity

export interface BattleMode {
  id: string;
  name: string;
  description: string;
  stats: Record<string, number>; // stat bonuses provided by this battle mode
}

export const battleModesData: BattleMode[] = [
  {
    id: 'battle_mode_3',
    name: 'Battle Mode 3',
    description: 'Enhanced combat state that provides significant stat bonuses across all combat areas',
    stats: {
      attack: 100,
      magicAttack: 100,
      criticalRate: 5,
      criticalDamage: 15,
      attackRate: 8,
      accuracy: 8,
      defense: 50,
      defenseRate: 5
    }
  }
];

/**
 * Get battle mode by its ID
 * @param modeId The battle mode ID to find
 * @returns The battle mode or undefined if not found
 */
export function getBattleModeById(modeId: string): BattleMode | undefined {
  return battleModesData.find(mode => mode.id === modeId);
}