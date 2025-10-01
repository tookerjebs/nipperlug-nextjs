'use client';

/**
 * UpgradeSlider Component
 * Reusable compact slider component for upgrade levels
 * Based on the styling from EquipmentUpgradeModal (weapons, armor, vehicles)
 */

import React from 'react';

interface UpgradeSliderProps {
  label: string;
  value: number;
  minValue?: number;
  maxValue: number;
  onChange: (value: number) => void;
  labelWidth?: string;
  valueWidth?: string;
}

const UpgradeSlider: React.FC<UpgradeSliderProps> = ({
  label,
  value,
  minValue = 0,
  maxValue,
  onChange,
  labelWidth = "w-20",
  valueWidth = "w-12"
}) => {
  return (
    <div className="flex items-center space-x-3">
      <label className={`text-sm font-medium text-gray-300 ${labelWidth} flex-shrink-0`}>
        {label}:
      </label>
      <input
        type="range"
        min={minValue}
        max={maxValue}
        value={value}
        onChange={(e) => onChange(Number(e.target.value))}
        className="flex-1 h-2 bg-gray-700 rounded-lg appearance-none cursor-pointer range-lg-game"
      />
      <span className={`text-sm font-semibold text-game-highlight ${valueWidth} text-right`}>
        +{value}/{maxValue}
      </span>
    </div>
  );
};

export default UpgradeSlider;