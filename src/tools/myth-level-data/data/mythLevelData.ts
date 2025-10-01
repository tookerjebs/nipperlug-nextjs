// Auto-generated myth level data from server files
// Generated on 2025-09-26T13:03:12.519Z

// Myth Level Data Types
export interface MythLevelData {
  level: number;
  value: number;
  holyPower: number | string;
  weight: number;
  levelSelectionChance: number;
  finalProbability: number;
  tier: number;
}

export interface MythStatData {
  forceId: number;
  name?: string;
  statSelectionChance: number;
  statWeight: number;
  levels: MythLevelData[];
}

export interface MythNodeData {
  nodeId: number;
  optPoolIdx: number;
  totalStatWeight: number;
  stats: MythStatData[];
}

// Complete myth level data for all 78 nodes
export const mythLevelData: MythNodeData[] = [
  {
    "nodeId": 1,
    "optPoolIdx": 0,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 2,
    "optPoolIdx": 22,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 74,
        "name": "Ignore Penetration",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 139,
        "name": "Cancel Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 3,
    "optPoolIdx": 11,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 208,
        "name": "Pve Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 209,
        "name": "Pvp Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 4,
    "optPoolIdx": 0,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 5,
    "optPoolIdx": 0,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 6,
    "optPoolIdx": 22,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 74,
        "name": "Ignore Penetration",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 139,
        "name": "Cancel Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 7,
    "optPoolIdx": 22,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 74,
        "name": "Ignore Penetration",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 139,
        "name": "Cancel Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 8,
    "optPoolIdx": 11,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 208,
        "name": "Pve Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 209,
        "name": "Pvp Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 9,
    "optPoolIdx": 11,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 208,
        "name": "Pve Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 209,
        "name": "Pvp Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 9,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 16,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 10,
    "optPoolIdx": 5,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 100,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 120,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 160,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 400,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 11,
    "optPoolIdx": 33,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 156,
        "name": "Pve Damage Reduction",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 24.799,
            "levelSelectionChance": 49.598,
            "finalProbability": 24.799,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 194,
        "name": "Pvp Damage Reduction",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 24.799,
            "levelSelectionChance": 49.598,
            "finalProbability": 24.799,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 12,
    "optPoolIdx": 27,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 74,
        "name": "Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 138,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 139,
        "name": "Cancel Ignore Penetration",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 13,
    "optPoolIdx": 41,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 132,
        "name": "Normal Damage Up",
        "statSelectionChance": 100,
        "statWeight": 100,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 48,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 60,
            "weight": 25.839,
            "levelSelectionChance": 25.839,
            "finalProbability": 25.839,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 72,
            "weight": 25,
            "levelSelectionChance": 25,
            "finalProbability": 25,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 78,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 84,
            "weight": 8,
            "levelSelectionChance": 8,
            "finalProbability": 8,
            "tier": 0
          },
          {
            "level": 6,
            "value": 6,
            "holyPower": 90,
            "weight": 1,
            "levelSelectionChance": 1,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 7,
            "value": 7,
            "holyPower": 96,
            "weight": 0.1,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 8,
            "value": 8,
            "holyPower": 120,
            "weight": 0.05,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.05,
            "tier": 0
          },
          {
            "level": 9,
            "value": 10,
            "holyPower": 144,
            "weight": 0.01,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 10,
            "value": 13,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.001,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 14,
    "optPoolIdx": 27,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 74,
        "name": "Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 138,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 139,
        "name": "Cancel Ignore Penetration",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 15,
    "optPoolIdx": 37,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 24.799,
            "levelSelectionChance": 49.598,
            "finalProbability": 24.799,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 132,
            "weight": 0.2,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 220,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 24.799,
            "levelSelectionChance": 49.598,
            "finalProbability": 24.799,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 132,
            "weight": 0.2,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 220,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 16,
    "optPoolIdx": 16,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 208,
        "name": "Pve Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 115,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 138,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 276,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 209,
        "name": "Pvp Cancel Ignore Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 115,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 138,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 276,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 15,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 21,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 17,
    "optPoolIdx": 1,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 35,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 132,
            "weight": 19.6,
            "levelSelectionChance": 98,
            "finalProbability": 19.6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 112,
        "name": "Resist Skill Amplification",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 144,
            "weight": 14.85,
            "levelSelectionChance": 99,
            "finalProbability": 14.85,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 240,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 18,
    "optPoolIdx": 1,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 35,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 132,
            "weight": 19.6,
            "levelSelectionChance": 98,
            "finalProbability": 19.6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 112,
        "name": "Resist Skill Amplification",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 144,
            "weight": 14.85,
            "levelSelectionChance": 99,
            "finalProbability": 14.85,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 240,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 19,
    "optPoolIdx": 23,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 60,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 72,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 96,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 144,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 35,
            "holyPower": 240,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 8.8,
            "levelSelectionChance": 44,
            "finalProbability": 8.8,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 13.2,
            "levelSelectionChance": 88,
            "finalProbability": 13.2,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 1.5,
            "levelSelectionChance": 10,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 127,
        "name": "Ignore Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 20,
    "optPoolIdx": 23,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 60,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 72,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 96,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 144,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 35,
            "holyPower": 240,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 8.8,
            "levelSelectionChance": 44,
            "finalProbability": 8.8,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 13.2,
            "levelSelectionChance": 88,
            "finalProbability": 13.2,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 1.5,
            "levelSelectionChance": 10,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 127,
        "name": "Ignore Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 21,
    "optPoolIdx": 23,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 60,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 72,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 96,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 144,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 35,
            "holyPower": 240,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 8.8,
            "levelSelectionChance": 44,
            "finalProbability": 8.8,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 13.2,
            "levelSelectionChance": 88,
            "finalProbability": 13.2,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 1.5,
            "levelSelectionChance": 10,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 127,
        "name": "Ignore Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 22,
    "optPoolIdx": 23,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 60,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 72,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 96,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 144,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 35,
            "holyPower": 240,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 8.8,
            "levelSelectionChance": 44,
            "finalProbability": 8.8,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 13.2,
            "levelSelectionChance": 88,
            "finalProbability": 13.2,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 1.5,
            "levelSelectionChance": 10,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 127,
        "name": "Ignore Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 23,
    "optPoolIdx": 12,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 202,
        "name": "Pve Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 203,
        "name": "Pvp Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 206,
        "name": "Pve Ignore Resist Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 207,
        "name": "Pvp Ignore Resist Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 24,
    "optPoolIdx": 12,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 202,
        "name": "Pve Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 203,
        "name": "Pvp Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 206,
        "name": "Pve Ignore Resist Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 207,
        "name": "Pvp Ignore Resist Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 25,
    "optPoolIdx": 6,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 168,
            "weight": 19.6,
            "levelSelectionChance": 98,
            "finalProbability": 19.6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 280,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 112,
        "name": "Resist Skill Amplification",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 240,
            "weight": 14.85,
            "levelSelectionChance": 99,
            "finalProbability": 14.85,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 400,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 26,
    "optPoolIdx": 34,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 60,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 20,
            "holyPower": 72,
            "weight": 24.899,
            "levelSelectionChance": 49.798,
            "finalProbability": 24.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 144,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 100,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 60,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 20,
            "holyPower": 72,
            "weight": 24.899,
            "levelSelectionChance": 49.798,
            "finalProbability": 24.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 144,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 100,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 27,
    "optPoolIdx": 28,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 100,
            "weight": 6.25,
            "levelSelectionChance": 25,
            "finalProbability": 6.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 120,
            "weight": 10.75,
            "levelSelectionChance": 43,
            "finalProbability": 10.75,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 160,
            "weight": 6.25,
            "levelSelectionChance": 25,
            "finalProbability": 6.25,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 240,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 400,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 127,
        "name": "Ignore Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 28,
    "optPoolIdx": 42,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 100,
        "statWeight": 100,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 56,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 70,
            "weight": 25.839,
            "levelSelectionChance": 25.839,
            "finalProbability": 25.839,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 84,
            "weight": 25,
            "levelSelectionChance": 25,
            "finalProbability": 25,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 91,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 5,
            "value": 6,
            "holyPower": 98,
            "weight": 8,
            "levelSelectionChance": 8,
            "finalProbability": 8,
            "tier": 0
          },
          {
            "level": 6,
            "value": 7,
            "holyPower": 105,
            "weight": 1,
            "levelSelectionChance": 1,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 7,
            "value": 8,
            "holyPower": 112,
            "weight": 0.1,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 8,
            "value": 10,
            "holyPower": 140,
            "weight": 0.05,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.05,
            "tier": 0
          },
          {
            "level": 9,
            "value": 12,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.001,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 29,
    "optPoolIdx": 28,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 100,
            "weight": 6.25,
            "levelSelectionChance": 25,
            "finalProbability": 6.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 120,
            "weight": 10.75,
            "levelSelectionChance": 43,
            "finalProbability": 10.75,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 160,
            "weight": 6.25,
            "levelSelectionChance": 25,
            "finalProbability": 6.25,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 240,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 400,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 127,
        "name": "Ignore Resist Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 30,
    "optPoolIdx": 38,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 55,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 20,
            "holyPower": 66,
            "weight": 24.899,
            "levelSelectionChance": 49.798,
            "finalProbability": 24.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 132,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 100,
            "holyPower": 220,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 55,
            "weight": 20,
            "levelSelectionChance": 40,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 20,
            "holyPower": 66,
            "weight": 24.899,
            "levelSelectionChance": 49.798,
            "finalProbability": 24.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 10,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 132,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 100,
            "holyPower": 220,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 31,
    "optPoolIdx": 17,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 202,
        "name": "Pve Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 203,
        "name": "Pvp Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 206,
        "name": "Pve Ignore Resist Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 207,
        "name": "Pvp Ignore Resist Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 32,
    "optPoolIdx": 2,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 20,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 25,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 30,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 35,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 40,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 132,
            "weight": 19.6,
            "levelSelectionChance": 98,
            "finalProbability": 19.6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 112,
        "name": "Resist Skill Amplification",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 144,
            "weight": 14.85,
            "levelSelectionChance": 99,
            "finalProbability": 14.85,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 240,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 33,
    "optPoolIdx": 2,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 20,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 25,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 30,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 35,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 40,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 132,
            "weight": 19.6,
            "levelSelectionChance": 98,
            "finalProbability": 19.6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 112,
        "name": "Resist Skill Amplification",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 144,
            "weight": 14.85,
            "levelSelectionChance": 99,
            "finalProbability": 14.85,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 240,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 34,
    "optPoolIdx": 24,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 35,
    "optPoolIdx": 24,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 36,
    "optPoolIdx": 24,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 37,
    "optPoolIdx": 24,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 38,
    "optPoolIdx": 13,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 163,
        "name": "Pve Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 188,
        "name": "Pvp Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 39,
    "optPoolIdx": 13,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 163,
        "name": "Pve Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 188,
        "name": "Pvp Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 70,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 84,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 112,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 8,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 9,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 11,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 14,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 18,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 40,
    "optPoolIdx": 7,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 30,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 35,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 40,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 45,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 55,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 98,
        "name": "Resist Critical Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 168,
            "weight": 19.6,
            "levelSelectionChance": 98,
            "finalProbability": 19.6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 280,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 112,
        "name": "Resist Skill Amplification",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 240,
            "weight": 14.85,
            "levelSelectionChance": 99,
            "finalProbability": 14.85,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 400,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 210,
        "name": "Pve Ignore Accuracy",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 211,
        "name": "Pvp Ignore Accuracy",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 6,
            "levelSelectionChance": 20,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 3,
            "levelSelectionChance": 10,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1.5,
            "levelSelectionChance": 5,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.9,
            "levelSelectionChance": 3,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 41,
    "optPoolIdx": 35,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 112,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 15,
            "holyPower": 168,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 70,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 112,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 15,
            "holyPower": 168,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 42,
    "optPoolIdx": 29,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 138,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 43,
    "optPoolIdx": 43,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 100,
        "statWeight": 100,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 48,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 60,
            "weight": 25.839,
            "levelSelectionChance": 25.839,
            "finalProbability": 25.839,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 72,
            "weight": 25,
            "levelSelectionChance": 25,
            "finalProbability": 25,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 84,
            "weight": 8,
            "levelSelectionChance": 8,
            "finalProbability": 8,
            "tier": 0
          },
          {
            "level": 6,
            "value": 40,
            "holyPower": 90,
            "weight": 1,
            "levelSelectionChance": 1,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 7,
            "value": 50,
            "holyPower": 96,
            "weight": 0.1,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 8,
            "value": 60,
            "holyPower": 120,
            "weight": 0.05,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.05,
            "tier": 0
          },
          {
            "level": 9,
            "value": 70,
            "holyPower": 144,
            "weight": 0.01,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 10,
            "value": 100,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.001,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 44,
    "optPoolIdx": 29,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 71,
        "name": "Ignore Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 73,
        "name": "Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 75,
        "name": "Cancel Ignore Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 81,
        "name": "Cancel Ignore Damage Reduction",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 138,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 45,
    "optPoolIdx": 39,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 96,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 144,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 22,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 96,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 144,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 22,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 46,
    "optPoolIdx": 18,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 163,
        "name": "Pve Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 115,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 138,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 184,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 276,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 460,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 188,
        "name": "Pvp Penetration",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 115,
            "weight": 1.5,
            "levelSelectionChance": 75,
            "finalProbability": 1.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 138,
            "weight": 0.409,
            "levelSelectionChance": 20.45,
            "finalProbability": 0.409,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 184,
            "weight": 0.08,
            "levelSelectionChance": 4,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 276,
            "weight": 0.01,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 460,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 212,
        "name": "Pve Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 213,
        "name": "Pvp Ignore Evasion",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 9,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 10,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 13,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 17,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 24,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 216,
        "name": "Pve Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 217,
        "name": "Pvp Ignore Damage Reduction",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 47,
    "optPoolIdx": 3,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 48,
    "optPoolIdx": 3,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 49,
    "optPoolIdx": 25,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 240,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 72,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 144,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 78,
        "name": "Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 80,
        "name": "Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 50,
    "optPoolIdx": 25,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 240,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 72,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 96,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 7,
            "holyPower": 144,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 10,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 78,
        "name": "Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 6,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 9,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 80,
        "name": "Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 51,
    "optPoolIdx": 14,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 202,
        "name": "Pve Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 203,
        "name": "Pvp Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 214,
        "name": "Pve Ignore Resist Skill Amplification",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 168,
            "weight": 1.999,
            "levelSelectionChance": 99.95,
            "finalProbability": 1.999,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 215,
        "name": "Pvp Ignore Resist Skill Amplification",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 168,
            "weight": 1.999,
            "levelSelectionChance": 99.95,
            "finalProbability": 1.999,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 52,
    "optPoolIdx": 14,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 202,
        "name": "Pve Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 203,
        "name": "Pvp Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 214,
        "name": "Pve Ignore Resist Skill Amplification",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 168,
            "weight": 1.999,
            "levelSelectionChance": 99.95,
            "finalProbability": 1.999,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 215,
        "name": "Pvp Ignore Resist Skill Amplification",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 168,
            "weight": 1.999,
            "levelSelectionChance": 99.95,
            "finalProbability": 1.999,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 53,
    "optPoolIdx": 3,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 190,
        "name": "Pve Defense Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 191,
        "name": "Pvp Defense Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 54,
    "optPoolIdx": 36,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 8,
            "holyPower": 96,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 144,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 60,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 8,
            "holyPower": 96,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 144,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 240,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 55,
    "optPoolIdx": 30,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 35,
            "holyPower": 100,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 40,
            "holyPower": 120,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 45,
            "holyPower": 160,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 240,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 60,
            "holyPower": 400,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 14,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 18,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 22,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 26,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 34,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 38,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 50,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 66,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 94,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 14,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 18,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 22,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 26,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 34,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 38,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 50,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 66,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 94,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 78,
        "name": "Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 80,
        "name": "Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 138,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 56,
    "optPoolIdx": 44,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 100,
        "statWeight": 100,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 56,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 70,
            "weight": 25.839,
            "levelSelectionChance": 25.839,
            "finalProbability": 25.839,
            "tier": 0
          },
          {
            "level": 3,
            "value": 8,
            "holyPower": 84,
            "weight": 25,
            "levelSelectionChance": 25,
            "finalProbability": 25,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 91,
            "weight": 20,
            "levelSelectionChance": 20,
            "finalProbability": 20,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 98,
            "weight": 8,
            "levelSelectionChance": 8,
            "finalProbability": 8,
            "tier": 0
          },
          {
            "level": 6,
            "value": 14,
            "holyPower": 105,
            "weight": 1,
            "levelSelectionChance": 1,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 7,
            "value": 16,
            "holyPower": 112,
            "weight": 0.1,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 8,
            "value": 18,
            "holyPower": 140,
            "weight": 0.05,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.05,
            "tier": 0
          },
          {
            "level": 9,
            "value": 21,
            "holyPower": 168,
            "weight": 0.01,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.001,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 57,
    "optPoolIdx": 30,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 35,
            "holyPower": 100,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 40,
            "holyPower": 120,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 45,
            "holyPower": 160,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 240,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 60,
            "holyPower": 400,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 6,
        "name": "Attack Rate",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 14,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 18,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 22,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 26,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 34,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 38,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 50,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 66,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 94,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 7,
        "name": "Defense Rate",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 14,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 18,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 22,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 26,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 34,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 38,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 50,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 66,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 94,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 39,
        "name": "Add Damage",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 10,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 78,
        "name": "Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 80,
        "name": "Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 138,
            "weight": 2.028,
            "levelSelectionChance": 40.56,
            "finalProbability": 2.028,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 58,
    "optPoolIdx": 40,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 208,
        "name": "Pve Cancel Ignore Penetration",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 8,
            "holyPower": 112,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 209,
        "name": "Pvp Cancel Ignore Penetration",
        "statSelectionChance": 50,
        "statWeight": 50,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 70,
            "weight": 22,
            "levelSelectionChance": 44,
            "finalProbability": 22,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 84,
            "weight": 26.899,
            "levelSelectionChance": 53.798,
            "finalProbability": 26.899,
            "tier": 0
          },
          {
            "level": 3,
            "value": 8,
            "holyPower": 112,
            "weight": 1,
            "levelSelectionChance": 2,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.1,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.002,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 59,
    "optPoolIdx": 14,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 182,
        "name": "Pve Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 183,
        "name": "Pvp Attack Rate",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 24,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 28,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 32,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 36,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 56,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 72,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 202,
        "name": "Pve Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 203,
        "name": "Pvp Add Damage",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 5,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 11,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 214,
        "name": "Pve Ignore Resist Skill Amplification",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 168,
            "weight": 1.999,
            "levelSelectionChance": 99.95,
            "finalProbability": 1.999,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 215,
        "name": "Pvp Ignore Resist Skill Amplification",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 168,
            "weight": 1.999,
            "levelSelectionChance": 99.95,
            "finalProbability": 1.999,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 280,
            "weight": 0.001,
            "levelSelectionChance": 0.05,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 60,
    "optPoolIdx": 9,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 40,
            "holyPower": 100,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 45,
            "holyPower": 120,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 50,
            "holyPower": 160,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 55,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 65,
            "holyPower": 400,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 13,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 21,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 192,
        "name": "Pve Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 193,
        "name": "Pvp Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 13,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 21,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 61,
    "optPoolIdx": 4,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 192,
        "name": "Pve Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 193,
        "name": "Pvp Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 62,
    "optPoolIdx": 9,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 40,
            "holyPower": 100,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 45,
            "holyPower": 120,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 50,
            "holyPower": 160,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 55,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 65,
            "holyPower": 400,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 13,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 21,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 192,
        "name": "Pve Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 193,
        "name": "Pvp Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 13,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 21,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 63,
    "optPoolIdx": 26,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 240,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 8,
        "name": "Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 36,
        "name": "Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 79,
        "name": "Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 132,
        "name": "Normal Damage Up",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 64,
    "optPoolIdx": 20,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 158,
        "name": "Pve Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 173,
        "name": "Pvp Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 186,
        "name": "Pve Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 187,
        "name": "Pvp Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 65,
    "optPoolIdx": 15,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 158,
        "name": "Pve Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 173,
        "name": "Pvp Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 186,
        "name": "Pve Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 187,
        "name": "Pvp Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 66,
    "optPoolIdx": 20,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 158,
        "name": "Pve Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 173,
        "name": "Pvp Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 186,
        "name": "Pve Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 187,
        "name": "Pvp Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 67,
    "optPoolIdx": 9,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 40,
            "holyPower": 100,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 45,
            "holyPower": 120,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 50,
            "holyPower": 160,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 55,
            "holyPower": 240,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 65,
            "holyPower": 400,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 13,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 21,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 192,
        "name": "Pve Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 193,
        "name": "Pvp Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 12,
            "holyPower": 115,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 13,
            "holyPower": 138,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 184,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 276,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 21,
            "holyPower": 460,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 84,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 112,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 168,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 280,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 68,
    "optPoolIdx": 31,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 40,
            "holyPower": 100,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 45,
            "holyPower": 120,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 50,
            "holyPower": 160,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 55,
            "holyPower": 240,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 65,
            "holyPower": 400,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 115,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 11,
            "holyPower": 138,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 13,
            "holyPower": 184,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 276,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 460,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 8,
        "name": "Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 36,
        "name": "Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 8,
            "holyPower": 48,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 12,
            "holyPower": 60,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 16,
            "holyPower": 72,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 78,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 24,
            "holyPower": 84,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 28,
            "holyPower": 90,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 32,
            "holyPower": 96,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 44,
            "holyPower": 120,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 60,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 84,
            "holyPower": 240,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 79,
        "name": "Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 132,
        "name": "Normal Damage Up",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 100,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 120,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 160,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 240,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 400,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 69,
    "optPoolIdx": 20,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 158,
        "name": "Pve Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 173,
        "name": "Pvp Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 184,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 276,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 6,
            "holyPower": 460,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 100,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 120,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 10,
            "holyPower": 160,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 13,
            "holyPower": 240,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 400,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 186,
        "name": "Pve Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 187,
        "name": "Pvp Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 48,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 26,
            "holyPower": 60,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 27,
            "holyPower": 72,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 28,
            "holyPower": 78,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 29,
            "holyPower": 84,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 30,
            "holyPower": 90,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 31,
            "holyPower": 96,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 33,
            "holyPower": 120,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 36,
            "holyPower": 144,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 40,
            "holyPower": 240,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 70,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 84,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 112,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 168,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 7,
            "holyPower": 280,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 70,
    "optPoolIdx": 4,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 192,
        "name": "Pve Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 193,
        "name": "Pvp Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 71,
    "optPoolIdx": 4,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 10,
            "levelSelectionChance": 50,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 8.18,
            "levelSelectionChance": 40.9,
            "finalProbability": 8.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 1.6,
            "levelSelectionChance": 8,
            "finalProbability": 1.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 240,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 192,
        "name": "Pve Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 193,
        "name": "Pvp Evasion",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 70,
            "weight": 2.75,
            "levelSelectionChance": 55,
            "finalProbability": 2.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 7,
            "holyPower": 84,
            "weight": 2.017,
            "levelSelectionChance": 40.34,
            "finalProbability": 2.017,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 0.2,
            "levelSelectionChance": 4,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 12,
            "holyPower": 168,
            "weight": 0.03,
            "levelSelectionChance": 0.6,
            "finalProbability": 0.03,
            "tier": 0
          },
          {
            "level": 5,
            "value": 16,
            "holyPower": 280,
            "weight": 0.003,
            "levelSelectionChance": 0.06,
            "finalProbability": 0.003,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 204,
        "name": "Pve Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 205,
        "name": "Pvp Cancel Ignore Damage Reduction",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 55,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 66,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 88,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 132,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 220,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 72,
    "optPoolIdx": 26,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 240,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 8,
        "name": "Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 36,
        "name": "Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 79,
        "name": "Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 132,
        "name": "Normal Damage Up",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 73,
    "optPoolIdx": 26,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 25,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 30,
            "holyPower": 72,
            "weight": 6.45,
            "levelSelectionChance": 43,
            "finalProbability": 6.45,
            "tier": 0
          },
          {
            "level": 3,
            "value": 35,
            "holyPower": 96,
            "weight": 3.75,
            "levelSelectionChance": 25,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 144,
            "weight": 0.75,
            "levelSelectionChance": 5,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 5,
            "value": 50,
            "holyPower": 240,
            "weight": 0.3,
            "levelSelectionChance": 2,
            "finalProbability": 0.3,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 15,
        "statWeight": 15,
        "levels": [
          {
            "level": 1,
            "value": 7,
            "holyPower": 70,
            "weight": 7.5,
            "levelSelectionChance": 50,
            "finalProbability": 7.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 84,
            "weight": 6.135,
            "levelSelectionChance": 40.9,
            "finalProbability": 6.135,
            "tier": 0
          },
          {
            "level": 3,
            "value": 9,
            "holyPower": 112,
            "weight": 1.2,
            "levelSelectionChance": 8,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 11,
            "holyPower": 168,
            "weight": 0.15,
            "levelSelectionChance": 1,
            "finalProbability": 0.15,
            "tier": 0
          },
          {
            "level": 5,
            "value": 14,
            "holyPower": 280,
            "weight": 0.015,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.015,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 8,
        "name": "Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 4.978,
            "levelSelectionChance": 99.56,
            "finalProbability": 4.978,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.02,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 36,
        "name": "Evasion",
        "statSelectionChance": 25,
        "statWeight": 25,
        "levels": [
          {
            "level": 1,
            "value": 4,
            "holyPower": 40,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 2,
            "value": 8,
            "holyPower": 50,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 3,
            "value": 12,
            "holyPower": 60,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 4,
            "value": 16,
            "holyPower": 65,
            "weight": 5,
            "levelSelectionChance": 20,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 5,
            "value": 20,
            "holyPower": 70,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 6,
            "value": 24,
            "holyPower": 75,
            "weight": 3.75,
            "levelSelectionChance": 15,
            "finalProbability": 3.75,
            "tier": 0
          },
          {
            "level": 7,
            "value": 28,
            "holyPower": 80,
            "weight": 2.5,
            "levelSelectionChance": 10,
            "finalProbability": 2.5,
            "tier": 0
          },
          {
            "level": 8,
            "value": 36,
            "holyPower": 100,
            "weight": 1.25,
            "levelSelectionChance": 5,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 9,
            "value": 48,
            "holyPower": 120,
            "weight": 0.75,
            "levelSelectionChance": 3,
            "finalProbability": 0.75,
            "tier": 0
          },
          {
            "level": 10,
            "value": 64,
            "holyPower": 200,
            "weight": 0.5,
            "levelSelectionChance": 2,
            "finalProbability": 0.5,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 79,
        "name": "Accuracy",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4,
            "levelSelectionChance": 20,
            "finalProbability": 4,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3,
            "levelSelectionChance": 15,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2,
            "levelSelectionChance": 10,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.6,
            "levelSelectionChance": 3,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 132,
        "name": "Normal Damage Up",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 8.6,
            "levelSelectionChance": 43,
            "finalProbability": 8.6,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 5,
            "levelSelectionChance": 25,
            "finalProbability": 5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.4,
            "levelSelectionChance": 2,
            "finalProbability": 0.4,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 74,
    "optPoolIdx": 15,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 158,
        "name": "Pve Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 173,
        "name": "Pvp Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 186,
        "name": "Pve Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 187,
        "name": "Pvp Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 75,
    "optPoolIdx": 15,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 158,
        "name": "Pve Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 173,
        "name": "Pvp Critical Damage",
        "statSelectionChance": 2,
        "statWeight": 2,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 112,
            "weight": 1.9598,
            "levelSelectionChance": 97.99,
            "finalProbability": 1.9598,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 168,
            "weight": 0.04,
            "levelSelectionChance": 2,
            "finalProbability": 0.04,
            "tier": 0
          },
          {
            "level": 3,
            "value": 4,
            "holyPower": 280,
            "weight": 0.0002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 7,
        "statWeight": 7,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 60,
            "weight": 4.9,
            "levelSelectionChance": 70,
            "finalProbability": 4.9,
            "tier": 0
          },
          {
            "level": 2,
            "value": 6,
            "holyPower": 72,
            "weight": 1.463,
            "levelSelectionChance": 20.9,
            "finalProbability": 1.463,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 96,
            "weight": 0.56,
            "levelSelectionChance": 8,
            "finalProbability": 0.56,
            "tier": 0
          },
          {
            "level": 4,
            "value": 9,
            "holyPower": 144,
            "weight": 0.07,
            "levelSelectionChance": 1,
            "finalProbability": 0.07,
            "tier": 0
          },
          {
            "level": 5,
            "value": 12,
            "holyPower": 240,
            "weight": 0.007,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.007,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 186,
        "name": "Pve Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 187,
        "name": "Pvp Accuracy",
        "statSelectionChance": 23,
        "statWeight": 23,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 40,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 2,
            "value": 16,
            "holyPower": 50,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 3,
            "value": 17,
            "holyPower": 60,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 4,
            "value": 18,
            "holyPower": 65,
            "weight": 4.6,
            "levelSelectionChance": 20,
            "finalProbability": 4.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 19,
            "holyPower": 70,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 6,
            "value": 20,
            "holyPower": 75,
            "weight": 3.45,
            "levelSelectionChance": 15,
            "finalProbability": 3.45,
            "tier": 0
          },
          {
            "level": 7,
            "value": 21,
            "holyPower": 80,
            "weight": 2.3,
            "levelSelectionChance": 10,
            "finalProbability": 2.3,
            "tier": 0
          },
          {
            "level": 8,
            "value": 23,
            "holyPower": 100,
            "weight": 1.15,
            "levelSelectionChance": 5,
            "finalProbability": 1.15,
            "tier": 0
          },
          {
            "level": 9,
            "value": 26,
            "holyPower": 120,
            "weight": 0.69,
            "levelSelectionChance": 3,
            "finalProbability": 0.69,
            "tier": 0
          },
          {
            "level": 10,
            "value": 30,
            "holyPower": 200,
            "weight": 0.46,
            "levelSelectionChance": 2,
            "finalProbability": 0.46,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 18,
        "statWeight": 18,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 55,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 66,
            "weight": 7.74,
            "levelSelectionChance": 43,
            "finalProbability": 7.74,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 88,
            "weight": 4.5,
            "levelSelectionChance": 25,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 4,
            "holyPower": 132,
            "weight": 0.9,
            "levelSelectionChance": 5,
            "finalProbability": 0.9,
            "tier": 0
          },
          {
            "level": 5,
            "value": 5,
            "holyPower": 220,
            "weight": 0.36,
            "levelSelectionChance": 2,
            "finalProbability": 0.36,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 76,
    "optPoolIdx": 10,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 40,
            "holyPower": 115,
            "weight": 7.4,
            "levelSelectionChance": 37,
            "finalProbability": 7.4,
            "tier": 0
          },
          {
            "level": 2,
            "value": 80,
            "holyPower": 138,
            "weight": 11.498,
            "levelSelectionChance": 57.49,
            "finalProbability": 11.498,
            "tier": 0
          },
          {
            "level": 3,
            "value": 120,
            "holyPower": 184,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 180,
            "holyPower": 276,
            "weight": 0.1,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 300,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.01,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 155,
        "name": "Pve Defense",
        "statSelectionChance": 10,
        "statWeight": 10.000000000000002,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 115,
            "weight": 5.749,
            "levelSelectionChance": 57.49,
            "finalProbability": 5.749,
            "tier": 0
          },
          {
            "level": 2,
            "value": 25,
            "holyPower": 138,
            "weight": 3.699,
            "levelSelectionChance": 36.99,
            "finalProbability": 3.699,
            "tier": 0
          },
          {
            "level": 3,
            "value": 30,
            "holyPower": 184,
            "weight": 0.5,
            "levelSelectionChance": 5,
            "finalProbability": 0.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 276,
            "weight": 0.05,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.05,
            "tier": 0
          },
          {
            "level": 5,
            "value": 100,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 156,
        "name": "Pve Damage Reduction",
        "statSelectionChance": 25,
        "statWeight": 25.000000000000004,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 100,
            "weight": 8.75,
            "levelSelectionChance": 35,
            "finalProbability": 8.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 120,
            "weight": 14.14,
            "levelSelectionChance": 56.56,
            "finalProbability": 14.14,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 160,
            "weight": 2,
            "levelSelectionChance": 8,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 240,
            "weight": 0.1,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 400,
            "weight": 0.01,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.01,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 157,
        "name": "Pve Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 125,
            "weight": 3,
            "levelSelectionChance": 60,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 150,
            "weight": 1.889,
            "levelSelectionChance": 37.78,
            "finalProbability": 1.889,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 200,
            "weight": 0.1,
            "levelSelectionChance": 2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 30,
            "holyPower": 300,
            "weight": 0.01,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 60,
            "holyPower": 500,
            "weight": 0.001,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 189,
        "name": "Pvp Defense",
        "statSelectionChance": 10,
        "statWeight": 10.000000000000002,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 115,
            "weight": 5.749,
            "levelSelectionChance": 57.49,
            "finalProbability": 5.749,
            "tier": 0
          },
          {
            "level": 2,
            "value": 25,
            "holyPower": 138,
            "weight": 3.699,
            "levelSelectionChance": 36.99,
            "finalProbability": 3.699,
            "tier": 0
          },
          {
            "level": 3,
            "value": 30,
            "holyPower": 184,
            "weight": 0.5,
            "levelSelectionChance": 5,
            "finalProbability": 0.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 50,
            "holyPower": 276,
            "weight": 0.05,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.05,
            "tier": 0
          },
          {
            "level": 5,
            "value": 100,
            "holyPower": 460,
            "weight": 0.002,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 194,
        "name": "Pvp Damage Reduction",
        "statSelectionChance": 25,
        "statWeight": 25.000000000000004,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 100,
            "weight": 8.75,
            "levelSelectionChance": 35,
            "finalProbability": 8.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 120,
            "weight": 14.14,
            "levelSelectionChance": 56.56,
            "finalProbability": 14.14,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 160,
            "weight": 2,
            "levelSelectionChance": 8,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 20,
            "holyPower": 240,
            "weight": 0.1,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 30,
            "holyPower": 400,
            "weight": 0.01,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.01,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 195,
        "name": "Pvp Ignore Penetration",
        "statSelectionChance": 5,
        "statWeight": 5,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 125,
            "weight": 3,
            "levelSelectionChance": 60,
            "finalProbability": 3,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 150,
            "weight": 1.889,
            "levelSelectionChance": 37.78,
            "finalProbability": 1.889,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 200,
            "weight": 0.1,
            "levelSelectionChance": 2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 30,
            "holyPower": 300,
            "weight": 0.01,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 60,
            "holyPower": 500,
            "weight": 0.001,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 77,
    "optPoolIdx": 32,
    "totalStatWeight": 100,
    "stats": [
      {
        "forceId": 1,
        "name": "HP",
        "statSelectionChance": 40,
        "statWeight": 40.00000000000001,
        "levels": [
          {
            "level": 1,
            "value": 40,
            "holyPower": 115,
            "weight": 10,
            "levelSelectionChance": 25,
            "finalProbability": 10,
            "tier": 0
          },
          {
            "level": 2,
            "value": 80,
            "holyPower": 138,
            "weight": 20.7,
            "levelSelectionChance": 51.75,
            "finalProbability": 20.7,
            "tier": 0
          },
          {
            "level": 3,
            "value": 120,
            "holyPower": 184,
            "weight": 8,
            "levelSelectionChance": 20,
            "finalProbability": 8,
            "tier": 0
          },
          {
            "level": 4,
            "value": 180,
            "holyPower": 276,
            "weight": 1.2,
            "levelSelectionChance": 3,
            "finalProbability": 1.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 300,
            "holyPower": 460,
            "weight": 0.1,
            "levelSelectionChance": 0.25,
            "finalProbability": 0.1,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 5,
        "name": "Defense",
        "statSelectionChance": 30,
        "statWeight": 30,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 115,
            "weight": 8.7,
            "levelSelectionChance": 29,
            "finalProbability": 8.7,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 138,
            "weight": 16.14,
            "levelSelectionChance": 53.8,
            "finalProbability": 16.14,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 184,
            "weight": 4.5,
            "levelSelectionChance": 15,
            "finalProbability": 4.5,
            "tier": 0
          },
          {
            "level": 4,
            "value": 35,
            "holyPower": 276,
            "weight": 0.6,
            "levelSelectionChance": 2,
            "finalProbability": 0.6,
            "tier": 0
          },
          {
            "level": 5,
            "value": 80,
            "holyPower": 460,
            "weight": 0.06,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.06,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 8,
        "name": "Critical Damage",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 3,
            "holyPower": 125,
            "weight": 3.639,
            "levelSelectionChance": 72.78,
            "finalProbability": 3.639,
            "tier": 0
          },
          {
            "level": 2,
            "value": 4,
            "holyPower": 150,
            "weight": 1.25,
            "levelSelectionChance": 25,
            "finalProbability": 1.25,
            "tier": 0
          },
          {
            "level": 3,
            "value": 5,
            "holyPower": 200,
            "weight": 0.1,
            "levelSelectionChance": 2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 8,
            "holyPower": 300,
            "weight": 0.01,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.01,
            "tier": 0
          },
          {
            "level": 5,
            "value": 13,
            "holyPower": 500,
            "weight": 0.001,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.001,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 113,
        "name": "All Attack Up",
        "statSelectionChance": 5,
        "statWeight": 4.999999999999999,
        "levels": [
          {
            "level": 1,
            "value": 10,
            "holyPower": 125,
            "weight": 2.148,
            "levelSelectionChance": 42.96,
            "finalProbability": 2.148,
            "tier": 0
          },
          {
            "level": 2,
            "value": 15,
            "holyPower": 150,
            "weight": 1.75,
            "levelSelectionChance": 35,
            "finalProbability": 1.75,
            "tier": 0
          },
          {
            "level": 3,
            "value": 20,
            "holyPower": 200,
            "weight": 1,
            "levelSelectionChance": 20,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 30,
            "holyPower": 300,
            "weight": 0.1,
            "levelSelectionChance": 2,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 70,
            "holyPower": 500,
            "weight": 0.002,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 132,
        "name": "Normal Damage Up",
        "statSelectionChance": 20,
        "statWeight": 20,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 115,
            "weight": 6,
            "levelSelectionChance": 30,
            "finalProbability": 6,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 138,
            "weight": 11.18,
            "levelSelectionChance": 55.9,
            "finalProbability": 11.18,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 184,
            "weight": 2.6,
            "levelSelectionChance": 13,
            "finalProbability": 2.6,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 276,
            "weight": 0.2,
            "levelSelectionChance": 1,
            "finalProbability": 0.2,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 460,
            "weight": 0.02,
            "levelSelectionChance": 0.1,
            "finalProbability": 0.02,
            "tier": 0
          }
        ]
      }
    ]
  },
  {
    "nodeId": 78,
    "optPoolIdx": 21,
    "totalStatWeight": 100.00000000000001,
    "stats": [
      {
        "forceId": 153,
        "name": "Pvp All Skill Amplification",
        "statSelectionChance": 1,
        "statWeight": 1,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 200,
            "weight": 0.9798,
            "levelSelectionChance": 97.98,
            "finalProbability": 0.9798,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 300,
            "weight": 0.02,
            "levelSelectionChance": 2,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 500,
            "weight": 0.0002,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 163,
        "name": "Pve Penetration",
        "statSelectionChance": 4,
        "statWeight": 4,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 125,
            "weight": 2.4,
            "levelSelectionChance": 60,
            "finalProbability": 2.4,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 150,
            "weight": 1.5112,
            "levelSelectionChance": 37.78,
            "finalProbability": 1.5112,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 200,
            "weight": 0.08,
            "levelSelectionChance": 2,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 300,
            "weight": 0.008,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.008,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 500,
            "weight": 0.0008,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.0008,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 172,
        "name": "Pve All Skill Amplification",
        "statSelectionChance": 1,
        "statWeight": 1,
        "levels": [
          {
            "level": 1,
            "value": 2,
            "holyPower": 200,
            "weight": 0.9798,
            "levelSelectionChance": 97.98,
            "finalProbability": 0.9798,
            "tier": 0
          },
          {
            "level": 2,
            "value": 3,
            "holyPower": 300,
            "weight": 0.02,
            "levelSelectionChance": 2,
            "finalProbability": 0.02,
            "tier": 0
          },
          {
            "level": 3,
            "value": 7,
            "holyPower": 500,
            "weight": 0.0002,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.0002,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 180,
        "name": "Pve All Attack Up",
        "statSelectionChance": 20,
        "statWeight": 20.000000000000004,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 115,
            "weight": 11.498,
            "levelSelectionChance": 57.49,
            "finalProbability": 11.498,
            "tier": 0
          },
          {
            "level": 2,
            "value": 20,
            "holyPower": 138,
            "weight": 7.398,
            "levelSelectionChance": 36.99,
            "finalProbability": 7.398,
            "tier": 0
          },
          {
            "level": 3,
            "value": 25,
            "holyPower": 184,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 276,
            "weight": 0.1,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 80,
            "holyPower": 460,
            "weight": 0.004,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.004,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 181,
        "name": "Pvp All Attack Up",
        "statSelectionChance": 20,
        "statWeight": 20.000000000000004,
        "levels": [
          {
            "level": 1,
            "value": 15,
            "holyPower": 115,
            "weight": 11.498,
            "levelSelectionChance": 57.49,
            "finalProbability": 11.498,
            "tier": 0
          },
          {
            "level": 2,
            "value": 20,
            "holyPower": 138,
            "weight": 7.398,
            "levelSelectionChance": 36.99,
            "finalProbability": 7.398,
            "tier": 0
          },
          {
            "level": 3,
            "value": 25,
            "holyPower": 184,
            "weight": 1,
            "levelSelectionChance": 5,
            "finalProbability": 1,
            "tier": 0
          },
          {
            "level": 4,
            "value": 40,
            "holyPower": 276,
            "weight": 0.1,
            "levelSelectionChance": 0.5,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 80,
            "holyPower": 460,
            "weight": 0.004,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.004,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 188,
        "name": "Pvp Penetration",
        "statSelectionChance": 4,
        "statWeight": 4,
        "levels": [
          {
            "level": 1,
            "value": 5,
            "holyPower": 125,
            "weight": 2.4,
            "levelSelectionChance": 60,
            "finalProbability": 2.4,
            "tier": 0
          },
          {
            "level": 2,
            "value": 10,
            "holyPower": 150,
            "weight": 1.5112,
            "levelSelectionChance": 37.78,
            "finalProbability": 1.5112,
            "tier": 0
          },
          {
            "level": 3,
            "value": 15,
            "holyPower": 200,
            "weight": 0.08,
            "levelSelectionChance": 2,
            "finalProbability": 0.08,
            "tier": 0
          },
          {
            "level": 4,
            "value": 25,
            "holyPower": 300,
            "weight": 0.008,
            "levelSelectionChance": 0.2,
            "finalProbability": 0.008,
            "tier": 0
          },
          {
            "level": 5,
            "value": 45,
            "holyPower": 500,
            "weight": 0.0008,
            "levelSelectionChance": 0.02,
            "finalProbability": 0.0008,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 198,
        "name": "Pve Normal Damage Up",
        "statSelectionChance": 25,
        "statWeight": 25.000000000000004,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 100,
            "weight": 8.75,
            "levelSelectionChance": 35,
            "finalProbability": 8.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 120,
            "weight": 14.14,
            "levelSelectionChance": 56.56,
            "finalProbability": 14.14,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 160,
            "weight": 2,
            "levelSelectionChance": 8,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 240,
            "weight": 0.1,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 400,
            "weight": 0.01,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.01,
            "tier": 0
          }
        ]
      },
      {
        "forceId": 199,
        "name": "Pvp Normal Damage Up",
        "statSelectionChance": 25,
        "statWeight": 25.000000000000004,
        "levels": [
          {
            "level": 1,
            "value": 1,
            "holyPower": 100,
            "weight": 8.75,
            "levelSelectionChance": 35,
            "finalProbability": 8.75,
            "tier": 0
          },
          {
            "level": 2,
            "value": 2,
            "holyPower": 120,
            "weight": 14.14,
            "levelSelectionChance": 56.56,
            "finalProbability": 14.14,
            "tier": 0
          },
          {
            "level": 3,
            "value": 3,
            "holyPower": 160,
            "weight": 2,
            "levelSelectionChance": 8,
            "finalProbability": 2,
            "tier": 0
          },
          {
            "level": 4,
            "value": 5,
            "holyPower": 240,
            "weight": 0.1,
            "levelSelectionChance": 0.4,
            "finalProbability": 0.1,
            "tier": 0
          },
          {
            "level": 5,
            "value": 8,
            "holyPower": 400,
            "weight": 0.01,
            "levelSelectionChance": 0.04,
            "finalProbability": 0.01,
            "tier": 0
          }
        ]
      }
    ]
  }
];
