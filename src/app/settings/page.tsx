"use client";

import dynamic from "next/dynamic";

// Dynamically import with no SSR
const SettingsContent = dynamic(() => import("@/components/SettingsContent"), {
  ssr: false,
});

export default function SettingsPage() {
  return <SettingsContent />;
}
