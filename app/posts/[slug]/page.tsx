import {
  getPostBySlug,
  getFeaturedMediaById,
  getAuthorById,
  getCategoryById,
  getAllPostSlugs,
} from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";

import { Section, Container, Article, Prose } from "@/components/craft";
import { badgeVariants } from "@/components/ui/badge";
import { cn } from "@/lib/utils";

import Link from "next/link";
import { notFound } from "next/navigation";
import type { Metadata } from "next";
import PageHeader from "@/components/pageHeader";

export const dynamic = "force-dynamic";

export async function generateStaticParams() {
  return await getAllPostSlugs();
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    return {};
  }

  return generateContentMetadata({
    title: post.title.rendered,
    description: stripHtml(post.excerpt.rendered),
    slug: post.slug,
    basePath: "posts",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = await getPostBySlug(slug);

  if (!post) {
    notFound();
  }

  const featuredMedia = post.featured_media
    ? await getFeaturedMediaById(post.featured_media)
    : null;
  const author = await getAuthorById(post.author);
  const date = new Date(post.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
  const category = await getCategoryById(post.categories[0]);

  return (
    <Section
      id="postContentPage"
      className="bg-linear-to-b from-accent-foreground/5 to-background dark:from-accent-foreground/10 pt-4!"
    >
      {featuredMedia?.source_url ? (
        <PageHeader
          title={post.title.rendered}
          imgSrc={featuredMedia.source_url}
          alt={post.title.rendered}
          textAlign="left"
        />
      ) : (
        <Container className="pb-0! pt-1! md:pt-6! -mb-6">
          <div className="max-w-2xl">
            <h1
              className="my-4 text-2xl md:text-3xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: post.title.rendered,
              }}
            />
            <hr className="my-7 border-t-[#848687]! dark:border-t-[#495057]!" />
          </div>
        </Container>
      )}
      <Container className="min-h-screen pb-16">
        <div
          className="prose prose-lg dark:prose-invert max-w-2xl"
          dangerouslySetInnerHTML={{
            __html: post.content.rendered,
          }}
        />

        <br />
        {category.slug !== "uncategorized" && (
          <>
            <hr className="my-6 border-t-[#848687]! dark:border-t-[#495057]!" />
            <div className="text-sm ml-2 mb-4">Categories:</div>
            <Link
              href={`/posts/?category=${category.id}`}
              className={cn(
                badgeVariants({ variant: "outline" }),
                "no-underline!",
              )}
            >
              {category.name}
            </Link>
          </>
        )}
      </Container>
    </Section>
  );
}
