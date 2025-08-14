"use client";
import { useI18nPublic } from "@/lib/i18n-public";

export default function PrivacyKVKKPage() {
  const { t } = useI18nPublic();
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 prose prose-invert">
      <h1>{t("policies.kvkk.title")}</h1>
      <p>{t("policies.kvkk.intro")}</p>
      <h2>{t("policies.kvkk.sec1.t")}</h2>
      <p>{t("policies.kvkk.sec1.p")}</p>
      <h2>{t("policies.kvkk.sec2.t")}</h2>
      <p>{t("policies.kvkk.sec2.p")}</p>
      <h2>{t("policies.kvkk.sec3.t")}</h2>
      <p>{t("policies.kvkk.sec3.p")}</p>
    </main>
  );
}
