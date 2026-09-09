// app/personal-messages/[slug]/page.tsx

import { cookies } from "next/headers";
import { redirect, notFound } from "next/navigation";
import PageHeader from "@/components/pageHeader";

import {
  getPersonalMessageBySlug,
  validatePersonalMessagePassword,
  getProtectedPersonalMessageContent,
  getFeaturedMediaById,
} from "@/lib/wordpress";

import { stripHtml, generateContentMetadata } from "@/lib/metadata";
import { Container, Prose, Section } from "@/components/craft";

import type { Metadata } from "next";

export const dynamic = "force-dynamic";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;

  const message = await getPersonalMessageBySlug(slug);

  if (!message) {
    return {};
  }

  const title = stripHtml(message.title.rendered);

  const isProtected = message.password_protected;

  const contentText = stripHtml(message.content.rendered);

  const description = isProtected
    ? "Private message from Alfredo Rafael."
    : contentText.length > 200
      ? `${contentText.slice(0, 200)}...`
      : contentText;

  const featuredMedia = message.featured_media
    ? await getFeaturedMediaById(message.featured_media)
    : null;

  return generateContentMetadata({
    title,
    description,
    slug: message.slug,
    basePath: "personal-messages",
    image: featuredMedia?.source_url
      ? {
          url: featuredMedia.source_url,
          width: featuredMedia.media_details?.width,
          height: featuredMedia.media_details?.height,
          alt: featuredMedia.alt_text,
        }
      : undefined,
  });
}

export default async function PersonalMessagePage({
  params,
  searchParams,
}: {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{
    error?: string;
  }>;
}) {
  const { slug } = await params;

  const { error } = await searchParams;

  const message = await getPersonalMessageBySlug(slug);

  if (!message) {
    notFound();
  }

  const cookieKey = `pm_access_${slug}`;

  const isProtected = message.password_protected;

  const cookieStore = await cookies();

  const accessToken = cookieStore.get(cookieKey)?.value;

  /**
   * If this is a protected message and a token
   * exists, ask WordPress to validate the token
   * and return the protected content.
   */
  let protectedContent: string | null = null;

  let tokenIsValid = false;

  if (isProtected && accessToken) {
    const protectedResult = await getProtectedPersonalMessageContent(
      message.id,
      accessToken,
    );

    if (protectedResult.ok && protectedResult.data.success) {
      protectedContent = protectedResult.data.message.content.rendered;

      tokenIsValid = true;
    }
  }

  /**
   * Server action for unlocking the message.
   */
  async function unlockMessage(formData: FormData) {
    "use server";

    if (!message) {
      notFound();
    }

    const entered = String(formData.get("password") ?? "");

    if (!entered) {
      redirect(`/personal-messages/${slug}?error=invalid`);
    }

    const result = await validatePersonalMessagePassword(message.id, entered);

    if (!result.ok || !result.data.success) {
      const cookieStore = await cookies();

      cookieStore.delete({
        name: cookieKey,
        path: `/personal-messages/${slug}`,
      });

      redirect(`/personal-messages/${slug}?error=invalid`);
    }

    if (!result.data.password_required) {
      redirect(`/personal-messages/${slug}`);
    }

    const accessToken = result.data.access_token;

    const cookieStore = await cookies();

    cookieStore.set(cookieKey, accessToken, {
      httpOnly: true,
      sameSite: "lax",
      secure: process.env.NODE_ENV === "production",
      path: `/personal-messages/${slug}`,
      maxAge: result.data.expires_in,
    });

    redirect(`/personal-messages/${slug}`);
  }

  /**
   * Determine whether the message can be shown.
   */
  const hasAccess = !isProtected || tokenIsValid;

  /**
   * Password form
   */
  if (!hasAccess) {
    return (
      <Container className="max-w-xl py-10">
        <div className="rounded-xl border bg-card p-6 sm:p-8">
          <Prose>
            <h2>Password Protected</h2>

            <p>Enter the password to read this message.</p>
          </Prose>

          <form
            action={unlockMessage}
            className="mt-6 space-y-4"
            suppressHydrationWarning
          >
            <label htmlFor="password" className="block text-sm font-medium">
              Password
            </label>

            <input
              id="password"
              name="password"
              type="password"
              required
              autoComplete="current-password"
              className="h-10 w-full rounded-md border bg-background px-3 text-sm"
              suppressHydrationWarning
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
    );
  }

  /**
   * Use normal REST content for public messages.
   *
   * Use the protected-content endpoint response
   * for password-protected messages.
   */
  const renderedContent = isProtected
    ? (protectedContent ?? "")
    : message.content.rendered;

  const featuredMedia = message.featured_media
    ? await getFeaturedMediaById(message.featured_media)
    : null;

  return (
    <Section
      id="personalMessageContentPage"
      className="bg-linear-to-b from-accent-foreground/5 to-background dark:from-accent-foreground/10 pt-0!"
    >
      {featuredMedia?.source_url ? (
        <div className="mb-6">
          <PageHeader
            title={message.title.rendered}
            imgSrc={featuredMedia.source_url}
            alt={message.title.rendered}
            textAlign="left"
          />
        </div>
      ) : (
        <Container className="pb-0!">
          <div className="max-w-2xl">
            <h1
              className="my-4 text-2xl md:text-3xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: message.title.rendered,
              }}
            />
            <hr className="my-7 border-t-[#848687]! dark:border-t-[#495057]!" />
          </div>
        </Container>
      )}
      <Container className="min-h-screen pb-16 pt-0! overflow-x-hidden">
        <div className="max-w-2xl">
          {/* Guard against wide tables/code blocks in WP content forcing horizontal overflow on mobile */}
          <div
            className="prose prose-lg dark:prose-invert wrap-break-word [&_pre]:overflow-x-auto [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full"
            dangerouslySetInnerHTML={{
              __html: renderedContent,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
