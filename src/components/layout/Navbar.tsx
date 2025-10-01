'use client';

import Link from 'next/link';
import Image from 'next/image';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { FiMenu, FiX } from 'react-icons/fi';
import { cn } from '../../utils/cn';
import SearchComponent from './SearchComponent';

interface NavigationItem {
  name: string;
  href: string;
  subItems?: (SubItem | CategoryItem)[];
}

interface SubItem {
  name: string;
  href: string;
}

interface CategoryItem {
  name: string;
  href: string;
  isCategory: true;
  items: SubItem[];
}

// Navigation items based on the migration plan
const navigationItems: NavigationItem[] = [
  { name: 'Build Planner', href: '/build-planner' },
  { name: 'Monster Database', href: '/monster-database' },
  { 
    name: 'Calculators', 
    href: '/calculators',
    subItems: [
      { 
        name: 'Profit Calculators', 
        href: '/profit-calculators',
        isCategory: true,
        items: [
          { name: 'Devil Shop', href: '/devils-shop-calculator' },
          { name: 'Chloe Craft', href: '/chloe-craft-profit-calculator' },
        ]
      },
      { 
        name: 'Other Calculators', 
        href: '/other-calculators',
        isCategory: true,
        items: [
          { name: 'Amity Calculator', href: '/chloe-amity-calculator' },
          { name: 'Extreme Upgrade Calculator', href: '/extreme-upgrade-calculator' },
        ]
      },
      { 
        name: 'EXP Calculators', 
        href: '/exp-calculators',
        isCategory: true,
        items: [
          { name: 'Character EXP', href: '/exp-calculator' },
          { name: 'Force Wing', href: '/force-wing-calculator' },
          { name: 'OXP', href: '/oxp-calculator' },
        ]
      },
    ]
  },
  { name: 'Stats Wiki', href: '/stats-wiki' },
  {
    name: 'Resources',
    href: '/resources',
    subItems: [
      { name: 'Collection Tracker', href: '/collection-tracker' },
      { name: 'Tier Lists', href: '/tier-lists' },
      { name: 'Myth Level Data', href: '/myth-level-data' },
      { name: 'Penetration Effectiveness', href: '/penetration-effectiveness-table' },
      { name: 'BM3 Target Damage', href: '/bm3-target-damage-boost' },
    ]
  },
];

export default function Navbar() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);
  const [openSubmenu, setOpenSubmenu] = useState<string | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleSubmenu = (name: string) => {
    setOpenSubmenu(openSubmenu === name ? null : name);
  };

  const handleSearchToggle = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleSearchClose = () => {
    setIsSearchOpen(false);
  };

  return (
    <div className="relative z-30">
      {/* TopBar-style Header */}
      <div className="relative">
        {/* Background Image Container with overflow-hidden */}
        <div className="absolute inset-0 overflow-hidden">
          <Image
            src="/images/homepage/xyzR4topbar.png"
            alt="Cabal Online Background"
            fill
            className="object-cover"
            priority
            sizes="100vw"
            quality={85}
          />
        </div>
        {/* Dark overlay for text readability */}
        <div className="absolute inset-0 bg-black/40 z-10" />
        {/* Bottom border */}
        <div className="absolute bottom-0 left-0 right-0 h-px bg-black/20 z-10" />
        
        <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-6 lg:px-8 relative z-20">
          <div className="flex justify-between items-center h-16 md:h-20">
            {/* Site Name/Brand */}
            <div className="flex items-center">
              <Link 
                href="/" 
                className="text-lg md:text-xl font-bold text-white drop-shadow-lg hover:text-game-highlight transition-colors"
                style={{ 
                  fontFamily: '"Trebuchet MS", "Lucida Grande", "Lucida Sans Unicode", "Lucida Sans", Tahoma, sans-serif',
                  letterSpacing: '0.05em',
                  textShadow: '0 0 10px rgba(255, 215, 0, 0.3), 0 2px 4px rgba(0, 0, 0, 0.8)'
                }}
              >
                Nipperlug
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden lg:flex lg:items-center lg:space-x-2">
              {navigationItems.map((item) => (
                <div key={item.name} className="relative group">
                  <Link
                    href={item.href}
                    className={cn(
                      "px-6 py-4 text-sm font-semibold text-white drop-shadow-lg rounded-lg transition-all duration-200 bg-black/60 backdrop-blur-sm border border-white/15",
                      "hover:text-game-highlight hover:bg-black/70 hover:border-white/25 hover:shadow-lg",
                      pathname === item.href && "text-game-highlight bg-black/80 border-game-highlight/30 shadow-lg"
                    )}
                  >
                    {item.name}
                    {item.subItems && (
                      <span className="ml-1 text-xs opacity-70">▼</span>
                    )}
                  </Link>
                  
                  {/* Dropdown for desktop */}
                  {item.subItems && (
                    <div className="absolute left-0 top-full w-64 hidden group-hover:block z-50 mt-1" style={{ 
                      background: 'rgba(20, 20, 30, 0.95)',
                      border: '1px solid var(--border-light)',
                      borderRadius: '0.5rem',
                      backdropFilter: 'blur(8px)'
                    }}>
                      <div className="py-2">
                        {item.subItems.map((subItem) => (
                          <div key={subItem.name}>
                            {'isCategory' in subItem ? (
                              <div>
                                <div className="px-4 py-2 text-xs font-medium text-game-gold uppercase tracking-wide border-b border-border-dark">
                                  {subItem.name}
                                </div>
                                {subItem.items.map((categoryItem: SubItem) => (
                                  <Link
                                    key={categoryItem.name}
                                    href={categoryItem.href}
                                    className={cn(
                                      "block px-6 py-2 text-sm pl-8 text-white hover:text-game-highlight hover:bg-white/10 transition-colors",
                                      pathname === categoryItem.href && "text-game-highlight bg-white/10"
                                    )}
                                  >
                                    {categoryItem.name}
                                  </Link>
                                ))}
                              </div>
                            ) : (
                              <Link
                                href={subItem.href}
                                className={cn(
                                  "block px-4 py-3 text-sm text-white hover:text-game-highlight hover:bg-white/10 transition-colors",
                                  pathname === subItem.href && "text-game-highlight bg-white/10"
                                )}
                              >
                                {subItem.name}
                              </Link>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>

            {/* Search and Mobile Menu */}
            <div className="flex items-center space-x-2">
              {/* Search Component */}
              <SearchComponent 
                isOpen={isSearchOpen}
                onToggle={handleSearchToggle}
                onClose={handleSearchClose}
              />

              {/* Mobile menu button */}
              <div className="lg:hidden">
                <button
                  onClick={() => setIsOpen(!isOpen)}
                  className="flex items-center justify-center px-4 py-4 text-white drop-shadow-lg rounded-lg transition-all duration-200 bg-black/60 backdrop-blur-sm border border-white/15 hover:text-game-highlight hover:bg-black/70 hover:border-white/25 hover:shadow-lg"
                >
                  <span className="sr-only">Open main menu</span>
                  {isOpen ? (
                    <FiX className="block h-5 w-5" aria-hidden="true" />
                  ) : (
                    <FiMenu className="block h-5 w-5" aria-hidden="true" />
                  )}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile menu */}
      {isOpen && (
        <div className="lg:hidden" style={{ 
          background: 'rgba(20, 20, 30, 0.95)',
          borderTop: '1px solid var(--border-light)',
          backdropFilter: 'blur(8px)'
        }}>
          <div className="px-4 pt-2 pb-4 space-y-1">
            {navigationItems.map((item) => (
              <div key={item.name}>
                <div className="flex items-center justify-between">
                  <Link
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-base font-medium text-white hover:text-game-highlight hover:bg-white/10 rounded-md transition-colors",
                      pathname === item.href && "text-game-highlight bg-white/10"
                    )}
                    onClick={() => {
                      if (!item.subItems) {
                        setIsOpen(false);
                      }
                    }}
                  >
                    {item.name}
                  </Link>
                  {item.subItems && (
                    <button
                      onClick={() => toggleSubmenu(item.name)}
                      className="px-4 py-3 text-white hover:text-game-highlight hover:bg-white/10 rounded-md transition-colors"
                      aria-label={`Toggle ${item.name} submenu`}
                    >
                      {openSubmenu === item.name ? '▲' : '▼'}
                    </button>
                  )}
                </div>
                
                {/* Mobile submenu */}
                {item.subItems && openSubmenu === item.name && (
                  <div className="pl-8 space-y-1 border-l border-border-dark ml-4">
                    {item.subItems.map((subItem) => (
                      <div key={subItem.name}>
                        {'isCategory' in subItem ? (
                          <div>
                            <div className="px-4 py-2 text-xs font-medium text-game-gold uppercase tracking-wide">
                              {subItem.name}
                            </div>
                            {subItem.items.map((categoryItem: SubItem) => (
                              <Link
                                key={categoryItem.name}
                                href={categoryItem.href}
                                className={cn(
                                  "block px-6 py-2 text-sm pl-8 font-normal text-white hover:text-game-highlight hover:bg-white/10 rounded-md transition-colors",
                                  pathname === categoryItem.href && "text-game-highlight bg-white/10"
                                )}
                                onClick={() => setIsOpen(false)}
                              >
                                {categoryItem.name}
                              </Link>
                            ))}
                          </div>
                        ) : (
                          <Link
                            href={subItem.href}
                            className={cn(
                              "block px-4 py-3 text-sm font-medium text-white hover:text-game-highlight hover:bg-white/10 rounded-md transition-colors",
                              pathname === subItem.href && "text-game-highlight bg-white/10"
                            )}
                            onClick={() => setIsOpen(false)}
                          >
                            {subItem.name}
                          </Link>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}