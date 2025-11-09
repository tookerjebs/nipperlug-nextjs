'use client';

import { 
  PROGRESSION_SYSTEMS, 
  ProgressionSystem, 
  SYSTEM_CATEGORIES, 
  getSystemsGroupedByCategory 
} from '@/tools/build-planner/data/systems-config';
import { ChevronRight, ChevronDown } from 'lucide-react';
import { useState } from 'react';

interface SystemsSidebarProps {
  activeSystem: string;
  onSystemChange: (systemId: string) => void;
}

export default function SystemsSidebar({ activeSystem, onSystemChange }: SystemsSidebarProps) {
  // Track which categories are expanded (basics, progression, and custom expanded by default)
  const [expandedCategories, setExpandedCategories] = useState<Set<string>>(new Set(['basics', 'progression', 'custom']));
  
  const handleSystemClick = (systemId: string) => {
    // Check if system is coming soon
    const comingSoonSystems = ['platinum-merit', 'battle-configuration', 'class-passive-skills'];
    if (comingSoonSystems.includes(systemId)) {
      // Still allow navigation to show the coming soon message in main content
      onSystemChange(systemId);
      return;
    }
    onSystemChange(systemId);
  };

  const toggleCategory = (categoryId: string) => {
    const newExpanded = new Set(expandedCategories);
    if (newExpanded.has(categoryId)) {
      newExpanded.delete(categoryId);
    } else {
      newExpanded.add(categoryId);
    }
    setExpandedCategories(newExpanded);
  };

  const renderSystemItem = (system: ProgressionSystem) => {
    const isActive = activeSystem === system.id;
    const comingSoonSystems = ['platinum-merit', 'battle-configuration', 'class-passive-skills'];
    const isComingSoon = comingSoonSystems.includes(system.id);
    
    return (
      <button
        key={system.id}
        onClick={() => handleSystemClick(system.id)}
        className={`
          w-full flex items-center p-2 sm:p-3 rounded-lg transition-all duration-200
          ${isActive 
            ? 'glass-panel border-game-highlight glow-border text-white' 
            : isComingSoon
              ? 'glass-panel-light text-gray-400 hover:border-orange-400/50 hover:text-orange-300'
              : 'glass-panel-light text-gray-300 hover:border-border-light hover:text-white'
          }
        `}
      >
        <div className="flex items-center">
          <div className="text-left">
            <div className="font-medium flex items-center gap-1 sm:gap-2 text-sm sm:text-base">
              {system.name}
              {system.badge && (
                <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-green-400/20 text-green-400 rounded-full border border-green-400/30">
                  {system.badge}
                </span>
              )}
              {isComingSoon && (
                <span className="text-xs px-1.5 sm:px-2 py-0.5 bg-orange-400/20 text-orange-400 rounded-full border border-orange-400/30">
                  Coming Soon
                </span>
              )}
            </div>
            <div className={`text-xs opacity-75 hidden sm:block ${
              isComingSoon ? 'text-orange-300/70' : ''
            }`}>
              {isComingSoon ? 'This system is not yet available' : system.description}
            </div>
          </div>
        </div>
      </button>
    );
  };

  const groupedSystems = getSystemsGroupedByCategory();

  const renderCategoryHeader = (categoryId: string) => {
    const category = SYSTEM_CATEGORIES[categoryId as keyof typeof SYSTEM_CATEGORIES];
    const isExpanded = expandedCategories.has(categoryId);
    
    return (
      <button
        onClick={() => toggleCategory(categoryId)}
        className="w-full flex items-center justify-between p-2 rounded-lg transition-all duration-200 hover:bg-gray-800/50 cursor-pointer"
      >
        <div className="flex items-center space-x-2">
          <div className={`text-sm font-medium ${category.color}`}>
            {category.name}
          </div>
          <div className="text-xs text-gray-500">
            ({groupedSystems[categoryId]?.length || 0})
          </div>
        </div>
        <div className={`transition-transform duration-200 ${isExpanded ? 'rotate-90' : ''}`}>
          <ChevronRight className="w-3 h-3 text-gray-400" />
        </div>
      </button>
    );
  };

  return (
    <div className="p-2 sm:p-3">
      <h2 className="text-base sm:text-lg font-semibold mb-3 sm:mb-4 text-game-gold glow-text-sm">Build Planner</h2>
      
      <div className="space-y-3">
        {Object.keys(SYSTEM_CATEGORIES).map(categoryId => {
          const systems = groupedSystems[categoryId] || [];
          const isExpanded = expandedCategories.has(categoryId);
          
          return (
            <div key={categoryId} className="space-y-1">
              {renderCategoryHeader(categoryId)}
              
              {isExpanded && (
                <div className="space-y-1">
                  {systems.map(renderSystemItem)}
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}