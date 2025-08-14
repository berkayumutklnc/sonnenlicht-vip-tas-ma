"use client";

import React, { useMemo, useState } from "react";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useI18nPublic } from "@/lib/i18n-public";

interface Step1Props {
  formData: {
    from: string;
    to: string;
    phone: string;
    email?: string;
    date?: string; // "YYYY-MM-DD"
    time?: string; // "HH:mm"
  
    flightNo?: string;
    terminal?: string;
  };
  updateData: (patch: Partial<Step1Props["formData"]>) => void;
  nextStep: () => void;
}

/** 🔹 Öneri listesi (istediğin gibi çoğalt) */
const PLACES = [
  "Antalya Airport (AYT)",
  "Antalya City Center",
  "Lara",
  "Kundu",
  "Belek",
  "Side",
  "Manavgat",
  "Alanya",
  "Kemer",
  "Kaş",
  "Kalkan",
  "Göynük",
  "Beldibi",
  "Çıralı",
  "Olimpos",
];

const pad2 = (n: number) => (n < 10 ? `0${n}` : `${n}`);
function toDateStr(d: Date) {
  const y = d.getFullYear();
  const m = pad2(d.getMonth() + 1);
  const day = pad2(d.getDate());
  return `${y}-${m}-${day}`;
}
function toTimeStr(d: Date) {
  const h = pad2(d.getHours());
  const min = pad2(d.getMinutes());
  return `${h}:${min}`;
}

const Step1: React.FC<Step1Props> = ({ formData, updateData, nextStep }) => {
  const { t } = useI18nPublic();

  const initialDate = useMemo(() => {
    if (formData.date && formData.time) {
      const [y, m, d] = formData.date.split("-").map(Number);
      const [hh, mm] = formData.time.split(":").map(Number);
      return new Date(y, (m ?? 1) - 1, d ?? 1, hh ?? 0, mm ?? 0, 0, 0);
    }
    return null;
  }, [formData.date, formData.time]);

  const [selectedDate, setSelectedDate] = useState<Date | null>(initialDate);

  const handleChange = (field: keyof Step1Props["formData"], val: string) => {
    updateData({ [field]: val });
  };

  const handleDateChange = (d: Date | null) => {
    setSelectedDate(d);
    if (d) {
      updateData({ date: toDateStr(d), time: toTimeStr(d) });
    } else {
      updateData({ date: "", time: "" });
    }
  };

  const emailValid =
    formData.email && /^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(formData.email);

  const canNext =
    formData.from.trim().length > 0 &&
    formData.to.trim().length > 0 &&
    (formData.phone?.trim()?.length ?? 0) > 6 &&
    !!selectedDate &&
    !!emailValid;

  // 🔹 input’a yazdıkça önerileri filtrelemek istersen (opsiyonel):
  const filteredFrom = useMemo(() => {
    const q = (formData.from || "").toLowerCase();
    return q ? PLACES.filter(p => p.toLowerCase().includes(q)) : PLACES;
  }, [formData.from]);

  const filteredTo = useMemo(() => {
    const q = (formData.to || "").toLowerCase();
    return q ? PLACES.filter(p => p.toLowerCase().includes(q)) : PLACES;
  }, [formData.to]);

  return (
    <div className="space-y-6">
      {/* Başlık */}
      <div>
        <h2 className="text-xl font-semibold">{t("step1.title")}</h2>
        <p className="text-sm text-gray-400">{t("step1.subtitle")}</p>
      </div>

      {/* Nereden & Nereye */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Nereden */}
        <div>
          <label className="block mb-1 text-sm font-medium">{t("step1.from.label")}</label>
          <input
            type="text"
            list="place-list-from"                 // 🔸 datalist bağla
            value={formData.from}
            onChange={(e) => handleChange("from", e.target.value)}
            className="w-full rounded-md border border-white/15 bg-black px-3 py-2 outline-none focus:border-blue-500"
            placeholder={t("step1.from.placeholder")}
            autoComplete="off"
          />
          {/* 🔸 native öneriler */}
          <datalist id="place-list-from">
            {filteredFrom.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>

        {/* Nereye */}
        <div>
          <label className="block mb-1 text-sm font-medium">{t("step1.to.label")}</label>
          <input
            type="text"
            list="place-list-to"                   // 🔸 datalist bağla
            value={formData.to}
            onChange={(e) => handleChange("to", e.target.value)}
            className="w-full rounded-md border border-white/15 bg-black px-3 py-2 outline-none focus:border-blue-500"
            placeholder={t("step1.to.placeholder")}
            autoComplete="off"
          />
          <datalist id="place-list-to">
            {filteredTo.map((p) => (
              <option key={p} value={p} />
            ))}
          </datalist>
        </div>
      </div>

      {/* Tarih & Saat */}
      <div>
        <label className="block mb-1 text-sm font-medium">{t("step1.datetime.label")}</label>
        <DatePicker
          selected={selectedDate}
          onChange={handleDateChange}
          showTimeSelect
          timeFormat="HH:mm"
          dateFormat="dd/MM/yyyy HH:mm"
          minDate={new Date()}
          placeholderText={t("step1.datetime.placeholder")}
          className="w-full rounded-md border border-gray-600 bg-black px-3 py-2 text-white focus:border-blue-500 focus:ring focus:ring-blue-500"
          timeIntervals={15}
        />
        {formData.date && formData.time && (
          <div className="mt-2 text-xs text-white/60">
            {t("step1.selected")}{" "}
            <span className="font-mono">
              {formData.date} {formData.time}
            </span>
          </div>
        )}
      </div>

      {/* Telefon */}
      <div>
        <label className="block mb-1 text-sm font-medium">{t("step1.phone.label")}</label>
        <PhoneInput
          country={"tr"}
          value={formData.phone}
          onChange={(phone) => handleChange("phone", phone)}
          inputClass="!bg-black !text-white !w-full !h-10 !border !border-white/15 !rounded-md !px-12"
          buttonClass="!bg-neutral-800 !border !border-white/15 !rounded-l-md"
        />
      </div>

      {/* E-posta */}
      <div>
        <label className="block mb-1 text-sm font-medium">{t("step1.email.label")}</label>
        <input
          type="email"
          value={formData.email || ""}
          onChange={(e) => handleChange("email", e.target.value)}
          placeholder={t("step1.email.placeholder")}
          className="w-full rounded-md border border-white/15 bg-black px-3 py-2 outline-none focus:border-blue-500"
        />
        {formData.email && !emailValid && (
          <div className="mt-1 text-xs text-red-400">{t("step1.email.invalid")}</div>
        )}
      </div>

      {/* Devam */}
      <div className="flex items-center justify-end">
        <button
          onClick={nextStep}
          disabled={!canNext}
          className={`rounded-lg px-6 py-2 text-white font-semibold transition ${
            canNext ? "bg-blue-600 hover:bg-blue-700" : "bg-gray-600 cursor-not-allowed"
          }`}
        >
          {t("step1.next")}
        </button>
      </div>
    </div>
  );
};

export default Step1;
