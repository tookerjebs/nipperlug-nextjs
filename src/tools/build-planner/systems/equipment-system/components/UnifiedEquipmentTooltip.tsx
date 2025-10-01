// UnifiedEquipmentTooltip.tsx
// A unified tooltip component that handles weapons, rings, belts, and charms with conditional rendering

import React, { useRef, useEffect, useState } from 'react';
import { ConfiguredWeapon, ConfiguredVehicle, ConfiguredArmor } from '../types/base-equipment';
import { Ring } from '../data/rings/rings-data';
import { Belt } from '../data/belts/belts-data';
import { ConfiguredCharm } from '../data/charms/charms-data';
import { ConfiguredCarnelian } from '../data/carnelians/carnelians-data';
import { ConfiguredArcana } from '../data/arcanas/arcanas-data';
import { Epaulet } from '../data/epaulets/epaulets-data';
import { ConfiguredEarring } from './upgrade-modals/EarringUpgradeModal';
import { ConfiguredAmulet } from './upgrade-modals/AmuletUpgradeModal';
import { ConfiguredBracelet } from './upgrade-modals/BraceletUpgradeModal';
import { ConfiguredBrooch } from './upgrade-modals/BroochUpgradeModal';
import { ConfiguredTalisman } from '../data/talismans/talismans-data';
import { isVehicle as isVehicleItem } from '../data/vehicles/vehicle-types';
import { isCharm as isCharmItem } from '../data/charms/charms-data';
import { slotOptions, getEpicOptionSuffix, getEpicOptionStatValue } from '../data/weapons/epic-options';
import { getStatInfo, formatStatValue } from '@/tools/build-planner/data/stats-config';
import RingTooltip from './tooltips/RingTooltip';
import EpauletTooltip from './tooltips/EpauletTooltip';
import GeneralItemTooltip from './tooltips/GeneralItemTooltip';
import UnifiedEquipmentTooltipComponent from './tooltips/UnifiedEquipmentTooltip';
import EarringTooltip from './tooltips/EarringTooltip';
import AmuletTooltip from './tooltips/AmuletTooltip';
import BraceletTooltip from './tooltips/BraceletTooltip';
import BroochTooltip from './tooltips/BroochTooltip';
import CharmTooltip from './tooltips/CharmTooltip';
import TalismanTooltip from './tooltips/TalismanTooltip';

// Union type for all equipment items
export type EquipmentItem = ConfiguredWeapon | Ring | Belt | ConfiguredCharm | ConfiguredCarnelian | ConfiguredArcana | ConfiguredArmor | Epaulet | ConfiguredVehicle | ConfiguredEarring | ConfiguredAmulet | ConfiguredBracelet | ConfiguredBrooch | ConfiguredTalisman;

// Helper function to determine item type
export const isWeapon = (item: EquipmentItem): item is ConfiguredWeapon => {
  return 'slots' in item && 'baseUpgradeLevel' in item && 'type' in item && item.type !== 'armor' && item.type !== 'vehicle';
};

export const isRing = (item: EquipmentItem): item is Ring => {
  return 'type' in item && item.type === 'ring';
};

export const isBelt = (item: EquipmentItem): item is Belt => {
  return 'type' in item && item.type === 'belt' && 'maxBaseLevel' in item;
};

export const isCharm = (item: EquipmentItem): item is ConfiguredCharm => {
  return isCharmItem(item);
};

export const isCarnelian = (item: EquipmentItem): item is ConfiguredCarnelian => {
  return 'type' in item && item.type === 'carnelian' && 'maxBaseLevel' in item;
};

export const isEpaulet = (item: EquipmentItem): item is Epaulet => {
  return 'type' in item && item.type === 'accessory' && 'subtype' in item && item.subtype === 'epaulet';
};

export const isArcana = (item: EquipmentItem): item is ConfiguredArcana => {
  return 'type' in item && item.type === 'arcana' && 'maxBaseLevel' in item;
};

export const isVehicle = (item: EquipmentItem): item is ConfiguredVehicle => {
  return isVehicleItem(item);
};

export const isArmor = (item: EquipmentItem): item is ConfiguredArmor => {
  return 'slots' in item && 'baseUpgradeLevel' in item && 'type' in item && item.type === 'armor';
};

export const isEarring = (item: EquipmentItem): item is ConfiguredEarring => {
  return 'type' in item && item.type === 'earring';
};

export const isAmulet = (item: EquipmentItem): item is ConfiguredAmulet => {
  return 'type' in item && item.type === 'amulet';
};

export const isBracelet = (item: EquipmentItem): item is ConfiguredBracelet => {
  return 'type' in item && item.type === 'bracelet';
};

export const isBrooch = (item: EquipmentItem): item is ConfiguredBrooch => {
  return 'type' in item && item.type === 'brooch';
};

export const isTalisman = (item: EquipmentItem): item is ConfiguredTalisman => {
  return 'type' in item && item.type === 'talisman';
};

interface UnifiedEquipmentTooltipProps {
  item: EquipmentItem;
  visible: boolean;
  x: number;
  y: number;
  slotX?: number;
  slotY?: number;
  width?: number;
  height?: number;
  mouseX?: number;
  mouseY?: number;
}

const UnifiedEquipmentTooltip: React.FC<UnifiedEquipmentTooltipProps> = ({ 
  item, 
  visible, 
  x, 
  y, 
  slotX, 
  slotY, 
  width, 
  height,
  mouseX,
  mouseY
}) => {
  const tooltipRef = useRef<HTMLDivElement>(null);
  const [tooltipDimensions, setTooltipDimensions] = useState({ width: 250, height: 300 });

  // Measure tooltip dimensions after render (only when needed)
  useEffect(() => {
    if (tooltipRef.current) {
      const rect = tooltipRef.current.getBoundingClientRect();
      // Only update if dimensions actually changed (avoid unnecessary re-renders)
      setTooltipDimensions(prev => {
        if (prev.width !== rect.width || prev.height !== rect.height) {
          return { width: rect.width, height: rect.height };
        }
        return prev;
      });
    }
  }, [item]); // Re-measure when item changes

  // Calculate intelligent tooltip positioning with simplified logic
  const calculateTooltipPosition = () => {
    // Use mouse position if available, otherwise use slot center as fallback
    const referenceX = mouseX !== undefined ? mouseX : 
                      (slotX !== undefined && width !== undefined) ? slotX + width / 2 : 
                      x + 20; // Final fallback to old x position
    
    const referenceY = mouseY !== undefined ? mouseY : 
                      (slotY !== undefined && height !== undefined) ? slotY + height / 2 : 
                      y - 10; // Final fallback to old y position

    const tooltipWidth = tooltipDimensions.width;
    const tooltipHeight = tooltipDimensions.height;
    const margin = 15; // Distance from reference point
    
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;
    
    // Determine best position based on available space
    const spaceRight = viewportWidth - referenceX;
    const spaceLeft = referenceX;
    const spaceBottom = viewportHeight - referenceY;
    const spaceTop = referenceY;
    
    let finalX, finalY;
    
    // Horizontal positioning: prefer right, fall back to left if not enough space
    if (spaceRight >= tooltipWidth + margin) {
      finalX = referenceX + margin;
    } else if (spaceLeft >= tooltipWidth + margin) {
      finalX = referenceX - tooltipWidth - margin;
    } else {
      // Not enough space on either side, position to fit in viewport
      finalX = Math.max(10, Math.min(referenceX - tooltipWidth / 2, viewportWidth - tooltipWidth - 10));
    }
    
    // Vertical positioning: prefer centered, adjust if near edges
    if (spaceTop >= tooltipHeight / 2 && spaceBottom >= tooltipHeight / 2) {
      // Enough space above and below, center vertically
      finalY = referenceY - tooltipHeight / 2;
    } else if (spaceBottom >= tooltipHeight + margin) {
      // Not enough space to center, but enough below
      finalY = referenceY + margin;
    } else if (spaceTop >= tooltipHeight + margin) {
      // Not enough space below, but enough above
      finalY = referenceY - tooltipHeight - margin;
    } else {
      // Not enough space above or below, fit in viewport
      finalY = Math.max(10, Math.min(referenceY - tooltipHeight / 2, viewportHeight - tooltipHeight - 10));
    }
    
    return {
      left: `${finalX}px`,
      top: `${finalY}px`
    };
  };
  if (!visible || !item) return null;

  // Format stat value with + sign for positive values and % for percentage stats
  const formatStatValueWithSign = (statId: string, value: number | undefined) => {
    if (value === undefined) return '';
    const formattedValue = formatStatValue(statId, value);
    return value >= 0 ? `+ ${formattedValue}` : `- ${Math.abs(value)}${formattedValue.includes('%') ? '%' : ''}`;
  };

  // Format stat name for display
  const formatStatName = (stat: string) => {
    const statInfo = getStatInfo(stat);
    return statInfo?.name || stat;
  };

  // Render weapon tooltip content using the unified component
  const renderWeaponTooltip = (weapon: ConfiguredWeapon) => (
    <UnifiedEquipmentTooltipComponent
      equipment={weapon}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );

  // Render ring tooltip content using the separated component
  const renderRingTooltip = (ring: Ring) => {
    return (
      <RingTooltip 
        ring={ring} 
        formatStatName={formatStatName}
        formatStatValueWithSign={formatStatValueWithSign}
      />
    );
  };

  // Render belt tooltip content using the general component
  const renderBeltTooltip = (belt: Belt) => (
    <GeneralItemTooltip
      item={belt}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );

  // Render charm tooltip content using the separated component
  const renderCharmTooltip = (charm: ConfiguredCharm) => (
    <CharmTooltip
      charm={charm}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render epaulet tooltip content using the separated component
  const renderEpauletTooltip = (epaulet: Epaulet) => (
    <EpauletTooltip
      epaulet={epaulet}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render earring tooltip content using the separated component
  const renderEarringTooltip = (earring: ConfiguredEarring) => (
    <EarringTooltip
      earring={earring}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render amulet tooltip content using the separated component
  const renderAmuletTooltip = (amulet: ConfiguredAmulet) => (
    <AmuletTooltip
      amulet={amulet}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render bracelet tooltip content using the separated component
  const renderBraceletTooltip = (bracelet: ConfiguredBracelet) => (
    <BraceletTooltip
      bracelet={bracelet}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render brooch tooltip content using the separated component
  const renderBroochTooltip = (brooch: ConfiguredBrooch) => (
    <BroochTooltip
      brooch={brooch}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render talisman tooltip content using the separated component
  const renderTalismanTooltip = (talisman: ConfiguredTalisman) => (
    <TalismanTooltip
      item={talisman as any}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render armor tooltip content using the unified component
  const renderArmorTooltip = (armor: ConfiguredArmor) => (
    <UnifiedEquipmentTooltipComponent
      equipment={armor}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );

  // Render carnelian tooltip content using the general component
  const renderCarnelianTooltip = (carnelian: ConfiguredCarnelian) => (
    <GeneralItemTooltip
      item={carnelian}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );
  
  // Render arcana tooltip content using the general component
  const renderArcanaTooltip = (arcana: ConfiguredArcana) => (
    <GeneralItemTooltip
      item={arcana}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );

  // Render vehicle tooltip content using the unified component
  const renderVehicleTooltip = (vehicle: ConfiguredVehicle) => (
    <UnifiedEquipmentTooltipComponent
      equipment={vehicle}
      formatStatName={formatStatName}
      formatStatValueWithSign={formatStatValueWithSign}
    />
  );

  const tooltipPosition = calculateTooltipPosition();

  return (
    <div 
      ref={tooltipRef}
      className="fixed glass-panel-dark z-50 p-3 text-sm min-w-[250px] bg-opacity-90 pointer-events-none"
      style={{
        ...tooltipPosition,
        boxShadow: '0 4px 8px rgba(0, 0, 0, 0.5)',
        borderColor: 'rgba(80, 80, 100, 0.4)',
      }}
    >
      {isWeapon(item) && renderWeaponTooltip(item)}
      {isVehicle(item) && renderVehicleTooltip(item)}
      {isRing(item) && renderRingTooltip(item)}
      {isBelt(item) && renderBeltTooltip(item)}
      {isCharm(item) && renderCharmTooltip(item)}
      {isCarnelian(item) && renderCarnelianTooltip(item)}
      {isArcana(item) && renderArcanaTooltip(item)}
      {isArmor(item) && renderArmorTooltip(item)}
      {isEpaulet(item) && renderEpauletTooltip(item)}
      {isEarring(item) && renderEarringTooltip(item)}
      {isAmulet(item) && renderAmuletTooltip(item)}
      {isBracelet(item) && renderBraceletTooltip(item)}
      {isBrooch(item) && renderBroochTooltip(item)}
      {isTalisman(item) && renderTalismanTooltip(item)}
    </div>
  );
};

export default UnifiedEquipmentTooltip;