import { createContext, useContext, useEffect, useState, type ReactNode } from 'react'
import { api } from './api'
import type { Profile } from './types'

interface AuthCtx { user: Profile | null; loading: boolean; setUser: (p: Profile | null) => void }
const Ctx = createContext<AuthCtx>({ user: null, loading: true, setUser: () => {} })

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    api.getSession().then(setUser).catch(() => setUser(null)).finally(() => setLoading(false))
  }, [])
  return <Ctx.Provider value={{ user, loading, setUser }}>{children}</Ctx.Provider>
}
export const useAuth = () => useContext(Ctx)
