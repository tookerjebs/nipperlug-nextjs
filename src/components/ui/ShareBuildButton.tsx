/**
 * Share Build Button Component
 * 
 * Uses universal build sharing with LZ-String compression and Gist fallback
 * for large builds. Provides seamless URL sharing for all game systems.
 */

'use client';

import React, { useState } from 'react';
import { toast } from 'react-hot-toast';
import ShareUrlModal from './ShareUrlModal';
import { generateShareUrl } from '@/utils/sharing/universal-build-serializer';

interface ShareBuildButtonProps {
  className?: string;
  variant?: 'primary' | 'secondary';
  currentSystem?: string;
}

export default function ShareBuildButton({ 
  className = '', 
  variant = 'primary',
  currentSystem
}: ShareBuildButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [shareUrl, setShareUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [compressionStats, setCompressionStats] = useState<{
    originalSize: number;
    compressedSize: number;
    compressionRatio: number;
  } | undefined>();

  // No longer need to set GitHub token - handled server-side

  const handleShare = async () => {
    setIsGenerating(true);
    const loadingToast = toast.loading('Generating share URL...');

    try {
      const result = await generateShareUrl(currentSystem);
      
      toast.dismiss(loadingToast);

      if (result.success && result.shareUrl) {
        setShareUrl(result.shareUrl);
        
        // Calculate compression stats if we have the data
        if (result.originalSize && result.size) {
          setCompressionStats({
            originalSize: result.originalSize,
            compressedSize: result.size,
            compressionRatio: ((result.originalSize - result.size) / result.originalSize) * 100
          });
        }

        setIsModalOpen(true);
        
        // Show appropriate success message
        if (result.gistId) {
          toast.success('Share URL generated! (Using secure cloud storage for large build)');
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

  const buttonClasses = `
    ${variant === 'primary' 
      ? 'glass-button-blue hover:glass-button-hover' 
      : 'glass-button-green hover:glass-button-hover'
    }
    text-white font-semibold py-2 px-4 rounded-lg transition duration-150
    disabled:opacity-50 disabled:cursor-not-allowed
    ${className}
  `;

  return (
    <>
      <button
        onClick={handleShare}
        disabled={isGenerating}
        className={buttonClasses}
        title="Generate shareable URL for your build"
      >
        {isGenerating ? 'Generating...' : 'Share Build'}
      </button>

      <ShareUrlModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        shareUrl={shareUrl}
        compressionStats={compressionStats}
      />
    </>
  );
}

// Export a simpler version for quick integration
export function QuickShareButton({ 
  className
}: { 
  className?: string;
}) {
  return (
    <ShareBuildButton 
      className={className} 
      variant="secondary"
    />
  );
}