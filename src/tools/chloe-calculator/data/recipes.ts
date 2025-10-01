/**
 * Chloe Calculator - Recipe Data
 * Complete recipe database migrated from WordPress calculator
 * Contains 164 recipes across 20 categories
 * Duplicates removed: 1
 */

export interface ChloeIngredient {
  name: string;
  quantity: number;
}

export interface ChloeRecipe {
  name: string;
  recipe: string;
  iconPath: string;
  outputQuantity: number;
  requiredAmity: number | null;
  obtainedAmity: number | null;
  registerCost: number;
  successRate: number;
  category: string;
  ingredients: ChloeIngredient[];
  time: number;
  demand?: string;
}

// Complete recipe database migrated from WordPress (164 total recipes)
export const CHLOE_RECIPES: ChloeRecipe[] = [
  {
    "name": "Force Essence",
    "recipe": "Force Essence x 1",
    "iconPath": "force_essence_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 80,
    "category": "Force Essence",
    "ingredients": [
      {
        "name": "Force Core(Low)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Essence",
    "recipe": "Force Essence x 2",
    "iconPath": "force_essence_icon.png",
    "outputQuantity": 2,
    "requiredAmity": 1000,
    "obtainedAmity": null,
    "registerCost": 20000000,
    "successRate": 85,
    "category": "Force Essence",
    "ingredients": [
      {
        "name": "Force Core(Medium)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Essence",
    "recipe": "Force Essence x 3",
    "iconPath": "force_essence_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 2000,
    "obtainedAmity": null,
    "registerCost": 30000000,
    "successRate": 90,
    "category": "Force Essence",
    "ingredients": [
      {
        "name": "Force Core(High)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Essence",
    "recipe": "Force Essence x 4",
    "iconPath": "force_essence_icon.png",
    "outputQuantity": 4,
    "requiredAmity": 3000,
    "obtainedAmity": null,
    "registerCost": 40000000,
    "successRate": 95,
    "category": "Force Essence",
    "ingredients": [
      {
        "name": "Force Core(Highest)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Essence",
    "recipe": "Force Essence x 5",
    "iconPath": "force_essence_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 4000,
    "obtainedAmity": null,
    "registerCost": 50000000,
    "successRate": 100,
    "category": "Force Essence",
    "ingredients": [
      {
        "name": "Force Core(Ultimate)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Core(Low)",
    "recipe": "Force Core (Low) x 1",
    "iconPath": "force_core_low_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4900,
    "obtainedAmity": 11,
    "registerCost": 10000000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 20
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Force Core(Low)",
    "recipe": "Force Core (Low) x 5",
    "iconPath": "force_core_low_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 4900,
    "obtainedAmity": 4,
    "registerCost": 37500000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Force Core(Medium)",
    "recipe": "Force Core (Medium) x 1",
    "iconPath": "force_core_medium_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5700,
    "obtainedAmity": 4,
    "registerCost": 20000000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 20
      },
      {
        "name": "Force Core(Low)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Force Core(Medium)",
    "recipe": "Force Core (Medium) x 5",
    "iconPath": "force_core_medium_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 6000,
    "obtainedAmity": 4,
    "registerCost": 75000000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Force Core(Low)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Force Core(High)",
    "recipe": "Force Core (High) x 1",
    "iconPath": "force_core_high_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6300,
    "obtainedAmity": 4,
    "registerCost": 30000000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 20
      },
      {
        "name": "Force Core(Medium)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Force Core(High)",
    "recipe": "Force Core (High) x 5",
    "iconPath": "force_core_high_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 7000,
    "obtainedAmity": 4,
    "registerCost": 112500000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Force Core(Medium)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Force Core(Highest)",
    "recipe": "Force Core (Highest) x 1",
    "iconPath": "force_core_highest_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 7300,
    "obtainedAmity": 4,
    "registerCost": 40000000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 20
      },
      {
        "name": "Force Core(High)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Force Core(Highest)",
    "recipe": "Force Core (Highest) x 5",
    "iconPath": "force_core_highest_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 8000,
    "obtainedAmity": 4,
    "registerCost": 60000000,
    "successRate": 50,
    "category": "Force Core",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Force Core(High)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Material Core(Titanium)",
    "recipe": "Material Core (Titanium) x 20",
    "iconPath": "material_core_titanium_icon.png",
    "outputQuantity": 20,
    "requiredAmity": null,
    "obtainedAmity": 8,
    "registerCost": 1000000,
    "successRate": 90,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(Bluestin)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Material Core(Shadow Titanium)",
    "recipe": "Material Core (Shadow Titanium) x 20",
    "iconPath": "material_core_shadow_titanium_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 1000,
    "obtainedAmity": 8,
    "registerCost": 1200000,
    "successRate": 85,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(Titanium)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Material Core(Osmium)",
    "recipe": "Material Core (Osmium) x 20",
    "iconPath": "material_core_osmium_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 2000,
    "obtainedAmity": 10,
    "registerCost": 1400000,
    "successRate": 80,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(Shadow Titanium)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 3
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Material Core(Red Osmium)",
    "recipe": "Material Core (Red Osmium) x 20",
    "iconPath": "material_core_redosmium_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 3000,
    "obtainedAmity": 8,
    "registerCost": 1600000,
    "successRate": 70,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(Osmium)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 4
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Material Core(SIGMetal)",
    "recipe": "Material Core (SIGMetal) x 20",
    "iconPath": "material_core_sigmetal_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 4000,
    "obtainedAmity": 8,
    "registerCost": 1800000,
    "successRate": 65,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(Red Osmium)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 5
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Material Core(Mithril)",
    "recipe": "Material Core (Mithril) x 20",
    "iconPath": "material_core_mithril_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 5000,
    "obtainedAmity": 1,
    "registerCost": 2000000,
    "successRate": 60,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(SIGMetal)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 6
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Material Core(Archridium)",
    "recipe": "Material Core (Archridium) x 20",
    "iconPath": "material_core_archridium_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 6000,
    "obtainedAmity": 1,
    "registerCost": 2200000,
    "successRate": 50,
    "category": "Material Core",
    "ingredients": [
      {
        "name": "Material Core(Mithril)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 7
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(Pherystin)",
    "recipe": "Quartz Core (Pherystin) x 20",
    "iconPath": "quartz_core_pherystin_icon.png",
    "outputQuantity": 20,
    "requiredAmity": null,
    "obtainedAmity": 8,
    "registerCost": 1000000,
    "successRate": 90,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(Bluestin)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 1
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(Aqua)",
    "recipe": "Quartz Core (Aqua) x 20",
    "iconPath": "quartz_core_aqua_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 1000,
    "obtainedAmity": 8,
    "registerCost": 1200000,
    "successRate": 85,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(Pherystin)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(Lapis)",
    "recipe": "Quartz Core (Lapis) x 20",
    "iconPath": "quartz_core_lapis_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 2000,
    "obtainedAmity": 10,
    "registerCost": 1400000,
    "successRate": 80,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(Aqua)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 3
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(Topaz)",
    "recipe": "Quartz Core (Topaz) x 20",
    "iconPath": "quartz_core_topaz_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 3000,
    "obtainedAmity": 8,
    "registerCost": 1600000,
    "successRate": 70,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(Lapis)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 4
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(SIGMetal)",
    "recipe": "Quartz Core (SIGMetal) x 20",
    "iconPath": "quartz_core_sigmetal_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 4000,
    "obtainedAmity": 8,
    "registerCost": 1800000,
    "successRate": 65,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(Topaz)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 5
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(Mithril)",
    "recipe": "Quartz Core (Mithril) x 20",
    "iconPath": "quartz_core_mithril_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 5000,
    "obtainedAmity": 1,
    "registerCost": 2000000,
    "successRate": 60,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(SIGMetal)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 6
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Quartz Core(Archridium)",
    "recipe": "Quartz Core (Archridium) x 20",
    "iconPath": "quartz_core_archridium_icon.png",
    "outputQuantity": 20,
    "requiredAmity": 6000,
    "obtainedAmity": 1,
    "registerCost": 2200000,
    "successRate": 50,
    "category": "Quartz Core",
    "ingredients": [
      {
        "name": "Quartz Core(Mithril)",
        "quantity": 30
      },
      {
        "name": "Upgrade Core(Crystal)",
        "quantity": 7
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Upgrade Core(Low)",
    "recipe": "Upgrade Core (Low) x 1",
    "iconPath": "upgrade_core_low_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4900,
    "obtainedAmity": 11,
    "registerCost": 10000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 20
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Upgrade Core(Low)",
    "recipe": "Upgrade Core (Low) x 5",
    "iconPath": "upgrade_core_low_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 5600,
    "obtainedAmity": 4,
    "registerCost": 37500000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 80
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Upgrade Core(Medium)",
    "recipe": "Upgrade Core (Medium) x 1",
    "iconPath": "upgrade_core_medium_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5800,
    "obtainedAmity": 4,
    "registerCost": 20000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 20
      },
      {
        "name": "Upgrade Core(Low)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Upgrade Core(Medium)",
    "recipe": "Upgrade Core (Medium) x 5",
    "iconPath": "upgrade_core_medium_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 6100,
    "obtainedAmity": 4,
    "registerCost": 75000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Upgrade Core(Low)",
        "quantity": 8
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Upgrade Core(High)",
    "recipe": "Upgrade Core (High) x 1",
    "iconPath": "upgrade_core_high_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6400,
    "obtainedAmity": 4,
    "registerCost": 30000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 20
      },
      {
        "name": "Upgrade Core(Medium)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Upgrade Core(High)",
    "recipe": "Upgrade Core (High) x 5",
    "iconPath": "upgrade_core_high_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 7100,
    "obtainedAmity": 4,
    "registerCost": 125000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Upgrade Core(Medium)",
        "quantity": 8
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Upgrade Core(Highest)",
    "recipe": "Upgrade Core (Highest) x 1",
    "iconPath": "upgrade_core_highest_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 7500,
    "obtainedAmity": 4,
    "registerCost": 40000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 20
      },
      {
        "name": "Upgrade Core(High)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Upgrade Core(Highest)",
    "recipe": "Upgrade Core (Highest) x 5",
    "iconPath": "upgrade_core_highest_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 8200,
    "obtainedAmity": 4,
    "registerCost": 60000000,
    "successRate": 50,
    "category": "Upgrade Core",
    "ingredients": [
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Upgrade Core(High)",
        "quantity": 8
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Upgrade Core Set(Low)",
    "recipe": "Upgrade Core Set (Low) (x1)",
    "iconPath": "upgrade_core_set_low_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": null,
    "registerCost": 1000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Low)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Low)",
    "recipe": "Upgrade Core Set (Low) (x3)",
    "iconPath": "upgrade_core_set_low_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 2500,
    "obtainedAmity": null,
    "registerCost": 3000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Low)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Low)",
    "recipe": "Upgrade Core Set (Low) (x8)",
    "iconPath": "upgrade_core_set_low_icon.png",
    "outputQuantity": 8,
    "requiredAmity": 3500,
    "obtainedAmity": null,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Low)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Medium)",
    "recipe": "Upgrade Core Set (Medium) (x1)",
    "iconPath": "upgrade_core_set_medium_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": null,
    "registerCost": 2000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Medium)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Medium)",
    "recipe": "Upgrade Core Set (Medium) (x3)",
    "iconPath": "upgrade_core_set_medium_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 2500,
    "obtainedAmity": null,
    "registerCost": 6000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Medium)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Medium)",
    "recipe": "Upgrade Core Set (Medium) (x8)",
    "iconPath": "upgrade_core_set_medium_icon.png",
    "outputQuantity": 8,
    "requiredAmity": 3500,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Medium)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(High)",
    "recipe": "Upgrade Core Set (High) (x1)",
    "iconPath": "upgrade_core_set_high_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": null,
    "registerCost": 4000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(High)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(High)",
    "recipe": "Upgrade Core Set (High) (x3)",
    "iconPath": "upgrade_core_set_high_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 2500,
    "obtainedAmity": null,
    "registerCost": 12000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(High)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(High)",
    "recipe": "Upgrade Core Set (High) (x8)",
    "iconPath": "upgrade_core_set_high_icon.png",
    "outputQuantity": 8,
    "requiredAmity": 3500,
    "obtainedAmity": null,
    "registerCost": 20000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(High)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Highest)",
    "recipe": "Upgrade Core Set (Highest) (x1)",
    "iconPath": "upgrade_core_set_highest_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": null,
    "registerCost": 8000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Highest)",
    "recipe": "Upgrade Core Set (Highest) (x3)",
    "iconPath": "upgrade_core_set_highest_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 2500,
    "obtainedAmity": null,
    "registerCost": 24000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Highest)",
    "recipe": "Upgrade Core Set (Highest) (x8)",
    "iconPath": "upgrade_core_set_highest_icon.png",
    "outputQuantity": 8,
    "requiredAmity": 3500,
    "obtainedAmity": null,
    "registerCost": 40000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Ultimate)",
    "recipe": "Upgrade Core Set (Ultimate) (x1)",
    "iconPath": "upgrade_core_set_ultimate_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Ultimate)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Ultimate)",
    "recipe": "Upgrade Core Set (Ultimate) (x3)",
    "iconPath": "upgrade_core_set_ultimate_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 2500,
    "obtainedAmity": null,
    "registerCost": 30000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Ultimate)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core Set(Ultimate)",
    "recipe": "Upgrade Core Set (Ultimate) (x8)",
    "iconPath": "upgrade_core_set_ultimate_icon.png",
    "outputQuantity": 8,
    "requiredAmity": 3500,
    "obtainedAmity": null,
    "registerCost": 50000000,
    "successRate": 100,
    "category": "Upgrade Core Set",
    "ingredients": [
      {
        "name": "Upgrade Core(Ultimate)",
        "quantity": 8
      }
    ],
    "time": 2
  },
  {
    "name": "Upgrade Core(Crystal)",
    "recipe": "Upgrade Core (Crystal) x 5",
    "iconPath": "upgrade_core_crystal_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 1100,
    "obtainedAmity": 10,
    "registerCost": 5000000,
    "successRate": 90,
    "category": "Upgrade/Force Core (Crystal)",
    "ingredients": [
      {
        "name": "Upgrade Core(High)",
        "quantity": 1
      },
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 20
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Core(Crystal)",
    "recipe": "Force Core (Crystal) x 5",
    "iconPath": "force_core_crystal_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 1100,
    "obtainedAmity": 10,
    "registerCost": 5000000,
    "successRate": 90,
    "category": "Upgrade/Force Core (Crystal)",
    "ingredients": [
      {
        "name": "Force Core(High)",
        "quantity": 1
      },
      {
        "name": "Force Core(Piece)",
        "quantity": 20
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Upgrade Core(Crystal)",
    "recipe": "Upgrade Core (Crystal) x 10",
    "iconPath": "upgrade_core_crystal_icon.png",
    "outputQuantity": 10,
    "requiredAmity": 2200,
    "obtainedAmity": 10,
    "registerCost": 7500000,
    "successRate": 90,
    "category": "Upgrade/Force Core (Crystal)",
    "ingredients": [
      {
        "name": "Upgrade Core(High)",
        "quantity": 1
      },
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 50
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Force Core(Crystal)",
    "recipe": "Force Core (Crystal) x 10",
    "iconPath": "force_core_crystal_icon.png",
    "outputQuantity": 10,
    "requiredAmity": 2200,
    "obtainedAmity": 10,
    "registerCost": 7500000,
    "successRate": 90,
    "category": "Upgrade/Force Core (Crystal)",
    "ingredients": [
      {
        "name": "Force Core(High)",
        "quantity": 1
      },
      {
        "name": "Force Core(Piece)",
        "quantity": 50
      }
    ],
    "time": 2,
    "demand": "High"
  },
  {
    "name": "Shape Cartridge(Lv. 2)",
    "recipe": "Cartridge Roulette (Lv. 2) x 1",
    "iconPath": "cartridge_roulette_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 1000,
    "obtainedAmity": 8,
    "registerCost": 5000000,
    "successRate": 80,
    "category": "Shape Cartridge",
    "ingredients": [
      {
        "name": "Shape Cartridge(Lv. 1)",
        "quantity": 5
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Shape Cartridge(Lv. 3)",
    "recipe": "Cartridge Roulette (Lv. 3) x 1",
    "iconPath": "cartridge_roulette_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 3000,
    "obtainedAmity": 8,
    "registerCost": 10000000,
    "successRate": 60,
    "category": "Shape Cartridge",
    "ingredients": [
      {
        "name": "Shape Cartridge(Lv. 2)",
        "quantity": 5
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 4
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Shape Cartridge(Lv. 4)",
    "recipe": "Cartridge Roulette (Lv. 4) x 1",
    "iconPath": "cartridge_roulette_icon.png",
    "outputQuantity": 3,
    "requiredAmity": 5000,
    "obtainedAmity": 1,
    "registerCost": 15000000,
    "successRate": 40,
    "category": "Shape Cartridge",
    "ingredients": [
      {
        "name": "Shape Cartridge(Lv. 3)",
        "quantity": 5
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 6
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Rune Slot Extender",
    "recipe": "Rune Slot Extender",
    "iconPath": "rune_slot_extender_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": 7,
    "registerCost": 200000000,
    "successRate": 100,
    "category": "Misc",
    "ingredients": [
      {
        "name": "Orb of Fire",
        "quantity": 10
      },
      {
        "name": "Orb of Wind",
        "quantity": 10
      },
      {
        "name": "Orb of Earth",
        "quantity": 10
      },
      {
        "name": "Orb of Ice",
        "quantity": 10
      }
    ],
    "time": 2,
    "demand": "Medium"
  },
  {
    "name": "Extreme Core Pocket(Normal) I",
    "recipe": "Extreme Core Pocket (Normal) I",
    "iconPath": "",
    "outputQuantity": 1,
    "requiredAmity": 1000,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 90,
    "category": "Misc",
    "ingredients": [
      {
        "name": "Force Core(Highest)",
        "quantity": 5
      }
    ],
    "time": 3,
    "demand": "Low"
  },
  {
    "name": "Shiny Jewel of Nix",
    "recipe": "Shiny Jewel of Nix",
    "iconPath": "shiny_jewel_nix_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": 3,
    "registerCost": 50000000,
    "successRate": 100,
    "category": "Misc",
    "ingredients": [
      {
        "name": "Broken Tiara of Nix",
        "quantity": 1
      },
      {
        "name": "Circuit Jewel(Lv. 6)",
        "quantity": 5
      },
      {
        "name": "Circuit Jewel (Lv. 7)",
        "quantity": 2
      }
    ],
    "time": 2,
    "demand": "Low"
  },
  {
    "name": "Extender Circuit",
    "recipe": "Extender Circuit x 5",
    "iconPath": "extender_circuit_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 100,
    "obtainedAmity": 10,
    "registerCost": 5000000,
    "successRate": 80,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Unknown Circuit",
        "quantity": 3
      },
      {
        "name": "Force Core(Piece)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Plasma Circuit",
    "recipe": "Plasma Circuit x 5",
    "iconPath": "plasma_circuit_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 100,
    "obtainedAmity": 10,
    "registerCost": 5000000,
    "successRate": 90,
    "category": "Perfect Core",
    "ingredients": [
      {
        "name": "Unknown Circuit",
        "quantity": 3
      },
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Plasma Circuit",
    "recipe": "Plasma Circuit x 10",
    "iconPath": "plasma_circuit_icon.png",
    "outputQuantity": 10,
    "requiredAmity": 1200,
    "obtainedAmity": 10,
    "registerCost": 7500000,
    "successRate": 90,
    "category": "Perfect Core",
    "ingredients": [
      {
        "name": "Unknown Circuit",
        "quantity": 3
      },
      {
        "name": "Upgrade Core(Piece)",
        "quantity": 50
      }
    ],
    "time": 2
  },
  {
    "name": "Extender Circuit",
    "recipe": "Extender Circuit x 10",
    "iconPath": "extender_circuit_icon.png",
    "outputQuantity": 10,
    "requiredAmity": 1200,
    "obtainedAmity": 10,
    "registerCost": 7500000,
    "successRate": 90,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Unknown Circuit",
        "quantity": 3
      },
      {
        "name": "Force Core(Piece)",
        "quantity": 50
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(Low)",
    "recipe": "Slot Extender (Low) x 1",
    "iconPath": "slot_extender_low_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5900,
    "obtainedAmity": 5,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Extender Circuit",
        "quantity": 40
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(Low)",
    "recipe": "Slot Extender (Low) x 2",
    "iconPath": "slot_extender_low_icon.png",
    "outputQuantity": 2,
    "requiredAmity": 6600,
    "obtainedAmity": 5,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 120
      },
      {
        "name": "Extender Circuit",
        "quantity": 60
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 30
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(Medium)",
    "recipe": "Slot Extender (Medium) x 1",
    "iconPath": "slot_extender_medium_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6800,
    "obtainedAmity": 5,
    "registerCost": 1000000000,
    "successRate": 15,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Extender Circuit",
        "quantity": 40
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 20
      },
      {
        "name": "Slot Extender(Low)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(Medium)",
    "recipe": "Slot Extender (Medium) x 2",
    "iconPath": "slot_extender_medium_icon.png",
    "outputQuantity": 2,
    "requiredAmity": 7700,
    "obtainedAmity": 5,
    "registerCost": 1750000000,
    "successRate": 15,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 120
      },
      {
        "name": "Extender Circuit",
        "quantity": 60
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 30
      },
      {
        "name": "Slot Extender(Low)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(High)",
    "recipe": "Slot Extender (High) x 1",
    "iconPath": "slot_extender_high_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 7900,
    "obtainedAmity": 5,
    "registerCost": 5000000000,
    "successRate": 10,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Extender Circuit",
        "quantity": 40
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 20
      },
      {
        "name": "Slot Extender(Medium)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(High)",
    "recipe": "Slot Extender (High) x 2",
    "iconPath": "slot_extender_high_icon.png",
    "outputQuantity": 2,
    "requiredAmity": 8500,
    "obtainedAmity": null,
    "registerCost": 7500000000,
    "successRate": 7.5,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 120
      },
      {
        "name": "Extender Circuit",
        "quantity": 60
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 30
      },
      {
        "name": "Slot Extender(Medium)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Slot Extender(Highest)",
    "recipe": "Slot Extender (Highest) x 1",
    "iconPath": "slot_extender_highest_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 8900,
    "obtainedAmity": 5,
    "registerCost": 15000000000,
    "successRate": 5,
    "category": "Slot Extender",
    "ingredients": [
      {
        "name": "Force Core(Piece)",
        "quantity": 80
      },
      {
        "name": "Extender Circuit",
        "quantity": 40
      },
      {
        "name": "Force Core(Highest)",
        "quantity": 20
      },
      {
        "name": "Slot Extender(High)",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Unbound Merit Medal",
    "recipe": "Unbound Merit Medal x 1",
    "iconPath": "unbound_merit_medal_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5500,
    "obtainedAmity": 5,
    "registerCost": 50000000,
    "successRate": 100,
    "category": "Merit Medal",
    "ingredients": [
      {
        "name": "Merit Medal Exchange Ticket",
        "quantity": 1
      },
      {
        "name": "Merit Medal Trade Certificate",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Unbound Merit Medal",
    "recipe": "Unbound Merit Medal x 10",
    "iconPath": "unbound_merit_medal_icon.png",
    "outputQuantity": 10,
    "requiredAmity": 7500,
    "obtainedAmity": 5,
    "registerCost": 150000000,
    "successRate": 100,
    "category": "Merit Medal",
    "ingredients": [
      {
        "name": "Merit Medal Exchange Ticket",
        "quantity": 10
      },
      {
        "name": "Merit Medal Trade Certificate",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Flame Disc(Lv. 2)",
    "recipe": "Flame Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Flame Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Dark Disc(Lv. 2)",
    "recipe": "Dark Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Dark Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Holy Disc(Lv. 2)",
    "recipe": "Holy Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Holy Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Air Disc(Lv. 2)",
    "recipe": "Air Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Air Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Thunder Disc(Lv. 2)",
    "recipe": "Thunder Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Thunder Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Bloody Disc(Lv. 2)",
    "recipe": "Bloody Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Bloody Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Earth Disc(Lv. 2)",
    "recipe": "Earth Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Earth Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Aqua Disc(Lv. 2)",
    "recipe": "Aqua Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Aqua Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Soul Disc(Lv. 2)",
    "recipe": "Soul Dice (Lv. 2) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 1600,
    "obtainedAmity": 15,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Disc(Lv.2)",
    "ingredients": [
      {
        "name": "Soul Disc(Lv. 1)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Flame Disc(Lv. 3)",
    "recipe": "Flame Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Flame Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Dark Disc(Lv. 3)",
    "recipe": "Dark Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Dark Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Holy Disc(Lv. 3)",
    "recipe": "Holy Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Holy Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Air Disc(Lv. 3)",
    "recipe": "Air Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Air Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Thunder Disc(Lv. 3)",
    "recipe": "Thunder Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Thunder Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Bloody Disc(Lv. 3)",
    "recipe": "Bloody Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Bloody Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Earth Disc(Lv. 3)",
    "recipe": "Earth Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Earth Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Aqua Disc(Lv. 3)",
    "recipe": "Aqua Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Aqua Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Soul Disc(Lv. 3)",
    "recipe": "Soul Dice (Lv. 3) x 1",
    "iconPath": "all_dice_icon.png",
    "outputQuantity": 50,
    "requiredAmity": 4600,
    "obtainedAmity": 15,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Disc(Lv.3)",
    "ingredients": [
      {
        "name": "Soul Disc(Lv. 2)",
        "quantity": 100
      },
      {
        "name": "Force Core(Crystal)",
        "quantity": 20
      }
    ],
    "time": 2
  },
  {
    "name": "Essence Rune(DEX II)",
    "recipe": "Essence Rune (DEX II)",
    "iconPath": "essence_rune_2_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Essence Rune",
    "ingredients": [
      {
        "name": "Essence Of Dragon of Light",
        "quantity": 100
      },
      {
        "name": "Essence of Dragon of Darkness",
        "quantity": 100
      }
    ],
    "time": 2
  },
  {
    "name": "Essence Rune(STR II)",
    "recipe": "Essence Rune (STR II)",
    "iconPath": "essence_rune_2_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Essence Rune",
    "ingredients": [
      {
        "name": "Essence Of Dragon of Light",
        "quantity": 100
      },
      {
        "name": "Essence of Dragon of Darkness",
        "quantity": 100
      }
    ],
    "time": 2
  },
  {
    "name": "Essence Rune(INT II)",
    "recipe": "Essence Rune (INT II)",
    "iconPath": "essence_rune_2_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Essence Rune",
    "ingredients": [
      {
        "name": "Essence Of Dragon of Light",
        "quantity": 100
      },
      {
        "name": "Essence of Dragon of Darkness",
        "quantity": 100
      }
    ],
    "time": 2
  },
  {
    "name": "Mirror of Obervation (Bronze)",
    "recipe": "Mirror of Obervation (Bronze)",
    "iconPath": "mirror_of_observation_bronze_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": 3,
    "registerCost": 0,
    "successRate": 100,
    "category": "Misc",
    "ingredients": [
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 5
      },
      {
        "name": "Upgrade Core(High)",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Mirror of Obervation (Silver)",
    "recipe": "Mirror of Obervation (Silver)",
    "iconPath": "mirror_of_observation_silver_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": 3,
    "registerCost": 0,
    "successRate": 100,
    "category": "Misc",
    "ingredients": [
      {
        "name": "Mirror of Obervation (Bronze)",
        "quantity": 1
      },
      {
        "name": "Effector Core (Piece)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Skill Book (Aqua Aura)",
    "recipe": "Skill Book (Aqua Aura)",
    "iconPath": "skill_book_aqua_aura_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 0,
    "successRate": 100,
    "category": "Aura Books",
    "ingredients": [
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "The Soul Key",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Skill Book (Flame Aura)",
    "recipe": "Skill Book (Flame Aura)",
    "iconPath": "skill_book_flame_aura_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 0,
    "successRate": 100,
    "category": "Aura Books",
    "ingredients": [
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "The Soul Key",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Skill Book (Lightning Aura)",
    "recipe": "Skill Book (Lightning Aura)",
    "iconPath": "skill_book_lightning_aura_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": null,
    "registerCost": 0,
    "successRate": 100,
    "category": "Aura Books",
    "ingredients": [
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "The Soul Key",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 1)",
    "recipe": "Sword Damage Amplifier (Lv. 1) x 100",
    "iconPath": "sword_damage_amplifier_lv1_icon.png",
    "outputQuantity": 100,
    "requiredAmity": null,
    "obtainedAmity": 10,
    "registerCost": 1000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(Titanium)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 1)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 2)",
    "recipe": "Sword Damage Amplifier (Lv. 2) x 100",
    "iconPath": "sword_damage_amplifier_lv2_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 1000,
    "obtainedAmity": 10,
    "registerCost": 2000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(Shadow Titanium)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 2)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 3)",
    "recipe": "Sword Damage Amplifier (Lv. 3) x 100",
    "iconPath": "sword_damage_amplifier_lv3_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 2000,
    "obtainedAmity": 10,
    "registerCost": 3000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(Osmium)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 3)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 4)",
    "recipe": "Sword Damage Amplifier (Lv. 4) x 100",
    "iconPath": "sword_damage_amplifier_lv4_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 3000,
    "obtainedAmity": 10,
    "registerCost": 4000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(Red Osmium)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 4)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 5)",
    "recipe": "Sword Damage Amplifier (Lv. 5) x 100",
    "iconPath": "sword_damage_amplifier_lv5_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 4000,
    "obtainedAmity": 10,
    "registerCost": 5000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(SigMetal)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 5)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 6)",
    "recipe": "Sword Damage Amplifier (Lv. 6) x 100",
    "iconPath": "sword_damage_amplifier_lv6_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 5000,
    "obtainedAmity": 3,
    "registerCost": 6000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(Mithril)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 6)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Sword Damage Amplifier (Lv. 7)",
    "recipe": "Sword Damage Amplifier (Lv. 7) x 100",
    "iconPath": "sword_damage_amplifier_lv7_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 6000,
    "obtainedAmity": 3,
    "registerCost": 7000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Material Core(Archridium)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 7)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 1)",
    "recipe": "Magic Damage Amplifier (Lv. 1) x 100",
    "iconPath": "magic_damage_amplifier_lv1_icon.png",
    "outputQuantity": 100,
    "requiredAmity": null,
    "obtainedAmity": 10,
    "registerCost": 1000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(Pherystin)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 1)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 2)",
    "recipe": "Magic Damage Amplifier (Lv. 2) x 100",
    "iconPath": "magic_damage_amplifier_lv2_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 1000,
    "obtainedAmity": 10,
    "registerCost": 2000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(Aqua)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 2)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 3)",
    "recipe": "Magic Damage Amplifier (Lv. 3) x 100",
    "iconPath": "magic_damage_amplifier_lv3_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 2000,
    "obtainedAmity": 10,
    "registerCost": 3000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(Lapis)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 3)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 4)",
    "recipe": "Magic Damage Amplifier (Lv. 4) x 100",
    "iconPath": "magic_damage_amplifier_lv4_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 3000,
    "obtainedAmity": 10,
    "registerCost": 4000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(Topaz)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 4)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 5)",
    "recipe": "Magic Damage Amplifier (Lv. 5) x 100",
    "iconPath": "magic_damage_amplifier_lv5_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 4000,
    "obtainedAmity": 10,
    "registerCost": 5000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(SigMetal)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 5)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 6)",
    "recipe": "Magic Damage Amplifier (Lv. 6) x 100",
    "iconPath": "magic_damage_amplifier_lv6_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 5000,
    "obtainedAmity": 10,
    "registerCost": 6000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(Mithril)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 6)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Magic Damage Amplifier (Lv. 7)",
    "recipe": "Magic Damage Amplifier (Lv. 7) x 100",
    "iconPath": "magic_damage_amplifier_lv7_icon.png",
    "outputQuantity": 100,
    "requiredAmity": 6000,
    "obtainedAmity": 10,
    "registerCost": 7000000,
    "successRate": 90,
    "category": "Damage Amplifier",
    "ingredients": [
      {
        "name": "Quartz Core(Archridium)",
        "quantity": 20
      },
      {
        "name": "Mixture(Lv. 7)",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Extract Potion (STR)",
    "recipe": "Extract Potion (STR) x 5",
    "iconPath": "extract_potion_str_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 300,
    "obtainedAmity": 9,
    "registerCost": 20000000,
    "successRate": 80,
    "category": "Extract Potion",
    "ingredients": [
      {
        "name": "Empty Bottle",
        "quantity": 1
      },
      {
        "name": "Soul Disc (Lv. 2)",
        "quantity": 3
      },
      {
        "name": "Shining Tooth",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Extract Potion (DEX)",
    "recipe": "Extract Potion (DEX) x 5",
    "iconPath": "extract_potion_dex_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 300,
    "obtainedAmity": 9,
    "registerCost": 20000000,
    "successRate": 80,
    "category": "Extract Potion",
    "ingredients": [
      {
        "name": "Empty Bottle",
        "quantity": 1
      },
      {
        "name": "Soul Disc (Lv. 2)",
        "quantity": 3
      },
      {
        "name": "Blue Feather",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Extract Potion (INT)",
    "recipe": "Extract Potion (INT) x 5",
    "iconPath": "extract_potion_int_icon.png",
    "outputQuantity": 5,
    "requiredAmity": 300,
    "obtainedAmity": 9,
    "registerCost": 20000000,
    "successRate": 80,
    "category": "Extract Potion",
    "ingredients": [
      {
        "name": "Empty Bottle",
        "quantity": 1
      },
      {
        "name": "Soul Disc (Lv. 2)",
        "quantity": 3
      },
      {
        "name": "Strange Stem",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Diamond Cube",
    "recipe": "Diamond Cube x 1",
    "iconPath": "diamond_cube_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 500,
    "obtainedAmity": 7,
    "registerCost": 100000000,
    "successRate": 50,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Minesta's Diamond Charm",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 1)",
    "recipe": "Sapphire Charm Upgrade (Lv. 1)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 500,
    "obtainedAmity": 10,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Minesta's Sapphire Charm",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 4
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 2)",
    "recipe": "Sapphire Charm Upgrade (Lv. 2)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": 10,
    "registerCost": 20000000,
    "successRate": 90,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Sapphire Charm Upgrade (Lv. 1)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 3)",
    "recipe": "Sapphire Charm Upgrade (Lv. 3)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2500,
    "obtainedAmity": 10,
    "registerCost": 40000000,
    "successRate": 65,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Sapphire Charm Upgrade (Lv. 2)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 6
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 4)",
    "recipe": "Sapphire Charm Upgrade (Lv. 4)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3500,
    "obtainedAmity": 10,
    "registerCost": 80000000,
    "successRate": 60,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Sapphire Charm Upgrade (Lv. 3)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 7
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 6
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 5)",
    "recipe": "Sapphire Charm Upgrade (Lv. 5)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4500,
    "obtainedAmity": 10,
    "registerCost": 150000000,
    "successRate": 35,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Sapphire Charm Upgrade (Lv. 4)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 9
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 9
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 6)",
    "recipe": "Sapphire Charm Upgrade (Lv. 6)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5500,
    "obtainedAmity": 10,
    "registerCost": 300000000,
    "successRate": 30,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Sapphire Charm Upgrade (Lv. 5)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 11
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 13
      }
    ],
    "time": 2
  },
  {
    "name": "Sapphire Charm Upgrade (Lv. 7)",
    "recipe": "Sapphire Charm Upgrade (Lv. 7)",
    "iconPath": "sapphire_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6500,
    "obtainedAmity": 10,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Sapphire Charm Upgrade (Lv. 6)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 14
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 19
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 1)",
    "recipe": "Ruby Charm Upgrade (Lv. 1)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 500,
    "obtainedAmity": 10,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Stain Clone",
        "quantity": 4
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 2
      },
      {
        "name": "Minesta's Ruby Charm",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 2)",
    "recipe": "Ruby Charm Upgrade (Lv. 2)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": 10,
    "registerCost": 20000000,
    "successRate": 90,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Ruby Charm Upgrade (Lv. 1)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 3)",
    "recipe": "Ruby Charm Upgrade (Lv. 3)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2500,
    "obtainedAmity": 10,
    "registerCost": 40000000,
    "successRate": 65,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Ruby Charm Upgrade (Lv. 2)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 6
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 4)",
    "recipe": "Ruby Charm Upgrade (Lv. 4)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3500,
    "obtainedAmity": 10,
    "registerCost": 80000000,
    "successRate": 60,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Ruby Charm Upgrade (Lv. 3)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 7
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 6
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 5)",
    "recipe": "Ruby Charm Upgrade (Lv. 5)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4500,
    "obtainedAmity": 10,
    "registerCost": 150000000,
    "successRate": 35,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Ruby Charm Upgrade (Lv. 4)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 9
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 9
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 6)",
    "recipe": "Ruby Charm Upgrade (Lv. 6)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5500,
    "obtainedAmity": 10,
    "registerCost": 300000000,
    "successRate": 30,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Ruby Charm Upgrade (Lv. 5)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 11
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 13
      }
    ],
    "time": 2
  },
  {
    "name": "Ruby Charm Upgrade (Lv. 7)",
    "recipe": "Ruby Charm Upgrade (Lv. 7)",
    "iconPath": "ruby_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6500,
    "obtainedAmity": 10,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Ruby Charm Upgrade (Lv. 6)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 14
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 19
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 1)",
    "recipe": "Emerald Charm Upgrade (Lv. 1)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 500,
    "obtainedAmity": 10,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Stain Clone",
        "quantity": 4
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 2
      },
      {
        "name": "Minesta's Emerald Charm",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 2)",
    "recipe": "Emerald Charm Upgrade (Lv. 2)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": 10,
    "registerCost": 20000000,
    "successRate": 90,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Emerald Charm Upgrade (Lv. 1)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 3)",
    "recipe": "Emerald Charm Upgrade (Lv. 3)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2500,
    "obtainedAmity": 10,
    "registerCost": 40000000,
    "successRate": 65,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Emerald Charm Upgrade (Lv. 2)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 6
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 4)",
    "recipe": "Emerald Charm Upgrade (Lv. 4)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3500,
    "obtainedAmity": 10,
    "registerCost": 80000000,
    "successRate": 60,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Emerald Charm Upgrade (Lv. 3)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 7
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 6
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 5)",
    "recipe": "Emerald Charm Upgrade (Lv. 5)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4500,
    "obtainedAmity": 10,
    "registerCost": 150000000,
    "successRate": 35,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Emerald Charm Upgrade (Lv. 4)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 9
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 9
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 6)",
    "recipe": "Emerald Charm Upgrade (Lv. 6)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5500,
    "obtainedAmity": 10,
    "registerCost": 300000000,
    "successRate": 30,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Emerald Charm Upgrade (Lv. 5)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 11
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 13
      }
    ],
    "time": 2
  },
  {
    "name": "Emerald Charm Upgrade (Lv. 7)",
    "recipe": "Emerald Charm Upgrade (Lv. 7)",
    "iconPath": "emerald_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6500,
    "obtainedAmity": 10,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Emerald Charm Upgrade (Lv. 6)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 14
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 19
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 1)",
    "recipe": "Amber Charm Upgrade (Lv. 1)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 500,
    "obtainedAmity": 10,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Minesta's Amber Charm",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 4
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 2)",
    "recipe": "Amber Charm Upgrade (Lv. 2)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": 10,
    "registerCost": 20000000,
    "successRate": 90,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amber Charm Upgrade (Lv. 1)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 3)",
    "recipe": "Amber Charm Upgrade (Lv. 3)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2500,
    "obtainedAmity": 10,
    "registerCost": 40000000,
    "successRate": 65,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amber Charm Upgrade (Lv. 2)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 6
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 4)",
    "recipe": "Amber Charm Upgrade (Lv. 4)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3500,
    "obtainedAmity": 10,
    "registerCost": 80000000,
    "successRate": 60,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amber Charm Upgrade (Lv. 3)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 7
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 6
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 5)",
    "recipe": "Amber Charm Upgrade (Lv. 5)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4500,
    "obtainedAmity": 10,
    "registerCost": 150000000,
    "successRate": 35,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amber Charm Upgrade (Lv. 4)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 9
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 9
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 6)",
    "recipe": "Amber Charm Upgrade (Lv. 6)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5500,
    "obtainedAmity": 10,
    "registerCost": 300000000,
    "successRate": 30,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amber Charm Upgrade (Lv. 5)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 11
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 13
      }
    ],
    "time": 2
  },
  {
    "name": "Amber Charm Upgrade (Lv. 7)",
    "recipe": "Amber Charm Upgrade (Lv. 7)",
    "iconPath": "amber_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6500,
    "obtainedAmity": 10,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amber Charm Upgrade (Lv. 6)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 14
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 19
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 1)",
    "recipe": "Amethyst Charm Upgrade (Lv. 1)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 500,
    "obtainedAmity": 10,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Minesta's Amethyst Charm",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 4
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 2)",
    "recipe": "Amethyst Charm Upgrade (Lv. 2)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1500,
    "obtainedAmity": 10,
    "registerCost": 20000000,
    "successRate": 90,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amethyst Charm Upgrade (Lv. 1)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 5
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 3
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 3)",
    "recipe": "Amethyst Charm Upgrade (Lv. 3)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2500,
    "obtainedAmity": 10,
    "registerCost": 40000000,
    "successRate": 65,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amethyst Charm Upgrade (Lv. 2)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 6
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 4)",
    "recipe": "Amethyst Charm Upgrade (Lv. 4)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3500,
    "obtainedAmity": 10,
    "registerCost": 80000000,
    "successRate": 60,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amethyst Charm Upgrade (Lv. 3)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 7
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 6
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 5)",
    "recipe": "Amethyst Charm Upgrade (Lv. 5)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4500,
    "obtainedAmity": 10,
    "registerCost": 150000000,
    "successRate": 35,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amethyst Charm Upgrade (Lv. 4)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 9
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 9
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 6)",
    "recipe": "Amethyst Charm Upgrade (Lv. 6)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 5500,
    "obtainedAmity": 10,
    "registerCost": 300000000,
    "successRate": 30,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amethyst Charm Upgrade (Lv. 5)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 11
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 13
      }
    ],
    "time": 2
  },
  {
    "name": "Amethyst Charm Upgrade (Lv. 7)",
    "recipe": "Amethyst Charm Upgrade (Lv. 7)",
    "iconPath": "amethyst_charm_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 6500,
    "obtainedAmity": 10,
    "registerCost": 500000000,
    "successRate": 20,
    "category": "Charm",
    "ingredients": [
      {
        "name": "Amethyst Charm Upgrade (Lv. 6)",
        "quantity": 1
      },
      {
        "name": "Stain Clone",
        "quantity": 14
      },
      {
        "name": "Upgrade Core(Highest)",
        "quantity": 19
      }
    ],
    "time": 2
  },
  {
    "name": "Map Part",
    "recipe": "Map Part x 1",
    "iconPath": "map_part_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 200,
    "obtainedAmity": 10,
    "registerCost": 500000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Illusion Coral",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Muster Card: Ruina Station",
    "recipe": "Muster Card: Ruina Station x 1",
    "iconPath": "muster_card_ruina_station_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 200,
    "obtainedAmity": 10,
    "registerCost": 500000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Machinery Head",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 1
      }
    ],
    "time": 2
  },
  {
    "name": "Rare Muster Card: Forgotten Temple B2F",
    "recipe": "Rare Muster Card: Forgotten Temple B2F x 1",
    "iconPath": "rare_muster_card_forgotten_temple_b2f_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": 7,
    "registerCost": 5000000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Muster Card: Forgotten Temple B1F",
        "quantity": 1
      },
      {
        "name": "Muster Card: Forgotten Temple B2F",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Unusual Lost Island Compass",
    "recipe": "Unusual Lost Island Compass x 1",
    "iconPath": "unusual_lost_island_compass_icon.png",
    "outputQuantity": 1,
    "requiredAmity": null,
    "obtainedAmity": 7,
    "registerCost": 10000000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Lost Island Compass",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 10
      }
    ],
    "time": 2
  },
  {
    "name": "Epaulet of the Dead",
    "recipe": "Epaulet of the Dead x 1",
    "iconPath": "epaulet_of_the_dead_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1300,
    "obtainedAmity": 10,
    "registerCost": 1000000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Astral Skull",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Seal of Darkness",
    "recipe": "Seal of Darkness x 1",
    "iconPath": "seal_of_darkness_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 1300,
    "obtainedAmity": 10,
    "registerCost": 1000000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Infernal Ruby",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 2
      }
    ],
    "time": 2
  },
  {
    "name": "Epaulet of the Dead (B2F) Part1",
    "recipe": "Epaulet of the Dead (B2F) Part1 x 1",
    "iconPath": "epaulet_of_the_dead_b2f_part1_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2300,
    "obtainedAmity": 10,
    "registerCost": 1500000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Astral Skull",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Muster Card: Forgotten Temple B1F",
    "recipe": "Muster Card: Forgotten Temple B1F x 1",
    "iconPath": "muster_card_forgotten_temple_b1f_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 2300,
    "obtainedAmity": 10,
    "registerCost": 1500000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Beetle Shell",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 4
      }
    ],
    "time": 2
  },
  {
    "name": "Copy of Illusive Apocalypse",
    "recipe": "Copy of Illusive Apocalypse x 1",
    "iconPath": "copy_of_illusive_apocalypse_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3300,
    "obtainedAmity": 10,
    "registerCost": 2000000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Illusion Coral",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Siena's Crest B1F",
    "recipe": "Siena's Crest B1F x 1",
    "iconPath": "sienas_crest_b1f_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 3300,
    "obtainedAmity": 10,
    "registerCost": 2000000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Parasited Berry",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 5
      }
    ],
    "time": 2
  },
  {
    "name": "Lost Island Compass",
    "recipe": "Lost Island Compass x 1",
    "iconPath": "lost_island_compass_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4300,
    "obtainedAmity": 10,
    "registerCost": 2500000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Infernal Ruby",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 7
      }
    ],
    "time": 2
  },
  {
    "name": "Siena's Crest B2F",
    "recipe": "Siena's Crest B2F x 1",
    "iconPath": "sienas_crest_b2f_icon.png",
    "outputQuantity": 1,
    "requiredAmity": 4300,
    "obtainedAmity": 10,
    "registerCost": 2500000,
    "successRate": 100,
    "category": "Dungeon Entry",
    "ingredients": [
      {
        "name": "Parasited Berry",
        "quantity": 1
      },
      {
        "name": "Raw Stone of Dimension",
        "quantity": 7
      }
    ],
    "time": 2
  }
];

// Helper functions
export function getRecipesByCategory(category: string): ChloeRecipe[] {
  return CHLOE_RECIPES.filter(recipe => recipe.category === category);
}

export function getRecipesByOutputItem(itemName: string): ChloeRecipe[] {
  return CHLOE_RECIPES.filter(recipe => recipe.name === itemName);
}

export function getRecipeCategories(): string[] {
  return Array.from(new Set(CHLOE_RECIPES.map(recipe => recipe.category))).sort();
}

// Filter for items that provide amity (for Amity calculator)
export function getAmityRecipes(): ChloeRecipe[] {
  return CHLOE_RECIPES.filter(recipe => recipe.obtainedAmity && recipe.obtainedAmity > 0);
}
