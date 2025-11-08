// Component for displaying a modal window when an equipment slot is clicked.

import React, { useState, useEffect } from 'react';
import { weapons } from '../data/weapons/weapons-data';
import { Weapon } from '../data/weapons/types';
import { rings, Ring } from '../data/rings/rings-data';
import { belts, Belt, getAllBelts, createConfiguredBelt, calculateBeltStats } from '../data/belts/belts-data';
import { charms, Charm, isCharm } from '../data/charms/charms-data'; // Reverted: Removed Charm data functions for generic modal
import { carnelians, Carnelian, getAllCarnelians, createConfiguredCarnelian, calculateCarnelianStats, ConfiguredCarnelian } from '../data/carnelians/carnelians-data';
import { arcanas, Arcana, getAllArcanas, createConfiguredArcana, calculateArcanaStats, ConfiguredArcana } from '../data/arcanas/arcanas-data';
import { armors, Armor } from '../data/armor/index';
import { epaulets, Epaulet } from '../data/epaulets/epaulets-data';
import { vehicles, Vehicle, isVehicle } from '../data/vehicles/index';
import { earrings, Earring } from '../data/earrings/earrings-data';
import { amulets, Amulet } from '../data/amulets/amulets-data';
import { bracelets, Bracelet } from '../data/bracelets/bracelets-data';
import { brooches, Brooch } from '../data/brooches/brooches-data';
import { talismans, Talisman, getAllTalismans, createConfiguredTalisman, calculateTalismanStats, ConfiguredTalisman, isTalisman } from '../data/talismans/talismans-data';
import EquipmentUpgradeModal from './upgrade-modals/EquipmentUpgradeModal';
import { ConfiguredWeapon, ConfiguredVehicle, ConfiguredArmor, Equipment as BaseEquipment, ConfiguredEquipment, Equipment } from '../types/base-equipment';
// import BeltUpgradeModal from './upgrade-modals/BeltUpgradeModal'; // Removed
import GenericItemUpgradeModal, { ConfiguredItem, BaseItem } from './upgrade-modals/GenericItemUpgradeModal';
import ItemSelectionGrid from './ItemSelectionGrid';
import { ConfiguredCharm, getAllCharmsAsBaseItems, createConfiguredCharmFromId, calculateCharmStatsAsRecord } from '../data/charms/charms-data';
// import CarnelianUpgradeModal, { ConfiguredCarnelian } from './upgrade-modals/CarnelianUpgradeModal'; // Removed
// import ArcanaUpgradeModal, { ConfiguredArcana } from './upgrade-modals/ArcanaUpgradeModal'; // Removed
import EarringUpgradeModal, { ConfiguredEarring } from './upgrade-modals/EarringUpgradeModal';
import AmuletUpgradeModal, { ConfiguredAmulet } from './upgrade-modals/AmuletUpgradeModal';
import BraceletUpgradeModal, { ConfiguredBracelet } from './upgrade-modals/BraceletUpgradeModal';
import BroochUpgradeModal, { ConfiguredBrooch } from './upgrade-modals/BroochUpgradeModal';
// import type { ConfiguredBelt } from './upgrade-modals/BeltUpgradeModal'; // Removed
import GeneralItemTooltip from './tooltips/GeneralItemTooltip';
import CharmTooltip from './tooltips/CharmTooltip';
import TalismanTooltip from './tooltips/TalismanTooltip';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import { useEquipmentSystemStore, AnyEquipmentType } from '../stores/equipmentSystemStore';
import { useClassStore } from '../../class/stores';
import { filterWeaponsByClass, filterArmorsByClass } from '../utils/classCompatibility';

// Type for GeneralItemTooltip
type GeneralItemTooltipItem = Belt | ConfiguredCarnelian | ConfiguredArcana | ConfiguredTalisman;

// Type for TalismanTooltip
interface TalismanTooltipItem extends Talisman {
  currentLevel: number;
  totalStats: Record<string, number>;
}

// Wrapper components for tooltips to handle different prop requirements
const GeneralItemTooltipWrapper: React.FC<{ item: GeneralItemTooltipItem }> = ({ item }) => (
  <GeneralItemTooltip item={item} />
);

const CharmTooltipWrapper: React.FC<{ item: ConfiguredCharm }> = ({ item }) => {
  const formatStatName = (stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  };

  const formatStatValueWithSign = (statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+${formattedValue}` : `-${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  };

  return (
    <CharmTooltip 
      charm={item} 
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
};

const TalismanTooltipWrapper: React.FC<{ item: TalismanTooltipItem }> = ({ item }) => {
  const formatStatName = (stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  };

  const formatStatValueWithSign = (statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+${formattedValue}` : `-${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  };

  return (
    <TalismanTooltip 
      item={item} 
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
};

type AllEquipmentTypes = Weapon | Ring | Belt | Charm | Carnelian | Arcana | Armor | Epaulet | Vehicle | Earring | Amulet | Bracelet | Brooch | Talisman;

interface EquipmentSlotModalProps {
  isOpen: boolean;
  onClose: () => void;
  slotId?: string; // Optional: to identify which slot was clicked
}

const EquipmentSlotModal: React.FC<EquipmentSlotModalProps> = ({ isOpen, onClose, slotId }) => {
  const [selectedBelt, setSelectedBelt] = useState<Belt | undefined>(undefined);
  const [selectedCharm, setSelectedCharm] = useState<Charm | undefined>(undefined);
  const [selectedCarnelian, setSelectedCarnelian] = useState<Carnelian | undefined>(undefined);
  const [selectedArcana, setSelectedArcana] = useState<Arcana | undefined>(undefined);
  const [selectedEarring, setSelectedEarring] = useState<Earring | undefined>(undefined);
  const [selectedAmulet, setSelectedAmulet] = useState<Amulet | undefined>(undefined);
  const [selectedBracelet, setSelectedBracelet] = useState<Bracelet | undefined>(undefined);
  const [selectedBrooch, setSelectedBrooch] = useState<Brooch | undefined>(undefined);
  const [selectedTalisman, setSelectedTalisman] = useState<Talisman | undefined>(undefined);
  
  const [isEquipmentUpgradeModalOpen, setIsEquipmentUpgradeModalOpen] = useState(false);
  const [isBeltModalOpen, setIsBeltModalOpen] = useState(false);
  const [isCharmModalOpen, setIsCharmModalOpen] = useState(false);
  const [isCarnelianModalOpen, setIsCarnelianModalOpen] = useState(false);
  const [isArcanaModalOpen, setIsArcanaModalOpen] = useState(false);
  const [isEarringModalOpen, setIsEarringModalOpen] = useState(false);
  const [isAmuletModalOpen, setIsAmuletModalOpen] = useState(false);
  const [isBraceletModalOpen, setIsBraceletModalOpen] = useState(false);
  const [isBroochModalOpen, setIsBroochModalOpen] = useState(false);
  const [isTalismanModalOpen, setIsTalismanModalOpen] = useState(false);
  const [selectedEquipment, setSelectedEquipment] = useState<BaseEquipment | undefined>(undefined);
  
  // Always call hooks at the top level, never conditionally
  const equipmentStore = useEquipmentSystemStore();
  const { selectedClass } = useClassStore();
  
  // Filter weapons based on selected class
  const availableWeapons = filterWeaponsByClass(weapons, selectedClass);
  
  // Get configured equipment from the store (using generic method internally)
  const configuredWeapon = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredWeapon : undefined;
  const configuredRing = slotId ? equipmentStore.getConfiguredEquipment(slotId) as Ring : undefined;
  const configuredBelt = slotId ? equipmentStore.getConfiguredEquipment(slotId) as Belt : undefined;
  const configuredCharm = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredCharm : undefined;
  const configuredCarnelian = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredCarnelian : undefined;
  const configuredArcana = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredArcana : undefined;
  const configuredArmor = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredArmor : undefined;
  const configuredEpaulet = slotId ? equipmentStore.getConfiguredEquipment(slotId) as Epaulet : undefined;
  const configuredVehicle = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredVehicle : undefined;
  const configuredEarring = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredEarring : undefined;
  const configuredAmulet = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredAmulet : undefined;
  const configuredBracelet = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredBracelet : undefined;
  const configuredBrooch = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredBrooch : undefined;
  const configuredTalisman = slotId ? equipmentStore.getConfiguredEquipment(slotId) as ConfiguredTalisman : undefined;
  
  // Initialize the equipment system when the component mounts
  useEffect(() => {
    equipmentStore.initializeSystem();
  }, [equipmentStore]);
  
  if (!isOpen) {
    return null;
  }
  
  const handleWeaponSelect = (weapon: Weapon) => {
    setTimeout(() => {
      setSelectedEquipment(weapon as BaseEquipment);
      setIsEquipmentUpgradeModalOpen(true);
    }, 50);
  };
  
  const handleCloseEquipmentUpgradeModal = () => {
    setIsEquipmentUpgradeModalOpen(false);
    setSelectedEquipment(undefined);
  };
  
  const handleSaveEquipmentConfiguration = (configuredEquipment: ConfiguredEquipment) => {
    // Save the configured equipment to the store
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredEquipment as AnyEquipmentType);
    }
    // Close both modals to return to equipment system UI
    setIsEquipmentUpgradeModalOpen(false);
    setSelectedEquipment(undefined);
    onClose();
  };
  
  const handleRingSelect = (ring: Ring) => {
    // Save the ring directly to the store (no upgrades needed) and close the modal
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, ring);
      // Immediately close the modal after selection
      onClose();
    }
  };
  

  
  const handleBeltSelect = (belt: Belt) => {
    // First update the selected belt
    setSelectedBelt(belt);
    // Close the equipment selector modal first
    setTimeout(() => {
      // Then open the belt upgrade modal after a short delay
      setIsBeltModalOpen(true);
    }, 50);
  };
  
  const handleCloseBeltModal = () => {
    setIsBeltModalOpen(false);
  };
  
  const handleSaveBeltConfiguration = (configuredBelt: ConfiguredItem) => {
    // Save the configured belt to the store
    if (slotId) {
      // Ensure the item passed is compatible with what setConfiguredBelt expects.
      // If setConfiguredBelt expects a specific Belt type with currentLevel and totalStats,
      // ConfiguredItem should match this structure.
      equipmentStore.setConfiguredEquipment(slotId, configuredBelt as Belt & { currentLevel: number; totalStats: Record<string, number> });
    }
    // Close both modals to return to equipment system UI
    setIsBeltModalOpen(false);
    onClose();
  };
  


  // Charm handlers
  const handleCharmSelect = (charm: Charm) => {
    setSelectedCharm(charm);
    setTimeout(() => {
      setIsCharmModalOpen(true);
    }, 50);
  };

  const handleCloseCharmModal = () => {
    setIsCharmModalOpen(false);
  };

  const handleSaveCharmConfiguration = (configuredCharm: ConfiguredCharm) => {
    // Save the configured charm to the store
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredCharm);
    }
    // Close both modals to return to equipment system UI
    setIsCharmModalOpen(false);
    onClose();
  };



  // Carnelian handlers
  const handleCarnelianSelect = (carnelian: Carnelian) => {
    setSelectedCarnelian(carnelian);
    setTimeout(() => {
      setIsCarnelianModalOpen(true);
    }, 50);
  };

  const handleCloseCarnelianModal = () => {
    setIsCarnelianModalOpen(false);
  };

  const handleSaveCarnelianConfiguration = (configuredItem: ConfiguredItem) => {
    // Save the configured carnelian to the store
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredItem as Carnelian & { currentLevel: number; totalStats: Record<string, number> });
    }
    // Close both modals to return to equipment system UI
    setIsCarnelianModalOpen(false);
    onClose();
  };



  // Arcana handlers
  const handleArcanaSelect = (arcana: Arcana) => {
    setSelectedArcana(arcana);
    setTimeout(() => {
      setIsArcanaModalOpen(true);
    }, 50);
  };

  const handleCloseArcanaModal = () => {
    setIsArcanaModalOpen(false);
  };

  const handleSaveArcanaConfiguration = (configuredItem: ConfiguredItem) => {
    // Save the configured arcana to the store
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredItem as Arcana & { currentLevel: number; totalStats: Record<string, number> });
    }
    // Close both modals to return to equipment system UI
    setIsArcanaModalOpen(false);
    onClose();
  };



  // Armor handlers
  const handleArmorSelect = (armor: Armor) => {
    setTimeout(() => {
      setSelectedEquipment(armor as BaseEquipment);
      setIsEquipmentUpgradeModalOpen(true);
    }, 50);
  };

  
  // Epaulet handlers
  const handleEpauletSelect = (epaulet: Epaulet) => {
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, epaulet);
      onClose();
    }
  };


  
  // Vehicle handlers
  const handleVehicleSelect = (vehicle: Vehicle) => {
    setTimeout(() => {
      setSelectedEquipment(vehicle as BaseEquipment);
      setIsEquipmentUpgradeModalOpen(true);
    }, 50);
  };



  // Earring handlers
  const handleEarringSelect = (earring: Earring) => {
    setSelectedEarring(earring);
    setTimeout(() => {
      setIsEarringModalOpen(true);
    }, 50);
  };

  const handleSaveEarringConfiguration = (configuredEarring: ConfiguredEarring) => {
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredEarring);
    }
    setIsEarringModalOpen(false);
    onClose();
  };



  // Amulet handlers
  const handleAmuletSelect = (amulet: Amulet) => {
    setSelectedAmulet(amulet);
    setTimeout(() => {
      setIsAmuletModalOpen(true);
    }, 50);
  };

  const handleSaveAmuletConfiguration = (configuredAmulet: ConfiguredAmulet) => {
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredAmulet);
    }
    setIsAmuletModalOpen(false);
    onClose();
  };



  // Bracelet handlers
  const handleBraceletSelect = (bracelet: Bracelet) => {
    setSelectedBracelet(bracelet);
    setTimeout(() => {
      setIsBraceletModalOpen(true);
    }, 50);
  };

  const handleSaveBraceletConfiguration = (configuredBracelet: ConfiguredBracelet) => {
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredBracelet);
    }
    setIsBraceletModalOpen(false);
    onClose();
  };

  // Brooch handlers
  const handleBroochSelect = (brooch: Brooch) => {
    setSelectedBrooch(brooch);
    setTimeout(() => {
      setIsBroochModalOpen(true);
    }, 50);
  };

  const handleSaveBroochConfiguration = (configuredBrooch: ConfiguredBrooch) => {
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredBrooch);
    }
    setIsBroochModalOpen(false);
    onClose();
  };

  // Talisman handlers
  const handleTalismanSelect = (talisman: Talisman) => {
    setSelectedTalisman(talisman);
    setTimeout(() => {
      setIsTalismanModalOpen(true);
    }, 50);
  };

  const handleCloseTalismanModal = () => {
    setIsTalismanModalOpen(false);
  };

  const handleSaveTalismanConfiguration = (configuredItem: ConfiguredItem) => {
    // Save the configured talisman to the store
    if (slotId) {
      equipmentStore.setConfiguredEquipment(slotId, configuredItem as Talisman & { currentLevel: number; totalStats: Record<string, number> });
    }
    // Close both modals to return to equipment system UI
    setIsTalismanModalOpen(false);
    onClose();
  };

  // Convert technical slot IDs to user-friendly names
  const getSlotDisplayName = (slotId: string | undefined): string => {
    if (!slotId) return 'Unknown';
    
    if (slotId.startsWith('weapon-')) return 'Weapon';
    if (slotId.startsWith('ring-')) return 'Ring';
    if (slotId.startsWith('belt-')) return 'Belt';
    if (slotId === 'charm') return 'Charm';
    if (slotId === 'armor-helmet') return 'Helmet';
    if (slotId === 'armor-body') return 'Body Armor';
    if (slotId === 'armor-boots') return 'Boots';
    if (slotId === 'gloves') return 'Gloves';
    if (slotId === 'carnelian') return 'Carnelian';
    if (slotId === 'arcana-1') return 'Arcana 1';
    if (slotId === 'arcana-2') return 'Arcana 2';
    if (slotId === 'epaulet') return 'Epaulet';
    if (slotId.startsWith('earring-')) return 'Earring';
    if (slotId === 'amulet') return 'Amulet';
    if (slotId.startsWith('bracelet-')) return 'Bracelet';
    if (slotId === 'brooch') return 'Brooch';
    if (slotId === 'talisman') return 'Talisman';
    if (slotId === 'bike') return 'Vehicle';
    
    return slotId; // Fallback to original if no match
  };

  // Unified remove handler for all equipment types
  const handleRemoveEquipment = () => {
    if (!slotId) return;

    // Use the generic remove method for any equipment type
    equipmentStore.removeConfiguredEquipment(slotId);
    
    // Clear the appropriate selected state based on slot ID
    if (slotId.startsWith('belt-')) {
      setSelectedBelt(undefined);
    } else if (slotId === 'charm') {
      setSelectedCharm(undefined);
    } else if (slotId === 'carnelian') {
      setSelectedCarnelian(undefined);
    } else if (slotId === 'arcana-1' || slotId === 'arcana-2') {
      setSelectedArcana(undefined);
    } else if (slotId.startsWith('earring-')) {
      setSelectedEarring(undefined);
    } else if (slotId === 'amulet') {
      setSelectedAmulet(undefined);
    } else if (slotId.startsWith('bracelet-')) {
      setSelectedBracelet(undefined);
    } else if (slotId === 'brooch') {
      setSelectedBrooch(undefined);
    } else if (slotId === 'talisman') {
      setSelectedTalisman(undefined);
    }
    
    onClose(); // Always close modal after removing
  };

  const handleEquipmentSelect = (equipment: AllEquipmentTypes) => {
    if (isCharm(equipment)) {
      // It's a charm
      handleCharmSelect(equipment as Charm);
    } else if (isVehicle(equipment)) {
      // It's a vehicle
      handleVehicleSelect(equipment as Vehicle);
    } else if ('maxExtremeLevel' in equipment && equipment.type !== 'armor') {
      // It's a weapon
      handleWeaponSelect(equipment as Weapon);
    } else if ('maxBaseLevel' in equipment && equipment.type === 'carnelian') {
      // It's a carnelian
      handleCarnelianSelect(equipment as Carnelian);
    } else if ('maxBaseLevel' in equipment && equipment.type === 'arcana') {
      // It's an arcana
      handleArcanaSelect(equipment as Arcana);
    } else if (isTalisman(equipment)) {
      // It's a talisman
      handleTalismanSelect(equipment as Talisman);
    } else if ('maxBaseLevel' in equipment) {
      // It's a belt
      handleBeltSelect(equipment as Belt);
    } else if ('maxExtremeLevel' in equipment && equipment.type === 'armor') {
      // It's an armor
      handleArmorSelect(equipment as Armor);
    } else if ('type' in equipment && equipment.type === 'accessory' && 'subtype' in equipment && equipment.subtype === 'epaulet') {
      // It's an epaulet
      handleEpauletSelect(equipment as Epaulet);
    } else if ('type' in equipment && equipment.type === 'earring') {
      // It's an earring
      handleEarringSelect(equipment as Earring);
    } else if ('type' in equipment && equipment.type === 'amulet') {
      // It's an amulet
      handleAmuletSelect(equipment as Amulet);
    } else if ('type' in equipment && equipment.type === 'bracelet') {
      // It's a bracelet
      handleBraceletSelect(equipment as Bracelet);
    } else if ('type' in equipment && equipment.type === 'brooch') {
      // It's a brooch
      handleBroochSelect(equipment as Brooch);
    } else {
      // It's a ring
      handleRingSelect(equipment as Ring);
    }
  };
  
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4">
      {/* Only show main modal content when no upgrade modals are open */}
      {!isEquipmentUpgradeModalOpen && !isBeltModalOpen && !isCharmModalOpen && !isCarnelianModalOpen && !isArcanaModalOpen && !isEarringModalOpen && !isAmuletModalOpen && !isBraceletModalOpen && !isBroochModalOpen && !isTalismanModalOpen && (
        <div className="glass-panel-dark w-full max-w-2xl lg:max-w-4xl p-6 relative max-h-[90vh] overflow-y-auto dark-scrollbar">
          {/* Compact Header with slot info and controls */}
          <div className="pb-3 mb-4 border-b border-game-gold flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold text-game-gold glow-text-sm">Equipment Slot</h2>
              <p className="text-foreground text-sm mt-1">
                <span className="text-game-highlight font-medium">{getSlotDisplayName(slotId)}</span>
              </p>
            </div>
            <div className="flex items-center space-x-2">
              {/* Always show remove button */}
              <button
                onClick={handleRemoveEquipment}
                className="text-red-400 hover:text-red-300 focus:outline-none p-1 rounded-md hover:bg-red-900/30 transition-colors px-3 py-1.5 text-sm font-medium"
                aria-label="Remove Equipment"
              >
                Remove
              </button>
              <button
                onClick={onClose}
                className="text-gray-400 hover:text-white focus:outline-none p-1 rounded-md hover:bg-gray-700 transition-colors"
                aria-label="Close"
              >
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          </div>
        
        {/* Content */}
        <div className="mb-6">
          
          {/* Show weapons for weapon slots */}
          {(slotId?.startsWith('weapon-')) && 
            <ItemSelectionGrid
              items={availableWeapons}
              selectedItemId={configuredWeapon?.id}
              onItemSelect={handleEquipmentSelect}
              title={selectedClass ? `Available Weapons for ${selectedClass}:` : "Available Weapons:"}
            />
          }
          
          {/* Show rings for ring slots */}
          {(slotId?.startsWith('ring-')) && 
            <ItemSelectionGrid
              items={rings}
              selectedItemId={configuredRing?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Rings:"
            />
          }
          
          {/* Show belts for belt slots */}
          {(slotId?.startsWith('belt-')) && 
            <ItemSelectionGrid
              items={belts}
              selectedItemId={configuredBelt?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Belts:"
            />
          }
          
          {/* Show charms for charm slot */}
          {(slotId === 'charm') && 
            <ItemSelectionGrid
              items={charms}
              selectedItemId={configuredCharm?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Charms:"
            />
          }
          
          {/* Show armors for armor slots - filter by correct type and class compatibility */}
          {(slotId?.startsWith('armor-') || slotId === 'gloves') && 
            <ItemSelectionGrid
              items={
                // Filter armors based on the slot type and class compatibility
                (() => {
                  let filteredArmors = armors;
                  
                  // First filter by slot type
                  if (slotId === 'armor-helmet') {
                    filteredArmors = armors.filter(armor => armor.subtype === 'helmet');
                  } else if (slotId === 'armor-boots') {
                    filteredArmors = armors.filter(armor => armor.subtype === 'shoes');
                  } else if (slotId === 'armor-body') {
                    filteredArmors = armors.filter(armor => armor.subtype === 'body');
                  } else if (slotId === 'gloves') {
                    filteredArmors = armors.filter(armor => armor.subtype === 'gauntlet');
                  }
                  
                  // Then filter by class compatibility (for any armor with weight property)
                  filteredArmors = filterArmorsByClass(filteredArmors, selectedClass);
                  
                  return filteredArmors;
                })()
              }
              selectedItemId={configuredArmor?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Armors:"
            />
          }
          
          {/* Show carnelians for carnelian slot */}
          {slotId === 'carnelian' && 
            <ItemSelectionGrid
              items={carnelians}
              selectedItemId={configuredCarnelian?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Carnelians:"
            />
          }
          
          {/* Show arcanas for arcana slot */}
          {(slotId === 'arcana-1' || slotId === 'arcana-2') && 
            <ItemSelectionGrid
              items={arcanas}
              selectedItemId={configuredArcana?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Arcanas:"
            />
          }
          
          {/* Show epaulets for epaulet slot */}
          {slotId === 'epaulet' && 
            <ItemSelectionGrid
              items={epaulets}
              selectedItemId={configuredEpaulet?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Epaulets:"
            />
          }
          
          {/* Show earrings for earring slots */}
          {(slotId?.startsWith('earring-')) && 
            <ItemSelectionGrid
              items={earrings}
              selectedItemId={configuredEarring?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Earrings:"
            />
          }
          
          {/* Show amulets for amulet slots */}
          {(slotId === 'amulet') && 
            <ItemSelectionGrid
              items={amulets}
              selectedItemId={configuredAmulet?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Amulets:"
            />
          }
          
          {/* Show bracelets for bracelet slots */}
          {(slotId?.startsWith('bracelet-')) && 
            <ItemSelectionGrid
              items={bracelets}
              selectedItemId={configuredBracelet?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Bracelets:"
            />
          }
          
          {/* Show brooches for brooch slot */}
          {(slotId === 'brooch') && 
            <ItemSelectionGrid
              items={brooches}
              selectedItemId={configuredBrooch?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Brooches:"
            />
          }
          
          {/* Show talismans for talisman slot */}
          {(slotId === 'talisman') && 
            <ItemSelectionGrid
              items={talismans}
              selectedItemId={configuredTalisman?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Talismans:"
            />
          }
          
          {/* Show vehicles for bike slot */}
          {slotId === 'bike' && 
            <ItemSelectionGrid
              items={vehicles}
              selectedItemId={configuredVehicle?.id}
              onItemSelect={handleEquipmentSelect}
              title="Available Vehicles:"
            />
          }
          
          {/* Default message for other slots */}
          {!slotId?.startsWith('weapon-') && !slotId?.startsWith('ring-') && !slotId?.startsWith('belt-') && !slotId?.startsWith('armor-') && !slotId?.startsWith('earring-') && slotId !== 'amulet' && !slotId?.startsWith('bracelet-') && slotId !== 'brooch' && slotId !== 'talisman' && slotId !== 'charm' && slotId !== 'carnelian' && slotId !== 'arcana-1' && slotId !== 'arcana-2' && slotId !== 'epaulet' && slotId !== 'bike' && slotId !== 'gloves' && (
            <div className="bg-theme-darker p-3 rounded-md border border-border-dark mt-3">
              <p className="text-sm text-gray-300">This slot type is not yet implemented. Coming soon!</p>
            </div>
          )}
        </div>
        
        {/* Footer with action buttons */}
        <div className="flex justify-end space-x-3 pt-4 border-t border-border-dark">
          <button 
            onClick={onClose} 
            className="game-button px-6 py-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-game-highlight focus:ring-opacity-50 transition-all hover:scale-105"
          >
            Close
          </button>
        </div>
        
        </div>
      )}
        
        {/* Unified Equipment Upgrade Modal */}
        {isEquipmentUpgradeModalOpen && selectedEquipment && (
          <EquipmentUpgradeModal 
            isOpen={isEquipmentUpgradeModalOpen} 
            onClose={handleCloseEquipmentUpgradeModal} 
            equipment={selectedEquipment as Equipment}
            configuredEquipment={
               ('maxExtremeLevel' in selectedEquipment && selectedEquipment.material === 'weapon') 
                 ? configuredWeapon 
                 : selectedEquipment.type === 'armor' 
                   ? configuredArmor 
                   : selectedEquipment.type === 'vehicle'
                     ? configuredVehicle
                     : undefined
             }
            onSaveConfiguration={handleSaveEquipmentConfiguration}
          />
        )}
        
        {/* Belt Upgrade Modal (now GenericItemUpgradeModal) */}
        <GenericItemUpgradeModal
          itemType="Belt"
          isOpen={isBeltModalOpen}
          onClose={handleCloseBeltModal}
          getAllItems={getAllBelts}
          createConfiguredItem={createConfiguredBelt as (itemId: string, level: number) => ConfiguredItem | undefined}
          calculateItemStats={calculateBeltStats as (item: BaseItem, level: number) => Record<string, number>}
          onSelectItem={handleSaveBeltConfiguration}
          onRemoveItem={handleRemoveEquipment}
          currentSelectedItem={selectedBelt as BaseItem | undefined} // Cast selectedBelt to BaseItem
          tooltipComponent={GeneralItemTooltipWrapper}
        />
        
        {/* Charm Upgrade Modal (now GenericItemUpgradeModal) */}
        <GenericItemUpgradeModal
          itemType="Charm"
          getAllItems={getAllCharmsAsBaseItems}
          createConfiguredItem={createConfiguredCharmFromId}
          calculateItemStats={calculateCharmStatsAsRecord}
          onSelectItem={(item) => handleSaveCharmConfiguration(item as unknown as ConfiguredCharm)}
          onRemoveItem={handleRemoveEquipment}
          currentSelectedItem={selectedCharm}
          isOpen={isCharmModalOpen}
          onClose={handleCloseCharmModal}
          tooltipComponent={CharmTooltipWrapper}
        />
        
        {/* Carnelian Upgrade Modal (now GenericItemUpgradeModal) */}
        <GenericItemUpgradeModal
          itemType="Carnelian"
          isOpen={isCarnelianModalOpen}
          onClose={handleCloseCarnelianModal}
          getAllItems={getAllCarnelians}
          createConfiguredItem={createConfiguredCarnelian as (itemId: string, level: number) => ConfiguredItem | undefined}
          calculateItemStats={calculateCarnelianStats as (item: BaseItem, level: number) => Record<string, number>}
          onSelectItem={handleSaveCarnelianConfiguration}
          onRemoveItem={handleRemoveEquipment}
          currentSelectedItem={selectedCarnelian as BaseItem | undefined} // Cast selectedCarnelian to BaseItem
          tooltipComponent={GeneralItemTooltipWrapper}
        />
        
        {/* Arcana Upgrade Modal (now GenericItemUpgradeModal) */}
        <GenericItemUpgradeModal
          itemType="Arcana"
          isOpen={isArcanaModalOpen}
          onClose={handleCloseArcanaModal}
          getAllItems={getAllArcanas}
          createConfiguredItem={createConfiguredArcana as (itemId: string, level: number) => ConfiguredItem | undefined}
          calculateItemStats={calculateArcanaStats as (item: BaseItem, level: number) => Record<string, number>}
          onSelectItem={handleSaveArcanaConfiguration}
          onRemoveItem={handleRemoveEquipment}
          currentSelectedItem={selectedArcana as BaseItem | undefined} // Cast selectedArcana to BaseItem
          tooltipComponent={GeneralItemTooltipWrapper}
        />
        
        {/* Earring Upgrade Modal */}
        <EarringUpgradeModal 
          isOpen={isEarringModalOpen} 
          onClose={() => setIsEarringModalOpen(false)} 
          onSelectEarring={handleSaveEarringConfiguration}
          onRemoveEarring={handleRemoveEquipment}
          currentEarring={selectedEarring?.id === configuredEarring?.id ? configuredEarring : selectedEarring}
        />
        
        {/* Amulet Upgrade Modal */}
        <AmuletUpgradeModal 
          isOpen={isAmuletModalOpen} 
          onClose={() => setIsAmuletModalOpen(false)} 
          onSelectAmulet={handleSaveAmuletConfiguration}
          onRemoveAmulet={handleRemoveEquipment}
          currentAmulet={selectedAmulet?.id === configuredAmulet?.id ? configuredAmulet : selectedAmulet}
        />
        
        {/* Bracelet Upgrade Modal */}
        <BraceletUpgradeModal 
          isOpen={isBraceletModalOpen} 
          onClose={() => setIsBraceletModalOpen(false)} 
          onSelectBracelet={handleSaveBraceletConfiguration}
          onRemoveBracelet={handleRemoveEquipment}
          currentBracelet={selectedBracelet?.id === configuredBracelet?.id ? configuredBracelet : selectedBracelet}
        />
        
        {/* Brooch Upgrade Modal */}
        <BroochUpgradeModal 
          isOpen={isBroochModalOpen} 
          onClose={() => setIsBroochModalOpen(false)} 
          onSelectBrooch={handleSaveBroochConfiguration}
          onRemoveBrooch={handleRemoveEquipment}
          currentBrooch={selectedBrooch?.id === configuredBrooch?.id ? configuredBrooch : selectedBrooch}
        />

        {/* Talisman Upgrade Modal */}
        <GenericItemUpgradeModal
          itemType="Talisman"
          isOpen={isTalismanModalOpen}
          onClose={handleCloseTalismanModal}
          getAllItems={getAllTalismans}
          createConfiguredItem={createConfiguredTalisman as (itemId: string, level: number) => ConfiguredItem | undefined}
          calculateItemStats={calculateTalismanStats as (item: BaseItem, level: number) => Record<string, number>}
          onSelectItem={handleSaveTalismanConfiguration}
          onRemoveItem={handleRemoveEquipment}
          currentSelectedItem={selectedTalisman as BaseItem | undefined}
          tooltipComponent={TalismanTooltipWrapper}
        />

    </div>
  );
};

export default EquipmentSlotModal;