import type { ReactNode } from "react";

type Block =
  | { type: "h2"; text: string; key: string }
  | { type: "quote"; text: string; key: string }
  | { type: "list"; items: string[]; key: string }
  | { type: "p"; text: string; key: string };

function renderInline(text: string, keyPrefix: string): ReactNode[] {
  const nodes: ReactNode[] = [];
  const pattern = /(\*\*[^*]+\*\*|\*[^*]+\*)/g;
  let last = 0;
  let match: RegExpExecArray | null;
  let index = 0;

  while ((match = pattern.exec(text))) {
    if (match.index > last) nodes.push(text.slice(last, match.index));
    const token = match[0];
    if (token.startsWith("**")) {
      nodes.push(<strong key={`${keyPrefix}-b-${index}`}>{token.slice(2, -2)}</strong>);
    } else {
      nodes.push(<em key={`${keyPrefix}-i-${index}`}>{token.slice(1, -1)}</em>);
    }
    last = match.index + token.length;
    index += 1;
  }

  if (last < text.length) nodes.push(text.slice(last));
  return nodes;
}

function parseStory(body: string): Block[] {
  return body
    .replace(/\r\n/g, "\n")
    .split(/\n{2,}/)
    .map((chunk, index) => {
      const text = chunk.trim();
      if (!text) return null;
      const key = String(index);
      if (text.startsWith("## ")) {
        return { type: "h2", text: text.replace(/^##\s+/, ""), key } satisfies Block;
      }
      const lines = text.split("\n");
      if (lines.every((line) => line.startsWith("> ") || line === ">")) {
        return {
          type: "quote",
          text: lines.map((line) => line.replace(/^>\s?/, "")).join("\n"),
          key,
        } satisfies Block;
      }
      if (lines.every((line) => /^[-*] /.test(line))) {
        return {
          type: "list",
          items: lines.map((line) => line.replace(/^[-*] /, "")),
          key,
        } satisfies Block;
      }
      return { type: "p", text, key } satisfies Block;
    })
    .filter((block): block is Block => block !== null);
}

export function StoryBody({ body }: { body: string }) {
  const blocks = parseStory(body);
  if (blocks.length === 0) return null;

  return (
    <div className="font-serif">
      {blocks.map((block) => {
        if (block.type === "h2") {
          return (
            <h2
              key={block.key}
              className="font-display mt-12 mb-4 text-3xl font-bold tracking-[-0.035em] text-ink"
            >
              {renderInline(block.text, block.key)}
            </h2>
          );
        }
        if (block.type === "quote") {
          return (
            <blockquote
              key={block.key}
              className="my-10 -rotate-[0.5deg] rounded-r-xl border-l-[5px] border-signal-amber bg-sticky-yellow/45 py-4 pr-5 pl-6 text-[1.3rem] leading-relaxed text-ink italic"
            >
              {renderInline(block.text, block.key)}
            </blockquote>
          );
        }
        if (block.type === "list") {
          return (
            <ul
              key={block.key}
              className="my-6 list-disc space-y-2.5 pl-5 text-[1.05rem] leading-relaxed text-ink-muted"
            >
              {block.items.map((item, index) => (
                <li key={`${block.key}-${index}`}>{renderInline(item, `${block.key}-${index}`)}</li>
              ))}
            </ul>
          );
        }
        return (
          <p key={block.key} className="mb-5 text-[1.125rem] leading-[1.8] whitespace-pre-line text-ink-muted">
            {renderInline(block.text, block.key)}
          </p>
        );
      })}
    </div>
  );
}
