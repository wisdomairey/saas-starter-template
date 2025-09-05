import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  // This middleware runs on edge runtime
  // For now, we'll let the client-side handle authentication
  // In a production app, you might want to add server-side auth checks here
  
  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
};
