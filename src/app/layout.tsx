import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import GA from "@/components/GA";
import { I18nPublicProvider } from "@/lib/i18n-public";

export const metadata: Metadata = {
  title: "Antalya VIP Transfer",
  description: "Yurtdışından gelen turistler için VIP transfer rezervasyon sistemi",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="tr">
      <body className="bg-black text-white min-h-screen flex flex-col [scroll-padding-top:4rem]">
        <I18nPublicProvider>
          <Header />
          <main className="flex-1 max-w-6xl mx-auto w-full p-4">{children}</main>
          <Footer />
          <WhatsAppButton />
          <GA />
        </I18nPublicProvider>
      </body>
    </html>
  );
}
