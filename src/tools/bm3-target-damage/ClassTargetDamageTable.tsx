'use client';

import React from 'react';

// Class damage data based on target count
interface ClassDamageData {
  className: string;
  shortName: string;
  damageRanges: {
    targetRange: string;
    damageModifier: string;
    description: string;
    colorClass: string;
  }[];
  notes?: string;
}

const classData: ClassDamageData[] = [
  {
    className: 'Wizard',
    shortName: 'WI',
    damageRanges: [
      {
        targetRange: 'Any targets',
        damageModifier: '0%',
        description: 'Same damage regardless of targets',
        colorClass: 'bg-gray-800/50 text-gray-200'
      }
    ],
    notes: 'Consistent damage output across all scenarios'
  },
  {
    className: 'Force Blader',
    shortName: 'FB',
    damageRanges: [
      {
        targetRange: '1-7 targets',
        damageModifier: '+12%',
        description: 'Damage boost',
        colorClass: 'bg-green-800/50 text-green-200'
      },
      {
        targetRange: '8+ targets',
        damageModifier: '0%',
        description: 'Base damage',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ]
  },
  {
    className: 'Gladiator',
    shortName: 'GL',
    damageRanges: [
      {
        targetRange: '1-9 targets',
        damageModifier: '+10%',
        description: 'Damage boost',
        colorClass: 'bg-green-800/50 text-green-200'
      },
      {
        targetRange: '10+ targets',
        damageModifier: '0%',
        description: 'Base damage',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ]
  },
  {
    className: 'Blader',
    shortName: 'BL',
    damageRanges: [
      {
        targetRange: '1 target',
        damageModifier: '+35%',
        description: 'Maximum damage',
        colorClass: 'bg-green-900/50 text-green-300'
      },
      {
        targetRange: '2-6 targets',
        damageModifier: '+12%',
        description: 'Damage boost',
        colorClass: 'bg-green-800/50 text-green-200'
      },
      {
        targetRange: '7+ targets',
        damageModifier: '0%',
        description: 'Base damage (minimum)',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ],
    notes: 'Excels at single-target scenarios'
  },
  {
    className: 'Force Archer',
    shortName: 'FA',
    damageRanges: [
      {
        targetRange: '1 target',
        damageModifier: '+30%',
        description: 'Damage boost',
        colorClass: 'bg-green-900/50 text-green-300'
      },
      {
        targetRange: '2+ targets',
        damageModifier: '0%',
        description: 'Base damage',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ],
    notes: 'Single-target specialist'
  },
  {
    className: 'Force Gunner',
    shortName: 'FG',
    damageRanges: [
      {
        targetRange: '1 target',
        damageModifier: '+30%',
        description: 'Damage boost',
        colorClass: 'bg-green-900/50 text-green-300'
      },
      {
        targetRange: '2+ targets',
        damageModifier: '0%',
        description: 'Base damage',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ],
    notes: 'Single-target specialist'
  },
  {
    className: 'Dark Mage',
    shortName: 'DM',
    damageRanges: [
      {
        targetRange: 'Any targets',
        damageModifier: '0%',
        description: 'Same damage regardless of targets',
        colorClass: 'bg-gray-800/50 text-gray-200'
      }
    ],
    notes: 'Consistent damage output across all scenarios'
  },
  {
    className: 'Force Shielder',
    shortName: 'FS',
    damageRanges: [
      {
        targetRange: '1-9 targets',
        damageModifier: '+10%',
        description: 'Damage boost',
        colorClass: 'bg-green-800/50 text-green-200'
      },
      {
        targetRange: '10+ targets',
        damageModifier: '0%',
        description: 'Base damage',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ]
  },
  {
    className: 'Warrior',
    shortName: 'WA',
    damageRanges: [
      {
        targetRange: '1-9 targets',
        damageModifier: '+10%',
        description: 'Damage boost',
        colorClass: 'bg-green-800/50 text-green-200'
      },
      {
        targetRange: '10+ targets',
        damageModifier: '0%',
        description: 'Base damage',
        colorClass: 'bg-yellow-800/50 text-yellow-200'
      }
    ]
  }
];

// Group classes by damage pattern
const groupClassesByPattern = () => {
  const groups = {
    singleTarget: [] as ClassDamageData[],
    multiTarget: [] as ClassDamageData[],
    consistent: [] as ClassDamageData[]
  };

  classData.forEach(classInfo => {
    if (classInfo.damageRanges.length === 1 && classInfo.damageRanges[0].damageModifier === '0%') {
      groups.consistent.push(classInfo);
    } else if (classInfo.damageRanges.some(range => range.targetRange.includes('1 target'))) {
      groups.singleTarget.push(classInfo);
    } else {
      groups.multiTarget.push(classInfo);
    }
  });

  return groups;
};

const getPatternInfo = (pattern: string) => {
  switch (pattern) {
    case 'singleTarget':
      return { 
        label: 'Single-Target Specialists', 
        color: 'border-green-500 bg-green-500/5', 
        textColor: 'text-green-400',
        description: 'Classes that excel with fewer targets'
      };
    case 'multiTarget':
      return { 
        label: 'Multi-Target Optimized', 
        color: 'border-blue-500 bg-blue-500/5', 
        textColor: 'text-blue-400',
        description: 'Classes with damage bonuses up to medium target counts'
      };
    case 'consistent':
      return { 
        label: 'Consistent Damage', 
        color: 'border-gray-500 bg-gray-500/5', 
        textColor: 'text-gray-400',
        description: 'Classes with no target count modifiers'
      };
    default:
      return { label: '', color: '', textColor: '', description: '' };
  }
};

export default function ClassTargetDamageTable() {
  const groupedClasses = groupClassesByPattern();

  return (
    <div className="space-y-6">
      {/* Overview Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-component-card border border-border-dark p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-green-400">Single-Target Masters</h3>
          <p className="text-sm text-foreground/80 mb-2">
            Classes that deal maximum damage to single targets with significant bonuses.
          </p>
          <div className="text-xs text-foreground/60">
            Best for: Boss fights, 1v1 PvP, Elite monsters
          </div>
        </div>
        <div className="bg-component-card border border-border-dark p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-blue-400">Multi-Target Balanced</h3>
          <p className="text-sm text-foreground/80 mb-2">
            Classes with damage bonuses for small to medium groups of targets.
          </p>
          <div className="text-xs text-foreground/60">
            Best for: Small group farming, dungeon clearing
          </div>
        </div>
        <div className="bg-component-card border border-border-dark p-4 rounded-lg">
          <h3 className="text-lg font-semibold mb-2 text-gray-400">Consistent Output</h3>
          <p className="text-sm text-foreground/80 mb-2">
            Classes that maintain the same damage regardless of target count.
          </p>
          <div className="text-xs text-foreground/60">
            Best for: Versatile gameplay, predictable damage
          </div>
        </div>
      </div>

      {/* Main Table */}
      <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead>
              <tr className="bg-theme-darker border-b border-border-dark">
                <th className="sticky left-0 bg-theme-darker p-4 text-left font-semibold border-r border-border-dark">
                  Class
                </th>
                <th className="p-4 text-left font-semibold min-w-[150px]">
                  Target Range
                </th>
                <th className="p-4 text-center font-semibold min-w-[120px]">
                  Damage Modifier
                </th>
                <th className="p-4 text-left font-semibold min-w-[200px]">
                  Description
                </th>
                <th className="p-4 text-left font-semibold min-w-[250px]">
                  Notes
                </th>
              </tr>
            </thead>
            <tbody>
              {Object.entries(groupedClasses).map(([pattern, classList]) => {
                if (classList.length === 0) return null;
                const patternInfo = getPatternInfo(pattern);
                
                return (
                  <React.Fragment key={pattern}>
                    {/* Pattern Header Row */}
                    <tr className={`border-2 ${patternInfo.color}`}>
                      <td 
                        colSpan={5} 
                        className={`p-3 text-center font-bold ${patternInfo.textColor} ${patternInfo.color}`}
                      >
                        {patternInfo.label} - {patternInfo.description}
                      </td>
                    </tr>
                    
                    {/* Class Rows for this pattern */}
                    {classList.map((classInfo) => (
                      <React.Fragment key={classInfo.className}>
                        {classInfo.damageRanges.map((range, index) => (
                          <tr 
                            key={`${classInfo.className}-${index}`}
                            className={`border-b border-border-dark/50 hover:bg-theme-light/30 ${patternInfo.color}`}
                          >
                            {index === 0 && (
                              <td 
                                className={`sticky left-0 bg-component-card p-4 font-semibold border-r border-border-dark ${patternInfo.color}`}
                                rowSpan={classInfo.damageRanges.length}
                              >
                                <div className="flex items-center gap-2">
                                  <span className="text-base">{classInfo.className}</span>
                                  <span className="text-xs text-foreground/60 bg-theme-dark px-2 py-1 rounded">
                                    {classInfo.shortName}
                                  </span>
                                </div>
                              </td>
                            )}
                            <td className="p-4 font-medium">
                              {range.targetRange}
                            </td>
                            <td className={`p-4 text-center font-bold ${range.colorClass} rounded`}>
                              {range.damageModifier}
                            </td>
                            <td className="p-4 text-foreground/80">
                              {range.description}
                            </td>
                            {index === 0 && (
                              <td 
                                className="p-4 text-foreground/70 text-sm"
                                rowSpan={classInfo.damageRanges.length}
                              >
                                {classInfo.notes || '-'}
                              </td>
                            )}
                          </tr>
                        ))}
                      </React.Fragment>
                    ))}
                  </React.Fragment>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* Key Insights */}
      <div className="bg-component-card border border-border-dark p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Key Insights</h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
          <div className="space-y-2">
            <div className="font-semibold text-green-300">Single-Target Optimization</div>
            <ul className="space-y-1 text-foreground/80">
              <li>• <strong>Blader</strong> has the highest single-target bonus (+35%)</li>
              <li>• <strong>Force Archer</strong> and <strong>Force Gunner</strong> excel at 1v1 scenarios (+30%)</li>
              <li>• These classes are ideal for boss fights and elite monsters</li>
              <li>• Consider these classes for content with fewer, stronger enemies</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-blue-300">Multi-Target Balance</div>
            <ul className="space-y-1 text-foreground/80">
              <li>• <strong>Force Blader</strong> maintains +12% up to 7 targets</li>
              <li>• <strong>Gladiator</strong>, <strong>Force Shielder</strong>, and <strong>Warrior</strong> get +10% up to 9 targets</li>
              <li>• Good for small group farming and dungeon clearing</li>
              <li>• Balanced approach between single and mass target scenarios</li>
            </ul>
          </div>
          <div className="space-y-2">
            <div className="font-semibold text-gray-300">Consistent Classes</div>
            <ul className="space-y-1 text-foreground/80">
              <li>• <strong>Wizard</strong> and <strong>Dark Mage</strong> have no target modifiers</li>
              <li>• Predictable damage output in all scenarios</li>
              <li>• Good for versatile gameplay styles</li>
              <li>• Damage optimization focuses on other factors</li>
            </ul>
          </div>
        </div>
      </div>

      {/* Usage Recommendations */}
      <div className="bg-component-card border border-border-dark p-6 rounded-lg">
        <h3 className="text-lg font-semibold mb-4">Content Recommendations</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-3">
            <div className="font-semibold text-yellow-300">PvE Content</div>
            <div className="space-y-2 text-sm">
              <div className="bg-theme-dark p-3 rounded">
                <div className="font-medium text-green-300 mb-1">Boss Fights & Elite Monsters</div>
                <div className="text-foreground/80">Blader, Force Archer, Force Gunner excel with their single-target bonuses</div>
              </div>
              <div className="bg-theme-dark p-3 rounded">
                <div className="font-medium text-blue-300 mb-1">Small Group Farming</div>
                <div className="text-foreground/80">Force Blader, Gladiator, Warrior, Force Shielder perform well</div>
              </div>
              <div className="bg-theme-dark p-3 rounded">
                <div className="font-medium text-purple-300 mb-1">Mass Farming</div>
                <div className="text-foreground/80">All classes perform similarly at high target counts</div>
              </div>
            </div>
          </div>
          <div className="space-y-3">
            <div className="font-semibold text-orange-300">PvP Content</div>
            <div className="space-y-2 text-sm">
              <div className="bg-theme-dark p-3 rounded">
                <div className="font-medium text-green-300 mb-1">1v1 Duels</div>
                <div className="text-foreground/80">Single-target specialists have significant advantages</div>
              </div>
              <div className="bg-theme-dark p-3 rounded">
                <div className="font-medium text-blue-300 mb-1">Small Group PvP</div>
                <div className="text-foreground/80">Multi-target balanced classes maintain good damage</div>
              </div>
              <div className="bg-theme-dark p-3 rounded">
                <div className="font-medium text-red-300 mb-1">Large Scale PvP</div>
                <div className="text-foreground/80">Target count bonuses become less significant</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}