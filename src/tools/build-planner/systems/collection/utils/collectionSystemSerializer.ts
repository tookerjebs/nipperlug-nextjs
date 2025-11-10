/**
 * Collection System Serializer
 * Handles export/import and saving ONLY for collection system data
 * Completely separate from build planner data
 */

import { useCollectionStore } from '../stores/collectionStore';

// Define the structure for serialized collection data
export interface SerializedCollectionSystemData {
  version: string;
  timestamp: number;
  collectionProgress: Record<string, number>;
  activeCategory?: string;
  activeCollection?: string | null;
}

// Define the result types for serialization operations
export interface CollectionSystemSerializationResult {
  success: boolean;
  data?: string;
  error?: string;
  size?: number;
  originalSize?: number;
}

export interface CollectionSystemDeserializationResult {
  success: boolean;
  data?: SerializedCollectionSystemData;
  error?: string;
}

/**
 * Collection System Serializer Class
 * Handles ONLY collection system data
 */
export class CollectionSystemSerializer {
  private static readonly VERSION = '1.0.0';

  /**
   * Serialize current collection system data to JSON
   */
  public static serializeCollectionData(): SerializedCollectionSystemData {
    const state = useCollectionStore.getState();
    
    return {
      version: this.VERSION,
      timestamp: Date.now(),
      collectionProgress: state.collectionProgress,
      activeCategory: state.activeCategory,
      activeCollection: state.activeCollection
    };
  }

  /**
   * Deserialize collection data and restore to store
   */
  public static deserializeCollectionData(data: SerializedCollectionSystemData): CollectionSystemDeserializationResult {
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

      // Restore collection system state
      const collectionStore = useCollectionStore.getState();
      collectionStore.restoreFromImport({
        collectionProgress: data.collectionProgress,
        activeCategory: data.activeCategory,
        activeCollection: data.activeCollection
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
   * Save to localStorage
   */
  public static saveToStorage(): CollectionSystemSerializationResult {
    try {
      if (typeof window === 'undefined') {
        return {
          success: false,
          error: 'localStorage requires browser environment'
        };
      }

      const collectionData = this.serializeCollectionData();
      const jsonString = JSON.stringify(collectionData);
      localStorage.setItem('collection-system-storage', jsonString);

      return {
        success: true,
        data: jsonString,
        size: jsonString.length
      };
    } catch (error) {
      return {
        success: false,
        error: error instanceof Error ? error.message : 'Failed to save to localStorage'
      };
    }
  }

  /**
   * Export collection data to downloadable JSON file
   */
  public static exportToFile(filename?: string): CollectionSystemSerializationResult {
    try {
      const collectionData = this.serializeCollectionData();
      const jsonString = JSON.stringify(collectionData, null, 2);
      
      // Create and trigger download
      const blob = new Blob([jsonString], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      
      link.href = url;
      link.download = filename || `collection-system-${new Date().toISOString().split('T')[0]}.json`;
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
  public static importFromFile(file: File): Promise<CollectionSystemDeserializationResult> {
    return new Promise((resolve) => {
      const reader = new FileReader();
      
      reader.onload = (event) => {
        try {
          const jsonString = event.target?.result as string;
          const collectionData = JSON.parse(jsonString) as SerializedCollectionSystemData;
          
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
}

// Export convenience functions
export const saveCollectionSystemToStorage = () => CollectionSystemSerializer.saveToStorage();
export const exportCollectionSystemToFile = (filename?: string) => CollectionSystemSerializer.exportToFile(filename);
export const importCollectionSystemFromFile = (file: File) => CollectionSystemSerializer.importFromFile(file);

