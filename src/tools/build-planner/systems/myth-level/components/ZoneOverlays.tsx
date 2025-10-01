'use client';

import { useMythLevelStore } from '../stores/mythLevelStore';
import { mythZones } from '../data/mythZoneConfig';
import { useEffect, useState } from 'react';

interface ZoneOverlaysProps {
  imageDimensions: { width: number; height: number } | null;
}

export default function ZoneOverlays({ imageDimensions }: ZoneOverlaysProps) {
  const { totalHolyPower } = useMythLevelStore();
  const [isReady, setIsReady] = useState(false);

  // Ensure component re-renders when imageDimensions becomes available
  useEffect(() => {
    if (imageDimensions) {
      setIsReady(true);
    } else {
      setIsReady(false);
    }
  }, [imageDimensions]);

  // Don't render if image dimensions are not available
  if (!imageDimensions) {
    return null;
  }

  // Don't render if not ready
  if (!isReady) {
    return null;
  }

  // Calculate zone boundaries based on node positions
  const getZoneBounds = (zoneId: number) => {
    const zone = mythZones.find(z => z.id === zoneId);
    if (!zone) return null;

    // Define approximate zone boundaries based on the node ranges
    // Fill the full viewport height for each zone
    const zoneBounds = {
      1: { left: 280, top: 0, width: 220, height: imageDimensions.height },   // Zone 1: nodes 1-16
      2: { left: 500, top: 0, width: 150, height: imageDimensions.height },   // Zone 2: nodes 17-31  
      3: { left: 650, top: 0, width: 150, height: imageDimensions.height },   // Zone 3: nodes 32-46
      4: { left: 800, top: 0, width: 150, height: imageDimensions.height },   // Zone 4: nodes 47-62
      5: { left: 950, top: 0, width: imageDimensions.width - 950, height: imageDimensions.height },   // Zone 5: nodes 63-78 - fills remaining width
    };

    return zoneBounds[zoneId as keyof typeof zoneBounds] || null;
  };

  return (
    <>
      {mythZones.map(zone => {
        const isUnlocked = totalHolyPower >= zone.requiredHolyPower;
        const bounds = getZoneBounds(zone.id);
        
        if (isUnlocked || !bounds) return null;

        return (
          <div
            key={zone.id}
            className="absolute bg-black/50 border border-red-500/30 rounded-lg flex items-center justify-center z-20 backdrop-blur-sm"
            style={{
              left: `${(bounds.left / imageDimensions.width) * 100}%`,
              top: `${(bounds.top / imageDimensions.height) * 100}%`,
              width: `${(bounds.width / imageDimensions.width) * 100}%`,
              height: `${(bounds.height / imageDimensions.height) * 100}%`,
            }}
          >
            <div className="text-center text-white p-2">
              <div className="text-lg font-bold text-red-400 mb-1">🔒</div>
              <div className="text-sm font-semibold">{zone.name}</div>
              <div className="text-xs text-gray-300 mb-2">Locked</div>
              <div className="text-xs text-yellow-400">
                Requires {zone.requiredHolyPower.toLocaleString()} HP
              </div>
              <div className="text-xs text-gray-400 mt-1">
                Need {(zone.requiredHolyPower - totalHolyPower).toLocaleString()} more
              </div>
            </div>
          </div>
        );
      })}
    </>
  );
}