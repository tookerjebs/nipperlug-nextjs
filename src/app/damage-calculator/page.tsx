'use client';

import { useState, useEffect, Suspense } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import CombatStats from '@/tools/damage-calculator/components/main-layout/CombatStats';
import { ManualStatsSystem } from '@/tools/damage-calculator/systems/manual-stats';
import { DamageAnalysisSystem } from '@/tools/damage-calculator/systems/damage-analysis';
import StatRegistryInitializer from '@/tools/damage-calculator/utils/StatRegistryInitializer';

import { cn } from '@/tools/damage-calculator/lib/utils';
import { toast } from 'react-hot-toast';

// Main content component
function DamageCalculatorContent() {
  // No more sections/tabs - simplified UI

  return (
    <div className="text-gray-200">
      <div className="container mx-auto max-w-8xl p-2 sm:p-4 md:p-5 lg:p-6">
        {/* Initialize the Stat Registry */}
        <StatRegistryInitializer />
      
        {/* Header Section */}
        <div className="component-bg-dark mb-3 sm:mb-4 lg:mb-6">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3 mb-2">
            <div className="flex items-center gap-4">
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-game-gold glow-text-lg">Damage Calculator</h1>
            </div>
          </div>
        </div>

        {/* Top Section: Damage Type Selector + Combat Stats Cards */}
        <div className="mb-6">
          <CombatStats />
        </div>

        {/* Main Content: Stats Input */}
        <div className="component-bg-light bg-pattern-grid mb-6">
          <div className="glass-panel-dark shadow-game p-3 sm:p-4 lg:p-6">
            <h2 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 text-game-gold glow-text-sm">
              Your Stats
            </h2>
            <ManualStatsSystem />
          </div>
        </div>

        {/* Damage Analysis Section */}
        <div className="component-bg-light bg-pattern-grid">
          <div className="glass-panel-dark shadow-game p-3 sm:p-4 lg:p-6">
            <DamageAnalysisSystem />
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
export default function DamageCalculatorPage() {
  return (
    <Suspense fallback={<LoadingFallback />}>
      <DamageCalculatorContent />
    </Suspense>
  );
}