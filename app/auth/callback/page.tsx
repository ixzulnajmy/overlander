'use client'
import { useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

export default function AuthCallback() {
  const router = useRouter()
  const search = useSearchParams()

  useEffect(() => {
    const code = search.get('code')
    if (!code) return
    supabase.auth.exchangeCodeForSession(code).then(({ error }) => {
      if (error) console.error(error)
      router.replace('/dashboard')
    })
  }, [router, search])

  return <div className="p-6">Signing you in…</div>
}
