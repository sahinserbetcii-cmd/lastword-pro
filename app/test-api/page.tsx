"use client";

import { useState } from "react";

export default function TestApiPage() {
  const [out, setOut] = useState<string>("");

  async function run() {
    setOut("Loading...");

    const r = await fetch("/api/analyze", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        message:
          "Merhaba, raporu bugün bitirmen gerekiyor. Aksi halde üst yönetime taşıyacağım.",
        mode: "professional",
        language: "tr",
        tone: "polite",
        recipientStyle: "cold",
        role: "manager",
      }),
    });

    const text = await r.text();
    setOut(text);
  }

  return (
    <main style={{ padding: 24, fontFamily: "system-ui" }}>
      <h1>API Test</h1>

      <button
        onClick={run}
        style={{
          padding: "10px 14px",
          borderRadius: 10,
          border: "1px solid #444",
          cursor: "pointer",
        }}
      >
        /api/analyze çağır
      </button>

      <pre style={{ marginTop: 16, whiteSpace: "pre-wrap" }}>{out}</pre>
    </main>
  );
}
