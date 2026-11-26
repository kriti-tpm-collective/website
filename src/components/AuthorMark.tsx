export function AuthorMark({ name, size = "md" }: { name: string; size?: "sm" | "md" }) {
  const letters = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
  const box = size === "sm" ? "h-8 w-8 text-xs" : "h-10 w-10 text-sm";

  return (
    <span
      className={`font-display grid ${box} shrink-0 place-items-center rounded-full border-[1.5px] border-ink bg-sticky-yellow font-bold text-ink`}
      aria-hidden="true"
    >
      {letters || "?"}
    </span>
  );
}
