import type { Metadata } from "next";
import { redirect } from "next/navigation";
import { AuthForm } from "@/components/AuthForm";
import { getCurrentUser, safeRedirectPath } from "@/lib/auth";

export const metadata: Metadata = {
  title: "Sign in",
  robots: { index: false, follow: false },
};

type Props = { searchParams: Promise<{ next?: string | string[] }> };

export default async function LoginPage({ searchParams }: Props) {
  const params = await searchParams;
  const requested = Array.isArray(params.next) ? params.next[0] : params.next;
  const next = safeRedirectPath(requested);
  const user = await getCurrentUser();
  if (user) redirect(next);

  return (
    <div className="container-page flex justify-center py-16 md:py-24">
      <div className="w-full max-w-md rounded-[18px] border-[1.5px] border-ink bg-surface p-7 shadow-[4px_4px_0_var(--ink)] md:p-8">
        <AuthForm mode="login" next={next} />
      </div>
    </div>
  );
}
