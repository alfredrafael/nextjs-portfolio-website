import JobTrackPage from "./job-track";

export { metadata } from "./job-track";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function Page() {
  return (
    <div className="min-h-screen bg-alternative">
      <JobTrackPage />
    </div>
  );
}
