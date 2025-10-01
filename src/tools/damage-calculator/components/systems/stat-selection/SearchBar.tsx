'use client';

/**
 * SearchBar component for filtering stats in the StatSelectionModal
 */
import React from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange }) => {
  return (
    <div className="relative">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
      <input
        type="text"
        placeholder="Search stats..."
        value={searchTerm}
        onChange={(e) => onSearchChange(e.target.value)}
        className="w-full pl-10 pr-4 py-2 bg-theme-light border border-border-dark rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-border-light"
      />
    </div>
  );
};

// Use React.memo to prevent unnecessary re-renders
export default React.memo(SearchBar);