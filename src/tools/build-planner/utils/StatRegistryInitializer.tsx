'use client';

import { useEffect } from 'react';
import { useStatRegistryStore } from '@/tools/build-planner/stores/statRegistryStore';

/**
 * StatRegistryInitializer Component
 * 
 * This component initializes the Stat Registry system and connects it to the Build Planner.
 * It should be included once at the application root level to ensure the registry is properly set up.
 */
export const StatRegistryInitializer: React.FC = () => {
  useEffect(() => {
    // Enable debug mode during development
    if (process.env.NODE_ENV === 'development') {
      useStatRegistryStore.getState().setDebugMode(true);
      useStatRegistryStore.getState().debugLog('Stat Registry initialized in debug mode');
    }

    return () => {
      // Clean up any resources if needed when the app unmounts
    };
  }, []);

  // This is a utility component that doesn't render anything
  return null;
};

export default StatRegistryInitializer;