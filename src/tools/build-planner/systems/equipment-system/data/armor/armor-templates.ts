/**
 * Armor Templates
 * Contains template definitions for different armor types and their material grades
 */

import { ArmorTemplate } from './armor-types';

/**
 * Material grade mapping
 */
export const armorMaterialGrades: Record<string, string> = {
  palladium: 'highest',
  demonite: 'ultimate',
  dragonium: 'ultimate',
  archridium: 'highest',
  'shadow titanium': 'medium',
  mithril: 'highest',
  sigmetal: 'high',
  osmium: 'high'
};

/**
 * Get display name for armor based on weight and subtype
 */
export function getArmorDisplayName(materialGrade: string, armorType: string, weight?: string): string {
  const materialName = materialGrade.charAt(0).toUpperCase() + materialGrade.slice(1);
  
  // Handle body armor with weight-specific names
  if (armorType.startsWith('body_')) {
    const weightDisplayNames = {
      'body_light': 'Suit',
      'body_medium': 'Coat', 
      'body_heavy': 'Plate'
    };
    return `${materialName} ${weightDisplayNames[armorType as keyof typeof weightDisplayNames] || 'Body'}`;
  }
  
  // Handle helmet armor with weight-specific names
  if (armorType.startsWith('helmet_')) {
    const weightDisplayNames = {
      'helmet_light': 'Headpiece',
      'helmet_medium': 'Headgear', 
      'helmet_heavy': 'Visor'
    };
    return `${materialName} ${weightDisplayNames[armorType as keyof typeof weightDisplayNames] || 'Helmet'}`;
  }
  
  // Handle shoes armor with weight-specific names
  if (armorType.startsWith('shoes_')) {
    const weightDisplayNames = {
      'shoes_light': 'Shoes',
      'shoes_medium': 'Boots', 
      'shoes_heavy': 'Greaves'
    };
    return `${materialName} ${weightDisplayNames[armorType as keyof typeof weightDisplayNames] || 'Shoes'}`;
  }
  
  // Handle gauntlet armor with weight-specific names
  if (armorType.startsWith('gauntlet_')) {
    const weightDisplayNames = {
      'gauntlet_light': 'Hands',
      'gauntlet_medium': 'Gloves', 
      'gauntlet_heavy': 'Gauntlets'
    };
    return `${materialName} ${weightDisplayNames[armorType as keyof typeof weightDisplayNames] || 'Gauntlets'}`;
  }
  
  // Handle other armor types normally
  const subtypeNames = {
    'helmet': 'Helmet'
  };
  
  return `${materialName} ${subtypeNames[armorType as keyof typeof subtypeNames] || armorType.charAt(0).toUpperCase() + armorType.slice(1)}`;
}

/**
 * Armor templates for different subtypes
 */
export const armorTemplates: Record<string, ArmorTemplate> = {
  // Light Body Armor (Suits) - High defense rate, lower defense
  body_light: {
    type: 'armor',
    subtype: 'body',
    weight: 'light',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 334,
          defenseRate: 600,
          hp: 357
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-suit.png'
      },
      demonite: {
        baseStats: {
          defense: 284,
          defenseRate: 470,
          hp: 255
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-suit.png'
      },
      palladium: {
        baseStats: {
          defense: 228,
          defenseRate: 326,
          hp: 188
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-suit.png'
      },
      archridium: {
        baseStats: {
          defense: 212,
          defenseRate: 302,
          hp: 173
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-suit.png'
      },
      mithril: {
        baseStats: {
          defense: 198,
          defenseRate: 280,
          hp: 158
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/mithril-suit.png'
      },
      sigmetal: {
        baseStats: {
          defense: 173,
          defenseRate: 248,
          hp: 141
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-suit.png'
      },
      osmium: {
        baseStats: {
          defense: 141,
          defenseRate: 200,
          hp: 112
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-suit.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 126,
          defenseRate: 176,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-suit.png'
      }
    }
  },
  
  // Medium Body Armor (Coats) - Balanced stats
  body_medium: {
    type: 'armor',
    subtype: 'body',
    weight: 'medium',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 418,
          defenseRate: 390,
          hp: 407
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-coat.png'
      },
      demonite: {
        baseStats: {
          defense: 358,
          defenseRate: 320,
          hp: 305
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-coat.png'
      },
      palladium: {
        baseStats: {
          defense: 302,
          defenseRate: 209,
          hp: 238
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-coat.png'
      },
      archridium: {
        baseStats: {
          defense: 280,
          defenseRate: 194,
          hp: 213
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-coat.png'
      },
      mithril: {
        baseStats: {
          defense: 261,
          defenseRate: 166,
          hp: 188
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/armor/mithril-coat.png'
      },
      sigmetal: {
        baseStats: {
          defense: 230,
          defenseRate: 158,
          hp: 156
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-coat.png'
      },
      osmium: {
        baseStats: {
          defense: 188,
          defenseRate: 128,
          hp: 117
        },
        maxExtremeLevel: 1,
        imagePath: '/images/equipment-system/armor/osmium-coat.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 168,
          defenseRate: 113,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-coat.png'
      }
    }
  },
  
  // Heavy Body Armor (Plates) - High defense, lower defense rate
  body_heavy: {
    type: 'armor',
    subtype: 'body',
    weight: 'heavy',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 495,
          defenseRate: 265,
          hp: 457
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-plate.png'
      },
      demonite: {
        baseStats: {
          defense: 410,
          defenseRate: 235,
          hp: 355
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-plate.png'
      },
      palladium: {
        baseStats: {
          defense: 354,
          defenseRate: 150,
          hp: 288
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-plate.png'
      },
      archridium: {
        baseStats: {
          defense: 329,
          defenseRate: 134,
          hp: 253
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-plate.png'
      },
      mithril: {
        baseStats: {
          defense: 306,
          defenseRate: 126,
          hp: 218
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-plate.png'
      },
      sigmetal: {
        baseStats: {
          defense: 272,
          defenseRate: 108,
          hp: 171
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-plate.png'
      },
      osmium: {
        baseStats: {
          defense: 222,
          defenseRate: 88,
          hp: 122
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-plate.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 198,
          defenseRate: 78,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-plate.png'
      }
    }
  },
  // Light Helmet (Headpiece) - High defense rate, lower defense
  helmet_light: {
    type: 'armor',
    subtype: 'helmet',
    weight: 'light',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 334,
          defenseRate: 600,
          hp: 357
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-headpiece.png'
      },
      demonite: {
        baseStats: {
          defense: 284,
          defenseRate: 470,
          hp: 255
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-headpiece.png'
      },
      palladium: {
        baseStats: {
          defense: 228,
          defenseRate: 326,
          hp: 188
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-headpiece.png'
      },
      archridium: {
        baseStats: {
          defense: 212,
          defenseRate: 302,
          hp: 173
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-headpiece.png'
      },
      mithril: {
        baseStats: {
          defense: 198,
          defenseRate: 280,
          hp: 158
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-headpiece.png'
      },
      sigmetal: {
        baseStats: {
          defense: 173,
          defenseRate: 248,
          hp: 141
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-headpiece.png'
      },
      osmium: {
        baseStats: {
          defense: 141,
          defenseRate: 200,
          hp: 112
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-headpiece.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 126,
          defenseRate: 176,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-headpiece.png'
      }
    }
  },
  
  // Medium Helmet (Headgear) - Balanced stats
  helmet_medium: {
    type: 'armor',
    subtype: 'helmet',
    weight: 'medium',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 418,
          defenseRate: 390,
          hp: 407
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-headgear.png'
      },
      demonite: {
        baseStats: {
          defense: 358,
          defenseRate: 320,
          hp: 305
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-headgear.png'
      },
      palladium: {
        baseStats: {
          defense: 302,
          defenseRate: 209,
          hp: 238
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-headgear.png'
      },
      archridium: {
        baseStats: {
          defense: 280,
          defenseRate: 194,
          hp: 213
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-headgear.png'
      },
      mithril: {
        baseStats: {
          defense: 261,
          defenseRate: 166,
          hp: 188
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-headgear.png'
      },
      sigmetal: {
        baseStats: {
          defense: 230,
          defenseRate: 158,
          hp: 156
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-headgear.png'
      },
      osmium: {
        baseStats: {
          defense: 188,
          defenseRate: 128,
          hp: 117
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-headgear.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 168,
          defenseRate: 113,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-headgear.png'
      }
    }
  },
  
  // Heavy Helmet (Visor) - High defense, lower defense rate
  helmet_heavy: {
    type: 'armor',
    subtype: 'helmet',
    weight: 'heavy',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 495,
          defenseRate: 265,
          hp: 457
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-visor.png'
      },
      demonite: {
        baseStats: {
          defense: 410,
          defenseRate: 235,
          hp: 355
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-visor.png'
      },
      palladium: {
        baseStats: {
          defense: 354,
          defenseRate: 150,
          hp: 288
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-visor.png'
      },
      archridium: {
        baseStats: {
          defense: 329,
          defenseRate: 134,
          hp: 253
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-visor.png'
      },
      mithril: {
        baseStats: {
          defense: 306,
          defenseRate: 126,
          hp: 218
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-visor.png'
      },
      sigmetal: {
        baseStats: {
          defense: 247,
          defenseRate: 98,
          hp: 147
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-visor.png'
      },
      osmium: {
        baseStats: {
          defense: 222,
          defenseRate: 88,
          hp: 122
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-visor.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 198,
          defenseRate: 78,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-visor.png'
      }
    }
  },
  // Light Shoes (Shoes) - High defense rate, lower defense
  shoes_light: {
    type: 'armor',
    subtype: 'shoes',
    weight: 'light',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 334,
          defenseRate: 600,
          hp: 357
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-shoes.png'
      },
      demonite: {
        baseStats: {
          defense: 284,
          defenseRate: 470,
          hp: 255
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-shoes.png'
      },
      palladium: {
        baseStats: {
          defense: 228,
          defenseRate: 326,
          hp: 188
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-shoes.png'
      },
      archridium: {
        baseStats: {
          defense: 212,
          defenseRate: 302,
          hp: 173
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-shoes.png'
      },
      mithril: {
        baseStats: {
          defense: 198,
          defenseRate: 280,
          hp: 158
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-shoes.png'
      },
      sigmetal: {
        baseStats: {
          defense: 173,
          defenseRate: 248,
          hp: 141
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-shoes.png'
      },
      osmium: {
        baseStats: {
          defense: 141,
          defenseRate: 200,
          hp: 112
        },
        maxExtremeLevel: 1,
        imagePath: '/images/equipment-system/armor/osmium-shoes.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 126,
          defenseRate: 176,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-shoes.png'
      }
    }
  },
  
  // Medium Shoes (Boots) - Balanced stats
  shoes_medium: {
    type: 'armor',
    subtype: 'shoes',
    weight: 'medium',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 418,
          defenseRate: 390,
          hp: 407
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-boots.png'
      },
      demonite: {
        baseStats: {
          defense: 358,
          defenseRate: 320,
          hp: 305
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-boots.png'
      },
      palladium: {
        baseStats: {
          defense: 302,
          defenseRate: 209,
          hp: 238
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-boots.png'
      },
      archridium: {
        baseStats: {
          defense: 280,
          defenseRate: 194,
          hp: 213
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-boots.png'
      },
      mithril: {
        baseStats: {
          defense: 261,
          defenseRate: 166,
          hp: 188
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-boots.png'
      },
      sigmetal: {
        baseStats: {
          defense: 230,
          defenseRate: 158,
          hp: 156
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-boots.png'
      },
      osmium: {
        baseStats: {
          defense: 188,
          defenseRate: 128,
          hp: 117
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-boots.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 168,
          defenseRate: 113,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-boots.png'
      }
    }
  },
  
  // Heavy Shoes (Greaves) - High defense, lower defense rate
  shoes_heavy: {
    type: 'armor',
    subtype: 'shoes',
    weight: 'heavy',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 495,
          defenseRate: 265,
          hp: 457
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-greaves.png'
      },
      demonite: {
        baseStats: {
          defense: 410,
          defenseRate: 235,
          hp: 355
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-greaves.png'
      },
      palladium: {
        baseStats: {
          defense: 354,
          defenseRate: 150,
          hp: 288
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-greaves.png'
      },
      archridium: {
        baseStats: {
          defense: 329,
          defenseRate: 134,
          hp: 253
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-greaves.png'
      },
      mithril: {
        baseStats: {
          defense: 306,
          defenseRate: 126,
          hp: 218
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/armor/mithril-greaves.png'
      },
      sigmetal: {
        baseStats: {
          defense: 272,
          defenseRate: 108,
          hp: 171
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-greaves.png'
      },
      osmium: {
        baseStats: {
          defense: 222,
          defenseRate: 88,
          hp: 122
        },
        maxExtremeLevel: 1,
        imagePath: '/images/equipment-system/armor/osmium-greaves.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 198,
          defenseRate: 78,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-greaves.png'
      }
    }
  },
  // Light Gauntlets (Hands) - High defense rate, lower defense
  gauntlet_light: {
    type: 'armor',
    subtype: 'gauntlet',
    weight: 'light',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 334,
          defenseRate: 600,
          hp: 350
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-hands.png'
      },
      demonite: {
        baseStats: {
          defense: 284,
          defenseRate: 470,
          hp: 255
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-hands.png'
      },
      palladium: {
        baseStats: {
          defense: 228,
          defenseRate: 326,
          hp: 188
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-hands.png'
      },
      archridium: {
        baseStats: {
          defense: 212,
          defenseRate: 302,
          hp: 173
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-hands.png'
      },
      mithril: {
        baseStats: {
          defense: 198,
          defenseRate: 280,
          hp: 158
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/armor/mithril-hands.png'
      },
      sigmetal: {
        baseStats: {
          defense: 173,
          defenseRate: 248,
          hp: 141
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-hands.png'
      },
      osmium: {
        baseStats: {
          defense: 141,
          defenseRate: 200,
          hp: 112
        },
        maxExtremeLevel: 1,
        imagePath: '/images/equipment-system/armor/osmium-hands.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 126,
          defenseRate: 176,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-hands.png'
      }
    }
  },
  
  // Medium Gauntlets (Gloves) - Balanced stats
  gauntlet_medium: {
    type: 'armor',
    subtype: 'gauntlet',
    weight: 'medium',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 418,
          defenseRate: 390,
          hp: 400
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-gloves.png'
      },
      demonite: {
        baseStats: {
          defense: 358,
          defenseRate: 320,
          hp: 305
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-gloves.png'
      },
      palladium: {
        baseStats: {
          defense: 302,
          defenseRate: 209,
          hp: 238
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-gloves.png'
      },
      archridium: {
        baseStats: {
          defense: 280,
          defenseRate: 194,
          hp: 213
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-gloves.png'
      },
      mithril: {
        baseStats: {
          defense: 261,
          defenseRate: 166,
          hp: 188
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-gloves.png'
      },
      sigmetal: {
        baseStats: {
          defense: 230,
          defenseRate: 158,
          hp: 156
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-gloves.png'
      },
      osmium: {
        baseStats: {
          defense: 188,
          defenseRate: 128,
          hp: 117
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-gloves.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 168,
          defenseRate: 113,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-gloves.png'
      }
    }
  },
  
  // Heavy Gauntlets (Gauntlets) - High defense, lower defense rate
  gauntlet_heavy: {
    type: 'armor',
    subtype: 'gauntlet',
    weight: 'heavy',
    material: 'armor',
    class: 'all',
    maxSlots: 3,
    grades: {
      dragonium: {
        baseStats: {
          defense: 495,
          defenseRate: 265,
          hp: 457
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/dragonium-gauntlets.png'
      },
      demonite: {
        baseStats: {
          defense: 410,
          defenseRate: 235,
          hp: 355
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/armor/demonite-gauntlets.png'
      },
      palladium: {
        baseStats: {
          defense: 354,
          defenseRate: 150,
          hp: 288
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/armor/palladium-gauntlets.png'
      },
      archridium: {
        baseStats: {
          defense: 329,
          defenseRate: 134,
          hp: 253
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/armor/archridium-gauntlets.png'
      },
      mithril: {
        baseStats: {
          defense: 306,
          defenseRate: 126,
          hp: 218
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/mithril-gauntlets.png'
      },
      sigmetal: {
        baseStats: {
          defense: 272,
          defenseRate: 108,
          hp: 171
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/armor/sigmetal-gauntlets.png'
      },
      osmium: {
        baseStats: {
          defense: 222,
          defenseRate: 88,
          hp: 122
        },
        maxExtremeLevel: 2,
        imagePath: '/images/equipment-system/armor/osmium-gauntlets.png'
      },
      'shadow titanium': {
        baseStats: {
          defense: 198,
          defenseRate: 78,
          hp: 68
        },
        maxExtremeLevel: 0,
        imagePath: '/images/equipment-system/armor/shadow-titanium-gauntlets.png'
      }
    }
  }
};