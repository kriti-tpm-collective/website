import Link from "next/link";

export function SiteFooter() {
  return (
    <footer className="mt-auto border-t-[1.5px] border-ink bg-surface">
      <div className="container-page pt-16 pb-10">
        <p className="font-display text-5xl leading-[0.95] font-bold tracking-[-0.05em] text-ink md:text-7xl">
          Think. Connect.{" "}
          <em className="font-serif font-normal tracking-[-0.03em] italic">Lead.</em>
        </p>
        <p className="font-hand mt-3 text-[1.75rem] text-ink-muted">
          a home for the people who make hard things move.
        </p>

        <div className="mt-14 grid gap-10 border-t border-dashed border-ink/25 pt-10 md:grid-cols-[1.5fr_1fr_1fr]">
          <div className="max-w-sm text-sm leading-relaxed text-ink-muted">
            <p>
              TPM Collective is a professional home for Technical Program Managers — written by a
              practitioner, for practitioners.
            </p>
            <p className="mt-3">
              This site has a clearly named owner and an honest status. We’d expect nothing less.
            </p>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <p className="font-display mb-1 text-lg font-bold text-ink">Explore</p>
            <Link href="/articles" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              Articles
            </Link>
            <Link href="/blogs" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              Blogs
            </Link>
            <Link href="/prepare" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              Prepare
            </Link>
            <Link href="/events" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              Events
            </Link>
            <Link href="/resources" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              Resources
            </Link>
            <Link href="/about" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              About
            </Link>
          </div>
          <div className="flex flex-col gap-2.5 text-sm">
            <p className="font-display mb-1 text-lg font-bold text-ink">Connect</p>
            <Link href="/#newsletter" className="w-fit text-ink-muted transition hover:text-ink hover:underline">
              Newsletter
            </Link>
            <a
              href="mailto:hello@tpmcollective.org"
              className="w-fit text-ink-muted transition hover:text-ink hover:underline"
            >
              hello@tpmcollective.org
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-ink/15">
        <div className="container-page flex flex-col gap-2 py-5 text-xs text-ink-faint md:flex-row md:items-center md:justify-between">
          <p>© 2026 TPM Collective</p>
          <p>Built between meetings. No Gantt charts were harmed.</p>
        </div>
      </div>
    </footer>
  );
}
