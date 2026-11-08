import { useState, type FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import { HardHat } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../lib/auth'
import { Button, Card, ErrorBox, Field, Input } from '../components/ui'
import type { Role } from '../lib/types'

export default function Login() {
  const { user, setUser } = useAuth()
  const nav = useNavigate()
  const [mode, setMode] = useState<'in' | 'up'>('in')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [name, setName] = useState('')
  const [error, setError] = useState('')
  const [info, setInfo] = useState('')
  const [busy, setBusy] = useState(false)

  if (user) return <Navigate to="/portal" replace />

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    setBusy(true); setError(''); setInfo('')
    try {
      if (mode === 'in') {
        setUser(await api.signIn(email, password)); nav('/portal')
      } else {
        await api.signUp(email, password, name)
        setInfo('Account created. If email confirmation is enabled, confirm your email, then sign in.')
        setMode('in')
      }
    } catch (err) { setError((err as Error).message) } finally { setBusy(false) }
  }

  const demo = async (role: Role) => { setUser(await api.demoSignIn(role)); nav('/portal') }

  return (
    <div className="flex min-h-screen items-center justify-center p-4">
      <div className="w-full max-w-sm">
        <div className="mb-4 text-center">
          <Link to="/" className="text-xs text-hotpink hover:underline">
            ← Back to Mansani Thirumala Meadows
          </Link>
        </div>
        <div className="mb-6 flex items-center justify-center gap-2">
          <HardHat className="h-6 w-6 text-accent" />
          <span className="text-xl font-semibold tracking-tight">BuildTrack</span>
        </div>
        <Card className="p-5">
          {api.mode === 'demo' ? (
            <div className="space-y-3">
              <p className="text-sm text-mute">Demo mode. Pick a role to explore with sample data.</p>
              <Button className="w-full" onClick={() => demo('admin')}>Continue as Admin</Button>
              <Button variant="ghost" className="w-full" onClick={() => demo('manager')}>Continue as Project Manager</Button>
              <Button variant="ghost" className="w-full" onClick={() => demo('engineer')}>Continue as Site Engineer</Button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-3">
              <h1 className="text-base font-semibold">{mode === 'in' ? 'Sign in' : 'Create account'}</h1>
              {error && <ErrorBox message={error} />}
              {info && <p className="text-xs text-accent">{info}</p>}
              {mode === 'up' && <Field label="Full name"><Input required value={name} onChange={(e) => setName(e.target.value)} /></Field>}
              <Field label="Email"><Input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} /></Field>
              <Field label="Password"><Input type="password" required minLength={6} value={password} onChange={(e) => setPassword(e.target.value)} /></Field>
              <Button className="w-full" disabled={busy}>{busy ? 'Please wait...' : mode === 'in' ? 'Sign in' : 'Sign up'}</Button>
              <button type="button" className="w-full text-xs text-mute hover:text-fg" onClick={() => { setMode(mode === 'in' ? 'up' : 'in'); setError('') }}>
                {mode === 'in' ? 'No account? Sign up' : 'Have an account? Sign in'}
              </button>
            </form>
          )}
        </Card>
        <p className="mt-4 text-center text-xs text-mute">Academic project. Not a deployed product of any company.</p>
      </div>
    </div>
  )
}
