"use client";
import { useI18nPublic } from "@/lib/i18n-public";

export default function Footer() {
  const year = new Date().getFullYear();
  const { t } = useI18nPublic();

  return (
    <footer className="mt-16 border-t border-white/10 bg-black">
      <div className="mx-auto max-w-6xl px-6 py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <div className="text-lg font-bold text-white">Antalya VIP Transfer</div>
          <p className="text-sm text-white/60 leading-relaxed">
            {t("footer.about")}
          </p>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-white">{t("footer.quick")}</div>
          <ul className="space-y-2 text-sm">
            <li><a href="/#hizmetler" className="text-white/70 hover:text-yellow-400">{t("header.links.services")}</a></li>
            <li><a href="/#filo" className="text-white/70 hover:text-yellow-400">{t("header.links.fleet")}</a></li>
            <li><a href="/#rezervasyon" className="text-white/70 hover:text-yellow-400">{t("header.cta.book")}</a></li>
            <li><a href="/rezervasyonumu-gor" className="text-white/70 hover:text-yellow-400">{t("header.links.myReservation")}</a></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-white">{t("footer.contact")}</div>
          <ul className="space-y-2 text-sm">
            <li><a href="tel:+905541790203" className="text-white/70 hover:text-yellow-400">+90 554 179 02 03</a></li>
            <li><a href="mailto:info@antalyaviptransfer.com" className="text-white/70 hover:text-yellow-400">info@antalyaviptransfer.com</a></li>
            <li><a target="_blank" href="https://wa.me/905541790203" className="text-white/70 hover:text-yellow-400">{t("header.cta.whatsapp")}</a></li>
          </ul>
        </div>

        <div>
          <div className="mb-3 text-sm font-semibold text-white">{t("footer.social")}</div>
          <div className="flex gap-3 text-sm">
            <a target="_blank" href="https://instagram.com/" className="text-white/70 hover:text-yellow-400">Instagram</a>
            <a target="_blank" href="https://facebook.com/" className="text-white/70 hover:text-yellow-400">Facebook</a>
          </div>
        </div>
      </div>

      <div className="border-t border-white/10 py-4 text-center text-xs text-white/50">
        © {year} Antalya VIP Transfer. {t("footer.rights")}
      </div>
    </footer>
  );
}
