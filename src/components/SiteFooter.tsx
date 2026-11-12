import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t border-line bg-surface">
      <div className="container-page grid gap-10 py-14 md:grid-cols-[1.5fr_1fr]">
        <div>
          <p className="text-base font-semibold tracking-[-0.02em] text-brand">
            TPM Collective
          </p>
          <p className="mt-3 max-w-md text-sm leading-relaxed text-ink-muted">
            Think. Connect. Lead. A professional home for Technical Program Managers.
          </p>
        </div>
        <div className="grid grid-cols-2 gap-8 text-sm">
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-xs font-medium tracking-[0.04em] text-ink-faint uppercase">
              Explore
            </p>
            <Link href="/articles" className="text-ink-muted transition hover:text-ink">
              Articles
            </Link>
            <Link href="/events" className="text-ink-muted transition hover:text-ink">
              Events
            </Link>
            <Link href="/resources" className="text-ink-muted transition hover:text-ink">
              Resources
            </Link>
            <Link href="/about" className="text-ink-muted transition hover:text-ink">
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2.5">
            <p className="mb-1 text-xs font-medium tracking-[0.04em] text-ink-faint uppercase">
              Connect
            </p>
            <Link href="/#newsletter" className="text-ink-muted transition hover:text-ink">
              Newsletter
            </Link>
            <a
              href="mailto:hello@tpmcollective.org"
              className="text-ink-muted transition hover:text-ink"
            >
              hello@tpmcollective.org
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-line">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© 2026 TPM Collective</p>
          <p>Built for practitioners who lead complex technical programs.</p>
        </div>
      </div>
    </footer>
  );
}
