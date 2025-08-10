"use client";

import { useEffect, useState } from "react";
import Step1 from "./Step1";
import Step2 from "./Step2";
import Step3 from "./Step3";
import Step4 from "./Step4";
import { useI18nPublic } from "@/lib/i18n-public";
import { createReservation } from "@/lib/reservations";
import type { VehicleType } from "@/types";

type FormShape = {
  lang: "de" | "en" | "tr" | "ru";
  from: string;
  to: string;
  date: string;  // "YYYY-MM-DD"
  time: string;  // "HH:mm"
  adults: number;
  babySeat: number;
  firstName: string;
  lastName: string;
  phone: string; // +905xxxxxxxxx
  email: string;
  vehicleType?: VehicleType; // "vip-6" | "vip-10"
  price?: number | null;
};

const makeInitial = (lang: FormShape["lang"]): FormShape => ({
  lang,
  from: "",
  to: "",
  date: "",
  time: "",
  adults: 1,
  babySeat: 0,
  firstName: "",
  lastName: "",
  phone: "",
  email: "",
  vehicleType: undefined,
  price: undefined,
});

export default function Wizard() {
  const { lang } = useI18nPublic();

  const [step, setStep] = useState(1);
  const [formData, setFormDataState] = useState<FormShape>(makeInitial(lang));

  // createReservation sonrası Step4’ün başarı ekranı için:
  const [rid, setRid] = useState<string | null>(null);
  const [pnr, setPnr] = useState<string | null>(null);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  // Dil değişince form.lang’i güncelle
  useEffect(() => {
    setFormDataState((prev) => ({ ...prev, lang }));
  }, [lang]);

  const setFormData = (patch: Partial<FormShape>) =>
    setFormDataState((prev) => ({ ...prev, ...patch }));

  const nextStep = () => setStep((s) => Math.min(4, s + 1));
  const prevStep = () => setStep((s) => Math.max(1, s - 1));

  // Step4 -> onSubmit
  const submit = async () => {
    if (submitting) return;
    setSubmitting(true);
    try {
      // Zamanı UTC ms
      const [y, m, d] = formData.date.split("-").map(Number);
      const [H, M] = formData.time.split(":").map(Number);
      const startAt = Date.UTC(y, m - 1, d, H, M);

      // Merkez tek yer: lib/reservations.createReservation
      const res = await createReservation({
        from: formData.from,
        to: formData.to,
        date: formData.date,
        time: formData.time,
        startAt,
        fullName: `${formData.firstName} ${formData.lastName}`.trim(),
        phone: formData.phone,
        email: formData.email,
        lang: formData.lang,
        adults: formData.adults,
        babySeat: formData.babySeat,
        vehicleType: formData.vehicleType,
        price: formData.price ?? null,
      });

      // Step4’ün başarı ekranında .ics butonunu göstermek için:
      setRid(res.id);
      setPnr(res.code ?? res.id);
      setSubmitted(true);

      // en üste kaydır
      window?.scrollTo?.({ top: 0, behavior: "smooth" });
    } catch (e: any) {
      console.error(e);
      alert("Rezervasyon oluşturulurken bir hata oluştu. Lütfen tekrar deneyin.");
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="mx-auto max-w-3xl">
      {/* Adım göstergesi */}
      {step <= 4 && !submitted && (
        <div className="mb-6 flex items-center gap-2 text-sm text-neutral-300">
          {[1, 2, 3, 4].map((n) => (
            <span
              key={n}
              className={`px-3 py-1 rounded-full border ${
                step === n ? "bg-blue-600 border-blue-600 text-white" : "border-white/15"
              }`}
            >
              {n}
            </span>
          ))}
        </div>
      )}

      {/* Adımlar: Success ekranını Step4 yönetir. */}
      {step === 1 ? (
        <Step1 formData={formData} updateData={setFormData} nextStep={nextStep} />
      ) : step === 2 ? (
        <Step2
          formData={formData}
          updateData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ) : step === 3 ? (
        <Step3
          formData={formData}
          updateData={setFormData}
          nextStep={nextStep}
          prevStep={prevStep}
        />
      ) : (
        <Step4
          formData={formData}
          prevStep={prevStep}
          onSubmit={submit}
          submitted={submitted}
          pnr={pnr}
          rid={rid}
        />
      )}
    </div>
  );
}
