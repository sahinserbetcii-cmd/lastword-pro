"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import React, { Suspense } from "react";
import { paywallCopy } from "../i18n/paywall";
import { normalizeLang } from "../i18n/getLang";
import { setLang } from "../i18n/getLang";
export default function PaywallPage() {
  return (
    <Suspense fallback={null}>
      <PaywallContent />
    </Suspense>
  );
}

function PaywallContent() {
  const router = useRouter();
  const searchParams = useSearchParams();

  const lang = normalizeLang(searchParams.get("lang"));
  const copy = paywallCopy[lang];
React.useEffect(() => {
  const premium = localStorage.getItem("lastword:premium") === "true";

  if (premium) {
    router.replace("/analyze");
  }
}, [router]);
 function handleUnlock() {
  const paddle = (window as any).Paddle;

  if (!paddle) {
    alert("Payment system loading...");
    return;
  }

  paddle.Initialize({
    token: process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN,
    checkout: {
      settings: {
        displayMode: "overlay",
        locale: "en",
      },
    },
  });

  paddle.Checkout.open({
    items: [
      {
        priceId: "pri_01kkdshbt95vmw77sremdb83d3",
        quantity: 1,
      },
    ],
    settings: {
      displayMode: "overlay",
      locale: "en",
      successUrl: `${window.location.origin}/success`,
    },
  });
}

  function handleRestore() {
    // şimdilik aynı davranış (gerçek restore StoreKit/RevenueCat ile gelecek)
    handleUnlock();
  }
function handleContinueFree() {
  // Free mod
  localStorage.removeItem("lastword:premium");
  window.dispatchEvent(new Event("lastword_premium_changed"));

  localStorage.setItem(
  "lastword:toast",
  JSON.stringify({ type: "info", text: "Free mode: you’ll see 1 Final Message only. Upgrade to Pro to unlock Risks, Responses, and additional Final Messages." })
);

  router.push("/analyze");
}
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "stretch",
        justifyContent: "flex-start",
        padding: 16,
      }}
    >
      <section
        style={{
          width: "100%",
          maxWidth: 1200,
          borderRadius: 12,
          border: "1px solid rgba(255,255,255,0.10)",
          background:
            "radial-gradient(1200px 500px at 20% -10%, rgba(255,255,255,0.10), transparent 60%), rgba(255,255,255,0.03)",
          boxShadow: "0 10px 30px rgba(0,0,0,0.35)",
          overflow: "hidden",
        }}
      >
        <div className="grid gap-6 md:grid-cols-[1.2fr_0.8fr]">
          {/* Left: Copy */}
          <div style={{ padding: 28 }}>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                gap: 12,
                alignItems: "stretch",
              }}
            >
              <div>
                <h1
                  style={{
                    fontSize: 34,
                    fontWeight: 800,
                    margin: 0,
                    letterSpacing: -0.4,
                  }}
                >
                  {copy.title}
                </h1>
                <p
                  style={{
                    marginTop: 10,
                    fontSize: 16,
                    opacity: 0.88,
                    lineHeight: 1.6,
                  }}
                >
                  {copy.subtitle}
                </p>
              </div>

              <div
                style={{
                  fontSize: 13,
                  opacity: 0.85,
                  textAlign: "right",
                  whiteSpace: "nowrap",
                }}
              >
                <div style={{ marginBottom: 6, opacity: 0.8 }}>
                  {copy.labelLanguage}
                </div>
                <Link href="/paywall?lang=en" onClick={() => setLang("en")}>EN</Link>{" "}
{/*
<Link href="/paywall?lang=tr" onClick={() => setLang("tr")}>TR</Link>{" "}
<Link href="/paywall?lang=fr" onClick={() => setLang("fr")}>FR</Link>{" "}
<Link href="/paywall?lang=es" onClick={() => setLang("es")}>ES</Link>
*/}
              </div>
            </div>

            <div
              style={{
                marginTop: 18,
                padding: 16,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(0,0,0,0.20)",
              }}
            >
              <div
                style={{
                  fontSize: 12,
                  letterSpacing: 1.2,
                  opacity: 0.75,
                  marginBottom: 10,
                }}
              >
                {copy.labelProIncludes}
              </div>

              <ul
                style={{
                  margin: 0,
                  paddingLeft: 18,
                  lineHeight: 1.8,
                  opacity: 0.92,
                }}
              >
                {copy.bullets.map((b: string) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </div>

            <div style={{ marginTop: 16, fontSize: 12, opacity: 0.72, lineHeight: 1.5 }}>
              {copy.disclaimer}
            </div>
          </div>

          {/* Right: Actions */}
          <div
            className="flex flex-col justify-center gap-3 md:border-l md:border-white/10"
            style={{
              padding: 28,
              background: "rgba(0,0,0,0.18)",
            }}
          >
            <div
              style={{
                padding: 16,
                borderRadius: 18,
                border: "1px solid rgba(255,255,255,0.10)",
                background: "rgba(255,255,255,0.04)",
              }}
            >
              <div style={{ fontSize: 12, opacity: 0.75, marginBottom: 6 }}>
                {copy.labelOneTime}
              </div>
              <div style={{ fontSize: 22, fontWeight: 800, letterSpacing: -0.2 }}>
                $9.99
              </div>
              <div style={{ marginTop: 6, fontSize: 13, opacity: 0.78 }}>
                {copy.note}
              </div>
            </div>

            <button
              type="button"
              onClick={handleUnlock}
              style={{
                padding: "14px 14px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.16)",
                fontWeight: 800,
                cursor: "pointer",
                background: "rgba(255,255,255,0.10)",
              }}
            >
              {copy.ctaPrimary}
            </button>

            <button
  type="button"
  onClick={handleContinueFree}
              style={{
                padding: "14px 14px",
                borderRadius: 16,
                border: "1px solid rgba(255,255,255,0.12)",
                opacity: 0.9,
                cursor: "pointer",
                background: "transparent",
              }}
            >
              {copy.ctaSecondary}
            </button>

            <button
              type="button"
              onClick={handleRestore}
              style={{
                marginTop: 6,
                fontSize: 13,
                opacity: 0.85,
                cursor: "pointer",
                background: "transparent",
                border: "none",
                textAlign: "left",
                padding: 0,
              }}
            >
              {copy.restore}
            </button>

            <div style={{ marginTop: 10, display: "flex", gap: 12, fontSize: 13, opacity: 0.8 }}>
              <Link href="/legal/terms" style={{ textDecoration: "underline" }}>
                {copy.labelTerms}
              </Link>
              <Link href="/legal/privacy" style={{ textDecoration: "underline" }}>
                {copy.labelPrivacy}
              </Link>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
