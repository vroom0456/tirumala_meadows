import { useEffect, useState, type ReactNode, type ButtonHTMLAttributes, type InputHTMLAttributes, type SelectHTMLAttributes, type TextareaHTMLAttributes } from 'react'
import { Loader2, X } from 'lucide-react'
import { toneClass, type Tone } from '../lib/utils'

export function Card({ children, className = '' }: { children: ReactNode; className?: string }) {
  return <div className={`rounded-lg border border-line bg-panel ${className}`}>{children}</div>
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: Tone }) {
  return <span className={`inline-flex items-center rounded border px-1.5 py-0.5 text-xs font-medium ${toneClass[tone]}`}>{children}</span>
}

export function Button({ variant = 'primary', className = '', ...p }: ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'ghost' }) {
  const base = 'inline-flex items-center justify-center gap-1.5 rounded-md px-3 h-9 text-sm font-medium transition disabled:opacity-50 disabled:cursor-not-allowed'
  const v = variant === 'primary' ? 'bg-accent text-ink hover:brightness-110' : 'border border-line text-fg hover:bg-panel2'
  return <button className={`${base} ${v} ${className}`} {...p} />
}

const field = 'w-full rounded-md border border-line bg-panel2 px-3 h-9 text-sm text-fg placeholder:text-mute focus:outline-none focus:border-accent'
export function Input(p: InputHTMLAttributes<HTMLInputElement>) { return <input {...p} className={`${field} ${p.className ?? ''}`} /> }
export function Select(p: SelectHTMLAttributes<HTMLSelectElement>) { return <select {...p} className={`${field} ${p.className ?? ''}`} /> }
export function Textarea(p: TextareaHTMLAttributes<HTMLTextAreaElement>) {
  return <textarea {...p} className={`${field} h-auto py-2 min-h-[72px] ${p.className ?? ''}`} />
}
export function Field({ label, children }: { label: string; children: ReactNode }) {
  return <label className="block"><span className="mb-1 block text-xs text-mute">{label}</span>{children}</label>
}

export function ProgressBar({ value, className = '' }: { value: number; className?: string }) {
  return (
    <div className={`h-1.5 w-full rounded-full bg-panel2 ${className}`} role="progressbar" aria-valuenow={value} aria-valuemin={0} aria-valuemax={100}>
      <div className="h-full rounded-full bg-accent" style={{ width: `${Math.max(0, Math.min(100, value))}%` }} />
    </div>
  )
}

export function Spinner() {
  return <div className="flex items-center justify-center py-16 text-mute"><Loader2 className="h-5 w-5 animate-spin" /></div>
}
export function ErrorBox({ message }: { message: string }) {
  return <div className="rounded-md border border-red-400/30 bg-red-400/10 px-3 py-2 text-sm text-red-300">{message}</div>
}
export function Empty({ title, hint }: { title: string; hint?: string }) {
  return (
    <div className="flex flex-col items-center justify-center py-12 text-center">
      <p className="text-sm font-medium">{title}</p>
      {hint && <p className="mt-1 text-xs text-mute">{hint}</p>}
    </div>
  )
}
export function PageHeader({ title, subtitle, action }: { title: string; subtitle?: string; action?: ReactNode }) {
  return (
    <div className="mb-6 flex flex-wrap items-start justify-between gap-3">
      <div>
        <h1 className="text-xl font-semibold tracking-tight">{title}</h1>
        {subtitle && <p className="mt-0.5 text-sm text-mute">{subtitle}</p>}
      </div>
      {action}
    </div>
  )
}

export function Modal({ title, onClose, children }: { title: string; onClose: () => void; children: ReactNode }) {
  useEffect(() => {
    const h = (e: KeyboardEvent) => e.key === 'Escape' && onClose()
    window.addEventListener('keydown', h)
    return () => window.removeEventListener('keydown', h)
  }, [onClose])
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4" onMouseDown={onClose}>
      <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-lg border border-line bg-panel p-5 shadow-2xl" onMouseDown={(e) => e.stopPropagation()} role="dialog" aria-modal="true" aria-label={title}>
        <div className="mb-4 flex items-center justify-between">
          <h2 className="text-base font-semibold">{title}</h2>
          <button onClick={onClose} aria-label="Close" className="rounded p-1 text-mute hover:bg-panel2"><X className="h-4 w-4" /></button>
        </div>
        {children}
      </div>
    </div>
  )
}

/** Loads async data with loading + error state. */
export function useAsync<T>(fn: () => Promise<T>, deps: unknown[]) {
  const [data, setData] = useState<T | null>(null)
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(true)
  const [tick, setTick] = useState(0)
  useEffect(() => {
    let live = true
    setLoading(true)
    fn().then((d) => { if (live) { setData(d); setError('') } })
      .catch((e: Error) => live && setError(e.message))
      .finally(() => live && setLoading(false))
    return () => { live = false }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [...deps, tick])
  return { data, error, loading, reload: () => setTick((t) => t + 1) }
}
