import { betterFetch } from "@better-fetch/fetch";
import { NextRequest, NextResponse } from "next/server";
import type { Session } from "@repo/auth"

export async function middleware(request: NextRequest) {
    console.log(request.nextUrl.origin)
  const { data: session } = await betterFetch<Session>(
    "http://localhost:3001/api/session",
    {
      baseURL: request.nextUrl.origin,
      headers: {
        cookie: request.headers.get("cookie") || "",
      },
    }
  );
  console.log(session)


  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
