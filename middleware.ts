import { createServerClient, type CookieOptions } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";
import { SUPABASE_ANON_KEY, SUPABASE_URL, isSupabaseConfigured } from "@/lib/supabase/client";

const ADMIN_PATHS = ["/admin"];
const MERCHANT_PATHS = ["/dashboard"];
const AUTH_PATHS = ["/login", "/register", "/forgot-password"];
const SUSPENDED_PATH = "/compte-suspendu";

interface CookieToSet {
  name: string;
  value: string;
  options?: CookieOptions;
}

export async function middleware(request: NextRequest) {
  // Supabase keys aren't wired up yet — let every route through untouched
  // until NEXT_PUBLIC_SUPABASE_URL / NEXT_PUBLIC_SUPABASE_ANON_KEY are set.
  if (!isSupabaseConfigured) {
    return NextResponse.next();
  }

  let response = NextResponse.next({ request });

  const supabase = createServerClient(SUPABASE_URL, SUPABASE_ANON_KEY, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet: CookieToSet[]) {
        cookiesToSet.forEach(({ name, value }) => request.cookies.set(name, value));
        response = NextResponse.next({ request });
        cookiesToSet.forEach(({ name, value, options }) => {
          response.cookies.set(name, value, options);
        });
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const { pathname } = request.nextUrl;
  const isAdminPath = ADMIN_PATHS.some((path) => pathname.startsWith(path));
  const isMerchantPath = MERCHANT_PATHS.some((path) => pathname.startsWith(path));
  const isAuthPath = AUTH_PATHS.some((path) => pathname.startsWith(path));

  if ((isAdminPath || isMerchantPath) && !user) {
    const redirectUrl = request.nextUrl.clone();
    redirectUrl.pathname = "/login";
    redirectUrl.searchParams.set("redirectTo", pathname);
    return NextResponse.redirect(redirectUrl);
  }

  if (user && (isAdminPath || isMerchantPath || isAuthPath)) {
    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", user.id)
      .maybeSingle();

    const role = profile?.role ?? "merchant";

    if (isAuthPath) {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = role === "super_admin" ? "/admin" : "/dashboard";
      return NextResponse.redirect(redirectUrl);
    }

    if (isAdminPath && role !== "super_admin") {
      const redirectUrl = request.nextUrl.clone();
      redirectUrl.pathname = "/dashboard";
      return NextResponse.redirect(redirectUrl);
    }

    if (isMerchantPath) {
      if (role === "super_admin") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = "/admin";
        return NextResponse.redirect(redirectUrl);
      }

      const { data: merchant } = await supabase
        .from("merchants")
        .select("status")
        .eq("user_id", user.id)
        .maybeSingle();

      if (merchant?.status === "suspended") {
        const redirectUrl = request.nextUrl.clone();
        redirectUrl.pathname = SUSPENDED_PATH;
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/admin/:path*", "/login", "/register", "/forgot-password"],
};
