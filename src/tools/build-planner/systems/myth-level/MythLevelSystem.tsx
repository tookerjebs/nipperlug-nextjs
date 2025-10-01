'use client';

import { useEffect, useRef, useState } from 'react';
import {
  TransformWrapper,
  TransformComponent,
  ReactZoomPanPinchRef
} from 'react-zoom-pan-pinch';
import { mythLevelNodes } from './mythLevelNodes';
import { getStatInfo } from '@/tools/build-planner/data/stats-config';
import { getNodeData } from './data/mythLevelNodeData';
import MythNodeStatModalEnhanced from './components/MythNodeStatModalEnhanced';
import { useMythLevelStore, SelectedStatWithLevel } from './stores/mythLevelStore';
import { ActionButtons } from '../../components/systems/ActionButtons';
import { TotalStatsButton } from '../../components/systems/TotalStatsButton';
import { StatIcon } from '../../components/StatIcon';
import { getRankByHolyPower } from './data/mythHolyPowerRanks';
import { mythZones } from './data/mythZoneConfig';
import ZoneOverlays from './components/ZoneOverlays';

// Tooltip state interface
interface TooltipState {
  visible: boolean;
  nodeId: number | null;
  x: number;
  y: number;
}

export default function MythLevelSystem() {
  const transformComponentRef = useRef<ReactZoomPanPinchRef | null>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const [currentScale, setCurrentScale] = useState<number>(1);
  const [imageDimensions, setImageDimensions] = useState<{width: number, height: number} | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Tooltip state
  const [tooltip, setTooltip] = useState<TooltipState>({
    visible: false,
    nodeId: null,
    x: 0,
    y: 0
  });
  const tooltipTimeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  // Use the store
  const {
    selectedNodeId,
    nodeStats,
    totalHolyPower,
    totalStats,
    selectNode,
    handleStatSelect,
    hasNodeStats,
    getNodeStats,
    resetSystem,
    quickFillSystem,
    isNodeUnlocked,
    getNodeZone
  } = useMythLevelStore();
  
  // Handle image load to get dimensions
  const handleImageLoad = (event: React.SyntheticEvent<HTMLImageElement>) => {
    const img = event.currentTarget;
    const dimensions = {
      width: img.naturalWidth,
      height: img.naturalHeight
    };
    setImageDimensions(dimensions);
  };

  // Handle image error
  const handleImageError = () => {
    // Image failed to load - could implement fallback here if needed
  };

  // Handle node click
  const handleNodeClick = (nodeId: number, event: React.MouseEvent) => {
    event.preventDefault();
    event.stopPropagation();
    
    // Check if this node has configuration data
    const nodeData = getNodeData(nodeId);
    if (!nodeData) {
      return;
    }

    // Check if node is unlocked
    if (!isNodeUnlocked(nodeId)) {
      return;
    }
    
    selectNode(nodeId);
    setIsModalOpen(true);
  };

  // Handle stat confirmation from modal
  const handleStatConfirm = (nodeId: number, selectedStat: SelectedStatWithLevel) => {
    handleStatSelect(nodeId, selectedStat);
  };

  // Handle modal close
  const handleModalClose = () => {
    setIsModalOpen(false);
    selectNode(null); // Clear selection
  };

  // Tooltip handlers
  const handleNodeMouseEnter = (nodeId: number, event: React.MouseEvent) => {
    const hasStats = hasNodeStats(nodeId);
    if (!hasStats) return; // Only show tooltip for nodes with stats

    // Clear any existing timeout
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
      tooltipTimeoutRef.current = null;
    }

    const rect = event.currentTarget.getBoundingClientRect();
    setTooltip({
      visible: true,
      nodeId,
      x: rect.left + rect.width / 2,
      y: rect.top
    });
  };

  const handleNodeMouseLeave = () => {
    // Add a small delay before hiding to prevent flickering
    tooltipTimeoutRef.current = setTimeout(() => {
      setTooltip(prev => ({ ...prev, visible: false }));
    }, 100);
  };

  // Get node visual state
  const getNodeState = (nodeId: number) => {
    const nodeData = getNodeData(nodeId);
    const hasConfig = !!nodeData;
    const hasStats = hasNodeStats(nodeId);
    const nodeStatData = getNodeStats(nodeId);
    const unlocked = isNodeUnlocked(nodeId);
    const zone = getNodeZone(nodeId);
    
    // No configuration data
    if (!hasConfig) {
      return {
        className: "absolute w-8 h-8 border border-gray-500/30 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-not-allowed z-10 flex items-center justify-center",
        bgColor: "transparent",
        borderColor: "border-gray-500/30",
        title: `Node ${nodeId} (No configuration)`,
        clickable: false
      };
    }
    
    // Node is locked (zone not unlocked)
    if (!unlocked) {
      const requiredHP = zone?.requiredHolyPower || 0;
      return {
        className: "absolute w-8 h-8 border border-red-500/50 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-not-allowed z-10 flex items-center justify-center bg-red-900/20",
        bgColor: "bg-red-900/20",
        borderColor: "border-red-500/50",
        title: `Node ${nodeId} (Locked - ${zone?.name || 'Unknown Zone'} requires ${requiredHP.toLocaleString()} HP)`,
        clickable: false
      };
    }
    
    // Node has stats configured
    if (hasStats) {
      const zoneColors = zone?.color || { border: "border-blue-400/70", background: "bg-blue-900/20", hover: "hover:bg-blue-800/30 hover:border-blue-300/90" };
      return {
        className: `absolute w-9 h-9 ${zoneColors.background} border ${zoneColors.border} rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${zoneColors.hover} transition-all duration-200 z-10 flex items-center justify-center hover:shadow-lg`,
        bgColor: `${zoneColors.background} ${zoneColors.hover}`,
        borderColor: `${zoneColors.border} ${zoneColors.hover}`,
        title: `Node ${nodeId} (${zone?.name || 'Zone'} - ${nodeStatData?.level ? `Level ${nodeStatData.level}` : 'Configured'}, +${nodeStatData?.holyPower || 0} HP)`,
        clickable: true
      };
    }
    
    // Node is available (unlocked but not configured)
    const zoneColors = zone?.color || { border: "border-yellow-400/50", background: "bg-yellow-900/20", hover: "hover:bg-yellow-800/30 hover:border-yellow-300/70" };
    return {
      className: `absolute w-8 h-8 border-2 ${zoneColors.border} rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer ${zoneColors.hover} transition-all duration-200 z-10 flex items-center justify-center hover:shadow-lg`,
      bgColor: `transparent ${zoneColors.hover}`,
      borderColor: `${zoneColors.border} ${zoneColors.hover}`,
      title: `Node ${nodeId} (${zone?.name || 'Zone'} - Available)`,
      clickable: true
    };
  };

  // Check if image is already loaded (for cached images) - only run once on mount
  useEffect(() => {
    const checkImageLoaded = () => {
      if (imageRef.current && imageRef.current.complete && imageRef.current.naturalWidth > 0) {
        const dimensions = {
          width: imageRef.current.naturalWidth,
          height: imageRef.current.naturalHeight
        };
        setImageDimensions(dimensions);
        return true;
      }
      return false;
    };

    // Check immediately
    if (!checkImageLoaded()) {
      // Fallback: set default dimensions after a delay if image doesn't load
      const fallbackTimer = setTimeout(() => {
        if (!checkImageLoaded()) {
          setImageDimensions({ width: 1200, height: 800 }); // Default dimensions
        }
      }, 2000);
      
      return () => clearTimeout(fallbackTimer);
    }
  }, []); // Empty dependency array - only run once on mount

  // Simple resize handler
  useEffect(() => {
    const handleResize = () => {
      // Let the library handle centering on resize
      if (transformComponentRef.current) {
        transformComponentRef.current.centerView();
      }
    };
    
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);



  // Cleanup tooltip timeout on unmount
  useEffect(() => {
    return () => {
      if (tooltipTimeoutRef.current) {
        clearTimeout(tooltipTimeoutRef.current);
      }
    };
  }, []);

  return (
    <div className="w-full max-w-[1200px] mx-auto">
      {/* System Controls */}
      <div className="mb-4">
        {/* System Header with Action Buttons and Zoom Controls */}
        <div className="flex justify-between items-center">
          <div className="flex items-center space-x-2">
            {/* Zoom Controls */}
            <button 
              className="game-button px-3 py-1 text-sm rounded flex items-center"
              onClick={() => transformComponentRef.current?.zoomIn()}
              title="Zoom in"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM10 7v3m0 0v3m0-3h3m-3 0H7"></path>
              </svg>
              Zoom In
            </button>
            <button 
              className="game-button px-3 py-1 text-sm rounded flex items-center disabled:opacity-50 disabled:cursor-not-allowed"
              onClick={() => transformComponentRef.current?.zoomOut()}
              disabled={currentScale <= 1}
              title="Zoom out"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0zM13 10H7"></path>
              </svg>
              Zoom Out
            </button>
            <button 
              className="game-button px-3 py-1 text-sm rounded flex items-center"
              onClick={() => transformComponentRef.current?.resetTransform()}
              title="Reset view"
            >
              <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
              </svg>
              Reset View
            </button>
          </div>
          <div className="flex items-center gap-4">
            <ActionButtons 
              onQuickFill={quickFillSystem}
              onReset={resetSystem}
            />
            <TotalStatsButton
              totalStats={totalStats}
              systemName="Myth Level"
            />
          </div>
        </div>
      </div>
      
      {/* Mythical Level System with Pan & Zoom */}
      <div 
        className="relative w-full bg-black rounded-lg shadow-2xl overflow-hidden"
        style={{ 
          aspectRatio: imageDimensions ? `${imageDimensions.width} / ${imageDimensions.height}` : '16 / 9',
          maxHeight: '80vh'
        }}
      >
        <TransformWrapper
          ref={transformComponentRef}
          initialScale={1}
          minScale={1}
          maxScale={3}
          centerOnInit={true}
          limitToBounds={true}
          centerZoomedOut={true}
          onZoom={({ state }) => {
            setCurrentScale(state.scale);
          }}
          onPanningStop={({ state }) => {
            // Auto-center if panned too far out of bounds
            if (transformComponentRef.current) {
              const { positionX, positionY, scale } = state;
              const container = transformComponentRef.current.instance.wrapperComponent;
              const content = transformComponentRef.current.instance.contentComponent;
              
              if (container && content) {
                const containerRect = container.getBoundingClientRect();
                const contentRect = content.getBoundingClientRect();
                
                // Check if content is significantly out of view
                const threshold = Math.min(containerRect.width, containerRect.height) * 0.1; // 10% threshold
                
                if (
                  contentRect.right < containerRect.left + threshold ||
                  contentRect.left > containerRect.right - threshold ||
                  contentRect.bottom < containerRect.top + threshold ||
                  contentRect.top > containerRect.bottom - threshold
                ) {
                  // Snap back to center view
                  setTimeout(() => {
                    transformComponentRef.current?.centerView();
                  }, 100);
                }
              }
            }
          }}
        >
          <TransformComponent>
            <div className="relative">
              {/* Image */}
              <img 
                ref={imageRef}
                src="/images/myth-level/myth-ui.png" 
                alt="Mythical Level System"
                style={{ 
                  display: 'block', 
                  width: '100%',
                  height: '100%',
                  objectFit: 'contain',
                  pointerEvents: 'none'
                }}
                draggable="false"
                onLoad={handleImageLoad}
                onError={handleImageError}
              />
              
              {/* Holy Power Rank Counter - Positioned at same height as node 2, to the left */}
              {imageDimensions && totalHolyPower > 0 && (() => {
                const currentRank = getRankByHolyPower(totalHolyPower);
                return (
                  <div
                    className="absolute w-20 h-20 bg-gradient-to-br from-yellow-400 to-yellow-600 rounded-full transform -translate-x-1/2 -translate-y-1/2 z-20 flex flex-col items-center justify-center shadow-lg border-2 border-yellow-300"
                    style={{
                      left: `${((256 - 120) / imageDimensions.width) * 100}%`, // 120px to the left of node 2
                      top: `${(437 / imageDimensions.height) * 100}%`, // Same height as node 2
                    }}
                    title={currentRank ? `${currentRank.name} - ${totalHolyPower} Holy Power` : `${totalHolyPower} Holy Power`}
                  >
                    <div className="text-xs font-bold text-black leading-none text-center px-1">
                      {currentRank ? currentRank.name.toUpperCase() : 'UNRANKED'}
                    </div>
                    <div className="text-sm font-bold text-black leading-none">{totalHolyPower}</div>
                  </div>
                );
              })()}

              {/* Invisible clickable node areas and visible stat icons */}
              {imageDimensions && mythLevelNodes.map((node) => {
                const nodeData = getNodeData(node.id);
                const isClickable = !!nodeData && isNodeUnlocked(node.id);
                const hasStats = hasNodeStats(node.id);
                const nodeStatData = getNodeStats(node.id);
                
                return (
                  <div
                    key={node.id}
                    className={hasStats ? 
                      "absolute w-9 h-9 bg-black/20 border border-blue-400/70 rounded-full transform -translate-x-1/2 -translate-y-1/2 cursor-pointer hover:bg-blue-900/20 hover:border-blue-300/90 transition-all duration-200 z-10 flex items-center justify-center hover:shadow-lg hover:shadow-blue-400/40" :
                      "absolute w-8 h-8 transform -translate-x-1/2 -translate-y-1/2 z-10"
                    }
                    style={{
                      left: `${(node.x / imageDimensions.width) * 100}%`,
                      top: `calc(${(node.y / imageDimensions.height) * 100}% - 1px)`,
                      cursor: isClickable ? 'pointer' : 'default',
                      backgroundColor: hasStats ? undefined : 'transparent'
                    }}
                    onClick={isClickable ? (e) => handleNodeClick(node.id, e) : undefined}
                  >
                    {/* Show stat icon only when node has configured stat */}
                    {hasStats && nodeStatData && (
                      <div
                        className="relative w-full h-full"
                        onMouseEnter={(e) => handleNodeMouseEnter(node.id, e)}
                        onMouseLeave={handleNodeMouseLeave}
                      >
                        <StatIcon
                          statId={nodeStatData.statKey}
                          width={36}
                          height={36}
                          className="rounded-full pointer-events-none"
                          fill={true}
                          circular={true}
                        />
                      </div>
                    )}
                  </div>
                );
              })}

              {/* Zone Overlays for locked zones */}
              <ZoneOverlays 
                key={`zone-overlays-${totalHolyPower}-${imageDimensions ? `${imageDimensions.width}x${imageDimensions.height}` : 'no-dims'}`}
                imageDimensions={imageDimensions} 
              />

            </div>
          </TransformComponent>
        </TransformWrapper>
        

      </div>
      


      {/* Stat Selection Modal */}
      {selectedNodeId && (
        <MythNodeStatModalEnhanced
          isOpen={isModalOpen}
          onClose={handleModalClose}
          nodeId={selectedNodeId}
          onStatConfirm={handleStatConfirm}
          currentStat={getNodeStats(selectedNodeId)}
        />
      )}

      {/* Tooltip - Rendered outside the pan/zoom area */}
      {tooltip.visible && tooltip.nodeId && (() => {
        const nodeStatData = getNodeStats(tooltip.nodeId);
        if (!nodeStatData) return null;

        return (
          <div
            className="fixed px-3 py-2 bg-black/95 border border-gray-600 rounded-lg text-sm text-white shadow-xl whitespace-nowrap z-50 pointer-events-none"
            style={{
              left: tooltip.x,
              top: tooltip.y - 10,
              transform: 'translate(-50%, -100%)'
            }}
          >
            {/* Small arrow at the bottom */}
            <div className="absolute left-1/2 bottom-0 transform -translate-x-1/2 translate-y-full">
              <div className="w-2 h-2 bg-black/95 border-r border-b border-gray-600 transform rotate-45"></div>
            </div>
            {/* Stat name and value */}
            <div className="font-bold">
              {getStatInfo(nodeStatData.statKey)?.name || nodeStatData.statKey}: +{nodeStatData?.value}
            </div>
            {/* Holy power */}
            <div className="text-yellow-400">
              Holy Power: +{nodeStatData?.holyPower}
            </div>
            {/* Current level */}
            <div className="text-gray-400">
              Level: {nodeStatData?.level}
            </div>
          </div>
        );
      })()}
    </div>
  );
}