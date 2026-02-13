export type SupportedLang = "en" | "tr" | "fr" | "es";

export function normalizeLang(input?: string | null): SupportedLang {
  const v = (input || "").toLowerCase().trim();
  if (v === "tr" || v === "fr" || v === "es" || v === "en") return v;
  return "en";
}
export function getLang(): SupportedLang {
  return "en";
}
