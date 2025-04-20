// app/ui/Navbar.tsx
import { createClient } from '@/app/lib/supabase/server';
import Link from 'next/link';
import { logout } from '@/app/lib/actions';

export default async function Navbar() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  return (
    <header className="fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/90 backdrop-blur-sm border-b border-green-700 text-green-400 font-mono flex justify-between items-center shadow-[0_2px_8px_#00ff00]">
      <h1 className="text-xl font-bold tracking-wide">
        <Link href="/" className="hover:text-green-200 transition">
        🤔TYPING TERMINAL
        </Link>
      </h1>

      <nav className="space-x-4 flex items-center text-sm">
        {user ? (
          <>
            <span className="text-green-300">LOGGED IN: {user.email}</span>
            <form action={logout}>
              <button
                type="submit"
                className="text-green-400 hover:text-green-200 border border-green-700 px-3 py-1 rounded transition"
              >
                LOGOUT
              </button>
            </form>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="text-green-400 hover:text-green-200 border border-green-700 px-3 py-1 rounded transition"
            >
              LOGIN
            </Link>
            <Link
              href="/signup"
              className="text-green-400 hover:text-green-200 border border-green-700 px-3 py-1 rounded transition"
            >
              SIGN UP
            </Link>
          </>
        )}
      </nav>
    </header>
  );
}