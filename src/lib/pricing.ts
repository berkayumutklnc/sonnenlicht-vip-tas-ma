// src/lib/pricing.ts
// Rota ve araç tipine göre fiyatlandırma matrisi (örnek)

import type { VehicleType } from "@/types/reservation";

export interface RoutePricing {
  [from: string]: {
    [to: string]: {
      [vehicleType in VehicleType]?: number;
    };
  };
}

export const pricingMatrix: RoutePricing = {
  'Antalya Havalimanı (AYT)': {
    'Belek': { 'vip-6': 70, 'vip-10': 120 },
    'Kemer': { 'vip-6': 80, 'vip-10': 130 },
  },
  'Belek': {
    'Antalya Havalimanı (AYT)': { 'vip-6': 70, 'vip-10': 120 },
  },
  // ... diğer rotalar ...
};

export function getPrice(from: string, to: string, vehicleType: VehicleType): number | null {
  return (
    pricingMatrix[from]?.[to]?.[vehicleType] ??
    pricingMatrix[to]?.[from]?.[vehicleType] ??
    null
  );
}
