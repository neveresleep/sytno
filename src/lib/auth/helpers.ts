import { redirect } from 'next/navigation'
import { createClient } from '@/lib/supabase/server'

export async function requireUser() {
  const supabase = await createClient()
  const { data: { user } } = await supabase.auth.getUser()

  if (!user) {
    redirect('/login')
  }

  return user
}

export async function getUserProfile(userId: string) {
  const supabase = await createClient()
  const { data } = await supabase
    .from('users')
    .select('*')
    .eq('id', userId)
    .single()

  return data
}
