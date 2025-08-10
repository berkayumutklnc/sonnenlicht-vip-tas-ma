import { cookies } from "next/headers";
import tr from "@/locales/tr.json";
import en from "@/locales/en.json";
import de from "@/locales/de.json";
import ru from "@/locales/ru.json";

const dict = { tr, en, de, ru };

export function getLocaleDict(locale: string) {
  return dict[locale as keyof typeof dict] || dict["de"];
}

export async function getLocaleFromCookie() {
  const cookieStore = await cookies();
  if (!cookieStore || typeof cookieStore.get !== "function") return "de";
  const cookie = cookieStore.get("locale");
  return cookie?.value || "de";
}
