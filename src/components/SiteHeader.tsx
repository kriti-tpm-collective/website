"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import { logout } from "@/server/auth-actions";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/blogs", label: "Blogs" },
  { href: "/prepare", label: "Prepare" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteHeader({ user }: { user: { id: string; name: string } | null }) {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const firstName = user?.name.split(" ")[0];

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-ink/90 bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-20 items-center justify-between gap-4">
        <Link href="/" className="group flex items-center gap-3" onClick={() => setOpen(false)}>
          <Image
            src="/brand/tpm-collective-logo.png"
            alt="TPM Collective"
            width={1071}
            height={753}
            className="hover-wiggle h-16 w-auto"
            priority
          />
          <span
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink-muted xl:inline-flex"
            aria-hidden="true"
          >
            <span className="animate-blink h-1.5 w-1.5 rounded-full bg-signal-green" />
            status: green (honestly)
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                aria-current={active ? "page" : undefined}
                className={`rounded-full px-3 py-2 text-sm font-semibold transition ${
                  active
                    ? "-rotate-2 bg-sticky-yellow text-ink shadow-[2px_2px_0_var(--ink)]"
                    : "text-ink-muted hover:-rotate-1 hover:bg-surface hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/#newsletter" className="hidden items-center px-2 text-sm font-semibold text-ink-muted hover:text-ink lg:inline-flex">
            Subscribe
          </Link>
          {user ? (
            <>
              <Link href="/me" className="ml-1 max-w-28 truncate px-2 text-sm font-semibold text-ink">
                {firstName}
              </Link>
              <form action={logout}>
                <button type="submit" className="px-2 text-sm font-semibold text-ink-muted hover:text-ink">
                  Sign out
                </button>
              </form>
              <Link href="/write" className="btn-primary ml-1 !min-h-9 !px-4 !text-sm">
                Write
              </Link>
            </>
          ) : (
            <Link href="/login" className="btn-primary ml-2 !min-h-9 !px-4 !text-sm">
              Sign in
            </Link>
          )}
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border-[1.5px] border-ink bg-surface px-4 py-2 text-sm font-semibold text-ink shadow-[2px_2px_0_var(--ink)] md:hidden"
          aria-expanded={open}
          aria-controls="mobile-nav"
          onClick={() => setOpen((value) => !value)}
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open ? (
        <nav
          id="mobile-nav"
          className="border-t-[1.5px] border-ink/90 bg-bg px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => {
              const active = pathname === link.href || pathname?.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={`font-display block rounded-xl px-3 py-2.5 text-2xl font-bold tracking-[-0.02em] ${
                      active ? "bg-sticky-yellow text-ink" : "text-ink-muted hover:bg-surface hover:text-ink"
                    }`}
                    onClick={() => setOpen(false)}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
            {user ? (
              <li>
                <Link
                  href="/me"
                  className="font-display block rounded-xl px-3 py-2.5 text-2xl font-bold tracking-[-0.02em] text-ink-muted hover:bg-surface hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {user.name}
                </Link>
              </li>
            ) : null}
            <li className="pt-2">
              <Link
                href="/#newsletter"
                className="block rounded-xl px-3 py-2 text-sm font-semibold text-ink-muted hover:bg-surface hover:text-ink"
                onClick={() => setOpen(false)}
              >
                Subscribe
              </Link>
            </li>
            <li className="flex flex-col gap-3 pt-3">
              {user ? (
                <>
                  <Link href="/write" className="btn-primary w-full" onClick={() => setOpen(false)}>
                    Write
                  </Link>
                  <form action={logout}>
                    <button type="submit" className="btn-secondary w-full">
                      Sign out
                    </button>
                  </form>
                </>
              ) : (
                <Link href="/login" className="btn-primary w-full" onClick={() => setOpen(false)}>
                  Sign in
                </Link>
              )}
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
