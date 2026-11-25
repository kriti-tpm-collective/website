import Link from "next/link";

export default function NotFound() {
  return (
    <div className="container-page flex min-h-[65vh] max-w-2xl flex-col justify-center py-24">
      <p className="font-hand inline-block w-fit -rotate-2 rounded-md bg-sticky-pink px-3 py-0.5 text-2xl text-ink">
        404 · status: descoped
      </p>
      <h1 className="font-display mt-5 text-5xl font-bold tracking-[-0.045em] text-ink md:text-6xl">
        This page got{" "}
        <em className="font-serif font-normal italic">cut from scope.</em>
      </h1>
      <p className="mt-5 text-lg leading-relaxed text-ink-muted">
        It was on the roadmap. Then priorities shifted. Either it doesn’t exist, or it hasn’t been
        published yet.
      </p>
      <Link href="/" className="btn-primary mt-9 w-fit">
        Back to the plan of record
      </Link>
    </div>
  );
}
