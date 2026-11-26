import { mkdir, readFile, rename, writeFile } from "fs/promises";
import path from "path";
import { randomUUID } from "crypto";
import { readingMinutes, slugify } from "@/lib/story-text";

export type PublicUser = {
  id: string;
  name: string;
  email: string;
};

export type StoryAuthor = {
  id: string;
  name: string;
};

export type StorySummary = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
  readingTimeMinutes: number;
  author: StoryAuthor;
};

export type StoryView = StorySummary & {
  body: string;
};

type UserRecord = PublicUser & {
  passwordHash: string;
  passwordSalt: string;
  createdAt: string;
};

type StoryRecord = {
  id: string;
  slug: string;
  title: string;
  subtitle: string;
  body: string;
  authorId: string;
  status: "draft" | "published";
  createdAt: string;
  updatedAt: string;
  publishedAt: string | null;
};

type Db = {
  users: UserRecord[];
  stories: StoryRecord[];
};

const dataDir = path.join(process.cwd(), "data");
const dbPath = path.join(dataDir, "community.json");

let chain: Promise<void> = Promise.resolve();

function emptyDb(): Db {
  return { users: [], stories: [] };
}

async function load(): Promise<Db> {
  try {
    const raw = await readFile(dbPath, "utf8");
    if (!raw.trim()) return emptyDb();
    const parsed = JSON.parse(raw) as Partial<Db>;
    return {
      users: Array.isArray(parsed.users) ? parsed.users : [],
      stories: Array.isArray(parsed.stories) ? parsed.stories : [],
    };
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code === "ENOENT") return emptyDb();
    throw error;
  }
}

async function persist(db: Db) {
  await mkdir(dataDir, { recursive: true });
  const tmp = `${dbPath}.tmp`;
  await writeFile(tmp, JSON.stringify(db, null, 2), "utf8");
  await rename(tmp, dbPath);
}

function updateDb<T>(fn: (db: Db) => T): Promise<T> {
  const run = chain.then(async () => {
    const db = await load();
    const result = fn(db);
    await persist(db);
    return result;
  });
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function readDb(): Promise<Db> {
  const run = chain.then(() => load());
  chain = run.then(
    () => undefined,
    () => undefined,
  );
  return run;
}

function toAuthor(user: UserRecord): StoryAuthor {
  return { id: user.id, name: user.name };
}

function toSummary(story: StoryRecord, author: UserRecord): StorySummary {
  return {
    id: story.id,
    slug: story.slug,
    title: story.title,
    subtitle: story.subtitle,
    status: story.status,
    createdAt: story.createdAt,
    updatedAt: story.updatedAt,
    publishedAt: story.publishedAt,
    readingTimeMinutes: readingMinutes(story.body),
    author: toAuthor(author),
  };
}

function toView(story: StoryRecord, author: UserRecord): StoryView {
  return { ...toSummary(story, author), body: story.body };
}

function uniqueSlug(base: string, stories: StoryRecord[], ignoreId?: string) {
  const taken = (slug: string) => stories.some((story) => story.slug === slug && story.id !== ignoreId);
  if (!taken(base)) return base;
  let n = 2;
  while (taken(`${base}-${n}`)) n += 1;
  return `${base}-${n}`;
}

function requireAuthor(db: Db, authorId: string) {
  const author = db.users.find((user) => user.id === authorId);
  if (!author) throw new Error("Account not found.");
  return author;
}

export async function createUser(input: {
  name: string;
  email: string;
  passwordHash: string;
  passwordSalt: string;
}): Promise<PublicUser> {
  return updateDb((db) => {
    const email = input.email.toLowerCase();
    if (db.users.some((user) => user.email === email)) {
      throw new Error("EMAIL_TAKEN");
    }
    const user: UserRecord = {
      id: randomUUID(),
      name: input.name,
      email,
      passwordHash: input.passwordHash,
      passwordSalt: input.passwordSalt,
      createdAt: new Date().toISOString(),
    };
    db.users.push(user);
    return { id: user.id, name: user.name, email: user.email };
  });
}

export async function authenticate(email: string, passwordHashCheck: (user: { passwordHash: string; passwordSalt: string }) => Promise<boolean>): Promise<PublicUser | null> {
  const db = await readDb();
  const user = db.users.find((entry) => entry.email === email.toLowerCase());
  if (!user) return null;
  const ok = await passwordHashCheck(user);
  if (!ok) return null;
  return { id: user.id, name: user.name, email: user.email };
}

export async function findUserById(id: string): Promise<PublicUser | null> {
  const db = await readDb();
  const user = db.users.find((entry) => entry.id === id);
  if (!user) return null;
  return { id: user.id, name: user.name, email: user.email };
}

export async function getAuthor(id: string): Promise<StoryAuthor | null> {
  const user = await findUserById(id);
  if (!user) return null;
  return { id: user.id, name: user.name };
}

export async function listPublishedStories(): Promise<StorySummary[]> {
  const db = await readDb();
  return db.stories
    .filter((story) => story.status === "published")
    .map((story) => {
      const author = db.users.find((user) => user.id === story.authorId);
      return author ? toSummary(story, author) : null;
    })
    .filter((story): story is StorySummary => story !== null)
    .sort((a, b) => new Date(b.publishedAt ?? b.updatedAt).getTime() - new Date(a.publishedAt ?? a.updatedAt).getTime());
}

export async function listStoriesByAuthor(authorId: string, publishedOnly = false): Promise<StorySummary[]> {
  const db = await readDb();
  const author = db.users.find((user) => user.id === authorId);
  if (!author) return [];
  return db.stories
    .filter((story) => story.authorId === authorId && (!publishedOnly || story.status === "published"))
    .map((story) => toSummary(story, author))
    .sort((a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime());
}

export async function getStoryBySlug(slug: string, viewerId?: string): Promise<StoryView | null> {
  const db = await readDb();
  const story = db.stories.find((entry) => entry.slug === slug);
  if (!story) return null;
  if (story.status !== "published" && story.authorId !== viewerId) return null;
  const author = db.users.find((user) => user.id === story.authorId);
  if (!author) return null;
  return toView(story, author);
}

export async function getStoryById(id: string, authorId: string): Promise<StoryView | null> {
  const db = await readDb();
  const story = db.stories.find((entry) => entry.id === id && entry.authorId === authorId);
  if (!story) return null;
  const author = requireAuthor(db, authorId);
  return toView(story, author);
}

export async function saveStory(input: {
  id?: string;
  authorId: string;
  title: string;
  subtitle: string;
  body: string;
  status: "draft" | "published";
}): Promise<StoryView> {
  return updateDb((db) => {
    const author = requireAuthor(db, input.authorId);
    const now = new Date().toISOString();

    if (input.id) {
      const story = db.stories.find((entry) => entry.id === input.id);
      if (!story || story.authorId !== input.authorId) {
        throw new Error("You can only edit your own stories.");
      }
      story.title = input.title;
      story.subtitle = input.subtitle;
      story.body = input.body;
      story.updatedAt = now;
      if (!story.publishedAt) {
        story.slug = uniqueSlug(slugify(input.title), db.stories, story.id);
      }
      if (input.status === "published") {
        story.status = "published";
        story.publishedAt = story.publishedAt ?? now;
      } else {
        story.status = "draft";
      }
      return toView(story, author);
    }

    const story: StoryRecord = {
      id: randomUUID(),
      slug: uniqueSlug(slugify(input.title), db.stories),
      title: input.title,
      subtitle: input.subtitle,
      body: input.body,
      authorId: input.authorId,
      status: input.status,
      createdAt: now,
      updatedAt: now,
      publishedAt: input.status === "published" ? now : null,
    };
    db.stories.push(story);
    return toView(story, author);
  });
}

export async function deleteStory(id: string, authorId: string): Promise<{ slug: string }> {
  return updateDb((db) => {
    const story = db.stories.find((entry) => entry.id === id);
    if (!story || story.authorId !== authorId) {
      throw new Error("You can only delete your own stories.");
    }
    db.stories = db.stories.filter((entry) => entry.id !== id);
    return { slug: story.slug };
  });
}
