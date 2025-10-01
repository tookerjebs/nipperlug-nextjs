// Configuration for damage calculator systems

export interface DamageCalculatorSystem {
  id: string;
  name: string;
  description: string;
  icon: string;
  category?: string;
  priority?: number;
}

// Essential systems for the damage calculator
export const DAMAGE_CALCULATOR_SYSTEMS: DamageCalculatorSystem[] = [
  // Core Systems
  {
    id: 'manual-stats',
    name: 'Your Stats',
    description: 'Input your character stats for damage calculation',
    icon: '📊',
    category: 'core',
    priority: 1
  },
  {
    id: 'battle-configuration',
    name: 'Target Monster',
    description: 'Select target monster and battle configuration',
    icon: '🎯',
    category: 'core',
    priority: 2
  },
  {
    id: 'damage-analysis',
    name: 'Damage Analysis',
    description: 'Detailed damage calculations and optimization recommendations',
    icon: '📈',
    category: 'core',
    priority: 3
  }
];

// Category configuration
export const SYSTEM_CATEGORIES = {
  core: {
    name: 'Core Systems',
    description: 'Essential systems for damage calculation',
    color: 'text-game-gold',
    bgColor: 'bg-game-gold/10',
    borderColor: 'border-game-gold/30'
  }
} as const;

// Helper functions
export const getSystemById = (id: string): DamageCalculatorSystem | undefined => {
  return DAMAGE_CALCULATOR_SYSTEMS.find(system => system.id === id);
};

export const getSystemsByCategory = (category: string): DamageCalculatorSystem[] => {
  return DAMAGE_CALCULATOR_SYSTEMS.filter(system => system.category === category)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));
};

export const getAllSystemIds = (): string[] => {
  return DAMAGE_CALCULATOR_SYSTEMS.map(system => system.id);
};

export const getSystemsGroupedByCategory = (): Record<string, DamageCalculatorSystem[]> => {
  const grouped: Record<string, DamageCalculatorSystem[]> = {};
  
  Object.keys(SYSTEM_CATEGORIES).forEach(category => {
    grouped[category] = getSystemsByCategory(category);
  });
  
  return grouped;
};