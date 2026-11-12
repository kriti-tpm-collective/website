import type { PortableBlock } from "@/lib/types";

type Mark = "strong" | "em";

export function paragraph(
  text: string,
  key: string,
  marks: Mark[] = [],
): PortableBlock {
  return {
    _type: "block",
    _key: key,
    style: "normal",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks }],
  };
}

export function heading(
  text: string,
  key: string,
  style: "h2" | "h3" = "h2",
): PortableBlock {
  return {
    _type: "block",
    _key: key,
    style,
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

export function quote(text: string, key: string): PortableBlock {
  return {
    _type: "block",
    _key: key,
    style: "blockquote",
    markDefs: [],
    children: [{ _type: "span", _key: `${key}-span`, text, marks: [] }],
  };
}

export function bullets(items: string[], keyPrefix: string): PortableBlock[] {
  return items.map((text, index) => ({
    _type: "block",
    _key: `${keyPrefix}-${index}`,
    style: "normal",
    listItem: "bullet" as const,
    level: 1,
    markDefs: [],
    children: [
      {
        _type: "span",
        _key: `${keyPrefix}-${index}-span`,
        text,
        marks: [],
      },
    ],
  }));
}
