/**
 * Game Items Registry for Cabal Online Calculators
 * This is the central source of truth for all items used in calculators
 */

export interface GameItem {
  /** Unique identifier (kebab-case) */
  id: string;
  /** Display name */
  name: string;
  /** Item category */
  category: string;
  /** Stack size (default 127) */
  stackSize: number;
  /** NPC price if available */
  npcPrice?: number;
  /** Icon filename (without path) */
  icon?: string;
  /** Future API ID mapping */
  apiId?: number;
}

// Helper function to generate ID from name
function generateId(name: string): string {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9\s]/g, '')
    .replace(/\s+/g, '_')
    .replace(/_+/g, '_')
    .replace(/^_|_$/g, '');
}

// Helper function to determine category from name
function getCategory(name: string): string {
  if (name.includes('Force Core')) return 'Force Core';
  if (name.includes('Force Essence')) return 'Force Essence';
  if (name.includes('Perfect Core')) return 'Perfect Core';
  if (name.includes('Upgrade Core Set')) return 'Upgrade Core Set';
  if (name.includes('Upgrade Core')) return 'Upgrade Core';
  if (name.includes('Material Core')) return 'Material Core';
  if (name.includes('Quartz Core')) return 'Quartz Core';
  if (name.includes('Astral Core')) return 'Astral Core';
  if (name.includes('Disc')) return 'Disc';
  if (name.includes('Charm')) return 'Charm';
  if (name.includes('Amplifier')) return 'Damage Amplifier';
  if (name.includes('Slot Extender')) return 'Slot Extender';
  if (name.includes('Mixture')) return 'Mixture';
  if (name.includes('Shape Cartridge')) return 'Shape Cartridge';
  if (name.includes('Extract Potion')) return 'Extract Potion';
  if (name.includes('Essence Rune')) return 'Essence Rune';
  if (name.includes('Muster Card')) return 'Muster Card';
  if (name.includes('Mirror of')) return 'Mirror';
  return 'Misc';
}

// Helper function to determine stack size
function getStackSize(name: string): number {
  // Non-stackable items (stack size 1)
  if (name.match(/Force Core\((Low|Medium|High|Highest|Ultimate)\)/)) return 1;
  if (name.match(/Upgrade Core\((Low|Medium|High|Highest|Ultimate)\)/)) return 1;
  if (name.match(/Perfect Core\((Low|Medium|High|Highest|Ultimate)\)/)) return 1;
  if (name.includes('Slot Extender') && !name.includes('Rune Slot')) return 1;
  
  // High stack items (999)
  if (name === 'Force Essence') return 999;
  if (name.includes('Upgrade Core Set')) return 999;
  
  // Default stack size
  return 127;
}

// Core item names used across all calculators (sample from extraction)
const ITEM_NAMES = [
  "Air Disc(Lv. 1)",
  "Air Disc(Lv. 2)",
  "Air Disc(Lv. 3)",
  "Amber Charm Upgrade (Lv. 1)",
  "Amber Charm Upgrade (Lv. 2)",
  "Amber Charm Upgrade (Lv. 3)",
  "Amber Charm Upgrade (Lv. 4)",
  "Amber Charm Upgrade (Lv. 5)",
  "Amber Charm Upgrade (Lv. 6)",
  "Amber Charm Upgrade (Lv. 7)",
  "Amethyst Charm Upgrade (Lv. 1)",
  "Amethyst Charm Upgrade (Lv. 2)",
  "Amethyst Charm Upgrade (Lv. 3)",
  "Amethyst Charm Upgrade (Lv. 4)",
  "Amethyst Charm Upgrade (Lv. 5)",
  "Amethyst Charm Upgrade (Lv. 6)",
  "Amethyst Charm Upgrade (Lv. 7)",
  "Aqua Disc(Lv. 1)",
  "Aqua Disc(Lv. 2)",
  "Aqua Disc(Lv. 3)",
  "Astral Core(Archridium)",
  "Astral Core(Lapis)",
  "Astral Core(Mithril)",
  "Astral Core(Palladium)",
  "Astral Core(SIGMetal)",
  "Astral Core(Topaz)",
  "Astral Skull",
  "Beetle Shell",
  "Bloody Disc(Lv. 1)",
  "Bloody Disc(Lv. 2)",
  "Bloody Disc(Lv. 3)",
  "Blue Feather",
  "Broken Tiara of Nix",
  "Chaos Core",
  "Circuit Jewel (Lv. 7)",
  "Circuit Jewel(Lv. 6)",
  "Copy of Illusive Apocalypse",
  "Dark Disc(Lv. 1)",
  "Dark Disc(Lv. 2)",
  "Dark Disc(Lv. 3)",
  "Devil's Token(High)",
  "Devil's Token(Highest)",
  "Diamond Cube",
  "Disc",
  "Divine Core",
  "Earth Disc(Lv. 1)",
  "Earth Disc(Lv. 2)",
  "Earth Disc(Lv. 3)",
  "Effector Core (Piece)",
  "Emerald Charm Upgrade (Lv. 1)",
  "Emerald Charm Upgrade (Lv. 2)",
  "Emerald Charm Upgrade (Lv. 3)",
  "Emerald Charm Upgrade (Lv. 4)",
  "Emerald Charm Upgrade (Lv. 5)",
  "Emerald Charm Upgrade (Lv. 6)",
  "Emerald Charm Upgrade (Lv. 7)",
  "Empty Bottle",
  "Epaulet of the Dead",
  "Epaulet of the Dead (B2F) Part1",
  "Essence Of Dragon of Light",
  "Essence Rune(DEX II)",
  "Essence Rune(INT II)",
  "Essence Rune(STR II)",
  "Essence of Dragon of Darkness",
  "Extender Circuit",
  "Extract Potion (DEX)",
  "Extract Potion (INT)",
  "Extract Potion (STR)",
  "Extreme Core Pocket(Normal) I",
  "Flame Disc(Lv. 1)",
  "Flame Disc(Lv. 2)",
  "Flame Disc(Lv. 3)",
  "Force Core(Crystal)",
  "Force Core(High)",
  "Force Core(Highest)",
  "Force Core(Low)",
  "Force Core(Medium)",
  "Force Core(Piece)",
  "Force Core(Ultimate)",
  "Force Essence",
  "Holy Disc(Lv. 1)",
  "Holy Disc(Lv. 2)",
  "Holy Disc(Lv. 3)",
  "Illusion Coral",
  "Infernal Ruby",
  "Lost Island Compass",
  "Machinery Head",
  "Magic Damage Amplifier (Lv. 1)",
  "Magic Damage Amplifier (Lv. 2)",
  "Magic Damage Amplifier (Lv. 3)",
  "Magic Damage Amplifier (Lv. 4)",
  "Magic Damage Amplifier (Lv. 5)",
  "Magic Damage Amplifier (Lv. 6)",
  "Magic Damage Amplifier (Lv. 7)",
  "Map Part",
  "Material Core",
  "Material Core(Archridium)",
  "Material Core(Bluestin)",
  "Material Core(Mithril)",
  "Material Core(Osmium)",
  "Material Core(Palladium)",
  "Material Core(Red Osmium)",
  "Material Core(SIGMetal)",
  "Material Core(Shadow Titanium)",
  "Material Core(SigMetal)",
  "Material Core(Titanium)",
  "Merit Medal Exchange Ticket",
  "Merit Medal Trade Certificate",
  "Minesta's Amber Charm",
  "Minesta's Amethyst Charm",
  "Minesta's Diamond Charm",
  "Minesta's Emerald Charm",
  "Minesta's Ruby Charm",
  "Minesta's Sapphire Charm",
  "Mirror of Obervation (Bronze)",
  "Mirror of Obervation (Silver)",
  "Mixture(Lv. 1)",
  "Mixture(Lv. 2)",
  "Mixture(Lv. 3)",
  "Mixture(Lv. 4)",
  "Mixture(Lv. 5)",
  "Mixture(Lv. 6)",
  "Mixture(Lv. 7)",
  "Muster Card: Forgotten Temple B1F",
  "Muster Card: Forgotten Temple B2F",
  "Muster Card: Ruina Station",
  "Orb of Earth",
  "Orb of Fire",
  "Orb of Ice",
  "Orb of Wind",
  "Parasited Berry",
  "Plasma Circuit",
  "Quartz Core",
  "Quartz Core(Aqua)",
  "Quartz Core(Archridium)",
  "Quartz Core(Bluestin)",
  "Quartz Core(Lapis)",
  "Quartz Core(Mithril)",
  "Quartz Core(Palladium)",
  "Quartz Core(Pherystin)",
  "Quartz Core(SIGMetal)",
  "Quartz Core(SigMetal)",
  "Quartz Core(Topaz)",
  "Rare Muster Card: Forgotten Temple B2F",
  "Raw Stone of Dimension",
  "Ruby Charm Upgrade (Lv. 1)",
  "Ruby Charm Upgrade (Lv. 2)",
  "Ruby Charm Upgrade (Lv. 3)",
  "Ruby Charm Upgrade (Lv. 4)",
  "Ruby Charm Upgrade (Lv. 5)",
  "Ruby Charm Upgrade (Lv. 6)",
  "Ruby Charm Upgrade (Lv. 7)",
  "Rune Slot Extender",
  "Sapphire Charm Upgrade (Lv. 1)",
  "Sapphire Charm Upgrade (Lv. 2)",
  "Sapphire Charm Upgrade (Lv. 3)",
  "Sapphire Charm Upgrade (Lv. 4)",
  "Sapphire Charm Upgrade (Lv. 5)",
  "Sapphire Charm Upgrade (Lv. 6)",
  "Sapphire Charm Upgrade (Lv. 7)",
  "Seal of Darkness",
  "Shape Cartridge",
  "Shape Cartridge(Lv. 1)",
  "Shape Cartridge(Lv. 2)",
  "Shape Cartridge(Lv. 3)",
  "Shape Cartridge(Lv. 4)",
  "Shining Tooth",
  "Shiny Jewel of Nix",
  "Siena's Crest B1F",
  "Siena's Crest B2F",
  "Skill Book (Aqua Aura)",
  "Skill Book (Flame Aura)",
  "Skill Book (Lightning Aura)",
  "Slot Extender",
  "Slot Extender (Low)",
  "Slot Extender(High)",
  "Slot Extender(Highest)",
  "Slot Extender(Low)",
  "Slot Extender(Medium)",
  "Soul Disc (Lv. 2)",
  "Soul Disc(Lv. 1)",
  "Soul Disc(Lv. 2)",
  "Soul Disc(Lv. 3)",
  "Stain Clone",
  "Strange Stem",
  "Sword Damage Amplifier (Lv. 1)",
  "Sword Damage Amplifier (Lv. 2)",
  "Sword Damage Amplifier (Lv. 3)",
  "Sword Damage Amplifier (Lv. 4)",
  "Sword Damage Amplifier (Lv. 5)",
  "Sword Damage Amplifier (Lv. 6)",
  "Sword Damage Amplifier (Lv. 7)",
  "Sword Damage Amplifier(Lv. 1)",
  "Sword Damage Amplifier(Lv. 2)",
  "Sword Damage Amplifier(Lv. 3)",
  "Sword Damage Amplifier(Lv. 4)",
  "Sword Damage Amplifier(Lv. 5)",
  "Sword Damage Amplifier(Lv. 6)",
  "Sword Damage Amplifier(Lv. 7)",
  "The Soul Key",
  "Thunder Disc(Lv. 1)",
  "Thunder Disc(Lv. 2)",
  "Thunder Disc(Lv. 3)",
  "Unbound Merit Medal",
  "Unknown Circuit",
  "Unusual Lost Island Compass",
  "Upgrade Core Set",
  "Upgrade Core Set(High)",
  "Upgrade Core Set(Highest)",
  "Upgrade Core Set(Low)",
  "Upgrade Core Set(Medium)",
  "Upgrade Core Set(Ultimate)",
  "Upgrade Core(Crystal)",
  "Upgrade Core(High)",
  "Upgrade Core(Highest)",
  "Upgrade Core(Low)",
  "Upgrade Core(Medium)",
  "Upgrade Core(Piece)",
  "Upgrade Core(Ultimate)",
  "Perfect Core(Low)",
  "Perfect Core(Medium)",
  "Perfect Core(High)"
];

// Generate the complete item registry
export const GAME_ITEMS: GameItem[] = ITEM_NAMES.map(name => ({
  id: generateId(name),
  name,
  category: getCategory(name),
  stackSize: getStackSize(name)
}));

// Helper functions
export function getItemByName(name: string): GameItem | undefined {
  return GAME_ITEMS.find(item => item.name === name);
}

export function getItemById(id: string): GameItem | undefined {
  return GAME_ITEMS.find(item => item.id === id);
}

export function getItemsByCategory(category: string): GameItem[] {
  return GAME_ITEMS.filter(item => item.category === category);
}

export function getItemStackSize(itemName: string): number {
  const item = getItemByName(itemName);
  return item?.stackSize || 127;
}

// Export categories for UI
export const ITEM_CATEGORIES = Array.from(new Set(GAME_ITEMS.map(item => item.category))).sort();

// Export just names for easy reference
export const ITEM_NAMES_LIST = ITEM_NAMES;