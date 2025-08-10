"use client";
import { I18nProvider } from "@/lib/i18n-admin";

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  return <I18nProvider>{children}</I18nProvider>;
}