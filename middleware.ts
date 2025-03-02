import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "./src/shared/api";
import { zodValidate } from "./src/shared/lib/axios";
import { currentDiscordUserDtoSchema } from "./src/shared/api/users/users.dtos";

export async function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("better-auth.session_token");
  if (!sessionToken) {
    return NextResponse.redirect(new URL(request.nextUrl.origin));
  }

  try {
    const currentUser = (
      await axiosInstance
        .get("/v1/discord-users/me", {
          headers: {
            Cookie: `better-auth.session_token=${encodeURIComponent(sessionToken.value)}`,
          },
        })
        .then(zodValidate(currentDiscordUserDtoSchema))
    ).data;

    if (request.url.includes("/admin/") && !currentUser.isStaff) {
      return NextResponse.redirect(new URL(request.nextUrl.origin));
    }
  } catch {
    return NextResponse.redirect(new URL(request.nextUrl.origin));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/manage/:path*", "/admin/:path*"],
};
