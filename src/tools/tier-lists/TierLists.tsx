'use client';

import { useState } from 'react';
import { tierListsData } from './data';
import { TierListType } from './types';
import { TIER_LIST_TABS } from './config';
import TierListSection from './components/TierListSection';

export default function TierLists() {
  const [activeTab, setActiveTab] = useState<TierListType>('single-target');

  return (
    <div className="min-h-screen text-foreground">
      <div className="container mx-auto max-w-6xl px-4 py-8">
        {/* Header Section */}
        <div className="text-center mb-12">
          <h1 className="text-4xl lg:text-5xl font-bold text-game-gold glow-text-lg mb-4">
            Cabal Online Class Tier Lists
          </h1>
          <p className="text-foreground/80 leading-relaxed max-w-4xl mx-auto text-lg">
            Rankings of all Cabal Online classes based on their performance in different scenarios. 
            Choose a category below to see how Warrior, Wizard, Blader, Dark Mage, Force Archer, Force Gunner, Force Blader, and Gladiator stack up.
          </p>
        </div>

        {/* Main Content with Integrated Tabs */}
        <div className="bg-component-card border border-border-dark rounded-xl shadow-lg">
          {/* Tab Navigation - Part of the Card */}
          <div className="border-b border-border-dark p-4">
            <div className="flex flex-wrap justify-center gap-2">
              {TIER_LIST_TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`
                    px-4 py-3 rounded-lg font-medium transition-all duration-200 min-w-0 flex-shrink-0
                    ${activeTab === tab.id 
                      ? 'glass-panel border-game-highlight glow-border text-foreground shadow-lg' 
                      : 'glass-panel-light text-foreground/80 hover:border-border-light hover:text-foreground'
                    }
                  `}
                >
                  <div className="text-center">
                    <div className="font-semibold text-sm">
                      {tab.label}
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
          
          {/* Tier List Content */}
          <div className="p-6">
            <TierListSection tierListData={tierListsData[activeTab]} />
          </div>
          
          {/* Help Text */}
          <div className="border-t border-border-dark px-6 py-4 bg-theme-darker/20">
            <div className="flex items-center justify-center text-sm text-foreground/60">
              <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
              </svg>
              Click on any tier row to expand detailed information about each class
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}