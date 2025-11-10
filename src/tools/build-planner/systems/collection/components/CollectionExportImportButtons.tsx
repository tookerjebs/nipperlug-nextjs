/**
 * Collection System Export/Import Buttons Component
 * Provides UI for exporting, importing, and saving collection system progress
 */

'use client';

import { useRef } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Upload, Save } from 'lucide-react';
import { 
  saveCollectionSystemToStorage,
  exportCollectionSystemToFile, 
  importCollectionSystemFromFile
} from '../utils/collectionSystemSerializer';

export default function CollectionExportImportButtons() {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSave = () => {
    try {
      const result = saveCollectionSystemToStorage();
      
      if (result.success) {
        toast.success('Collection progress saved to local storage!');
      } else {
        toast.error(`Save failed: ${result.error}`);
      }
    } catch (error) {
      toast.error('Save failed: Unknown error');
      console.error('Save error:', error);
    }
  };

  const handleExport = async () => {
    try {
      const result = exportCollectionSystemToFile('collection-system-progress');
      
      if (result.success) {
        toast.success(`Collection progress exported successfully! (${result.size} characters)`);
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
    const loadingToast = toast.loading('Importing collection progress...');

    try {
      const result = await importCollectionSystemFromFile(file);
      
      // Dismiss loading toast
      toast.dismiss(loadingToast);
      
      if (result.success) {
        toast.success('Collection progress imported successfully!');
        // Refresh the page to show updated progress
        window.location.reload();
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
      
      <div className="flex gap-2">
        {/* Save Button */}
        <button 
          onClick={handleSave}
          className="glass-button-green text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-2"
          title="Save collection progress to local storage"
        >
          <Save className="w-4 h-4" />
          <span>Save</span>
        </button>
        
        {/* Export Button */}
        <button 
          onClick={handleExport}
          className="glass-button-purple text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-2"
          title="Export collection progress to JSON file"
        >
          <Download className="w-4 h-4" />
          <span>Export</span>
        </button>
        
        {/* Import Button */}
        <button 
          onClick={handleImportClick}
          className="glass-button-orange text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-2"
          title="Import collection progress from JSON file"
        >
          <Upload className="w-4 h-4" />
          <span>Import</span>
        </button>
      </div>
    </>
  );
}

