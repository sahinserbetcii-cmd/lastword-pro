import type { NextConfig } from "next";

/**
 * WEB-FIRST default (Vercel SSR uyumlu):
 * - output:"export" kapalı
 * - assetPrefix kapalı
 *
 * Geri dönmek istersen (Capacitor/static export):
 * PowerShell: $env:NEXT_STATIC_EXPORT="1"
 */
const isStaticExport = process.env.NEXT_STATIC_EXPORT === "1";

const nextConfig: NextConfig = {
  ...(isStaticExport
    ? {
        // ✅ ANDROID/CAPACITOR (opsiyonel, flag ile)
        output: "export",
        trailingSlash: true,
        assetPrefix: "./",
        images: { unoptimized: true },
      }
    : {
        // ✅ WEB-FIRST SSR (default)
        // Burada bilerek hiçbir static/export ayarı yok.
      }),
};

export default nextConfig;
