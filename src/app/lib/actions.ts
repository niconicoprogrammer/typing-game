'use server'

import { revalidatePath } from 'next/cache'
import { redirect } from 'next/navigation'

import { createClient } from '@/app/lib/supabase/server'

export async function login(f_prevState: string | undefined, formData: FormData) {
  const supabase = await createClient()

  const userName = formData.get('userName') as string
  const password = formData.get('password') as string

  const email = `${userName}@example.com` // ← ここで email を組み立てる

  const { error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })

  if (error) {
    return error.message
  }

  revalidatePath('/', 'layout')
  redirect('/game')
}

export async function signup(_prevState: string | undefined, formData: FormData) {
  const supabase = await createClient()

  const userName = formData.get('userName') as string
  const password = formData.get('password') as string

  const email = `${userName}@example.com` // ← email を組み立てる

  const { error } = await supabase.auth.signUp({
    email,
    password,
  })

  if (error) {
    return error.message
  }

  revalidatePath('/', 'layout')
  redirect('/game')
}


export async function logout() {
  const supabase = await createClient()

  await supabase.auth.signOut()

  revalidatePath('/', 'layout')
  redirect('/')
}

export async function submitScore(score: number) {
  const supabase = await createClient()

  const {
    data: { user },
    error: userError,
  } = await supabase.auth.getUser()

  if (userError || !user) {
    throw new Error('User not authenticated')
  }

  const { error } = await supabase.from('scores').insert({
    user_id: user.id,
    score,
  })

  if (error) {
    throw new Error('Failed to submit score: ' + error.message)
  }
}
