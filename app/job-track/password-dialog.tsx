"use client";

import * as Dialog from "@radix-ui/react-dialog";
import { useActionState } from "react";
import { LockKeyhole } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

export default function PasswordDialog() {
  const [error, action, pending] = useActionState(
    async (_state: string, formData: FormData) => {
      try {
        const response = await fetch("/api/job-track/unlock", {
          method: "POST",
          body: formData,
        });
        if (response.status === 401) {
          return "Incorrect password. Please try again.";
        }
        if (!response.ok) {
          return "Unable to unlock Job Track. Please try again.";
        }
        window.location.assign("/job-track");
        return "";
      } catch {
        return "Unable to connect. Please try again.";
      }
    },
    "",
  );

  return (
    <Dialog.Root open>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-50 bg-black/60 backdrop-blur-sm" />
        <Dialog.Content
          className="fixed left-1/2 top-1/2 z-50 w-[calc(100%-2rem)] max-w-md -translate-x-1/2 -translate-y-1/2 rounded-2xl border border-border bg-background p-6 text-foreground shadow-xl sm:p-8"
          onEscapeKeyDown={(event) => event.preventDefault()}
          onPointerDownOutside={(event) => event.preventDefault()}
        >
          <LockKeyhole className="mb-4 size-6 text-muted-foreground" aria-hidden="true" />
          <Dialog.Title className="font-serif text-3xl tracking-tight">
            Job Track
          </Dialog.Title>
          <Dialog.Description className="mt-3 text-sm text-muted-foreground">
            Enter the password to access your applications.
          </Dialog.Description>
          <form action={action} className="mt-6 space-y-4">
            <label htmlFor="job-track-password" className="block text-sm font-medium">
              Password
            </label>
            <Input
              id="job-track-password"
              name="password"
              type="password"
              autoComplete="current-password"
              required
              autoFocus
              aria-invalid={Boolean(error)}
              aria-describedby={error ? "job-track-password-error" : undefined}
            />
            {error && (
              <p id="job-track-password-error" role="alert" className="text-sm text-destructive">
                {error}
              </p>
            )}
            <Button type="submit" disabled={pending} className="w-full">
              {pending ? "Unlocking…" : "Unlock"}
            </Button>
          </form>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
