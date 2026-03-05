"use client";

import { useEffect } from "react";

function scrollToSection(id: string) {
  const el = document.getElementById(id);
  if (!el) return;

  const headerOffset = 88; // header yüksekliği
  const y = el.getBoundingClientRect().top + window.scrollY - headerOffset;

  window.scrollTo({ top: y, behavior: "smooth" });
}

export default function HashScroll() {
  useEffect(() => {
    const hash = window.location.hash?.replace("#", "");
    if (!hash) return;

    // DOM yerleşsin diye küçük gecikme
    const t = window.setTimeout(() => scrollToSection(hash), 50);
    return () => window.clearTimeout(t);
  }, []);

  return null;
}