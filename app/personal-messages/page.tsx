import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";

import { getPersonalMessages } from "@/lib/wordpress";
import { stripHtml } from "@/lib/metadata";
import { Section, Container, Prose } from "@/components/craft";

import type { Metadata } from "next";

const AUTH_COOKIE = "personal_messages_auth";

export const dynamic = "force-dynamic";

export const metadata: Metadata = {
  title: "Personal Messages",
  description: "Browse personal messages from WordPress.",
  alternates: {
    canonical: "/personal-messages",
  },
};

async function unlockPersonalMessages(formData: FormData) {
  "use server";

  const expectedPassword = process.env.PERSONAL_MESSAGES_PASSWORD;
  const enteredPassword = String(formData.get("password") ?? "").trim();
  const cookieStore = await cookies();

  if (!expectedPassword) {
    cookieStore.delete({ name: AUTH_COOKIE, path: "/personal-messages" });
    return redirect("/personal-messages?error=config");
  }

  if (enteredPassword !== expectedPassword.trim()) {
    cookieStore.delete({ name: AUTH_COOKIE, path: "/personal-messages" });
    return redirect("/personal-messages?error=invalid");
  }

  cookieStore.set(AUTH_COOKIE, "1", {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/personal-messages",
    maxAge: 60 * 60 * 8,
  });

  return redirect("/personal-messages");
}

async function lockPersonalMessages() {
  "use server";
  const cookieStore = await cookies();
  cookieStore.delete({ name: AUTH_COOKIE, path: "/personal-messages" });
  return redirect("/personal-messages");
}

export default async function PersonalPage({
  searchParams,
}: {
  searchParams: Promise<{ error?: string }>;
}) {
  const params = await searchParams;
  const cookieStore = await cookies();
  const isAuthorized = cookieStore.get(AUTH_COOKIE)?.value === "1";

  if (!isAuthorized) {
    const errorMessage =
      params.error === "config"
        ? "This page password is not configured. Set PERSONAL_MESSAGES_PASSWORD in your environment."
        : params.error === "invalid"
          ? "Incorrect password. Please try again."
          : null;

    return (
      <Section>
        <Container className="max-w-xl py-10">
          <div className="rounded-xl border bg-card p-6 sm:p-8">
            <Prose>
              <h2>Protected Page</h2>
              <p>Enter the password to access personal messages.</p>
            </Prose>

            <form action={unlockPersonalMessages} className="mt-6 space-y-4">
              <label htmlFor="password" className="block text-sm font-medium">
                Password
              </label>
              <input
                id="password"
                name="password"
                type="password"
                required
                className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              />
              {errorMessage ? (
                <p className="text-sm text-destructive">{errorMessage}</p>
              ) : null}
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                Unlock
              </button>
            </form>
          </div>
        </Container>
      </Section>
    );
  }

  const messages = await getPersonalMessages();

  return (
    <Section>
      <Container className="space-y-6">
        <div className="flex items-center justify-between gap-4">
          <Prose>
            <h2>Personal Messages</h2>
            <p className="text-muted-foreground">
              {messages.length} {messages.length === 1 ? "message" : "messages"}
            </p>
          </Prose>

          <form action={lockPersonalMessages}>
            <button
              type="submit"
              className="inline-flex h-10 items-center rounded-md border px-4 text-sm font-medium"
            >
              Lock
            </button>
          </form>
        </div>

        {messages.length > 0 ? (
          <div className="space-y-4">
            {messages.map((msg) => (
              <article key={msg.id} className="rounded-lg border p-4 sm:p-6">
                <h3 className="mb-3 text-xl font-semibold">
                  <Link
                    href={`/personal-messages/${msg.slug}`}
                    className="hover:underline"
                    dangerouslySetInnerHTML={{ __html: msg.title.rendered }}
                  />
                </h3>
                <p className="mb-4 text-muted-foreground">
                  {stripHtml(msg.content.rendered).slice(0, 180)}
                  {stripHtml(msg.content.rendered).length > 180 ? "..." : ""}
                </p>
                <Link
                  href={`/personal-messages/${msg.slug}`}
                  className="text-sm font-medium text-primary hover:underline"
                >
                  Read message
                </Link>
              </article>
            ))}
          </div>
        ) : (
          <div className="rounded-lg border bg-accent/25 p-8 text-center">
            <p className="text-muted-foreground">
              No personal messages available yet.
            </p>
          </div>
        )}
      </Container>
    </Section>
  );
}
