'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { localZodResolver as zodResolver } from '@/lib/localZodResolver'
import { Input } from '@/components/ui/Input'
import { Button } from '@/components/ui/Button'
import { supabase } from '@/lib/supabaseClient'

const EmailPasswordSchema = z.object({
  email: z.string().email('Please enter a valid email'),
  password: z.string().min(6, 'Password must be at least 6 characters')
})
type EmailPasswordValues = z.infer<typeof EmailPasswordSchema>

export default function Login() {
  const router = useRouter()
  const [showEmailForm, setShowEmailForm] = useState(false)
  const [isSignUp, setIsSignUp] = useState(false)
  const [error, setError] = useState<string>('')
  const [loading, setLoading] = useState(false)

  const emailForm = useForm<EmailPasswordValues>({
    resolver: zodResolver(EmailPasswordSchema)
  })

  useEffect(() => {
    // Check if already logged in
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        router.push('/dashboard')
      }
    })
  }, [router])

  // Social OAuth sign in
  async function signInWithProvider(provider: 'google' | 'facebook' | 'apple') {
    setError('')
    setLoading(true)

    const { error } = await supabase.auth.signInWithOAuth({
      provider,
      options: {
        redirectTo: `${window.location.origin}/auth/callback`,
        queryParams: provider === 'google' ? {
          access_type: 'offline',
          prompt: 'consent',
        } : undefined
      }
    })

    if (error) {
      setError(error.message)
      setLoading(false)
    }
  }

  // Email/Password sign in or sign up
  async function onEmailSubmit({ email, password }: EmailPasswordValues) {
    setError('')
    setLoading(true)

    if (isSignUp) {
      const { error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          emailRedirectTo: `${window.location.origin}/auth/callback`
        }
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        setError('')
        alert('Account created! Please check your email to verify.')
        setLoading(false)
      }
    } else {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password
      })
      if (error) {
        setError(error.message)
        setLoading(false)
      } else {
        router.push('/dashboard')
      }
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center p-4 bg-gradient-to-b from-black via-zinc-900 to-black">
      <div className="w-full max-w-md">
        {/* Logo */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-20 h-20 rounded-full bg-red-500/20 ring-2 ring-red-500 mb-4">
            <Image alt="Overlander" src="/logo.png" width={48} height={48} />
          </div>
          <h1 className="text-3xl font-bold text-yellow-400">OVERLANDER</h1>
          <p className="text-zinc-400 mt-2">Ride. Record. Relive.</p>
        </div>

        {!showEmailForm ? (
          /* Social Login Buttons */
          <div className="space-y-3">
            {/* Google */}
            <button
              onClick={() => signInWithProvider('google')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-white text-gray-900 font-semibold hover:bg-gray-100 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
              </svg>
              Continue with Google
            </button>

            {/* Facebook */}
            <button
              onClick={() => signInWithProvider('facebook')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-[#1877F2] text-white font-semibold hover:bg-[#166FE5] transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
              </svg>
              Continue with Facebook
            </button>

            {/* Apple */}
            <button
              onClick={() => signInWithProvider('apple')}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl bg-black border border-white/20 text-white font-semibold hover:bg-zinc-900 transition-all duration-200 hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                <path d="M17.05 20.28c-.98.95-2.05.8-3.08.35-1.09-.46-2.09-.48-3.24 0-1.44.62-2.2.44-3.06-.35C2.79 15.25 3.51 7.59 9.05 7.31c1.35.07 2.29.74 3.08.8 1.18-.24 2.31-.93 3.57-.84 1.51.12 2.65.72 3.4 1.8-3.12 1.87-2.38 5.98.48 7.13-.57 1.5-1.31 2.99-2.54 4.09l.01-.01zM12.03 7.25c-.15-2.23 1.66-4.07 3.74-4.25.29 2.58-2.34 4.5-3.74 4.25z"/>
              </svg>
              Continue with Apple
            </button>

            {/* Email */}
            <button
              onClick={() => setShowEmailForm(true)}
              disabled={loading}
              className="w-full flex items-center justify-center gap-3 px-6 py-4 rounded-2xl liquid-glass text-foreground font-semibold hover:scale-105 active:scale-95 transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              Continue with Email
            </button>

            {error && (
              <div className="mt-4 p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm text-center">
                {error}
              </div>
            )}
          </div>
        ) : (
          /* Email/Password Form */
          <div className="space-y-4">
            <button
              onClick={() => setShowEmailForm(false)}
              className="text-zinc-400 hover:text-white transition flex items-center gap-2 mb-4"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
              </svg>
              Back to social login
            </button>

            <div className="liquid-glass rounded-2xl p-6">
              <h2 className="text-xl font-bold mb-2">
                {isSignUp ? 'Create Account' : 'Sign In'}
              </h2>
              <p className="text-zinc-400 text-sm mb-6">
                {isSignUp ? 'Join the Overlander community' : 'Welcome back, rider!'}
              </p>

              <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-4">
                <div>
                  <Input
                    placeholder="Email"
                    type="email"
                    {...emailForm.register('email')}
                    className="bg-black/30"
                  />
                  {emailForm.formState.errors.email && (
                    <div className="text-sm text-red-400 mt-1">
                      {emailForm.formState.errors.email.message}
                    </div>
                  )}
                </div>

                <div>
                  <Input
                    placeholder="Password"
                    type="password"
                    {...emailForm.register('password')}
                    className="bg-black/30"
                  />
                  {emailForm.formState.errors.password && (
                    <div className="text-sm text-red-400 mt-1">
                      {emailForm.formState.errors.password.message}
                    </div>
                  )}
                </div>

                {error && (
                  <div className="p-3 rounded-xl bg-red-500/10 border border-red-500/20 text-red-400 text-sm">
                    {error}
                  </div>
                )}

                <Button
                  type="submit"
                  disabled={loading || emailForm.formState.isSubmitting}
                  className="w-full"
                  variant="glass"
                  rounded="2xl"
                >
                  {loading || emailForm.formState.isSubmitting
                    ? (isSignUp ? 'Creating account...' : 'Signing in...')
                    : (isSignUp ? 'Create Account' : 'Sign In')}
                </Button>

                <button
                  type="button"
                  onClick={() => setIsSignUp(!isSignUp)}
                  className="w-full text-sm text-zinc-400 hover:text-white transition text-center"
                >
                  {isSignUp
                    ? 'Already have an account? Sign in'
                    : "Don't have an account? Sign up"}
                </button>
              </form>
            </div>
          </div>
        )}

        <p className="text-center text-xs text-zinc-500 mt-8">
          By continuing, you agree to our Terms of Service and Privacy Policy
        </p>
      </div>
    </main>
  )
}
