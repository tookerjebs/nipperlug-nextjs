'use client';

import React, { useState, useMemo } from 'react';
import { useMonsterData } from '../../lib/hooks/useMonsterData';
import { MonsterSearchFilters, MonsterStats } from '../../lib/game-data/monsters/types';
import { MobTableFilters } from './components/MobTableFilters';
import { MobTableRow } from './components/MobTableRow';
import { ColumnVisibilitySelector } from './components/ColumnVisibilitySelector';
import { MonsterDetailsModal } from './components/MonsterDetailsModal';
import { SortableTableHeader } from './components/SortableTableHeader';
import { DEFAULT_COLUMNS, TableColumn, SortConfig, SortDirection } from './config/columns';

export const MobTable: React.FC = () => {
  const { isLoading, error, searchMonsters, getDungeonIds } = useMonsterData();
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<MonsterSearchFilters>({});
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(25);
  const [columns, setColumns] = useState<TableColumn[]>(DEFAULT_COLUMNS);
  const [sortConfig, setSortConfig] = useState<SortConfig>({ key: 'Name', direction: 'asc' });
  const [selectedMonster, setSelectedMonster] = useState<MonsterStats | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSorting, setIsSorting] = useState(false);

  // Get dungeon IDs for filter dropdown
  const dungeonIds = useMemo(() => getDungeonIds(), [getDungeonIds]);

  // Get visible columns
  const visibleColumns = useMemo(() => columns.filter(col => col.visible), [columns]);

  // Search, filter, and sort monsters
  const filteredAndSortedMonsters = useMemo(() => {
    if (isLoading) return [];
    
    let monsters = searchMonsters(searchTerm, filters, 5000); // Get all results for proper sorting
    
    // Apply sorting - always sort since we only have asc/desc states
    monsters.sort((a, b) => {
      let aValue = a[sortConfig.key as keyof MonsterStats];
      let bValue = b[sortConfig.key as keyof MonsterStats];
      
      // Handle null/undefined values
      if (aValue == null && bValue == null) return 0;
      if (aValue == null) return sortConfig.direction === 'asc' ? 1 : -1;
      if (bValue == null) return sortConfig.direction === 'asc' ? -1 : 1;
      
      // Handle different data types
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return sortConfig.direction === 'asc' ? aValue - bValue : bValue - aValue;
      }
      
      // Handle boolean values
      if (typeof aValue === 'boolean' && typeof bValue === 'boolean') {
        const aNum = aValue ? 1 : 0;
        const bNum = bValue ? 1 : 0;
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // String comparison (case-insensitive)
      const aStr = aValue.toString().toLowerCase();
      const bStr = bValue.toString().toLowerCase();
      
      // Try to parse as numbers for better numeric sorting
      const aNum = parseFloat(aStr);
      const bNum = parseFloat(bStr);
      
      if (!isNaN(aNum) && !isNaN(bNum)) {
        return sortConfig.direction === 'asc' ? aNum - bNum : bNum - aNum;
      }
      
      // Fallback to string comparison
      return sortConfig.direction === 'asc' ? aStr.localeCompare(bStr) : bStr.localeCompare(aStr);
    });
    
    return monsters;
  }, [searchMonsters, searchTerm, filters, isLoading, sortConfig]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedMonsters.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedMonsters = filteredAndSortedMonsters.slice(startIndex, startIndex + itemsPerPage);

  // Reset to first page when filters or items per page change
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm, filters, itemsPerPage]);

  // Handler functions
  const handleSort = (key: string) => {
    setIsSorting(true);
    setSortConfig(prevSort => {
      if (prevSort.key === key) {
        // Cycle through: asc -> desc -> asc (only two states)
        const newDirection: SortDirection = 
          prevSort.direction === 'asc' ? 'desc' : 'asc';
        return { key, direction: newDirection };
      } else {
        return { key, direction: 'asc' };
      }
    });
    // Reset sorting state after a brief delay
    setTimeout(() => setIsSorting(false), 100);
  };

  const handleColumnToggle = (columnKey: string, visible: boolean) => {
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.key === columnKey ? { ...col, visible } : col
      )
    );
  };

  const handleCategoryToggle = (category: string, visible: boolean) => {
    setColumns(prevColumns => 
      prevColumns.map(col => 
        col.category === category && !col.required 
          ? { ...col, visible } 
          : col
      )
    );
  };

  const handleRowClick = (monster: MonsterStats) => {
    setSelectedMonster(monster);
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedMonster(null);
  };

  if (isLoading) {
    return (
      <div className="min-h-screen text-foreground p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-stat-offensive mx-auto"></div>
            <p className="text-foreground/60 mt-4">Loading monster data...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen text-foreground p-8">
        <div className="max-w-7xl mx-auto">
          <div className="text-center py-12">
            <p className="text-stat-offensive text-lg">{error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen text-foreground p-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="component-bg-dark mb-6">
          <h1 className="text-3xl font-bold text-game-gold glow-text-lg mb-2">Monster Database - EP39</h1>
          <p className="text-foreground/80 mb-3">
            Complete Cabal Online monster database with searchable stats, damage values, and combat information for up to EP39.
          </p>
          
          <div className="text-sm text-foreground/60 space-y-1">
            <p><strong>Search & Filter:</strong> Find monsters by name, level, dungeon, or boss status</p>
            <p><strong>Sort Data:</strong> Click column headers to sort by any stat (ascending/descending)</p>
            <p><strong>Customize View:</strong> Show/hide columns to focus on the stats you need</p>
            <p><strong>Detailed Info:</strong> Click any row to view complete monster statistics and abilities</p>
          </div>
        </div>

        {/* Filters and Controls */}
        <div className="space-y-4 mb-6">
          <MobTableFilters
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            filters={filters}
            onFiltersChange={setFilters}
            dungeonIds={dungeonIds}
          />
          
          {/* Controls Row */}
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
              <ColumnVisibilitySelector
                columns={columns}
                onColumnToggle={handleColumnToggle}
                onCategoryToggle={handleCategoryToggle}
              />
              
              {/* Items per page selector */}
              <div className="flex items-center gap-2">
                <label className="text-foreground/80 text-sm font-medium">Show:</label>
                <select
                  value={itemsPerPage}
                  onChange={(e) => setItemsPerPage(Number(e.target.value))}
                  className="px-3 py-1 bg-component-card border border-border-dark rounded-md text-foreground text-sm focus:outline-none focus:border-stat-offensive transition-colors"
                >
                  <option value={10}>10</option>
                  <option value={25}>25</option>
                  <option value={50}>50</option>
                  <option value={100}>100</option>
                </select>
                <span className="text-foreground/60 text-sm">entries</span>
              </div>
              
              {/* Results Summary */}
              <div className="text-foreground/60 text-sm">
                <p>
                  Showing {paginatedMonsters.length} of {filteredAndSortedMonsters.length} monsters
                  {searchTerm && ` matching "${searchTerm}"`}
                </p>
                <p className="mt-1">
                  Click column headers to sort • Click rows for detailed stats
                </p>
              </div>
            </div>

            {/* Pagination - Top */}
            {totalPages > 1 && (
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => setCurrentPage(Math.max(1, currentPage - 1))}
                  disabled={currentPage === 1}
                  className="px-3 py-2 glass-panel border border-border-dark text-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-border-light transition-colors text-sm"
                >
                  Previous
                </button>
                
                <div className="flex space-x-1">
                  {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                    let pageNum;
                    if (totalPages <= 5) {
                      pageNum = i + 1;
                    } else if (currentPage <= 3) {
                      pageNum = i + 1;
                    } else if (currentPage >= totalPages - 2) {
                      pageNum = totalPages - 4 + i;
                    } else {
                      pageNum = currentPage - 2 + i;
                    }
                    
                    return (
                      <button
                        key={pageNum}
                        onClick={() => setCurrentPage(pageNum)}
                        className={`px-3 py-2 rounded-md transition-colors text-sm ${
                          currentPage === pageNum
                            ? 'bg-stat-offensive text-white border border-stat-offensive glow-border'
                            : 'glass-panel border border-border-dark text-foreground/70 hover:border-border-light hover:text-foreground'
                        }`}
                      >
                        {pageNum}
                      </button>
                    );
                  })}
                </div>

                <button
                  onClick={() => setCurrentPage(Math.min(totalPages, currentPage + 1))}
                  disabled={currentPage === totalPages}
                  className="px-3 py-2 glass-panel border border-border-dark text-foreground rounded-md disabled:opacity-50 disabled:cursor-not-allowed hover:border-border-light transition-colors text-sm"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Table */}
        <div className="bg-component-card border border-border-dark rounded-lg overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full table-fixed" style={{ minWidth: '1000px' }}>
              <thead className="bg-theme-dark border-b border-border-dark sticky top-0 z-10">
                <tr>
                  {visibleColumns.map((column, index) => (
                    <SortableTableHeader
                      key={column.key}
                      title={column.title}
                      sortKey={column.key}
                      currentSort={sortConfig}
                      onSort={handleSort}
                      sortable={column.sortable}
                      width={column.width}
                      isLastColumn={index === visibleColumns.length - 1}
                    />
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border-dark">
                {paginatedMonsters.length > 0 ? (
                  paginatedMonsters.map((monster) => (
                    <MobTableRow 
                      key={monster.id} 
                      monster={monster} 
                      visibleColumns={visibleColumns}
                      onRowClick={handleRowClick}
                    />
                  ))
                ) : (
                  <tr>
                    <td colSpan={visibleColumns.length} className="px-4 py-8 text-center text-foreground/60">
                      {isLoading ? (
                        <div className="flex items-center justify-center gap-2">
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-stat-offensive"></div>
                          Loading monsters...
                        </div>
                      ) : (
                        'No monsters found matching your criteria.'
                      )}
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>



        {/* Footer Info */}
        <div className="mt-8 text-center text-foreground/60 text-sm space-y-2">
          <p>
            <strong className="text-game-gold">Monster Database Features:</strong> Real-time search, advanced filtering, sortable columns, and detailed stat viewing
          </p>
          <p>
            Data includes HP, defense, damage reduction, resistances, attack patterns, and dungeon locations for all Cabal Online monsters
          </p>
        </div>

        {/* Monster Details Modal */}
        <MonsterDetailsModal
          monster={selectedMonster}
          isOpen={isModalOpen}
          onClose={handleCloseModal}
        />
      </div>
    </div>
  );
};