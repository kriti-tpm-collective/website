import { NextResponse } from "next/server";

const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export async function POST(request: Request) {
  let body: unknown;

  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ message: "Invalid request." }, { status: 400 });
  }

  const email =
    typeof body === "object" &&
    body !== null &&
    "email" in body &&
    typeof (body as { email: unknown }).email === "string"
      ? (body as { email: string }).email.trim().toLowerCase()
      : "";

  if (!EMAIL_PATTERN.test(email)) {
    return NextResponse.json(
      { message: "Please enter a valid email address." },
      { status: 400 },
    );
  }

  const buttondownKey = process.env.BUTTONDOWN_API_KEY;

  if (buttondownKey) {
    const response = await fetch("https://api.buttondown.email/v1/emails/subscribers", {
      method: "POST",
      headers: {
        Authorization: `Token ${buttondownKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email_address: email, tags: ["tpm-collective-site"] }),
    });

    if (!response.ok && response.status !== 409) {
      return NextResponse.json(
        { message: "Unable to subscribe right now. Please try again soon." },
        { status: 502 },
      );
    }
  } else {
    // Local / pre-provider mode — durable provider wiring comes next via BUTTONDOWN_API_KEY
    console.info(`[newsletter] subscribed: ${email}`);
  }

  return NextResponse.json({
    message: "You're on the list. Welcome to TPM Collective.",
  });
}
