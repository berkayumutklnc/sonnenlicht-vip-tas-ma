"use client";

export default function CancelRequestModal({
  open,
  onClose,
  reason,
  onApprove,
  onReject,
  busy,
}: {
  open: boolean;
  onClose: () => void;
  reason: string | null | undefined;
  onApprove: () => Promise<void> | void;
  onReject: () => Promise<void> | void;
  busy?: boolean;
}) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="w-full max-w-lg rounded-lg border border-white/10 bg-neutral-900 p-4">
        <div className="flex items-center justify-between mb-2">
          <h3 className="text-lg font-semibold">İptal Talebi</h3>
          <button
            onClick={onClose}
            className="px-2 py-1 rounded bg-neutral-800 hover:bg-neutral-700"
          >
            Kapat
          </button>
        </div>

        <div className="space-y-3">
          <div className="text-sm text-white/70">Müşteri sebebi:</div>
          <div className="rounded border border-white/10 bg-neutral-800 p-3 text-white/90 min-h-[90px] whitespace-pre-wrap">
            {reason?.trim() || "(Sebep belirtilmemiş)"}
          </div>

          <div className="flex items-center justify-end gap-2 mt-3">
            <button
              disabled={!!busy}
              onClick={onReject}
              className="px-3 py-1.5 rounded bg-neutral-700 hover:bg-neutral-600 disabled:opacity-60"
            >
              Reddet
            </button>
            <button
              disabled={!!busy}
              onClick={onApprove}
              className="px-3 py-1.5 rounded bg-red-700 hover:bg-red-800 disabled:opacity-60"
            >
              İptali Onayla
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
