"use client";

import Wizard from "@/components/ReservationForm/Wizard";
import { VEHICLES } from "@/types/reservation";
import { useI18nPublic } from "@/lib/i18n-public";

export default function HomePage() {
  const { t } = useI18nPublic();

  const badges = [
    { title: t("home.badge.support"), desc: t("home.badge.supportDesc") },
    { title: t("home.badge.driver"),  desc: t("home.badge.driverDesc") },
    { title: t("home.badge.insured"), desc: t("home.badge.insuredDesc") },
    { title: t("home.badge.ontime"),  desc: t("home.badge.ontimeDesc") },
  ];

  const services = [
    { title: t("home.svc.airport"), img: "/images/airport.jpg" },
    { title: t("home.svc.hotel"),   img: "/images/hotel.jpg"  },
    { title: t("home.svc.city"),    img: "/images/city.jpg"   },
    { title: t("home.svc.tour"),    img: "/images/tour.jpg"   },
  ];

  return (
    <div className="flex min-h-screen flex-col bg-gray-950 text-white">
      {/* HERO */}
      <section
        className="relative flex h-[70vh] items-center justify-center bg-cover bg-center"
        style={{ backgroundImage: "url('/images/hero.jpg')" }}
      >
        <div className="absolute inset-0 bg-gradient-to-b from-black/70 via-black/40 to-black" />
        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center">
          <h1 className="text-4xl font-extrabold tracking-tight md:text-6xl">
            {t("home.hero.title")}
          </h1>
          <p className="mt-3 text-white/80 md:text-lg">
            {t("home.hero.subtitle")}
          </p>
          <a
            href="#rezervasyon"
            className="mt-6 inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
          >
            {t("home.hero.cta")}
          </a>
        </div>
      </section>

      {/* WIZARD KARTI */}
      <main id="rezervasyon" className="container mx-auto w-full max-w-5xl flex-1 px-4">
        <div className="relative -mt-16 md:-mt-20">
          <div className="rounded-2xl border border-white/10 bg-black/70 p-4 shadow-2xl backdrop-blur md:p-6">
            <Wizard />
          </div>
        </div>

        {/* GÜVEN UNSURLARI */}
        <section className="mx-auto mt-12 grid grid-cols-2 gap-4 md:grid-cols-4">
          {badges.map((b) => (
            <div key={b.title} className="rounded-xl border border-white/10 bg-black p-4">
              <div className="font-semibold">{b.title}</div>
              <div className="mt-1 text-sm text-white/60">{b.desc}</div>
            </div>
          ))}
        </section>

        {/* HİZMETLER */}
        <section id="hizmetler" className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">{t("home.services.title")}</h2>
          <div className="grid gap-6 md:grid-cols-4">
            {services.map((s) => (
              <div key={s.title} className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img src={s.img} alt={s.title} className="h-40 w-full object-cover" />
                <div className="p-4">
                  <div className="text-lg font-semibold">{s.title}</div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ARAÇ FİLOSU */}
        <section id="filo" className="mt-16">
          <h2 className="mb-6 text-2xl font-bold">{t("home.fleet.title")}</h2>
          <div className="grid gap-6 md:grid-cols-3">
            {VEHICLES.map((v: any) => (
              <div key={v.id} className="overflow-hidden rounded-2xl border border-white/10 bg-black">
                <img src={v.image} alt={v.title || v.name} className="h-48 w-full object-cover" />
                <div className="space-y-1 p-4">
                  <div className="text-lg font-semibold">{v.title || v.name}</div>
                  {v.features?.length ? (
                    <div className="text-sm text-white/60">{v.features.join(" • ")}</div>
                  ) : null}
                  {v.basePriceEur ? (
                    <div className="mt-2 font-semibold text-blue-400">
                      {t("home.fleet.from")} {v.basePriceEur} €
                    </div>
                  ) : null}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-6 text-right">
            <a
              href="#rezervasyon"
              className="inline-block rounded-xl bg-blue-600 px-6 py-3 font-semibold text-white hover:bg-blue-700"
            >
              {t("home.fleet.cta")}
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
