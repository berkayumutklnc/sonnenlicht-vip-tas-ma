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

// Home hero & badges
"home.hero.title": "Antalya VIP Transfer",
"home.hero.subtitle": "Havalimanından otele, şehiriçi ve turlarda dakik ve konforlu ulaşım.",
"home.hero.cta": "Rezervasyon Yap",
"home.badge.support": "7/24 Destek",
"home.badge.supportDesc": "WhatsApp ve telefonla anında iletişim.",
"home.badge.driver": "Profesyonel Şoför",
"home.badge.driverDesc": "Deneyimli, güler yüzlü ve güvenilir.",
"home.badge.insured": "Sigortalı Yolculuk",
"home.badge.insuredDesc": "Araç ve yolcu güvenliği önceliğimiz.",
"home.badge.ontime": "Zamanında",
"home.badge.ontimeDesc": "Uçuşunuza göre takip ve zamanında karşılama.",
// Home services
"home.svc.title": "Hizmetlerimiz",
"home.svc.airport": "Havalimanı Transferi",
"home.svc.hotel": "Otel Transferi",
"home.svc.city": "Şehiriçi Transfer",
"home.svc.tour": "Özel Tur ve Gezi",
// Fleet
"home.fleet.title": "Araç Filomuz",
"home.fleet.cta": "Şimdi Rezervasyon",


// Step1 (flight info)
"step1.flightNo": "Uçuş No",
"step1.terminal": "Terminal",
// Step4 (extra fields)
"step4.baggage": "Bagaj adedi",
"step4.note": "Not",
"step4.acceptPolicy": "Rezervasyon ve iptal politikasını kabul ediyorum",
"step4.acceptKvkk": "KVKK/Aydınlatma metnini okudum, onaylıyorum",
"step4.acceptComms": "Kampanya ve bilgilendirme mesajları almak istiyorum (opsiyonel)",

    // Header
    "header.links.services": "Hizmetler",
    "header.links.fleet": "Araç Filosu",
    "header.links.myReservation": "Rezervasyonumu Gör",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Rezervasyon Yap",

    // Home (kısa)
    "home.services.title": "Hizmetlerimiz",

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

    "about.title":"Biz Kimiz?",
"about.p1":"Sonnenlicht VIP Transfer, Antalya ve çevresinde özel şoförlü transfer hizmeti sunar.",
"about.p2":"Önceliğimiz; güvenlik, dakiklik ve konfordur. Uçuş takibi yapar, misafirlerimizi zamanında karşılarız.",
"about.p3":"Kurumsal ve bireysel taleplerde, ihtiyaçlarınıza göre esnek çözümler sunarız.",
"about.contact":"İletişim",
"faq.title":"Sık Sorulan Sorular",
"faq.q1":"Fiyatlara neler dahildir?",
"faq.a1":"Özel şoför, araç, yakıt ve standart sigorta dahildir. Otopark/özel gişe ücretleri ve ekstra talepler dahil değildir.",
"faq.q2":"Bebek koltuğu sağlıyor musunuz?",
"faq.a2":"Evet, 1 adet bebek koltuğu ücretsizdir. Ek koltuk talebinizi rezervasyonda belirtin.",
"faq.q3":"Uçuşum gecikirse ne olur?",
"faq.a3":"Uçuş bilgilerini takip ederiz. Gecikmede ek ücret talep etmeyiz, uygun bekleme koşullarını uygularız.",
"faq.q4":"Ücretlendirme nasıl yapılır?",
"faq.a4":"Rota ve araç tipine göre belirlenir; onaydan önce toplam tutarı bildiririz.",
"policies.cancel.title":"İptal Politikası",
"policies.cancel.intro":"Rezervasyon iptalleri için aşağıdaki koşullar geçerlidir:",
"policies.cancel.p1":"Transfer saatinden 24 saat öncesine kadar iptaller ücretsizdir.",
"policies.cancel.p2":"24 saatten daha az sürede yapılan iptallerde ücretin %50’si yansıtılır.",
"policies.cancel.p3":"No-show durumunda ücretin tamamı tahsil edilir.",
"policies.cancel.p4":"Değişiklik taleplerini mümkün olduğunca memnuniyetle karşılarız.",
"policies.cancel.notice":"Bu metin örnek amaçlıdır; sözleşme koşullarınız farklı ise lütfen bize bildirin.",
"policies.kvkk.title":"KVKK Aydınlatma Metni",
"policies.kvkk.intro":"Kişisel verilerinizi 6698 sayılı Kanun’a uygun olarak işler ve koruruz.",
"policies.kvkk.sec1.t":"İşlenen Veri Kategorileri",
"policies.kvkk.sec1.p":"Kimlik ve iletişim bilgileri, rezervasyon/transfer detayları, fatura ve log kayıtları.",
"policies.kvkk.sec2.t":"İşleme Amaçları",
"policies.kvkk.sec2.p":"Hizmetin ifası, rezervasyon yönetimi, faturalama, yasal yükümlülükler ve müşteri ilişkileri.",
"policies.kvkk.sec3.t":"Saklama Süresi ve Haklarınız",
"policies.kvkk.sec3.p":"Veriler mevzuattaki sürelerce saklanır. KVKK kapsamındaki erişim/düzeltme/silme haklarına sahipsiniz.",
"policies.kvkk.notice":"Bu metin bilgilendirme amaçlıdır; güncel sürüm için bizimle iletişime geçin.",
"header.links.about":"Hakkımızda",
"header.links.faq":"SSS",
"header.links.contact":"İletişim",
"footer.links": "Bağlantılar",   
"nav.reservation": "Rezervasyon",    
"nav.about": "Hakkımızda",       
"nav.faq": "SSS",                
"nav.cancelPolicy": "İptal Politikası", 
"nav.privacy": "KVKK / Gizlilik",

  },

  /* ========================= ENGLISH ========================= */
  en: {

// Home hero & badges
"home.badge.support": "24/7 Support",
"home.badge.supportDesc": "Instant contact via WhatsApp & phone.",
"home.badge.driver": "Pro Drivers",
"home.badge.driverDesc": "Experienced, friendly and reliable.",
"home.badge.insured": "Insured Ride",
"home.badge.insuredDesc": "Vehicle and passenger safety first.",
"home.badge.ontime": "On Time",
"home.badge.ontimeDesc": "Flight tracking & punctual pickup.",
// Home services
"home.svc.airport": "Airport Transfer",
"home.svc.hotel": "Hotel Transfer",
"home.svc.city": "City Transfer",
"home.svc.tour": "Private Tours",
// Fleet
"home.fleet.cta": "Book Now",


// Step1 (flight info)
"step1.flightNo": "Flight No",
"step1.terminal": "Terminal",
// Step4 (extra fields)
"step4.baggage": "Baggage count",
"step4.note": "Note",
"step4.acceptPolicy": "I accept the reservation & cancellation policy",
"step4.acceptKvkk": "I have read and accept the privacy notice",
"step4.acceptComms": "I would like to receive offers and updates (optional)",

    "header.links.services": "Services",
    "header.links.fleet": "Fleet",
    "header.links.myReservation": "My Reservation",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Book Now",


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


    "about.title":"About Us",
"about.p1":"Sonnenlicht VIP Transfer provides chauffeur-driven transfers in Antalya and nearby regions.",
"about.p2":"Our priorities are safety, punctuality and comfort. We track flights and greet guests on time.",
"about.p3":"For both corporate and individual needs, we offer flexible solutions tailored to you.",
"about.contact":"Contact",
"faq.title":"Frequently Asked Questions",
"faq.q1":"What is included in the price?",
"faq.a1":"Private driver, vehicle, fuel and standard insurance are included. Parking/special tolls and extras are not included.",
"faq.q2":"Do you provide a baby seat?",
"faq.a2":"Yes, one baby seat is free. Please mention additional seats during reservation.",
"faq.q3":"What if my flight is delayed?",
"faq.a3":"We track your flight and adjust pickup without extra fees within reasonable waiting terms.",
"faq.q4":"How is pricing determined?",
"faq.a4":"Based on route and vehicle type; we share the final amount before confirmation.",
"policies.cancel.title":"Cancellation Policy",
"policies.cancel.intro":"The following rules apply to cancellations:",
"policies.cancel.p1":"Free cancellation up to 24 hours before transfer time.",
"policies.cancel.p2":"50% charge for cancellations within 24 hours.",
"policies.cancel.p3":"No-show is charged in full.",
"policies.cancel.p4":"We accommodate change requests whenever possible.",
"policies.cancel.notice":"This is a sample text; if your contract differs, please inform us.",
"policies.kvkk.title":"Privacy Notice",
"policies.kvkk.intro":"We process and protect your personal data in compliance with applicable laws.",
"policies.kvkk.sec1.t":"Data Categories",
"policies.kvkk.sec1.p":"Identity and contact info, booking/transfer details, invoicing and logs.",
"policies.kvkk.sec2.t":"Purposes of Processing",
"policies.kvkk.sec2.p":"Service delivery, booking management, billing, legal obligations and customer relations.",
"policies.kvkk.sec3.t":"Retention & Your Rights",
"policies.kvkk.sec3.p":"Data is retained for statutory periods. You may exercise access/rectification/erasure rights.",
"policies.kvkk.notice":"This text is informational; contact us for the latest version.",
"header.links.about":"About",
"header.links.faq":"FAQ",
"header.links.contact":"Contact",

"footer.links":"Links",
"nav.reservation":"Reservation",
"home.services.title":"Our Services",
"home.fleet.title":"Our Fleet",
"nav.about":"About",
"nav.faq":"FAQ",
"nav.cancelPolicy":"Cancellation Policy",
"nav.privacy":"Privacy Notice",

  },

  /* ========================= GERMAN ========================= */
  de: {

// Home hero & badges
"home.badge.support": "24/7 Support",
"home.badge.supportDesc": "Sofort per WhatsApp & Telefon erreichbar.",
"home.badge.driver": "Profi-Fahrer",
"home.badge.driverDesc": "Erfahren, freundlich, zuverlässig.",
"home.badge.insured": "Versichert",
"home.badge.insuredDesc": "Sicherheit für Fahrzeug & Passagiere.",
"home.badge.ontime": "Pünktlich",
"home.badge.ontimeDesc": "Flugverfolgung & pünktliche Abholung.",
// Home services
"home.svc.airport": "Flughafentransfer",
"home.svc.hotel": "Hoteltransfer",
"home.svc.city": "Stadttransfer",
"home.svc.tour": "Private Touren",
// Fleet
"home.fleet.cta": "Jetzt buchen",


// Step1 (Fluginfo)
"step1.flightNo": "Flugnummer",
"step1.terminal": "Terminal",
// Step4 (Zusatzfelder)
"step4.baggage": "Gepäckanzahl",
"step4.note": "Hinweis",
"step4.acceptPolicy": "Ich akzeptiere die Reservierungs- & Stornobedingungen",
"step4.acceptKvkk": "Ich habe die Datenschutzhinweise gelesen und stimme zu",
"step4.acceptComms": "Ich möchte Angebote & Updates erhalten (optional)",

    "header.links.services": "Leistungen",
    "header.links.fleet": "Fuhrpark",
    "header.links.myReservation": "Meine Buchung",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Jetzt buchen",


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

    "about.title":"Über uns",
"about.p1":"Sonnenlicht VIP Transfer bietet Chauffeur-Transfers in Antalya und Umgebung.",
"about.p2":"Priorität: Sicherheit, Pünktlichkeit und Komfort. Wir verfolgen Flüge und empfangen Gäste rechtzeitig.",
"about.p3":"Für Firmen und Privatkunden liefern wir flexible, bedarfsgerechte Lösungen.",
"about.contact":"Kontakt",
"faq.title":"Häufige Fragen",
"faq.q1":"Was ist im Preis enthalten?",
"faq.a1":"Fahrer, Fahrzeug, Kraftstoff und Standardversicherung sind inklusive. Park-/Sondergebühren und Extras nicht.",
"faq.q2":"Gibt es einen Kindersitz?",
"faq.a2":"Ja, ein Sitz ist kostenlos. Weitere bitte bei der Buchung angeben.",
"faq.q3":"Was passiert bei Flugverspätung?",
"faq.a3":"Wir verfolgen Ihren Flug und passen die Abholung innerhalb angemessener Wartezeit ohne Aufpreis an.",
"faq.q4":"Wie erfolgt die Preisbildung?",
"faq.a4":"Nach Strecke und Fahrzeugtyp; den Endpreis teilen wir vor Bestätigung mit.",
"policies.cancel.title":"Stornobedingungen",
"policies.cancel.intro":"Für Stornierungen gelten folgende Regeln:",
"policies.cancel.p1":"Kostenlose Stornierung bis 24 Stunden vor Abfahrt.",
"policies.cancel.p2":"50 % Gebühr bei Stornierung innerhalb von 24 Stunden.",
"policies.cancel.p3":"No-Show wird vollständig berechnet.",
"policies.cancel.p4":"Änderungswünsche erfüllen wir nach Möglichkeit.",
"policies.cancel.notice":"Beispieltext; teilen Sie uns abweichende Vertragsbedingungen mit.",
"policies.kvkk.title":"Datenschutzhinweis",
"policies.kvkk.intro":"Wir verarbeiten und schützen Ihre Daten gemäß geltendem Recht.",
"policies.kvkk.sec1.t":"Datenkategorien",
"policies.kvkk.sec1.p":"Identitäts-/Kontaktdaten, Buchungs-/Transferdetails, Abrechnung, Logs.",
"policies.kvkk.sec2.t":"Verarbeitungszwecke",
"policies.kvkk.sec2.p":"Leistungserbringung, Buchungsverwaltung, Abrechnung, gesetzliche Pflichten, Kundenbeziehung.",
"policies.kvkk.sec3.t":"Aufbewahrung & Rechte",
"policies.kvkk.sec3.p":"Speicherung gem. gesetzlichen Fristen. Sie haben Auskunfts-/Berichtigungs-/Löschrechte.",
"policies.kvkk.notice":"Dieser Text dient der Information; für die aktuelle Fassung kontaktieren Sie uns.",
"header.links.about":"Über uns",
"header.links.faq":"FAQ",
"header.links.contact":"Kontakt",

"footer.links":"Links",
"nav.reservation":"Buchung",
"home.services.title":"Leistungen",
"home.fleet.title":"Fuhrpark",
"nav.about":"Über uns",
"nav.faq":"FAQ",
"nav.cancelPolicy":"Stornobedingungen",
"nav.privacy":"Datenschutzhinweis",
  },

  /* ========================= RUSSIAN ========================= */
  ru: {

// Home hero & badges
"home.badge.support": "Поддержка 24/7",
"home.badge.supportDesc": "Связь по WhatsApp и телефону.",
"home.badge.driver": "Профессиональные водители",
"home.badge.driverDesc": "Опытные, отзывчивые, надёжные.",
"home.badge.insured": "Застраховано",
"home.badge.insuredDesc": "Безопасность пассажиров и авто прежде всего.",
"home.badge.ontime": "Точно вовремя",
"home.badge.ontimeDesc": "Отслеживание рейса и своевременная встреча.",
// Home services
"home.svc.airport": "Трансфер из аэропорта",
"home.svc.hotel": "Трансфер в отель",
"home.svc.city": "Городской трансфер",
"home.svc.tour": "Индивидуальные туры",
// Fleet
"home.fleet.cta": "Забронировать",


// Step1 (рейс)
"step1.flightNo": "Номер рейса",
"step1.terminal": "Терминал",
// Step4 (доп поля)
"step4.baggage": "Количество багажа",
"step4.note": "Примечание",
"step4.acceptPolicy": "Я принимаю условия бронирования и отмены",
"step4.acceptKvkk": "Я прочитал(а) и принимаю уведомление о конфиденциальности",
"step4.acceptComms": "Хочу получать предложения и новости (необязательно)",

    "header.links.services": "Услуги",
    "header.links.fleet": "Автопарк",
    "header.links.myReservation": "Моё бронирование",
    "header.cta.whatsapp": "WhatsApp",
    "header.cta.book": "Забронировать",


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

    "about.title":"О нас",
"about.p1":"Sonnenlicht VIP Transfer — частные трансферы с водителем в Анталье и регионе.",
"about.p2":"Наши приоритеты: безопасность, пунктуальность и комфорт. Отслеживаем рейсы и встречаем вовремя.",
"about.p3":"Для компаний и частных клиентов предлагаем гибкие решения под задачу.",
"about.contact":"Контакты",
"faq.title":"Частые вопросы",
"faq.q1":"Что входит в стоимость?",
"faq.a1":"Водитель, автомобиль, топливо и стандартная страховка. Парковка/платные дороги и доп. услуги — отдельно.",
"faq.q2":"Есть ли детское кресло?",
"faq.a2":"Да, одно кресло бесплатно. Доп. кресла укажите при бронировании.",
"faq.q3":"Что если рейс задерживается?",
"faq.a3":"Мы отслеживаем рейс и корректируем встречу без доплаты в разумных пределах ожидания.",
"faq.q4":"Как формируется цена?",
"faq.a4":"По маршруту и типу авто; финальную сумму сообщаем до подтверждения.",
"policies.cancel.title":"Правила отмены",
"policies.cancel.intro":"Для отмен применяются следующие условия:",
"policies.cancel.p1":"Бесплатная отмена за 24 часа до трансфера.",
"policies.cancel.p2":"50% при отмене менее чем за 24 часа.",
"policies.cancel.p3":"No-show оплачивается полностью.",
"policies.cancel.p4":"По возможности принимаем запросы на изменение.",
"policies.cancel.notice":"Это пример текста; если условия иные, сообщите нам.",
"policies.kvkk.title":"Уведомление о конфиденциальности",
"policies.kvkk.intro":"Мы обрабатываем и защищаем персональные данные по применимому законодательству.",
"policies.kvkk.sec1.t":"Категории данных",
"policies.kvkk.sec1.p":"Идентификация и контакты, детали бронирования/трансфера, счета, журналы.",
"policies.kvkk.sec2.t":"Цели обработки",
"policies.kvkk.sec2.p":"Оказание услуг, управление бронированиями, биллинг, правовые обязанности, отношения с клиентами.",
"policies.kvkk.sec3.t":"Хранение и ваши права",
"policies.kvkk.sec3.p":"Хранение в сроки, установленные законом. Права на доступ/исправление/удаление сохраняются.",
"policies.kvkk.notice":"Текст информационный; за актуальной версией свяжитесь с нами.",
"header.links.about":"О нас",
"header.links.faq":"FAQ",
"header.links.contact":"Контакты",

"footer.links":"Ссылки",
"nav.reservation":"Бронирование",
"home.services.title":"Услуги",
"home.fleet.title":"Автопарк",
"nav.about":"О нас",
"nav.faq":"FAQ",
"nav.cancelPolicy":"Правила отмены",
"nav.privacy":"Уведомление о конфиденциальности",

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