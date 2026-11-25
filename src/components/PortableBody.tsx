import type { ReactNode } from "react";
import type { PortableBlock } from "@/lib/types";

function renderText(block: PortableBlock) {
  return block.children?.map((child) => {
    let content: ReactNode = child.text;
    if (child.marks?.includes("strong")) {
      content = <strong key={`${child._key}-strong`}>{content}</strong>;
    }
    if (child.marks?.includes("em")) {
      content = <em key={`${child._key}-em`}>{content}</em>;
    }
    return <span key={child._key}>{content}</span>;
  });
}

export function PortableBody({ value }: { value: PortableBlock[] }) {
  const elements: ReactNode[] = [];
  let listBuffer: PortableBlock[] = [];

  function flushList() {
    if (!listBuffer.length) return;
    const items = listBuffer;
    listBuffer = [];
    elements.push(
      <ul
        key={`list-${items[0]._key}`}
        className="my-6 list-disc space-y-2.5 pl-5 text-[1.05rem] leading-relaxed text-ink-muted"
      >
        {items.map((item) => (
          <li key={item._key}>{renderText(item)}</li>
        ))}
      </ul>,
    );
  }

  value.forEach((block) => {
    if (block.listItem === "bullet") {
      listBuffer.push(block);
      return;
    }

    flushList();
    const text = block.children?.map((child) => child.text).join("") ?? "";
    if (!text) return;

    if (block.style === "h2") {
      elements.push(
        <h2
          key={block._key}
          className="font-display mt-12 mb-4 text-3xl font-bold tracking-[-0.035em] text-ink"
        >
          {renderText(block)}
        </h2>,
      );
      return;
    }
    if (block.style === "h3") {
      elements.push(
        <h3
          key={block._key}
          className="font-display mt-10 mb-3 text-2xl font-bold tracking-[-0.025em] text-ink"
        >
          {renderText(block)}
        </h3>,
      );
      return;
    }
    if (block.style === "blockquote") {
      elements.push(
        <blockquote
          key={block._key}
          className="my-10 -rotate-[0.5deg] rounded-r-xl border-l-[5px] border-signal-amber bg-sticky-yellow/45 py-4 pr-5 pl-6 text-[1.3rem] leading-relaxed text-ink italic"
        >
          {renderText(block)}
        </blockquote>,
      );
      return;
    }

    elements.push(
      <p key={block._key} className="mb-5 text-[1.125rem] leading-[1.8] text-ink-muted">
        {renderText(block)}
      </p>,
    );
  });

  flushList();

  return <div className="font-serif">{elements}</div>;
}
