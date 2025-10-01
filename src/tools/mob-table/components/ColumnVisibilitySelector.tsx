'use client';

import React, { useState, useRef, useEffect } from 'react';
import { TableColumn, COLUMN_CATEGORIES } from '../config/columns';

interface ColumnVisibilitySelectorProps {
  columns: TableColumn[];
  onColumnToggle: (columnKey: string, visible: boolean) => void;
  onCategoryToggle: (category: string, visible: boolean) => void;
}

export const ColumnVisibilitySelector: React.FC<ColumnVisibilitySelectorProps> = ({
  columns,
  onColumnToggle,
  onCategoryToggle
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  // Group columns by category
  const columnsByCategory = columns.reduce((acc, column) => {
    if (!acc[column.category]) {
      acc[column.category] = [];
    }
    acc[column.category].push(column);
    return acc;
  }, {} as Record<string, TableColumn[]>);

  // Check if all columns in a category are visible
  const isCategoryVisible = (category: string) => {
    const categoryColumns = columnsByCategory[category] || [];
    const nonRequiredColumns = categoryColumns.filter(col => !col.required);
    return nonRequiredColumns.length > 0 && nonRequiredColumns.every(col => col.visible);
  };

  // Check if some columns in a category are visible (for indeterminate state)
  const isCategoryIndeterminate = (category: string) => {
    const categoryColumns = columnsByCategory[category] || [];
    const nonRequiredColumns = categoryColumns.filter(col => !col.required);
    const visibleCount = nonRequiredColumns.filter(col => col.visible).length;
    return visibleCount > 0 && visibleCount < nonRequiredColumns.length;
  };

  const handleCategoryToggle = (category: string) => {
    const isVisible = isCategoryVisible(category);
    onCategoryToggle(category, !isVisible);
  };

  return (
    <div className="relative" ref={dropdownRef}>
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center gap-2 px-4 py-2 glass-panel border border-border-dark text-foreground rounded-md hover:border-border-light transition-colors"
      >
        <span>Column Visibility</span>
        <svg
          className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 glass-panel-dark border border-border-dark rounded-lg shadow-game z-50 max-h-96 overflow-y-auto dark-scrollbar">
          <div className="p-4">
            <h3 className="text-sm font-semibold text-game-gold mb-3">Show/Hide Columns</h3>
            
            {Object.entries(COLUMN_CATEGORIES).map(([categoryKey, categoryName]) => {
              const categoryColumns = columnsByCategory[categoryKey] || [];
              if (categoryColumns.length === 0) return null;

              return (
                <div key={categoryKey} className="mb-4">
                  <div className="flex items-center mb-2">
                    <label className="flex items-center gap-2 text-sm font-medium text-foreground/90 cursor-pointer">
                      <input
                        type="checkbox"
                        checked={isCategoryVisible(categoryKey)}
                        ref={(input) => {
                          if (input) {
                            input.indeterminate = isCategoryIndeterminate(categoryKey);
                          }
                        }}
                        onChange={() => handleCategoryToggle(categoryKey)}
                        className="w-4 h-4 text-stat-offensive bg-component-card border-border-dark rounded focus:ring-stat-offensive focus:ring-2"
                      />
                      {categoryName}
                    </label>
                  </div>
                  
                  <div className="ml-6 space-y-1">
                    {categoryColumns.map((column) => (
                      <label
                        key={column.key}
                        className={`flex items-center gap-2 text-sm cursor-pointer ${
                          column.required 
                            ? 'text-foreground/50 cursor-not-allowed' 
                            : 'text-foreground/80 hover:text-foreground'
                        }`}
                      >
                        <input
                          type="checkbox"
                          checked={column.visible}
                          disabled={column.required}
                          onChange={(e) => onColumnToggle(column.key, e.target.checked)}
                          className="w-3 h-3 text-stat-offensive bg-component-card border-border-dark rounded focus:ring-stat-offensive focus:ring-1 disabled:opacity-50"
                        />
                        {column.title}
                        {column.required && (
                          <span className="text-xs text-foreground/40">(required)</span>
                        )}
                      </label>
                    ))}
                  </div>
                </div>
              );
            })}

            <div className="pt-3 border-t border-border-dark">
              <button
                onClick={() => {
                  // Reset to default visibility
                  columns.forEach(column => {
                    if (!column.required) {
                      const defaultColumn = columns.find(c => c.key === column.key);
                      if (defaultColumn) {
                        onColumnToggle(column.key, defaultColumn.visible);
                      }
                    }
                  });
                }}
                className="text-xs text-stat-offensive hover:text-stat-offensive/80 transition-colors"
              >
                Reset to Default
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};