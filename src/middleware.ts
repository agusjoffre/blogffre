import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";
import { createClient } from "./supabase/supabaseServerClient";
import { NextResponse } from "next/server";

const isProtectedRoute = createRouteMatcher(["/posts/create(.*)"]);
const isAdminRoute = createRouteMatcher(["/admin"]);

export default clerkMiddleware(async (auth, req) => {
  if (isProtectedRoute(req)) auth().protect();

  const url = req.nextUrl.clone();
  const { userId } = auth();

  const db = createClient();

  if (isAdminRoute(req)) {
    if (url.pathname !== "/notauthorized") {
      const { data, error } = await db
        .from("users")
        .select("role")
        .eq("id", userId);

      if (error || data.length === 0 || data[0].role !== "admin") {
        return NextResponse.redirect(
          `${process.env.NEXT_PUBLIC_BASE_URL}/notauthorized`
        );
      }
    }
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
