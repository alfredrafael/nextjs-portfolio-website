import Link from "next/link";
import { getScripts } from "@/lib/wordpress";
import { stripHtml } from "@/lib/metadata";
import { Section, Container, Prose } from "@/components/craft";

export default async function ScriptsPage() {
  const scripts = await getScripts();

  return (
    <main>
      <Section>
        <Container className="space-y-6">
          <Prose>
            <h2>Scripts</h2>
            <p className="text-muted-foreground">
              {scripts.length} {scripts.length === 1 ? "script" : "total scripts"}
            </p>
          </Prose>

          {scripts.length > 0 ? (
            <div className="grid gap-4 md:grid-cols-2">
              {scripts.map((script) => {
                const excerpt =
                  stripHtml(script.excerpt?.rendered ?? "") ||
                  stripHtml(script.content.rendered);

                return (
                  <Link
                    href={`/scripts/${script.slug}`}
                    key={script.id}
                    className="transition-shadow duration-100 rounded-lg hover:shadow-lg dark:hover:shadow-white/10"
                  >
                    <article className="flex h-full flex-col rounded-lg border bg-accent p-4 shadow-sm sm:p-6">
                      <h3
                        className="mb-3 text-xl font-semibold"
                        dangerouslySetInnerHTML={{
                          __html: script.title.rendered,
                        }}
                      />
                      <p className="mb-4 flex-1 text-muted-foreground wrap-break-word">
                        {excerpt.slice(0, 180)}
                        {excerpt.length > 180 ? "..." : ""}
                      </p>
                    </article>
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="rounded-lg border bg-accent/25 p-8 text-center">
              <p className="text-muted-foreground">No scripts available yet.</p>
            </div>
          )}
        </Container>
      </Section>
    </main>
  );
}
