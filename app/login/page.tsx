'use client'

import { useState } from 'react'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { localZodResolver as zodResolver } from '@/lib/localZodResolver'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'

const Schema = z.object({ email: z.string().email() })
type Values = z.infer<typeof Schema>

export default function Login() {
  const [sent, setSent] = useState(false)
  const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<Values>({ resolver: zodResolver(Schema) })

  async function onSubmit({ email }: Values) {
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${process.env.NEXT_PUBLIC_SITE_URL}/auth/callback` }
    })
    if (!error) setSent(true)
    else alert(error.message)
  }

  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 p-6">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-zinc-400 mt-1">We’ll email you a login link.</p>

        {sent ? (
          <div className="mt-6 text-green-400">Check your inbox for the magic link.</div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="mt-6 space-y-3">
            <Input placeholder="you@example.com" type="email" {...register('email')} />
            {errors.email && <div className="text-sm text-red-400">{errors.email.message}</div>}
            <Button disabled={isSubmitting}>{isSubmitting ? 'Sending…' : 'Send magic link'}</Button>
          </form>
        )}
      </div>
    </main>
  )
}
