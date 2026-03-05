// app/i18n/getDictionary.ts

import type { Locale } from "./locales";
import en from "./dictionaries/en";

export type Dictionary = typeof en;

export function getDictionary(_locale: Locale): Dictionary {
  return en;
}