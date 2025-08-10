// Basit ve güvenli MVP: Istanbul her zaman UTC+3 kabul edilir.
export function istToUtcMs(dateStr: string, timeStr: string): number {
  const [y, m, d] = dateStr.split("-").map(Number);
  const [hh, mm] = timeStr.split(":").map(Number);
  // Istanbul UTC+3 → UTC'ye çevirmek için -3 saat
  const utc = Date.UTC(y, m - 1, d, hh - 3, mm, 0, 0);
  return utc;
}

export function addMinutes(ms: number, minutes: number): number {
  return ms + minutes * 60 * 1000;
}

export function fmtGCal(ms: number): string {
  // returns "YYYYMMDDTHHMMSSZ"
  return new Date(ms).toISOString().replace(/[-:]/g, "").split(".")[0] + "Z";
}
