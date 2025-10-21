import { create } from 'zustand'
import type { User } from '@supabase/supabase-js'

type AuthState = { user: User | null }
type AuthActions = { setUser: (u: User | null) => void }

export const useAuth = create<AuthState & AuthActions>((set) => ({
  user: null,
  setUser: (user) => set({ user })
}))
