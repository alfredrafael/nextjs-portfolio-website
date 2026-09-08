// pages/[slug]/page.tsx

import { getPageBySlug, getAllPages } from "@/lib/wordpress";
import { generateContentMetadata, stripHtml } from "@/lib/metadata";
import { Section, Container, Prose } from "@/components/craft";
import { notFound } from "next/navigation";
// Custom Components
import PageHeader from "@/components/pageHeader";

import type { Metadata } from "next";

export const revalidate = 60;

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

  return (
    <>
      {featuredImage && (
        <PageHeader
          title={page.title.rendered}
          imgSrc={imgSrc}
          alt={imgAlt}
          textAlign="left"
        />
      )}
      <Container>
        <Prose>
          {/* <h2>{page.title.rendered}</h2> */}
          <div dangerouslySetInnerHTML={{ __html: page.content.rendered }} />
        </Prose>
      </Container>
    </>
  );
}
