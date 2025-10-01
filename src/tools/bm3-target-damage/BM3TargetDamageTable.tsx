'use client';

import React, { useState } from 'react';
import { ClassIcon } from '../../components/ui/ClassIcon';

// Class damage data based on target count
interface ClassDamageData {
  className: string;
  iconPath: string;
  damageRanges: {
    targetRange: string;
    damageModifier: string;
  }[];
}

// Mapping of class names to their icon paths
const getClassIconPath = (className: string): string => {
  const iconMap: Record<string, string> = {
    'Blader': '/images/classes/blader_icon.png',
    'Force Archer': '/images/classes/force_archer_icon.png',
    'Force Gunner': '/images/classes/force_gunner_icon.png',
    'Force Blader': '/images/classes/force_blader_icon.png',
    'Gladiator': '/images/classes/gladiator_icon.png',
    'Warrior': '/images/classes/warrior_icon.png',
    'Force Shielder': '/images/classes/force_shielder_icon.png',
    'Wizard': '/images/classes/wizard_icon.png',
    'Dark Mage': '/images/classes/dark_mage_icon.png'
  };
  return iconMap[className] || '/images/classes/warrior_icon.png'; // fallback
};

const classData: ClassDamageData[] = [
  // First group: High single-target damage classes
  {
    className: 'Blader',
    iconPath: getClassIconPath('Blader'),
    damageRanges: [
      {
        targetRange: '1 target',
        damageModifier: '+35%'
      },
      {
        targetRange: '2-6 targets',
        damageModifier: '+12%'
      },
      {
        targetRange: '7+ targets',
        damageModifier: '0%'
      }
    ]
  },
  {
    className: 'Force Archer',
    iconPath: getClassIconPath('Force Archer'),
    damageRanges: [
      {
        targetRange: '1 target',
        damageModifier: '+30%'
      },
      {
        targetRange: '2+ targets',
        damageModifier: '0%'
      }
    ]
  },
  {
    className: 'Force Gunner',
    iconPath: getClassIconPath('Force Gunner'),
    damageRanges: [
      {
        targetRange: '1 target',
        damageModifier: '+30%'
      },
      {
        targetRange: '2+ targets',
        damageModifier: '0%'
      }
    ]
  },
  {
    className: 'Force Blader',
    iconPath: getClassIconPath('Force Blader'),
    damageRanges: [
      {
        targetRange: '1-7 targets',
        damageModifier: '+12%'
      },
      {
        targetRange: '8+ targets',
        damageModifier: '0%'
      }
    ]
  },
  // Second group: Medium damage boost classes
  {
    className: 'Gladiator',
    iconPath: getClassIconPath('Gladiator'),
    damageRanges: [
      {
        targetRange: '1-9 targets',
        damageModifier: '+10%'
      },
      {
        targetRange: '10+ targets',
        damageModifier: '0%'
      }
    ]
  },
  {
    className: 'Warrior',
    iconPath: getClassIconPath('Warrior'),
    damageRanges: [
      {
        targetRange: '1-9 targets',
        damageModifier: '+10%'
      },
      {
        targetRange: '10+ targets',
        damageModifier: '0%'
      }
    ]
  },
  {
    className: 'Force Shielder',
    iconPath: getClassIconPath('Force Shielder'),
    damageRanges: [
      {
        targetRange: '1-9 targets',
        damageModifier: '+10%'
      },
      {
        targetRange: '10+ targets',
        damageModifier: '0%'
      }
    ]
  },
  // Third group: No damage boost classes
  {
    className: 'Wizard',
    iconPath: getClassIconPath('Wizard'),
    damageRanges: [
      {
        targetRange: 'All target counts',
        damageModifier: 'No damage boost'
      }
    ]
  },
  {
    className: 'Dark Mage',
    iconPath: getClassIconPath('Dark Mage'),
    damageRanges: [
      {
        targetRange: 'All target counts',
        damageModifier: 'No damage boost'
      }
    ]
  }
];

export default function BM3TargetDamageTable() {
  const [hoveredClass, setHoveredClass] = useState<string | null>(null);

  // Helper function to get damage modifier styling
  const getDamageModifierStyle = (modifier: string) => {
    if (modifier.startsWith('+') && modifier !== 'No damage boost') {
      return 'text-green-400 bg-green-400/10 px-3 py-1 rounded font-bold';
    } else {
      return 'text-foreground/70 font-medium';
    }
  };

  return (
    <div className="space-y-6">
      {/* Main Table */}
      <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead className="bg-theme-dark border-b border-border-dark">
              <tr>
                <th className="px-4 py-3 text-left font-semibold border-r border-border-dark text-yellow-400">
                  Class
                </th>
                <th className="px-4 py-3 text-left font-semibold border-r border-border-dark text-yellow-400">
                  Target Range
                </th>
                <th className="px-4 py-3 text-center font-semibold text-yellow-400">
                  Damage Modifier
                </th>
              </tr>
            </thead>
            <tbody>
              {classData.map((classInfo, classIndex) => (
                <React.Fragment key={classInfo.className}>
                  {classInfo.damageRanges.map((range, index) => (
                    <tr 
                      key={`${classInfo.className}-${index}`}
                      className={`transition-colors ${
                        hoveredClass === classInfo.className 
                          ? 'bg-theme-light' 
                          : 'hover:bg-theme-light'
                      } ${
                        index === 0 && classIndex > 0 
                          ? 'border-t-2 border-gray-500/50' 
                          : 'border-t border-border-dark'
                      }`}
                      onMouseEnter={() => setHoveredClass(classInfo.className)}
                      onMouseLeave={() => setHoveredClass(null)}
                    >
                      {index === 0 && (
                        <td 
                          className="px-4 py-3 font-semibold border-r border-border-dark"
                          rowSpan={classInfo.damageRanges.length}
                        >
                          <div className="flex items-center gap-3">
                            <ClassIcon
                              iconPath={classInfo.iconPath}
                              width={32}
                              height={32}
                              alt={`${classInfo.className} Icon`}
                            />
                            <span className="text-base">{classInfo.className}</span>
                          </div>
                        </td>
                      )}
                      <td className="px-4 py-3 font-medium border-r border-border-dark">
                        {range.targetRange}
                      </td>
                      <td className="px-4 py-3 text-center">
                        <span className={getDamageModifierStyle(range.damageModifier)}>
                          {range.damageModifier}
                        </span>
                      </td>
                    </tr>
                  ))}
                </React.Fragment>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}