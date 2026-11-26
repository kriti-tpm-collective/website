"use server";

import { redirect, unstable_rethrow } from "next/navigation";
import { clearSession, createSession, hashPassword, safeRedirectPath, verifyPassword } from "@/lib/auth";
import { authenticate, createUser } from "@/lib/community-store";

export type ActionState = { error?: string } | undefined;

const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

function field(formData: FormData, name: string) {
  return String(formData.get(name) || "").trim();
}

export async function signup(_state: ActionState, formData: FormData): Promise<ActionState> {
  const name = field(formData, "name").replace(/\s+/g, " ");
  const email = field(formData, "email").toLowerCase();
  const password = String(formData.get("password") || "");

  if (name.length < 2 || name.length > 80) {
    return { error: "Name must be between 2 and 80 characters." };
  }
  if (!emailPattern.test(email) || email.length > 254) {
    return { error: "Enter a valid email address." };
  }
  if (password.length < 8) {
    return { error: "Password must be at least 8 characters." };
  }
  if (password.length > 200) {
    return { error: "Password is too long." };
  }

  try {
    const { hash, salt } = await hashPassword(password);
    const user = await createUser({ name, email, passwordHash: hash, passwordSalt: salt });
    await createSession(user.id);
  } catch (error) {
    unstable_rethrow(error);
    if (error instanceof Error && error.message === "EMAIL_TAKEN") {
      return { error: "An account with that email already exists. Sign in instead." };
    }
    return { error: "Could not create your account. Try again in a moment." };
  }

  redirect("/write");
}

export async function login(_state: ActionState, formData: FormData): Promise<ActionState> {
  const email = field(formData, "email").toLowerCase();
  const password = String(formData.get("password") || "");
  const next = safeRedirectPath(formData.get("next"));

  if (!emailPattern.test(email) || password.length < 1 || password.length > 200) {
    return { error: "Email or password is incorrect." };
  }

  try {
    const user = await authenticate(email, (record) => verifyPassword(password, record.passwordSalt, record.passwordHash));
    if (!user) return { error: "Email or password is incorrect." };
    await createSession(user.id);
  } catch (error) {
    unstable_rethrow(error);
    return { error: "Could not sign you in. Try again in a moment." };
  }

  redirect(next);
}

export async function logout() {
  await clearSession();
  redirect("/");
}
