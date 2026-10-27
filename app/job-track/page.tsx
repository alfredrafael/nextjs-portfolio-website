import JobTrackPage from "./job-track";
import { cookies } from "next/headers";
import PasswordDialog from "./password-dialog";
import { AUTH_COOKIE, sessionToken } from "@/lib/job-track-auth";

export { metadata } from "./job-track";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function Page() {
  const cookieStore = await cookies();
  if (cookieStore.get(AUTH_COOKIE)?.value !== sessionToken) {
    return (
      <main className="min-h-screen bg-alternative">
        <PasswordDialog />
      </main>
    );
  }

  return (
    <div className="min-h-screen bg-alternative">
      <JobTrackPage />
    </div>
  );
}
