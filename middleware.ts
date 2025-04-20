import { type NextRequest } from 'next/server';
import { updateSession } from '@/app/lib/supabase/middleware'; // パス注意

export async function middleware(request: NextRequest) {
  return updateSession(request);
}

export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
  ],
};
