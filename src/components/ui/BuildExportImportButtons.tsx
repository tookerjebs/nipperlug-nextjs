/**
 * Build Export/Import Buttons Component
 * Provides UI for testing the universal build serialization service
 */

'use client';

import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { exportBuildToFile, importBuildFromFile } from '@/utils/sharing/universal-build-serializer';

export default function BuildExportImportButtons() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleExport = async () => {
    try {
      const result = exportBuildToFile();
      
      if (result.success) {
        toast.success(`Build exported successfully! (${result.size} characters)`);
      } else {
        toast.error(`Export failed: ${result.error}`);
      }
    } catch (error) {
      toast.error('Export failed: Unknown error');
      console.error('Export error:', error);
    }
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileSelect = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    // Reset the input so the same file can be selected again
    event.target.value = '';

    // Show loading toast
    const loadingToast = toast.loading('Importing build...');

    try {
      const result = await importBuildFromFile(file);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success('Build imported successfully! Stats have been updated.');
      } else {
        toast.error(`Import failed: ${result.error}`);
      }
    } catch (error) {
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      toast.error('Import failed: Unknown error');
      console.error('Import error:', error);
    }
  };

  return (
    <>
      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      {/* Export Button */}
      <button 
        onClick={handleExport}
        className="glass-button-purple text-white font-semibold py-2 px-4 rounded-lg transition duration-150 hover:glass-button-hover"
        title="Export current build to JSON file"
      >
        Export Build
      </button>
      
      {/* Import Button */}
      <button 
        onClick={handleImportClick}
        className="glass-button-orange text-white font-semibold py-2 px-4 rounded-lg transition duration-150 hover:glass-button-hover"
        title="Import build from JSON file"
      >
        Import Build
      </button>
    </>
  );
}