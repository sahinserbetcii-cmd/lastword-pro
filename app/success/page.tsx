"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function SuccessPage() {
  const router = useRouter();

  useEffect(() => {
    try {
      // PRO flag set
      localStorage.setItem("lastword:premium", "true");

      // uygulamaya event gönder
      window.dispatchEvent(new Event("lastword_premium_changed"));

    } catch (e) {}

    // analyze sayfasına yönlendir
    setTimeout(() => {
      router.replace("/analyze");
    }, 1200);

  }, [router]);

  return (
    <main className="min-h-screen bg-[#0B1220] text-white flex items-center justify-center px-6">
      <div className="text-center">
        <h1 className="text-4xl font-semibold">Payment Successful</h1>
        <p className="mt-4 text-white/70">
          Your LastWord Pro access is now active.
        </p>
      </div>
    </main>
  );
}