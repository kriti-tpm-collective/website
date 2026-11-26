import { SiteFooter } from "@/components/SiteFooter";
import { SiteHeader } from "@/components/SiteHeader";
import { getCurrentUser } from "@/lib/auth";

export default async function SiteLayout({ children }: { children: React.ReactNode }) {
  const user = await getCurrentUser();

  return (
    <>
      <SiteHeader user={user ? { id: user.id, name: user.name } : null} />
      <div className="flex-1">{children}</div>
      <SiteFooter />
    </>
  );
}
