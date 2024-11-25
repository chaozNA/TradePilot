import OptionSearchContainer from "@/components/options/option-search-container";
import { Suspense } from "react";

export default function TradePage() {
  return (
    <div className="container mx-auto max-w-6xl space-y-8 py-8">
      <Suspense fallback={<div>Loading...</div>}>
        <OptionSearchContainer />
      </Suspense>
    </div>
  );
}
