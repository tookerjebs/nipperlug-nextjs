/**
 * Devil Shop Calculator - Item Data
 * Complete item list from the original WordPress calculator
 */

export interface DevilShopItem {
  name: string;
  quantity: number;
  tokenType: 'High' | 'Highest';
  tokensRequired: number;
}

// Complete devil shop items list
export const DEVIL_SHOP_ITEMS: DevilShopItem[] = [
  {
    "name": "Material Core(Osmium)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Material Core(Red Osmium)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Material Core(SIGMetal)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 2
  },
  {
    "name": "Material Core(Mithril)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 1
  },
  {
    "name": "Material Core(Archridium)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 3
  },
  {
    "name": "Material Core(Palladium)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 5
  },
  {
    "name": "Quartz Core(Lapis)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Quartz Core(Topaz)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 2
  },
  {
    "name": "Quartz Core(SIGMetal)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 3
  },
  {
    "name": "Quartz Core(Mithril)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 1
  },
  {
    "name": "Quartz Core(Archridium)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 3
  },
  {
    "name": "Quartz Core(Palladium)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 5
  },
  {
    "name": "Astral Core(Lapis)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Astral Core(Topaz)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Astral Core(SIGMetal)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Astral Core(Mithril)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 1
  },
  {
    "name": "Astral Core(Archridium)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 1
  },
  {
    "name": "Astral Core(Palladium)",
    "quantity": 127,
    "tokenType": "Highest",
    "tokensRequired": 1
  },
  {
    "name": "Slot Extender(Highest)",
    "quantity": 1,
    "tokenType": "Highest",
    "tokensRequired": 2000
  },
  {
    "name": "Slot Extender(High)",
    "quantity": 1,
    "tokenType": "High",
    "tokensRequired": 500
  },
  {
    "name": "Upgrade Core(Crystal)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 10
  },
  {
    "name": "Force Core(Crystal)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 10
  },
  {
    "name": "Upgrade Core(Piece)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  },
  {
    "name": "Force Core(Piece)",
    "quantity": 127,
    "tokenType": "High",
    "tokensRequired": 1
  }
];

// Helper functions
export function getItemsByTokenType(tokenType: 'High' | 'Highest'): DevilShopItem[] {
  return DEVIL_SHOP_ITEMS.filter(item => item.tokenType === tokenType);
}

export function getTokenCost(itemName: string): { tokenType: 'High' | 'Highest'; cost: number } | null {
  const item = DEVIL_SHOP_ITEMS.find(item => item.name === itemName);
  if (!item) return null;
  
  return {
    tokenType: item.tokenType,
    cost: item.tokensRequired
  };
}

export function getHighTokenItems(): DevilShopItem[] {
  return getItemsByTokenType('High');
}

export function getHighestTokenItems(): DevilShopItem[] {
  return getItemsByTokenType('Highest');
}