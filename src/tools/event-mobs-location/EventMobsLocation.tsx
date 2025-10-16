'use client';

import { useState, useRef, useMemo } from 'react';
import {
  getAllEventMobs,
  getMobSpawnersOnMap,
  WORLD_ID_MAP,
  AVAILABLE_MAPS,
} from '@/lib/game-data/event-mobs';

interface TransformMatrix {
  scaleX: number;
  offsetX: number;
  scaleY: number;
  offsetY: number;
}

interface HoveredSpawner {
  x: number;
  y: number;
}

// Global calibration data - same for all maps
const CALIBRATION: TransformMatrix = {
  scaleX: 1.7100,
  offsetX: 41,
  scaleY: -1.6600,
  offsetY: 468.00,
};

// Convert game coordinates to pixel coordinates
function gameToPixel(gameX: number, gameY: number, transform: TransformMatrix) {
  const pixelX = transform.scaleX * gameX + transform.offsetX;
  const pixelY = transform.scaleY * gameY + transform.offsetY;
  return { pixelX, pixelY };
}

export default function EventMobsLocation() {
  const [selectedMapName, setSelectedMapName] = useState('Bloody Ice');
  const [selectedMob, setSelectedMob] = useState<string | null>(null);
  const [hoveredSpawner, setHoveredSpawner] = useState<HoveredSpawner | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  // Get all mobs
  const allMobs = useMemo(() => getAllEventMobs(), []);

  // Get spawners for selected mob on selected map
  const currentSpawners = useMemo(() => {
    if (!selectedMob) return [];
    return getMobSpawnersOnMap(selectedMob, selectedMapName);
  }, [selectedMob, selectedMapName]);

  // Map name to image filename conversion (handles special cases)
  const getMapImagePath = (mapName: string): string => {
    const specialMappings: Record<string, string> = {
      'Senillinea': 'seni',
    };

    const fileName = specialMappings[mapName] || mapName.toLowerCase();
    return `/images/maps/${fileName}.png`;
  };

  const mapImagePath = getMapImagePath(selectedMapName);

  return (
    <div className="min-h-screen text-foreground">
      <div className="container mx-auto max-w-7xl p-3 sm:p-4 md:p-5 lg:p-6">
        {/* Header Section */}
        <div className="component-bg-dark mb-6 sm:mb-8">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-game-gold glow-text-lg">
            Event Mobs Location
          </h1>
          <p className="text-foreground/60 text-sm leading-relaxed mt-2">
            Spawn locations for all Event Mobs in Cabal Online. Select a map and mob type to discover all spawn points to optimize your hunting routes.
          </p>
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-6 lg:gap-8">
          {/* Map Display */}
          <div className="flex-1 min-w-0">
            <div className="component-bg-light">
              <div className="glass-panel-dark p-3 sm:p-4 flex justify-center">
                <div className="relative" style={{ width: '510px', height: '510px' }}>
                  <img
                    ref={imageRef}
                    src={mapImagePath}
                    alt={selectedMapName}
                    style={{ width: '510px', height: '510px' }}
                  />
                  {/* Show selected mob spawners on image */}
                  {currentSpawners.length > 0 && (
                    <>
                      {currentSpawners.map((spawner, idx) => {
                        const pixel = gameToPixel(spawner.x, spawner.y, CALIBRATION);
                        const isHovered = hoveredSpawner?.x === spawner.x && hoveredSpawner?.y === spawner.y;
                        return (
                          <div
                            key={`spawner-${idx}`}
                            style={{
                              position: 'absolute',
                              width: isHovered ? '28px' : '20px',
                              height: isHovered ? '28px' : '20px',
                              backgroundColor: '#FFB700',
                              borderRadius: '50%',
                              left: `${pixel.pixelX}px`,
                              top: `${pixel.pixelY}px`,
                              transform: 'translate(-50%, -50%)',
                              boxShadow: 'none',
                              pointerEvents: 'auto',
                              cursor: 'pointer',
                              transition: 'all 0.2s ease-in-out',
                              border: 'none',
                            }}
                            onMouseEnter={() => setHoveredSpawner({ x: spawner.x, y: spawner.y })}
                            onMouseLeave={() => setHoveredSpawner(null)}
                          >
                            {isHovered && (
                              <div
                                style={{
                                  position: 'absolute',
                                  bottom: '100%',
                                  left: '50%',
                                  transform: 'translateX(-50%)',
                                  backgroundColor: 'rgba(0, 0, 0, 0.95)',
                                  color: '#FFD700',
                                  padding: '6px 10px',
                                  borderRadius: '4px',
                                  whiteSpace: 'nowrap',
                                  fontSize: '12px',
                                  fontWeight: 'bold',
                                  border: '1px solid #FFD700',
                                  marginBottom: '8px',
                                  zIndex: 10,
                                  boxShadow: '0 0 10px rgba(255, 215, 0, 0.6)',
                                }}
                              >
                                X: {spawner.x}, Y: {spawner.y}
                              </div>
                            )}
                          </div>
                        );
                      })}
                    </>
                  )}
                  {selectedMob && currentSpawners.length === 0 && (
                    <div className="absolute inset-0 flex items-center justify-center rounded" style={{ backgroundColor: 'rgba(0, 0, 0, 0.7)' }}>
                      <p className="text-foreground text-center px-4 font-semibold">
                        No spawners for<br />{selectedMob} on this map
                      </p>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Control Panel - Dropdowns Only */}
          <div className="lg:w-96 flex-shrink-0">
            <div className="component-bg-light sticky top-6">
              <div className="glass-panel space-y-6 p-4 sm:p-6">
                {/* Map Selector */}
                <div>
                  <label className="text-game-gold text-sm font-semibold block mb-3">Select Map:</label>
                  <select
                    value={selectedMapName}
                    onChange={(e) => {
                      setSelectedMapName(e.target.value);
                    }}
                    className="w-full text-sm sm:text-base cursor-pointer transition-colors"
                  >
                    {AVAILABLE_MAPS.map((map: string) => (
                      <option key={map} value={map}>{map}</option>
                    ))}
                  </select>
                </div>

                {/* Mob Selector */}
                <div>
                  <label className="text-game-gold text-sm font-semibold block mb-3">Select Mob Type:</label>
                  <select
                    value={selectedMob || ''}
                    onChange={(e) => setSelectedMob(e.target.value || null)}
                    className="w-full text-sm sm:text-base cursor-pointer transition-colors"
                  >
                    <option value="">-- All Mobs --</option>
                    {allMobs.map((mob: any) => (
                      <option key={mob.name} value={mob.name}>{mob.name}</option>
                    ))}
                  </select>
                </div>

                {/* Status Info */}
                {currentSpawners.length > 0 && (
                  <div className="mt-4">
                    <p className="text-foreground/50 text-sm italic">
                      📍 {currentSpawners.length} spawn location{currentSpawners.length !== 1 ? 's' : ''} for <span className="text-game-gold">{selectedMob}</span> found in <span className="text-game-gold">{selectedMapName}</span>
                    </p>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}