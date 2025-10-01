/**
 * Unified Price Input Component
 * Handles all price input scenarios with consistent styling and behavior
 */

'use client';

import React from 'react';

interface PriceInputProps {
  value: number | null;
  onChange: (value: number) => void;
  variant?: 'default' | 'mobile' | 'compact' | 'ingredient-desktop' | 'ingredient-mobile';
  placeholder?: string;
  className?: string;
}

export default function PriceInput({ 
  value, 
  onChange, 
  variant = 'default',
  placeholder = "0",
  className = ""
}: PriceInputProps) {
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(Number(e.target.value) || 0);
  };

  // Base classes that are common to all variants
  const baseClasses = "border border-border-dark rounded text-white focus:border-blue-500 focus:outline-none";
  
  // Variant-specific classes
  const variantClasses = {
    default: "w-24 bg-theme-dark px-2 py-1 text-sm",
    mobile: "w-full bg-theme-darkest px-3 py-3 text-lg",
    compact: "w-16 bg-theme-dark px-2 py-1 text-center text-sm",
    'ingredient-desktop': "w-24 bg-theme-dark rounded-lg px-3 py-2 text-gray-200 text-center text-sm transition-colors placeholder-gray-500",
    'ingredient-mobile': "flex-1 bg-theme-darkest px-2 py-1 text-sm"
  };

  const finalClassName = `${baseClasses} ${variantClasses[variant]} ${className}`;

  return (
    <input
      type="number"
      value={value || ''}
      onChange={handleChange}
      className={finalClassName}
      placeholder={placeholder}
    />
  );
}