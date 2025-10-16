'use client';

import { useState, useRef, useMemo } from 'react';

interface MobLocation {
  x: number;
  y: number;
  type: 'cabal' | 'jack';
}

interface TransformMatrix {
  scaleX: number;
  offsetX: number;
  scaleY: number;
  offsetY: number;
}

// Mob locations data from lantern_locations.txt
const MOB_DATA: Record<string, { cabal: MobLocation[]; jack: MobLocation[] }> = {
  'green despair': {
    cabal: [{ x: 199, y: 187, type: 'cabal' }],
    jack: [
      { x: 16, y: 90, type: 'jack' },
      { x: 20, y: 230, type: 'jack' },
      { x: 21, y: 26, type: 'jack' },
      { x: 42, y: 14, type: 'jack' },
      { x: 62, y: 226, type: 'jack' },
      { x: 67, y: 76, type: 'jack' },
      { x: 72, y: 234, type: 'jack' },
      { x: 84, y: 123, type: 'jack' },
      { x: 101, y: 195, type: 'jack' },
      { x: 106, y: 44, type: 'jack' },
      { x: 108, y: 80, type: 'jack' },
      { x: 109, y: 127, type: 'jack' },
      { x: 119, y: 40, type: 'jack' },
      { x: 170, y: 161, type: 'jack' },
      { x: 170, y: 120, type: 'jack' },
      { x: 198, y: 86, type: 'jack' },
      { x: 212, y: 243, type: 'jack' },
      { x: 218, y: 120, type: 'jack' },
      { x: 226, y: 229, type: 'jack' },
      { x: 241, y: 176, type: 'jack' },
    ],
  },
};

// Baked-in calibration data for Green Despair
const CALIBRATION_DATA: Record<string, TransformMatrix> = {
  'green despair': {
    scaleX: 1.8846,
    offsetX: 39.42,
    scaleY: -1.6858,
    offsetY: 464.09,
  },
};

// Convert game coordinates to pixel coordinates
function gameToPixel(gameX: number, gameY: number, transform: TransformMatrix) {
  const pixelX = transform.scaleX * gameX + transform.offsetX;
  const pixelY = transform.scaleY * gameY + transform.offsetY;
  return { pixelX, pixelY };
}

export default function MapCalibrator() {
  const [selectedMap] = useState('green despair');
  const imageRef = useRef<HTMLImageElement>(null);

  const transformMatrix = useMemo(() => {
    return CALIBRATION_DATA[selectedMap] || null;
  }, [selectedMap]);

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">Green Despair - Event Mob Locations</h1>
        <p className="text-gray-400">
          🔴 Red = Cabal Lanterns (1) | 🟡 Yellow = Jack O' Lanterns (20)
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-8">
        {/* Map Display */}
        <div className="flex-1">
          <div className="bg-gray-800 p-4 rounded">
            <div className="relative inline-block">
              <img
                ref={imageRef}
                src="/images/maps/green-despair.png"
                alt="Green Despair"
                className="w-full max-w-2xl border-2 border-gray-600 rounded"
              />
              {/* Show mobs on image */}
              {transformMatrix && MOB_DATA['green despair'] && (
                <>
                  {/* Cabal Lanterns */}
                  {MOB_DATA['green despair'].cabal.map((mob, idx) => {
                    const pixel = gameToPixel(mob.x, mob.y, transformMatrix);
                    return (
                      <div
                        key={`cabal-${idx}`}
                        className="absolute w-4 h-4 rounded-full pointer-events-none"
                        style={{
                          backgroundColor: '#ff4444',
                          left: `${(pixel.pixelX / 510) * 100}%`,
                          top: `${(pixel.pixelY / 510) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: '0 0 12px rgba(255, 68, 68, 1), 0 0 25px rgba(255, 68, 68, 0.6)',
                        }}
                        title={`Cabal Lantern: Game (${mob.x}, ${mob.y})`}
                      />
                    );
                  })}
                  {/* Jack O' Lanterns */}
                  {MOB_DATA['green despair'].jack.map((mob, idx) => {
                    const pixel = gameToPixel(mob.x, mob.y, transformMatrix);
                    return (
                      <div
                        key={`jack-${idx}`}
                        className="absolute w-2 h-2 rounded-full pointer-events-none"
                        style={{
                          backgroundColor: '#ffd700',
                          left: `${(pixel.pixelX / 510) * 100}%`,
                          top: `${(pixel.pixelY / 510) * 100}%`,
                          transform: 'translate(-50%, -50%)',
                          boxShadow: '0 0 8px rgba(255, 215, 0, 1), 0 0 15px rgba(255, 215, 0, 0.6)',
                        }}
                        title={`Jack O' Lantern: Game (${mob.x}, ${mob.y})`}
                      />
                    );
                  })}
                </>
              )}
            </div>
          </div>
        </div>

        {/* Info Panel */}
        <div className="lg:w-80">
          <div className="bg-gray-800 p-6 rounded space-y-6">
            <div>
              <h2 className="text-xl font-bold mb-4">Calibration Data</h2>
              <div className="bg-gray-700 p-4 rounded text-sm font-mono space-y-2">
                <p className="text-gray-300">
                  <span className="text-blue-400">pixelX</span> = 1.8846 × <span className="text-green-400">gameX</span> + 39.42
                </p>
                <p className="text-gray-300">
                  <span className="text-blue-400">pixelY</span> = -1.6858 × <span className="text-green-400">gameY</span> + 464.09
                </p>
              </div>
            </div>

            <div>
              <h3 className="font-bold mb-3">Mob Summary</h3>
              <div className="space-y-2 text-sm">
                <p className="flex items-center gap-2">
                  <span className="w-3 h-3 rounded-full" style={{ backgroundColor: '#ff4444' }}></span>
                  <span>Cabal Lanterns: <span className="font-bold text-yellow-400">1</span></span>
                </p>
                <p className="flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full" style={{ backgroundColor: '#ffd700' }}></span>
                  <span>Jack O' Lanterns: <span className="font-bold text-yellow-400">20</span></span>
                </p>
                <p className="text-gray-400 pt-2 border-t border-gray-600">
                  <span className="font-bold">Total:</span> 21 mobs
                </p>
              </div>
            </div>

            <div className="text-xs text-gray-400 pt-4 border-t border-gray-600">
              <p>Hover over any dot to see its game coordinates.</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}