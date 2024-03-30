import { env } from "@/env/server.mjs";
import { NextResponse, type NextRequest } from "next/server";

export function middleware(request: NextRequest) {
  // Authenticates any API Request
  // if (request.headers.get("ds3-secret") !== env.VALIDATION_SECRET)
  //   return NextResponse.json({ error: "Invalid request" }, { status: 401 });

  return NextResponse.next();
}

export const config = {
  matcher: "/api/:path*",
};
