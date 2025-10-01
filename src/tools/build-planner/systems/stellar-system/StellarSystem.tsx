'use client';

import { StatIcon } from '@/tools/build-planner/components/StatIcon';
import { useState } from 'react';

import { useStellarSystemStore } from './stores/stellarSystemStore';
import { nodeColors } from './data/stellar-data';
import { nodePositions, getConstellationFromId } from './data/node-positions';
import StellarStatSelectionModal from './components/StellarStatSelectionModal';
import LineEffectsDisplay from './components/LineEffectsDisplay';
import { ActionButtons } from '@/tools/build-planner/components/systems/ActionButtons';
import { TotalStatsButton } from '@/tools/build-planner/components/systems/TotalStatsButton';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { 
  getStellarStatValue 
} from './utils/stellarStatConverter';
import { getStatsForConstellation } from './data/stellar-data';


interface StellarNodeProps {
  node: {
    id: number;
    line: string;
    raw: { x: number; y: number };
    normalized: { x: number; y: number };
    statId?: string;
    level?: number;
    color: string | null;
  };
  onClick: () => void;
  style?: React.CSSProperties;
}

function StellarNode({ node, onClick, style }: StellarNodeProps) {
  // Color filter by constellation line for the node image
  const getLineFilter = (line: string) => {
    switch (line) {
      case 'daedalus': return 'hue-rotate-0 saturate-150 brightness-110'; // Red tint
      case 'icarus': return 'hue-rotate-180 saturate-150 brightness-110'; // Blue tint
      case 'vulcanos': return 'hue-rotate-30 saturate-150 brightness-110'; // Orange tint
      case 'minerva': return 'hue-rotate-90 saturate-150 brightness-110'; // Green tint
      case 'pluto': return 'hue-rotate-270 saturate-150 brightness-110'; // Purple tint
      default: return 'saturate-100 brightness-100';
    }
  };



  return (
    <div
      className="absolute cursor-pointer transition-all duration-200 transform hover:scale-110"
      style={{
        left: `${node.normalized.x * 100}%`,
        top: `${node.normalized.y * 100}%`,
        transform: 'translate(-50%, -50%)'
      }}
      onClick={onClick}
      title={`Node ${node.id} (${node.line.charAt(0).toUpperCase() + node.line.slice(1)})${node.statId ? ` - ${getStatInfo(node.statId)?.name || node.statId}` : ''}`}
    >
      <img
        src="/images/stellar-system/node_base.png"
        alt={`Node ${node.id}`}
        className="w-12 h-12 drop-shadow-lg"
        style={{
          filter: `${getLineFilter(node.line)} drop-shadow(0 0 4px rgba(0, 0, 0, 0.8))`,
          backgroundColor: style?.backgroundColor || node.color || '#4a5568',
          border: style?.border || '1px solid #718096',
          borderRadius: '50%',
          ...style
        }}
      />
      
      {/* Stat Icon */}
      {node.statId && (
        <div className="absolute inset-1 flex items-center justify-center pointer-events-none">
          <div 
            style={{ 
              filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.8))',
              transform: 'translateY(4px)' // Fine-tune vertical positioning to account for node image visual offset
            }}
          >
            <StatIcon
              statId={node.statId}
              width={39}
              height={39}
              circular={true}
              fill={true}
            />
          </div>
        </div>
      )}
      
      {/* Stat Value Indicator */}
      {node.statId && node.level && (() => {
        const nodeColor = node.color ? nodeColors[node.color] : null;
        const backgroundColor = nodeColor?.cssColor || '#4a5568';
        const borderColor = nodeColor?.borderColor || '#718096';
        
        const statValue = getStellarStatValue(node.statId, node.level, node.line);
        const statInfo = getStatInfo(node.statId);
        
        // Format the display value
        let displayValue: string | number = node.level;
        if (statValue !== null) {
          if (statInfo?.isPercentage) {
            displayValue = `${statValue}%`;
          } else if (statValue > 99) {
            // Abbreviate large numbers
            displayValue = `${Math.floor(statValue / 10) * 10}`;
          } else {
            displayValue = statValue;
          }
        }
        
        // Get badge size based on content length
        const badgeSize = String(displayValue).length > 2 ? 'w-auto min-w-6 h-6 px-1 text-[10px]' : 'w-5 h-5 text-xs';
        
        return (
          <div 
            className={`absolute -bottom-1.5 -right-1.5 ${badgeSize} text-white font-bold rounded-full flex items-center justify-center shadow-lg z-10 border`}
            style={{
              backgroundColor: backgroundColor,
              borderColor: borderColor,
              boxShadow: `0 0 8px ${nodeColor?.glowColor || 'rgba(0, 0, 0, 0.5)'}`
            }}
            title={`${statInfo?.name || node.statId}: ${displayValue}`}
          >
            {displayValue}
          </div>
        );
      })()}
    </div>
  );
}

export default function StellarSystem() {
  const { 
    nodeStates,
    totalStats,
    handleStatSelect, 
    handleStatRemove, 
    handleColorSelect,
    activateNode, 
    deactivateNode,
    quickFillSystem,
    resetSystem
  } = useStellarSystemStore();
  const [selectedNode, setSelectedNode] = useState<number | null>(null);
  const [showStatModal, setShowStatModal] = useState(false);


  const handleNodeClick = (nodeId: number) => {
    setSelectedNode(nodeId);
    setShowStatModal(true);
  };

  const handleStellarStatSelectWrapper = (statId: string, level: number, value: number) => {
    if (selectedNode) {
      handleStatSelect(selectedNode, statId, level);
    }
  };

  const handleColorSelectWrapper = (nodeId: number, colorKey: string) => {
    handleColorSelect(nodeId, colorKey);
    setShowStatModal(false);
    setSelectedNode(null);
  };



  return (
    <div className="w-full max-w-[800px] mx-auto">
      {/* Action Buttons */}
      <div className="mb-4 flex items-center justify-end gap-4">
        <ActionButtons 
          onQuickFill={() => quickFillSystem()}
          onReset={() => resetSystem()}
        />
        <TotalStatsButton
          totalStats={totalStats}
          systemName="Stellar System"
        />
      </div>
      
      {/* Image container with proper aspect ratio - matching prototype */}
      <div className="relative w-full bg-black rounded-lg shadow-2xl overflow-hidden" style={{ aspectRatio: '1/1' }}>
        {/* Background image - stretched to fill like prototype */}
        <div 
          className="absolute inset-0 w-full h-full z-0"
          style={{
            backgroundImage: 'url(/images/stellar-system/skill_tree_base.png)',
            backgroundSize: 'calc(100% + 20px) calc(100% + 20px)',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        {/* Nodes Container - positioned relative to the actual image */}
        <div className="absolute inset-0 z-10">
          {Object.values(nodeStates).map((nodeState) => {
          const nodeColor = nodeState.colorKey ? nodeColors[nodeState.colorKey] : null;
          const position = nodePositions[nodeState.id];
          if (!position) return null;
          
          return (
            <StellarNode
              key={nodeState.id}
              node={{
                id: nodeState.id,
                line: getConstellationFromId(nodeState.id),
                raw: { x: 0, y: 0 },
                normalized: position,
                statId: nodeState.statId,
                level: nodeState.level,
                color: nodeState.colorKey || null
              }}
              onClick={() => handleNodeClick(nodeState.id)}
              style={{
                backgroundColor: nodeColor?.cssColor || '#4a5568',
                border: '1px solid #718096'
              }}
            />
          );
        })}
        </div>
        
        {/* Selected Node Info */}
        {selectedNode && (
          <div className="absolute top-4 right-4 bg-black bg-opacity-80 text-white p-3 rounded-lg shadow-lg border border-gray-600 z-20">
            <h3 className="text-lg font-semibold mb-2 text-yellow-400">Node {selectedNode}</h3>
            <p className="text-sm text-gray-300">Line: <span className="text-blue-400 capitalize">{getConstellationFromId(selectedNode)}</span></p>
            <p className="text-sm text-gray-300">Status: {nodeStates[selectedNode]?.isActive ? 'Active' : 'Inactive'}</p>
          </div>
        )}
      </div>
      
      {/* System Info */}
      <div className="mt-6 p-4 system-info-panel rounded-lg">
        <div className="mb-2">
          <h3 className="text-lg font-semibold text-yellow-400">Stellar Link System</h3>
        </div>
        <p className="text-sm text-gray-300 mb-1">Click on nodes to select and configure them</p>
        <p className="text-sm text-gray-400">Total nodes: {Object.keys(nodeStates).length} | Active nodes: {Object.values(nodeStates).filter(n => n.isActive).length}</p>
      </div>

      {/* Active Line Effects */}
      <LineEffectsDisplay />

      {/* Modals */}
      {showStatModal && selectedNode && (() => {
        const constellation = getConstellationFromId(selectedNode);
        const stellarStats = getStatsForConstellation(constellation);
        
        return (
          <StellarStatSelectionModal
            isOpen={showStatModal}
            onClose={() => {
              setShowStatModal(false);
              setSelectedNode(null);
            }}
            nodeId={selectedNode}
            currentColor={nodeStates[selectedNode]?.colorKey || undefined}
            onColorSelect={handleColorSelectWrapper}
            stellarStats={stellarStats}
            onStellarStatSelect={handleStellarStatSelectWrapper}
            onRemoveStat={() => {
              handleStatRemove(selectedNode);
              setShowStatModal(false);
              setSelectedNode(null);
            }}
            hasCurrentStat={!!nodeStates[selectedNode]?.statId}
          />
        );
      })()}
    </div>
  );
}