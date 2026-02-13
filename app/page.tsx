import { getLang } from "./i18n/getLang";
import { getDictionary } from "./i18n/getDictionary";


export default function HomePage() {
  const locale = getLang();
const dict = getDictionary(locale);


  return (
    <main className="mx-auto max-w-md p-6 space-y-5">
      <div className="rounded-2xl border p-6 space-y-3">
        <div className="text-xs tracking-wide uppercase opacity-70">
          {dict.home.brand}

        </div>

        <h1 className="text-2xl font-semibold">
          {dict.home.title}

        </h1>

        <p className="text-sm opacity-80">
         {dict.home.subtitle}

        </p>

       <div className="pt-2 space-y-2">
  <a
    href="/analyze"
    className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold"
  >
    {dict.home.analyzeCta}

  </a>

  <div className="flex items-center gap-3">
    <a
      href={`/paywall?lang=${locale}`}

      className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm font-semibold hover:bg-white/10"
    >
     {dict.home.unlockCta}

    </a>

    <span className="text-xs opacity-70">
      {dict.home.priceNote}

    </span>
  </div>
</div>

      </div>

      <div className="rounded-2xl border p-5 text-sm space-y-1">
        <div className="font-medium">Privacy-first</div>
        <div className="opacity-80">
          {dict.home.privacyNote}

        </div>
      </div>
    </main>
  );
}
