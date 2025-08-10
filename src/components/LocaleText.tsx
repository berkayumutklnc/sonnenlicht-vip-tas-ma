"use client";
import { useSearchParams } from "next/navigation";
import { resolveLang, t } from "@/i18n";

export default function LocaleText({ k }: { k: string }) {
  const sp = useSearchParams();
  const lang = resolveLang(sp);
  return <>{t(k, lang)}</>;
}