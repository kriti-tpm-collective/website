import type { Article } from "@/lib/types";
import { roadmapsArePromises } from "./roadmaps-are-promises";
import { runningAiPrograms } from "./running-ai-programs";
import { statusUpdatesThatCreateClarity } from "./status-updates-that-create-clarity";
import { theAlignmentTax } from "./the-alignment-tax";
import { theCraftBetweenTheOrgs } from "./the-craft-between-the-orgs";
import { treatRiskLikeAProductSurface } from "./treat-risk-like-a-product-surface";

export const articles: Article[] = [
  statusUpdatesThatCreateClarity,
  theAlignmentTax,
  treatRiskLikeAProductSurface,
  roadmapsArePromises,
  runningAiPrograms,
  theCraftBetweenTheOrgs,
];
