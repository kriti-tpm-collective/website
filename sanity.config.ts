"use client";

import { visionTool } from "@sanity/vision";
import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { schemaTypes } from "./sanity/schemaTypes";

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "placeholder";
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";

export default defineConfig({
  name: "tpm-collective",
  title: "TPM Collective",
  projectId,
  dataset,
  basePath: "/studio",
  plugins: [
    structureTool({
      structure: (S) =>
        S.list()
          .title("Content")
          .items([
            S.listItem()
              .title("Site Settings")
              .child(
                S.document()
                  .schemaType("siteSettings")
                  .documentId("siteSettings"),
              ),
            S.divider(),
            S.documentTypeListItem("article").title("Articles"),
            S.documentTypeListItem("event").title("Events"),
            S.documentTypeListItem("resource").title("Resources"),
            S.divider(),
            S.documentTypeListItem("author").title("Authors"),
            S.documentTypeListItem("topic").title("Topics"),
          ]),
    }),
    visionTool(),
  ],
  schema: { types: schemaTypes },
});
