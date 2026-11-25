export function PageIntro({
  eyebrow,
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      {eyebrow ? (
        <p className="font-hand animate-fade-up inline-block -rotate-2 rounded-md bg-sticky-yellow px-3 py-0.5 text-2xl text-ink">
          {eyebrow}
        </p>
      ) : null}
      <h1 className="font-display animate-fade-up mt-4 text-5xl font-bold tracking-[-0.045em] text-ink md:text-6xl">
        {title}
      </h1>
      <p className="animate-fade-up-delay mt-5 text-lg leading-relaxed text-ink-muted md:text-xl">
        {description}
      </p>
    </div>
  );
}
