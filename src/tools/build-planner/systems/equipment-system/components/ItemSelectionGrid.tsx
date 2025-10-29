import React, { useState, useMemo } from 'react';
import { getStatInfo, formatStatValue } from '../../../data/stats-config';
import { Search, X } from 'lucide-react';

// Base interface that all equipment items should implement
interface BaseEquipmentItem {
  id: string;
  name: string;
  imagePath: string;
  grade: string;
  baseStats: any; // Use any to accommodate different stat interfaces
  type?: string;
  material?: string;
  maxBaseLevel?: number;
  maxExtremeLevel?: number;
  hasChaosUpgrade?: boolean;
  isUnique?: boolean;
}

interface ItemSelectionGridProps<T extends BaseEquipmentItem> {
  items: T[];
  selectedItemId?: string;
  onItemSelect: (item: T) => void;
  title: string;
  showSearch?: boolean;
  gridCols?: string; // Tailwind grid classes
  itemSize?: string; // Tailwind size classes for images
  renderCustomStats?: (item: T) => React.ReactNode;
  getItemTooltip?: (item: T) => string;
  // New header props
  slotDisplayName?: string;        // "Weapon", "Ring", etc. - when provided, shows header
  onRemove?: () => void;          // Remove equipment handler
  onClose?: () => void;           // Close modal handler
  showHeader?: boolean;           // Allow disabling header for other use cases
}

// Lightweight type helpers
const hasLevels = (item: BaseEquipmentItem): boolean => 'maxBaseLevel' in item;
const hasChaos = (item: BaseEquipmentItem): boolean => Boolean(item.hasChaosUpgrade);
const isUpgradeable = (item: BaseEquipmentItem): boolean => hasLevels(item) || hasChaos(item);

function ItemSelectionGrid<T extends BaseEquipmentItem>({
  items,
  selectedItemId,
  onItemSelect,
  title,
  showSearch = true,
  gridCols = "grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5",
  itemSize = "w-12 h-12 sm:w-14 sm:h-14",
  renderCustomStats,
  getItemTooltip,
  // New header props
  slotDisplayName,
  onRemove,
  onClose,
  showHeader = true
}: ItemSelectionGridProps<T>) {
  const [searchTerm, setSearchTerm] = useState<string>('');

  // Filter items based on search term
  const filteredItems = useMemo(() => {
    if (!searchTerm.trim()) {
      return items;
    }

    const searchLower = searchTerm.toLowerCase().trim();
    return items.filter(item => {
      // Search by name
      if (item.name.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search by grade
      if (item.grade.toLowerCase().includes(searchLower)) {
        return true;
      }

      // Search by stats
      const statsMatch = Object.keys(item.baseStats).some(statKey => {
        const statInfo = getStatInfo(statKey);
        const statName = statInfo?.name || statKey;
        return statName.toLowerCase().includes(searchLower);
      });

      return statsMatch;
    });
  }, [items, searchTerm]);

  const clearSearch = () => {
    setSearchTerm('');
  };

  // Genius solution: Get essential stats for compact display
  const getEssentialStats = (item: T): Array<[string, any]> => {
    const stats = { ...item.baseStats };
    
    // Remove upgrade info - we don't want to show max upgrades or chaos upgrades for accessories

    // Convert to entries and prioritize important stats
    const entries = Object.entries(stats).filter(([_, value]) => value !== undefined);
    
    // Sort by importance: damage stats first, then defensive, then utility
    const priority = ['attack', 'magicAttack', 'criticalRate', 'criticalDamage', 'hp', 'mp', 'defense'];
    return entries.sort(([a], [b]) => {
      const aIndex = priority.findIndex(p => a.toLowerCase().includes(p.toLowerCase()));
      const bIndex = priority.findIndex(p => b.toLowerCase().includes(p.toLowerCase()));
      return (bIndex === -1 ? 999 : bIndex) - (aIndex === -1 ? 999 : aIndex);
    }).slice(0, 4); // Show max 4 most important stats
  };

  // Clean, lightweight stats renderer
  const renderStats = (item: T) => {
    if (renderCustomStats) return renderCustomStats(item);
    
    const essentialStats = getEssentialStats(item);
    
    return (
      <div className="space-y-1">
        {essentialStats.map(([stat, value]) => {
          const statInfo = getStatInfo(stat);
          const statName = statInfo?.name || stat;
          const formattedValue = formatStatValue(stat, value as number);
          
          return (
            <div key={stat} className="flex justify-between text-xs">
              <span className="text-gray-300 truncate pr-1" title={statName}>
                {statName.length > 12 ? statName.substring(0, 12) + '...' : statName}
              </span>
              <span className="text-game-highlight font-medium">{formattedValue}</span>
            </div>
          );
        })}
      </div>
    );
  };

  // Default tooltip generator
  const getDefaultTooltip = (item: T) => {
    let tooltip = `${item.name} - ${item.grade}`;
    // Remove upgrade information from tooltips for accessories
    return tooltip;
  };

  // Determine if we should show the modal-style header
  const showModalHeader = showHeader && slotDisplayName && (onRemove || onClose);
  
  return (
    <div className={showModalHeader ? "fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50 p-4" : ""}>
      <div className={showModalHeader 
        ? "glass-panel-dark w-full max-w-2xl lg:max-w-4xl p-6 relative max-h-[90vh] overflow-hidden flex flex-col" 
        : "bg-theme-darker p-4 rounded-lg border border-border-dark mt-4"
      }>
        
        {/* Modal Header - Sticky when in modal mode */}
        {showModalHeader && (
          <div className="sticky top-0 z-10 bg-theme-darker pb-3 mb-4 border-b border-game-gold flex justify-between items-center">
            <div className="flex flex-col">
              <h2 className="text-lg sm:text-xl font-bold text-game-gold glow-text-sm">
                Available {slotDisplayName}s
              </h2>
            </div>
            <div className="flex items-center space-x-2">
              {/* Remove button */}
              {onRemove && (
                <button
                  onClick={onRemove}
                  className="text-red-400 hover:text-red-300 focus:outline-none p-1 rounded-md hover:bg-red-900/30 transition-colors px-3 py-1.5 text-sm font-medium"
                  aria-label="Remove Equipment"
                >
                  Remove
                </button>
              )}
              {/* Close button */}
              {onClose && (
                <button
                  onClick={onClose}
                  className="text-gray-400 hover:text-white focus:outline-none p-1 rounded-md hover:bg-gray-700 transition-colors"
                  aria-label="Close"
                >
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </button>
              )}
            </div>
          </div>
        )}

        {/* Content Container - Scrollable when in modal mode */}
        <div className={showModalHeader ? "flex-1 overflow-y-auto dark-scrollbar" : ""}>
          
          {/* Search and Title Section */}
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-4">
            {/* Only show title if not in modal mode (modal has its own header) */}
            {!showModalHeader && (
              <h3 className="text-base font-semibold text-game-gold">{title}</h3>
            )}
            
            {/* Search Bar */}
            {showSearch && (
              <div className={`relative ${showModalHeader ? 'flex-1' : 'flex-1 max-w-md'}`}>
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
                  <input
                    type="text"
                    placeholder="Search equipment..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-10 py-2 bg-theme-dark border border-border-dark rounded-md text-foreground placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-game-gold focus:border-transparent text-sm"
                  />
                  {searchTerm && (
                    <button
                      onClick={clearSearch}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-foreground transition-colors"
                      title="Clear search"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Results count */}
          {showSearch && searchTerm && (
            <div className="mb-3 text-sm text-gray-400">
              Showing {filteredItems.length} of {items.length} items
              {filteredItems.length === 0 && (
                <span className="text-yellow-400 ml-2">- No items match your search</span>
              )}
            </div>
          )}
          
          {/* Genius Grid Solution: Uniform cards with smart content */}
          <div className={`grid ${gridCols} gap-4`}>
            {filteredItems.map((item) => (
              <div
                key={item.id}
                className={`group relative bg-theme-dark rounded-lg border transition-all duration-200 cursor-pointer overflow-hidden
                  ${selectedItemId === item.id 
                    ? 'border-game-highlight shadow-lg shadow-game-highlight/20' 
                    : 'border-border-dark hover:border-game-gold hover:shadow-md hover:shadow-game-gold/10'
                  }`}
                onClick={() => onItemSelect(item)}
                title={getItemTooltip ? getItemTooltip(item) : getDefaultTooltip(item)}
              >
                {/* Header with image and name */}
                <div className="flex flex-col items-center p-3 border-b border-gray-700/30">
                  <img
                    src={item.imagePath}
                    alt={item.name}
                    className="w-10 h-10 object-contain mb-2"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = 'none';
                    }}
                  />
                  <h4 className="text-sm font-medium text-foreground text-center leading-tight" title={item.name}>
                    {item.name}
                  </h4>
                </div>

                {/* Stats section - fixed height for uniformity */}
                <div className="p-3 h-24 flex flex-col justify-center">
                  {renderStats(item)}
                </div>

                {/* Selection indicator */}
                {selectedItemId === item.id && (
                  <div className="absolute top-2 right-2 w-3 h-3 bg-game-highlight rounded-full animate-pulse" />
                )}
              </div>
            ))}
          </div>
          
        </div>
        
        {/* Modal Footer - only show when in modal mode */}
        {showModalHeader && onClose && (
          <div className="flex justify-end space-x-3 pt-4 border-t border-border-dark mt-4">
            <button 
              onClick={onClose} 
              className="game-button px-6 py-3 rounded-md text-sm font-medium focus:outline-none focus:ring-2 focus:ring-game-highlight focus:ring-opacity-50 transition-all hover:scale-105"
            >
              Close
            </button>
          </div>
        )}
        
      </div>
    </div>
  );
}

export default ItemSelectionGrid;
export type { BaseEquipmentItem, ItemSelectionGridProps };