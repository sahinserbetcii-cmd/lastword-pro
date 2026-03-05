// app/i18n/getLang.ts

export type SupportedLang = "en";

export function normalizeLang(_input: string | null): SupportedLang {
  return "en";
}

export function getLang(): SupportedLang {
  return "en";
}

export function setLang(_lang: SupportedLang) {
  // English-only: no-op (intentionally)
  // Dil değişimini tamamen etkisiz bırakıyoruz ki UI/layout bozulmasın.
}