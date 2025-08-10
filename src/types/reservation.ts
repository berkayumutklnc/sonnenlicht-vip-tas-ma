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

  vehicleType?: VehicleType;
  price?: number | null; // computed
}

export interface ReservationRecord extends ReservationFormData {
  id: string; // TRF-XXXXX
  createdAt: number; // epoch ms
  status: "pending" | "confirmed" | "canceled";
  // notes?: string;
}

export const LOCATIONS = [
  "Antalya Havalimanı (AYT)",
  "Antalya şehir merkezi",
  "Belek",
  "Kemer",
  "Lara",
  "Side",
  "Alanya",
];

export const VEHICLES: { id: VehicleType; title: string; seats: number; bags: number }[] = [
  { id: "vip-6",  title: "VIP Minivan (6 Koltuk)",  seats: 6,  bags: 4 },
  { id: "vip-10", title: "VIP Minibus (10 Koltuk)", seats: 10, bags: 8 },
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
