'use client'
import { Suspense, useEffect } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import { supabase } from '@/lib/supabaseClient'

function AuthCallbackContent() {
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

export default function AuthCallback() {
  return (
    <Suspense fallback={<div className="p-6">Loading…</div>}>
      <AuthCallbackContent />
    </Suspense>
  )
}
