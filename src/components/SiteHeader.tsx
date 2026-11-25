"use client";

import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";

const links = [
  { href: "/articles", label: "Articles" },
  { href: "/events", label: "Events" },
  { href: "/resources", label: "Resources" },
  { href: "/about", label: "About" },
];

export function SiteHeader() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 border-b-[1.5px] border-ink/90 bg-bg/85 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link href="/" className="group flex items-center gap-2.5" onClick={() => setOpen(false)}>
          <Image
            src="/brand/tpm-collective-logo.png"
            alt="TPM Collective"
            width={36}
            height={36}
            className="hover-wiggle h-9 w-9 rounded-lg border-[1.5px] border-ink object-cover"
            priority
          />
          <span className="font-display text-[17px] font-bold tracking-[-0.03em] text-ink">
            TPM Collective
          </span>
          <span
            className="hidden items-center gap-1.5 rounded-full border border-ink/15 bg-surface px-2 py-0.5 text-[11px] font-semibold text-ink-muted lg:inline-flex"
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
                className={`rounded-full px-3.5 py-2 text-sm font-semibold transition ${
                  active
                    ? "-rotate-2 bg-sticky-yellow text-ink shadow-[2px_2px_0_var(--ink)]"
                    : "text-ink-muted hover:-rotate-1 hover:bg-surface hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/#newsletter" className="btn-primary ml-3 !min-h-9 !px-4 !text-sm">
            Subscribe
          </Link>
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
            <li className="pt-3">
              <Link href="/#newsletter" className="btn-primary w-full" onClick={() => setOpen(false)}>
                Subscribe
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
