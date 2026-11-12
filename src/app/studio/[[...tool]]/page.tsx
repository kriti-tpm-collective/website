import type { Metadata, Viewport } from "next";
import { NextStudio } from "next-sanity/studio";
import config from "../../../../sanity.config";

export const metadata: Metadata = {
  title: "Studio · TPM Collective",
  robots: { index: false, follow: false },
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function StudioPage() {
  return <NextStudio config={config} />;
}
