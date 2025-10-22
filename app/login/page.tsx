'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { localZodResolver as zodResolver } from '@/lib/localZodResolver'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'

const MagicLinkSchema = z.object({ email: z.string().email() })
type MagicLinkValues = z.infer<typeof MagicLinkSchema>

const PasswordSchema = z.object({
  email: z.string().email(),
  password: z.string().min(6, 'Password must be at least 6 characters')
})
type PasswordValues = z.infer<typeof PasswordSchema>

export default function Login() {
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [sent, setSent] = useState(false)
  const [error, setError] = useState<string>('')

  useEffect(() => {
    // Detect mobile or PWA
    const checkMobile = () => {
      const userAgent = navigator.userAgent.toLowerCase()
      const isMobileDevice = /android|webos|iphone|ipad|ipod|blackberry|iemobile|opera mini/i.test(userAgent)
      const isStandalone = window.matchMedia('(display-mode: standalone)').matches ||
                          (window.navigator as any).standalone === true
      return isMobileDevice || isStandalone
    }
    setIsMobile(checkMobile())
  }, [])

  // Magic link form (Desktop)
  const magicForm = useForm<MagicLinkValues>({ resolver: zodResolver(MagicLinkSchema) })

  async function onMagicLinkSubmit({ email }: MagicLinkValues) {
    setError('')
    const { error } = await supabase.auth.signInWithOtp({
      email,
      options: { emailRedirectTo: `${window.location.origin}/auth/callback` }
    })
    if (!error) setSent(true)
    else setError(error.message)
  }

  // Password form (Mobile)
  const passwordForm = useForm<PasswordValues>({ resolver: zodResolver(PasswordSchema) })

  async function onPasswordSubmit({ email, password }: PasswordValues) {
    setError('')

    if (isSignUp) {
      // Sign up
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        setError(error.message)
      } else {
        setSent(true)
      }
    } else {
      // Sign in
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        setError(error.message)
      } else {
        router.push('/dashboard')
      }
    }
  }

  if (isMobile) {
    // Mobile: Email + Password
    return (
      <main className="min-h-screen grid place-items-center p-6">
        <div className="w-full max-w-md rounded-2xl border border-white/10 p-6">
          <h1 className="text-2xl font-bold">{isSignUp ? 'Create Account' : 'Sign in'}</h1>
          <p className="text-zinc-400 mt-1">
            {isSignUp ? 'Join Overlander today' : 'Welcome back to Overlander'}
          </p>

          {sent ? (
            <div className="mt-6 space-y-4">
              <div className="text-green-400">
                {isSignUp
                  ? 'Account created! Please check your email to verify your account.'
                  : 'Success! Redirecting...'}
              </div>
              <Button onClick={() => router.push('/dashboard')}>Go to Dashboard</Button>
            </div>
          ) : (
            <form onSubmit={passwordForm.handleSubmit(onPasswordSubmit)} className="mt-6 space-y-3">
              <Input
                placeholder="you@example.com"
                type="email"
                {...passwordForm.register('email')}
              />
              {passwordForm.formState.errors.email && (
                <div className="text-sm text-red-400">{passwordForm.formState.errors.email.message}</div>
              )}

              <Input
                placeholder="Password"
                type="password"
                {...passwordForm.register('password')}
              />
              {passwordForm.formState.errors.password && (
                <div className="text-sm text-red-400">{passwordForm.formState.errors.password.message}</div>
              )}

              {error && <div className="text-sm text-red-400">{error}</div>}

              <Button disabled={passwordForm.formState.isSubmitting}>
                {passwordForm.formState.isSubmitting
                  ? (isSignUp ? 'Creating account...' : 'Signing in...')
                  : (isSignUp ? 'Create Account' : 'Sign in')}
              </Button>

              <button
                type="button"
                onClick={() => setIsSignUp(!isSignUp)}
                className="w-full text-sm text-zinc-400 hover:text-white transition mt-2"
              >
                {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Sign up"}
              </button>
            </form>
          )}
        </div>
      </main>
    )
  }

  // Desktop: Magic Link
  return (
    <main className="min-h-screen grid place-items-center p-6">
      <div className="w-full max-w-md rounded-2xl border border-white/10 p-6">
        <h1 className="text-2xl font-bold">Sign in</h1>
        <p className="text-zinc-400 mt-1">We'll email you a login link.</p>

        {sent ? (
          <div className="mt-6 text-green-400">Check your inbox for the magic link.</div>
        ) : (
          <form onSubmit={magicForm.handleSubmit(onMagicLinkSubmit)} className="mt-6 space-y-3">
            <Input placeholder="you@example.com" type="email" {...magicForm.register('email')} />
            {magicForm.formState.errors.email && (
              <div className="text-sm text-red-400">{magicForm.formState.errors.email.message}</div>
            )}
            {error && <div className="text-sm text-red-400">{error}</div>}
            <Button disabled={magicForm.formState.isSubmitting}>
              {magicForm.formState.isSubmitting ? 'Sending…' : 'Send magic link'}
            </Button>
          </form>
        )}
      </div>
    </main>
  )
}
