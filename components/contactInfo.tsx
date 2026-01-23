import { contactData } from "@/app/data/contactData";

export default function ContactInfo() {
  return (
    <>
      <div className="space-y-6 md:mx-auto max-w-6xl">
        <h2 className="mb-6 text-balance text-2xl font-bold tracking-tight text-card-foreground">
          Contact Information
        </h2>
        {contactData.map((detail: any) => {
          const Icon = detail.icon;
          const content = (
            <div className="flex gap-4">
              <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                <Icon className="h-5 w-5 text-primary" />
              </div>
              <div className="flex-1">
                <p className="text-sm font-medium text-muted-foreground">
                  {detail.label}
                </p>
                <p className="mt-1 whitespace-pre-line text-base font-medium leading-relaxed text-card-foreground">
                  {detail.value}
                </p>
              </div>
            </div>
          );

          if (detail.href) {
            return (
              <a
                key={detail.label}
                href={detail.href}
                className="block rounded-lg transition-colors hover:bg-muted/50"
                target="_blank"
              >
                {content}
              </a>
            );
          }

          return (
            <div key={detail.label} className="rounded-lg">
              {content}
            </div>
          );
        })}
      </div>
    </>
  );
}
