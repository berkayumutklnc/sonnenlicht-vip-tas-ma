// Lightweight .ics generator for a single reservation
import type { Reservation } from "@/types";

function pad(n: number): string {
  return n < 10 ? `0${n}` : String(n);
}

// Format UTC ms to ICS date-time in UTC: YYYYMMDDTHHMMSSZ
export function toIcsUtc(dtMs: number): string {
  const d = new Date(dtMs);
  return [
    d.getUTCFullYear(),
    pad(d.getUTCMonth() + 1),
    pad(d.getUTCDate()),
  ].join("") + "T" + [pad(d.getUTCHours()), pad(d.getUTCMinutes()), pad(d.getUTCSeconds())].join("") + "Z";
}

export function makeReservationIcs(res: Reservation, endAtMs?: number): string {
  const uid = res.id || res.code || `tmp-${Math.random().toString(36).slice(2)}`;
  const startAtMs = res.startAt || Date.UTC(
    Number(res.date?.slice(0,4) ?? 0),
    Number(res.date?.slice(5,7) ?? 1) - 1,
    Number(res.date?.slice(8,10) ?? 1),
    Number(res.time?.slice(0,2) ?? 0),
    Number(res.time?.slice(3,5) ?? 0)
  );
  const endMs = endAtMs ?? (startAtMs + 60 * 60 * 1000);
  const lines = [
    "BEGIN:VCALENDAR",
    "VERSION:2.0",
    "PRODID:-//Antalya VIP Transfer//Reservation//TR",
    "CALSCALE:GREGORIAN",
    "METHOD:PUBLISH",
    "BEGIN:VEVENT",
    `UID:${uid}@antalya-vip-transfer`,
    `DTSTAMP:${toIcsUtc(Date.now())}`,
    `DTSTART:${toIcsUtc(startAtMs)}`,
    `DTEND:${toIcsUtc(endMs)}`,
    `SUMMARY:VIP Transfer - ${res.from} → ${res.to}`,
    `DESCRIPTION:Rezervasyon Kodu: ${res.code}\\nİsim: ${res.fullName}\\nTel: ${res.phone}\\nEmail: ${res.email}`,
    `LOCATION:${res.from} - ${res.to}`,
    "END:VEVENT",
    "END:VCALENDAR"
  ];
  return lines.join("\r\n");
}

export function downloadIcs(filename: string, content: string) {
  const blob = new Blob([content], { type: "text/calendar;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = filename.endsWith(".ics") ? filename : `${filename}.ics`;
  document.body.appendChild(a);
  a.click();
  a.remove();
  URL.revokeObjectURL(url);
}
