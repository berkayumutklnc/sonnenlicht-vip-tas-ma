// src/utils/links.ts

// --- WhatsApp linki (güvenli) ---
export function waLink(phone?: string, text?: string) {
  const raw = (phone ?? "").toString().trim();
  if (!raw) return "#";
  const digits = raw.replace(/[^\d+]/g, "");
  const normalized = digits.startsWith("+") ? digits.slice(1) : digits;
  const q = encodeURIComponent(text ?? "");
  return `https://wa.me/${normalized}?text=${q}`;
}

// --- Google Calendar linki ---
type CalendarOptions = {
  title: string;        // Etkinlik adı
  startAt: number;      // UTC ms
  endAt: number;        // UTC ms
  details?: string;     // Açıklama
  location?: string;    // Konum (örn. "Antalya Havalimanı → Lara")
};

// GCal tarih formatı: YYYYMMDDTHHMMSSZ
function toGCalDate(ms: number): string {
  return new Date(ms).toISOString().replace(/[-:]|\.\d{3}/g, "");
}

/**
 * Google Calendar "Add to Calendar" URL'si üretir.
 * Örnek kullanım:
 *   calendarUrl({
 *     title: "VIP Transfer",
 *     startAt,
 *     endAt: addMinutes(startAt, 60),
 *     details: "TRF-12345 • Yolcu: Ad Soyad",
 *     location: "AYT → Lara"
 *   })
 */
export function calendarUrl(opts: CalendarOptions): string {
  const params = new URLSearchParams({
    action: "TEMPLATE",
    text: opts.title || "Event",
    dates: `${toGCalDate(opts.startAt)}/${toGCalDate(opts.endAt)}`,
    details: opts.details ?? "",
    location: opts.location ?? "",
    sf: "true",
    output: "xml",
  });
  return `https://www.google.com/calendar/render?${params.toString()}`;
}
