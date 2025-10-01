/**
 * Load Collection From URL Component
 * 
 * Automatically detects and loads collection data from URL parameters
 * Uses dedicated collection tracker serializer (NO build planner data mixing)
 */

'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { loadCollectionFromUrl, SerializedCollectionData } from '../utils/collectionTrackerSerializer';

interface LoadCollectionFromURLProps {
  onLoadStart?: () => void;
  onLoadComplete?: (success: boolean, data?: SerializedCollectionData) => void;
  onLoadError?: (error: string) => void;
  showNotifications?: boolean;
}

export default function LoadCollectionFromURL({ 
  onLoadStart,
  onLoadComplete,
  onLoadError,
  showNotifications = true
}: LoadCollectionFromURLProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

  useEffect(() => {
    // Only attempt to load once per component mount
    if (hasAttemptedLoad) return;

    const urlParams = new URLSearchParams(window.location.search);
    const hasCollectionParam = urlParams.has('collection');
    
    if (!hasCollectionParam) return;

    setHasAttemptedLoad(true);
    handleLoadFromUrl();
  }, [hasAttemptedLoad]);

  const handleLoadFromUrl = async () => {
    setIsLoading(true);
    onLoadStart?.();

    let loadingToast: string | undefined;
    if (showNotifications) {
      loadingToast = toast.loading('Loading shared collection data...');
    }

    try {
      const result = await loadCollectionFromUrl();
      
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }

      if (result.success && result.data) {
        if (showNotifications) {
          toast.success('Collection data loaded successfully!');
        }
        onLoadComplete?.(true, result.data);
        
        // Clean up URL parameters after successful load
        const url = new URL(window.location.href);
        url.searchParams.delete('collection');
        window.history.replaceState({}, '', url.toString());
      } else {
        const errorMsg = result.error || 'Failed to load collection data from URL';
        if (showNotifications) {
          toast.error(errorMsg);
        }
        onLoadError?.(errorMsg);
        onLoadComplete?.(false);
      }
    } catch (error) {
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }
      
      const errorMsg = error instanceof Error ? error.message : 'Unknown error loading collection data';
      if (showNotifications) {
        toast.error(errorMsg);
      }
      onLoadError?.(errorMsg);
      onLoadComplete?.(false);
    } finally {
      setIsLoading(false);
    }
  };

  // This component doesn't render anything visible
  return null;
}

// Hook version for programmatic use
export function useLoadCollectionFromURL() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedData, setLoadedData] = useState<SerializedCollectionData | null>(null);

  const loadCollection = async () => {
    setIsLoading(true);
    setError(null);
    setLoadedData(null);

    try {
      const result = await loadCollectionFromUrl();
      
      if (result.success && result.data) {
        setLoadedData(result.data);
        return result.data;
      } else {
        const errorMsg = result.error || 'Failed to load collection data from URL';
        setError(errorMsg);
        return null;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error loading collection data';
      setError(errorMsg);
      return null;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    isLoading,
    error,
    loadedData,
    loadCollection
  };
}
