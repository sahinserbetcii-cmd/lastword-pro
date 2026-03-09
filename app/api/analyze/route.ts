// src/app/api/analyze/route.ts
import { NextResponse } from "next/server";

export const runtime = "nodejs"; // OpenAI çağrısı için node runtime

type AnalyzeRequest = {
  message: string;
  mode?: "professional" | "personal";
  role?: "sender" | "manager" | "employee" | "founder" | "freelancer" | string;
  recipientStyle?: "neutral" | "cold" | "aggressive" | "ghosting" | "friendly" | string;
  tone?: "calm" | "assertive" | "empathetic" | "direct" | "polite" | string;
  language?: "tr" | "en" | "es" | "fr" | string;
};

type AnalyzeResponse = {
  riskScore: number; // 0-100
  riskMarkers: { id: string; label: string; severity: "low" | "medium" | "high"; rationale: string, "impact": string }[];
  finalMessages: { id: "safest" | "balanced" | "direct"; title: string; message: string }[];
  potentialResponses: { id: string; title: string; bullets: string[] }[];
  meta: { mode: string; language: string };
};

function clamp(n: number, min: number, max: number) {
  return Math.max(min, Math.min(max, n));
}
function inferLanguageFromMessage(message: string): "tr" | "en" | "fr" | "es" {
  const m = (message || "").toLowerCase();

  // Turkish character signals
  if (/[ğüşöçıİı]/i.test(message)) return "tr";

  // French character signals
  if (/[àâçéèêëîïôœùûüÿ]/i.test(message)) return "fr";

  // Spanish character signals
  if (/[ñ¡¿áéíóúü]/i.test(message)) return "es";

  // If nothing special, default to English
  return "en";
}

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as AnalyzeRequest;

    const message = (body.message || "").trim();
    if (!message) {
      return NextResponse.json({ error: "message is required" }, { status: 400 });
    }

    const mode = body.mode ?? "professional";
    const language = body.language ?? "en";
    const role = body.role ?? "sender";
    const recipientStyle = body.recipientStyle ?? "neutral";
    const tone = body.tone ?? "polite";


    const apiKey = process.env.OPENAI_API_KEY;
    if (!apiKey) {
      return NextResponse.json({ error: "Missing OPENAI_API_KEY" }, { status: 500 });
    }

    // ---- OpenAI call (Responses API style via fetch; no SDK dependency) ----
    // Not: Model adını daha sonra değiştirebiliriz; burada "gpt-4.1-mini" pratik bir default.
    const prompt = `
You are an expert communication risk analyst and copywriter.

TASK:
1) Analyze the user's message for interpersonal/professional risk.
2) Output JSON ONLY that matches the provided schema exactly.

CONTEXT:
- mode: ${mode}
- sender role: ${role}
- recipient style: ${recipientStyle}
- desired tone: ${tone}
- language: ${language}

USER MESSAGE:
"""${message}"""

OUTPUT SCHEMA (JSON only):
{
  "riskScore": number (0-100),
  "riskMarkers": [
    { "id": string, "label": string, "severity": "low"|"medium"|"high", "rationale": string }
  ],
  "finalMessages": [
  {
    "id": "safest"|"balanced"|"direct",
    "title": string,
    "message": string,
    "why": string
  }
]
,
  "potentialResponses": [
  {
    "id": string,
    "title": string,
    "bullets": [string, string, ...],
    "why": string
  }
]
,
  "meta": { "mode": string, "language": string }
}

RULES:
For each finalMessages item, include a "why" field (1–2 short sentences, max 180 characters)
explaining specifically why this version reduces risk or improves clarity.
Reference concrete wording or structure (tone, boundaries, next step).
No generic advice.
ROLE-AWARE RULE:
If meta.mode is "professional" and a recipientRole is provided, adapt:
- finalMessages wording (formality, boundaries, next step)
- potentialResponses plausibility
- "why" and "impact" explanations
to that recipientRole (e.g., manager vs customer vs teammate).
Keep tone calm and non-accusatory.
recipientRole is one of: "manager", "customer", "teammate", or "unknown".
If unknown, use general professional tone.

For each potentialResponses item, include a "why" field (max 180 characters)
explaining why that response is plausible given the message tone and context.
For each riskMarkers item, include "impact" (max 160 characters):
a calm, plausible consequence if the user sends the original message without adjustment.
No catastrophizing. No legal/medical claims. No certainty language.
Write in the same language as the output.

- Return 3 finalMessages: safest, balanced, direct.
- riskMarkers: 3-7 items, practical and specific.
- potentialResponses: 3 sections, each with 3-5 bullets.
- Use the same language as 'language' for all text fields.
- No extra keys. No markdown. JSON only.
QUALITY BAR FOR "why":
- Must reference a concrete element in the rewritten message (e.g., "sets a clear next step", "removes blame language", "adds a time-bound ask", "uses neutral tone").
- Avoid generic advice like "it's clearer" without saying how.
- No absolute claims. No therapy language.
- Max 180 characters, 1–2 sentences.
- Write in the same language as the output (meta.language).
riskMarkers.rationale must be specific and actionable (max 160 chars). Avoid vague statements.

`.trim();


    const r = await fetch("https://api.openai.com/v1/responses", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${apiKey}`,
      },
      body: JSON.stringify({
        model: "gpt-4.1-mini",
        input: prompt,
        // JSON-only için sıkı format:
        text: { format: { type: "json_object" } },
        temperature: 0.3,
      }),
    });
if (r.status === 429) {
  return NextResponse.json(
    { error: "rate_limit" },
    { status: 429 }
  );
}

    if (!r.ok) {
      const errText = await r.text();
      return NextResponse.json(
        { error: "OpenAI request failed", details: errText },
        { status: 500 }
      );
    }

    const data = await r.json();

    // Responses API'de JSON text çıktısını yakalayalım:
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const textOut: string | undefined =
      data?.output?.[0]?.content?.find((c: any) => c?.type === "output_text")?.text;

    if (!textOut) {
      return NextResponse.json({ error: "No output_text from model" }, { status: 500 });
    }

    let parsed: AnalyzeResponse;
    try {
      parsed = JSON.parse(textOut) as AnalyzeResponse;
    } catch {
      return NextResponse.json(
        { error: "Model output was not valid JSON", raw: textOut },
        { status: 500 }
      );
    }

    // Basit güvenlik/format düzeltmeleri
    parsed.riskScore = clamp(Number(parsed.riskScore ?? 0), 0, 100);
    parsed.meta = { mode: String(mode), language: String(language) };

    return NextResponse.json(parsed, { status: 200 });
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (e: any) {
    return NextResponse.json(
      { error: "Unexpected error", details: e?.message ?? String(e) },
      { status: 500 }
    );
  }
}
