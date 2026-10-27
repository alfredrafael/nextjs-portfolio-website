import { NextResponse } from "next/server";
import { AUTH_COOKIE, PASSWORD, sessionToken } from "@/lib/job-track-auth";

export async function POST(request: Request) {
  const origin = request.headers.get("origin");
  if (origin && origin !== new URL(request.url).origin) {
    return NextResponse.json({ error: "Invalid origin" }, { status: 403 });
  }

  let formData: FormData;
  try {
    formData = await request.formData();
  } catch {
    return NextResponse.json({ error: "Invalid form" }, { status: 400 });
  }
  if (formData.get("password") !== PASSWORD) {
    return NextResponse.json({ error: "Incorrect password" }, { status: 401 });
  }

  const response = NextResponse.json({ success: true });
  response.headers.set("Cache-Control", "no-store");
  response.cookies.set(AUTH_COOKIE, sessionToken, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/job-track",
    maxAge: 60 * 60 * 8,
  });
  return response;
}
