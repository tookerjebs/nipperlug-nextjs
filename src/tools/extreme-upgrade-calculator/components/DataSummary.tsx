'use client';

import React, { useState } from 'react';
import { ChevronDown, ChevronUp, Info } from 'lucide-react';
import { EXTREME_CORES, EXTREME_FACTORS, SERVER_CONFIGS, EQUIPMENT_TYPES } from '../data/extreme-upgrade-data';

export default function DataSummary() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <div className="glass-panel p-6 mt-8">
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="w-full text-left group hover:bg-foreground/5 p-4 -m-4 rounded-lg transition-colors"
      >
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Info className="w-6 h-6 text-foreground" />
            <h2 className="text-2xl font-semibold">
              Calculator Data
            </h2>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-foreground/60 group-hover:text-foreground/80 transition-colors">
              {isExpanded ? 'Hide Details' : 'Show Details'}
            </span>
            {isExpanded ? (
              <ChevronUp className="w-5 h-5 text-foreground" />
            ) : (
              <ChevronDown className="w-5 h-5 text-foreground" />
            )}
          </div>
        </div>
      </button>

      <div className={`overflow-hidden transition-all duration-300 ${isExpanded ? 'max-h-[2000px] opacity-100 mt-6' : 'max-h-0 opacity-0'}`}>
        <div className="space-y-8">
        {/* Success Rate Formula */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Success Rate Formula</h3>
          <div className="font-mono text-sm mb-2">
            Success Rate = (Factor × Sum of Core Power) ÷ (100 × Base Level)
          </div>
        </div>

        {/* Core Power Values */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Extreme Core Power Values</h3>
          <div className="grid grid-cols-6 gap-2 text-sm">
            {EXTREME_CORES.map(core => (
              <div key={core.level}>
                Level {core.level}: {core.power} Power
              </div>
            ))}
          </div>
        </div>

        {/* Factor Values */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Factor Values by Level</h3>
          <div className="text-sm text-foreground/70 mb-2">
            Same for all equipment types
          </div>
          <div className="grid grid-cols-7 gap-2 text-sm">
            {EXTREME_FACTORS.map((factor, index) => (
              <div key={index}>
                Level {index + 1}: {factor}
              </div>
            ))}
          </div>
        </div>

        {/* Base Level Values */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Base Level Values by Server</h3>
          <div className="text-sm text-foreground/70 mb-3">
            Higher base level = lower success chance
          </div>
          {SERVER_CONFIGS.map(server => (
            <div key={server.name} className="mb-4">
              <h4 className="font-semibold mb-2">
                {server.displayName} {server.hasResetOutcome ? '(Has Reset)' : '(No Reset)'}
              </h4>
              <div className="text-sm space-y-1">
                <div>
                  1H Weapons & Armor: {server.baseLevel.oneHanded.join(', ')}
                </div>
                <div>
                  2H Weapons: {server.baseLevel.twoHanded.join(', ')}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Costs */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Upgrade Costs by Equipment Type</h3>
          {EQUIPMENT_TYPES.map(equipment => (
            <div key={equipment.id} className="mb-4">
              <h4 className="font-semibold mb-2">{equipment.displayName}</h4>
              <div className="text-sm space-y-1">
                {equipment.upgradeCosts.alz.map((alz, index) => (
                  <div key={index}>
                    Level {index + 1}: {(alz / 1000000)}M Alz + {equipment.upgradeCosts.coreCount[index]} Cores
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Upgrade Outcomes */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Possible Upgrade Outcomes</h3>
          <div className="text-sm space-y-2">
            <div><strong>Success:</strong> Extreme level increases by 1</div>
            <div><strong>Broken:</strong> Item becomes broken, extreme level remains</div>
            <div><strong>Reset:</strong> Extreme level resets to 0 (Standard servers only)</div>
          </div>
        </div>

        {/* Probability Formulas */}
        <div>
          <h3 className="text-lg font-semibold mb-3">Probability Formulas</h3>
          <div className="text-sm space-y-2">
            <div className="font-mono">Expected Attempts = 1 ÷ Success Rate</div>
            <div className="font-mono">Confidence Attempts = ln(1 - confidence) ÷ ln(1 - success_rate)</div>
            <div>Reset Probability = (1 - Success Rate) × 0.5</div>
            <div>Break Probability = (1 - Success Rate) × 0.5</div>
          </div>
        </div>
        </div>
      </div>
    </div>
  );
}