"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { X } from "lucide-react";

const checklist = [
  "The opening appears on the employer’s official career site.",
  "The direct application domain belongs to the company or a recognized ATS.",
  "The listing is still accepting applications.",
  "It says permanent full-time rather than contract or contract-to-hire.",
  "The geographic language genuinely includes Texas.",
  "“Remote” does not quietly mean residing near an office.",
  "Recruiter messages come from a company email domain.",
  "Nobody requests payment, purchases, gift cards, banking information or a text-only interview.",
];

export default function ApplicationChecklist() {
  return (
    <Dialog.Root>
      <Dialog.Trigger asChild>
        <button
          type="button"
          className="cursor-pointer rounded-sm text-left text-foreground underline decoration-foreground/40 underline-offset-4 hover:decoration-foreground focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-ring"
        >
          Follow these instructions to maximize chances of success.
        </button>
      </Dialog.Trigger>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content className="fixed left-1/2 top-1/2 z-50 max-h-[85dvh] w-[calc(100%-2rem)] max-w-xl -translate-x-1/2 -translate-y-1/2 overflow-y-auto rounded-2xl border border-border bg-background p-6 text-foreground shadow-xl sm:p-8">
          <Dialog.Title className="pr-8 font-serif text-3xl tracking-tight">
            Before applying, confirm:
          </Dialog.Title>
          <Dialog.Description className="sr-only">
            Review these eight points before applying for a job.
          </Dialog.Description>
          <ul className="mt-6 list-disc space-y-4 pl-5 text-sm leading-relaxed sm:text-base">
            {checklist.map((item) => <li key={item} className="pl-1">{item}</li>)}
          </ul>
          <Dialog.Close asChild>
            <button type="button" aria-label="Close checklist" className="absolute right-4 top-4 cursor-pointer rounded-md p-2 text-muted-foreground hover:bg-muted hover:text-foreground focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ring">
              <X aria-hidden="true" className="size-5" />
            </button>
          </Dialog.Close>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
