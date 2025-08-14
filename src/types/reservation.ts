export type VehicleType = "vip-6" | "vip-10";
export type Lang = "de" | "en" | "tr" | "ru";

export interface ReservationFormData {
  lang: Lang;
  from: string;
  to: string;
  date: string; // YYYY-MM-DD
  time: string; // HH:mm (24h)
  adults: number;
  babySeat: number; // 1 adete kadar ücretsiz
  fullName: string;
  phone: string;
  email: string;

  // Optional / advanced fields
  flightNo?: string | null;
  terminal?: string | null;
  baggageCount?: number | null;
  note?: string | null;
  acceptPolicy?: boolean | null;
  acceptKvkk?: boolean | null;
  acceptComms?: boolean | null;
}

// Basit tip: ana sayfa “Araç Filomuz” ve Step3 için
export const VEHICLES: { 
  id: VehicleType; 
  title: string; 
  seats: number; 
  bags: number; 
  image?: string; 
  features?: string[];
  basePriceEur?: number;
}[] = [
  { 
    id: "vip-6", 
    title: "VIP Minivan (6 Koltuk)", 
    seats: 6, 
    bags: 4,
    image: "/vehicles/vip-6.jpg",
    features: ["Wi‑Fi", "USB", "Klima", "Su", "4× Bagaj"],
    basePriceEur: 65
  },
  { 
    id: "vip-10", 
    title: "VIP Minibus (10 Koltuk)", 
    seats: 10, 
    bags: 8,
    image: "/vehicles/vip-10.jpg",
    features: ["Wi‑Fi", "USB", "Klima", "Su", "8× Bagaj"],
    basePriceEur: 90
  },
];

export function genPNR() {
  const n = Math.floor(10000 + Math.random() * 90000);
  return `TRF-${n}`;
}

// Basit fiyat – rota bağımsız (ileride rota-bazlı yaparız)
export function calcPrice(vehicle: VehicleType, adults: number, babySeat: number) {
  const base = vehicle === "vip-6" ? 65 : 90; // EUR
  const extraBaby = Math.max(0, babySeat - 1) * 5; // 1 adet ücretsiz
  const paxAdj = Math.max(0, adults - 2) * 3;
  return base + extraBaby + paxAdj;
}
