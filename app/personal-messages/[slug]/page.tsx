import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";

import { getPersonalMessageBySlug } from "@/lib/wordpress";
import { Section, Container, Prose } from "@/components/craft";

export const dynamic = "force-dynamic";

export default async function PersonalMessagePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ error?: string }>;
}) {
  const { slug } = await params;
  const { error } = await searchParams;
  const message = await getPersonalMessageBySlug(slug);

  if (!message) {
    notFound();
  }

  const cookieKey = `pm_access_${slug}`;
  const isProtected = !!message.message_password;

  const cookieStore = await cookies();
  const hasAccess =
    !isProtected || cookieStore.get(cookieKey)?.value === "granted";

  async function unlockMessage(formData: FormData) {
    "use server";

    const entered = String(formData.get("password") ?? "").trim();
    const expected = message!.message_password?.trim() ?? "";
    const cookieStore = await cookies();

    if (entered !== expected) {
      cookieStore.delete({
        name: cookieKey,
        path: `/personal-messages/${slug}`,
      });
      return redirect(`/personal-messages/${slug}?error=invalid`);
    }

    cookieStore.set(cookieKey, "granted", {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: `/personal-messages/${slug}`,
      maxAge: 60 * 60 * 8,
    });

    return redirect(`/personal-messages/${slug}`);
  }

  if (!hasAccess) {
    return (
      <>
        <Container className="max-w-xl py-10">
          <div className="rounded-xl border bg-card p-6 sm:p-8">
            <Prose>
              <h2>Password Protected</h2>
              <p>Enter the password to read this message.</p>
            </Prose>

            <form action={unlockMessage} className="mt-6 space-y-4">
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
              {error === "invalid" && (
                <p className="text-sm text-destructive">
                  Incorrect password. Please try again.
                </p>
              )}
              <button
                type="submit"
                className="inline-flex h-10 items-center rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground"
              >
                View message
              </button>
            </form>
          </div>
        </Container>
      </>
    );
  }

  return (
    <main className="bg-[#f8f9fa] dark:bg-[#212529]">
      <Container className="min-h-screen pb-16">
        <Prose className="text-[#212529] dark:text-white prose-lg max-w-2xl">
          <h1 dangerouslySetInnerHTML={{ __html: message.title.rendered }} />
          <hr className="my-6 border-t-[#848687]! dark:border-t-[#495057]!" />
          <div
            className="prose prose-lg dark:prose-invert"
            dangerouslySetInnerHTML={{ __html: message.content.rendered }}
          />
        </Prose>
      </Container>
    </main>
  );
}
