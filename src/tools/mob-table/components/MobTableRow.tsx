'use client';

import React from 'react';
import { MonsterStats } from '../../../lib/game-data/monsters/types';
import { TableColumn } from '../config/columns';
import { getDungeonName } from '../../../lib/game-data/monsters/dungeonMapping';

interface MobTableRowProps {
  monster: MonsterStats;
  visibleColumns: TableColumn[];
  onRowClick: (monster: MonsterStats) => void;
}

export const MobTableRow: React.FC<MobTableRowProps> = ({ monster, visibleColumns, onRowClick }) => {

  const getCellValue = (column: TableColumn): React.ReactNode => {
    const value = monster[column.key as keyof MonsterStats];
    
    switch (column.key) {
      case 'name':
        return (
          <span className={monster.serverBossType > 0 ? "font-bold text-stat-offensive" : "font-medium"}>
            {monster.name}
          </span>
        );
      case 'level':
        return isNaN(monster.level) ? 'N/A' : monster.level;
      case 'hp':
        return monster.hp;
      case 'exp':
        return monster.exp;

      case 'dungeonId':
        return (
          <span className="text-sm">
            {getDungeonName(monster.dungeonId)}
          </span>
        );
      default:
        if (typeof value === 'number') {
          return value;
        }
        return value?.toString() || 'N/A';
    }
  };

  return (
    <tr 
      className="hover:bg-theme-light transition-colors cursor-pointer group"
      onClick={() => onRowClick(monster)}
    >
      {visibleColumns.map((column, index) => (
        <td 
          key={column.key} 
          className={`px-4 py-3 text-foreground/80 text-sm group-hover:text-foreground transition-colors ${
            index < visibleColumns.length - 1 ? 'border-r border-border-dark' : ''
          }`}
          style={{ width: column.width }}
          title={getCellValue(column)?.toString() || ''}
        >
          <div className={`truncate ${column.key === 'name' || column.key === 'dungeonId' ? 'text-left' : 'text-center'}`}>
            {getCellValue(column)}
          </div>
        </td>
      ))}
    </tr>
  );
};