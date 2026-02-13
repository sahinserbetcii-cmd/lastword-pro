"use client";

import { useEffect, useMemo, useState } from "react";

import { useRouter } from "next/navigation";
import { getDictionary } from "../i18n/getDictionary";
import { getLang } from "../i18n/getLang";

type CorporateStyle =
  | "US Corporate"
  | "German Directness"
  | "Japanese Politeness"
  | "Turkish Hierarchy";

type RecipientRole = "Manager" | "Client" | "HR" | "Investor" | "Peer";
type RecipientBehavior = "Neutral" | "Passive" | "Aggressive" | "Ghosting";

export default function AnalyzePage() {
  const router = useRouter();

  const [style, setStyle] = useState<CorporateStyle>("US Corporate");
  const [role, setRole] = useState<RecipientRole>("Manager");
  const [behavior, setBehavior] = useState<RecipientBehavior>("Neutral");
  const [message, setMessage] = useState("");

  const canAnalyze = useMemo(() => message.trim().length >= 8, [message]);
const [loading, setLoading] = useState(false);
const [error, setError] = useState<string | null>(null);
const [dict, setDict] = useState<any | null>(null);

useEffect(() => {
  const locale = getLang();
 setDict(getDictionary(locale));

}, []);
// eslint-disable-next-line @typescript-eslint/no-explicit-any
async function runAnalyze(payload: any) {
  setLoading(true);
  setError(null);

  try {
    const r = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
if (r.status === 429) {
  setError("__RATE_LIMIT__");
  return;
}

    if (!r.ok) {
      const t = await r.text();
      throw new Error(t);
    }

    const data = await r.json();
sessionStorage.setItem("lastword:lastPayload", JSON.stringify(payload));
sessionStorage.setItem("lastword:lastResult", JSON.stringify(data));
router.push("/results");

    // sonucu results sayfası için sakla
    sessionStorage.setItem("lastword:lastResult", JSON.stringify(data));
    router.push("/results");
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    setError(e?.message === "__RATE_LIMIT__" ? "__RATE_LIMIT__" : (e?.message ?? "Analyze failed"));

  } finally {
    setLoading(false);
  }
}

  function onAnalyze() {
  if (!canAnalyze || loading) return;

  const payload = {
    message: message.trim(),
    mode: "professional",
    language: "tr",
    tone: style,
    recipientStyle: behavior,
    role,
  };

  runAnalyze(payload);
}


  return (
    <main className="mx-auto max-w-md p-6 space-y-5">
      <div className="space-y-1">
        <div className="text-xs tracking-wide uppercase opacity-70">
          LastWord Pro
        </div>
        <h1 className="text-2xl font-semibold">Risk Analysis</h1>
        <p className="text-sm opacity-80">
          Reputation & power protection before you hit Send.
        </p>
      </div>
{error && (
  <div className="rounded-2xl border p-4">
    <div className="text-sm font-semibold">
      {error === "__RATE_LIMIT__" ? dict.states.rateLimit.title : dict.states.error.title}
    </div>

    <div className="mt-1 text-sm opacity-80">
      {error === "__RATE_LIMIT__" ? dict.states.rateLimit.body : dict.states.error.body}
    </div>

    <div className="mt-3 flex gap-2">
      {error === "__RATE_LIMIT__" ? (
        <button
          type="button"
          onClick={() => router.push("/paywall")}
          className="rounded-xl bg-black px-3 py-2 text-sm font-medium text-white"
        >
          {dict.states.rateLimit.cta}
        </button>
      ) : null}

      <button
        type="button"
        onClick={() => setError(null)}
        className="rounded-xl border px-3 py-2 text-sm font-medium"
      >
        {error === "__RATE_LIMIT__" ? dict.states.rateLimit.dismiss : "OK"}
      </button>
    </div>
  </div>
)}


      <div className="rounded-2xl border p-5 space-y-4">
        <div className="text-sm font-medium">Context</div>

        <Field label="Corporate Communication Style">
          <select
            className="w-full rounded-xl border px-3 py-2 text-sm bg-transparent"
            value={style}
            onChange={(e) => setStyle(e.target.value as CorporateStyle)}
          >
            <option>US Corporate</option>
            <option>German Directness</option>
            <option>Japanese Politeness</option>
            <option>Turkish Hierarchy</option>
          </select>

          <div className="mt-2 text-xs opacity-70">
            A communication lens for risk interpretation — not nationality.
          </div>
        </Field>

        <div className="grid grid-cols-2 gap-3">
          <Field label="Recipient role">
            <select
              className="w-full rounded-xl border px-3 py-2 text-sm bg-transparent"
              value={role}
              onChange={(e) => setRole(e.target.value as RecipientRole)}
            >
              <option>Manager</option>
              <option>Client</option>
              <option>HR</option>
              <option>Investor</option>
              <option>Peer</option>
            </select>
          </Field>

          <Field label="Recipient behavior">
            <select
              className="w-full rounded-xl border px-3 py-2 text-sm bg-transparent"
              value={behavior}
              onChange={(e) =>
                setBehavior(e.target.value as RecipientBehavior)
              }
            >
              <option>Neutral</option>
              <option>Passive</option>
              <option>Aggressive</option>
              <option>Ghosting</option>
            </select>
          </Field>
        </div>
      </div>

      <div className="rounded-2xl border p-5 space-y-3">
        <div className="flex items-center justify-between">
          <div className="text-sm font-medium">Message</div>
          <div className="text-xs opacity-60">Professional only</div>
        </div>

        <textarea
          className="w-full min-h-[170px] rounded-xl border px-3 py-2 text-sm bg-transparent"
          placeholder="Paste the email / Slack message you’re about to send…"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />

        <button
  type="button"
  onClick={onAnalyze}
  disabled={!canAnalyze || loading}
  className="w-full rounded-xl bg-black px-4 py-2 text-white text-sm font-medium disabled:opacity-40"
>
  {loading ? (
    <div className="flex items-center justify-center gap-2">
      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent"></div>
      <span>Analyzing...</span>
    </div>
  ) : (
    "Analyze Risk"
  )}
</button>

        <div className="text-xs opacity-60">
          Tip: Keep it raw. We preserve intent and remove risk.
        </div>

        <div className="text-xs opacity-60">
          Privacy: analyzed in-session and not stored.
        </div>
      </div>
    </main>
  );
}

function Field({
  label,
  children,
}: {
  label: string;
  children: React.ReactNode;
}) {
  return (
    <div className="space-y-1">
      <div className="text-xs font-medium opacity-70">{label}</div>
      {children}
    </div>
  );
}
