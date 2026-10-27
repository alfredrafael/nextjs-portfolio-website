import "server-only";
import { createHmac } from "node:crypto";

export const AUTH_COOKIE = "job_track_auth";
export const PASSWORD = "Apps";
export const sessionToken = createHmac(
  "sha256",
  process.env.JOB_TRACK_AUTH_SECRET ?? PASSWORD,
)
  .update("job-track-access-v1")
  .digest("hex");
