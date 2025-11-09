/**
 * Artifact System Zustand Store
 * Manages artifact system state independently while contributing to global stats
 */

import { create } from 'zustand';
import { subscribeWithSelector } from 'zustand/middleware';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';
import { BuildStats } from '@/tools/build-planner/stores/buildPlannerStore';
import { ArtifactType, ConfiguredArtifact, ArtifactSlot, SlotType } from '../types';
import { getArtifactDefinition, getSlotValue } from '../data/artifacts-data';

// System ID for stat registry
const SYSTEM_ID = 'artifact-system';

interface ArtifactSystemState {
  // Configured artifacts (one per grade)
  configuredArtifacts: Record<ArtifactType, ConfiguredArtifact | null>;
  
  // Modal state
  isModalOpen: boolean;
  selectedArtifactType: ArtifactType | null;
  selectedSlotIndex: number | null;
  selectedSlotType: SlotType | null;
}

interface ArtifactSystemActions {
  // Artifact selection
  selectArtifact: (artifactType: ArtifactType) => void;
  removeArtifact: (artifactType: ArtifactType) => void;
  
  // Slot configuration
  configureSlot: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType, statId: string) => void;
  setSlotLevel: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType, level: number) => void;
  removeSlot: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType) => void;
  
  // Modal management
  openModal: (artifactType: ArtifactType) => void;
  openSlotModal: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType) => void;
  closeModal: () => void;
  
  // Stats calculation
  calculateTotalStats: () => BuildStats;
  registerStatsWithRegistry: () => void;
  
  // System management
  resetSystem: () => void;
  initializeSystem: () => void;
  
  // Getters
  getConfiguredArtifact: (artifactType: ArtifactType) => ConfiguredArtifact | null;
}

// Create the Artifact System Zustand store
export const useArtifactSystemStore = create<ArtifactSystemState & ArtifactSystemActions>()(
  subscribeWithSelector((set, get) => ({
    // Initial state
    configuredArtifacts: {
      dawn: null,
      dusk: null,
      midnight: null,
    },
    isModalOpen: false,
    selectedArtifactType: null,
    selectedSlotIndex: null,
    selectedSlotType: null,
    
    // Select an artifact
    selectArtifact: (artifactType: ArtifactType) => {
      const artifactDef = getArtifactDefinition(artifactType);
      
      // Initialize slots
      const slots: ArtifactSlot[] = [
        ...artifactDef.uniqueSlots.map(slotDef => ({
          slotIndex: slotDef.slotIndex,
          slotType: 'unique' as SlotType,
          statId: null,
          level: 1,
          maxLevel: artifactDef.maxLevel,
        })),
        ...artifactDef.assembledSlots.map(slotDef => ({
          slotIndex: slotDef.slotIndex,
          slotType: 'assembled' as SlotType,
          statId: null,
          level: 1,
          maxLevel: artifactDef.maxLevel,
        })),
      ];
      
      set(state => ({
        configuredArtifacts: {
          ...state.configuredArtifacts,
          [artifactType]: {
            artifactType,
            slots,
          },
        },
      }));
      
      get().registerStatsWithRegistry();
    },
    
    // Remove an artifact
    removeArtifact: (artifactType: ArtifactType) => {
      set(state => ({
        configuredArtifacts: {
          ...state.configuredArtifacts,
          [artifactType]: null,
        },
      }));
      
      get().registerStatsWithRegistry();
    },
    
    // Configure a slot with a stat
    configureSlot: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType, statId: string) => {
      const state = get();
      const artifact = state.configuredArtifacts[artifactType];
      
      if (!artifact) return;
      
      const updatedSlots = artifact.slots.map(slot => {
        if (slot.slotIndex === slotIndex && slot.slotType === slotType) {
          return {
            ...slot,
            statId,
            level: 1, // Reset to level 1 when configuring
          };
        }
        return slot;
      });
      
      set(state => ({
        configuredArtifacts: {
          ...state.configuredArtifacts,
          [artifactType]: {
            ...artifact,
            slots: updatedSlots,
          },
        },
      }));
      
      get().registerStatsWithRegistry();
    },
    
    // Set slot level
    setSlotLevel: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType, level: number) => {
      const state = get();
      const artifact = state.configuredArtifacts[artifactType];
      
      if (!artifact) return;
      
      const artifactDef = getArtifactDefinition(artifactType);
      const clampedLevel = Math.max(1, Math.min(level, artifactDef.maxLevel));
      
      const updatedSlots = artifact.slots.map(slot => {
        if (slot.slotIndex === slotIndex && slot.slotType === slotType && slot.statId) {
          return {
            ...slot,
            level: clampedLevel,
          };
        }
        return slot;
      });
      
      set(state => ({
        configuredArtifacts: {
          ...state.configuredArtifacts,
          [artifactType]: {
            ...artifact,
            slots: updatedSlots,
          },
        },
      }));
      
      get().registerStatsWithRegistry();
    },
    
    // Remove a slot configuration
    removeSlot: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType) => {
      const state = get();
      const artifact = state.configuredArtifacts[artifactType];
      
      if (!artifact) return;
      
      const updatedSlots = artifact.slots.map(slot => {
        if (slot.slotIndex === slotIndex && slot.slotType === slotType) {
          return {
            ...slot,
            statId: null,
            level: 1,
          };
        }
        return slot;
      });
      
      set(state => ({
        configuredArtifacts: {
          ...state.configuredArtifacts,
          [artifactType]: {
            ...artifact,
            slots: updatedSlots,
          },
        },
      }));
      
      get().registerStatsWithRegistry();
    },
    
    // Open modal for artifact configuration
    openModal: (artifactType: ArtifactType) => {
      set({
        isModalOpen: true,
        selectedArtifactType: artifactType,
        selectedSlotIndex: null,
        selectedSlotType: null,
      });
    },
    
    // Open modal for slot option selection
    openSlotModal: (artifactType: ArtifactType, slotIndex: number, slotType: SlotType) => {
      set({
        isModalOpen: true,
        selectedArtifactType: artifactType,
        selectedSlotIndex: slotIndex,
        selectedSlotType: slotType,
      });
    },
    
    // Close modal
    closeModal: () => {
      set({
        isModalOpen: false,
        selectedArtifactType: null,
        selectedSlotIndex: null,
        selectedSlotType: null,
      });
    },
    
    // Calculate total stats from all configured artifacts
    calculateTotalStats: (): BuildStats => {
      const state = get();
      const totalStats: BuildStats = {};
      
      Object.values(state.configuredArtifacts).forEach(artifact => {
        if (!artifact) return;
        
        artifact.slots.forEach(slot => {
          if (!slot.statId) return;
          
          const value = getSlotValue(
            artifact.artifactType,
            slot.slotIndex,
            slot.slotType,
            slot.statId,
            slot.level
          );
          
          if (value !== 0) {
            totalStats[slot.statId] = (totalStats[slot.statId] || 0) + value;
          }
        });
      });
      
      return totalStats;
    },
    
    // Register stats with stat registry
    registerStatsWithRegistry: () => {
      const totalStats = get().calculateTotalStats();
      useStatRegistryStore.getState().registerSystemStats(SYSTEM_ID, totalStats);
    },
    
    // Reset the entire system
    resetSystem: () => {
      set({
        configuredArtifacts: {
          dawn: null,
          dusk: null,
          midnight: null,
        },
        isModalOpen: false,
        selectedArtifactType: null,
        selectedSlotIndex: null,
        selectedSlotType: null,
      });
      
      useStatRegistryStore.getState().unregisterSystem(SYSTEM_ID);
    },
    
    // Initialize the system
    initializeSystem: () => {
      get().registerStatsWithRegistry();
    },
    
    // Get configured artifact
    getConfiguredArtifact: (artifactType: ArtifactType): ConfiguredArtifact | null => {
      return get().configuredArtifacts[artifactType];
    },
  }))
);

// Export system config for build sharing
export const artifactSystemConfig = {
  systemId: SYSTEM_ID,
  version: '1.0.0',
  serialize: () => {
    const state = useArtifactSystemStore.getState();
    return {
      configuredArtifacts: state.configuredArtifacts,
    };
  },
  deserialize: (data: any) => {
    if (data && data.configuredArtifacts) {
      useArtifactSystemStore.setState({
        configuredArtifacts: data.configuredArtifacts,
      });
      useArtifactSystemStore.getState().registerStatsWithRegistry();
    }
  },
};

