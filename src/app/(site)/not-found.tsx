import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[60vh] max-w-2xl flex-col justify-center py-24">
      <p className="text-sm font-medium text-ink-faint">404</p>
      <h1 className="mt-3 text-4xl font-semibold tracking-[-0.035em] text-brand">
        Page not found
      </h1>
      <p className="mt-4 text-ink-muted">
        That page doesn’t exist — or it hasn’t been published yet.
      </p>
      <Link href="/" className="btn-primary mt-8 w-fit">
        Back home
      </Link>
    </div>
  );
}
