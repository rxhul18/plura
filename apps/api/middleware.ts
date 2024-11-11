import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

export function middleware(request: NextRequest) {

  const response = NextResponse.next();
  response.headers.set("sec-fetch-mode", "no-cors");

  return response;
}

export const config = {
  matcher: "/api/:path*",
};
