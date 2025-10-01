// Weapon templates data - contains all weapon type definitions and their material grades

import { WeaponTemplate } from './types';

export const weaponTemplates: Record<string, WeaponTemplate> = {
  orb: {
    type: 'orb',
    subtype: 'orb',
    material: 'weapon',
    class: 'mage',
    maxSlots: 3,
    handType: 'oneHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 409,
          magicAttack: 462,
          attackRate: 781
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-orb.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 329,
          magicAttack: 357,
          attackRate: 711
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite_orb.png'
      },
      palladium: {
        baseStats: {
          attack: 264,
          magicAttack: 292,
          attackRate: 525
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/orb palladium final.png'
      },
      archridium: {
        baseStats: {
          attack: 240,
          magicAttack: 268,
          attackRate: 499
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-orb.png' // TODO: Add actual image
      },
      mithril: {
        baseStats: {
          attack: 216,
          magicAttack: 246,
          attackRate: 473
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-orb.png' // TODO: Add actual image
      },
      sigmetal: {
        baseStats: {
          attack: 184,
          magicAttack: 212,
          attackRate: 431
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/weapons/sigmetal-orb.png' // TODO: Add actual image
      }
    }
  },
  crystal: {
    type: 'crystal',
    subtype: 'crystal',
    material: 'weapon',
    class: 'mage',
    maxSlots: 3,
    handType: 'oneHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 415,
          magicAttack: 423,
          attackRate: 1281
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-crystal.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 335,
          magicAttack: 343,
          attackRate: 998
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite-crystal.png'
      },
      palladium: {
        baseStats: {
          attack: 270,
          magicAttack: 278,
          attackRate: 812
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/palladium-crystal.png'
      },
      archridium: {
        baseStats: {
          attack: 246,
          magicAttack: 254,
          attackRate: 751
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-crystal.png'
      },
      mithril: {
        baseStats: {
          attack: 222,
          magicAttack: 232,
          attackRate: 690
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-crystal.png'
      },
      sigmetal: {
        baseStats: {
          attack: 190,
          magicAttack: 198,
          attackRate: 612
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/weapons/sigmetal-crystal.png'
      } 
    }
    
  },
  blade: {
    type: 'blade',
    subtype: 'blade',
    material: 'weapon',
    class: 'warrior',
    maxSlots: 3,
    handType: 'oneHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 442,
          magicAttack: 384,
          attackRate: 725
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-blade.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 357,
          magicAttack: 307,
          attackRate: 711
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite-blade.png' // TODO: Add actual image
      },
      palladium: {
        baseStats: {
          attack: 292,
          magicAttack: 242,
          attackRate: 525
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/palladium-blade.png' // TODO: Add actual image
      },
      archridium: {
        baseStats: {
          attack: 268,
          magicAttack: 218,
          attackRate: 499
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-blade.png' // TODO: Add actual image
      },
      mithril: {
        baseStats: {
          attack: 246,
          magicAttack: 194,
          attackRate: 473
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-blade.png' // TODO: Add actual image
      },
      sigmetal: {
        baseStats: {
          attack: 212,
          magicAttack: 162,
          attackRate: 431
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/weapons/sigmetal-blade.png' // TODO: Add actual image
      }
    }
  },
  katana: {
    type: 'katana',
    subtype: 'katana',
    material: 'weapon',
    class: 'blader',
    maxSlots: 3,
    handType: 'oneHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 403,
          magicAttack: 374,
          attackRate: 1225
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-katana.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 343,
          magicAttack: 312,
          attackRate: 998
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite-katana.png'
      },
      palladium: {
        baseStats: {
          attack: 278,
          magicAttack: 247,
          attackRate: 812
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/palladium-katana.png'
      },
      archridium: {
        baseStats: {
          attack: 254,
          magicAttack: 223,
          attackRate: 751
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-katana.png'
      },
      mithril: {
        baseStats: {
          attack: 232,
          magicAttack: 199,
          attackRate: 690
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-katana.png'
      },
    }
  },
  greatsword: {
    type: 'greatsword',
    subtype: 'greatsword',
    material: 'weapon',
    class: 'warrior',
    maxSlots: 3,
    handType: 'twoHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 834,
          magicAttack: 768,
          attackRate: 1450
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-greatsword.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 714,
          magicAttack: 614,
          attackRate: 1422
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite-greatsword.png'
      },
      palladium: {
        baseStats: {
          attack: 539,
          magicAttack: 587,
          attackRate: 1255
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/palladium-greatsword.png'
      },
      archridium: {
        baseStats: {
          attack: 536,
          magicAttack: 436,
          attackRate: 998
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-greatsword.png'
      },
      mithril: {
        baseStats: {
          attack: 492,
          magicAttack: 388,
          attackRate: 946
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-greatsword.png'
      },
      sigmetal: {
        baseStats: {
          attack: 424,
          magicAttack: 324,
          attackRate: 862
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/weapons/sigmetal-greatsword.png'
      }
    }
  },
  daikatana: {
    type: 'daikatana',
    subtype: 'daikatana',
    material: 'weapon',
    class: 'warrior',
    maxSlots: 3,
    handType: 'twoHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 806,
          magicAttack: 748,
          attackRate: 2450
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-daikatana.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 686,
          magicAttack: 624,
          attackRate: 1996
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite-daikatana.png'
      },
      palladium: {
        baseStats: {
          attack: 556,
          magicAttack: 494,
          attackRate: 1624
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/palladium-daikatana.png'
      },
      archridium: {
        baseStats: {
          attack: 508,
          magicAttack: 446,
          attackRate: 1502
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-daikatana.png'
      },
      mithril: {
        baseStats: {
          attack: 464,
          magicAttack: 398,
          attackRate: 1380
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-daikatana.png'
      },
      sigmetal: {
        baseStats: {
          attack: 396,
          magicAttack: 334,
          attackRate: 1224
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/weapons/sigmetal-daikatana.png'
      }
    }
  },
  chakram: {
    type: 'chakram',
    subtype: 'chakram',
    material: 'weapon',
    class: 'gladiator',
    maxSlots: 3,
    handType: 'oneHanded',
    grades: {
      dragonium: {
        baseStats: {
          attack: 442,
          magicAttack: 394,
          attackRate: 975
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/dragonium-chakram.png' // TODO: Add actual image
      },
      demonite: {
        baseStats: {
          attack: 357,
          magicAttack: 307,
          attackRate: 788
        },
        maxExtremeLevel: 7,
        imagePath: '/images/equipment-system/weapons/demonite-chakram.png' // TODO: Add actual image
      },
      palladium: {
        baseStats: {
          attack: 292,
          magicAttack: 242,
          attackRate: 622
        },
        maxExtremeLevel: 6,
        imagePath: '/images/equipment-system/weapons/palladium-chakram.png' // TODO: Add actual image
      },
      archridium: {
        baseStats: {
          attack: 268,
          magicAttack: 218,
          attackRate: 591
        },
        maxExtremeLevel: 5,
        imagePath: '/images/equipment-system/weapons/archridium-chakram.png' // TODO: Add actual image
      },
      mithril: {
        baseStats: {
          attack: 246,
          magicAttack: 194,
          attackRate: 560
        },
        maxExtremeLevel: 4,
        imagePath: '/images/equipment-system/weapons/mithril-chakram.png' // TODO: Add actual image
      },
      sigmetal: {
        baseStats: {
          attack: 212,
          magicAttack: 162,
          attackRate: 512
        },
        maxExtremeLevel: 3,
        imagePath: '/images/equipment-system/weapons/sigmetal-chakram.png' // TODO: Add actual image
      }
    }
  }
};