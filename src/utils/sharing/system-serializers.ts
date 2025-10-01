/**
 * System Serializers
 * Contains serialization logic for all game systems
 */

import { usePetSystemStore } from '@/tools/build-planner/systems/pet/stores/petSystemStore';
import { useStellarSystemStore } from '@/tools/build-planner/systems/stellar-system/stores/stellarSystemStore';
import { useHonorMedalStore } from '@/tools/build-planner/systems/honor-medal/stores/honorMedalStore';
import { useEquipmentSystemStore } from '@/tools/build-planner/systems/equipment-system/stores/equipmentSystemStore';
import { useEssenceRuneStore } from '@/tools/build-planner/systems/essence-rune/stores/essenceRuneStore';
import { useKarmaRuneStore } from '@/tools/build-planner/systems/karma-rune/stores/karmaRuneStore';
import { useAchievementStore } from '@/tools/build-planner/systems/achievement/stores/achievementStore';
import { useCollectionStore } from '@/tools/build-planner/systems/collection/stores/collectionStore';
import { useOverlordMasteryStore } from '@/tools/build-planner/systems/overlord-mastery/stores/overlordMasteryStore';
import { usePassiveSkillsStore } from '@/tools/build-planner/systems/passive-skills/stores/passiveSkillsStore';
import { useMythLevelStore } from '@/tools/build-planner/systems/myth-level/stores/mythLevelStore';
import { useClassStore } from '@/tools/build-planner/systems/class/stores';
import { useClassPassiveSkillsStore } from '@/tools/build-planner/systems/class-passive-skills/stores';
import { useGoldMeritStore } from '@/tools/build-planner/systems/gold-merit/stores/goldMeritStore';
import { useForceWingSystemStore } from '@/tools/build-planner/systems/force-wing/stores/forceWingSystemStore';
import { useCollectionTrackerStore } from '@/tools/collection-tracker/stores/collectionTrackerStore';

// System serialization interface
export interface SystemSerializer {
  systemId: string;
  extract: () => any;
  restore: (data: any) => void;
}

/**
 * Get all default system serializers
 */
export function getDefaultSystemSerializers(): SystemSerializer[] {
  return [
    // Pet System
    {
      systemId: 'pet',
      extract: () => {
        const petState = usePetSystemStore.getState();
        return { categories: petState.categories };
      },
      restore: (data) => {
        const petStore = usePetSystemStore.getState();
        petStore.restoreFromImport(data.categories);
      }
    },

    // Stellar System
    {
      systemId: 'stellar',
      extract: () => {
        const stellarState = useStellarSystemStore.getState();
        return {
          constellations: stellarState.constellations,
          nodeStates: stellarState.nodeStates
        };
      },
      restore: (data) => {
        const stellarStore = useStellarSystemStore.getState();
        stellarStore.restoreFromImport({
          constellations: data.constellations,
          nodeStates: data.nodeStates
        });
      }
    },

    // Honor Medal System
    {
      systemId: 'honorMedal',
      extract: () => {
        const honorMedalState = useHonorMedalStore.getState();
        return {
          categories: honorMedalState.categories,
          slotStates: honorMedalState.slotStates,
          rankLevels: honorMedalState.rankLevels
        };
      },
      restore: (data) => {
        const honorMedalStore = useHonorMedalStore.getState();
        honorMedalStore.restoreFromImport({
          categories: data.categories,
          slotStates: data.slotStates,
          rankLevels: data.rankLevels
        });
      }
    },

    // Equipment System
    {
      systemId: 'equipment',
      extract: () => {
        const equipmentState = useEquipmentSystemStore.getState();
        return {
          configuredWeapons: equipmentState.configuredWeapons,
          configuredRings: equipmentState.configuredRings,
          configuredBelts: equipmentState.configuredBelts,
          configuredCharms: equipmentState.configuredCharms,
          configuredCarnelians: equipmentState.configuredCarnelians,
          configuredArcanas: equipmentState.configuredArcanas,
          configuredArmors: equipmentState.configuredArmors,
          configuredEpaulets: equipmentState.configuredEpaulets,
          configuredVehicles: equipmentState.configuredVehicles,
          configuredEarrings: equipmentState.configuredEarrings,
          configuredAmulets: equipmentState.configuredAmulets,
          configuredBracelets: equipmentState.configuredBracelets,
          configuredBrooches: equipmentState.configuredBrooches
        };
      },
      restore: (data) => {
        const equipmentStore = useEquipmentSystemStore.getState();
        equipmentStore.restoreFromImport({
          configuredWeapons: data.configuredWeapons,
          configuredRings: data.configuredRings,
          configuredBelts: data.configuredBelts,
          configuredCharms: data.configuredCharms,
          configuredCarnelians: data.configuredCarnelians,
          configuredArcanas: data.configuredArcanas,
          configuredArmors: data.configuredArmors,
          configuredEpaulets: data.configuredEpaulets,
          configuredVehicles: data.configuredVehicles,
          configuredEarrings: data.configuredEarrings,
          configuredAmulets: data.configuredAmulets,
          configuredBracelets: data.configuredBracelets,
          configuredBrooches: data.configuredBrooches
        });
      }
    },

    // Essence Rune System
    {
      systemId: 'essenceRune',
      extract: () => {
        const essenceRuneState = useEssenceRuneStore.getState();
        return { equippedRunes: essenceRuneState.equippedRunes };
      },
      restore: (data) => {
        const essenceRuneStore = useEssenceRuneStore.getState();
        essenceRuneStore.restoreFromImport({ equippedRunes: data.equippedRunes });
      }
    },

    // Karma Rune System
    {
      systemId: 'karmaRune',
      extract: () => {
        const karmaRuneState = useKarmaRuneStore.getState();
        return { equippedRunes: karmaRuneState.equippedRunes };
      },
      restore: (data) => {
        const karmaRuneStore = useKarmaRuneStore.getState();
        karmaRuneStore.restoreFromImport({ equippedRunes: data.equippedRunes });
      }
    },

    // Achievement System
    {
      systemId: 'achievement',
      extract: () => {
        const achievementState = useAchievementStore.getState();
        const achievementSelections = achievementState.achievements.map(achievement => ({
          id: achievement.id,
          isCompleted: achievement.isCompleted || false,
          selectedMilestone: achievement.selectedMilestone || 0
        })).filter(selection => 
          selection.isCompleted || selection.selectedMilestone > 0
        );
        return { achievements: achievementSelections };
      },
      restore: (data) => {
        const achievementStore = useAchievementStore.getState();
        achievementStore.restoreFromImport({ achievements: data.achievements });
      }
    },

    // Collection System
    {
      systemId: 'collection',
      extract: () => {
        const collectionState = useCollectionStore.getState();
        return {
          collectionProgress: collectionState.collectionProgress,
          activeCategory: collectionState.activeCategory,
          activeCollection: collectionState.activeCollection
        };
      },
      restore: (data) => {
        const collectionStore = useCollectionStore.getState();
        collectionStore.restoreFromImport({
          collectionProgress: data.collectionProgress,
          activeCategory: data.activeCategory,
          activeCollection: data.activeCollection
        });
      }
    },

    // Overlord Mastery System
    {
      systemId: 'overlordMastery',
      extract: () => {
        const overlordMasteryState = useOverlordMasteryStore.getState();
        return {
          skillStates: overlordMasteryState.skillStates,
          totalOpSpent: overlordMasteryState.totalOpSpent,
          availableOp: overlordMasteryState.availableOp,
          selectedCategory: overlordMasteryState.selectedCategory
        };
      },
      restore: (data) => {
        const overlordMasteryStore = useOverlordMasteryStore.getState();
        overlordMasteryStore.restoreFromImport({
          skillStates: data.skillStates,
          totalOpSpent: data.totalOpSpent,
          availableOp: data.availableOp,
          selectedCategory: data.selectedCategory
        });
      }
    },

    // Passive Skills System
    {
      systemId: 'passiveSkills',
      extract: () => {
        const passiveSkillsState = usePassiveSkillsStore.getState();
        return {
          selectedSkills: passiveSkillsState.selectedSkills
        };
      },
      restore: (data) => {
        const passiveSkillsStore = usePassiveSkillsStore.getState();
        passiveSkillsStore.restoreFromImport(data.selectedSkills);
      }
    },

    // Mythical Level System
    {
      systemId: 'mythLevel',
      extract: () => {
        const mythLevelState = useMythLevelStore.getState();
        return {
          nodeStats: mythLevelState.nodeStats,
          totalHolyPower: mythLevelState.totalHolyPower
        };
      },
      restore: (data) => {
        const mythLevelStore = useMythLevelStore.getState();
        mythLevelStore.restoreFromImport({
          nodeStats: data.nodeStats,
          totalHolyPower: data.totalHolyPower
        });
      }
    },

    // Class System
    {
      systemId: 'class',
      extract: () => {
        const classState = useClassStore.getState();
        return {
          selectedClass: classState.selectedClass,
          statDistribution: classState.statDistribution,
          remainingPoints: classState.remainingPoints
        };
      },
      restore: (data) => {
        const classStore = useClassStore.getState();
        
        // Reset first to clear any existing state
        classStore.resetClass();
        
        // Restore class selection if it exists
        if (data.selectedClass) {
          classStore.setSelectedClass(data.selectedClass);
        }
        
        // Restore stat distribution
        if (data.statDistribution) {
          Object.entries(data.statDistribution).forEach(([stat, value]) => {
            if (typeof value === 'number' && (stat === 'str' || stat === 'int' || stat === 'dex')) {
              classStore.setStatValue(stat, value);
            }
          });
        }
        

      }
    },

    // Class Passive Skills System
    {
      systemId: 'classPassiveSkills',
      extract: () => {
        const classPassiveSkillsState = useClassPassiveSkillsStore.getState();
        return {
          selectedClass: classPassiveSkillsState.selectedClass,
          passiveSkills: classPassiveSkillsState.passiveSkills
        };
      },
      restore: (data) => {
        const classPassiveSkillsStore = useClassPassiveSkillsStore.getState();
        
        // Reset first to clear any existing state
        classPassiveSkillsStore.resetSystem();
        
        // Restore using the restoreFromImport method
        if (data.selectedClass || data.passiveSkills) {
          classPassiveSkillsStore.restoreFromImport(
            data.selectedClass || null,
            data.passiveSkills || {}
          );
        }
      }
    },

    // Gold Merit System
    {
      systemId: 'goldMerit',
      extract: () => {
        const goldMeritState = useGoldMeritStore.getState();
        return {
          slotStates: goldMeritState.slotStates,
          totalPointsSpent: goldMeritState.totalPointsSpent,
          selectedCategory: goldMeritState.selectedCategory
        };
      },
      restore: (data) => {
        const goldMeritStore = useGoldMeritStore.getState();
        goldMeritStore.restoreFromImport({
          slotStates: data.slotStates,
          totalPointsSpent: data.totalPointsSpent,
          selectedCategory: data.selectedCategory
        });
      }
    },

    // Force Wing System
    {
      systemId: 'force-wing',
      extract: () => {
        const forceWingState = useForceWingSystemStore.getState();
        return {
          categories: forceWingState.categories,
          forceWingLevel: forceWingState.forceWingLevel
        };
      },
      restore: (data) => {
        const forceWingStore = useForceWingSystemStore.getState();
        forceWingStore.restoreFromImport(data);
      }
    },

    // Collection Tracker System
    {
      systemId: 'collectionTracker',
      extract: () => {
        const collectionTrackerState = useCollectionTrackerStore.getState();
        return {
          collectionProgress: collectionTrackerState.collectionProgress,
          activeTab: collectionTrackerState.activeTab,
          activePage: collectionTrackerState.activePage,
          activeCollection: collectionTrackerState.activeCollection
        };
      },
      restore: (data) => {
        const { 
          setActiveTab, 
          setActivePage, 
          setActiveCollection,
          resetAllProgress,
          completeAllItemsInCollection
        } = useCollectionTrackerStore.getState();
        
        // First reset all progress to clear existing data
        resetAllProgress();
        
        // Restore UI state using individual setters
        if (data.activeTab) {
          setActiveTab(data.activeTab);
        }
        if (data.activePage) {
          setActivePage(data.activePage);
        }
        if (data.activeCollection) {
          setActiveCollection(data.activeCollection);
        }
        
        // Restore collection progress data
        if (data.collectionProgress) {
          // We need to use Zustand's internal set method to restore the collection progress
          // Since the store doesn't expose a direct method to bulk restore progress
          const store = useCollectionTrackerStore;
          store.setState({ 
            collectionProgress: data.collectionProgress
          });
        }
      }
    }
  ];
}