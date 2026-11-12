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
    <header className="sticky top-0 z-50 border-b border-line bg-surface/90 backdrop-blur-md">
      <div className="container-page flex h-16 items-center justify-between gap-6">
        <Link
          href="/"
          className="flex items-center gap-2.5"
          onClick={() => setOpen(false)}
        >
          <Image
            src="/brand/tpm-collective-logo.png"
            alt="TPM Collective"
            width={36}
            height={36}
            className="h-9 w-9 rounded-md object-cover"
            priority
          />
          <span className="text-[15px] font-semibold tracking-[-0.02em] text-brand">
            TPM Collective
          </span>
        </Link>

        <nav className="hidden items-center gap-1 md:flex" aria-label="Primary">
          {links.map((link) => {
            const active =
              pathname === link.href || pathname?.startsWith(`${link.href}/`);
            return (
              <Link
                key={link.href}
                href={link.href}
                className={`rounded-full px-3.5 py-2 text-sm transition-colors ${
                  active
                    ? "bg-accent-soft font-medium text-brand"
                    : "text-ink-muted hover:bg-bg hover:text-ink"
                }`}
              >
                {link.label}
              </Link>
            );
          })}
          <Link href="/#newsletter" className="btn-primary ml-2 !min-h-9 !px-4 !text-sm">
            Subscribe
          </Link>
        </nav>

        <button
          type="button"
          className="inline-flex items-center justify-center rounded-full border border-line-strong px-3.5 py-2 text-sm font-medium text-ink md:hidden"
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
          className="border-t border-line bg-surface px-5 py-4 md:hidden"
          aria-label="Mobile"
        >
          <ul className="flex flex-col gap-1">
            {links.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  className="block rounded-lg px-3 py-2.5 text-ink-muted hover:bg-bg hover:text-ink"
                  onClick={() => setOpen(false)}
                >
                  {link.label}
                </Link>
              </li>
            ))}
            <li className="pt-2">
              <Link
                href="/#newsletter"
                className="btn-primary w-full"
                onClick={() => setOpen(false)}
              >
                Subscribe
              </Link>
            </li>
          </ul>
        </nav>
      ) : null}
    </header>
  );
}
