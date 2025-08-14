"use client";
import { useI18nPublic } from "@/lib/i18n-public";

export default function CancellationPolicyPage() {
  const { t } = useI18nPublic();
  const items = ["p1","p2","p3","p4"].map((k) => t(`policies.cancel.${k}`));
  return (
    <main className="mx-auto max-w-4xl px-4 py-12 prose prose-invert">
      <h1>{t("policies.cancel.title")}</h1>
      <p>{t("policies.cancel.intro")}</p>
      <ul>{items.map((s, i) => <li key={i}>{s}</li>)}</ul>
    </main>
  );
}
