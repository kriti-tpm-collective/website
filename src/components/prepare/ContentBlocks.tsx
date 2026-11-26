import { RichText } from "@/components/prepare/RichText";
import type { RichBlock } from "@/content/prepare/types";

export function ContentBlocks({ blocks }: { blocks: RichBlock[] }) {
  return (
    <div className="space-y-6">
      {blocks.map((block, index) => (
        <Block key={`${block.type}-${index}`} block={block} />
      ))}
    </div>
  );
}

function Block({ block }: { block: RichBlock }) {
  switch (block.type) {
    case "p":
      return (
        <p className="max-w-[46em] text-base leading-relaxed text-ink-muted md:text-lg">
          <RichText text={block.text} />
        </p>
      );
    case "h3":
      return (
        <h3 className="font-display text-2xl font-bold tracking-[-0.03em] text-ink">
          <RichText text={block.text} />
        </h3>
      );
    case "quote":
      return (
        <blockquote className="rounded-2xl border-[1.5px] border-ink/15 bg-surface px-5 py-4 font-serif text-lg leading-relaxed text-ink md:px-6">
          <RichText text={block.text} />
        </blockquote>
      );
    case "ul":
      return (
        <ul className="max-w-[46em] list-disc space-y-2 pl-5 text-base leading-relaxed text-ink-muted marker:text-accent md:text-lg">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ul>
      );
    case "ol":
      if (block.variant === "ladder") {
        return (
          <ol className="space-y-3">
            {block.items.map((item, index) => (
              <li
                key={item}
                className="flex gap-4 rounded-2xl border-[1.5px] border-ink/12 bg-surface p-4 md:p-5"
              >
                <span className="font-display flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-ink bg-brand text-sm font-bold text-white">
                  {index + 1}
                </span>
                <p className="pt-1 text-base leading-relaxed text-ink-muted md:text-lg">
                  <RichText text={item} />
                </p>
              </li>
            ))}
          </ol>
        );
      }
      return (
        <ol className="max-w-[46em] list-decimal space-y-2 pl-5 text-base leading-relaxed text-ink-muted md:text-lg">
          {block.items.map((item) => (
            <li key={item}>
              <RichText text={item} />
            </li>
          ))}
        </ol>
      );
    case "table":
      return <DataTable headers={block.headers} rows={block.rows} />;
    default:
      return null;
  }
}

export function DataTable({
  headers,
  rows,
}: {
  headers: string[];
  rows: string[][];
}) {
  return (
    <div className="overflow-x-auto rounded-2xl border-[1.5px] border-ink/90 bg-surface shadow-[3px_3px_0_var(--ink)]">
      <table className="w-full min-w-[36rem] border-collapse text-left text-sm md:text-[15px]">
        <thead>
          <tr className="bg-brand text-white">
            {headers.map((header) => (
              <th
                key={header}
                className="px-3.5 py-3 font-semibold tracking-[-0.01em] first:rounded-tl-[14px] last:rounded-tr-[14px]"
              >
                <RichText text={header} />
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className="border-t border-ink/10 odd:bg-bg/50 even:bg-surface"
            >
              {row.map((cell, cellIndex) => (
                <td
                  key={`${rowIndex}-${cellIndex}`}
                  className={`px-3.5 py-3 align-top leading-relaxed text-ink-muted ${
                    cellIndex === 0 ? "font-semibold text-ink" : ""
                  }`}
                >
                  <RichText text={cell} />
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
