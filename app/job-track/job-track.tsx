import {
  BriefcaseBusiness,
  ChevronDown,
  Layers,
  MessageSquare,
  Sparkles,
} from "lucide-react";
import sanitizeHtml from "sanitize-html";
import {
  getJobApplications,
  jobTrackFields,
  jobTrackStatuses,
} from "@/lib/wordpress";
import type { JobTrackFields } from "@/lib/wordpress.d";
import { stripHtml } from "@/lib/metadata";
import { getFollowUpStatus } from "@/lib/follow-up";
import styles from "./job-track.module.css";
import ApplicationDetails from "./application-details";
export const dynamic = "force-dynamic";
export const revalidate = 0;
export const metadata = {
  title: "Job Track",
  robots: { index: false, follow: false },
};

const choices: Partial<Record<keyof JobTrackFields, Record<string, string>>> = {
  status: jobTrackStatuses,
  work_type: { remote: "Remote", hybrid: "Hybrid", onsite: "On-site" },
  employment_type: {
    full_time: "Full-time",
    contract: "Contract",
    part_time: "Part-time",
    other: "Other",
  },
  opportunity_level: {
    normal: "Normal",
    high: "High",
    low: "Low",
    unknown: "Unknown",
  },
};

const leadingFields: Array<keyof JobTrackFields> = [
  "company",
  "location",
  "status",
  "date_applied",
  "resume_version",
  "employment_type",
  "contact_method",
  "follow_up",
  "contact_name",
];

const urlFields: Array<keyof JobTrackFields> = ["contact_link", "job_url"];

const trailingFields: Array<keyof JobTrackFields> = [
  ...urlFields,
  "notes",
  "activity_log",
];

const detailFields = [
  ...leadingFields.map(
    (key) => jobTrackFields.find(([field]) => field === key)!,
  ),
  ...jobTrackFields.filter(
    ([key]) => key === "contact_email" || key === "opportunity_level",
  ),
  ...trailingFields.map(
    (key) => jobTrackFields.find(([field]) => field === key)!,
  ),
];

function FollowUpBadge({ value }: { value: string }) {
  const followUp = getFollowUpStatus(value);
  if (!followUp) return null;
  return (
    <span className={styles.status} data-status={followUp.status}>
      {followUp.label}
    </span>
  );
}

function displayValue(key: keyof JobTrackFields, value: string) {
  if (!value) return <span className={styles.empty}>—</span>;
  if (key === "notes" || key === "activity_log") {
    return (
      <div
        className={styles.richText}
        dangerouslySetInnerHTML={{
          __html: sanitizeHtml(value, {
            allowedTags: [
              "p",
              "br",
              "b",
              "strong",
              "em",
              "i",
              "u",
              "s",
              "ul",
              "ol",
              "li",
              "blockquote",
              "h2",
              "h3",
              "h4",
              "a",
              "code",
            ],
            allowedAttributes: { a: ["href", "title", "target", "rel"] },
            allowedSchemes: ["https", "http", "mailto"],
          }),
        }}
      />
    );
  }
  if (key === "job_url" || key === "contact_link") {
    try {
      const url = new URL(value);
      if (!["http:", "https:"].includes(url.protocol)) return value;
      return (
        <a href={url.href} target="_blank" rel="noopener noreferrer">
          {value}
        </a>
      );
    } catch {
      return value;
    }
  }
  if (key === "contact_email")
    return <a href={`mailto:${encodeURIComponent(value)}`}>{value}</a>;
  return choices[key]?.[value] ?? value;
}

export default async function JobTrackPage() {
  const applications = await getJobApplications();
  const stats = [
    { label: "Saved applications", value: applications.length, icon: Layers },
    {
      label: "In conversation",
      value: applications.filter(({ fields }) =>
        ["recruiter", "interview", "assessment"].includes(fields.status),
      ).length,
      icon: MessageSquare,
    },
    {
      label: "Offers & acceptances",
      value: applications.filter(({ fields }) =>
        ["offer", "accepted"].includes(fields.status),
      ).length,
      icon: Sparkles,
    },
  ];
  return (
    <main className={styles.main}>
      <header className="mb-10">
        <span className="mb-5 inline-flex items-center gap-2 rounded-full border border-border bg-muted/50 px-3 py-1 text-xs font-medium tracking-wide text-muted-foreground">
          <BriefcaseBusiness aria-hidden="true" className="size-3.5" />
          Worksearch tracking tool
        </span>
        <div className="flex items-center justify-between gap-4">
          <div className="max-w-2xl">
            <h1 className="font-serif text-4xl tracking-tight sm:text-5xl">
              Applications
            </h1>
            <p className="mt-4 text-lg leading-relaxed text-muted-foreground">
              For the boards' page,{" "}
              <a href="/job-boards" className="text-blue-600 underline">
                click here.
              </a>
            </p>
          </div>
          <span className={styles.count}>{applications.length} total</span>
        </div>
      </header>
      <section className={styles.list} aria-label="Job applications">
        {applications.map((app) => (
          <ApplicationDetails key={app.id} className={styles.item}>
            <summary className={styles.summary}>
              <span className={styles.opportunity}>
                <span className={styles.title}>{stripHtml(app.title)}</span>
                <span className={styles.company}>
                  {app.fields.company || "Company not provided"}
                  {app.fields.location && <span> · {app.fields.location}</span>}
                </span>
              </span>
              <span className={styles.summaryBadges}>
                <FollowUpBadge value={app.fields.follow_up} />
                <span className={styles.status} data-status={app.fields.status}>
                  {jobTrackStatuses[app.fields.status] ??
                    app.fields.status ??
                    "Not set"}
                </span>
                <span className={styles.priorityLevel}>
                  OP:{" "}
                  <strong>
                    {" "}
                    {choices.opportunity_level?.[
                      app.fields.opportunity_level
                    ] || "Unknown"}
                  </strong>
                </span>
              </span>
              <ChevronDown
                className={styles.chevron}
                size={18}
                aria-hidden="true"
              />
            </summary>
            <div className={styles.body}>
              <dl className={styles.grid}>
                {detailFields.map(([key, label]) => (
                  <div
                    key={key}
                    data-field={key}
                    className={
                      key === "notes"
                        ? `${styles.full} ${styles.notes}`
                        : key === "activity_log"
                          ? styles.full
                          : urlFields.includes(key)
                            ? styles.urlField
                            : ""
                    }
                  >
                    <dt>{label}</dt>
                    <dd>{displayValue(key, app.fields[key])}</dd>
                  </div>
                ))}
                {/* <div>
                  <dt>Record updated</dt>
                  <dd>{app.updated || "—"}</dd>
                </div> */}
              </dl>
              {/* <h3 className={styles.historyTitle}>Status history</h3>
              {app.status_history.length > 0 ? (
                <ul className={styles.history}>
                  {[...app.status_history].reverse().map((entry, index) => (
                    <li key={`${entry.date}-${index}`}>
                      {jobTrackStatuses[entry.status] ?? entry.status} —{" "}
                      {entry.date}
                    </li>
                  ))}
                </ul>
              ) : (
                <p>No status changes recorded.</p>
              )} */}
            </div>
          </ApplicationDetails>
        ))}
        {applications.length === 0 && (
          <div className={styles.emptyState}>
            <BriefcaseBusiness size={32} aria-hidden="true" />
            <h3>A fresh start for your next move</h3>
            <p>
              Applications saved in WordPress Job Track will appear here, ready
              to follow from first contact to offer.
            </p>
          </div>
        )}
      </section>
    </main>
  );
}
