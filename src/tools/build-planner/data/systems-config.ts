// Configuration for all progression systems in the build planner

export interface ProgressionSystem {
  id: string;
  name: string;
  description: string;
  icon: string; // Placeholder icon path for now
  category?: string; // For future grouping
  priority?: number; // For ordering within categories
  badge?: string; // Optional badge (e.g., "NEW", "Coming Soon")
}

// All available progression systems organized by category
export const PROGRESSION_SYSTEMS: ProgressionSystem[] = [
  // Basic/Foundation Systems
  {
    id: 'equipment',
    name: 'Equipment',
    description: 'Weapons, armor, and accessories',
    icon: '🛡️',
    category: 'basics',
    priority: 1
  },
  {
    id: 'stat-distribution',
    name: 'Stat Distribution',
    description: 'Stat point allocation',
    icon: '⚔️',
    category: 'basics',
    priority: 2
  },
  {
    id: 'passive-skills',
    name: 'Passive Skills',
    description: 'General passive skills available to all classes',
    icon: '🎯',
    category: 'basics',
    priority: 3
  },
  {
    id: 'class-passive-skills',
    name: 'Class Passive Skills',
    description: 'Class-specific passive skills that enhance your character',
    icon: '⚡',
    category: 'basics',
    priority: 4
  },
  {
    id: 'costumes',
    name: 'Costumes',
    description: 'Cosmetic costumes and appearances',
    icon: '👘',
    category: 'basics',
    priority: 5
  },
  
  // Progression Systems
  {
    id: 'artifact',
    name: 'Artifact',
    description: 'Artifact system with Dawn, Dusk, and Midnight artifacts',
    icon: '💎',
    category: 'progression',
    priority: 1,
    badge: 'NEW'
  },
  {
    id: 'mythical-level',
    name: 'Mythical Level',
    description: 'Mythical level progression and bonuses',
    icon: '✨',
    category: 'progression',
    priority: 2
  },
  {
    id: 'stellar-link',
    name: 'Stellar Link',
    description: 'Stellar constellation system',
    icon: '⭐',
    category: 'progression',
    priority: 3
  },
  {
    id: 'overlord-mastery',
    name: 'Overlord Mastery',
    description: 'Overlord mastery system and skills',
    icon: '👑',
    category: 'progression',
    priority: 4
  },
  {
    id: 'force-wing',
    name: 'Force Wing',
    description: 'Force wing system and abilities',
    icon: '🪶',
    category: 'progression',
    priority: 5
  },
  {
    id: 'pet',
    name: 'Pets',
    description: 'Configure your Pet',
    icon: '🐾',
    category: 'progression',
    priority: 6
  },
  {
    id: 'honor-medal',
    name: 'Honor Medal',
    description: 'Honor medals',
    icon: '🏅',
    category: 'progression',
    priority: 7
  },
  {
    id: 'achievements',
    name: 'Achievements',
    description: 'Achievement system',
    icon: '🏆',
    category: 'progression',
    priority: 8
  },
  {
    id: 'collection',
    name: 'Collection',
    description: 'Collection system and items',
    icon: '📦',
    category: 'progression',
    priority: 9
  },
  {
    id: 'gold-merit',
    name: 'Gold Merit',
    description: 'Gold merit system',
    icon: '🪙',
    category: 'progression',
    priority: 10
  },
  {
    id: 'platinum-merit',
    name: 'Platinum Merit',
    description: 'Platinum merit system and rewards',
    icon: '💎',
    category: 'progression',
    priority: 11
  },
  {
    id: 'buffs-potions',
    name: 'Buffs & Potions',
    description: 'Temporary buffs and consumable items',
    icon: '🧪',
    category: 'progression',
    priority: 12
  },
  {
    id: 'essence-runes',
    name: 'Essence Runes',
    description: 'Essence runes',
    icon: '🔮',
    category: 'progression',
    priority: 13
  },
  {
    id: 'karma-runes',
    name: 'Karma Runes',
    description: 'Karma rune system',
    icon: '🌀',
    category: 'progression',
    priority: 14
  },
  
  // Custom Configuration
  {
    id: 'damage-analysis',
    name: 'Damage Analysis',
    description: 'Detailed damage calculations and stat optimization recommendations',
    icon: '📊',
    category: 'custom',
    priority: 1
  },
  {
    id: 'manual-stats',
    name: 'Manual Stats',
    description: 'Add custom stat values directly to your build for testing and fine-tuning',
    icon: '⚙️',
    category: 'custom',
    priority: 2
  },
  {
    id: 'battle-configuration',
    name: 'Battle Configuration',
    description: 'Configure battle mode and attack skills for combat bonuses',
    icon: '⚔️',
    category: 'custom',
    priority: 3
  }
];

// Category configuration
export const SYSTEM_CATEGORIES = {
  basics: {
    name: 'Basic Systems',
    description: 'Foundation systems for character building',
    color: 'text-blue-400',
    bgColor: 'bg-blue-400/10',
    borderColor: 'border-blue-400/30'
  },
  progression: {
    name: 'Progression Systems',
    description: 'Advanced character progression and rewards',
    color: 'text-purple-400',
    bgColor: 'bg-purple-400/10',
    borderColor: 'border-purple-400/30'
  },
  custom: {
    name: 'Custom Configuration',
    description: 'Manual configuration and testing tools',
    color: 'text-game-gold',
    bgColor: 'bg-game-gold/10',
    borderColor: 'border-game-gold/30'
  }
} as const;

// Helper functions
export const getSystemById = (id: string): ProgressionSystem | undefined => {
  return PROGRESSION_SYSTEMS.find(system => system.id === id);
};

export const getSystemsByCategory = (category: string): ProgressionSystem[] => {
  return PROGRESSION_SYSTEMS.filter(system => system.category === category)
    .sort((a, b) => (a.priority || 0) - (b.priority || 0));
};

export const getAllSystemIds = (): string[] => {
  return PROGRESSION_SYSTEMS.map(system => system.id);
};

export const getSystemsGroupedByCategory = (): Record<string, ProgressionSystem[]> => {
  const grouped: Record<string, ProgressionSystem[]> = {};
  
  Object.keys(SYSTEM_CATEGORIES).forEach(category => {
    grouped[category] = getSystemsByCategory(category);
  });
  
  return grouped;
};