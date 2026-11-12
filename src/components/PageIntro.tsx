export function PageIntro({
  title,
  description,
}: {
  eyebrow?: string;
  title: string;
  description: string;
}) {
  return (
    <div className="max-w-2xl">
      <h1 className="animate-fade-up text-4xl font-semibold tracking-[-0.035em] text-brand md:text-5xl">
        {title}
      </h1>
      <p className="animate-fade-up-delay mt-4 text-lg leading-relaxed text-ink-muted">
        {description}
      </p>
    </div>
  );
}
