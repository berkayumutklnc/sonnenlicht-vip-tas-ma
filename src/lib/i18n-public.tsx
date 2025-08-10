"use client";

import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

/** Desteklenen diller */
export type Lang = "tr" | "en" | "de" | "ru";
export const LANGS: Lang[] = ["tr", "en", "de", "ru"];

/** Basit sözlük tipi */
type Dict = Record<string, string>;

/** Tüm sözlükler */
const dictionaries = {
  /* ========================= TURKISH ========================= */
  tr: {
    // Header
    "header.links.services": "Hizmetler",
    "header.links.fleet": "Araç Filosu",
    "header.links.myReservation": "Rezervasyonumu Gör",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Rezervasyon Yap",

    // Home (kısa)
    "home.hero.title": "Antalya’da VIP Transfer",
    "home.hero.subtitle": "Konforlu, güvenli ve zamanında. Havalimanından otele, şehir içi veya günlük tur.",
    "home.hero.cta": "Rezervasyona Başla",
    "home.services.title": "Hizmetlerimiz",
    "home.fleet.title": "Araç Filomuz",

    // Footer
    "footer.about": "Antalya’da profesyonel VIP transfer hizmeti. Deneyimli şoförler, sigortalı taşımacılık ve şeffaf fiyat.",
    "footer.quick": "Hızlı Bağlantılar",
    "footer.contact": "İletişim",
    "footer.social": "Sosyal",
    "footer.rights": "Tüm hakları saklıdır.",

    // Ortak / Fleet
    "fleet.seats": "{n} Koltuk",

    // Public “rezervasyonumu gör”
    "public.title": "Rezervasyonumu Gör",
    "public.search": "Sorgula",
    "public.email.placeholder": "ornek@mail.com",
    "public.code.placeholder": "TRF-12345",
    "public.loading": "Sorgulanıyor…",
    "public.error.input": "Lütfen geçerli kod ve e-posta girin.",
    "public.error.notfound": "Kayıt bulunamadı. Kod / e-posta eşleşmiyor olabilir.",
    "public.addToCalendar": "Takvimine Ekle (.ics)",
    "public.cancel.title": "İptal Talebi",
    "public.cancel.sent": "Talebin alınmış. Onay sürecinde.",
    "public.cancel.tooLate": "İptal için kalan süre 12 saatin altında.",
    "public.cancel.reason.placeholder": "İptal sebebini yazabilirsin (opsiyonel)",
    "public.cancel.submit": "İptal Talebi Gönder",

    // Step1
    "step1.title": "Nereden & Nereye • Tarih & Saat",
    "step1.subtitle": "Transfer noktalarınızı, tarih-saat ve iletişim bilgilerinizi giriniz.",
    "step1.from.label": "Nereden",
    "step1.from.placeholder": "Örn: Antalya Havalimanı (AYT)",
    "step1.to.label": "Nereye",
    "step1.to.placeholder": "Örn: Belek",
    "step1.datetime.label": "Tarih & Saat",
    "step1.datetime.placeholder": "Tarih ve saat seçin",
    "step1.selected": "Seçili:",
    "step1.phone.label": "Telefon Numarası",
    "step1.email.label": "E-posta",
    "step1.email.placeholder": "ornek@email.com",
    "step1.email.invalid": "Geçerli bir e-posta giriniz.",
    "step1.next": "İleri",

    // Step2
    "step2.title": "Kişisel Bilgiler",
    "step2.firstName": "Ad",
    "step2.lastName": "Soyad",
    "step2.minChars": "Lütfen en az 2 karakter girin.",
    "step2.back": "Geri",
    "step2.next": "İleri",

    // Step3
    "step3.title": "Araç Seçimi",
    "step3.pickDateFirst": "Lütfen önce Tarih ve Saat seçin.",
    "step3.loading": "Yükleniyor…",
    "step3.error": "Hata",
    "step3.available": "Müsait",
    "step3.unavailable": "Dolu",
    "step3.estimatedPrice": "Tahmini Fiyat: €{n}",
    "step3.adults": "Yetişkin Sayısı",
    "step3.babySeat": "Bebek Koltuğu",
    "step3.babySeat.warn": "1 bebek koltuğu ücretsizdir, fazlası için lütfen bizimle iletişime geçin.",
    "step3.back": "Geri",
    "step3.next": "Devam",

    // Step4
    "step4.title": "Özet & Onay",
    "step4.row.from": "Nereden",
    "step4.row.to": "Nereye",
    "step4.row.date": "Tarih",
    "step4.row.time": "Saat",
    "step4.row.adults": "Kişi",
    "step4.row.babySeat": "Bebek koltuğu",
    "step4.row.fullName": "Ad Soyad",
    "step4.row.phone": "Telefon",
    "step4.row.email": "E-posta",
    "step4.row.vehicle": "Araç",
    "step4.row.price": "Fiyat",
    "step4.back": "Geri",
    "step4.confirm": "Onayla",
    "step4.sending": "Gönderiliyor...",
    "step4.success.title": "Rezervasyonunuz Alındı!",
    "step4.success.code": "Kod",
    "step4.success.note": "Onaylandığında WhatsApp ile bilgilendirileceksiniz.",

    "feature.wifi": "Wi-Fi",
    "feature.usb": "USB Şarj",  
    "feature.ac": "Klima",
    "feature.water": "İkram Su",
    "feature.luggage": "Bagaj",
  },

  /* ========================= ENGLISH ========================= */
  en: {
    "header.links.services": "Services",
    "header.links.fleet": "Fleet",
    "header.links.myReservation": "My Reservation",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Book Now",

    "home.hero.title": "VIP Transfer in Antalya",
    "home.hero.subtitle": "Comfortable, safe, and on time. Airport, hotel or city rides.",
    "home.hero.cta": "Start Reservation",
    "home.services.title": "Our Services",
    "home.fleet.title": "Our Fleet",

    "footer.about": "Professional VIP transfer in Antalya. Experienced drivers, insured transport, transparent pricing.",
    "footer.quick": "Quick Links",
    "footer.contact": "Contact",
    "footer.social": "Social",
    "footer.rights": "All rights reserved.",

    "fleet.seats": "{n} Seats",

    "public.title": "View My Reservation",
    "public.search": "Search",
    "public.email.placeholder": "example@mail.com",
    "public.code.placeholder": "TRF-12345",
    "public.loading": "Searching…",
    "public.error.input": "Please enter a valid code and email.",
    "public.error.notfound": "No record found. Code/email may not match.",
    "public.addToCalendar": "Add to Calendar (.ics)",
    "public.cancel.title": "Cancel Request",
    "public.cancel.sent": "Your request was received. Pending review.",
    "public.cancel.tooLate": "Less than 12 hours remain. Cancellation not allowed.",
    "public.cancel.reason.placeholder": "You may enter a reason (optional)",
    "public.cancel.submit": "Send Cancel Request",

    "step1.title": "From & To • Date & Time",
    "step1.subtitle": "Enter your route, date-time and contact information.",
    "step1.from.label": "From",
    "step1.from.placeholder": "e.g. Antalya Airport (AYT)",
    "step1.to.label": "To",
    "step1.to.placeholder": "e.g. Belek",
    "step1.datetime.label": "Date & Time",
    "step1.datetime.placeholder": "Select date & time",
    "step1.selected": "Selected:",
    "step1.phone.label": "Phone Number",
    "step1.email.label": "Email",
    "step1.email.placeholder": "example@email.com",
    "step1.email.invalid": "Please enter a valid email.",
    "step1.next": "Next",

    "step2.title": "Personal Details",
    "step2.firstName": "First Name",
    "step2.lastName": "Last Name",
    "step2.minChars": "Please enter at least 2 characters.",
    "step2.back": "Back",
    "step2.next": "Next",

    "step3.title": "Choose Vehicle",
    "step3.pickDateFirst": "Please select Date and Time first.",
    "step3.loading": "Loading…",
    "step3.error": "Error",
    "step3.available": "Available",
    "step3.unavailable": "Busy",
    "step3.estimatedPrice": "Estimated Price: €{n}",
    "step3.adults": "Adults",
    "step3.babySeat": "Baby Seat",
    "step3.babySeat.warn": "1 baby seat is free; for more please contact us.",
    "step3.back": "Back",
    "step3.next": "Continue",

    "step4.title": "Summary & Confirm",
    "step4.row.from": "From",
    "step4.row.to": "To",
    "step4.row.date": "Date",
    "step4.row.time": "Time",
    "step4.row.adults": "Adults",
    "step4.row.babySeat": "Baby seat",
    "step4.row.fullName": "Full Name",
    "step4.row.phone": "Phone",
    "step4.row.email": "Email",
    "step4.row.vehicle": "Vehicle",
    "step4.row.price": "Price",
    "step4.back": "Back",
    "step4.confirm": "Confirm",
    "step4.sending": "Submitting...",
    "step4.success.title": "Your reservation is received!",
    "step4.success.code": "Code",
    "step4.success.note": "You’ll be notified via WhatsApp when confirmed.",

    "feature.wifi": "Wi-Fi",
    "feature.usb": "USB Charging",  
    "feature.ac": "A/C",
    "feature.water": "Water",
    "feature.luggage": "Luggage",
  },

  /* ========================= GERMAN ========================= */
  de: {
    "header.links.services": "Leistungen",
    "header.links.fleet": "Fuhrpark",
    "header.links.myReservation": "Meine Buchung",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Jetzt buchen",

    "home.hero.title": "VIP Transfer in Antalya",
    "home.hero.subtitle": "Komfortabel, sicher und pünktlich. Flughafen, Hotel oder Stadtfahrten.",
    "home.hero.cta": "Buchung starten",
    "home.services.title": "Unsere Leistungen",
    "home.fleet.title": "Unsere Flotte",

    "footer.about": "Professioneller VIP-Transfer in Antalya. Erfahrene Fahrer, versicherte Beförderung, transparente Preise.",
    "footer.quick": "Schnelle Links",
    "footer.contact": "Kontakt",
    "footer.social": "Social",
    "footer.rights": "Alle Rechte vorbehalten.",

    "fleet.seats": "{n} Sitze",

    "public.title": "Meine Buchung ansehen",
    "public.search": "Suchen",
    "public.email.placeholder": "beispiel@mail.com",
    "public.code.placeholder": "TRF-12345",
    "public.loading": "Wird gesucht…",
    "public.error.input": "Bitte gültigen Code und E-Mail eingeben.",
    "public.error.notfound": "Kein Eintrag gefunden. Code/E-Mail stimmen evtl. nicht.",
    "public.addToCalendar": "Zum Kalender (.ics)",
    "public.cancel.title": "Stornoanfrage",
    "public.cancel.sent": "Anfrage erhalten. In Bearbeitung.",
    "public.cancel.tooLate": "Weniger als 12 Stunden – Stornierung nicht möglich.",
    "public.cancel.reason.placeholder": "Grund angeben (optional)",
    "public.cancel.submit": "Stornoanfrage senden",

    "step1.title": "Von & Nach • Datum & Uhrzeit",
    "step1.subtitle": "Route, Datum/Uhrzeit und Kontaktdaten eingeben.",
    "step1.from.label": "Von",
    "step1.from.placeholder": "z. B. Flughafen Antalya (AYT)",
    "step1.to.label": "Nach",
    "step1.to.placeholder": "z. B. Belek",
    "step1.datetime.label": "Datum & Uhrzeit",
    "step1.datetime.placeholder": "Datum und Uhrzeit wählen",
    "step1.selected": "Ausgewählt:",
    "step1.phone.label": "Telefonnummer",
    "step1.email.label": "E-Mail",
    "step1.email.placeholder": "beispiel@email.com",
    "step1.email.invalid": "Bitte eine gültige E-Mail eingeben.",
    "step1.next": "Weiter",

    "step2.title": "Persönliche Daten",
    "step2.firstName": "Vorname",
    "step2.lastName": "Nachname",
    "step2.minChars": "Bitte mindestens 2 Zeichen eingeben.",
    "step2.back": "Zurück",
    "step2.next": "Weiter",

    "step3.title": "Fahrzeug wählen",
    "step3.pickDateFirst": "Bitte zuerst Datum und Uhrzeit wählen.",
    "step3.loading": "Wird geladen…",
    "step3.error": "Fehler",
    "step3.available": "Frei",
    "step3.unavailable": "Belegt",
    "step3.estimatedPrice": "Voraussichtlicher Preis: €{n}",
    "step3.adults": "Erwachsene",
    "step3.babySeat": "Kindersitz",
    "step3.babySeat.warn": "1 Kindersitz ist gratis; für weitere bitte Kontakt aufnehmen.",
    "step3.back": "Zurück",
    "step3.next": "Weiter",

    "step4.title": "Zusammenfassung & Bestätigung",
    "step4.row.from": "Von",
    "step4.row.to": "Nach",
    "step4.row.date": "Datum",
    "step4.row.time": "Uhrzeit",
    "step4.row.adults": "Personen",
    "step4.row.babySeat": "Kindersitz",
    "step4.row.fullName": "Name",
    "step4.row.phone": "Telefon",
    "step4.row.email": "E-Mail",
    "step4.row.vehicle": "Fahrzeug",
    "step4.row.price": "Preis",
    "step4.back": "Zurück",
    "step4.confirm": "Bestätigen",
    "step4.sending": "Wird gesendet...",
    "step4.success.title": "Ihre Buchung ist eingegangen!",
    "step4.success.code": "Code",
    "step4.success.note": "Sie werden per WhatsApp informiert, sobald bestätigt.",

    "feature.wifi": "WLAN",
    "feature.usb": "USB-Laden",
    "feature.ac": "Klimaanlage",
    "feature.water": "Wasser",
    "feature.luggage": "Gepäck",
  },

  /* ========================= RUSSIAN ========================= */
  ru: {
    "header.links.services": "Услуги",
    "header.links.fleet": "Автопарк",
    "header.links.myReservation": "Моё бронирование",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Забронировать",

    "home.hero.title": "VIP-трансфер в Анталье",
    "home.hero.subtitle": "Комфортно, безопасно и вовремя. Аэропорт, отель или поездки по городу.",
    "home.hero.cta": "Начать бронирование",
    "home.services.title": "Наши услуги",
    "home.fleet.title": "Наш автопарк",

    "footer.about": "Профессиональный VIP-трансфер в Анталье. Опытные водители, страхование и прозрачные цены.",
    "footer.quick": "Быстрые ссылки",
    "footer.contact": "Контакты",
    "footer.social": "Соцсети",
    "footer.rights": "Все права защищены.",

    "fleet.seats": "{n} мест",

    "public.title": "Моё бронирование",
    "public.search": "Искать",
    "public.email.placeholder": "example@mail.com",
    "public.code.placeholder": "TRF-12345",
    "public.loading": "Поиск…",
    "public.error.input": "Введите корректные код и email.",
    "public.error.notfound": "Запись не найдена. Код/email могут не совпадать.",
    "public.addToCalendar": "В календарь (.ics)",
    "public.cancel.title": "Запрос отмены",
    "public.cancel.sent": "Запрос получен. На рассмотрении.",
    "public.cancel.tooLate": "Осталось менее 12 часов. Отмена невозможна.",
    "public.cancel.reason.placeholder": "Укажите причину (необязательно)",
    "public.cancel.submit": "Отправить запрос",

    "step1.title": "Откуда & Куда • Дата и время",
    "step1.subtitle": "Укажите маршрут, дату/время и контакты.",
    "step1.from.label": "Откуда",
    "step1.from.placeholder": "напр.: Аэропорт Антальи (AYT)",
    "step1.to.label": "Куда",
    "step1.to.placeholder": "напр.: Белек",
    "step1.datetime.label": "Дата и время",
    "step1.datetime.placeholder": "Выберите дату и время",
    "step1.selected": "Выбрано:",
    "step1.phone.label": "Телефон",
    "step1.email.label": "Эл. почта",
    "step1.email.placeholder": "example@email.com",
    "step1.email.invalid": "Введите корректный e-mail.",
    "step1.next": "Далее",

    "step2.title": "Личные данные",
    "step2.firstName": "Имя",
    "step2.lastName": "Фамилия",
    "step2.minChars": "Введите не менее 2 символов.",
    "step2.back": "Назад",
    "step2.next": "Далее",

    "step3.title": "Выбор автомобиля",
    "step3.pickDateFirst": "Сначала выберите дату и время.",
    "step3.loading": "Загрузка…",
    "step3.error": "Ошибка",
    "step3.available": "Доступно",
    "step3.unavailable": "Занято",
    "step3.estimatedPrice": "Ориентировочная цена: €{n}",
    "step3.adults": "Взрослые",
    "step3.babySeat": "Детское кресло",
    "step3.babySeat.warn": "1 кресло бесплатно; для большего количества свяжитесь с нами.",
    "step3.back": "Назад",
    "step3.next": "Далее",

    "step4.title": "Итог & Подтверждение",
    "step4.row.from": "Откуда",
    "step4.row.to": "Куда",
    "step4.row.date": "Дата",
    "step4.row.time": "Время",
    "step4.row.adults": "Пассажиров",
    "step4.row.babySeat": "Детское кресло",
    "step4.row.fullName": "ФИО",
    "step4.row.phone": "Телефон",
    "step4.row.email": "Почта",
    "step4.row.vehicle": "Авто",
    "step4.row.price": "Цена",
    "step4.back": "Назад",
    "step4.confirm": "Подтвердить",
    "step4.sending": "Отправка...",
    "step4.success.title": "Бронирование получено!",
    "step4.success.code": "Код",
    "step4.success.note": "Мы уведомим вас в WhatsApp после подтверждения.",

    "feature.wifi": "Wi-Fi",
    "feature.usb": "USB зарядка",
    "feature.ac": "Кондиционер",
    "feature.water": "Вода",
    "feature.luggage": "Багаж",
  },
} satisfies Record<Lang, Record<string, string>>;

/* -------------------------- Context & Provider -------------------------- */

const I18nContext = createContext<{
  lang: Lang;
  setLang: (l: Lang) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
} | null>(null);

/** URL ?lang=..., cookie ve localStorage üçlüsü ile dili yönetir. */
export function I18nPublicProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("tr");

  // İlk yüklemede dil algısı
  useEffect(() => {
    try {
      const url = new URL(window.location.href);
      const q = url.searchParams.get("lang") as Lang | null;
      const saved =
        (localStorage.getItem("lang_public") ||
          document.cookie.match(/(?:^|; )lang_public=([^;]+)/)?.[1]) as Lang | null;

      const next = (q && LANGS.includes(q) ? q : saved) ?? "tr";
      setLang(next);
    } catch {
      // noop
    }
  }, []);

  // Persist et
  useEffect(() => {
    try {
      localStorage.setItem("lang_public", lang);
      document.cookie = `lang_public=${lang}; path=/; max-age=31536000`;
    } catch {
      // noop
    }
  }, [lang]);

const t = useMemo(() => {
  const format = (msg: string, vars?: Record<string, string | number>) =>
    vars ? msg.replace(/\{(\w+)\}/g, (_, k) => String(vars[k] ?? `{${k}}`)) : msg;

  return (key: string, vars?: Record<string, string | number>) => {
    const d: Record<string, string> = dictionaries[lang] ?? dictionaries.tr;
    return format(d[key] ?? key, vars);
  };
}, [lang]);

  const value = useMemo(() => ({ lang, setLang, t }), [lang, t]);
  return <I18nContext.Provider value={value}>{children}</I18nContext.Provider>;
}

/** Hook */
export function useI18nPublic() {
  const ctx = useContext(I18nContext);
  if (!ctx) throw new Error("useI18nPublic must be used inside I18nPublicProvider");
  return ctx;
}
