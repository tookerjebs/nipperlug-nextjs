'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { X, Copy, CheckCircle } from 'lucide-react';
import { cn } from '@/tools/build-planner/lib/utils';

interface ShareUrlModalProps {
  isOpen: boolean;
  onClose: () => void;
  shareUrl: string;
  compressionStats?: {
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  };
}

export default function ShareUrlModal({
  isOpen,
  onClose,
  shareUrl,
  compressionStats
}: ShareUrlModalProps) {
  const [copied, setCopied] = useState(false);
  const [isMounted, setIsMounted] = useState(false);

  // Handle client-side only rendering
  useEffect(() => {
    setIsMounted(true);
    return () => setIsMounted(false);
  }, []);

  // Reset copied state when modal opens
  useEffect(() => {
    if (isOpen) {
      setCopied(false);
    }
  }, [isOpen]);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy URL:', err);
      // Fallback
      const urlElement = document.getElementById('share-url-text');
      if (urlElement) {
        const selection = window.getSelection();
        const range = document.createRange();
        range.selectNodeContents(urlElement);
        selection?.removeAllRanges();
        selection?.addRange(range);
      }
    }
  };

  // Don't render on server
  if (!isMounted) return null;
  if (!isOpen) return null;

  return createPortal(
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      <div className="relative glass-panel w-full max-w-lg max-h-[80vh] overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border-dark">
          <h2 className="text-xl font-bold text-game-gold glow-text-sm">
            Share Your Build
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-theme-light rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-gray-400" />
          </button>
        </div>

        {/* URL */}
        <div className="p-4">
          <div className="glass-panel-dark border-green-500/30 border p-4 rounded-lg">
            <div className="flex items-center justify-between mb-2">
              <span className="text-green-400 font-medium">✓ Share URL Generated</span>
              <button
                onClick={handleCopy}
                className={cn(
                  "glass-button-green text-white font-semibold py-1 px-3 rounded-lg transition duration-150 hover:glass-button-hover flex items-center gap-1",
                  copied && "bg-green-600/50"
                )}
              >
                {copied ? (
                  <>
                    <CheckCircle className="w-4 h-4" />
                    <span>Copied!</span>
                  </>
                ) : (
                  <>
                    <Copy className="w-4 h-4" />
                    <span>Copy URL</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="bg-gray-800 p-2 rounded border border-gray-700 max-h-24 overflow-y-auto dark-scrollbar">
              <code 
                id="share-url-text"
                className="text-xs text-gray-300 break-all select-all"
              >
                {shareUrl}
              </code>
            </div>
          </div>

          {/* URL Info */}
          <div className="text-xs text-gray-400 mt-2 flex items-center justify-between">
            <span>URL Length: {shareUrl.length} characters</span>
            {shareUrl.length < 2000 ? (
              <span className="text-green-400">✓ Compatible with all browsers</span>
            ) : shareUrl.length < 8000 ? (
              <span className="text-yellow-400">⚠ Modern browsers only</span>
            ) : (
              <span className="text-red-400">⚠ May exceed browser limits</span>
            )}
          </div>
        </div>

        {/* Compression Stats (optional) */}
        {compressionStats && (
          <div className="px-4 pb-4">
            <div className="glass-panel-dark p-3 rounded-lg">
              <h4 className="text-sm font-medium text-game-gold mb-2">Compression Statistics</h4>
              <div className="grid grid-cols-3 gap-4 text-xs">
                <div>
                  <span className="text-gray-400">Original Size:</span>
                  <div className="text-white font-mono">{compressionStats.originalSize.toLocaleString()} chars</div>
                </div>
                <div>
                  <span className="text-gray-400">Compressed Size:</span>
                  <div className="text-white font-mono">{compressionStats.compressedSize.toLocaleString()} chars</div>
                </div>
                <div>
                  <span className="text-gray-400">Compression:</span>
                  <div className="text-green-400 font-mono">{compressionStats.compressionRatio.toFixed(1)}%</div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Footer */}
        <div className="p-4 border-t border-border-dark flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 game-button hover:bg-theme-lighter text-white rounded-lg transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
}