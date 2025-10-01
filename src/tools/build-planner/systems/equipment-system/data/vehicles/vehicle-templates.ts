/**
 * Vehicle templates
 * Contains base templates for different vehicle types
 */

import { VehicleTemplate, Vehicle } from './vehicle-types';

// Define specific bike vehicles (no more template-based approach)
export const bikeVehicles: Vehicle[] = [
  {
    id: 'rw3-bike',
    name: 'RW3',
    type: 'vehicle',
    subtype: 'bike',
    material: 'vehicle',
    class: 'all',
    grade: 'high',
    baseStats: {
      defense: 40,
      defenseRate: 150,
      movementSpeed: 850
    },
    maxSlots: 3,
    maxExtremeLevel: 3,
    imagePath: '/images/equipment-system/vehicles/rw3.png'
  },
  {
    id: 'pw5-bike',
    name: 'PW5',
    type: 'vehicle',
    subtype: 'bike',
    material: 'vehicle',
    class: 'all',
    grade: 'highest',
    baseStats: {
      defense: 60,
      defenseRate: 220,
      movementSpeed: 900
    },
    maxSlots: 3,
    maxExtremeLevel: 5,
    imagePath: '/images/equipment-system/vehicles/pw5.png'
  },
  {
    id: 'qw7-bike',
    name: 'QW7',
    type: 'vehicle',
    subtype: 'bike',
    material: 'vehicle',
    class: 'all',
    grade: 'ultimate',
    baseStats: {
      defense: 80,
      defenseRate: 290,
      movementSpeed: 950
    },
    maxSlots: 3,
    maxExtremeLevel: 6,
    imagePath: '/images/equipment-system/vehicles/qw7.png'
  },
  {
    id: 'blue-bike',
    name: 'Blue Bike',
    type: 'vehicle',
    subtype: 'bike',
    material: 'vehicle',
    class: 'all',
    grade: 'medium',
    baseStats: {
      defense: 20,
      defenseRate: 80,
      movementSpeed: 750
    },
    maxSlots: 3,
    maxExtremeLevel: 1,
    imagePath: '/images/equipment-system/vehicles/blue bike.png'
  }
];

// Legacy template structure - keeping for backward compatibility but will be phased out
export const vehicleTemplates: VehicleTemplate[] = [];

// Function to get all vehicles (now returns direct vehicle definitions)
export const getAllVehicles = (): Vehicle[] => {
  return [...bikeVehicles];
};

// Helper function to get a vehicle by ID
export const getVehicleById = (id: string): Vehicle | undefined => {
  const allVehicles = getAllVehicles();
  return allVehicles.find(vehicle => vehicle.id === id);
};

// Legacy function - kept for backward compatibility
export const createVehiclesFromTemplates = (): Vehicle[] => {
  return getAllVehicles();
};