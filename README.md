# TPM Collective — Website

Professional destination for Technical Program Managers.

**Think. Connect. Lead.**

## Stack

- **Next.js** (App Router) on **Vercel**
- **Tailwind CSS** for design system
- **Sanity** for publishing (Studio at `/studio`)
- Seed content ships locally so the site is usable before CMS credentials are connected

## Getting started

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Connect Sanity (publishing without code)

1. Create a free project at [sanity.io/manage](https://www.sanity.io/manage)
2. Copy `.env.example` → `.env.local` and set:

```bash
NEXT_PUBLIC_SANITY_PROJECT_ID=yourProjectId
NEXT_PUBLIC_SANITY_DATASET=production
```

3. Run `npx sanity@latest login` if needed, then open `/studio` to publish articles, events, and resources.

Content schemas are already defined for Articles, Events, Resources, Authors, Topics, and Site Settings.

> Until Sanity is connected, the public site reads from local seed content in `src/content/seed.ts`.

## Newsletter

Set `BUTTONDOWN_API_KEY` in `.env.local` to send subscribers to [Buttondown](https://buttondown.com). Without it, signups are validated and logged (useful for local development).

## Deploy on Vercel

1. Import this GitHub repository in Vercel
2. Add environment variables from `.env.example`
3. Set the domain to `www.tpmcollective.org`
4. Deploy

## Scripts

| Command        | Purpose                |
| -------------- | ---------------------- |
| `npm run dev`  | Local development      |
| `npm run build`| Production build       |
| `npm run start`| Run production server  |
| `npm run lint` | ESLint                 |
