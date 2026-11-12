import { Suspense } from "react";
import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Suspense fallback={<div className="h-16 border-b border-line bg-surface" />}>
        <SiteHeader />
      </Suspense>
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
