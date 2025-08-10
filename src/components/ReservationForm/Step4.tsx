"use client";

import React, { useState } from "react";
import { createReservation } from "@/lib/reservations";
import { getPrice } from "@/lib/pricing";
import type { VehicleType } from "@/types";
import { makeReservationIcs, downloadIcs } from "@/utils/ics";
import { useI18nPublic } from "@/lib/i18n-public";

type ReservationFormDataStep4 = {
  lang: "de" | "en" | "tr" | "ru";
  from: string;
  to: string;
  date?: string;
  time?: string;
  adults: number;
  babySeat: number;
  firstName: string;
  lastName: string;
  phone: string;
  email: string;
  vehicleType?: VehicleType;
  price?: number | null;
};

type Step4Props = {
  formData: ReservationFormDataStep4;
  prevStep: () => void;
  onSubmit?: () => Promise<void> | void;
  submitted?: boolean;
  pnr?: string | null;
  rid?: string | null;
};

export default function Step4({
  formData,
  prevStep,
  onSubmit,
  submitted,
  pnr,
  rid,
}: Step4Props) {
  const { t } = useI18nPublic();
  const [loading, setLoading] = useState(false);
  const [err, setErr] = useState<string | null>(null);
  const [ok, setOk] = useState<boolean>(Boolean(submitted));

  const autoPrice =
    formData.from && formData.to && formData.vehicleType
      ? getPrice(formData.from, formData.to, formData.vehicleType)
      : null;

  const missing =
    !formData.from || !formData.to || !formData.date || !formData.time ||
    !formData.firstName || !formData.lastName || !formData.phone || !formData.email;

  const babySeatWarning = Number(formData.babySeat) > 1;

  async function handleConfirm() {
    if (loading) return;

    if (onSubmit) {
      try {
        setErr(null);
        setLoading(true);
        await onSubmit();
        setOk(true);
      } catch (e: any) {
        setErr(e?.message ?? String(e));
      } finally {
        setLoading(false);
      }
      return;
    }

    try {
      setErr(null);
      setLoading(true);

      if (!formData.date || !formData.time) throw new Error(t("step1.datetime.placeholder"));
      const [y, m, d] = formData.date.split("-").map(Number);
      const [H, M] = formData.time.split(":").map(Number);
      const startAt = Date.UTC(y, m - 1, d, H, M);

      await createReservation({
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        startAt,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        lang: formData.lang,
        adults: Number.isFinite(Number(formData.adults)) ? Number(formData.adults) : 1,
        babySeat: Number.isFinite(Number(formData.babySeat)) ? Number(formData.babySeat) : 0,
        vehicleType: formData.vehicleType ?? undefined,
        price:
          formData.price === null || formData.price === undefined
            ? autoPrice ?? undefined
            : Number.isFinite(Number(formData.price))
            ? Number(formData.price)
            : undefined,
      } as any);

      setOk(true);
    } catch (e: any) {
      setErr(e?.message ?? String(e));
    } finally {
      setLoading(false);
    }
  }

  if (ok) {
    return (
      <div className="p-6 text-center space-y-4">
        <h1 className="text-2xl font-bold text-green-500">{t("step4.success.title")}</h1>
        {rid && <div className="text-white/70">{t("step4.success.code")}: <span className="font-semibold">{rid}</span></div>}
        <p className="text-white/60">{t("step4.success.note")}</p>
        {(submitted && (pnr || rid)) && (
          <div className="mt-4">
            <button
              type="button"
              className="px-4 py-2 rounded bg-blue-600 text-white hover:bg-blue-700"
              onClick={() => {
                try {
                  const code = pnr || rid || "";
                  const [y, m, d] = (formData.date || "").split("-").map(Number);
                  const [H, M] = (formData.time || "00:00").split(":").map(Number);
                  const startAt = Date.UTC(y, (m || 1) - 1, d || 1, H || 0, M || 0);
                  const res = {
                    id: rid || "",
                    code,
                    from: formData.from,
                    to: formData.to,
                    date: formData.date,
                    time: formData.time,
                    fullName: `${formData.firstName} ${formData.lastName}`.trim(),
                    phone: formData.phone,
                    email: formData.email,
                    startAt,
                    status: "pending",
                    createdAt: Date.now(),
                    adults: formData.adults,
                    babySeat: formData.babySeat,
                    vehicleType: formData.vehicleType || undefined,
                  } as any;
                  const ics = makeReservationIcs(res);
                  downloadIcs(`${code || "reservation"}.ics`, ics);
                } catch (e) {
                  console.error(e);
                  alert("ICS dosyası oluşturulurken hata oluştu.");
                }
              }}
            >
              {t("public.addToCalendar")}
            </button>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-xl font-semibold">{t("step4.title")}</h2>

      {err && <div className="rounded-md border border-red-600/40 bg-red-900/20 p-3 text-red-200">{err}</div>}
      {babySeatWarning && (
        <div className="rounded-md border border-yellow-600/40 bg-yellow-900/20 p-3 text-yellow-200">
          {t("step3.babySeat.warn")}
        </div>
      )}

      <div className="space-y-2 border border-white/10 rounded-md p-4">
        <Row label={t("step4.row.from")} value={formData.from} />
        <Row label={t("step4.row.to")} value={formData.to} />
        <Row label={t("step4.row.date")} value={formData.date ?? "—"} />
        <Row label={t("step4.row.time")} value={formData.time ?? "—"} />
        <Row label={t("step4.row.adults")} value={formData.adults} />
        <Row label={t("step4.row.babySeat")} value={formData.babySeat} />
        <Row label={t("step4.row.fullName")} value={`${formData.firstName} ${formData.lastName}`.trim()} />
        <Row label={t("step4.row.phone")} value={formData.phone} />
        <Row label={t("step4.row.email")} value={formData.email} />
        <Row label={t("step4.row.vehicle")} value={formData.vehicleType ?? "—"} />
        <Row
          label={t("step4.row.price")}
          value={
            formData.price ? `€${formData.price}` : autoPrice ? `€${autoPrice}` : "—"
          }
        />
      </div>

      <div className="flex items-center justify-between">
        <button onClick={prevStep} type="button" className="px-4 py-2 rounded bg-neutral-700 hover:bg-neutral-600">
          {t("step4.back")}
        </button>
        <button
          onClick={handleConfirm}
          disabled={loading || missing}
          className={`px-4 py-2 rounded ${
            loading || missing ? "bg-neutral-700 cursor-not-allowed" : "bg-green-600 hover:bg-green-700"
          }`}
        >
          {loading ? t("step4.sending") : t("step4.confirm")}
        </button>
      </div>
    </div>
  );
}

function Row({ label, value }: { label: string; value: any }) {
  return (
    <div className="flex justify-between border-b border-white/10 pb-2">
      <span className="text-white/60">{label}:</span>
      <span className="font-semibold">{String(value ?? "—")}</span>
    </div>
  );
}
