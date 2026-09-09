// pages/[slug]/page.tsx

import {
  getPageBySlug,
  getAllPages,
  getAuthorById,
  getFeaturedMediaById,
} from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { Section, Container, Prose } from "@/components/craft";
import { notFound } from "next/navigation";
// Custom Components
import PageHeader from "@/components/pageHeader";

import type { Metadata } from "next";

export const revalidate = 900;

export async function generateStaticParams() {
  const pages = await getAllPages();

  return pages.map((page) => ({
    slug: page.slug,
  }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    return {};
  }

  const description = page.excerpt?.rendered
    ? stripHtml(page.excerpt.rendered)
    : stripHtml(page.content.rendered).slice(0, 200) + "...";

  return generateContentMetadata({
    title: page.title.rendered,
    description,
    slug: page.slug,
    basePath: "pages",
  });
}

export default async function Page({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = await getPageBySlug(slug);

  if (!page) {
    notFound();
  }

  // console.log("Rendering page:", page);

  const featuredImage = (page as any)?._embedded?.["wp:featuredmedia"]?.[0];
  const imgSrc = featuredImage?.source_url;
  const imgAlt = featuredImage?.alt_text || page?.title?.rendered || "";

  const featuredMedia = page.featured_media
    ? await getFeaturedMediaById(page.featured_media)
    : null;
  const author = await getAuthorById(page.author);
  const date = new Date(page.date).toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  });

  return (
    <Section
      id="pageContentTemplate"
      className="bg-linear-to-b from-accent-foreground/5 to-background dark:from-accent-foreground/10 pt-0!"
    >
      {featuredMedia?.source_url ? (
        <PageHeader
          title={page.title.rendered}
          imgSrc={featuredMedia.source_url}
          alt={page.title.rendered}
          textAlign="left"
        />
      ) : (
        <Container className="pb-0!">
          <div className="max-w-2xl">
            <h1
              className="my-4 text-2xl md:text-3xl font-semibold"
              dangerouslySetInnerHTML={{
                __html: page.title.rendered,
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
              __html: page.content.rendered,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
