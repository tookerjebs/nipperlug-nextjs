'use client';

import Link from 'next/link';
import { useState } from 'react';
import { FiSearch, FiX } from 'react-icons/fi';

interface SearchPage {
  name: string;
  href: string;
  description: string;
}

interface SearchComponentProps {
  isOpen: boolean;
  onToggle: () => void;
  onClose: () => void;
}

// Define searchable pages/tools
const searchablePages: SearchPage[] = [
  { name: 'Build Planner', href: '/build-planner', description: 'Character build optimization tool' },
  { name: 'Monster Database', href: '/monster-database', description: 'Complete monster information' },
  { name: 'Collection Tracker', href: '/collection-tracker', description: 'Track your collection progress' },
  { name: 'Tier Lists', href: '/tier-lists', description: 'Class rankings for different content' },
  { name: 'Stats Wiki', href: '/stats-wiki', description: 'Game mechanics and stats explanations' },
  { name: 'Character EXP Calculator', href: '/exp-calculator', description: 'Level progression planning' },
  { name: 'Force Wing Calculator', href: '/force-wing-calculator', description: 'Wing upgrade planning' },
  { name: 'OXP Calculator', href: '/oxp-calculator', description: 'Overlord experience calculations' },
  { name: 'Devil Shop Calculator', href: '/devils-shop-calculator', description: 'Token exchange optimization' },
  { name: 'Chloe Craft Calculator', href: '/chloe-craft-profit-calculator', description: 'Crafting profit analysis' },
  { name: 'Chloe Amity Calculator', href: '/chloe-amity-calculator', description: 'Amity costs and requirements' },
  { name: 'Extreme Upgrade Calculator', href: '/extreme-upgrade-calculator', description: 'Success rates and costs' },
  { name: 'Penetration Effectiveness', href: '/penetration-effectiveness-table', description: 'Stat effectiveness visualization' },
];

export default function SearchComponent({ isOpen, onToggle, onClose }: SearchComponentProps) {
  const [searchQuery, setSearchQuery] = useState('');

  const filteredPages = searchablePages.filter(page =>
    page.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    page.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (filteredPages.length > 0) {
      window.location.href = filteredPages[0].href;
    }
  };

  const handleClose = () => {
    onClose();
    setSearchQuery('');
  };

  const handleResultClick = () => {
    handleClose();
  };

  return (
    <>
      {/* Search Button */}
      <button
        onClick={onToggle}
        className="flex items-center gap-2 px-4 py-3 text-sm font-semibold text-white drop-shadow-lg rounded-lg transition-all duration-200 bg-black/20 backdrop-blur-sm border border-white/10 hover:text-game-highlight hover:bg-black/30 hover:border-white/20 hover:shadow-lg"
        aria-label="Search tools and pages"
      >
        <FiSearch className="w-4 h-4" />
        <span className="hidden sm:inline">Search</span>
      </button>

      {/* Search Overlay */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={handleClose}
          />
          
          {/* Search Modal */}
          <div className="absolute top-full left-1/2 transform -translate-x-1/2 z-50 w-full max-w-2xl mt-2">
            <div 
              className="border border-border-light shadow-2xl rounded-lg mx-4 backdrop-blur-md"
              style={{ 
                background: 'rgba(20, 20, 30, 0.95)'
              }}
            >
              <div className="px-4 py-4">
                {/* Search Input */}
                <form onSubmit={handleSearchSubmit} className="relative">
                  <div className="relative">
                    <FiSearch className="absolute left-3 top-1/2 transform -translate-y-1/2 text-white/60 w-4 h-4" />
                    <input
                      type="text"
                      placeholder="Search tools, calculators, guides..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-10 py-2.5 bg-black/30 border border-white/20 rounded-lg text-white placeholder-white/60 focus:outline-none focus:border-white/40 focus:bg-black/40 transition-all"
                      autoFocus
                    />
                    <button
                      type="button"
                      onClick={handleClose}
                      className="absolute right-3 top-1/2 transform -translate-y-1/2 text-white/60 hover:text-white/80"
                    >
                      <FiX className="w-4 h-4" />
                    </button>
                  </div>
                </form>

                {/* Search Results */}
                {searchQuery && (
                  <div className="mt-3 max-h-64 overflow-y-auto">
                    {filteredPages.length > 0 ? (
                      <div className="space-y-1">
                        {filteredPages.slice(0, 8).map((page) => (
                          <Link
                            key={page.href}
                            href={page.href}
                            prefetch={false}
                            onClick={handleResultClick}
                            className="block p-3 rounded-md bg-black/20 hover:bg-black/30 border border-white/10 hover:border-white/20 transition-all group"
                          >
                            <div className="text-white group-hover:text-game-highlight font-medium text-sm">
                              {page.name}
                            </div>
                            <div className="text-white/70 text-xs mt-1">
                              {page.description}
                            </div>
                          </Link>
                        ))}
                        {filteredPages.length > 8 && (
                          <div className="text-center py-2 text-white/60 text-xs">
                            {filteredPages.length - 8} more results...
                          </div>
                        )}
                      </div>
                    ) : (
                      <div className="text-center py-4 text-white/60">
                        No results found for "{searchQuery}"
                      </div>
                    )}
                  </div>
                )}
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}