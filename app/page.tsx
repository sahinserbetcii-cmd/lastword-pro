"use client";

import { getDictionary } from "./i18n/getDictionary";
import * as React from "react";
import HashScroll from "./components/HashScroll";
import { getLang, setLang, type SupportedLang } from "./i18n/getLang";
export default function HomePage() {
  const [locale, setLocale] = React.useState<SupportedLang>("en");
const dict = React.useMemo(() => getDictionary(locale), [locale]);

React.useEffect(() => {
  const sync = () => setLocale(getLang());
  sync();

  window.addEventListener("lw_lang_changed", sync);
  window.addEventListener("popstate", sync);

  return () => {
    window.removeEventListener("lw_lang_changed", sync);
    window.removeEventListener("popstate", sync);
  };
}, []);

  return (
  <>
    
    <main className="mx-auto max-w-4xl p-6 space-y-14 pt-12">
      <HashScroll />
      <div className="rounded-2xl border p-6 space-y-3">
        <div className="flex items-center justify-end gap-2 text-xs opacity-80">
  <span className="opacity-70">Language</span>
<button
  onClick={() => {
    setLang("en");
    setLocale("en");
  }}
  className="hover:opacity-100 opacity-70"
>
  EN
</button>

{/*
<button onClick={() => { setLang("tr"); setLocale("tr"); }} className="hover:opacity-100 opacity-70">TR</button>
<button onClick={() => { setLang("fr"); setLocale("fr"); }} className="hover:opacity-100 opacity-70">FR</button>
<button onClick={() => { setLang("es"); setLocale("es"); }} className="hover:opacity-100 opacity-70">ES</button>
*/}
</div>
        <div className="text-xs tracking-wide uppercase opacity-70">
          {dict.home.brand}

        </div>

        <h1 className="text-2xl font-semibold">
          {dict.home.title}

        </h1>

        <p className="text-sm opacity-80">
         {dict.home.subtitle}

        </p>
<p className="text-xs opacity-60 mt-2">
  {dict.home.valueProposition}
</p>

       <div className="pt-2 space-y-2">
  <a
    href="/analyze?entry=landing"
    className="inline-flex w-full items-center justify-center rounded-xl bg-black px-4 py-2 text-sm font-semibold"
  >
    {dict.home.analyzeCta}

  </a>
<a
  href="#risk-framework"
  className="inline-flex text-sm text-white/70 hover:text-white transition"
>
  See the framework →
</a>
<div className="flex flex-wrap items-center gap-2 pt-2">
  <span className="rounded-full border px-3 py-1 text-xs opacity-80">
    No training on your data
  </span>
  <span className="rounded-full border px-3 py-1 text-xs opacity-80">
    Email & LinkedIn-ready
  </span>
  <span className="rounded-full border px-3 py-1 text-xs opacity-80">
    Role + culture-aware
  </span>
</div>
<span className="rounded-full border px-3 py-1 text-xs opacity-80">
  Explainable risk report
</span>

<span className="rounded-full border px-3 py-1 text-xs opacity-80">
  Controlled free evaluation
</span>
  <div className="flex items-center gap-3">
  <a
    href={`/paywall?lang=${locale}`}
    className="inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-2 text-sm"
  >
    {dict.home.unlockCta}
  </a>

  <span className="text-xs opacity-70">
    {dict.home.priceNote}
  </span>
</div>

<p className="mt-3 text-sm opacity-70">
  Self-serve software product. No human consulting or done-for-you service included.
</p>
</div>

      </div>
<section className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-4">
  <div className="flex items-center justify-between">
    <div>
      <div className="text-xs uppercase tracking-wide text-white/60">
       {dict.home.sampleRiskEyebrow}
      </div>
      <div className="mt-1 text-lg font-semibold">
        {dict.home.sampleRiskTitle}
      </div>
    </div>

    <div className="rounded-full border border-white/20 bg-white/5 px-3 py-1 text-xs text-white/80">
      {dict.home.sampleExampleOutput}
    </div>
  </div>

  <div>
    <div className="flex items-center justify-between text-sm">
      <span className="text-white/80">{dict.home.sampleRiskLevel}</span>
      <span className="text-white/60">2.6 / 4.0</span>
    </div>
    <div className="mt-2 h-2 w-full rounded-full bg-white/10">
      <div className="h-2 w-2/3 rounded-full bg-white/40" />
    </div>
  </div>

  <div className="grid gap-3 md:grid-cols-3">
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">Tone</div>
      <div className="mt-1 text-sm text-white/80">
        May read as abrupt to a senior recipient.
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">Hierarchy</div>
      <div className="mt-1 text-sm text-white/80">
        Add polite framing for a decision request.
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">Escalation</div>
      <div className="mt-1 text-sm text-white/80">
        Deadline phrasing could trigger resistance.
      </div>
    </div>
  </div>

  <div>
    <div className="text-sm font-semibold">Safer alternative</div>
    <div className="mt-2 rounded-xl border border-white/10 bg-black/20 p-4 text-sm text-white/80">
      “Could you please confirm whether we can proceed by Thursday? If you’d prefer a different timeline, I’m happy to adjust.”
    </div>
  </div>

  <div className="text-xs text-white/60">
    This is a mock report to illustrate the output format (risk markers, risk index, and response options).
  </div>
</section>
      <div className="rounded-2xl border p-5 text-sm space-y-1">
        <div className="font-medium">Privacy-first</div>
        <div className="opacity-80">
          {dict.home.privacyNote}

        </div>
      </div>
      <section id="how-it-works" className="rounded-2xl border p-6 space-y-6">
  <div className="flex items-start justify-between gap-4">
    <div>
      <h2 className="text-lg font-semibold">How it works</h2>
      <p className="text-sm opacity-80">
        From draft to decision-ready communication in three structured steps.
      </p>
    </div>

    <a
  href="/analyze?entry=landing&mode=free"
  className="shrink-0 inline-flex items-center justify-center rounded-xl border border-white/15 bg-white/5 px-4 py-3"
>
  Analyze a message →
</a>
  </div>

  <div className="grid gap-4 md:grid-cols-3">
    <div className="h-full rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">
        Step 1
      </div>
      <div className="mt-2 font-medium">Provide your draft</div>
      <p className="mt-2 text-sm text-white/80">
        Paste your email or LinkedIn message and select recipient context
        (role, culture, intent).
      </p>
    </div>

    <div className="h-full rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">
        Step 2
      </div>
      <div className="mt-2 font-medium">Risk signal detection</div>
      <p className="mt-2 text-sm text-white/80">
        We analyze tone, hierarchy alignment, escalation triggers,
        and clarity risks using structured risk markers.
      </p>
    </div>

    <div className="h-full rounded-xl border border-white/10 bg-white/5 p-4">
      <div className="text-xs uppercase tracking-wide text-white/60">
        Step 3
      </div>
      <div className="mt-2 font-medium">Professional response options</div>
      <p className="mt-2 text-sm text-white/80">
        Receive a risk index, highlighted risk areas, and calibrated
        alternative phrasing tailored to your recipient.
      </p>
    </div>
  </div>
</section>
{/* Professional Risk Framework */}
<section id="risk-framework" className="mx-auto w-full max-w-4xl px-4 pt-14 scroll-mt-24">
  <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
   <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
      <div>
        <div className="text-xs font-medium tracking-widest text-white/50">
          PROFESSIONAL RISK FRAMEWORK
        </div>
        <h2 className="mt-2 text-xl font-semibold text-white">
          A structured method — not generic rewriting.
        </h2>
        <p className="mt-2 text-sm leading-6 text-white/70">
          LastWord Pro produces explainable outputs: risk signals, risk markers, a normalized index,
          and calibrated response options tailored to recipient context.
        </p>
      </div>

      {/* Optional micro badge */}
      <div className="inline-flex w-fit items-center gap-2 rounded-full border border-white/10 bg-black/20 px-3 py-1 text-xs text-white/70">
        <span className="inline-block h-1.5 w-1.5 rounded-full bg-white/40" />
        Explainable report format
      </div>
    </div>

    <div className="mt-6 grid gap-3 sm:grid-cols-2">
      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-medium text-white/60">1) Signal Extraction</div>
        <div className="mt-2 text-sm text-white/85">
          Tone, ambiguity, power dynamics, escalation triggers, and clarity gaps.
        </div>
        <div className="mt-3 text-xs text-white/50">
          Output: detected signals + short rationale
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-medium text-white/60">2) Risk Markers</div>
        <div className="mt-2 text-sm text-white/85">
          Escalation, compliance/liability, misinterpretation, and reputation markers.
        </div>
        <div className="mt-3 text-xs text-white/50">
          Output: highlighted marker cards
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-medium text-white/60">3) Risk Index</div>
        <div className="mt-2 text-sm text-white/85">
          A normalized score to compare drafts and track improvement over time.
        </div>
        <div className="mt-3 text-xs text-white/50">
          Output: index + severity band
        </div>
      </div>

      <div className="rounded-xl border border-white/10 bg-black/20 p-4">
        <div className="text-xs font-medium text-white/60">4) Response Options</div>
        <div className="mt-2 text-sm text-white/85">
          Multiple rewrites: neutral / direct / diplomatic — each with a reason.
        </div>
        <div className="mt-3 text-xs text-white/50">
          Output: calibrated alternatives
        </div>
      </div>
    </div>

    <div className="mt-6 rounded-xl border border-white/10 bg-black/10 p-4">
  <div className="text-xs font-medium text-white/60">Why this isn’t “just ChatGPT”</div>

  <div className="mt-3 grid gap-3 sm:grid-cols-2">
    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="text-xs font-medium text-white/60">Generic AI</div>
      <ul className="mt-2 space-y-1 text-sm text-white/75">
        <li>• One-shot rewrite</li>
        <li>• Limited traceability</li>
        <li>• Hard to justify in a workflow</li>
      </ul>
    </div>

    <div className="rounded-lg border border-white/10 bg-black/20 p-3">
      <div className="text-xs font-medium text-white/60">LastWord Pro</div>
      <ul className="mt-2 space-y-1 text-sm text-white/75">
        <li>• Risk markers + rationale</li>
        <li>• Normalized risk index</li>
        <li>• Multiple calibrated response options</li>
      </ul>
    </div>
  </div>
</div>
  </div>
</section>
<section id="risk-types" className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6 scroll-mt-24">
  <div className="space-y-2">
    <div className="text-xs font-medium tracking-widest text-white/50">RISK TAXONOMY</div>
    <h2 className="text-lg font-semibold text-white">Risk Categories & Markers</h2>
    <p className="text-sm text-white/70 leading-6">
      Instead of generic rewriting, we surface specific risk markers so you can understand what’s risky and why —
      before sending.
    </p>
  </div>

  <div className="grid gap-3 lg:grid-cols-2">
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Tone & Perception Risk</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        How the message may “read” to the recipient — especially under stress.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Markers: blunt phrasing • passive-aggressive cues • blame language
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Clarity & Commitment Risk</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Ambiguity that creates misalignment, scope creep, or accountability gaps.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Markers: vague timelines • unclear owners • unbounded commitments
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Hierarchy & Power Dynamics</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Risk created by role mismatch, authority signals, or escalation posture.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Markers: directive tone to senior • implied authority • “final decision” framing
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Escalation & Conflict Risk</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Phrasing that can trigger resistance, defensiveness, or stakeholder escalation.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Markers: deadline threats • ultimatum wording • accusatory questions
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Compliance / Liability Signals</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Sensitive language that may create policy, legal, or contractual exposure.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Markers: guarantees • admissions • policy-violating phrasing
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Cultural Friction Risk</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Cross-cultural mismatch in directness, formality, or relationship cues.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Markers: formality mismatch • indirect vs direct clash • status signaling
      </div>
    </div>
  </div>

  <div className="rounded-xl border border-white/10 bg-black/10 p-4">
    <div className="text-xs font-medium text-white/60">What you get</div>
    <p className="mt-2 text-sm text-white/75 leading-6">
      Each category is backed by specific markers and an explainable rationale — so edits are defensible, not arbitrary.
    </p>
  </div>
</section>
{/* Trust Layer */}
<section id="trust" className="rounded-2xl border border-white/10 bg-white/5 p-6 space-y-6 scroll-mt-24">
  <div className="space-y-2">
    <div className="text-xs font-medium tracking-widest text-white/50">TRUST LAYER</div>
    <h2 className="text-lg font-semibold text-white">Built for professional use — with clear guardrails.</h2>
    <p className="text-sm text-white/70 leading-6">
      Communication risk is sensitive. We prioritize privacy, transparency, and reliability so you can evaluate the
      product with confidence.
    </p>
  </div>

  <div className="grid gap-3 lg:grid-cols-3">
    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Privacy-first processing</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Your message is processed in-session for analysis. We don’t use your content to train models.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Designed for email & LinkedIn drafts.
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Transparent limitations</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Not legal advice. High-stakes scenarios require human review. We surface risk signals — you make the call.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Explainable rationale included.
      </div>
    </div>

    <div className="rounded-xl border border-white/10 bg-black/20 p-4">
      <div className="text-sm font-medium text-white">Controlled evaluation</div>
      <p className="mt-2 text-sm text-white/70 leading-6">
        Free access is rate-limited to protect performance and prevent abuse. Pro unlock removes daily constraints.
      </p>
      <div className="mt-3 text-xs text-white/50">
        Stable experience for serious users.
      </div>
    </div>
  </div>

  <div className="rounded-xl border border-white/10 bg-black/10 p-4">
    <div className="text-xs font-medium text-white/60">Evaluation note</div>
    <p className="mt-2 text-sm text-white/75 leading-6">
      If your organization requires stricter controls (e.g., retention and logging posture), we can align on a stricter policy and publish a dedicated privacy page.
    </p>
  </div>
</section>
<section id="pricing" className="rounded-2xl border p-6 space-y-2">
  <h2 className="text-lg font-semibold">Pricing</h2>
  <p className="text-sm opacity-80">
    Start with a controlled free evaluation. Unlock Pro for full risk reports and professional-grade response options.
  One-time purchase: $9.99 — fair-use limit: 5 risk checks/day.
  </p>
</section>

<section id="faq" className="rounded-2xl border p-6 space-y-2">
  <h2 className="text-lg font-semibold">FAQ</h2>
  <p className="text-sm opacity-80">
    Common questions about privacy, accuracy, and professional use cases.
  </p>
</section>
    </main>
  </>
);
}
