/**
 * Equipment System Zustand Store
 * Manages equipment system state independently while contributing to global stats
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { BuildStats } from '@/tools/build-planner/stores/buildPlannerStore';
import { ConfiguredWeapon, ConfiguredArmor, ConfiguredVehicle } from '../types/base-equipment';
import { Ring } from '../data/rings/rings-data';
import { Belt } from '../data/belts/belts-data';
import { ConfiguredCharm } from '../data/charms/charms-data';
import { ConfiguredCarnelian } from '../data/carnelians/carnelians-data';
import { ConfiguredArcana } from '../data/arcanas/arcanas-data';
import { Armor } from '../data/armor/armor-types';
import { Epaulet } from '../data/epaulets/epaulets-data';
import { Vehicle } from '../data/vehicles/vehicle-types';
import { ConfiguredEarring } from '../components/upgrade-modals/EarringUpgradeModal';
import { ConfiguredAmulet } from '../components/upgrade-modals/AmuletUpgradeModal';
import { ConfiguredBracelet } from '../components/upgrade-modals/BraceletUpgradeModal';
import { ConfiguredBrooch } from '../components/upgrade-modals/BroochUpgradeModal';
import { ConfiguredTalisman } from '../data/talismans/talismans-data';

// System ID for stat registry
const SYSTEM_ID = 'equipment-system';

// Union type for all equipment types
export type AnyEquipmentType = 
  | ConfiguredWeapon 
  | Ring 
  | Belt 
  | ConfiguredCharm 
  | ConfiguredCarnelian 
  | ConfiguredArcana 
  | ConfiguredArmor 
  | Epaulet 
  | ConfiguredVehicle 
  | ConfiguredEarring 
  | ConfiguredAmulet 
  | ConfiguredBracelet 
  | ConfiguredBrooch
  | ConfiguredTalisman;

// Equipment type configuration for slot-to-equipment mapping
const EQUIPMENT_TYPE_CONFIG = [
  { 
    type: 'weapon' as const,
    stateKey: 'configuredWeapons' as const,
    matcher: (slotId: string) => slotId.startsWith('weapon-')
  },
  { 
    type: 'ring' as const,
    stateKey: 'configuredRings' as const,
    matcher: (slotId: string) => slotId.startsWith('ring-')
  },
  { 
    type: 'belt' as const,
    stateKey: 'configuredBelts' as const,
    matcher: (slotId: string) => slotId === 'belt-1'
  },
  { 
    type: 'charm' as const,
    stateKey: 'configuredCharms' as const,
    matcher: (slotId: string) => slotId === 'charm'
  },
  { 
    type: 'carnelian' as const,
    stateKey: 'configuredCarnelians' as const,
    matcher: (slotId: string) => slotId === 'carnelian'
  },
  { 
    type: 'arcana' as const,
    stateKey: 'configuredArcanas' as const,
    matcher: (slotId: string) => slotId === 'arcana-1' || slotId === 'arcana-2'
  },
  { 
    type: 'armor' as const,
    stateKey: 'configuredArmors' as const,
    matcher: (slotId: string) => slotId.startsWith('armor-') || slotId === 'gloves'
  },
  { 
    type: 'epaulet' as const,
    stateKey: 'configuredEpaulets' as const,
    matcher: (slotId: string) => slotId === 'epaulet'
  },
  { 
    type: 'vehicle' as const,
    stateKey: 'configuredVehicles' as const,
    matcher: (slotId: string) => slotId === 'bike'
  },
  { 
    type: 'earring' as const,
    stateKey: 'configuredEarrings' as const,
    matcher: (slotId: string) => slotId.startsWith('earring-')
  },
  { 
    type: 'amulet' as const,
    stateKey: 'configuredAmulets' as const,
    matcher: (slotId: string) => slotId === 'amulet'
  },
  { 
    type: 'bracelet' as const,
    stateKey: 'configuredBracelets' as const,
    matcher: (slotId: string) => slotId.startsWith('bracelet-')
  },
  { 
    type: 'brooch' as const,
    stateKey: 'configuredBrooches' as const,
    matcher: (slotId: string) => slotId === 'brooch'
  },
  { 
    type: 'talisman' as const,
    stateKey: 'configuredTalismans' as const,
    matcher: (slotId: string) => slotId === 'talisman'
  }
];

// Helper function to get equipment type config for a slot
const getEquipmentTypeConfig = (slotId: string) => {
  return EQUIPMENT_TYPE_CONFIG.find(config => config.matcher(slotId));
};

// Equipment System State
interface EquipmentSystemState {
  // Map of slot IDs to their configured weapons
  configuredWeapons: Record<string, ConfiguredWeapon>;
  // Map of slot IDs to their configured rings
  configuredRings: Record<string, Ring>;
  // Map of slot IDs to their configured belts
  configuredBelts: Record<string, Belt>;
  // Map of slot IDs to their configured charms
  configuredCharms: Record<string, ConfiguredCharm>;
  // Map of slot IDs to their configured carnelians
  configuredCarnelians: Record<string, ConfiguredCarnelian>;
  // Map of slot IDs to their configured arcanas
  configuredArcanas: Record<string, ConfiguredArcana>;
  // Map of slot IDs to their configured armors
  configuredArmors: Record<string, ConfiguredArmor>;
  // Map of slot IDs to their configured epaulets
  configuredEpaulets: Record<string, Epaulet>;
  // Map of slot IDs to their configured vehicles
  configuredVehicles: Record<string, ConfiguredVehicle>;
  // Map of slot IDs to their configured earrings
  configuredEarrings: Record<string, ConfiguredEarring>;
  // Map of slot IDs to their configured amulets
  configuredAmulets: Record<string, ConfiguredAmulet>;
  // Map of slot IDs to their configured bracelets
  configuredBracelets: Record<string, ConfiguredBracelet>;
  // Map of slot IDs to their configured brooches
  configuredBrooches: Record<string, ConfiguredBrooch>;
  // Map of slot IDs to their configured talismans
  configuredTalismans: Record<string, ConfiguredTalisman>;
  // Currently selected slot ID
  selectedSlotId: string | null;
  // Modal open state
  isModalOpen: boolean;
}

// Equipment System Actions
interface EquipmentSystemActions {
  // Calculate total stats from all configured equipment
  calculateTotalStats: () => BuildStats;
  
  // Generic equipment management methods
  setConfiguredEquipment: (slotId: string, equipment: AnyEquipmentType) => void;
  removeConfiguredEquipment: (slotId: string) => void;
  getConfiguredEquipment: (slotId: string) => AnyEquipmentType | undefined;
  // Open the equipment slot modal
  openModal: (slotId: string) => void;
  // Close the equipment slot modal
  closeModal: () => void;
  // Initialize the system
  initializeSystem: () => void;
  // Reset the system to its default state
  resetSystem: () => void;
  // Load system state from URL
  loadFromUrl: (state: any) => void;
  // Quick fill the system with predefined configurations
  quickFillSystem: () => void;

  // Method for universal build sharing - restores state and triggers stat registration
  restoreFromImport: (data: {
    configuredWeapons?: Record<string, ConfiguredWeapon>;
    configuredRings?: Record<string, Ring>;
    configuredBelts?: Record<string, Belt>;
    configuredCharms?: Record<string, ConfiguredCharm>;
    configuredCarnelians?: Record<string, ConfiguredCarnelian>;
    configuredArcanas?: Record<string, ConfiguredArcana>;
    configuredArmors?: Record<string, ConfiguredArmor>;
    configuredEpaulets?: Record<string, Epaulet>;
    configuredVehicles?: Record<string, ConfiguredVehicle>;
    configuredEarrings?: Record<string, ConfiguredEarring>;
    configuredAmulets?: Record<string, ConfiguredAmulet>;
    configuredBracelets?: Record<string, ConfiguredBracelet>;
    configuredBrooches?: Record<string, ConfiguredBrooch>;
    configuredTalismans?: Record<string, ConfiguredTalisman>;
  }) => void;
}

// Create the Equipment System Zustand store
export const useEquipmentSystemStore = create<EquipmentSystemState & EquipmentSystemActions>()(subscribeWithSelector((set, get) => ({
  // Initial state
  configuredWeapons: {},
  configuredRings: {},
  configuredBelts: {},
  configuredCharms: {},
  configuredCarnelians: {},
  configuredArcanas: {},
  configuredArmors: {},
  configuredEpaulets: {},
  configuredVehicles: {},
  configuredEarrings: {},
  configuredAmulets: {},
  configuredBracelets: {},
  configuredBrooches: {},
  configuredTalismans: {},
  selectedSlotId: null,
  isModalOpen: false,
  
  // Calculate total stats from all configured equipment
  calculateTotalStats: (): BuildStats => {
    const state = get();
    const totalStats: BuildStats = {};
    
    // Helper function to aggregate stats from any equipment collection
    const addStatsFromCollection = (collection: Record<string, any>, statsProperty: 'totalStats' | 'baseStats', requiresTypeCheck: boolean = false) => {
      Object.values(collection).forEach(item => {
        if (item && item[statsProperty]) {
          Object.entries(item[statsProperty]).forEach(([statId, value]) => {
            // Apply type checking only for equipment that needs it (earrings, amulets, bracelets, brooches)
            if (requiresTypeCheck && typeof value !== 'number') return;
            if (typeof value === 'number' && value !== 0) {
              totalStats[statId] = (totalStats[statId] || 0) + value;
            }
          });
        }
      });
    };

    // Aggregate stats from all equipment types
    addStatsFromCollection(state.configuredWeapons, 'totalStats');
    addStatsFromCollection(state.configuredRings, 'baseStats');
    addStatsFromCollection(state.configuredBelts, 'totalStats');
    addStatsFromCollection(state.configuredCharms, 'totalStats');
    addStatsFromCollection(state.configuredCarnelians, 'totalStats');
    addStatsFromCollection(state.configuredArcanas, 'totalStats');
    addStatsFromCollection(state.configuredArmors, 'totalStats');
    addStatsFromCollection(state.configuredEpaulets, 'baseStats');
    addStatsFromCollection(state.configuredVehicles, 'totalStats');
    addStatsFromCollection(state.configuredEarrings, 'totalStats', true);
    addStatsFromCollection(state.configuredAmulets, 'totalStats', true);
    addStatsFromCollection(state.configuredBracelets, 'totalStats', true);
    addStatsFromCollection(state.configuredBrooches, 'totalStats', true);
    addStatsFromCollection(state.configuredTalismans, 'totalStats');
    
    return totalStats;
  },
  
  // Generic method to set any equipment type for a specific slot
  setConfiguredEquipment: (slotId, equipment) => {
    const config = getEquipmentTypeConfig(slotId);
    if (!config) {
      console.warn(`No equipment type configuration found for slot: ${slotId}`);
      return;
    }
    
    // Update the appropriate equipment map
    set(state => ({
      [config.stateKey]: {
        ...state[config.stateKey],
        [slotId]: equipment
      }
    }));
    
    // Calculate total stats and register with the stat registry
    const totalStats = get().calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
  },
  
  // Generic method to remove any equipment type from a specific slot
  removeConfiguredEquipment: (slotId) => {
    const config = getEquipmentTypeConfig(slotId);
    if (!config) {
      console.warn(`No equipment type configuration found for slot: ${slotId}`);
      return;
    }
    
    // Remove the equipment from the appropriate map
    set(state => {
      const newEquipmentMap = { ...state[config.stateKey] };
      delete newEquipmentMap[slotId];
      
      return { [config.stateKey]: newEquipmentMap };
    });
    
    // Calculate total stats and register with the stat registry
    const totalStats = get().calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
  },
  
  // Generic method to get any equipment type for a specific slot
  getConfiguredEquipment: (slotId) => {
    const config = getEquipmentTypeConfig(slotId);
    if (!config) {
      return undefined;
    }
    
    return get()[config.stateKey][slotId];
  },

  
  // Open the equipment slot modal
  openModal: (slotId) => {
    set({ selectedSlotId: slotId, isModalOpen: true });
  },
  
  // Close the equipment slot modal
  closeModal: () => {
    set({ selectedSlotId: null, isModalOpen: false });
  },
  
  // Initialize the system
  initializeSystem: () => {
    // Register initial stats with the registry (empty at first)
    const totalStats = get().calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
  },
  
  // Reset the system to its default state
  resetSystem: () => {
    // Unregister this system's stats from the registry
    useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
    
    // Reset local state
    set({
      configuredWeapons: {},
      configuredRings: {},
      configuredBelts: {},
      configuredCharms: {},
      configuredCarnelians: {},
      configuredArcanas: {},
      configuredArmors: {},
      configuredEpaulets: {},
      configuredVehicles: {},
      configuredEarrings: {},
      configuredAmulets: {},
      configuredBracelets: {},
      configuredBrooches: {},
      configuredTalismans: {},
      selectedSlotId: null,
      isModalOpen: false
    });
  },
  
  // Load system state from URL
  loadFromUrl: (systemState: any) => {
    if (systemState) {
      const newState: any = {};
      if (systemState.configuredWeapons) {
        newState.configuredWeapons = systemState.configuredWeapons;
      }
      if (systemState.configuredRings) {
        newState.configuredRings = systemState.configuredRings;
      }
      if (systemState.configuredBelts) {
        newState.configuredBelts = systemState.configuredBelts;
      }
      if (systemState.configuredCharms) {
        newState.configuredCharms = systemState.configuredCharms;
      }
      if (systemState.configuredCarnelians) {
        newState.configuredCarnelians = systemState.configuredCarnelians;
      }
      if (systemState.configuredArcanas) {
        newState.configuredArcanas = systemState.configuredArcanas;
      }
      if (systemState.configuredArmors) {
        newState.configuredArmors = systemState.configuredArmors;
      }
      if (systemState.configuredEpaulets) {
        newState.configuredEpaulets = systemState.configuredEpaulets;
      }
      if (systemState.configuredVehicles) {
        newState.configuredVehicles = systemState.configuredVehicles;
      }
      if (systemState.configuredEarrings) {
        newState.configuredEarrings = systemState.configuredEarrings;
      }
      if (systemState.configuredAmulets) {
        newState.configuredAmulets = systemState.configuredAmulets;
      }
      if (systemState.configuredBracelets) {
        newState.configuredBracelets = systemState.configuredBracelets;
      }
      if (systemState.configuredBrooches) {
        newState.configuredBrooches = systemState.configuredBrooches;
      }
      if (systemState.configuredTalismans) {
        newState.configuredTalismans = systemState.configuredTalismans;
      }
      
      if (Object.keys(newState).length > 0) {
        set(newState);
        
        // Calculate total stats and register with the registry
        const totalStats = get().calculateTotalStats();
        useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
      }
    }
  },
  
  // Quick fill the system with predefined configurations
  quickFillSystem: () => {
    // For now, just reset the system
    // In the future, this could be expanded to add predefined weapon configurations
    get().resetSystem();
  },
  


  // Method for universal build sharing - restores state and triggers stat registration
  restoreFromImport: (data: {
    configuredWeapons?: Record<string, ConfiguredWeapon>;
    configuredRings?: Record<string, Ring>;
    configuredBelts?: Record<string, Belt>;
    configuredCharms?: Record<string, ConfiguredCharm>;
    configuredCarnelians?: Record<string, ConfiguredCarnelian>;
    configuredArcanas?: Record<string, ConfiguredArcana>;
    configuredArmors?: Record<string, ConfiguredArmor>;
    configuredEpaulets?: Record<string, Epaulet>;
    configuredVehicles?: Record<string, ConfiguredVehicle>;
    configuredEarrings?: Record<string, ConfiguredEarring>;
    configuredAmulets?: Record<string, ConfiguredAmulet>;
    configuredBracelets?: Record<string, ConfiguredBracelet>;
    configuredBrooches?: Record<string, ConfiguredBrooch>;
    configuredTalismans?: Record<string, ConfiguredTalisman>;
  }) => {
    // Set the imported data, preserving existing data for any missing fields
    set({
      configuredWeapons: data.configuredWeapons || {},
      configuredRings: data.configuredRings || {},
      configuredBelts: data.configuredBelts || {},
      configuredCharms: data.configuredCharms || {},
      configuredCarnelians: data.configuredCarnelians || {},
      configuredArcanas: data.configuredArcanas || {},
      configuredArmors: data.configuredArmors || {},
      configuredEpaulets: data.configuredEpaulets || {},
      configuredVehicles: data.configuredVehicles || {},
      configuredEarrings: data.configuredEarrings || {},
      configuredAmulets: data.configuredAmulets || {},
      configuredBracelets: data.configuredBracelets || {},
      configuredBrooches: data.configuredBrooches || {},
      configuredTalismans: data.configuredTalismans || {},
      selectedSlotId: null,
      isModalOpen: false
    });
    
    // Calculate total equipment stats and register with the stat registry
    const totalStats = get().calculateTotalStats();
    useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    
    console.log('Equipment system restored from import with stats:', totalStats);
  }
})));

// Export the system config for build sharing
export const systemConfig = {
  systemId: SYSTEM_ID,
  getDefaultState: () => ({ 
    configuredWeapons: {}, 
    configuredRings: {},
    configuredBelts: {},
    configuredCharms: {},
    configuredCarnelians: {},
    configuredArcanas: {},
    configuredArmors: {},
    configuredEpaulets: {},
    configuredVehicles: {},
    configuredEarrings: {},
    configuredAmulets: {},
    configuredBracelets: {},
    configuredBrooches: {},
    configuredTalismans: {}
  })
};

// Export types
export type { EquipmentSystemState, EquipmentSystemActions };

export type { ConfiguredArmor };
