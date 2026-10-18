export function getFollowUpStatus(value: string, now = new Date()) {
  // WordPress date fields may use YYYY-MM-DD or ACF's YYYYMMDD format.
  const match = /^(\d{4})-?(\d{2})-?(\d{2})$/.exec(value.trim());
  if (!match) return null;

  const [, year, month, day] = match;
  const date = `${year}-${month}-${day}`;
  const parsed = new Date(`${date}T00:00:00Z`);
  if (!Number.isFinite(parsed.getTime()) || parsed.toISOString().slice(0, 10) !== date) {
    return null;
  }

  const parts = new Intl.DateTimeFormat("en-US", {
    timeZone: "America/Chicago",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).formatToParts(now);
  const part = (type: string) => parts.find((item) => item.type === type)!.value;
  const today = `${part("year")}-${part("month")}-${part("day")}`;

  if (date > today) return { status: "upcoming", label: "Upcoming follow up" };
  if (date === today) return { status: "today", label: "Follow up today" };
  return { status: "overdue", label: "Overdue follow up" };
}
