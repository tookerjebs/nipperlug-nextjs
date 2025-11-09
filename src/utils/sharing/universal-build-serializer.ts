/**
 * Universal Build Serialization Service
 * Handles export/import, localStorage saving, and URL sharing for all game systems
 * Uses LZ-String compression for efficient data storage and sharing
 */

import * as LZString from 'lz-string';
import { SystemSerializer, getDefaultSystemSerializers } from './system-serializers';

// Define the structure for serialized build data
export interface SerializedBuildData {
  version: string;
  timestamp: number;
  systems: {
    [systemId: string]: any; // Allow dynamic system registration
    // Known systems (for reference, but not required)
    pet?: any;
    stellar?: any;
    honorMedal?: any;
    equipment?: any;
    essenceRune?: any;
    karmaRune?: any;
    achievement?: any;
    collection?: any;
    overlordMastery?: any;
    passiveSkills?: any;
    mythLevel?: any;
    class?: any;
    goldMerit?: any;
    platinumMerit?: any;
    'force-wing'?: any;
    artifact?: any;
  };
}

// Define the result types for serialization operations
export interface SerializationResult {
  success: boolean;
  data?: string;
  error?: string;
  size?: number;
  originalSize?: number; // Size before compression
  gistId?: string; // For Gist-based sharing
  shareUrl?: string; // Complete shareable URL
}

export interface DeserializationResult {
  success: boolean;
  data?: SerializedBuildData;
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
 * Universal Build Serializer Class
 * Handles all build sharing operations with LZ-String compression
 */
export class UniversalBuildSerializer {
  private static readonly VERSION = '1.0.0';
  private static readonly MAX_URL_SIZE = 2048; // 2KB limit for IE compatibility
  private static readonly GIST_API_URL = 'https://api.github.com/gists';
  private static readonly GIST_FILENAME = 'cabal-build.json';
  
  // GitHub API token - should be set via environment or config
  private static GITHUB_TOKEN: string | null = null;
  
  // System registry for automatic serialization
  private static systemRegistry: SystemSerializer[] = [];
  
  /**
   * Set GitHub API token for Gist operations
   */
  public static setGitHubToken(token: string): void {
    this.GITHUB_TOKEN = token;
  }

  /**
   * Register a system for automatic serialization
   */
  public static registerSystem(serializer: SystemSerializer): void {
    // Remove existing registration for the same system
    this.systemRegistry = this.systemRegistry.filter(s => s.systemId !== serializer.systemId);
    // Add the new registration
    this.systemRegistry.push(serializer);
  }

  /**
   * Initialize default system registrations
   */
  private static initializeDefaultSystems(): void {
    if (this.systemRegistry.length > 0) return; // Already initialized

    // Register all default systems
    const defaultSerializers = getDefaultSystemSerializers();
    defaultSerializers.forEach(serializer => {
      this.registerSystem(serializer);
    });
  }

  /**
   * Extract current state from all registered systems
   */
  private static extractSystemStates(): SerializedBuildData['systems'] {
    this.initializeDefaultSystems();
    const systems: SerializedBuildData['systems'] = {};

    for (const serializer of this.systemRegistry) {
      try {
        systems[serializer.systemId] = serializer.extract();
      } catch (error) {
        console.warn(`Failed to extract ${serializer.systemId} system state:`, error);
      }
    }

    return systems;
  }

  /**
   * Restore states to all registered systems
   */
  private static restoreSystemStates(systems: SerializedBuildData['systems']): void {
    this.initializeDefaultSystems();

    for (const serializer of this.systemRegistry) {
      const systemData = systems[serializer.systemId];
      if (systemData) {
        try {
          serializer.restore(systemData);
        } catch (error) {
          console.error(`Failed to restore ${serializer.systemId} system state:`, error);
        }
      }
    }
  }

  /**
   * Serialize current build to JSON
   */
  public static serializeBuild(): SerializedBuildData {
    return {
      version: this.VERSION,
      timestamp: Date.now(),
      systems: this.extractSystemStates()
    };
  }

  /**
   * Deserialize build from JSON and restore to stores
   */
  public static deserializeBuild(data: SerializedBuildData): DeserializationResult {
    try {
      // Version compatibility check
      if (!data.version || data.version !== this.VERSION) {
        console.warn(`Build version mismatch. Expected ${this.VERSION}, got ${data.version}`);
        // For now, continue anyway - in the future we might add migration logic
      }

      // Validate data structure
      if (!data.systems) {
        return {
          success: false,
          error: 'Invalid build data: missing systems'
        };
      }

      // Restore system states
      this.restoreSystemStates(data.systems);

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
   * Export build to downloadable JSON file
   */
  public static exportToFile(filename?: string): SerializationResult {
    try {
      const buildData = this.serializeBuild();
      const jsonString = JSON.stringify(buildData, null, 2);
      
      // Create and trigger download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filename || `cabal-build-${new Date().toISOString().split('T')[0]}.json`;
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
   * Import build from JSON file
   */
  public static importFromFile(file: File): Promise<DeserializationResult> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const jsonString = event.target?.result as string;
          const buildData = JSON.parse(jsonString) as SerializedBuildData;
          
          const result = this.deserializeBuild(buildData);
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
   * Compress build data for URL sharing (future implementation)
   */
  public static compressForURL(): SerializationResult {
    try {
      const buildData = this.serializeBuild();
      const jsonString = JSON.stringify(buildData);
      const compressed = LZString.compressToEncodedURIComponent(jsonString);
      
      if (compressed.length > this.MAX_URL_SIZE) {
        return {
          success: false,
          error: `Compressed build too large for URL sharing (${compressed.length} > ${this.MAX_URL_SIZE} chars)`
        };
      }

      return {
        success: true,
        data: compressed,
        size: compressed.length,
        originalSize: jsonString.length
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL compression failed'
      };
    }
  }

  /**
   * Decompress build data from URL (future implementation)
   */
  public static decompressFromURL(compressed: string): DeserializationResult {
    try {
      const jsonString = LZString.decompressFromEncodedURIComponent(compressed);
      if (!jsonString) {
        return {
          success: false,
          error: 'Failed to decompress URL data'
        };
      }

      const buildData = JSON.parse(jsonString) as SerializedBuildData;
      return this.deserializeBuild(buildData);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'URL decompression failed'
      };
    }
  }

  /**
   * Create a Gist with build data using server-side API
   */
  private static async createGist(buildData: SerializedBuildData): Promise<{ success: boolean; gistId?: string; error?: string }> {
    try {
      // Use server-side API route for secure Gist creation
      const response = await fetch('/api/share-build', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ buildData })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({ error: 'Unknown error' }));
        console.error('Gist creation failed:', {
          status: response.status,
          statusText: response.statusText,
          error: errorData.error
        });
        
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
   * Fetch build data from Gist
   */
  private static async fetchFromGist(gistId: string): Promise<{ success: boolean; data?: SerializedBuildData; error?: string }> {
    try {
      const response = await fetch(`${this.GIST_API_URL}/${gistId}`, {
        headers: {
          'Accept': 'application/vnd.github.v3+json'
        }
      });

      if (!response.ok) {
        return { success: false, error: `Failed to fetch Gist: ${response.status}` };
      }

      const gistResponse: GistResponse = await response.json();
      const fileContent = gistResponse.files[this.GIST_FILENAME]?.content;

      if (!fileContent) {
        return { success: false, error: 'Build data not found in Gist' };
      }

      const buildData = JSON.parse(fileContent) as SerializedBuildData;
      return { success: true, data: buildData };
    } catch (error) {
      return { 
        success: false, 
        error: error instanceof Error ? error.message : 'Failed to fetch from Gist' 
      };
    }
  }

  /**
   * Generate shareable URL - uses Gist fallback for large builds
   */
  public static async generateShareUrl(currentSystem?: string): Promise<SerializationResult> {
    try {
      const buildData = this.serializeBuild();
      const jsonString = JSON.stringify(buildData);
      const compressed = LZString.compressToEncodedURIComponent(jsonString);
      
      // Try direct URL sharing first
      if (compressed.length <= this.MAX_URL_SIZE) {
        // Check if we're in browser environment
        if (typeof window === 'undefined') {
          return {
            success: false,
            error: 'URL generation requires browser environment'
          };
        }
        
        // Build URL with system parameter if provided
        const urlParams = new URLSearchParams();
        urlParams.set('build', compressed);
        if (currentSystem && currentSystem !== 'equipment') { // Only add if not default
          urlParams.set('system', currentSystem);
        }
        
        const shareUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
        return {
          success: true,
          data: compressed,
          shareUrl,
          size: compressed.length,
          originalSize: jsonString.length
        };
      }

      // Fallback to Gist for large builds
      const gistResult = await this.createGist(buildData);
      if (!gistResult.success) {
        return {
          success: false,
          error: `Build too large for URL sharing and Gist fallback failed: ${gistResult.error}`
        };
      }

      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'URL generation requires browser environment'
        };
      }
      
      // Build URL with system parameter if provided
      const urlParams = new URLSearchParams();
      // We know gistId exists because we checked gistResult.success above
      if (gistResult.gistId) {
        urlParams.set('build', gistResult.gistId);
        if (currentSystem && currentSystem !== 'equipment') { // Only add if not default
          urlParams.set('system', currentSystem);
        }
      } else {
        // This should never happen, but handle it just in case
        return {
          success: false,
          error: 'Gist creation succeeded but no gistId was returned'
        };
      }
      
      const shareUrl = `${window.location.origin}${window.location.pathname}?${urlParams.toString()}`;
      return {
        success: true,
        data: compressed, // Still return compressed data for stats
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
   * Load build from URL parameters
   */
  public static async loadFromUrl(): Promise<DeserializationResult> {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'URL loading requires browser environment'
        };
      }
      
      const urlParams = new URLSearchParams(window.location.search);
      
      // Check for build parameter (could be compressed data or Gist ID)
      const buildParam = urlParams.get('build');
      if (buildParam) {
        // Check if it looks like a Gist ID (32 hex characters)
        const gistIdPattern = /^[a-f0-9]{32}$/i;
        if (gistIdPattern.test(buildParam)) {
          // It's a Gist ID, fetch from Gist
          const gistResult = await this.fetchFromGist(buildParam);
          if (!gistResult.success) {
            return {
              success: false,
              error: gistResult.error || 'Failed to load from Gist'
            };
          }
          return this.deserializeBuild(gistResult.data!);
        } else {
          // It's compressed build data, decompress it
          return this.decompressFromURL(buildParam);
        }
      }

      // Check for legacy Gist ID parameter (for backward compatibility)
      const gistParam = urlParams.get('gist');
      if (gistParam) {
        const gistResult = await this.fetchFromGist(gistParam);
        if (!gistResult.success) {
          return {
            success: false,
            error: gistResult.error || 'Failed to load from Gist'
          };
        }
        return this.deserializeBuild(gistResult.data!);
      }

      return {
        success: false,
        error: 'No build data found in URL'
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load build from URL'
      };
    }
  }

  /**
   * Compress build data for localStorage (future implementation)
   */
  public static compressForStorage(): SerializationResult {
    try {
      const buildData = this.serializeBuild();
      const jsonString = JSON.stringify(buildData);
      const compressed = LZString.compressToUTF16(jsonString);

      return {
        success: true,
        data: compressed,
        size: compressed.length,
        originalSize: jsonString.length
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Storage compression failed'
      };
    }
  }

  /**
   * Decompress build data from localStorage (future implementation)
   */
  public static decompressFromStorage(compressed: string): DeserializationResult {
    try {
      const jsonString = LZString.decompressFromUTF16(compressed);
      if (!jsonString) {
        return {
          success: false,
          error: 'Failed to decompress storage data'
        };
      }

      const buildData = JSON.parse(jsonString) as SerializedBuildData;
      return this.deserializeBuild(buildData);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Storage decompression failed'
      };
    }
  }

  /**
   * Save current build to localStorage
   */
  public static saveBuildToStorage(buildName?: string): SerializationResult {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'localStorage requires browser environment'
        };
      }

      const compressionResult = this.compressForStorage();
      if (!compressionResult.success) {
        return compressionResult;
      }

      const storageKey = buildName ? `cabal-build-${buildName}` : 'cabal-build-current';
      localStorage.setItem(storageKey, compressionResult.data!);

      return {
        success: true,
        data: compressionResult.data,
        size: compressionResult.size,
        originalSize: compressionResult.originalSize
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save build to localStorage'
      };
    }
  }

  /**
   * Load build from localStorage
   */
  public static loadBuildFromStorage(buildName?: string): DeserializationResult {
    try {
      // Check if we're in browser environment
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'localStorage requires browser environment'
        };
      }

      const storageKey = buildName ? `cabal-build-${buildName}` : 'cabal-build-current';
      const compressed = localStorage.getItem(storageKey);

      if (!compressed) {
        return {
          success: false,
          error: 'No saved build found'
        };
      }

      return this.decompressFromStorage(compressed);
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to load build from localStorage'
      };
    }
  }
}

// Export convenience functions for easier usage
export const exportBuildToFile = (filename?: string) => UniversalBuildSerializer.exportToFile(filename);
export const importBuildFromFile = (file: File) => UniversalBuildSerializer.importFromFile(file);
export const serializeBuild = () => UniversalBuildSerializer.serializeBuild();
export const deserializeBuild = (data: SerializedBuildData) => UniversalBuildSerializer.deserializeBuild(data);
export const generateShareUrl = (currentSystem?: string) => UniversalBuildSerializer.generateShareUrl(currentSystem);
export const loadFromUrl = () => UniversalBuildSerializer.loadFromUrl();
export const saveBuildToStorage = (buildName?: string) => UniversalBuildSerializer.saveBuildToStorage(buildName);
export const loadBuildFromStorage = (buildName?: string) => UniversalBuildSerializer.loadBuildFromStorage(buildName);
export const setGitHubToken = (token: string) => UniversalBuildSerializer.setGitHubToken(token);
export const registerSystem = (serializer: SystemSerializer) => UniversalBuildSerializer.registerSystem(serializer);

// Re-export types for external use
export type { SystemSerializer };