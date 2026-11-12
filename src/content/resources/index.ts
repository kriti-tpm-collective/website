import type { Resource } from "@/lib/types";
import { essentialReading } from "./essential-reading";
import { outcomeBrief } from "./outcome-brief";
import { programDecisionLog } from "./program-decision-log";
import { raciLite } from "./raci-lite";
import { statusNarrativeGuide } from "./status-narrative-guide";

export const resources: Resource[] = [
  programDecisionLog,
  outcomeBrief,
  raciLite,
  statusNarrativeGuide,
  essentialReading,
];
