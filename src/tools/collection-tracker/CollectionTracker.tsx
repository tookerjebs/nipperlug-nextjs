'use client';

import React, { useState, useMemo, useEffect } from 'react';
import { cn } from '@/tools/build-planner/lib/utils';
import collectionData from '@/lib/game-data/collection-tracker-data.json';
import { CollectionSidebar } from './components/CollectionSidebar';
import { CollectionDetails } from './components/CollectionDetails';
import { CollectionFilters } from './components/CollectionFilters';
import { StatsProgress } from './components/StatsProgress';
import CollectionExportImportButtons from './components/CollectionExportImportButtons';
import LoadCollectionFromURL from './components/LoadCollectionFromURL';
import { useCollectionTrackerStore } from './stores/collectionTrackerStore';
import { getStatsAggregation } from './utils/statsAggregator';
import { 
  getAllAvailableStats, 
  getAllAvailableRewards, 
  filterCollections,
  getAllCollectionsFromTab,
  FilterOptions 
} from './utils/filterUtils';
import type { CollectionData, CollectionTab, Collection } from './types';

export function CollectionTracker() {
  const {
    activeTab,
    activePage,
    activeCollection,
    collectionProgress,
    isInitialized,
    setActiveTab,
    setActivePage,
    setActiveCollection,
    getCollectionProgress,
  } = useCollectionTrackerStore();

  // Filter state
  const [filters, setFilters] = useState<FilterOptions>({
    selectedItem: null,
    selectedStats: [],
    selectedRewards: [],
    progressFilter: 'all'
  });

  // Get available tabs in desired order
  const tabOrder = ['Dungeon', 'World', 'Special', 'Boss'];
  const tabs = tabOrder.map(tabName => (collectionData as CollectionData).tabs[tabName]).filter(Boolean) as CollectionTab[];

  // Get current tab data
  const currentTab = (collectionData as CollectionData).tabs[activeTab];
  
  // Check if any filters are active
  const hasActiveFilters = useMemo(() => {
    return filters.selectedItem !== null ||
           filters.selectedStats.length > 0 || 
           filters.selectedRewards.length > 0 || 
           filters.progressFilter !== 'all';
  }, [filters]);

  // Get available pages (hide empty pages when filtering)
  const availablePages = useMemo(() => {
    if (!currentTab) return [];
    
    const allPages = Object.keys(currentTab.pages).map(Number).sort((a, b) => a - b);
    
    if (!hasActiveFilters) {
      // No filters - show all pages
      return allPages;
    } else {
      // Filters active - only show pages that have results
      const pagesWithResults = new Set<number>();
      
      allPages.forEach(pageNum => {
        const pageCollections = Object.values(currentTab.pages[pageNum].collections);
        const filteredPageCollections = filterCollections(pageCollections as Collection[], filters, getCollectionProgress);
        if (filteredPageCollections.length > 0) {
          pagesWithResults.add(pageNum);
        }
      });
      
      return Array.from(pagesWithResults).sort((a, b) => a - b);
    }
  }, [currentTab, filters, hasActiveFilters, getCollectionProgress]);

  // Get collections for current page with filtering
  const currentPageCollections = useMemo(() => {
    if (!currentTab || !currentTab.pages[activePage]) return [];
    
    const pageCollections = Object.values(currentTab.pages[activePage].collections)
      .sort((a: Collection, b: Collection) => a.pageOrder - b.pageOrder);
    
    // Apply filters to current page collections
    return filterCollections(pageCollections as Collection[], filters, getCollectionProgress);
  }, [currentTab, activePage, filters, getCollectionProgress]);

  // Get selected collection data
  const selectedCollection = useMemo(() => {
    if (!activeCollection || !currentTab) return null;
    
    // Find collection across all pages in current tab
    for (const page of Object.values(currentTab.pages)) {
      const collection = Object.values(page.collections).find((c: Collection) => c.id === activeCollection);
      if (collection) return collection as Collection;
    }
    return null;
  }, [activeCollection, currentTab]);

  // Get collection completion stats for header
  const aggregation = useMemo(() => {
    return getStatsAggregation(collectionProgress);
  }, [collectionProgress]);

  // Get available stats and rewards for filters
  const availableStats = useMemo(() => getAllAvailableStats(), []);
  const availableRewards = useMemo(() => getAllAvailableRewards(), []);

  // Auto-switch to first available page if current page is not available due to filtering
  useEffect(() => {
    if (isInitialized && availablePages.length > 0 && !availablePages.includes(activePage)) {
      setActivePage(availablePages[0]);
    }
  }, [isInitialized, availablePages, activePage, setActivePage]);

  // Auto-select first collection when no collection is selected and collections are available
  useEffect(() => {
    if (isInitialized && !activeCollection && currentPageCollections.length > 0) {
      setActiveCollection(currentPageCollections[0].id);
    }
  }, [isInitialized, activeCollection, currentPageCollections, setActiveCollection]);

  // Additional effect to ensure selection happens after tab changes
  useEffect(() => {
    // When the current tab changes and we have no active collection,
    // ensure we auto-select if collections are available
    if (isInitialized && currentTab && !activeCollection && currentPageCollections.length > 0) {
      setActiveCollection(currentPageCollections[0].id);
    }
  }, [isInitialized, currentTab, activeCollection, currentPageCollections, setActiveCollection]);

  // Force re-selection when changing tabs to ensure consistency
  useEffect(() => {
    // Small delay to ensure currentPageCollections is properly calculated
    const timer = setTimeout(() => {
      if (isInitialized && currentTab && currentPageCollections.length > 0 && !activeCollection) {
        setActiveCollection(currentPageCollections[0].id);
      }
    }, 100);
    
    return () => clearTimeout(timer);
  }, [isInitialized, activeTab, currentTab, currentPageCollections, activeCollection, setActiveCollection]);

  return (
    <div className="w-full">
      {/* Load Collection From URL Component */}
      <LoadCollectionFromURL />
      
      {/* Header */}
      <div className="component-bg-dark mb-6">
        <h1 className="text-3xl font-bold text-game-gold mb-2">Collection Progress Tracker</h1>
        <p className="text-foreground/80 mb-4">
          Collection progress tracker for Cabal Online. Track your progress across World, Dungeon, Special, and Boss collections. 
          Monitor required items and unlock stat bonuses at 30%, 60%, and 100% completion milestones.
        </p>
      </div>
      
      {/* Simple credit note */}
      <div className="text-right text-gray-400 italic text-sm mb-4">
        Credits go to Delia for collection data
      </div>

      {/* Collection Overview and Data Management Row */}
      <div className="flex gap-6 mb-6">
        {/* Collection Completion Overview */}
        <div className="component-bg-dark flex-1">
          <div className="flex items-center justify-between mb-3">
            <div>
              <h3 className="text-white font-semibold text-lg">Collections Completed</h3>
              <p className="text-gray-400 text-sm">Track your overall collection progress</p>
            </div>
            <div className="text-right">
              <div className="text-game-gold font-bold text-2xl">
                {aggregation.completedCollections} / {aggregation.totalCollections}
              </div>
              <div className="text-gray-300 text-sm">
                {aggregation.totalCollections > 0 ? Math.round((aggregation.completedCollections / aggregation.totalCollections) * 100) : 0}% Complete
              </div>
            </div>
          </div>
          <div className="h-3 bg-theme-darker rounded-full overflow-hidden">
            <div 
              className="h-full bg-game-gold transition-all duration-500 rounded-full shadow-sm"
              style={{ 
                width: `${aggregation.totalCollections > 0 ? Math.round((aggregation.completedCollections / aggregation.totalCollections) * 100) : 0}%` 
              }}
            />
          </div>
        </div>

        {/* Collection Data Management Buttons */}
        <div className="component-bg-dark flex items-center justify-center">
          <CollectionExportImportButtons />
        </div>
      </div>

      {/* Collection Filters */}
      <CollectionFilters 
        onFiltersChange={setFilters}
        availableStats={availableStats}
        availableRewards={availableRewards}
      />

      {/* Unified Content Container */}
      <div className="component-bg-light overflow-hidden mb-6 rounded-lg" style={{ border: '2px solid rgba(100, 100, 120, 0.3)' }}>
        {/* Tab Navigation */}
        <div className="flex gap-2 bg-theme-darker p-3 pb-0" style={{ borderBottom: '2px solid rgba(100, 100, 120, 0.3)' }}>
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => {
                setActiveTab(tab.name);
                setActivePage(1); // Reset to first page when changing tabs
                setActiveCollection(null); // Reset selection to trigger auto-selection
              }}
              className={cn(
                "flex-1 px-6 py-3 text-sm font-semibold transition-all duration-200 rounded-t-lg border-b-2",
                activeTab === tab.name
                  ? "text-white bg-theme-light border-white"
                  : "text-gray-400 bg-theme-dark border-transparent hover:text-white hover:bg-theme-light/50"
              )}
            >
              {tab.name}
            </button>
          ))}
        </div>

        {/* Main Content Area */}
        <div className="grid grid-cols-1 lg:grid-cols-4 min-h-[600px]">
          
          {/* Collections Sidebar */}
          <div className="lg:col-span-1 shadow-inner" style={{ 
            backgroundColor: 'rgba(22, 22, 30, 0.3)',
            borderRight: '2px solid rgba(100, 100, 120, 0.3)'
          }}>
            <CollectionSidebar 
              collections={currentPageCollections}
              activeCollection={activeCollection}
              onSelectCollection={setActiveCollection}
              availablePages={availablePages}
              activePage={activePage}
              onPageChange={(pageNum) => {
                setActivePage(pageNum);
                setActiveCollection(null); // Reset selection to trigger auto-selection
              }}
              hasFilters={hasActiveFilters}
              selectedItem={filters.selectedItem}
            />
          </div>

          {/* Collection Details */}
          <div className="lg:col-span-3 component-bg-dark">
            {selectedCollection && (
              <CollectionDetails 
                collection={selectedCollection}
              />
            )}
          </div>

        </div>
      </div>
        
      {/* Stats Progress Section */}
      <StatsProgress />
    </div>
  );
}