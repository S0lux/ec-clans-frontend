import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { axiosInstance } from "./src/shared/api";
import { zodValidate } from "./src/shared/lib/axios";
import { currentDiscordUserDtoSchema } from "./src/shared/api/users/users.dtos";

export async function middleware(request: NextRequest) {
  const env = process.env.NODE_ENV;
  const cookieName =
    env == "production"
      ? "__Secure-better-auth.session_cookie"
      : "better-auth.session_cookie";

  const sessionToken = request.cookies.get(cookieName);
  if (!sessionToken) {
    return NextResponse.redirect(new URL(request.nextUrl.origin));
  }

  try {
    const currentUser = (
      await axiosInstance
        .get("/v1/discord-users/me", {
          headers: {
            Cookie: `${cookieName}=${encodeURIComponent(sessionToken.value)}`,
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
