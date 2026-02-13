import type { Locale } from "./locales";

import en from "./dictionaries/en";
import tr from "./dictionaries/tr";
import fr from "./dictionaries/fr";
import es from "./dictionaries/es";

export type Dictionary = typeof en;

export function getDictionary(locale: Locale): Dictionary {
  switch (locale) {
    case "tr":
      return tr;
    case "fr":
      return fr;
    case "es":
      return es;
    case "en":
    default:
      return en;
  }
}
