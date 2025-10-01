/**
 * Price Store for Cabal Online Calculators
 * Manages item prices with localStorage persistence
 */

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface PriceEntry {
  price: number;
  timestamp: string;
  source: 'user' | 'api' | 'npc';
}

export interface PriceData {
  [itemName: string]: PriceEntry;
}

interface PriceStore {
  prices: PriceData;
  isLoading: boolean;
  lastApiUpdate: string | null;
  apiError: string | null;
  
  // Actions
  setPrice: (itemName: string, price: number, source?: 'user' | 'api' | 'npc') => void;
  getPrice: (itemName: string) => number | null;
  getPriceWithSource: (itemName: string) => PriceEntry | null;
  hasPrice: (itemName: string) => boolean;
  removePrice: (itemName: string) => void;
  clearAllPrices: () => void;
  clearUserPrices: () => void;
  
  // Bulk operations
  importPrices: (prices: Record<string, number>, source?: 'user' | 'api') => void;
  exportPrices: () => Record<string, number>;
  
  // API integration
  updateFromApi: () => Promise<void>;
  updateSpecificItemsFromApi: (itemNames: string[]) => Promise<void>;
  isApiDataStale: (maxAgeHours?: number) => boolean;
  
  // Manual hydration for client-side loading
  hydrate: () => void;
}

// Simple normalization: remove spaces and lowercase
const normalizeItemName = (name: string): string => {
  return name.toLowerCase().replace(/\s+/g, '');
};

// NPC prices (these are fixed and don't change)
const NPC_PRICES: Record<string, number> = {
  "Shape Cartridge(Lv. 1)": 400,
  "Merit Medal Trade Certificate": 3000000,
  "Flame Disc(Lv. 1)": 400,
  "Dark Disc(Lv. 1)": 400,
  "Holy Disc(Lv. 1)": 400,
  "Air Disc(Lv. 1)": 400,
  "Thunder Disc(Lv. 1)": 400,
  "Bloody Disc(Lv. 1)": 400,
  "Earth Disc(Lv. 1)": 400,
  "Aqua Disc(Lv. 1)": 400,
  "Soul Disc(Lv. 1)": 400,
  "Mixture(Lv. 1)": 8000,
  "Mixture(Lv. 2)": 9000,
  "Mixture(Lv. 3)": 10000,
  "Mixture(Lv. 4)": 11000,
  "Mixture(Lv. 5)": 12000,
  "Mixture(Lv. 6)": 13000,
  "Mixture(Lv. 7)": 14000,
  "Raw Stone of Dimension": 100000,
  "The Soul Key": 10000000
};

export const usePriceStore = create<PriceStore>()(
  persist(
    (set, get) => ({
      prices: {},
      isLoading: false,
      lastApiUpdate: null,
      apiError: null,
      
      setPrice: (itemName: string, price: number, source: 'user' | 'api' | 'npc' = 'user') => {
        set(state => ({
          prices: {
            ...state.prices,
            [itemName]: {
              price,
              timestamp: new Date().toISOString(),
              source
            }
          }
        }));
      },
      
      getPrice: (itemName: string) => {
        const state = get();
        
        // Try exact match first
        if (state.prices[itemName]) {
          return state.prices[itemName].price;
        }
        if (NPC_PRICES[itemName]) {
          return NPC_PRICES[itemName];
        }
        
        // Try normalized match
        const normalizedName = normalizeItemName(itemName);
        for (const key in state.prices) {
          if (normalizeItemName(key) === normalizedName) {
            return state.prices[key].price;
          }
        }
        for (const key in NPC_PRICES) {
          if (normalizeItemName(key) === normalizedName) {
            return NPC_PRICES[key];
          }
        }
        
        return null;
      },

      getPriceWithSource: (itemName: string) => {
        const state = get();
        
        // Try exact match first
        if (state.prices[itemName]) {
          return state.prices[itemName];
        }
        if (NPC_PRICES[itemName]) {
          return {
            price: NPC_PRICES[itemName],
            timestamp: new Date().toISOString(),
            source: 'npc' as const
          };
        }
        
        // Try normalized match
        const normalizedName = normalizeItemName(itemName);
        for (const key in state.prices) {
          if (normalizeItemName(key) === normalizedName) {
            return state.prices[key];
          }
        }
        for (const key in NPC_PRICES) {
          if (normalizeItemName(key) === normalizedName) {
            return {
              price: NPC_PRICES[key],
              timestamp: new Date().toISOString(),
              source: 'npc' as const
            };
          }
        }
        
        return null;
      },
      
      hasPrice: (itemName: string) => {
        return get().getPrice(itemName) !== null;
      },
      
      removePrice: (itemName: string) => {
        set(state => {
          const newPrices = { ...state.prices };
          delete newPrices[itemName];
          return { prices: newPrices };
        });
      },
      
      clearAllPrices: () => {
        set({ prices: {}, lastApiUpdate: null, apiError: null });
      },

      clearUserPrices: () => {
        set(state => {
          const newPrices: PriceData = {};
          // Keep only API prices
          Object.entries(state.prices).forEach(([itemName, entry]) => {
            if (entry.source === 'api') {
              newPrices[itemName] = entry;
            }
          });
          return { prices: newPrices };
        });
      },
      
      importPrices: (prices: Record<string, number>, source: 'user' | 'api' = 'user') => {
        const timestamp = new Date().toISOString();
        const priceEntries: PriceData = {};
        
        Object.entries(prices).forEach(([itemName, price]) => {
          priceEntries[itemName] = {
            price,
            timestamp,
            source
          };
        });
        
        set(state => ({
          prices: { ...state.prices, ...priceEntries },
          ...(source === 'api' && { lastApiUpdate: timestamp, apiError: null })
        }));
      },
      
      exportPrices: () => {
        const state = get();
        const exported: Record<string, number> = {};
        
        Object.entries(state.prices).forEach(([itemName, entry]) => {
          exported[itemName] = entry.price;
        });
        
        return exported;
      },

      updateFromApi: async () => {
        set({ isLoading: true, apiError: null });
        
        try {
          // TODO: Replace with actual API endpoint when available
          // const response = await fetch('/api/market-prices');
          // const data = await response.json();
          
          // Mock implementation for now
          await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
          
          // When real API is available, uncomment this:
          // get().importPrices(data.prices, 'api');
          
          set({ isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            apiError: error instanceof Error ? error.message : 'Failed to fetch prices from API'
          });
        }
      },

      updateSpecificItemsFromApi: async (itemNames: string[]) => {
        set({ isLoading: true, apiError: null });
        
        try {
          // TODO: Replace with actual API endpoint when available
          // const response = await fetch('/api/market-prices', {
          //   method: 'POST',
          //   headers: { 'Content-Type': 'application/json' },
          //   body: JSON.stringify({ items: itemNames })
          // });
          // const data = await response.json();
          
          // Mock implementation for now
          await new Promise(resolve => setTimeout(resolve, 500));
          
          set({ isLoading: false });
        } catch (error) {
          set({ 
            isLoading: false, 
            apiError: error instanceof Error ? error.message : 'Failed to fetch specific item prices'
          });
        }
      },

      isApiDataStale: (maxAgeHours: number = 24) => {
        const state = get();
        if (!state.lastApiUpdate) return true;
        
        const lastUpdate = new Date(state.lastApiUpdate);
        const now = new Date();
        const hoursDiff = (now.getTime() - lastUpdate.getTime()) / (1000 * 60 * 60);
        
        return hoursDiff > maxAgeHours;
      },

      // Manual hydration method for client-side loading
      hydrate: () => {
        if (typeof window === 'undefined') return;
        
        try {
          const stored = localStorage.getItem('cabal-prices');
          if (stored) {
            const parsed = JSON.parse(stored);
            if (parsed?.state?.prices) {
              set({ 
                prices: parsed.state.prices,
                lastApiUpdate: parsed.state.lastApiUpdate || null,
                apiError: parsed.state.apiError || null
              });
            }
          }
        } catch (error) {
          console.warn('Failed to hydrate price store:', error);
        }
      }
    }),
    {
      name: 'cabal-prices', // localStorage key (matches WordPress version)
      version: 1,
      // Skip hydration to avoid SSR/client mismatches - prices load instantly on client
      skipHydration: true,
    }
  )
);

// Helper functions
export function formatPrice(price: number | null): string {
  if (price === null) return 'No price';
  const rounded = Math.round(price);
  const formatted = rounded.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
  return formatted + ' Alz';
}

export function getNpcPrice(itemName: string): number | null {
  return NPC_PRICES[itemName] || null;
}

export function isNpcItem(itemName: string): boolean {
  return NPC_PRICES[itemName] !== undefined;
}

// Additional helper functions for API integration
export function getPriceAge(priceEntry: PriceEntry): number {
  const now = new Date();
  const priceTime = new Date(priceEntry.timestamp);
  return (now.getTime() - priceTime.getTime()) / (1000 * 60 * 60); // Hours
}

export function isPriceStale(priceEntry: PriceEntry, maxAgeHours: number = 24): boolean {
  return getPriceAge(priceEntry) > maxAgeHours;
}

export function formatPriceWithSource(priceEntry: PriceEntry | null): string {
  if (!priceEntry) return 'No price';
  
  const priceStr = priceEntry.price.toLocaleString() + ' Alz';
  const sourceIcon = {
    user: '👤',
    api: '🌐', 
    npc: '🏪'
  }[priceEntry.source];
  
  return `${priceStr} ${sourceIcon}`;
}

export function getItemsNeedingPrices(itemNames: string[], getPrice: (name: string) => number | null): string[] {
  return itemNames.filter(name => !isNpcItem(name) && getPrice(name) === null);
}

export function getStaleApiPrices(prices: PriceData, maxAgeHours: number = 24): string[] {
  return Object.entries(prices)
    .filter(([_, entry]) => entry.source === 'api' && isPriceStale(entry, maxAgeHours))
    .map(([itemName]) => itemName);
}

