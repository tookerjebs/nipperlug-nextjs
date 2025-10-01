/**
 * Collection Tracker Serializer
 * Handles export/import and URL sharing ONLY for collection tracker data
 * Completely separate from build planner data
 */

import * as LZString from 'lz-string';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';

// Define the structure for serialized collection data
export interface SerializedCollectionData {
  version: string;
  timestamp: number;
  collectionProgress: any;
  activeTab: string;
  activePage: number;
  activeCollection: string | null;
}

// Define the result types for serialization operations
export interface CollectionSerializationResult {
  success: boolean;
  data?: string;
  error?: string;
  size?: number;
  originalSize?: number;
  gistId?: string;
  shareUrl?: string;
}

export interface CollectionDeserializationResult {
  success: boolean;
  data?: SerializedCollectionData;
  error?: string;
}

// Gist API interfaces
interface GistFile {
  content: string;
}

interface GistData {
  description: string;
  public: boolean;
  files: {
    [filename: string]: GistFile;
  };
}

interface GistResponse {
  id: string;
  html_url: string;
  files: {
    [filename: string]: {
      content: string;
    };
  };
}

/**
 * Collection Tracker Serializer Class
 * Handles ONLY collection tracker data
 */
export class CollectionTrackerSerializer {
  private static readonly VERSION = '1.0.0';
  private static readonly MAX_URL_SIZE = 2048;
  private static readonly GIST_API_URL = 'https://api.github.com/gists';
  private static readonly GIST_FILENAME = 'collection-tracker-data.json';

  /**
   * Serialize current collection tracker data to JSON
   */
  public static serializeCollectionData(): SerializedCollectionData {
    const state = useCollectionTrackerStore.getState();
    
    return {
      version: this.VERSION,
      timestamp: Date.now(),
      collectionProgress: state.collectionProgress,
      activeTab: state.activeTab,
      activePage: state.activePage,
      activeCollection: state.activeCollection
    };
  }

  /**
   * Deserialize collection data and restore to store
   */
  public static deserializeCollectionData(data: SerializedCollectionData): CollectionDeserializationResult {
    try {
      // Version compatibility check
      if (!data.version || data.version !== this.VERSION) {
        console.warn(`Collection data version mismatch. Expected ${this.VERSION}, got ${data.version}`);
      }

      // Validate data structure
      if (!data.collectionProgress) {
        return {
          success: false,
          error: 'Invalid collection data: missing collection progress'
        };
      }

      // Restore collection tracker state
      const { 
        setActiveTab, 
        setActivePage, 
        setActiveCollection,
        resetAllProgress
      } = useCollectionTrackerStore.getState();
      
      // First reset all progress
      resetAllProgress();
      
      // Restore UI state
      if (data.activeTab) {
        setActiveTab(data.activeTab);
      }
      if (data.activePage) {
        setActivePage(data.activePage);
      }
      if (data.activeCollection) {
        setActiveCollection(data.activeCollection);
      }
      
      // Restore collection progress data
      useCollectionTrackerStore.setState({ 
        collectionProgress: data.collectionProgress
      });

      return {
        success: true,
        data
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Unknown deserialization error'
      };
    }
  }

  /**
   * Export collection data to downloadable JSON file
   */
  public static exportToFile(filename?: string): CollectionSerializationResult {
    try {
      const collectionData = this.serializeCollectionData();
      const jsonString = JSON.stringify(collectionData, null, 2);
      
      // Create and trigger download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filename || `collection-tracker-${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);

      return {
        success: true,
        data: jsonString,
        size: jsonString.length
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Export failed'
      };
    }
  }

  /**
   * Import collection data from JSON file
   */
  public static importFromFile(file: File): Promise<CollectionDeserializationResult> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const jsonString = event.target?.result as string;
          const collectionData = JSON.parse(jsonString) as SerializedCollectionData;
          
          const result = this.deserializeCollectionData(collectionData);
          resolve(result);
        } catch (error) {
          resolve({
            success: false,
            error: error instanceof Error ? error.message : 'Failed to parse JSON file'
          });
        }
      };
      
      reader.onerror = () => {
        resolve({
          success: false,
          error: 'Failed to read file'
        });
      };
      
      reader.readAsText(file);
    });
  }

  /**
   * Create a Gist with collection data
   */
  private static async createGist(collectionData: SerializedCollectionData): Promise<{ success: boolean; gistId?: string; error?: string }> {
    try {
      const response = await fetch('/api/share-build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buildData: collectionData })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        return { 
          success: false, 
          error: errorData.error || `Server error: ${response.status}` 
        };
      }

      const result = await response.json();
      
      if (result.success) {
        return { success: true, gistId: result.gistId };
      } else {
        return { success: false, error: result.error || 'Unknown server error' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to create Gist' 
      };
    }
  }

  /**
   * Fetch collection data from Gist
   */
  private static async fetchFromGist(gistId: string): Promise<{ success: boolean; data?: SerializedCollectionData; error?: string }> {
    try {
      const response = await fetch(`/api/share-build?gistId=${gistId}`, {
        headers: {
          'Accept': 'application/json'
        }
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        return { 
          success: false, 
          error: errorData.error || `Failed to fetch Gist: ${response.status}` 
        };
      }

      const result = await response.json();
      
      if (result.success) {
        return { success: true, data: result.data };
      } else {
        return { success: false, error: result.error || 'Failed to load Gist data' };
      }
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch from Gist' 
      };
    }
  }

  /**
   * Generate shareable URL for collection data only
   */
  public static async generateShareUrl(): Promise<CollectionSerializationResult> {
    try {
      const collectionData = this.serializeCollectionData();
      const jsonString = JSON.stringify(collectionData);
      const compressed = LZString.compressToEncodedURIComponent(jsonString);
      
      // Try direct URL sharing first
      if (compressed.length <= this.MAX_URL_SIZE) {
        if (typeof window === 'undefined') {
          return {
            success: false,
            error: 'URL generation requires browser environment'
          };
        }
        
        const urlParams = new URLSearchParams();
        urlParams.set('collection', compressed);
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
        return {
          success: true,
          data: compressed,
          shareUrl,
          size: compressed.length,
          originalSize: jsonString.length
        };
      }

      // Fallback to Gist for large collection data
      const gistResult = await this.createGist(collectionData);
      if (!gistResult.success) {
        return {
          success: false,
          error: `Collection data too large for URL sharing and Gist fallback failed: ${gistResult.error}`
        };
      }

      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'URL generation requires browser environment'
        };
      }
      
      const urlParams = new URLSearchParams();
      urlParams.set('collection', gistResult.gistId!);
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
      return {
        success: true,
        data: compressed,
        shareUrl,
        gistId: gistResult.gistId,
        size: compressed.length,
        originalSize: jsonString.length
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to generate share URL'
      };
    }
  }

  /**
   * Load collection data from URL parameters
   */
  public static async loadFromUrl(): Promise<CollectionDeserializationResult> {
    try {
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'URL loading requires browser environment'
        };
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      
      // Check for collection parameter (could be compressed data or Gist ID)
      const collectionParam = urlParams.get('collection');
      if (collectionParam) {
        // Check if it looks like a Gist ID (32 hex characters)
        const gistIdPattern = /^[a-f0-9]{32}$/i;
        if (gistIdPattern.test(collectionParam)) {
          // It's a Gist ID, fetch from Gist
          const gistResult = await this.fetchFromGist(collectionParam);
          if (!gistResult.success) {
            return {
              success: false,
              error: gistResult.error || 'Failed to load from Gist'
            };
          }
          return this.deserializeCollectionData(gistResult.data!);
        } else {
          // It's compressed collection data, decompress it
          return this.decompressFromURL(collectionParam);
        }
      }

      return {
        success: false,
        error: 'No collection data found in URL'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load collection data from URL'
      };
    }
  }

  /**
   * Decompress collection data from URL
   */
  private static decompressFromURL(compressed: string): CollectionDeserializationResult {
    try {
      const jsonString = LZString.decompressFromEncodedURIComponent(compressed);
      if (!jsonString) {
        return {
          success: false,
          error: 'Failed to decompress URL data'
        };
      }

      const collectionData = JSON.parse(jsonString) as SerializedCollectionData;
      return this.deserializeCollectionData(collectionData);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL decompression failed'
      };
    }
  }
}

// Export convenience functions
export const exportCollectionToFile = (filename?: string) => CollectionTrackerSerializer.exportToFile(filename);
export const importCollectionFromFile = (file: File) => CollectionTrackerSerializer.importFromFile(file);
export const generateCollectionShareUrl = () => CollectionTrackerSerializer.generateShareUrl();
export const loadCollectionFromUrl = () => CollectionTrackerSerializer.loadFromUrl();
