import { defineArrayMember, defineField, defineType } from "sanity";

export const event = defineType({
  name: "event",
  title: "Event",
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
    defineField({ name: "startDate", type: "datetime", validation: (r) => r.required() }),
    defineField({ name: "endDate", type: "datetime" }),
    defineField({ name: "location", type: "string", validation: (r) => r.required() }),
    defineField({
      name: "locationType",
      type: "string",
      options: {
        list: [
          { title: "In person", value: "in-person" },
          { title: "Virtual", value: "virtual" },
          { title: "Hybrid", value: "hybrid" },
        ],
        layout: "radio",
      },
      initialValue: "in-person",
      validation: (r) => r.required(),
    }),
    defineField({ name: "registrationUrl", type: "url" }),
    defineField({ name: "featured", type: "boolean", initialValue: false }),
    defineField({
      name: "body",
      type: "array",
      of: [defineArrayMember({ type: "block" })],
    }),
  ],
  orderings: [
    {
      title: "Start date",
      name: "startDateAsc",
      by: [{ field: "startDate", direction: "asc" }],
    },
  ],
});
