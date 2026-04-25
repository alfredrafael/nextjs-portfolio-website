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
    <main id="personalMessageContentPage" className="bg-alternative">
      <Container className="min-h-screen pb-16">
        <div className="text-[#212529] dark:text-white max-w-2xl">
          <h1
            className="-mt-2 text-2xl md:text-3xl my-0"
            dangerouslySetInnerHTML={{ __html: post.title.rendered }}
          ></h1>
          <hr className="my-5 border-t-[#848687]! dark:border-t-[#495057]!" />
          <div className="flex justify-between items-center gap-4 text-sm">
            {/* <h5>
              Published {date} by{" "}
              {author.name && (
                <span>
                  <a href={`/posts/?author=${author.id}`}>{author.name}</a>{" "}
                </span>
              )}
            </h5> */}
          </div>
          {featuredMedia?.source_url && (
            <div className="h-96 my-12 md:h-[500px] overflow-hidden flex items-center justify-center border rounded-lg bg-accent/25">
              {/* eslint-disable-next-line */}
              <img
                className="w-full h-full object-cover"
                src={featuredMedia.source_url}
                alt={post.title.rendered}
              />
            </div>
          )}
        </div>
        <Article
          className="prose prose-lg dark:prose-invert"
          dangerouslySetInnerHTML={{ __html: post.content.rendered }}
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
    </main>
  );
}
