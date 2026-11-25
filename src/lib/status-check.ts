export type Rag = "green" | "amber" | "red";

export type Mood = "happy" | "worried" | "shocked" | "nervous";

export type StatusAssessment = {
  actual: Rag;
  isWatermelon: boolean;
  mood: Mood;
  title: string;
  body: string;
};

export const statusSignals = [
  "A date moved and nobody said it out loud",
  "Someone said “should be fine”",
  "A dependency is owned by “TBD”",
  "It’s been green for 8+ weeks straight",
  "The risks section just says “None”",
  "Leadership heard about an issue in a hallway first",
] as const;

const rank: Record<Rag, number> = { green: 0, amber: 1, red: 2 };

export function actualStatusFromSignals(signalCount: number): Rag {
  if (signalCount <= 0) return "green";
  if (signalCount <= 2) return "amber";
  return "red";
}

export function assessStatus(reported: Rag, signalCount: number): StatusAssessment {
  const actual = actualStatusFromSignals(signalCount);

  if (reported === "green" && actual === "red") {
    return {
      actual,
      isWatermelon: true,
      mood: "nervous",
      title: "Watermelon status.",
      body: "Green on the outside, red on the inside. Leadership will find out eventually — better from you, and better this week.",
    };
  }

  if (rank[reported] < rank[actual]) {
    return {
      actual,
      isWatermelon: false,
      mood: "worried",
      title: "A shade sunnier than reality.",
      body: "Your report is one color more hopeful than your signals. Close the gap before someone else does it for you.",
    };
  }

  if (rank[reported] > rank[actual]) {
    return {
      actual,
      isWatermelon: false,
      mood: "worried",
      title: "Sandbagging, maybe?",
      body: "Your signals look better than your report. Over-caution erodes trust too — just more slowly.",
    };
  }

  if (actual === "green") {
    return {
      actual,
      isWatermelon: false,
      mood: "happy",
      title: "Genuinely green.",
      body: "Screenshot this. It’s rarer than anyone admits.",
    };
  }

  if (actual === "amber") {
    return {
      actual,
      isWatermelon: false,
      mood: "worried",
      title: "Honest amber.",
      body: "Calling it early is the cheapest thing you’ll do all quarter.",
    };
  }

  return {
    actual,
    isWatermelon: false,
    mood: "shocked",
    title: "Honest red. Respect.",
    body: "Red isn’t failure. It’s a request for help that arrives in time to matter.",
  };
}
