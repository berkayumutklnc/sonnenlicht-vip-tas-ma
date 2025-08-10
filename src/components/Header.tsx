"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import LanguageSwitchPublic from "@/components/public/LanguageSwitchPublic";
import { useI18nPublic } from "@/lib/i18n-public";

export default function Header() {
  const [open, setOpen] = useState(false);
  const { t } = useI18nPublic();

  const Nav = ({ onClick }: { onClick?: () => void }) => (
    <nav className="flex flex-col gap-3 md:flex-row md:items-center md:gap-6">
      <Link href="/#hizmetler" onClick={onClick} className="text-white/70 hover:text-white">
        {t("header.links.services")}
      </Link>
      <Link href="/#filo" onClick={onClick} className="text-white/70 hover:text-white">
        {t("header.links.fleet")}
      </Link>
      <Link href="/rezervasyonumu-gor" onClick={onClick} className="text-white/70 hover:text-white">
        {t("header.links.myReservation")}
      </Link>
      <a href="tel:+905541790203" onClick={onClick} className="text-white/70 hover:text-white">
        +90 554 179 02 03
      </a>
      <a
        href="https://wa.me/905541790203"
        target="_blank"
        className="inline-flex items-center justify-center rounded-lg bg-green-600 px-4 py-2 font-semibold text-white md:hidden"
        onClick={onClick}
      >
        {t("header.cta.whatsapp")}
      </a>
      <LanguageSwitchPublic />
    </nav>
  );

  return (
    <header className="sticky top-0 z-40 w-full border-b border-white/10 bg-black/70 backdrop-blur">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <Image src="/logo.svg" alt="Antalya VIP Transfer" width={28} height={28} />
          <span className="font-bold tracking-tight">Antalya VIP Transfer</span>
        </Link>

      {/* Desktop */}
        <div className="hidden items-center gap-6 md:flex">
          <Nav />
          <Link
            href="/#rezervasyon"
            className="inline-flex items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white hover:bg-blue-700"
          >
            {t("header.cta.book")}
          </Link>
        </div>

        {/* Mobile toggle */}
        <button
          className="inline-flex h-9 w-9 items-center justify-center rounded border border-white/15 md:hidden"
          onClick={() => setOpen((s) => !s)}
          aria-label="Menu"
        >
          ☰
        </button>
      </div>

      {/* Mobile drawer */}
      {open && (
        <div className="border-t border-white/10 bg-black px-4 pb-4 md:hidden">
          <div className="py-3">
            <Nav onClick={() => setOpen(false)} />
          </div>
          <Link
            href="/#rezervasyon"
            onClick={() => setOpen(false)}
            className="mt-2 inline-flex w-full items-center justify-center rounded-lg bg-blue-600 px-4 py-2 font-semibold text-white"
          >
            {t("header.cta.book")}
          </Link>
        </div>
      )}
    </header>
  );
}
