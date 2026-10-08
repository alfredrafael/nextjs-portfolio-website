import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getScriptBySlug } from "@/lib/wordpress";
import { Container, Section } from "@/components/craft";

interface ScriptPageProps {
  params: Promise<{
    slug: string;
  }>;
}

function plainText(html: string): string {
  return html
    .replace(/<[^>]*>/g, "")
    .replace(/&amp;/g, "&")
    .replace(/&#038;/g, "&")
    .replace(/&quot;/g, '"')
    .replace(/&#039;/g, "'");
}

export async function generateMetadata({
  params,
}: ScriptPageProps): Promise<Metadata> {
  const { slug } = await params;
  const script = await getScriptBySlug(slug);

  if (!script) {
    return {
      title: "Script Not Found",
      robots: { index: false, follow: false },
    };
  }

  return {
    title: plainText(script.title.rendered),
    robots: {
      index: false,
      follow: false,
      googleBot: {
        index: false,
        follow: false,
        noarchive: true,
      },
    },
  };
}

export default async function ScriptPage({ params }: ScriptPageProps) {
  const { slug } = await params;
  const script = await getScriptBySlug(slug);

  if (!script) {
    notFound();
  }

  return (
    <Section
      id="prompter"
      className="bg-linear-to-b from-accent-foreground/5 to-background dark:from-accent-foreground/10 pt-0!"
    >
      <Container className="pb-0!">
        <div className="max-w-2xl">
          <h1
            className="text-2xl md:text-3xl font-semibold mb-8"
            dangerouslySetInnerHTML={{
              __html: script.title.rendered,
            }}
          />
          <hr className=" border-t-[#848687]! dark:border-t-[#495057]!" />
        </div>
      </Container>

      <Container className="min-h-screen pb-16 overflow-x-hidden">
        <div className="max-w-md px-5">
          <div
            className="prose prose-lg dark:prose-invert wrap-break-word [&_pre]:overflow-x-auto [&_table]:block [&_table]:overflow-x-auto [&_table]:max-w-full"
            dangerouslySetInnerHTML={{
              __html: script.content.rendered,
            }}
          />
        </div>
      </Container>
    </Section>
  );
}
