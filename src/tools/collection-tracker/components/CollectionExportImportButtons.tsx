/**
 * Collection Tracker Export/Import/Share Buttons Component
 * Provides UI for exporting, importing, and sharing collection tracker progress
 * Uses dedicated collection tracker serializer (NO build planner data mixing)
 */

'use client';

import { useRef, useState } from 'react';
import { toast } from 'react-hot-toast';
import { Download, Upload, Share2, RotateCcw } from 'lucide-react';
import { 
  exportCollectionToFile, 
  importCollectionFromFile, 
  generateCollectionShareUrl 
} from '../utils/collectionTrackerSerializer';
import { useCollectionTrackerStore } from '../stores/collectionTrackerStore';
import ShareUrlModal from '@/components/ui/ShareUrlModal';

export default function CollectionExportImportButtons() {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResetConfirm, setShowResetConfirm] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | undefined>();

  const { resetAllProgress } = useCollectionTrackerStore();

  const handleExport = async () => {
    try {
      const result = exportCollectionToFile('collection-tracker-progress');
      
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
      const result = await importCollectionFromFile(file);
      
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

  const handleShare = async () => {
    setIsGenerating(true);
    const loadingToast = toast.loading('Generating share URL...');

    try {
      // Don't pass system parameter - not needed for collection tracker
      const result = await generateCollectionShareUrl();
      
      toast.dismiss(loadingToast);

      if (result.success && result.shareUrl) {
        setShareUrl(result.shareUrl);
        
        // Don't show compression stats for collection tracker
        setCompressionStats(undefined);

        setIsModalOpen(true);
        
        // Show appropriate success message
        if (result.gistId) {
          toast.success('Share URL generated! (Using secure cloud storage)');
        } else {
          toast.success('Share URL generated!');
        }
      } else {
        toast.error(`Failed to generate share URL: ${result.error}`);
      }
    } catch (error) {
      toast.dismiss(loadingToast);
      toast.error('Failed to generate share URL');
      console.error('Share error:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleReset = () => {
    setShowResetConfirm(true);
  };

  const confirmReset = () => {
    resetAllProgress();
    setShowResetConfirm(false);
    toast.success('All collection progress has been reset!');
  };

  const cancelReset = () => {
    setShowResetConfirm(false);
  };

  return (
    <>
      {/* Reset Confirmation Modal */}
      {showResetConfirm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-theme-darker border border-border-light rounded-lg p-6 max-w-md mx-4">
            <h3 className="text-lg font-semibold text-white mb-3">Reset All Progress</h3>
            <p className="text-gray-300 mb-6">
              Are you sure you want to reset all collection progress? This action cannot be undone.
            </p>
            <div className="flex gap-3 justify-end">
              <button
                onClick={cancelReset}
                className="px-4 py-2 text-gray-300 hover:text-white border border-border-light rounded-lg hover:bg-border-light/20 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmReset}
                className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors"
              >
                Reset All
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept=".json"
        onChange={handleFileSelect}
        style={{ display: 'none' }}
      />
      
      <div className="flex gap-2">
        {/* Export Button */}
        <button 
          onClick={handleExport}
          className="glass-button-purple text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-2"
          title="Export collection progress to JSON file"
        >
          <Download className="w-4 h-4" />
          <span className="hidden sm:inline">Export</span>
        </button>
        
        {/* Import Button */}
        <button 
          onClick={handleImportClick}
          className="glass-button-orange text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-2"
          title="Import collection progress from JSON file"
        >
          <Upload className="w-4 h-4" />
          <span className="hidden sm:inline">Import</span>
        </button>

        {/* Share Button */}
        <button
          onClick={handleShare}
          disabled={isGenerating}
          className="glass-button-blue text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
          title="Generate shareable URL for your collection progress"
        >
          <Share2 className="w-4 h-4" />
          <span className="hidden sm:inline">{isGenerating ? 'Generating...' : 'Share'}</span>
        </button>

        {/* Reset Button */}
        <button
          onClick={handleReset}
          className="glass-button-red text-white font-semibold py-2 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-2"
          title="Reset all collection progress"
        >
          <RotateCcw className="w-4 h-4" />
          <span className="hidden sm:inline">Reset</span>
        </button>
      </div>

      <ShareUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shareUrl={shareUrl}
        compressionStats={compressionStats}
      />
    </>
  );
}