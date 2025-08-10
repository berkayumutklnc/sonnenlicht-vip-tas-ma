"use client";
import { useMemo, useState } from "react";
import type { Reservation, Vehicle } from "@/types";
import { istToUtcMs, addMinutes } from "@/utils/time";
import { isVehicleFree } from "@/utils/availability";

export default function AssignVehicleModal({
  open,
  onClose,
  reservation,
  vehicles,
  onAssign,
  slotMinutes = 60,
}: {
  open: boolean;
  onClose: () => void;
  reservation: Reservation;
  vehicles: Vehicle[];
  onAssign: (v: Vehicle) => Promise<void> | void;
  slotMinutes?: number;
}) {
  const [q, setQ] = useState("");
  const [busyId, setBusyId] = useState<string | null>(null);
  const startAt = reservation.startAt || istToUtcMs(reservation.date, reservation.time);
  const endAt = addMinutes(startAt, slotMinutes);

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    let list = vehicles;
    if (s) {
      list = list.filter(v =>
        v.id.toLowerCase().includes(s) ||
        (v.plate ?? "").toLowerCase().includes(s) ||
        (v.driverName ?? "").toLowerCase().includes(s) ||
        (v.driverPhone ?? "").toLowerCase().includes(s) ||
        (v.type ?? "").toLowerCase().includes(s)
      );
    }
    return list.sort((a,b) => (a.type || "").localeCompare(b.type || ""));
  }, [vehicles, q]);

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-2xl rounded-lg border border-white/10 bg-neutral-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">Araç Ata • {reservation.code || reservation.id}</h3>
          <button onClick={onClose} className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700">Kapat</button>
        </div>
        <div className="text-sm text-white/60 mb-3">
          {reservation.from} → {reservation.to} • {reservation.date} {reservation.time}
        </div>

        <div className="mb-3 flex gap-2">
          <input
            value={q}
            onChange={(e)=>setQ(e.target.value)}
            placeholder="Ara: plaka, sürücü, tip..."
            className="w-full px-3 py-2 rounded bg-neutral-800 border border-white/10 focus:outline-none"
          />
        </div>

        <div className="max-h-[50vh] overflow-auto rounded border border-white/10">
          <table className="w-full text-sm">
            <thead className="bg-neutral-800/60 sticky top-0">
              <tr>
                <th className="text-left p-2">Araç</th>
                <th className="text-left p-2">Sürücü</th>
                <th className="text-left p-2">Uygunluk</th>
                <th className="text-right p-2">İşlem</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map(v => {
                const free = isVehicleFree(v.blockedSlots || [], startAt, endAt);
                return (
                  <tr key={v.id} className="border-t border-white/5">
                    <td className="p-2">
                      <div className="font-medium">{v.plate || v.id}</div>
                      <div className="text-xs text-white/50">{v.type}</div>
                    </td>
                    <td className="p-2">
                      <div>{v.driverName || "—"}</div>
                      <div className="text-xs text-white/50">{v.driverPhone || ""}</div>
                    </td>
                    <td className="p-2">
                      {free
                        ? <span className="text-green-400">Uygun</span>
                        : <span className="text-red-400">Dolu</span>
                      }
                    </td>
                    <td className="p-2 text-right">
                      <button
                        disabled={!free || busyId === v.id}
                        onClick={async () => {
                          try {
                            setBusyId(v.id);
                            await onAssign(v);
                            onClose();
                          } catch(e:any) {
                            alert(e?.message ?? String(e));
                          } finally {
                            setBusyId(null);
                          }
                        }}
                        className={`px-3 py-1 rounded ${free ? "bg-green-600 hover:bg-green-700" : "bg-neutral-700 cursor-not-allowed"} text-white`}
                      >
                        {busyId === v.id ? "Atanıyor..." : "Ata"}
                      </button>
                    </td>
                  </tr>
                );
              })}
              {filtered.length === 0 && (
                <tr><td colSpan={4} className="p-4 text-center text-white/60">Araç bulunamadı.</td></tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
