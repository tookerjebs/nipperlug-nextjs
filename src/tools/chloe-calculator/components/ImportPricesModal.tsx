/**
 * Import Prices Modal Component
 * Allows importing prices from JSON files via drag & drop or file selection
 */

'use client';

import React, { useState, useRef } from 'react';
import { usePriceStore } from '@/stores/priceStore';

interface ImportPricesModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface ImportResult {
  success: boolean;
  imported: number;
  errors: string[];
  timestamp?: string;
}

export default function ImportPricesModal({ isOpen, onClose }: ImportPricesModalProps) {
  const [isDragOver, setIsDragOver] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [importResult, setImportResult] = useState<ImportResult | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const { importPrices } = usePriceStore();

  if (!isOpen) return null;

  const handleClose = () => {
    setImportResult(null);
    setIsProcessing(false);
    onClose();
  };

  const processFile = async (file: File) => {
    setIsProcessing(true);
    setImportResult(null);

    try {
      const text = await file.text();
      const data = JSON.parse(text);

      // Validate the JSON structure
      if (!data || typeof data !== 'object') {
        throw new Error('Invalid JSON format');
      }

      let prices: Record<string, number> = {};
      let timestamp: string | undefined;

      // Handle different JSON formats
      if (data.prices && typeof data.prices === 'object') {
        // Format: { "timestamp": "...", "prices": { "item": price } }
        prices = data.prices;
        timestamp = data.timestamp;
      } else if (typeof data === 'object' && !Array.isArray(data)) {
        // Format: { "item": price, "item2": price2 }
        prices = data;
      } else {
        throw new Error('Unsupported JSON format. Expected object with prices.');
      }

      // Validate and clean prices
      const validPrices: Record<string, number> = {};
      const errors: string[] = [];
      let imported = 0;

      Object.entries(prices).forEach(([itemName, price]) => {
        if (typeof itemName !== 'string' || itemName.trim() === '') {
          errors.push(`Invalid item name: ${itemName}`);
          return;
        }

        const numPrice = Number(price);
        if (isNaN(numPrice) || numPrice < 0) {
          errors.push(`Invalid price for ${itemName}: ${price}`);
          return;
        }

        validPrices[itemName.trim()] = Math.round(numPrice);
        imported++;
      });

      if (imported === 0) {
        throw new Error('No valid prices found in the file');
      }

      // Import the prices
      importPrices(validPrices);

      setImportResult({
        success: true,
        imported,
        errors,
        timestamp
      });

    } catch (error) {
      setImportResult({
        success: false,
        imported: 0,
        errors: [error instanceof Error ? error.message : 'Unknown error occurred']
      });
    } finally {
      setIsProcessing(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    const files = Array.from(e.dataTransfer.files);
    const jsonFile = files.find(file => 
      file.type === 'application/json' || file.name.toLowerCase().endsWith('.json')
    );

    if (!jsonFile) {
      setImportResult({
        success: false,
        imported: 0,
        errors: ['Please drop a JSON file']
      });
      return;
    }

    processFile(jsonFile);
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      processFile(file);
    }
  };

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-theme-darker border border-border-dark rounded-lg p-6 max-w-2xl w-full mx-4 max-h-[90vh] overflow-y-auto">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold">Import Prices</h3>
          <button
            onClick={handleClose}
            className="text-gray-400 hover:text-white text-2xl"
          >
            ×
          </button>
        </div>

        <div className="space-y-4">
          {/* Instructions */}
          <div className="text-sm text-gray-300">
            <p className="mb-2">Import prices from your JSON file. Supported formats:</p>
            <ul className="list-disc list-inside space-y-1 text-gray-400">
              <li><code>{"{ \"Item Name\": price, \"Item Name 2\": price2 }"}</code></li>
              <li><code>{"{ \"timestamp\": \"...\", \"prices\": { \"Item Name\": price } }"}</code></li>
            </ul>
          </div>

          {/* Drop Zone */}
          <div
            className={`border-2 border-dashed rounded-lg p-8 text-center transition-colors ${
              isDragOver
                ? 'border-blue-500 bg-blue-500/10'
                : 'border-border-dark hover:border-border-light'
            } ${isProcessing ? 'opacity-50 pointer-events-none' : ''}`}
            onDrop={handleDrop}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
          >
            {isProcessing ? (
              <div className="space-y-2">
                <div className="text-blue-400">Processing file...</div>
                <div className="w-8 h-8 border-2 border-blue-500 border-t-transparent rounded-full animate-spin mx-auto"></div>
              </div>
            ) : (
              <div className="space-y-4">
                <div className="text-4xl text-gray-400">📁</div>
                <div>
                  <p className="text-white mb-2">Drop your JSON file here</p>
                  <p className="text-gray-400 text-sm">or</p>
                </div>
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
                >
                  Select File
                </button>
                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".json,application/json"
                  onChange={handleFileSelect}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* Results */}
          {importResult && (
            <div className={`rounded-lg p-4 ${
              importResult.success ? 'bg-green-900/20 border border-green-500/30' : 'bg-red-900/20 border border-red-500/30'
            }`}>
              <div className={`font-medium mb-2 ${importResult.success ? 'text-green-400' : 'text-red-400'}`}>
                {importResult.success ? '✅ Import Successful' : '❌ Import Failed'}
              </div>
              
              {importResult.success && (
                <div className="space-y-1 text-sm">
                  <p className="text-green-300">
                    Successfully imported {importResult.imported} price{importResult.imported !== 1 ? 's' : ''}
                  </p>
                  {importResult.timestamp && (
                    <p className="text-gray-400">
                      File Timestamp: {new Date(importResult.timestamp).toLocaleString()}
                    </p>
                  )}
                </div>
              )}

              {importResult.errors.length > 0 && (
                <div className="mt-2">
                  <p className="text-yellow-400 text-sm font-medium">Warnings/Errors:</p>
                  <ul className="text-sm text-gray-300 mt-1 space-y-1">
                    {importResult.errors.slice(0, 10).map((error, index) => (
                      <li key={index} className="text-xs">• {error}</li>
                    ))}
                    {importResult.errors.length > 10 && (
                      <li className="text-xs text-gray-400">... and {importResult.errors.length - 10} more</li>
                    )}
                  </ul>
                </div>
              )}
            </div>
          )}

          {/* Action Buttons */}
          <div className="flex justify-end space-x-3 pt-4 border-t border-border-dark">
            <button
              onClick={handleClose}
              className="px-4 py-2 text-gray-300 hover:text-white transition-colors"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}