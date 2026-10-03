import { createServerClient } from '@supabase/ssr';
import { NextResponse, type NextRequest } from 'next/server';

export async function updateSession(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value),
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options),
          );
        },
      },
    },
  );

  // Refresh session if expired
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // Protected route patterns
  const protectedPatterns = ['/home', '/explore', '/progress', '/thinking', '/bugs', '/showcase', '/experience'];
  const isProtectedRoute = protectedPatterns.some((p) =>
    pathname.startsWith(p),
  );

  if (isProtectedRoute && !user) {
    // TEMPORARY: Bypass auth for UI development
    // const url = request.nextUrl.clone();
    // url.pathname = '/login';
    // url.searchParams.set('redirect', pathname);
    // return NextResponse.redirect(url);
  }

  // Auth page redirect if already logged in
  if ((pathname === '/login' || pathname === '/signup') && user) {
    const url = request.nextUrl.clone();
    // Redirect based on role — will be determined by profile lookup
    // For now, default to student home
    url.pathname = '/home';
    return NextResponse.redirect(url);
  }

  return supabaseResponse;
}
