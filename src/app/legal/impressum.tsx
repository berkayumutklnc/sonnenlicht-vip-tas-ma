import { getLocaleFromCookie, getLocaleDict } from "@/lib/i18n";

export default async function Page() {
  const locale = await getLocaleFromCookie();
  const dict = getLocaleDict(locale);
  return (
    <main className="max-w-2xl mx-auto py-8 px-4">
      <h1 className="text-2xl font-bold mb-4">{dict.legal_impressum_title}</h1>
      <div className="prose prose-invert">
        {dict.legal_impressum_content}
      </div>
    </main>
  );
}
