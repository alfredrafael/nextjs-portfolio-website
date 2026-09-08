import { siteConfig } from "@/site.config";
import type { Metadata } from "next";

interface ContentMetadataOptions {
  title: string;
  description: string;
  slug?: string;
  basePath?: "posts" | "pages";
  /** Full canonical/OG URL override, for pages without a single content slug (e.g. archives). */
  url?: string;
}

export function generateContentMetadata({
  title,
  description,
  slug,
  basePath,
  url,
}: ContentMetadataOptions): Metadata {
  const ogUrl = new URL(`${siteConfig.site_domain}/api/og`);
  ogUrl.searchParams.append("title", title);
  ogUrl.searchParams.append("description", description);

  const contentUrl =
    url ??
    (basePath && slug
      ? `${siteConfig.site_domain}/${basePath}/${slug}`
      : slug
        ? `${siteConfig.site_domain}/${slug}`
        : siteConfig.site_domain);

  return {
    title,
    description,
    alternates: { canonical: contentUrl },
    openGraph: {
      title,
      description,
      type: "article",
      url: contentUrl,
      images: [
        {
          url: ogUrl.toString(),
          width: 1200,
          height: 630,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogUrl.toString()],
    },
  };
}

const namedEntities: Record<string, string> = {
  amp: "&",
  lt: "<",
  gt: ">",
  quot: '"',
  apos: "'",
  nbsp: " ",
  ndash: "–",
  mdash: "—",
  hellip: "…",
  lsquo: "\u2018",
  rsquo: "\u2019",
  ldquo: "\u201c",
  rdquo: "\u201d",
};

function decodeHtmlEntities(text: string): string {
  return text
    .replace(/&#(\d+);/g, (_, dec) => String.fromCharCode(parseInt(dec, 10)))
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex) =>
      String.fromCharCode(parseInt(hex, 16)),
    )
    .replace(/&([a-zA-Z]+);/g, (match, name) => namedEntities[name] ?? match);
}

export function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
}

export function truncateHtml(html: string, maxWords: number): string {
  const text = decodeHtmlEntities(html.replace(/<[^>]*>/g, "")).trim();
  const words = text.split(/\s+/);
  if (words.length <= maxWords) return text;
  return words.slice(0, maxWords).join(" ") + "...";
}
