// Holy Power Rank System Configuration
// Defines the ranks achievable through Holy Power accumulation

export interface HolyPowerRank {
  id: string;
  name: string;
  requiredHolyPower: number;
  description: string;
  flatStatBonuses: {
    [statKey: string]: number; // statKey from stats-config.ts -> flat bonus value
  };
}

export const holyPowerRanks: HolyPowerRank[] = [
  {
    id: "seraphim",
    name: "Seraphim",
    requiredHolyPower: 0,
    description: "The first rank of divine ascension",
    flatStatBonuses: {
      hp: 50
    }
  },
  {
    id: "kerubim",
    name: "Kerubim",
    requiredHolyPower: 4000,
    description: "The second rank of divine protection",
    flatStatBonuses: {
      defense: 30
    }
  },
  {
    id: "ofanim",
    name: "Ofanim",
    requiredHolyPower: 7000,
    description: "The third rank of divine power",
    flatStatBonuses: {
      hp: 100
    }
  },
  {
    id: "dominion",
    name: "Dominion",
    requiredHolyPower: 10000,
    description: "The fourth rank of divine authority",
    flatStatBonuses: {
      ignorePenetration: 30
    }
  },
  {
    id: "angelus",
    name: "Angelus",
    requiredHolyPower: 13500,
    description: "The fifth rank of divine might",
    flatStatBonuses: {
      allAttackUp: 40
    }
  },
  {
    id: "archangel",
    name: "Archangel",
    requiredHolyPower: 16500,
    description: "The sixth rank of divine excellence",
    flatStatBonuses: {
      criticalDamage: 6
    }
  },
  {
    id: "raphael",
    name: "Raphael",
    requiredHolyPower: 19300,
    description: "The seventh rank of divine mastery",
    flatStatBonuses: {
      allSkillAmp: 4
    }
  },
  {
    id: "uriel",
    name: "Uriel",
    requiredHolyPower: 22200,
    description: "The eighth rank of divine supremacy",
    flatStatBonuses: {
      allAttackUp: 80
    }
  },
  {
    id: "michael",
    name: "Michael",
    requiredHolyPower: 24500,
    description: "The ninth rank of divine perfection",
    flatStatBonuses: {
      criticalDamage: 12
    }
  },
  {
    id: "metatron",
    name: "Metatron",
    requiredHolyPower: 27500,
    description: "The ultimate rank of divine transcendence",
    flatStatBonuses: {
      allSkillAmp: 8
    }
  }
];

// Helper functions
export const getRankByHolyPower = (holyPower: number): HolyPowerRank | null => {
  // Find the highest rank the player qualifies for
  const qualifiedRanks = holyPowerRanks
    .filter(rank => holyPower >= rank.requiredHolyPower)
    .sort((a, b) => b.requiredHolyPower - a.requiredHolyPower);

  return qualifiedRanks.length > 0 ? qualifiedRanks[0] : null;
};

export const getRankById = (id: string): HolyPowerRank | undefined => {
  return holyPowerRanks.find(rank => rank.id === id);
};

export const getAllRanks = (): HolyPowerRank[] => {
  return [...holyPowerRanks].sort((a, b) => a.requiredHolyPower - b.requiredHolyPower);
};

export const getNextRank = (currentHolyPower: number): HolyPowerRank | null => {
  const nextRanks = holyPowerRanks
    .filter(rank => currentHolyPower < rank.requiredHolyPower)
    .sort((a, b) => a.requiredHolyPower - b.requiredHolyPower);

  return nextRanks.length > 0 ? nextRanks[0] : null;
};

export const getTotalFlatBonuses = (holyPower: number): Record<string, number> => {
  const currentRank = getRankByHolyPower(holyPower);
  if (!currentRank) return {};

  // Sum all bonuses from ranks up to and including current rank
  const totalBonuses: Record<string, number> = {};

  holyPowerRanks
    .filter(rank => rank.requiredHolyPower <= holyPower)
    .forEach(rank => {
      Object.entries(rank.flatStatBonuses).forEach(([statKey, bonus]) => {
        totalBonuses[statKey] = (totalBonuses[statKey] || 0) + bonus;
      });
    });

  return totalBonuses;
};