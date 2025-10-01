import React from 'react';
import { useStellarSystemStore } from '../stores/stellarSystemStore';
import { lineEffects } from '../data/stellar-data';
import { nodeColors } from '../data/stellar-data';
import { getStatInfo, formatStatValue } from '../../../data/stats-config';

export default function LineEffectsDisplay() {
  const { constellations, nodeStates } = useStellarSystemStore();

  // Get active line effects
  const activeLineEffects = Object.entries(constellations)
    .filter(([_, constellation]) => constellation.isComplete && constellation.colorKey)
    .map(([constellationName, constellation]) => {
      const colorKey = constellation.colorKey!;
      const effects = lineEffects[constellationName as keyof typeof lineEffects];
      
      if (!effects || !effects[colorKey as keyof typeof effects]) {
        return null;
      }

      const lineEffect = effects[colorKey as keyof typeof effects];
      const color = nodeColors[colorKey as keyof typeof nodeColors];
      
      // Get actual node range for this constellation based on UI positions
      const getActualNodeRange = (constellation: string) => {
        switch (constellation) {
          case 'daedalus': return { start: 1, end: 4 };
          case 'icarus': return { start: 5, end: 10 };
          case 'vulcanos': return { start: 11, end: 18 };
          case 'minerva': return { start: 19, end: 28 };
          case 'pluto': return { start: 29, end: 40 };
          default: return { start: 1, end: 8 };
        }
      };
      
      const nodeRange = getActualNodeRange(constellationName);
      
      // Count active nodes of the same color in this constellation's actual range
      const activeNodes = constellation.nodes.filter(node => {
        const nodeState = nodeStates[node.id];
        return node.id >= nodeRange.start && 
               node.id <= nodeRange.end &&
               nodeState?.isActive && 
               nodeState.statId && 
               nodeState.colorKey === colorKey;
      }).length;

      return {
        constellation: constellationName,
        colorKey,
        color,
        activeNodes,
        effect1: lineEffect.effect1,
        effect2: lineEffect.effect2
      };
    })
    .filter(Boolean);

  return (
    <div className="mt-4 p-4 system-info-panel rounded-lg">
      <h3 className="text-lg font-semibold mb-2 text-yellow-400">Active Line Effects</h3>
      <div className="text-sm">
        {activeLineEffects.length === 0 ? (
          <p className="text-gray-400 italic">No active line effects</p>
        ) : (
          activeLineEffects.map((effect) => {
          if (!effect) return null;
          
          const { constellation, colorKey, color, effect1, effect2 } = effect;
          const stat1 = getStatInfo(effect1.statId)?.name || effect1.statId;
          const stat2 = getStatInfo(effect2.statId)?.name || effect2.statId;
          const value1 = formatStatValue(effect1.statId, effect1.value);
          const value2 = formatStatValue(effect2.statId, effect2.value);
          
          return (
            <div key={`${constellation}-${colorKey}`} className="mb-2 flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full border"
                style={{ 
                  backgroundColor: color?.cssColor || '#4a5568',
                  borderColor: color?.borderColor || '#718096'
                }}
              />
              <span className="capitalize text-gray-200">
                {constellation} - {colorKey}:
              </span>
              <span className="text-green-400">
                {stat1} +{value1}, {stat2} +{value2}
              </span>
            </div>
          );
        })
        )}
      </div>
    </div>
  );
}