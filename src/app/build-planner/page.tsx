'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import BuildSummary from '@/tools/build-planner/components/main-layout/BuildSummary';
import SystemsSidebar from '@/tools/build-planner/components/main-layout/SystemsSidebar';
import CombatStats from '@/tools/build-planner/components/main-layout/CombatStats';
import { PetSystem } from '@/tools/build-planner/systems/pet';
import HonorMedalSystem from '@/tools/build-planner/systems/honor-medal/HonorMedalSystem';
import { AchievementSystem } from '@/tools/build-planner/systems/achievement/AchievementSystem';
import EquipmentSystem from '@/tools/build-planner/systems/equipment-system/EquipmentSystem';
import { CostumeSystem } from '@/tools/build-planner/systems/costumes';
import StellarSystem from '@/tools/build-planner/systems/stellar-system/StellarSystem';
import EssenceRuneSystem from '@/tools/build-planner/systems/essence-rune/EssenceRuneSystem';
import KarmaRuneSystem from '@/tools/build-planner/systems/karma-rune/KarmaRuneSystem';
import { OverlordMasterySystem } from '@/tools/build-planner/systems/overlord-mastery';
import MythLevelSystem from '@/tools/build-planner/systems/myth-level/MythLevelSystem';
import BuffsPotions from '@/tools/build-planner/systems/buffs-potions';
import { ClassSystem } from '@/tools/build-planner/systems/class';
import { CollectionSystem } from '@/tools/build-planner/systems/collection';
import { PassiveSkillsSystem } from '@/tools/build-planner/systems/passive-skills';
import { ClassPassiveSkillsSystem } from '@/tools/build-planner/systems/class-passive-skills';
import { GoldMeritSystem } from '@/tools/build-planner/systems/gold-merit';
import { PlatinumMeritSystem } from '@/tools/build-planner/systems/platinum-merit';
import { ForceWingSystem } from '@/tools/build-planner/systems/force-wing/ForceWingSystem';
import { BattleConfigurationSystem } from '@/tools/build-planner/systems/battle-configuration';
import { ManualStatsSystem } from '@/tools/build-planner/systems/manual-stats';
import { DamageAnalysisSystem } from '@/tools/build-planner/systems/damage-analysis';
import ArtifactSystem from '@/tools/build-planner/systems/artifact-system/ArtifactSystem';
import StatRegistryInitializer from '@/tools/build-planner/utils/StatRegistryInitializer';

import { cn } from '@/tools/build-planner/lib/utils';
import { PROGRESSION_SYSTEMS } from '@/tools/build-planner/data/systems-config';
import ShareBuildButton from '@/components/ui/ShareBuildButton';
import LoadBuildFromURL from '@/components/ui/LoadBuildFromURL';
import BuildExportImportButtons from '@/components/ui/BuildExportImportButtons';


import { saveBuildToStorage, loadBuildFromStorage } from '@/utils/sharing/universal-build-serializer';
import { toast } from 'react-hot-toast';
import Link from 'next/link';

// Main content component
function BuildPlannerContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  
  // Get valid system ID helper function
  const getValidSystemId = (systemId: string | null): string => {
    if (!systemId) return 'equipment';
    
    // Handle backward compatibility for old system IDs
    if (systemId === 'character') {
      return 'stat-distribution';
    }
    
    // Check if the system ID exists in our systems config
    const validSystem = PROGRESSION_SYSTEMS.find(system => system.id === systemId);
    return validSystem ? systemId : 'equipment';
  };
  
  // Initialize with a default value to avoid hydration mismatch
  const [activeSystem, setActiveSystem] = useState('equipment');
  const [isInitialized, setIsInitialized] = useState(false);
  const [showKnownIssues, setShowKnownIssues] = useState(false);

  // Initialize system from URL params (for shared builds) or localStorage
  useEffect(() => {
    // Check if we have a system parameter in URL (for shared builds)
    const systemFromUrl = searchParams.get('system');
    let initialSystem = 'equipment';
    
    if (systemFromUrl) {
      // Priority 1: URL parameter (for shared builds)
      initialSystem = getValidSystemId(systemFromUrl);
    } else if (typeof window !== 'undefined') {
      // Priority 2: localStorage (for returning users)
      const savedSystem = localStorage.getItem('activeSystem');
      if (savedSystem) {
        initialSystem = getValidSystemId(savedSystem);
      }
    }
    
    setActiveSystem(initialSystem);
    setIsInitialized(true);
  }, [searchParams]);

  // Don't clean up URL parameters - keep shared URLs intact
  // This allows users to copy the shared URL again after loading

  // Function to handle system changes and save to localStorage
  const handleSystemChange = (systemId: string) => {
    setActiveSystem(systemId);
    
    // Save to localStorage for persistence
    if (typeof window !== 'undefined') {
      localStorage.setItem('activeSystem', systemId);
    }
    
    // NO LONGER update URL - this was causing cache issues
    // We only use URL parameters for shared builds
  };

  // Auto-load saved build on page load
  useEffect(() => {
    const loadSavedBuild = () => {
      try {
        const result = loadBuildFromStorage();
        if (result.success) {
          // Build loaded successfully
        }
      } catch (error) {
        console.error('Error loading saved build:', error);
      }
    };

    loadSavedBuild();
  }, []);

  const handleSaveBuild = async () => {
    try {
      const result = saveBuildToStorage();
      
      if (result.success) {
        toast.success(`Build saved successfully! (${result.size} characters compressed)`);
      } else {
        toast.error(`Save failed: ${result.error}`);
      }
    } catch (error) {
      toast.error('Save failed: Unknown error');
      console.error('Save error:', error);
    }
  };

  const handleResetBuild = () => {
    try {
      // Clear all localStorage
      if (typeof window !== 'undefined') {
        localStorage.clear();
      }

      // Refresh the page to reset all state
      window.location.reload();
    } catch (error) {
      toast.error('Reset failed: Unknown error');
      console.error('Reset error:', error);
    }
  };

  return (
    <div className="text-gray-200">
      <div className="container mx-auto max-w-8xl p-2 sm:p-4 md:p-5 lg:p-6">
        {/* Initialize the Stat Registry */}
        <StatRegistryInitializer />
        
        {/* Load Build From URL Component */}
        <LoadBuildFromURL />
      
        {/* Header Section */}
        <div className="component-bg-dark mb-3 sm:mb-4 lg:mb-6">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
          <div className="flex items-center gap-4">
            <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-game-gold glow-text-lg">Build Planner</h1>
          </div>
          <div className="flex flex-wrap gap-2 glass-button-group p-1">
            <button 
              onClick={handleResetBuild}
              className="glass-button-blue text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg transition duration-150 hover:glass-button-hover text-sm sm:text-base"
            >
              Reset
            </button>
            <button 
              onClick={handleSaveBuild}
              className="glass-button-green text-white font-semibold py-1.5 px-3 sm:py-2 sm:px-4 rounded-lg transition duration-150 hover:glass-button-hover text-sm sm:text-base"
            >
              Save Build
            </button>
            <BuildExportImportButtons />
            <ShareBuildButton currentSystem={activeSystem} />
          </div>
        </div>
      </div>

      {/* Development Notice */}
      <div className="mb-4 sm:mb-6">
        <div 
          className="bg-yellow-500/10 border border-yellow-500/30 rounded-lg border-l-4 border-l-yellow-500/60 p-3 sm:p-4 cursor-pointer hover:bg-yellow-500/15 transition-colors"
          onClick={() => setShowKnownIssues(!showKnownIssues)}
        >
          <div className="flex items-start gap-3">
            <div className="flex-shrink-0 mt-0.5">
              <svg className="w-5 h-5 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <div className="flex-1">
              <div className="flex items-center justify-between">
                <h3 className="text-sm font-medium text-yellow-400">Development Notice</h3>
                <svg 
                  className={`w-5 h-5 text-yellow-400 transition-transform ${showKnownIssues ? 'rotate-180' : ''}`} 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </div>
              {!showKnownIssues ? (
                <p className="text-xs sm:text-sm text-gray-300 mt-1">
                  Some features are incomplete or need refinement. Click to show known issues.
                </p>
              ) : (
                <div className="mt-2">
                  <p className="text-xs sm:text-sm text-gray-300 mb-2">
                    Some features are incomplete or need refinement. Known issues:
                  </p>
                  <ul className="text-xs sm:text-sm text-gray-300 space-y-1 list-disc list-inside ml-1">
                    <li><strong className="text-yellow-300">Battle Configuration:</strong> Incomplete </li>
                    <li><strong className="text-yellow-300">Damage Calculation:</strong> Formulas need refinement for accuracy</li>
                    <li><strong className="text-yellow-300">Combat Power:</strong> Needs to be improved to show PvE, PvP CP</li>
                    <li><strong className="text-yellow-300">Equipment System:</strong> Some equipment items and images are missing</li>
                    <li><strong className="text-yellow-300">Class Passive Skills:</strong> Missing Overlord stat bonuses</li>
                    <li><strong className="text-yellow-300">Buffs and Potions:</strong> Missing buffs/potions and images</li>
                    <li><strong className="text-yellow-300">Platinum Merit:</strong> Incomplete</li>
                    <li><strong className="text-yellow-300">Stat Optimization:</strong> Recommendations need refinement</li>
                    <li><strong className="text-yellow-300">General:</strong> Many minor issues remain including image optimization, performance improvements, and responsive design enhancements</li>
                  </ul>
                  <p className="text-xs text-gray-400 mt-3 pt-2 border-t border-yellow-500/20">
                    This is an open source project. Want to help? Check out the{' '}
                    <a 
                      href="https://github.com/tookerjebs/nipperlug-nextjs" 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-yellow-300 hover:text-yellow-200 underline"
                    >
                      GitHub repository
                    </a>
                    {' '}to contribute!
                  </p>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Main Layout */}
      <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 sm:gap-4 lg:gap-6">
        {/* Sidebar - Systems List */}
        <div className="lg:col-span-1 component-bg">
          <SystemsSidebar 
            activeSystem={activeSystem} 
            onSystemChange={handleSystemChange} 
          />
        </div>

        {/* Main Content Area */}
        <div className="lg:col-span-3 space-y-3 sm:space-y-4 lg:space-y-6 component-bg-light bg-pattern-grid">
          {/* Combat Stats */}
          <div className="mb-3 sm:mb-4 lg:mb-6">
            <CombatStats />
          </div>
          
          {/* Active System Content */} 
          <div className="glass-panel-dark shadow-game p-3 sm:p-4 lg:p-6 mb-3 sm:mb-4 lg:mb-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-game-gold glow-text-sm">{PROGRESSION_SYSTEMS.find(system => system.id === activeSystem)?.name}</h2>
            <div className={cn(
              "min-h-64 sm:min-h-80 lg:min-h-96",
              // Full width for collection, overlord mastery, gold merit, platinum merit, achievements, passive skills, manual stats, and damage analysis systems, center everything else
              activeSystem === 'collection' || activeSystem === 'overlord-mastery' || activeSystem === 'gold-merit' || activeSystem === 'platinum-merit' || activeSystem === 'achievements' || activeSystem === 'passive-skills' || activeSystem === 'manual-stats' || activeSystem === 'damage-analysis'
                ? "w-full" 
                : "flex items-center justify-center"
            )}>
              {activeSystem === 'stat-distribution' && (
                <ClassSystem />
              )}
              {activeSystem === 'pet' && (
                <PetSystem />
              )}
              {activeSystem === 'equipment' && (
                <EquipmentSystem />
              )}
              {activeSystem === 'stellar-link' && (
                <StellarSystem />
              )}
              {activeSystem === 'honor-medal' && (
                <HonorMedalSystem />
              )}
              {activeSystem === 'costumes' && (
                <CostumeSystem />
              )}
              {activeSystem === 'gold-merit' && (
                <GoldMeritSystem />
              )}
              {activeSystem === 'platinum-merit' && (
                <PlatinumMeritSystem />
              )}
              {activeSystem === 'force-wing' && (
                <ForceWingSystem />
              )}
              {activeSystem === 'essence-runes' && (
                <EssenceRuneSystem />
              )}
              {activeSystem === 'karma-runes' && (
                <KarmaRuneSystem />
              )}
              {activeSystem === 'overlord-mastery' && (
                <OverlordMasterySystem />
              )}
              {activeSystem === 'achievements' && (
                <AchievementSystem />
              )}
              {activeSystem === 'collection' && (
                <CollectionSystem />
              )}
              {activeSystem === 'mythical-level' && (
                <MythLevelSystem />
              )}
              {activeSystem === 'buffs-potions' && (
                <BuffsPotions />
              )}
              {activeSystem === 'passive-skills' && (
                <PassiveSkillsSystem />
              )}
              {activeSystem === 'class-passive-skills' && (
                <ClassPassiveSkillsSystem />
              )}
              {activeSystem === 'damage-analysis' && (
                <DamageAnalysisSystem />
              )}
              {activeSystem === 'battle-configuration' && (
                <BattleConfigurationSystem />
              )}
              {activeSystem === 'manual-stats' && (
                <ManualStatsSystem />
              )}
              {activeSystem === 'artifact' && (
                <ArtifactSystem />
              )}
            </div>
          </div>

          {/* Build Summary */}
          <BuildSummary />
        </div>
      </div>


      </div>
    </div>
  );
}

// Loading fallback component
function LoadingFallback() {
  return (
    <div className="min-h-screen text-foreground">
      <StatRegistryInitializer />
      <div className="container mx-auto p-4">
        <div className="flex animate-pulse">
          <div className="w-64 bg-gray-800 rounded-lg h-96 mr-4"></div>
          <div className="flex-1 bg-gray-800 rounded-lg h-96"></div>
        </div>
      </div>
    </div>
  );
}

// Main page component with Suspense wrapper
export default function BuildPlannerPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <BuildPlannerContent />
    </Suspense>
  );
}