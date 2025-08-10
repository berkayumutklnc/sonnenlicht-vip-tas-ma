
/**
 * Admin araç atadığında müşteriye özet maili
 */
type AssignPayload = {
  code: string;
  email: string;
  fullName?: string;
  from: string;
  to: string;
  date: string;
  time: string;
  driverName?: string;
  driverPhone?: string;
  vehiclePlate?: string;
};

export async function sendAssignMail(payload: AssignPayload) {
  if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) return;

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_ASSIGN_TEMPLATE_ID ||
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!;

  const params = {
    code: payload.code,
    email: payload.email,
    fullName: payload.fullName ?? "-",
    from: payload.from,
    to: payload.to,
    date: payload.date,
    time: payload.time,
    driverName: payload.driverName ?? "-",
    driverPhone: payload.driverPhone ?? "-",
    vehiclePlate: payload.vehiclePlate ?? "-",
  };

  await emailjs.send(
    serviceId,
    templateId,
    params,
    { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
  );
}
import emailjs from "@emailjs/browser";
import type { ReservationRecord } from "@/types/reservation";

/**
 * Rezervasyon oluşturulunca firmaya bildirim
 * (Projedeki mevcut akışın birebir korunmuş hali)
 */
export async function sendReservationMail(record: ReservationRecord) {
  if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) return;

  await emailjs.send(
    process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!,
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!, // rezervasyon template
    {
      id: record.id,
      fullName: record.fullName,
      from: record.from,
      to: record.to,
      date: record.date,
      time: record.time,
      passengers: record.adults,
      babySeat: record.babySeat,
      vehicleType: record.vehicleType,
      price: record.price,
      email: record.email,
      phone: record.phone,
      lang: record.lang,
    },
    { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
  );
}

/**
 * İptal talebi bildirimi (Rezervasyonumu Gör sayfasından)
 * Ayrı template kullanmak istersen:
 *  - NEXT_PUBLIC_EMAILJS_CANCEL_TEMPLATE_ID ekle
 *  - EmailJS’de değişkenleri aşağıdaki params’a göre tanımla
 */
type CancelPayload = {
  code: string;
  email: string;
  fullName?: string;
  from: string;
  to: string;
  date: string;
  time: string;
  reason: string;
};

export async function sendCancelRequestMail(payload: CancelPayload) {
  if (!process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID) return;

  const serviceId = process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID!;
  const templateId =
    process.env.NEXT_PUBLIC_EMAILJS_CANCEL_TEMPLATE_ID ||
    process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID!; // ayrı tanımlamadıysan mevcut template’i kullan

  const params = {
    code: payload.code,
    email: payload.email,
    fullName: payload.fullName ?? "-",
    from: payload.from,
    to: payload.to,
    date: payload.date,
    time: payload.time,
    reason: payload.reason,
  };

  await emailjs.send(
    serviceId,
    templateId,
    params,
    { publicKey: process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY }
  );
}
