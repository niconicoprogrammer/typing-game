'use client'

import Link from 'next/link';
import { signup } from '@/app/lib/actions';
import { useActionState } from 'react';
import { useState } from 'react';

export default function SignupPage() {
  const [userName, setUserName] = useState('');
  const [errorMessage, formAction, isPending] = useActionState(signup, undefined);

  return (
    <div className="min-h-screen flex items-center justify-center bg-black px-4 font-mono">
      <form
        action={formAction}
        className="bg-black text-green-400 p-10 rounded border border-green-700 shadow-[0_0_10px_#00ff00] w-full max-w-md space-y-6"
      >
        <h1 className="text-3xl text-green-400 text-center font-bold tracking-widest">
          SYSTEM SIGNUP
        </h1>

        {errorMessage && (
          <div className="bg-green-950 text-red-400 border border-red-600 rounded p-2 text-sm text-center">
            {errorMessage}
          </div>
        )}

        <div>
          <label htmlFor="userName" className="block text-sm mb-1">Username</label>
          <input
            id="userName"
            name="userName"
            type="text"
            required
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            className="w-full px-3 py-2 bg-black text-green-300 border border-green-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <div>
          <label htmlFor="password" className="block text-sm mb-1">Password</label>
          <input
            id="password"
            name="password"
            type="password"
            required
            className="w-full px-3 py-2 bg-black text-green-300 border border-green-700 rounded-sm focus:outline-none focus:ring-2 focus:ring-green-400"
          />
        </div>

        <button
          type="submit"
          disabled={isPending}
          className="w-full bg-green-500 hover:bg-green-400 text-black font-bold py-2 px-4 rounded-sm transition shadow-md hover:shadow-[0_0_10px_#00ff00] disabled:opacity-50"
        >
          {isPending ? 'Creating...' : 'SIGN UP'}
        </button>

        <div className="text-center text-xs text-green-600 mt-4">
          Already have an account?{' '}
          <Link href="/login" className="underline text-green-400 hover:text-green-200 font-semibold">
            LOGIN
          </Link>
        </div>
      </form>
    </div>
  );
}
