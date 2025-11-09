/**
 * Artifact System Type Definitions
 */

export type ArtifactType = 'dawn' | 'dusk' | 'midnight';
export type SlotType = 'unique' | 'assembled';

/**
 * Configuration for a single artifact slot
 */
export interface ArtifactSlot {
  slotIndex: number; // 1, 2, 3, etc.
  slotType: SlotType;
  statId: string | null; // Stat ID from stats-config.ts
  level: number; // Current level (1 to maxLevel)
  maxLevel: number; // Maximum level for this artifact grade
}

/**
 * Stat option available for a slot
 */
export interface ArtifactSlotOption {
  statId: string; // Stat ID from stats-config.ts
  chance: number; // Drop chance percentage
  values: number[]; // Stat values for each level (index 0 = level 1)
  isPercentage: boolean; // Whether this stat is a percentage
}

/**
 * Complete slot definition with available options
 */
export interface ArtifactSlotDefinition {
  slotIndex: number;
  slotType: SlotType;
  options: ArtifactSlotOption[];
}

/**
 * Configured artifact with all slot configurations
 */
export interface ConfiguredArtifact {
  artifactType: ArtifactType;
  slots: ArtifactSlot[];
}

/**
 * Artifact definition with all slot definitions
 */
export interface ArtifactDefinition {
  artifactType: ArtifactType;
  name: string;
  maxLevel: number; // Maximum level for stats in this artifact
  uniqueSlots: ArtifactSlotDefinition[];
  assembledSlots: ArtifactSlotDefinition[];
}

