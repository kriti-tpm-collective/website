import { defineArrayMember, defineField, defineType } from "sanity";

export const resource = defineType({
  name: "resource",
  title: "Resource",
  type: "document",
  fields: [
    defineField({ name: "title", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "slug",
      type: "slug",
      options: { source: "title" },
      validation: (r) => r.required(),
    }),
    defineField({ name: "summary", type: "text", rows: 3, validation: (r) => r.required() }),
    defineField({
      name: "category",
      type: "string",
      options: {
        list: ["Templates", "Frameworks", "Guides", "Reading lists", "Tools"],
      },
      validation: (r) => r.required(),
    }),
    defineField({ name: "url", type: "url" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "body",
      type: "array",
      of: [
        defineArrayMember({
          type: "block",
          styles: [
            { title: "Normal", value: "normal" },
            { title: "H2", value: "h2" },
            { title: "H3", value: "h3" },
            { title: "Quote", value: "blockquote" },
          ],
        }),
      ],
      validation: (r) => r.required(),
    }),
  ],
});
