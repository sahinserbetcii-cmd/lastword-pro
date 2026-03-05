'use client';

import * as React from 'react';
import Link from 'next/link';
import { usePathname, useRouter, useSearchParams } from "next/navigation";
type NavItem = {
  label: string;
  href: string; // anchor or route
};
type SaaSHeaderLabels = {
  howItWorks: string;
  riskTypes: string;
  pricing: string;
  faq: string;
  unlockPro: string;
};

type SaaSHeaderProps = {
  locale?: string;
  labels?: SaaSHeaderLabels;
};


function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(' ');
}

export default function SaaSHeader({ locale, labels }: SaaSHeaderProps) {
    const paywallHref = locale ? `/paywall?lang=${locale}` : '/paywall';
    const l = labels ?? {
  howItWorks: 'How it works',
  riskTypes: 'Risk Types',
  pricing: 'Pricing',
  faq: 'FAQ',
  unlockPro: 'Unlock Pro',
};

const NAV: NavItem[] = [
  { label: l.howItWorks, href: '#how-it-works' },
  { label: l.riskTypes, href: '#risk-types' },
  { label: l.pricing, href: '#pricing' },
  { label: l.faq, href: '#faq' },
];
  const [open, setOpen] = React.useState(false);
const [activeId, setActiveId] = React.useState<string>("");
const [scrolled, setScrolled] = React.useState(false);
  React.useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false);
    };
    window.addEventListener('keydown', onKeyDown);
    return () => window.removeEventListener('keydown', onKeyDown);
  }, []);

  React.useEffect(() => {
    const onHashChange = () => setOpen(false);
    window.addEventListener('hashchange', onHashChange);
    return () => window.removeEventListener('hashchange', onHashChange);
  }, []);
  React.useEffect(() => {
  const onScroll = () => setScrolled(window.scrollY > 8);
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });
  return () => window.removeEventListener("scroll", onScroll);
}, []);
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // Locale kaynağı: önce prop, yoksa query, yoksa "en"
  const lang = locale || searchParams.get("lang") || "en";

  function scrollToSection(id: string) {
    const el = document.getElementById(id);
    if (!el) return;

    const headerOffset = 88; // gerekirse sonra ayarlarız
    const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

    window.scrollTo({ top: y, behavior: "smooth" });
  }

  function onNavClick(sectionId: string) {
    const isHome = pathname === "/";

    if (isHome) {
      history.replaceState(null, "", `/?lang=${encodeURIComponent(lang)}#${sectionId}`);
      scrollToSection(sectionId);
      return;
    }

    router.push(`/?lang=${encodeURIComponent(lang)}#${sectionId}`);
  }
  React.useEffect(() => {
  if (pathname !== "/") return;

  const ids = NAV
    .map((i) => (i.href.startsWith("#") ? i.href.slice(1) : i.href))
    .filter(Boolean);

  function computeActive() {
    const headerOffset = 88;
    const y = window.scrollY + headerOffset + 1;

    let bestId = ids[0] || "";
    let bestTop = -Infinity;

    for (const id of ids) {
      const el = document.getElementById(id);
      if (!el) continue;

      const top = el.getBoundingClientRect().top + window.scrollY;

      if (top <= y && top > bestTop) {
        bestTop = top;
        bestId = id;
      }
    }

    const nearBottom =
      window.innerHeight + window.scrollY >= document.body.scrollHeight - 8;

    if (nearBottom && ids.length) bestId = ids[ids.length - 1];

    setActiveId(bestId);
  }

  computeActive();
  window.addEventListener("scroll", computeActive, { passive: true });
  window.addEventListener("resize", computeActive);

  return () => {
    window.removeEventListener("scroll", computeActive);
    window.removeEventListener("resize", computeActive);
  };
}, [pathname]);
  return (
   <header
  className={cn(
    "sticky top-0 z-50 w-full",
    scrolled
      ? "border-b border-white/10 bg-black/40 backdrop-blur-md shadow-lg"
      : "bg-black/6"
  )}
>
      <div className="mx-auto flex h-14 max-w-6xl items-center justify-between px-4 sm:px-6">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <Link
            href="/"
            className="flex items-center gap-2 rounded-md focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label="LastWord Pro Home"
          >
            <span className="inline-flex h-8 w-8 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-sm font-semibold text-white">
              LW
            </span>
            <span className="text-sm font-semibold tracking-tight text-white">
              LastWord Pro
            </span>
          </Link>
        </div>

        {/* Desktop nav */}
        <nav className="hidden items-center gap-6 md:flex" aria-label="Primary">
         {NAV.map((item) => {
  const sectionId = item.href.startsWith("#") ? item.href.slice(1) : item.href;

  return (
    <a
      key={item.href}
      href={item.href}
      onClick={(e) => {
        e.preventDefault();
        onNavClick(sectionId);
      }}
     className={cn(
  "text-sm transition-colors",
  activeId === sectionId ? "text-white" : "text-white/70 hover:text-white"
)}
    >
     <span className="relative">
  {item.label}
  <span
    className={cn(
      "absolute -bottom-2 left-0 h-[2px] w-full rounded-full bg-white transition-opacity",
      activeId === sectionId ? "opacity-100" : "opacity-0"
    )}
  />
</span>
    </a>
  );
})}
        </nav>

        {/* Right side */}
        <div className="flex items-center gap-2">
          {/* Desktop CTA */}
          <Link
           href={locale ? `/paywall?lang=${locale}` : '/paywall'}
            className="hidden md:inline-flex h-9 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-black hover:bg-white/90 transition-colors focus:outline-none focus:ring-2 focus:ring-white/30"
          >
             {l.unlockPro}
          </Link>

          {/* Mobile menu button */}
          <button
            type="button"
            className="inline-flex h-9 w-9 items-center justify-center rounded-lg border border-white/10 bg-white/5 text-white hover:bg-white/10 transition-colors md:hidden focus:outline-none focus:ring-2 focus:ring-white/20"
            aria-label={open ? 'Close menu' : 'Open menu'}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">Menu</span>
            <div className="flex flex-col gap-1.5">
              <span className={cn('h-0.5 w-5 bg-white transition-transform', open && 'translate-y-2 rotate-45')} />
              <span className={cn('h-0.5 w-5 bg-white transition-opacity', open && 'opacity-0')} />
              <span className={cn('h-0.5 w-5 bg-white transition-transform', open && '-translate-y-2 -rotate-45')} />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile panel */}
      <div
        className={cn(
          'md:hidden border-t border-white/10 bg-black/70 backdrop-blur',
          open ? 'block' : 'hidden'
        )}
      >
        <div className="mx-auto max-w-6xl px-4 py-3 sm:px-6">
          <div className="flex flex-col gap-2">
            {NAV.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-lg px-3 py-2 text-sm text-white/80 hover:bg-white/5 hover:text-white transition-colors"
                onClick={() => setOpen(false)}
              >
                {item.label}
              </a>
            ))}
            <Link
              href={locale ? `/paywall?lang=${locale}` : '/paywall'}
              className="mt-1 inline-flex h-10 items-center justify-center rounded-lg bg-white px-4 text-sm font-semibold text-black hover:bg-white/90 transition-colors"
              onClick={() => setOpen(false)}
            >
               {l.unlockPro}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}