'use client';

import { useState, useEffect } from 'react';
import { X, AlertTriangle, MessageCircle, Bug } from 'lucide-react';

export default function AlphaTestingBanner() {
  const [isVisible, setIsVisible] = useState(false);
  const [isClosing, setIsClosing] = useState(false);

  useEffect(() => {
    // Check if user has dismissed the banner before
    const dismissed = localStorage.getItem('alpha-banner-dismissed');
    if (!dismissed) {
      setIsVisible(true);
    }
  }, []);

  const handleDismiss = () => {
    setIsClosing(true);
    setTimeout(() => {
      setIsVisible(false);
      localStorage.setItem('alpha-banner-dismissed', 'true');
    }, 300);
  };

  const handleFeedbackClick = () => {
    // Trigger Userback widget if available
    if (typeof window !== 'undefined' && (window as any).Userback) {
      (window as any).Userback.open();
    }
  };

  if (!isVisible) return null;

  return (
    <div className={`fixed bottom-4 left-4 right-4 z-50 transition-all duration-300 ${isClosing ? 'opacity-0 translate-y-full' : 'opacity-100 translate-y-0'}`}>
      <div className="glass-panel-dark border-orange-500/30 bg-gradient-to-r from-orange-900/20 via-amber-900/20 to-orange-900/20 shadow-2xl">
        <div className="container mx-auto max-w-4xl px-4 py-3">
          <div className="flex items-center justify-between gap-4">
            <div className="flex items-center gap-3 flex-1">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-5 w-5 text-orange-400" />
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-orange-500/20 text-orange-300 border border-orange-500/30">
                      ALPHA
                    </span>
                    <span className="text-sm font-medium text-white">
                      This build planner is in active development
                    </span>
                  </div>
                  
                  <div className="text-sm text-gray-300">
                    Many features are incomplete or missing. Help us improve by reporting bugs, missing data, or wrong stats!
                  </div>
                </div>
              </div>
            </div>

            <div className="flex items-center gap-2 flex-shrink-0">
              <button
                onClick={handleFeedbackClick}
                className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs font-medium text-white bg-blue-600/80 hover:bg-blue-600 border border-blue-500/50 rounded-lg transition-colors duration-200"
              >
                <MessageCircle className="h-3.5 w-3.5" />
                <span className="hidden sm:inline">Send Feedback</span>
                <span className="sm:hidden">Feedback</span>
              </button>
              
              <button
                onClick={handleDismiss}
                className="p-1.5 text-gray-400 hover:text-white transition-colors duration-200 rounded-lg hover:bg-white/10"
                aria-label="Dismiss banner"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}