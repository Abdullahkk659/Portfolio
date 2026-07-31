import { NextResponse } from "next/server";
import { z } from "zod";
import { Resend } from "resend";

export const runtime = "nodejs";

const Payload = z.object({
  name: z.string().trim().min(1, "Add your name.").max(80),
  email: z.string().trim().email("That email doesn't look right."),
  message: z.string().trim().min(10, "Tell me a bit more — 10 characters minimum.").max(2000),
  company: z.string().optional(), // honeypot
});

/**
 * Optional rate limiting. Without Upstash env vars the route still works,
 * it just doesn't throttle — fine for local development.
 */
async function limited(ip: string): Promise<boolean> {
  if (!process.env.UPSTASH_REDIS_REST_URL || !process.env.UPSTASH_REDIS_REST_TOKEN) return false;
  const { Ratelimit } = await import("@upstash/ratelimit");
  const { Redis } = await import("@upstash/redis");
  const ratelimit = new Ratelimit({
    redis: Redis.fromEnv(),
    limiter: Ratelimit.slidingWindow(3, "10 m"),
    prefix: "portfolio:contact",
  });
  const { success } = await ratelimit.limit(ip);
  return !success;
}

export async function POST(req: Request) {
  const ip = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() ?? "unknown";

  let parsed;
  try {
    parsed = Payload.safeParse(await req.json());
  } catch {
    return NextResponse.json({ error: "Send valid JSON." }, { status: 400 });
  }

  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Check the form and try again." },
      { status: 400 },
    );
  }

  // Silently accept honeypot submissions so bots don't learn anything.
  if (parsed.data.company) return NextResponse.json({ ok: true });

  if (await limited(ip)) {
    return NextResponse.json(
      { error: "That's a few messages already. Try again in a little while." },
      { status: 429 },
    );
  }

  const { name, email, message } = parsed.data;
  const key = process.env.RESEND_API_KEY;

  if (!key) {
    console.warn("[contact] RESEND_API_KEY missing — logging instead of sending", {
      name,
      email,
    });
    return NextResponse.json({ ok: true, delivered: false });
  }

  try {
    const resend = new Resend(key);
    await resend.emails.send({
      from: process.env.CONTACT_FROM_EMAIL!,
      to: process.env.CONTACT_TO_EMAIL!,
      replyTo: email,
      subject: `Portfolio — ${name}`,
      text: `From: ${name} <${email}>\nIP: ${ip}\n\n${message}`,
    });
    return NextResponse.json({ ok: true, delivered: true });
  } catch (err) {
    console.error("[contact] send failed", err);
    return NextResponse.json(
      { error: "The message didn't send. Email me directly and it'll reach me." },
      { status: 502 },
    );
  }
}
