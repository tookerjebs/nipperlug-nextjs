/**
 * Load Build From URL Component
 * 
 * Automatically detects and loads builds from URL parameters using the
 * universal build sharing system with LZ-String and Gist support.
 */

'use client';

import React, { useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import { loadFromUrl, SerializedBuildData } from '@/utils/sharing/universal-build-serializer';

interface LoadBuildFromURLProps {
  onLoadStart?: () => void;
  onLoadComplete?: (success: boolean, data?: SerializedBuildData) => void;
  onLoadError?: (error: string) => void;
  showNotifications?: boolean;
}

export default function LoadBuildFromURL({ 
  onLoadStart,
  onLoadComplete,
  onLoadError,
  showNotifications = true
}: LoadBuildFromURLProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [hasAttemptedLoad, setHasAttemptedLoad] = useState(false);

  useEffect(() => {
    // Only attempt to load once per component mount
    if (hasAttemptedLoad) return;

    const urlParams = new URLSearchParams(window.location.search);
    const hasBuildParam = urlParams.has('build') || urlParams.has('gist');
    
    if (!hasBuildParam) return;

    setHasAttemptedLoad(true);
    handleLoadFromUrl();
  }, [hasAttemptedLoad]);

  const handleLoadFromUrl = async () => {
    setIsLoading(true);
    onLoadStart?.();

    let loadingToast: string | undefined;
    if (showNotifications) {
      loadingToast = toast.loading('Loading shared build...');
    }

    try {
      const result = await loadFromUrl();
      
      if (loadingToast) {
        toast.dismiss(loadingToast);
      }

      if (result.success && result.data) {
        if (showNotifications) {
          toast.success('Build loaded successfully!');
        }
        onLoadComplete?.(true, result.data);
        
        // Handle system parameter from shared URL (only for shared builds)
        const urlParams = new URLSearchParams(window.location.search);
        const systemFromUrl = urlParams.get('system');
        if (systemFromUrl) {
          // Save system to localStorage only for shared builds
          // This ensures the friend sees the correct tab when opening a shared build
          localStorage.setItem('activeSystem', systemFromUrl);
        }
        
        // Don't clean up URL parameters immediately - let the user see the shared URL
        // The build parameter will be cleaned up only when the user navigates away
        // This preserves the sharing context while still allowing normal navigation
      } else {
        const errorMsg = result.error || 'Failed to load build from URL';
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
      
      const errorMsg = error instanceof Error ? error.message : 'Unknown error loading build';
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
export function useLoadBuildFromURL() {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [loadedData, setLoadedData] = useState<SerializedBuildData | null>(null);

  const loadBuild = async () => {
    setIsLoading(true);
    setError(null);
    setLoadedData(null);

    try {
      const result = await loadFromUrl();
      
      if (result.success && result.data) {
        setLoadedData(result.data);
        return result.data;
      } else {
        const errorMsg = result.error || 'Failed to load build from URL';
        setError(errorMsg);
        return null;
      }
    } catch (err) {
      const errorMsg = err instanceof Error ? err.message : 'Unknown error loading build';
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
    loadBuild
  };
}