'use client';

/**
 * UpgradeModalLayout Component
 * Reusable layout component for all upgrade modals
 * Provides consistent structure, styling, and behavior
 */

import React, { useEffect } from 'react';

interface UpgradeModalLayoutProps {
  isOpen: boolean;
  title: string;
  onClose: () => void;
  onApply: () => void;
  onRemove?: () => void;
  removeButtonText?: string;
  applyButtonText?: string;
  isApplyDisabled?: boolean;
  leftContent: React.ReactNode;
  rightContent: React.ReactNode;
  maxWidth?: string;
  zIndex?: string;
}

const UpgradeModalLayout: React.FC<UpgradeModalLayoutProps> = ({
  isOpen,
  title,
  onClose,
  onApply,
  onRemove,
  removeButtonText = "Remove",
  applyButtonText = "Apply",
  isApplyDisabled = false,
  leftContent,
  rightContent,
  maxWidth = "w-[90vw] max-w-4xl",
  zIndex = "z-50"
}) => {
  // Handle escape key
  useEffect(() => {
    if (!isOpen) return;
    
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };
    
    document.addEventListener('keydown', handleEscape);
    return () => document.removeEventListener('keydown', handleEscape);
  }, [isOpen, onClose]);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center ${zIndex} p-4`}>
      <div className={`glass-panel-dark rounded-lg ${maxWidth} w-full max-h-[95vh] flex flex-col relative`}>
        {/* Compact header with all controls */}
        <div className="flex justify-between items-center px-6 py-3 bg-black/20 backdrop-blur-sm">
          {/* Left: Configuration indicator */}
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-game-highlight rounded-full"></div>
            <span className="text-sm font-medium text-gray-300">Configuration</span>
          </div>
          
          {/* Center: Action buttons (responsive) */}
          <div className="flex items-center gap-2">
            {onRemove && (
              <button
                onClick={onRemove}
                className="bg-stat-offensive-bg text-stat-offensive hover:border-stat-offensive hover:text-white px-3 py-1.5 rounded-lg transition-colors border border-transparent text-sm font-medium"
              >
                {removeButtonText}
              </button>
            )}
            <button
              onClick={onApply}
              disabled={isApplyDisabled}
              className="game-button px-3 py-1.5 rounded-lg text-sm font-medium transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {applyButtonText}
            </button>
          </div>
          
          {/* Right: Close button */}
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-white transition-colors focus:outline-none hover:bg-black/20 rounded p-1"
            aria-label="Close"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
            </svg>
          </button>
        </div>

        {/* Scrollable content area - now takes full remaining space */}
        <div className="flex-1 overflow-y-auto dark-scrollbar p-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 w-full">
            {/* Left column - Configuration controls */}
            <div>
              {leftContent}
            </div>
            
            {/* Right column - Tooltip preview */}
            <div>
              {rightContent}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpgradeModalLayout;