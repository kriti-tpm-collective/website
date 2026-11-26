import { createHmac, randomBytes, scrypt as scryptCallback, timingSafeEqual } from "crypto";
import { mkdir, readFile, writeFile } from "fs/promises";
import path from "path";
import { promisify } from "util";
import { cookies } from "next/headers";
import { findUserById, type PublicUser } from "@/lib/community-store";

const scrypt = promisify(scryptCallback);
const COOKIE = "tpm_session";
const FOURTEEN_DAYS_MS = 1000 * 60 * 60 * 24 * 14;

let cachedSecret: string | null = null;

async function getAuthSecret(): Promise<string> {
  if (cachedSecret) return cachedSecret;
  const fromEnv = process.env.AUTH_SECRET?.trim();
  if (fromEnv && fromEnv.length >= 16) {
    cachedSecret = fromEnv;
    return cachedSecret;
  }

  const secretPath = path.join(process.cwd(), "data", "session.secret");
  try {
    const existing = (await readFile(secretPath, "utf8")).trim();
    if (existing.length >= 16) {
      cachedSecret = existing;
      return cachedSecret;
    }
  } catch (error) {
    if ((error as NodeJS.ErrnoException).code !== "ENOENT") throw error;
  }

  const created = randomBytes(32).toString("hex");
  await mkdir(path.dirname(secretPath), { recursive: true });
  await writeFile(secretPath, created, { encoding: "utf8", mode: 0o600 });
  cachedSecret = created;
  return cachedSecret;
}

function sign(body: string, secret: string) {
  return createHmac("sha256", secret).update(body).digest("base64url");
}

export async function hashPassword(password: string) {
  const salt = randomBytes(16);
  const hash = (await scrypt(password, salt, 64)) as Buffer;
  return { salt: salt.toString("hex"), hash: hash.toString("hex") };
}

export async function verifyPassword(password: string, saltHex: string, expectedHex: string) {
  const hash = (await scrypt(password, Buffer.from(saltHex, "hex"), 64)) as Buffer;
  const expected = Buffer.from(expectedHex, "hex");
  if (hash.length !== expected.length) return false;
  return timingSafeEqual(hash, expected);
}

export function safeRedirectPath(value: unknown, fallback = "/write") {
  if (typeof value !== "string") return fallback;
  if (!value.startsWith("/") || value.startsWith("//") || value.includes("\\") || value.includes("://")) {
    return fallback;
  }
  if (value.startsWith("/login") || value.startsWith("/signup")) return fallback;
  return value;
}

function cookieOptions(expires: Date) {
  return {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax" as const,
    path: "/",
    expires,
  };
}

export async function createSession(userId: string) {
  const expires = new Date(Date.now() + FOURTEEN_DAYS_MS);
  const body = Buffer.from(JSON.stringify({ userId, exp: expires.getTime() })).toString("base64url");
  const token = `${body}.${sign(body, await getAuthSecret())}`;
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, token, cookieOptions(expires));
}

export async function clearSession() {
  const cookieStore = await cookies();
  cookieStore.set(COOKIE, "", { ...cookieOptions(new Date(0)), maxAge: 0 });
}

async function readSessionUserId(): Promise<string | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(COOKIE)?.value;
  if (!token) return null;
  const [body, signature] = token.split(".");
  if (!body || !signature) return null;

  const expected = sign(body, await getAuthSecret());
  const actualBuffer = Buffer.from(signature);
  const expectedBuffer = Buffer.from(expected);
  if (actualBuffer.length !== expectedBuffer.length || !timingSafeEqual(actualBuffer, expectedBuffer)) {
    return null;
  }

  try {
    const payload = JSON.parse(Buffer.from(body, "base64url").toString()) as { userId?: string; exp?: number };
    if (!payload.userId || !payload.exp || payload.exp < Date.now()) return null;
    return payload.userId;
  } catch {
    return null;
  }
}

export async function getCurrentUser(): Promise<PublicUser | null> {
  const userId = await readSessionUserId();
  if (!userId) return null;
  return findUserById(userId);
}
