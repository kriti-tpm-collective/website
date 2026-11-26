export type RichBlock =
  | { type: "p"; text: string }
  | { type: "h3"; text: string }
  | { type: "quote"; text: string }
  | { type: "ul"; items: string[] }
  | { type: "ol"; items: string[]; variant?: "ladder" | "default" }
  | { type: "table"; headers: string[]; rows: string[][] };

export type OverviewGuide = {
  id: string;
  slug: string;
  title: string;
  blocks: RichBlock[];
};

export type PillarSkillSummary = {
  id: string;
  code: string;
  title: string;
  slug: string;
  oneliner: string;
};

export type Pillar = {
  id: string;
  letter: string;
  name: string;
  question: string;
  lead: string;
  skills: PillarSkillSummary[];
};

export type SkillSection =
  | {
      n: number;
      kind: "probe";
      heading: string;
      paragraphs?: string[];
      items?: string[];
    }
  | {
      n: number;
      kind: "principles";
      heading: string;
      items: string[];
    }
  | {
      n: number;
      kind: "dodont";
      heading: string;
      dos: string[];
      donts: string[];
      redFlag?: string | null;
    }
  | {
      n: number;
      kind: "tools";
      heading: string;
      table: { headers: string[]; rows: string[][] } | null;
      notes?: string[];
    }
  | {
      n: number;
      kind: "metrics" | "wrong";
      heading: string;
      items: string[];
    }
  | {
      n: number;
      kind: "grows";
      heading: string;
      levels: { title: string; text: string; target?: boolean }[];
    }
  | {
      n: number;
      kind: "answer";
      heading: string;
      prompt?: string;
      answer: string;
    }
  | {
      n: number;
      kind: "followups";
      heading: string;
      followups: { question: string; angle: string }[];
    }
  | {
      n: number;
      kind: "ops";
      heading: string;
      ops: { label: string; text: string; amazon?: boolean }[];
    };

export type SkillChapter = {
  id: string;
  code: string;
  pillar: string;
  title: string;
  oneliner: string;
  slug: string;
  sections: SkillSection[];
};

export type Playbook = {
  meta: {
    title: string;
    subtitle: string;
    eyebrow?: string;
    layers: { title: string; blurb: string; active: boolean }[];
  };
  overviews: OverviewGuide[];
  pillars: Pillar[];
  chapters: SkillChapter[];
};
