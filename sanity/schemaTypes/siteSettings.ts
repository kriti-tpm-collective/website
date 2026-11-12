import { defineField, defineType } from "sanity";

export const siteSettings = defineType({
  name: "siteSettings",
  title: "Site Settings",
  type: "document",
  fields: [
    defineField({ name: "siteTitle", type: "string", initialValue: "TPM Collective" }),
    defineField({ name: "tagline", type: "string", initialValue: "Think. Connect. Lead." }),
    defineField({ name: "mission", type: "text", rows: 4 }),
    defineField({ name: "newsletterBlurb", type: "text", rows: 3 }),
  ],
});
