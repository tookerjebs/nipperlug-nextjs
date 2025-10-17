'use client';

import { useState, useCallback } from 'react';
import { formatNumber } from '@/utils/numberFormat';

// Force Wing data tables for various level ranges
const forceWingLevels = [
  { levelFrom: 1, levelTo: 2, expNeeded: 500000, forceEssence: 2, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 2, levelTo: 3, expNeeded: 900000, forceEssence: 3, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 3, levelTo: 4, expNeeded: 1300000, forceEssence: 4, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 4, levelTo: 5, expNeeded: 1700000, forceEssence: 5, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 5, levelTo: 6, expNeeded: 2100000, forceEssence: 6, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 6, levelTo: 7, expNeeded: 2500000, forceEssence: 7, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 7, levelTo: 8, expNeeded: 2900000, forceEssence: 8, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 8, levelTo: 9, expNeeded: 3300000, forceEssence: 9, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 9, levelTo: 10, expNeeded: 3700000, forceEssence: 10, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 10, levelTo: 11, expNeeded: 4100000, forceEssence: 11, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 11, levelTo: 12, expNeeded: 4500000, forceEssence: 12, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 12, levelTo: 13, expNeeded: 4900000, forceEssence: 13, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 13, levelTo: 14, expNeeded: 5300000, forceEssence: 14, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 14, levelTo: 15, expNeeded: 5700000, forceEssence: 15, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 15, levelTo: 16, expNeeded: 6100000, forceEssence: 16, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 16, levelTo: 17, expNeeded: 6500000, forceEssence: 17, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 17, levelTo: 18, expNeeded: 6900000, forceEssence: 18, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 18, levelTo: 19, expNeeded: 7300000, forceEssence: 19, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 19, levelTo: 20, expNeeded: 7700000, forceEssence: 20, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 20, levelTo: 21, expNeeded: 8100000, forceEssence: 21, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 21, levelTo: 22, expNeeded: 9000000, forceEssence: 22, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 22, levelTo: 23, expNeeded: 9000000, forceEssence: 23, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 23, levelTo: 24, expNeeded: 9000000, forceEssence: 24, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 24, levelTo: 25, expNeeded: 9000000, forceEssence: 25, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 25, levelTo: 26, expNeeded: 9000000, forceEssence: 26, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 26, levelTo: 27, expNeeded: 9000000, forceEssence: 27, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 27, levelTo: 28, expNeeded: 9000000, forceEssence: 28, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 28, levelTo: 29, expNeeded: 9000000, forceEssence: 29, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 29, levelTo: 30, expNeeded: 9000000, forceEssence: 30, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 30, levelTo: 31, expNeeded: 9000000, forceEssence: 31, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 31, levelTo: 32, expNeeded: 12000000, forceEssence: 32, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 32, levelTo: 33, expNeeded: 12000000, forceEssence: 33, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 33, levelTo: 34, expNeeded: 12000000, forceEssence: 34, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 34, levelTo: 35, expNeeded: 12000000, forceEssence: 35, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 35, levelTo: 36, expNeeded: 12000000, forceEssence: 36, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 36, levelTo: 37, expNeeded: 12000000, forceEssence: 37, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 37, levelTo: 38, expNeeded: 12000000, forceEssence: 38, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 38, levelTo: 39, expNeeded: 12000000, forceEssence: 39, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 39, levelTo: 40, expNeeded: 12000000, forceEssence: 40, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 40, levelTo: 41, expNeeded: 12000000, forceEssence: 41, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 41, levelTo: 42, expNeeded: 13000000, forceEssence: 42, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 42, levelTo: 43, expNeeded: 13000000, forceEssence: 43, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 43, levelTo: 44, expNeeded: 13000000, forceEssence: 44, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 44, levelTo: 45, expNeeded: 13000000, forceEssence: 45, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 45, levelTo: 46, expNeeded: 13000000, forceEssence: 46, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 46, levelTo: 47, expNeeded: 13000000, forceEssence: 47, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 47, levelTo: 48, expNeeded: 13000000, forceEssence: 48, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 48, levelTo: 49, expNeeded: 13000000, forceEssence: 49, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 49, levelTo: 50, expNeeded: 13000000, forceEssence: 50, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 50, levelTo: 51, expNeeded: 13000000, forceEssence: 51, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 51, levelTo: 52, expNeeded: 14000000, forceEssence: 52, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 52, levelTo: 53, expNeeded: 14000000, forceEssence: 53, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 53, levelTo: 54, expNeeded: 14000000, forceEssence: 54, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 54, levelTo: 55, expNeeded: 14000000, forceEssence: 55, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 55, levelTo: 56, expNeeded: 14000000, forceEssence: 56, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 56, levelTo: 57, expNeeded: 14000000, forceEssence: 57, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 57, levelTo: 58, expNeeded: 14000000, forceEssence: 58, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 58, levelTo: 59, expNeeded: 14000000, forceEssence: 59, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 59, levelTo: 60, expNeeded: 14000000, forceEssence: 60, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 60, levelTo: 61, expNeeded: 14000000, forceEssence: 61, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 61, levelTo: 62, expNeeded: 15000000, forceEssence: 62, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 62, levelTo: 63, expNeeded: 15000000, forceEssence: 63, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 63, levelTo: 64, expNeeded: 15000000, forceEssence: 64, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 64, levelTo: 65, expNeeded: 15000000, forceEssence: 65, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 65, levelTo: 66, expNeeded: 15000000, forceEssence: 66, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 66, levelTo: 67, expNeeded: 15000000, forceEssence: 67, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 67, levelTo: 68, expNeeded: 15000000, forceEssence: 68, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 68, levelTo: 69, expNeeded: 15000000, forceEssence: 69, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 69, levelTo: 70, expNeeded: 15000000, forceEssence: 70, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 70, levelTo: 71, expNeeded: 15000000, forceEssence: 71, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 71, levelTo: 72, expNeeded: 16000000, forceEssence: 72, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 72, levelTo: 73, expNeeded: 16000000, forceEssence: 73, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 73, levelTo: 74, expNeeded: 16000000, forceEssence: 74, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 74, levelTo: 75, expNeeded: 16000000, forceEssence: 75, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 75, levelTo: 76, expNeeded: 16000000, forceEssence: 76, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 76, levelTo: 77, expNeeded: 16000000, forceEssence: 77, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 77, levelTo: 78, expNeeded: 16000000, forceEssence: 78, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 78, levelTo: 79, expNeeded: 16000000, forceEssence: 79, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 79, levelTo: 80, expNeeded: 16000000, forceEssence: 80, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 80, levelTo: 81, expNeeded: 16000000, forceEssence: 81, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 81, levelTo: 82, expNeeded: 17000000, forceEssence: 82, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 82, levelTo: 83, expNeeded: 17000000, forceEssence: 83, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 83, levelTo: 84, expNeeded: 17000000, forceEssence: 84, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 84, levelTo: 85, expNeeded: 17000000, forceEssence: 85, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 85, levelTo: 86, expNeeded: 17000000, forceEssence: 86, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 86, levelTo: 87, expNeeded: 17000000, forceEssence: 87, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 87, levelTo: 88, expNeeded: 17000000, forceEssence: 88, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 88, levelTo: 89, expNeeded: 17000000, forceEssence: 89, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 89, levelTo: 90, expNeeded: 17000000, forceEssence: 90, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 90, levelTo: 91, expNeeded: 17000000, forceEssence: 91, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 91, levelTo: 92, expNeeded: 18000000, forceEssence: 92, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 92, levelTo: 93, expNeeded: 18000000, forceEssence: 93, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 93, levelTo: 94, expNeeded: 18000000, forceEssence: 94, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 94, levelTo: 95, expNeeded: 18000000, forceEssence: 95, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 95, levelTo: 96, expNeeded: 18000000, forceEssence: 96, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 96, levelTo: 97, expNeeded: 18000000, forceEssence: 97, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 97, levelTo: 98, expNeeded: 18000000, forceEssence: 98, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 98, levelTo: 99, expNeeded: 18000000, forceEssence: 99, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 99, levelTo: 100, expNeeded: 18000000, forceEssence: 100, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  
  // Levels 101-200 (complete data from WordPress)
  { levelFrom: 101, levelTo: 102, expNeeded: 525000, forceEssence: 4, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 102, levelTo: 103, expNeeded: 945000, forceEssence: 6, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 103, levelTo: 104, expNeeded: 1365000, forceEssence: 8, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 104, levelTo: 105, expNeeded: 1785000, forceEssence: 10, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 105, levelTo: 106, expNeeded: 2205000, forceEssence: 12, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 106, levelTo: 107, expNeeded: 2625000, forceEssence: 14, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 107, levelTo: 108, expNeeded: 3045000, forceEssence: 16, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 108, levelTo: 109, expNeeded: 3465000, forceEssence: 18, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 109, levelTo: 110, expNeeded: 3885000, forceEssence: 20, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 110, levelTo: 111, expNeeded: 4305000, forceEssence: 22, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 111, levelTo: 112, expNeeded: 4725000, forceEssence: 24, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 112, levelTo: 113, expNeeded: 5145000, forceEssence: 26, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 113, levelTo: 114, expNeeded: 5565000, forceEssence: 28, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 114, levelTo: 115, expNeeded: 5985000, forceEssence: 30, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 115, levelTo: 116, expNeeded: 6405000, forceEssence: 32, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 116, levelTo: 117, expNeeded: 6825000, forceEssence: 34, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 117, levelTo: 118, expNeeded: 7245000, forceEssence: 36, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 118, levelTo: 119, expNeeded: 7665000, forceEssence: 38, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 119, levelTo: 120, expNeeded: 8085000, forceEssence: 40, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 120, levelTo: 121, expNeeded: 8505000, forceEssence: 42, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 121, levelTo: 122, expNeeded: 9450000, forceEssence: 44, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 122, levelTo: 123, expNeeded: 9450000, forceEssence: 46, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 123, levelTo: 124, expNeeded: 9450000, forceEssence: 48, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 124, levelTo: 125, expNeeded: 9450000, forceEssence: 50, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 125, levelTo: 126, expNeeded: 9450000, forceEssence: 52, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 126, levelTo: 127, expNeeded: 9450000, forceEssence: 54, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 127, levelTo: 128, expNeeded: 9450000, forceEssence: 56, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 128, levelTo: 129, expNeeded: 9450000, forceEssence: 58, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 129, levelTo: 130, expNeeded: 9450000, forceEssence: 60, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 130, levelTo: 131, expNeeded: 9450000, forceEssence: 62, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 131, levelTo: 132, expNeeded: 12600000, forceEssence: 64, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 132, levelTo: 133, expNeeded: 12600000, forceEssence: 66, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 133, levelTo: 134, expNeeded: 12600000, forceEssence: 68, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 134, levelTo: 135, expNeeded: 12600000, forceEssence: 70, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 135, levelTo: 136, expNeeded: 12600000, forceEssence: 72, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 136, levelTo: 137, expNeeded: 12600000, forceEssence: 74, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 137, levelTo: 138, expNeeded: 12600000, forceEssence: 76, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 138, levelTo: 139, expNeeded: 12600000, forceEssence: 78, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 139, levelTo: 140, expNeeded: 12600000, forceEssence: 80, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 140, levelTo: 141, expNeeded: 12600000, forceEssence: 82, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 141, levelTo: 142, expNeeded: 13650000, forceEssence: 84, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 142, levelTo: 143, expNeeded: 13650000, forceEssence: 86, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 143, levelTo: 144, expNeeded: 13650000, forceEssence: 88, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 144, levelTo: 145, expNeeded: 13650000, forceEssence: 90, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 145, levelTo: 146, expNeeded: 13650000, forceEssence: 92, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 146, levelTo: 147, expNeeded: 13650000, forceEssence: 94, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 147, levelTo: 148, expNeeded: 13650000, forceEssence: 96, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 148, levelTo: 149, expNeeded: 13650000, forceEssence: 98, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 149, levelTo: 150, expNeeded: 13650000, forceEssence: 100, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 150, levelTo: 151, expNeeded: 13650000, forceEssence: 102, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 151, levelTo: 152, expNeeded: 14700000, forceEssence: 104, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 152, levelTo: 153, expNeeded: 14700000, forceEssence: 106, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 153, levelTo: 154, expNeeded: 14700000, forceEssence: 108, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 154, levelTo: 155, expNeeded: 14700000, forceEssence: 110, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 155, levelTo: 156, expNeeded: 14700000, forceEssence: 112, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 156, levelTo: 157, expNeeded: 14700000, forceEssence: 114, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 157, levelTo: 158, expNeeded: 14700000, forceEssence: 116, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 158, levelTo: 159, expNeeded: 14700000, forceEssence: 118, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 159, levelTo: 160, expNeeded: 14700000, forceEssence: 120, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 160, levelTo: 161, expNeeded: 14700000, forceEssence: 122, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 161, levelTo: 162, expNeeded: 15750000, forceEssence: 124, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 162, levelTo: 163, expNeeded: 15750000, forceEssence: 126, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 163, levelTo: 164, expNeeded: 15750000, forceEssence: 128, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 164, levelTo: 165, expNeeded: 15750000, forceEssence: 130, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 165, levelTo: 166, expNeeded: 15750000, forceEssence: 132, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 166, levelTo: 167, expNeeded: 15750000, forceEssence: 134, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 167, levelTo: 168, expNeeded: 15750000, forceEssence: 136, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 168, levelTo: 169, expNeeded: 15750000, forceEssence: 138, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 169, levelTo: 170, expNeeded: 15750000, forceEssence: 140, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 170, levelTo: 171, expNeeded: 15750000, forceEssence: 142, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 171, levelTo: 172, expNeeded: 16800000, forceEssence: 144, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 172, levelTo: 173, expNeeded: 16800000, forceEssence: 146, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 173, levelTo: 174, expNeeded: 16800000, forceEssence: 148, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 174, levelTo: 175, expNeeded: 16800000, forceEssence: 150, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 175, levelTo: 176, expNeeded: 16800000, forceEssence: 152, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 176, levelTo: 177, expNeeded: 16800000, forceEssence: 154, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 177, levelTo: 178, expNeeded: 16800000, forceEssence: 156, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 178, levelTo: 179, expNeeded: 16800000, forceEssence: 158, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 179, levelTo: 180, expNeeded: 16800000, forceEssence: 160, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 180, levelTo: 181, expNeeded: 16800000, forceEssence: 162, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 181, levelTo: 182, expNeeded: 17850000, forceEssence: 164, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 182, levelTo: 183, expNeeded: 17850000, forceEssence: 166, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 183, levelTo: 184, expNeeded: 17850000, forceEssence: 168, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 184, levelTo: 185, expNeeded: 17850000, forceEssence: 170, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 185, levelTo: 186, expNeeded: 17850000, forceEssence: 172, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 186, levelTo: 187, expNeeded: 17850000, forceEssence: 174, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 187, levelTo: 188, expNeeded: 17850000, forceEssence: 176, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 188, levelTo: 189, expNeeded: 17850000, forceEssence: 178, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 189, levelTo: 190, expNeeded: 17850000, forceEssence: 180, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 190, levelTo: 191, expNeeded: 17850000, forceEssence: 182, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 191, levelTo: 192, expNeeded: 18900000, forceEssence: 184, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 192, levelTo: 193, expNeeded: 18900000, forceEssence: 186, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 193, levelTo: 194, expNeeded: 18900000, forceEssence: 188, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 194, levelTo: 195, expNeeded: 18900000, forceEssence: 190, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 195, levelTo: 196, expNeeded: 18900000, forceEssence: 192, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 196, levelTo: 197, expNeeded: 18900000, forceEssence: 194, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 197, levelTo: 198, expNeeded: 18900000, forceEssence: 196, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 198, levelTo: 199, expNeeded: 18900000, forceEssence: 198, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 199, levelTo: 200, expNeeded: 18900000, forceEssence: 200, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  
  // Levels 201-300 (complete data from WordPress - where rare essences start appearing)
  { levelFrom: 201, levelTo: 202, expNeeded: 2000000, forceEssence: 6, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 202, levelTo: 203, expNeeded: 2230000, forceEssence: 9, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 203, levelTo: 204, expNeeded: 2482700, forceEssence: 12, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 204, levelTo: 205, expNeeded: 2760143, forceEssence: 15, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 205, levelTo: 206, expNeeded: 3064556, forceEssence: 18, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 206, levelTo: 207, expNeeded: 3398366, forceEssence: 21, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 207, levelTo: 208, expNeeded: 3764219, forceEssence: 24, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 208, levelTo: 209, expNeeded: 4164999, forceEssence: 27, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 209, levelTo: 210, expNeeded: 4603848, forceEssence: 30, uniqueEssenceOfWing: 2, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 210, levelTo: 211, expNeeded: 5084195, forceEssence: 33, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 211, levelTo: 212, expNeeded: 5609772, forceEssence: 36, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 212, levelTo: 213, expNeeded: 6184652, forceEssence: 39, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 213, levelTo: 214, expNeeded: 6813270, forceEssence: 42, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 214, levelTo: 215, expNeeded: 7500465, forceEssence: 45, uniqueEssenceOfWing: 3, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 215, levelTo: 216, expNeeded: 8251507, forceEssence: 48, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 216, levelTo: 217, expNeeded: 9072142, forceEssence: 51, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 217, levelTo: 218, expNeeded: 9968635, forceEssence: 54, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 218, levelTo: 219, expNeeded: 10947812, forceEssence: 57, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 219, levelTo: 220, expNeeded: 12017115, forceEssence: 60, uniqueEssenceOfWing: 4, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 220, levelTo: 221, expNeeded: 13184656, forceEssence: 63, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 221, levelTo: 222, expNeeded: 13931888, forceEssence: 66, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 222, levelTo: 223, expNeeded: 14716483, forceEssence: 69, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 223, levelTo: 224, expNeeded: 15540307, forceEssence: 72, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 224, levelTo: 225, expNeeded: 16405322, forceEssence: 75, uniqueEssenceOfWing: 5, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 225, levelTo: 226, expNeeded: 17313588, forceEssence: 78, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 226, levelTo: 227, expNeeded: 18267268, forceEssence: 81, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 227, levelTo: 228, expNeeded: 19268631, forceEssence: 84, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 228, levelTo: 229, expNeeded: 20320063, forceEssence: 87, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 229, levelTo: 230, expNeeded: 21424066, forceEssence: 90, uniqueEssenceOfWing: 6, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 230, levelTo: 231, expNeeded: 22583269, forceEssence: 93, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 231, levelTo: 232, expNeeded: 23800433, forceEssence: 96, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 232, levelTo: 233, expNeeded: 25078454, forceEssence: 99, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 233, levelTo: 234, expNeeded: 26420377, forceEssence: 102, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 234, levelTo: 235, expNeeded: 27829396, forceEssence: 105, uniqueEssenceOfWing: 7, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 235, levelTo: 236, expNeeded: 29308866, forceEssence: 108, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 236, levelTo: 237, expNeeded: 30862309, forceEssence: 111, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 237, levelTo: 238, expNeeded: 32493424, forceEssence: 114, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 238, levelTo: 239, expNeeded: 34206096, forceEssence: 117, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 239, levelTo: 240, expNeeded: 36004400, forceEssence: 120, uniqueEssenceOfWing: 8, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 240, levelTo: 241, expNeeded: 37892620, forceEssence: 123, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 241, levelTo: 242, expNeeded: 38020620, forceEssence: 126, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 242, levelTo: 243, expNeeded: 38150620, forceEssence: 129, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 243, levelTo: 244, expNeeded: 38282620, forceEssence: 132, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 244, levelTo: 245, expNeeded: 38416620, forceEssence: 135, uniqueEssenceOfWing: 9, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 245, levelTo: 246, expNeeded: 38552620, forceEssence: 138, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 246, levelTo: 247, expNeeded: 38690620, forceEssence: 141, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 247, levelTo: 248, expNeeded: 38830620, forceEssence: 144, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 248, levelTo: 249, expNeeded: 38972620, forceEssence: 147, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 249, levelTo: 250, expNeeded: 39116620, forceEssence: 150, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 250, levelTo: 251, expNeeded: 39262620, forceEssence: 153, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 251, levelTo: 252, expNeeded: 39410620, forceEssence: 156, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 252, levelTo: 253, expNeeded: 39560620, forceEssence: 159, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 253, levelTo: 254, expNeeded: 39712620, forceEssence: 162, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 254, levelTo: 255, expNeeded: 39866620, forceEssence: 165, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 255, levelTo: 256, expNeeded: 40022620, forceEssence: 168, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 256, levelTo: 257, expNeeded: 40180620, forceEssence: 171, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 257, levelTo: 258, expNeeded: 40340620, forceEssence: 174, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 258, levelTo: 259, expNeeded: 40502620, forceEssence: 177, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 259, levelTo: 260, expNeeded: 40666620, forceEssence: 180, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 260, levelTo: 261, expNeeded: 40832620, forceEssence: 183, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 261, levelTo: 262, expNeeded: 41000620, forceEssence: 186, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 262, levelTo: 263, expNeeded: 41170620, forceEssence: 189, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 263, levelTo: 264, expNeeded: 41342620, forceEssence: 192, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 264, levelTo: 265, expNeeded: 41516620, forceEssence: 195, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 265, levelTo: 266, expNeeded: 41692620, forceEssence: 198, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 266, levelTo: 267, expNeeded: 41870620, forceEssence: 201, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 267, levelTo: 268, expNeeded: 42050620, forceEssence: 204, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 268, levelTo: 269, expNeeded: 42232620, forceEssence: 207, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 269, levelTo: 270, expNeeded: 42416620, forceEssence: 210, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 270, levelTo: 271, expNeeded: 42602620, forceEssence: 213, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 271, levelTo: 272, expNeeded: 42790620, forceEssence: 216, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 272, levelTo: 273, expNeeded: 42980620, forceEssence: 219, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 273, levelTo: 274, expNeeded: 43172620, forceEssence: 222, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 274, levelTo: 275, expNeeded: 43366620, forceEssence: 225, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 275, levelTo: 276, expNeeded: 43562620, forceEssence: 228, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 276, levelTo: 277, expNeeded: 43760620, forceEssence: 231, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 277, levelTo: 278, expNeeded: 43960620, forceEssence: 234, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 278, levelTo: 279, expNeeded: 44162620, forceEssence: 237, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 279, levelTo: 280, expNeeded: 44366620, forceEssence: 240, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 280, levelTo: 281, expNeeded: 44572620, forceEssence: 243, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 281, levelTo: 282, expNeeded: 44780620, forceEssence: 246, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 282, levelTo: 283, expNeeded: 44990620, forceEssence: 249, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 283, levelTo: 284, expNeeded: 45202620, forceEssence: 252, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 284, levelTo: 285, expNeeded: 45416620, forceEssence: 255, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 285, levelTo: 286, expNeeded: 45632620, forceEssence: 258, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 286, levelTo: 287, expNeeded: 45850620, forceEssence: 261, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 287, levelTo: 288, expNeeded: 46070620, forceEssence: 264, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 288, levelTo: 289, expNeeded: 46292620, forceEssence: 267, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 289, levelTo: 290, expNeeded: 46516620, forceEssence: 270, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 290, levelTo: 291, expNeeded: 46742620, forceEssence: 273, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 291, levelTo: 292, expNeeded: 46970620, forceEssence: 276, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 292, levelTo: 293, expNeeded: 47200620, forceEssence: 279, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 293, levelTo: 294, expNeeded: 47432620, forceEssence: 282, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 294, levelTo: 295, expNeeded: 47666620, forceEssence: 285, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 295, levelTo: 296, expNeeded: 47902620, forceEssence: 288, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 296, levelTo: 297, expNeeded: 48140620, forceEssence: 291, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 297, levelTo: 298, expNeeded: 48380620, forceEssence: 294, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 298, levelTo: 299, expNeeded: 48622620, forceEssence: 297, uniqueEssenceOfWing: 0, rareEssenceOfWing: 1, epicEssenceOfWing: 0 },
  { levelFrom: 299, levelTo: 300, expNeeded: 48866620, forceEssence: 300, uniqueEssenceOfWing: 10, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  
  // Levels 301-400 (complete data from WordPress - where epic essences appear)
  { levelFrom: 301, levelTo: 302, expNeeded: 4275000, forceEssence: 8, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 302, levelTo: 303, expNeeded: 6425000, forceEssence: 12, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 303, levelTo: 304, expNeeded: 8575000, forceEssence: 16, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 304, levelTo: 305, expNeeded: 10725000, forceEssence: 20, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 305, levelTo: 306, expNeeded: 12875000, forceEssence: 24, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 306, levelTo: 307, expNeeded: 15025000, forceEssence: 28, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 307, levelTo: 308, expNeeded: 17175000, forceEssence: 32, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 308, levelTo: 309, expNeeded: 19325000, forceEssence: 36, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 309, levelTo: 310, expNeeded: 21475000, forceEssence: 40, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 2 },
  { levelFrom: 310, levelTo: 311, expNeeded: 23625000, forceEssence: 44, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 311, levelTo: 312, expNeeded: 25775000, forceEssence: 48, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 312, levelTo: 313, expNeeded: 27925000, forceEssence: 52, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 313, levelTo: 314, expNeeded: 30075000, forceEssence: 56, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 314, levelTo: 315, expNeeded: 32225000, forceEssence: 60, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 3 },
  { levelFrom: 315, levelTo: 316, expNeeded: 34375000, forceEssence: 64, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 316, levelTo: 317, expNeeded: 36525000, forceEssence: 68, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 317, levelTo: 318, expNeeded: 38675000, forceEssence: 72, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 318, levelTo: 319, expNeeded: 40825000, forceEssence: 76, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 319, levelTo: 320, expNeeded: 42975000, forceEssence: 80, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 4 },
  { levelFrom: 320, levelTo: 321, expNeeded: 45125000, forceEssence: 84, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 321, levelTo: 322, expNeeded: 49775000, forceEssence: 88, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 322, levelTo: 323, expNeeded: 49775000, forceEssence: 92, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 323, levelTo: 324, expNeeded: 49775000, forceEssence: 96, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 324, levelTo: 325, expNeeded: 49775000, forceEssence: 100, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 5 },
  { levelFrom: 325, levelTo: 326, expNeeded: 49775000, forceEssence: 104, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 326, levelTo: 327, expNeeded: 55122500, forceEssence: 108, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 327, levelTo: 328, expNeeded: 55122500, forceEssence: 112, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 328, levelTo: 329, expNeeded: 55122500, forceEssence: 116, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 329, levelTo: 330, expNeeded: 55122500, forceEssence: 120, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 6 },
  { levelFrom: 330, levelTo: 331, expNeeded: 55122500, forceEssence: 124, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 331, levelTo: 332, expNeeded: 61272125, forceEssence: 128, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 332, levelTo: 333, expNeeded: 61272125, forceEssence: 132, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 333, levelTo: 334, expNeeded: 61272125, forceEssence: 136, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 334, levelTo: 335, expNeeded: 61272125, forceEssence: 140, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 7 },
  { levelFrom: 335, levelTo: 336, expNeeded: 61272125, forceEssence: 144, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 336, levelTo: 337, expNeeded: 68344194, forceEssence: 148, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 337, levelTo: 338, expNeeded: 68344194, forceEssence: 152, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 338, levelTo: 339, expNeeded: 68344194, forceEssence: 156, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 339, levelTo: 340, expNeeded: 68344194, forceEssence: 160, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 8 },
  { levelFrom: 340, levelTo: 341, expNeeded: 68344194, forceEssence: 164, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 341, levelTo: 342, expNeeded: 76477073, forceEssence: 168, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 342, levelTo: 343, expNeeded: 76477073, forceEssence: 172, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 343, levelTo: 344, expNeeded: 76477073, forceEssence: 176, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 344, levelTo: 345, expNeeded: 76477073, forceEssence: 180, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 9 },
  { levelFrom: 345, levelTo: 346, expNeeded: 76477073, forceEssence: 184, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 346, levelTo: 347, expNeeded: 85829884, forceEssence: 188, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 347, levelTo: 348, expNeeded: 85829884, forceEssence: 192, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 348, levelTo: 349, expNeeded: 85829884, forceEssence: 196, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 349, levelTo: 350, expNeeded: 85829884, forceEssence: 200, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 350, levelTo: 351, expNeeded: 85829884, forceEssence: 204, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 351, levelTo: 352, expNeeded: 96585617, forceEssence: 208, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 352, levelTo: 353, expNeeded: 96585617, forceEssence: 212, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 353, levelTo: 354, expNeeded: 96585617, forceEssence: 216, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 354, levelTo: 355, expNeeded: 96585617, forceEssence: 220, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 355, levelTo: 356, expNeeded: 96585617, forceEssence: 224, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 356, levelTo: 357, expNeeded: 108954710, forceEssence: 228, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 357, levelTo: 358, expNeeded: 108954710, forceEssence: 232, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 358, levelTo: 359, expNeeded: 108954710, forceEssence: 236, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 359, levelTo: 360, expNeeded: 108954710, forceEssence: 240, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 360, levelTo: 361, expNeeded: 108954710, forceEssence: 244, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 361, levelTo: 362, expNeeded: 123179167, forceEssence: 248, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 362, levelTo: 363, expNeeded: 123179167, forceEssence: 252, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 363, levelTo: 364, expNeeded: 123179167, forceEssence: 256, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 364, levelTo: 365, expNeeded: 123179167, forceEssence: 260, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 365, levelTo: 366, expNeeded: 123179167, forceEssence: 264, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 366, levelTo: 367, expNeeded: 139537293, forceEssence: 268, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 367, levelTo: 368, expNeeded: 139537293, forceEssence: 272, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 368, levelTo: 369, expNeeded: 139537293, forceEssence: 276, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 369, levelTo: 370, expNeeded: 139537293, forceEssence: 280, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 370, levelTo: 371, expNeeded: 139537293, forceEssence: 284, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 371, levelTo: 372, expNeeded: 158349138, forceEssence: 288, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 372, levelTo: 373, expNeeded: 158349138, forceEssence: 292, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 373, levelTo: 374, expNeeded: 158349138, forceEssence: 296, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 374, levelTo: 375, expNeeded: 158349138, forceEssence: 300, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 375, levelTo: 376, expNeeded: 158349138, forceEssence: 304, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 376, levelTo: 377, expNeeded: 179982760, forceEssence: 308, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 377, levelTo: 378, expNeeded: 179982760, forceEssence: 312, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 378, levelTo: 379, expNeeded: 179982760, forceEssence: 316, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 379, levelTo: 380, expNeeded: 179982760, forceEssence: 320, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 380, levelTo: 381, expNeeded: 179982760, forceEssence: 324, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 381, levelTo: 382, expNeeded: 204861425, forceEssence: 328, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 382, levelTo: 383, expNeeded: 204861425, forceEssence: 332, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 383, levelTo: 384, expNeeded: 204861425, forceEssence: 336, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 384, levelTo: 385, expNeeded: 204861425, forceEssence: 340, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 385, levelTo: 386, expNeeded: 204861425, forceEssence: 344, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 386, levelTo: 387, expNeeded: 233471890, forceEssence: 348, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 387, levelTo: 388, expNeeded: 233471890, forceEssence: 352, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 388, levelTo: 389, expNeeded: 233471890, forceEssence: 356, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 389, levelTo: 390, expNeeded: 233471890, forceEssence: 360, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 390, levelTo: 391, expNeeded: 233471890, forceEssence: 364, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 391, levelTo: 392, expNeeded: 266373925, forceEssence: 368, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 392, levelTo: 393, expNeeded: 266373925, forceEssence: 372, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 393, levelTo: 394, expNeeded: 266373925, forceEssence: 376, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 394, levelTo: 395, expNeeded: 266373925, forceEssence: 380, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 395, levelTo: 396, expNeeded: 266373925, forceEssence: 384, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 396, levelTo: 397, expNeeded: 304211265, forceEssence: 388, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 397, levelTo: 398, expNeeded: 304211265, forceEssence: 392, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 398, levelTo: 399, expNeeded: 304211265, forceEssence: 396, uniqueEssenceOfWing: 1, rareEssenceOfWing: 0, epicEssenceOfWing: 0 },
  { levelFrom: 399, levelTo: 400, expNeeded: 304211265, forceEssence: 400, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 10 },
  { levelFrom: 401, levelTo: 402, expNeeded: 22800400, forceEssence: 10, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 402, levelTo: 403, expNeeded: 21226800, forceEssence: 15, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 403, levelTo: 404, expNeeded: 21834400, forceEssence: 20, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 404, levelTo: 405, expNeeded: 23217600, forceEssence: 25, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 405, levelTo: 406, expNeeded: 25051600, forceEssence: 30, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 406, levelTo: 407, expNeeded: 27232800, forceEssence: 35, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 407, levelTo: 408, expNeeded: 29724800, forceEssence: 40, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 408, levelTo: 409, expNeeded: 32520600, forceEssence: 45, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 409, levelTo: 410, expNeeded: 35628600, forceEssence: 50, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 2 },
  { levelFrom: 410, levelTo: 411, expNeeded: 39061400, forceEssence: 55, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 411, levelTo: 412, expNeeded: 42841400, forceEssence: 60, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 412, levelTo: 413, expNeeded: 46995200, forceEssence: 65, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 413, levelTo: 414, expNeeded: 51549400, forceEssence: 70, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 414, levelTo: 415, expNeeded: 56539000, forceEssence: 75, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 3 },
  { levelFrom: 415, levelTo: 416, expNeeded: 61999000, forceEssence: 80, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 416, levelTo: 417, expNeeded: 67971400, forceEssence: 85, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 417, levelTo: 418, expNeeded: 74499600, forceEssence: 90, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 418, levelTo: 419, expNeeded: 81634000, forceEssence: 95, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 419, levelTo: 420, expNeeded: 89426400, forceEssence: 100, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 4 },
  { levelFrom: 420, levelTo: 421, expNeeded: 97935600, forceEssence: 105, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 421, levelTo: 422, expNeeded: 107234800, forceEssence: 110, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 422, levelTo: 423, expNeeded: 117399600, forceEssence: 115, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 423, levelTo: 424, expNeeded: 114595600, forceEssence: 120, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 424, levelTo: 425, expNeeded: 120974000, forceEssence: 125, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 5 },
  { levelFrom: 425, levelTo: 426, expNeeded: 127671600, forceEssence: 130, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 426, levelTo: 427, expNeeded: 149175600, forceEssence: 135, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 427, levelTo: 428, expNeeded: 157353000, forceEssence: 140, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 428, levelTo: 429, expNeeded: 165939200, forceEssence: 145, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 429, levelTo: 430, expNeeded: 174955200, forceEssence: 150, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 6 },
  { levelFrom: 430, levelTo: 431, expNeeded: 184422000, forceEssence: 155, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 431, levelTo: 432, expNeeded: 192033200, forceEssence: 160, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 432, levelTo: 433, expNeeded: 170734200, forceEssence: 165, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 433, levelTo: 434, expNeeded: 179870600, forceEssence: 170, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 434, levelTo: 435, expNeeded: 189463400, forceEssence: 175, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 7 },
  { levelFrom: 435, levelTo: 436, expNeeded: 199535000, forceEssence: 180, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 436, levelTo: 437, expNeeded: 234362800, forceEssence: 185, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 437, levelTo: 438, expNeeded: 246748600, forceEssence: 190, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 438, levelTo: 439, expNeeded: 259754600, forceEssence: 195, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 439, levelTo: 440, expNeeded: 273410200, forceEssence: 200, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 8 },
  { levelFrom: 440, levelTo: 441, expNeeded: 287749000, forceEssence: 205, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 441, levelTo: 442, expNeeded: 298226600, forceEssence: 210, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 442, levelTo: 443, expNeeded: 299245800, forceEssence: 215, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 443, levelTo: 444, expNeeded: 300281800, forceEssence: 220, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 444, levelTo: 445, expNeeded: 301331800, forceEssence: 225, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 9 },
  { levelFrom: 445, levelTo: 446, expNeeded: 302398600, forceEssence: 230, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 446, levelTo: 447, expNeeded: 340596200, forceEssence: 235, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 447, levelTo: 448, expNeeded: 341828200, forceEssence: 240, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 448, levelTo: 449, expNeeded: 343078400, forceEssence: 245, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 449, levelTo: 450, expNeeded: 344346800, forceEssence: 250, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 450, levelTo: 451, expNeeded: 345632000, forceEssence: 255, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 451, levelTo: 452, expNeeded: 362524400, forceEssence: 260, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 452, levelTo: 453, expNeeded: 363903400, forceEssence: 265, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 453, levelTo: 454, expNeeded: 365302000, forceEssence: 270, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 454, levelTo: 455, expNeeded: 366718800, forceEssence: 275, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 455, levelTo: 456, expNeeded: 368153800, forceEssence: 280, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 456, levelTo: 457, expNeeded: 416939600, forceEssence: 285, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 457, levelTo: 458, expNeeded: 418600000, forceEssence: 290, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 458, levelTo: 459, expNeeded: 420281400, forceEssence: 295, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 459, levelTo: 460, expNeeded: 421982400, forceEssence: 300, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 460, levelTo: 461, expNeeded: 423705800, forceEssence: 305, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 461, levelTo: 462, expNeeded: 448926800, forceEssence: 310, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 462, levelTo: 463, expNeeded: 450787400, forceEssence: 315, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 463, levelTo: 464, expNeeded: 452670400, forceEssence: 320, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 464, levelTo: 465, expNeeded: 454575800, forceEssence: 325, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 465, levelTo: 466, expNeeded: 456503600, forceEssence: 330, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 466, levelTo: 467, expNeeded: 519334200, forceEssence: 335, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 467, levelTo: 468, expNeeded: 521536200, forceEssence: 340, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 468, levelTo: 469, expNeeded: 523824000, forceEssence: 345, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 469, levelTo: 470, expNeeded: 526106000, forceEssence: 350, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 470, levelTo: 471, expNeeded: 528413200, forceEssence: 355, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 471, levelTo: 472, expNeeded: 564655000, forceEssence: 360, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 472, levelTo: 473, expNeeded: 567162400, forceEssence: 365, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 473, levelTo: 474, expNeeded: 569695000, forceEssence: 370, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 474, levelTo: 475, expNeeded: 572255600, forceEssence: 375, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 475, levelTo: 476, expNeeded: 574841400, forceEssence: 380, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 476, levelTo: 477, expNeeded: 656346600, forceEssence: 385, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 477, levelTo: 478, expNeeded: 659346800, forceEssence: 390, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 478, levelTo: 479, expNeeded: 662376400, forceEssence: 395, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 479, levelTo: 480, expNeeded: 665435400, forceEssence: 400, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 480, levelTo: 481, expNeeded: 668525200, forceEssence: 405, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 481, levelTo: 482, expNeeded: 718516000, forceEssence: 410, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 482, levelTo: 483, expNeeded: 722890000, forceEssence: 415, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 483, levelTo: 484, expNeeded: 726296200, forceEssence: 420, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 484, levelTo: 485, expNeeded: 729734600, forceEssence: 425, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 485, levelTo: 486, expNeeded: 733205200, forceEssence: 430, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 486, levelTo: 487, expNeeded: 839594000, forceEssence: 435, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 487, levelTo: 488, expNeeded: 843623200, forceEssence: 440, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 488, levelTo: 489, expNeeded: 847688800, forceEssence: 445, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 489, levelTo: 490, expNeeded: 851789400, forceEssence: 450, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 490, levelTo: 491, expNeeded: 855927800, forceEssence: 455, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 491, levelTo: 492, expNeeded: 926795800, forceEssence: 460, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 492, levelTo: 493, expNeeded: 931334600, forceEssence: 465, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 493, levelTo: 494, expNeeded: 935912600, forceEssence: 470, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 494, levelTo: 495, expNeeded: 940529800, forceEssence: 475, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 },
  { levelFrom: 495, levelTo: 496, expNeeded: 945186200, forceEssence: 480, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 496, levelTo: 497, expNeeded: 1004808200, forceEssence: 485, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 497, levelTo: 498, expNeeded: 1090216400, forceEssence: 490, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 498, levelTo: 499, expNeeded: 1095670800, forceEssence: 495, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 1, masterEssenceOfWing: 0 },
  { levelFrom: 499, levelTo: 500, expNeeded: 1101168600, forceEssence: 500, uniqueEssenceOfWing: 0, rareEssenceOfWing: 0, epicEssenceOfWing: 0, masterEssenceOfWing: 10 }


];

// Wing EXP potions - from WordPress version
const wingExpPots = [
  { name: "Force Wing EXP Potion (5,000,000)", exp: 5000000 },
  { name: "Force Wing EXP Potion (2,500,000)", exp: 2500000 },
  { name: "Force Wing EXP Potion (2,000,000)", exp: 2000000 },
  { name: "Force Wing EXP Potion (1,500,000)", exp: 1500000 },
  { name: "Force Wing EXP Potion (1,000,000)", exp: 1000000 },
  { name: "Force Wing EXP Potion (500,000)", exp: 500000 },
  { name: "Force Wing EXP Potion (200,000)", exp: 200000 },
  { name: "Force Wing EXP Potion (100,000)", exp: 100000 }
];

// formatNumber is now imported from central utility

interface CalculationResult {
  totalExpNeeded: number;
  totalForceEssence: number;
  totalUniqueEssence: number;
  totalRareEssence: number;
  totalEpicEssence: number;
  totalMasterEssence: number;
  potionsNeeded: Array<{
    name: string;
    exp: number;
    count: number;
  }>;
  levelBreakdown: Array<{
    level: number;
    expNeeded: number;
    forceEssence: number;
    uniqueEssence: number;
    rareEssence: number;
    epicEssence: number;
    masterEssence: number;
  }>;
}

export default function ForceWingCalculator() {
  const [currentLevel, setCurrentLevel] = useState<number>(1);
  const [currentPercentage, setCurrentPercentage] = useState<number>(0);
  const [targetLevel, setTargetLevel] = useState<number>(500);
  const [error, setError] = useState<string>('');
  const [result, setResult] = useState<CalculationResult | null>(null);

  const validateInputs = useCallback((current: number, target: number, percentage: number): string => {
    if (current < 1 || current > 499) return 'Current level must be between 1 and 499';
    if (target < 2 || target > 500) return 'Target level must be between 2 and 500';
    if (current >= target) return 'Target level must be higher than current level';
    if (percentage < 0 || percentage > 99) return 'Percentage must be between 0 and 99';
    return '';
  }, []);

  const calculateForceWing = useCallback(() => {
    const validationError = validateInputs(currentLevel, targetLevel, currentPercentage);
    if (validationError) {
      setError(validationError);
      setResult(null);
      return;
    }

    setError('');

    let totalExpNeeded = 0;
    let totalForceEssence = 0;
    let totalUniqueEssence = 0;
    let totalRareEssence = 0;
    let totalEpicEssence = 0;
    let totalMasterEssence = 0;
    const levelBreakdown: CalculationResult['levelBreakdown'] = [];

    // Calculate from current level to target level
    for (let level = currentLevel; level < targetLevel; level++) {
      const levelData = forceWingLevels.find(item => item.levelFrom === level);
      if (!levelData) continue;

      let expForThisLevel = levelData.expNeeded;
      
      // If this is the current level, account for percentage progress
      if (level === currentLevel && currentPercentage > 0) {
        expForThisLevel = expForThisLevel * ((100 - currentPercentage) / 100);
      }

      totalExpNeeded += expForThisLevel;
      totalForceEssence += levelData.forceEssence;
      totalUniqueEssence += levelData.uniqueEssenceOfWing;
      totalRareEssence += levelData.rareEssenceOfWing;
      totalEpicEssence += levelData.epicEssenceOfWing;
      totalMasterEssence += (levelData as any).masterEssenceOfWing || 0;

      levelBreakdown.push({
        level: levelData.levelTo,
        expNeeded: expForThisLevel,
        forceEssence: levelData.forceEssence,
        uniqueEssence: levelData.uniqueEssenceOfWing,
        rareEssence: levelData.rareEssenceOfWing,
        epicEssence: levelData.epicEssenceOfWing,
        masterEssence: (levelData as any).masterEssenceOfWing || 0
      });
    }

    // Calculate potions needed
    const potionsNeeded = wingExpPots.map(pot => ({
      name: pot.name,
      exp: pot.exp,
      count: Math.ceil(totalExpNeeded / pot.exp)
    }));

    setResult({
      totalExpNeeded,
      totalForceEssence,
      totalUniqueEssence,
      totalRareEssence,
      totalEpicEssence,
      totalMasterEssence,
      potionsNeeded,
      levelBreakdown
    });
  }, [currentLevel, currentPercentage, targetLevel, validateInputs]);

  const handleCurrentLevelChange = (value: number) => {
    const level = Math.min(499, value);
    setCurrentLevel(level);
  };

  const handleTargetLevelChange = (value: number) => {
    if (isNaN(value)) return; // Allow free input without forcing a value
    const level = Math.min(500, value);
    setTargetLevel(level);
  };

  const handlePercentageChange = (value: number) => {
    const percentage = Math.max(0, Math.min(99, value));
    setCurrentPercentage(percentage);
  };

  return (
    <div>
      {/* Form */}
      <div className="p-6 space-y-4">
        <div className="space-y-1">
          <label htmlFor="current-level" className="block text-sm font-medium text-foreground">
            Current Force Wing Level
          </label>
          <input
            type="number"
            id="current-level"
            min="1"
            max="499"
            value={currentLevel}
            onChange={(e) => handleCurrentLevelChange(parseInt(e.target.value) || 1)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter current level (1-499)"
          />
        </div>

        <div className="space-y-1">
          <label htmlFor="current-percentage" className="block text-sm font-medium text-foreground">
            Current Level Percentage (Optional)
          </label>
          <input
            type="number"
            id="current-percentage"
            min="0"
            max="99"
            value={currentPercentage}
            onChange={(e) => handlePercentageChange(parseInt(e.target.value) || 0)}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter current % (0-99)"
          />
          <p className="text-xs text-foreground/60">If you're 50% through your current level, enter 50</p>
        </div>

        <div className="space-y-1">
          <label htmlFor="target-level" className="block text-sm font-medium text-foreground">
            Target Force Wing Level
          </label>
          <input
            type="number"
            id="target-level"
            min="2"
            max="500"
            value={targetLevel || ''}
            onChange={(e) => handleTargetLevelChange(parseInt(e.target.value))}
            className="w-full bg-theme-dark border border-border-dark rounded-lg px-4 py-2 text-foreground focus:outline-none focus:border-game-highlight"
            placeholder="Enter target level (2-500)"
          />
        </div>

        <button
          onClick={calculateForceWing}
          className="w-full bg-game-highlight hover:bg-game-highlight/80 text-black font-semibold py-3 px-6 rounded-lg transition-all duration-200"
        >
          Calculate
        </button>
      </div>

      {/* Error Display */}
      {error && (
        <div className="mx-6 mb-6 p-4 bg-red-500/20 border border-red-500/40 rounded-lg">
          <p className="text-red-400 text-sm">{error}</p>
        </div>
      )}

      {/* Results */}
      {result && (
        <div className="mx-6 mb-6 glass-panel-light p-6 space-y-4">
          {/* Summary Table */}
          <div className="overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="border-b border-border-dark">
                  <th className="text-left py-3 px-4 text-foreground font-semibold">Summary</th>
                  <th className="text-right py-3 px-4 text-foreground font-semibold">Value</th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-game-highlight/10">
                  <td className="py-2 px-4 text-foreground font-medium">Total EXP Needed</td>
                  <td className="py-2 px-4 text-right text-game-highlight font-bold">{formatNumber(Math.round(result.totalExpNeeded))}</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Materials Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              Materials Needed
            </h3>
            
            <div className="overflow-x-auto">
              <table className="w-full border-collapse">
                <thead>
                  <tr className="border-b border-border-dark">
                    <th className="text-left py-3 px-4 text-foreground font-semibold">Material</th>
                    <th className="text-right py-3 px-4 text-foreground font-semibold">Quantity</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                    <td className="py-2 px-4">
                      <div className="flex items-center space-x-3">
                        <div className="w-6 h-6 bg-game-highlight/20 rounded border border-game-highlight/40 flex items-center justify-center flex-shrink-0">
                          <img 
                            src="/images/exp/force_essence_icon.png" 
                            alt="Force Essence" 
                            className="w-4 h-4"
                          />
                        </div>
                        <span className="text-foreground text-sm">Force Essence</span>
                      </div>
                    </td>
                    <td className="py-2 px-4 text-right text-foreground font-semibold">{formatNumber(result.totalForceEssence)}</td>
                  </tr>
                  
                  {result.totalUniqueEssence > 0 && (
                    <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                      <td className="py-2 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-stat-utility/20 rounded border border-stat-utility/40 flex items-center justify-center flex-shrink-0">
                            <img 
                              src="/images/exp/unique_essence_wing_icon.png" 
                              alt="Unique Essence of Wing" 
                              className="w-4 h-4"
                            />
                          </div>
                          <span className="text-foreground text-sm">Unique Essence of Wing</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-right text-stat-utility font-semibold">{formatNumber(result.totalUniqueEssence)}</td>
                    </tr>
                  )}
                  
                  {result.totalRareEssence > 0 && (
                    <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                      <td className="py-2 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-game-gold/20 rounded border border-game-gold/40 flex items-center justify-center flex-shrink-0">
                            <img 
                              src="/images/exp/rare_essence_wing_icon.png" 
                              alt="Rare Essence of Wing" 
                              className="w-4 h-4"
                            />
                          </div>
                          <span className="text-foreground text-sm">Rare Essence of Wing</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-right text-game-gold font-semibold">{formatNumber(result.totalRareEssence)}</td>
                    </tr>
                  )}
                  
                  {result.totalEpicEssence > 0 && (
                    <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                      <td className="py-2 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-stat-offensive/20 rounded border border-stat-offensive/40 flex items-center justify-center flex-shrink-0">
                            <img 
                              src="/images/exp/epic_essence_wing_icon.png" 
                              alt="Epic Essence of Wing" 
                              className="w-4 h-4"
                            />
                          </div>
                          <span className="text-foreground text-sm">Epic Essence of Wing</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-right text-stat-offensive font-semibold">{formatNumber(result.totalEpicEssence)}</td>
                    </tr>
                  )}
                  
                  {result.totalMasterEssence > 0 && (
                    <tr className="border-b border-border-dark hover:bg-theme-dark/30">
                      <td className="py-2 px-4">
                        <div className="flex items-center space-x-3">
                          <div className="w-6 h-6 bg-game-gold/20 rounded border border-game-gold/40 flex items-center justify-center flex-shrink-0">
                            <img 
                              src="/images/exp/master_essence_wing_icon.png" 
                              alt="Master Essence of Wing" 
                              className="w-4 h-4"
                            />
                          </div>
                          <span className="text-foreground text-sm">Master Essence of Wing</span>
                        </div>
                      </td>
                      <td className="py-2 px-4 text-right text-game-gold font-semibold">{formatNumber(result.totalMasterEssence)}</td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
          </div>

          {/* Wing EXP Potions Table */}
          <div className="space-y-3">
            <h3 className="text-lg font-semibold text-foreground border-b border-border-dark pb-2">
              Wing EXP Potions Needed (Choose One)
            </h3>
            <p className="text-xs text-foreground/60 mb-3">Each row shows how many potions of that type you need to reach your goal.</p>
            
            {result.potionsNeeded.filter(pot => pot.count > 0).length > 0 ? (
              <div className="overflow-x-auto">
                <table className="w-full border-collapse">
                  <thead>
                    <tr className="border-b border-border-dark">
                      <th className="text-left py-3 px-4 text-foreground font-semibold">Potion Option</th>
                      <th className="text-center py-3 px-4 text-foreground font-semibold">EXP Value</th>
                      <th className="text-right py-3 px-4 text-foreground font-semibold">Quantity Needed</th>
                    </tr>
                  </thead>
                  <tbody>
                    {result.potionsNeeded.filter(pot => pot.count > 0).map((pot, index) => (
                      <tr key={index} className="border-b border-border-dark hover:bg-theme-dark/30">
                        <td className="py-2 px-4">
                          <div className="flex items-center space-x-3">
                            <div className="w-6 h-6 bg-game-highlight/20 rounded border border-game-highlight/40 flex items-center justify-center flex-shrink-0">
                              <img 
                                src="/images/exp/wing_exp_pot_icon.png" 
                                alt="Wing EXP Potion" 
                                className="w-4 h-4"
                              />
                            </div>
                            <span className="text-foreground text-sm">{pot.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-4 text-center text-foreground/80 text-sm">{formatNumber(pot.exp)}</td>
                        <td className="py-2 px-4 text-right text-foreground font-semibold">{formatNumber(pot.count)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <p className="text-foreground/60 text-center py-4">No potions needed - you're already at your target level!</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
}