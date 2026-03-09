
"use client";
export const dynamic = "force-dynamic";

import React, { Suspense, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";

import { getDictionary } from "../i18n/getDictionary";
import { normalizeLang } from "../i18n/getLang";

type ApiState =
  | { status: "idle" }
  | { status: "loading" }
  | { status: "error"; message: string }
  | { status: "done"; data: any };

type ProPayload = any;

function safeJsonParse<T>(raw: string | null): T | null {
  if (!raw) return null;
  try {
    return JSON.parse(raw) as T;
  } catch {
    return null;
  }
}

function severityLabel(sev?: string) {
  const s = (sev ?? "").toLowerCase();
  if (s === "high") return "High";
  if (s === "medium") return "Medium";
  if (s === "low") return "Low";
  return "—";
}

function asFinalMessageItem(m: unknown): {
  id?: string;
  title?: string;
  message?: string;
  why?: string;
} {
  if (!m || typeof m !== "object") return {};
  const mm = m as any;
  return {
    id: typeof mm.id === "string" ? mm.id : undefined,
    title: typeof mm.title === "string" ? mm.title : undefined,
    message: typeof mm.message === "string" ? mm.message : undefined,
    why: typeof mm.why === "string" ? mm.why : undefined,
  };
}

async function copyToClipboard(text: string) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.style.position = "fixed";
      ta.style.opacity = "0";
      document.body.appendChild(ta);
      ta.focus();
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}
function getPrimaryRiskLabel(score?: number | null) {
  const s = typeof score === "number" ? score : NaN;

  if (!Number.isFinite(s)) return "—";

  if (s >= 80) return "Escalation Risk";
  if (s >= 65) return "Authority Conflict Risk";
  if (s >= 50) return "Relational Strain Risk";
  return "Low Professional Risk";
}

function ResultsInner() {

  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPremium, setIsPremium] = useState(false);

useEffect(() => {
  const premium = localStorage.getItem("lastword:premium") === "true";
  setIsPremium(premium);
}, []);
const locale = normalizeLang(searchParams.get("lang") ?? "en");
const payloadRaw =
  typeof window !== "undefined"
    ? sessionStorage.getItem("lastword:payload")
    : null;
if (!payloadRaw) {
  return (
    <main suppressHydrationWarning className="min-h-screen bg-black text-white flex items-center justify-center px-6">
      <div className="max-w-md w-full rounded-2xl border border-white/10 bg-white/5 p-6">
        <div className="text-lg font-semibold">No analysis yet</div>
        <div className="mt-2 text-sm text-white/70">
          Please run an analysis first. We’ll take you back to Analyze.
        </div>
        <button
          className="mt-4 w-full rounded-xl bg-white text-black py-2 text-sm font-medium"
          onClick={() => router.push("/analyze")}
        >
          Go to Analyze
        </button>
      </div>
    </main>
  );
}
useEffect(() => {
  if (!payloadRaw) {
    router.replace("/analyze");
  }
}, [payloadRaw, router]);

  function goPaywall() {
    router.push(`/paywall?lang=${locale}`);
  }

  const dict = getDictionary(locale);

  // ✅ Hooks MUST always be called in the same order — no early return above these.
  const [mounted, setMounted] = useState(false);
  const [payload, setPayload] = useState<ProPayload | null>(null);
  const [result, setResult] = useState<unknown | null>(null);
  const [api, setApi] = useState<ApiState>({ status: "idle" });
  const doneData = api.status === "done" && "data" in api ? api.data : null;
  const data = api.status === "done" ? api.data : null;
  const [activeTab, setActiveTab] = useState<"final" | "risks" | "responses">(
    "final"
  );
const [showRiskDetails, setShowRiskDetails] = useState(false);

 const [isPro, setIsPro] = useState(false);
 const [toast, setToast] = useState<{ type: "success" | "info"; text: string } | null>(null);
useEffect(() => {
  const sync = () => {
    const v = localStorage.getItem("lastword:premium");
    setIsPro(v === "true");
  };

  sync();

  const onChanged = () => sync();
  window.addEventListener("lastword_premium_changed", onChanged);

  return () => {
    window.removeEventListener("lastword_premium_changed", onChanged);
  };
}, []);


  

  // 1) Mount gate
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect
    setMounted(true);
  }, []);

  // 2) Read from sessionStorage ONLY after mount
  useEffect(() => {
    if (!mounted) return;

    // result
    try {
      const raw = sessionStorage.getItem("lastword:lastResult");
      // eslint-disable-next-line react-hooks/set-state-in-effect
      setResult(raw ? JSON.parse(raw) : null);
    } catch {
      setResult(null);
    }

    // payload
    try {
      const raw = sessionStorage.getItem("lastword:lastPayload");
      setPayload(raw ? (JSON.parse(raw) as ProPayload) : null);
    } catch {
      setPayload(null);
    }
  }, [mounted]);

  const contextRows = useMemo(() => {
    const p = payload as any;
    const rows: Array<[string, string]> = [];
    if (!p) return rows;

    rows.push(["Mode", String(p.mode)]);
    if (p.role) rows.push(["Role", String(p.role)]);
    if (p.receiverRole)
      rows.push(["Receiver", String(p.receiverRole)]);
    if (p.country) rows.push(["Country", String(p.country)]);
    // if (p.language) rows.push(["Language", String(p.language)]);

    return rows;
  }, [payload, dict]);

  // 3) If we already have a result in storage, set it as "done" without refetching.
  useEffect(() => {
    if (!mounted) return;
    if (api.status !== "idle") return;

    if (result) {
      setApi({ status: "done", data: result });
    }
  }, [mounted, api.status, result]);

  // 4) If no stored result but we have payload, call the API
  useEffect(() => {
    if (!mounted) return;
    if (api.status !== "idle") return;
    if (!payload) return;
    if (result) return;

    let cancelled = false;

    (async () => {
      try {
        setApi({ status: "loading" });

        const res = await fetch(`/api/analyze?lang=${locale}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });

        if (!res.ok) {
          const t = await res.text();
          throw new Error(t || "Request failed");
        }

        const json = await res.json();

        if (cancelled) return;

        try {
          sessionStorage.setItem("lastword:lastResult", JSON.stringify(json));
        } catch {}

        setApi({ status: "done", data: json });
      } catch (e: any) {
        if (cancelled) return;
        setApi({
          status: "error",
          message: e?.message || "Unknown error",
        });
      }
    })();

    return () => {
      cancelled = true;
    };
  }, [mounted, api.status, payload, result, locale]);

  const severityClasses = useMemo(() => {
    return (sev?: string) => {
      const s = (sev ?? "").toLowerCase();
      if (s === "high") return "bg-white text-black";
      if (s === "medium") return "bg-white/10 text-white";
      if (s === "low") return "bg-white/5 text-white/80";
      return "bg-white/5 text-white/70";
    };
  }, []);

  return (
    <main className="mx-auto max-w-md p-6 space-y-5">
      {/* Header */}
      <div className="space-y-1">
        <div className="text-xs tracking-wide uppercase opacity-70">
          LastWord Pro
        </div>
        <h1 className="text-2xl font-semibold">Analysis</h1>
        <p className="text-sm opacity-80">
          Perception risks for hierarchy, reputation, and power dynamics.
        </p>
      </div>

      {/* Context snapshot (optional) */}
      <section className="rounded-2xl border border-white/10 p-5">
        <div className="text-sm font-medium">Context snapshot</div>

        {contextRows.length === 0 ? (
          <div className="mt-3 text-sm opacity-70">—</div>
        ) : (
          <div className="mt-3 space-y-2">
            {contextRows.map(([k, v], idx) => (
  <div
    key={`${k}-${idx}`}
    className="flex items-center justify-between gap-3 text-sm"
  >
    <div className="opacity-70">{k}</div>
    <div className="text-right">{v}</div>
  </div>
))}

          </div>
        )}
      </section>

      {/* Error state */}
      {api.status === "error" && (
        <section className="rounded-2xl border border-white/10 p-5 space-y-4">
          <div className="text-sm font-medium">Couldn't complete analysis</div>
          <p className="text-sm opacity-80">{api.message}</p>

          <div className="flex gap-3">
            <button
              onClick={() => router.push("/analyze")}
              className="flex-1 rounded-xl border border-white/15 px-4 py-2 text-sm"
            >
              Back to Analyze
            </button>
            <button
              onClick={() => {
                // simplest reliable retry: go back to analyze
                router.push("/analyze");
              }}
              className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-sm"
            >
              Retry
            </button>
          </div>
        </section>
      )}

      {/* Done state */}
      {api.status === "done" && api.data && (
        <div className="space-y-5">
          
          {/* Tabs */}
          <div className="mb-6 flex gap-6 border-b border-white/10 sticky top-0 z-20 bg-black/70 backdrop-blur">
           {(isPro
  ? [
      { key: "final", label: dict.results.tabsFinal },
      { key: "risks", label: dict.results.tabsRisks },
      { key: "responses", label: dict.results.tabsResponses },
    ]
  : [{ key: "final", label: dict.results.tabsFinal }]
).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setActiveTab(tab.key as any)}
                className={`relative pb-3 text-sm font-medium transition ${
                  activeTab === tab.key
                    ? "text-white"
                    : "text-white/50 hover:text-white/80"
                }`}
              >
                {tab.label}
                {activeTab === tab.key && (
                  <span className="absolute left-0 right-0 -bottom-[1px] h-[2px] rounded-full bg-white" />
                )}
              </button>
            ))}
          </div>

          {/* Risk score */}
{activeTab === "final" && (
  <section className="rounded-2xl border border-white/10 p-5">
    <div className="text-sm opacity-70">Risk Score</div>

    <div className="mt-2 flex items-baseline gap-3">
      <div className="text-5xl font-semibold">
        {api.data.riskScore ?? "—"}
      </div>
      <div className="text-sm opacity-60">/ 100</div>
    </div>

   <div className="mt-4 text-xs text-white/70">
      <span className="mr-2 uppercase tracking-wide">Primary Risk</span>
      <span className="opacity-90">
        {getPrimaryRiskLabel(api.data.riskScore)}
      </span>
    </div>
    <button
  type="button"
  onClick={() => setShowRiskDetails((v) => !v)}
  className="mt-3 text-xs text-white/70 underline underline-offset-4 hover:text-white"
>
  {showRiskDetails ? "Hide risk details" : "View risk details"}
</button>

{showRiskDetails && (
  <div className="mt-3 space-y-1 text-xs text-white/70">
    <div>
      <span className="mr-2 uppercase tracking-wide text-white/50">
        Why it matters
      </span>
      <span>
        Helps prevent escalation and protects professional credibility.
      </span>
    </div>
    <div>
      <span className="mr-2 uppercase tracking-wide text-white/50">
        What to change
      </span>
      <span>
        Reduce implied threats, add collaborative framing, and clarify next steps.
      </span>
    </div>
  </div>
)}
  </section>
)}


          {/* Risks */}
          {isPro && activeTab === "risks" && (
            <section className="rounded-2xl border border-white/10 p-5 relative">
              <div className="text-sm font-medium">Detected Risks</div>
              <div className="mt-4 space-y-3">
                {/* eslint-disable-next-line @typescript-eslint/no-explicit-any */}
                {(api.data.riskMarkers ?? []).map((r: any) => (
                  <div
                    key={String(r.id ?? r.label)}
                    className="rounded-xl border border-white/10 p-4"
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="font-medium">{r.label ?? "—"}</div>
                      <span
                        className={`px-3 py-1 rounded-full text-xs ${severityClasses(
                          r.severity
                        )}`}
                      >
                        {severityLabel(r.severity)}
                      </span>
                    </div>

                    {r.rationale && (
                      <p className="mt-2 text-sm opacity-80">{r.rationale}</p>
                    )}

                    {r.impact && (
                      <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-3 text-sm text-white/70">
                        <div className="mb-1 text-xs text-white/40">
                          If ignored
                        </div>
                        <div className="whitespace-pre-wrap">{r.impact}</div>
                      </div>
                    )}
                  </div>
                ))}

                {(api.data.riskMarkers ?? []).length === 0 && (
                  <div className="text-sm opacity-70">
                    No major risks detected.
                  </div>
                )}
              </div>
              
            </section>
          )}

          {/* Final messages */}
          {activeTab === "final" && (
            <section className="rounded-2xl border border-white/10 bg-white/5 p-5">
              <div className="text-sm font-medium">Final Messages</div>
              <div className="mt-4 space-y-3">
                {(isPro
  ? (api.data.finalMessages ?? [])
  : (api.data.finalMessages ?? []).slice(0, 1)
).map(
                  (m: unknown, index: number) => {
                    const item = asFinalMessageItem(m);

                    return (
                      <div
                        key={item.id ?? item.title ?? String(index)}
                        className="rounded-xl border border-white/10 p-4 bg-black/20 hover:bg-black/30 transition"
                      >
                        <div className="flex items-center justify-between">
                          <div className="text-sm font-semibold text-white">
                            {item.title ?? dict.results.suggestedVersion}
                          </div>

                          <button
                            onClick={async () => {
                              const ok = await copyToClipboard(
                                item.message ?? ""
                              );
                              
                            }}
                            className="rounded-lg border border-white/10 bg-white/5 px-3 py-1.5 text-xs text-white/80 hover:bg-white hover:text-black transition"
                          >
                            {dict.results.copy}
                          </button>
                        </div>

                        {!!item.message && (
                          <p className="mt-2 text-[15px] leading-relaxed text-white/90 whitespace-pre-wrap">
                            {item.message}
                          </p>
                        )}

                        {!!item.why && (
                          <div className="mt-3 rounded-xl border border-white/10 bg-black/25 p-3 text-sm text-white/75">
                            <div className="mb-1 text-xs text-white/40">
                              {dict.results.whyThisWorks}
                            </div>
                            <div className="whitespace-pre-wrap">{item.why}</div>
                          </div>
                        )}
                      </div>
                    );
                 {!isPro && (doneData?.finalMessages?.length ?? 0) > 0 && (
  <div className="mt-6 rounded-xl border border-white/10 bg-black/30 p-4 text-sm opacity-80">
    Unlock Pro to view full risk analysis, additional final messages, and suggested responses.
  </div>
)}
                  }
                )}

                {(api.data.finalMessages ?? []).length === 0 && (
                  <div className="text-sm opacity-70">
                    No safe alternatives found for this message.
                  </div>
                )}
              </div>

              <div className="mt-4 flex items-center justify-between text-xs text-white/40">
                <span>Optimized for tone & clarity</span>
                <span>LastWord Pro</span>
              </div>
            </section>
          )}

         {/* Potential responses */}
{isPro && activeTab === "responses" && (
  <section className="relative rounded-2xl border border-white/10 bg-white/5 p-5">
    <div className="text-sm font-medium">Potential Responses</div>

    <div className="mt-4 space-y-3">
      {((api as any)?.data?.potentialResponses ?? []).map((p: any, i: number) => (
        <div
          key={String(p?.id ?? p?.title ?? i)}
          className="rounded-xl border border-white/10 p-4"
        >
          <div className="font-medium">{p?.title ?? "—"}</div>

          {!!p?.bullets?.length && (
            <ul className="mt-2 list-disc space-y-1 pl-5 text-sm opacity-90">
              {p.bullets.map((b: string, bi: number) => (
                <li key={bi}>{b}</li>
              ))}
            </ul>
          )}
        </div>
      ))}
    </div>
  </section>
)}

          {/* Actions */}
          <div className="flex gap-3">
            <button
              onClick={() => router.push("/analyze")}
              className="flex-1 rounded-xl border border-white/15 px-4 py-2 text-sm"
            >
              Analyze another
            </button>

            <button
              onClick={() => {
                try {
                  sessionStorage.removeItem("lastword:lastResult");
                } catch {}
                router.push("/analyze");
              }}
              className="flex-1 rounded-xl bg-white/10 px-4 py-2 text-sm"
            >
              Clear & restart
            </button>
          </div>
        </div>
      )}  
    </main>
  );
}
export default function ResultsPage() {
  return (
    <Suspense fallback={null}>
      <ResultsInner />
    </Suspense>
  );
}
