"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useMemo } from "react";

const locales = [
  { code: "tr", label: "🇹🇷 TR" },
  { code: "en", label: "🇬🇧 EN" },
  { code: "de", label: "🇩🇪 DE" },
  { code: "ru", label: "🇷🇺 RU" },
];

export default function LocaleSwitcher() {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const current = searchParams.get("lang") || "tr";
  const qs = useMemo(() => {
    const s = new URLSearchParams(Array.from(searchParams.entries()));
    return s;
  }, [searchParams]);

  const changeLang = (code: string) => {
    const s = new URLSearchParams(qs);
    s.set("lang", code);
    router.push(`${pathname}?${s.toString()}`);
  };

  return (
    <select
      value={current}
      onChange={(e) => changeLang(e.target.value)}
      className="rounded-md border border-white/20 bg-black/40 px-2 py-1 text-sm text-white"
      aria-label="Dil seçici"
    >
      {locales.map((loc) => (
        <option key={loc.code} value={loc.code}>
          {loc.label}
        </option>
      ))}
    </select>
  );
}
