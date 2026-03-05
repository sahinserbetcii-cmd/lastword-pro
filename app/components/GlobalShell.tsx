"use client";

import * as React from "react";
import SaaSHeader from "./SaaSHeader";
import { getLang } from "../i18n/getLang";
import { getDictionary } from "../i18n/getDictionary";

export default function GlobalShell({ children }: { children: React.ReactNode }) {
  const [locale, setLocale] = React.useState<ReturnType<typeof getLang>>("en");

  React.useEffect(() => {
    setLocale(getLang());
  }, []);

  const dict = getDictionary(locale);

  return (
    <>
      <SaaSHeader
        locale={locale}
        labels={{
          howItWorks: dict.home.navHowItWorks,
          riskTypes: dict.home.navRiskTypes,
          pricing: dict.home.navPricing,
          faq: dict.home.navFaq,
          unlockPro: dict.home.navUnlockPro,
        }}
      />
      {children}
    </>
  );
}