import type { EventItem, SiteSettings } from "@/lib/types";

export { articles } from "./articles";
export { kritiThakur } from "./author";
export { resources } from "./resources";

export const siteSettings: SiteSettings = {
  siteTitle: "TPM Collective",
  tagline: "Think. Connect. Lead.",
  mission:
    "A professional destination for Technical Program Managers — sharpening practice through thoughtful writing, curated resources, and real gatherings.",
  newsletterBlurb:
    "One clear signal in your inbox: field notes and frameworks for people who run complex technical programs.",
};

/** Real events only — left empty until gatherings are scheduled. */
export const events: EventItem[] = [];
