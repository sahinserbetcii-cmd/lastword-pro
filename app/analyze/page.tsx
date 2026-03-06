import { Suspense } from "react";
import AnalyzeClient from "./AnalyzeClient";

export default function Page() {
  return (
    <Suspense fallback={null}>
      <AnalyzeClient />
    </Suspense>
  );
}