import Link from "next/link";
import { Section, Container, Prose } from "@/components/craft";
import BackButton from "@/components/back";

interface ArchiveListProps<T> {
  title: string;
  items: T[];
  getItemHref: (item: T) => string;
  getItemLabel: (item: T) => string;
  emptyMessage: string;
}

export function ArchiveList<T extends { id: number | string }>({
  title,
  items,
  getItemHref,
  getItemLabel,
  emptyMessage,
}: ArchiveListProps<T>) {
  return (
    <Section>
      <Container className="space-y-6">
        <Prose className="mb-8">
          <h2>{title}</h2>
          {items.length > 0 ? (
            <div className="grid gap-4 not-prose md:grid-cols-2">
              {items.map((item) => (
                <Link
                  href={getItemHref(item)}
                  key={item.id}
                  className="no-underline! transition-shadow duration-500 hover:shadow-lg hover:shadow-black/10 dark:hover:shadow-white/10"
                >
                  <article className="rounded-lg border bg-accent p-4 shadow-sm sm:p-6">
                    <h4 className="text-lg font-semibold">
                      {getItemLabel(item)}
                    </h4>
                  </article>
                </Link>
              ))}
            </div>
          ) : (
            <p className="text-muted-foreground">{emptyMessage}</p>
          )}
        </Prose>
        <BackButton />
      </Container>
    </Section>
  );
}
