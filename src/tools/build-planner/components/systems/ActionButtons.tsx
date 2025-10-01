'use client';

import React from 'react';

interface ActionButtonsProps {
  onQuickFill: () => void;
  onReset: () => void;
  className?: string;
}

export const ActionButtons: React.FC<ActionButtonsProps> = ({
  onQuickFill,
  onReset,
  className = '',
}) => {
  return (
    <div className={`flex space-x-2 ${className}`}>
      <button
        onClick={onQuickFill}
        className="game-button px-3 py-1 text-sm rounded flex items-center"
        title="Fill with meta build"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path>
        </svg>
        Quick Fill
      </button>
      <button
        onClick={onReset}
        className="game-button px-3 py-1 text-sm rounded flex items-center"
        title="Reset all slots"
      >
        <svg className="w-4 h-4 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
        </svg>
        Reset
      </button>
    </div>
  );
};

export default ActionButtons;