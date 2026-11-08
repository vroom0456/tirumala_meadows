import type { ProjectStatus, TaskStatus, TaskPriority, Role } from './types'

export const fmtDate = (d: string | null) =>
  d ? new Date(d).toLocaleDateString('en-IN', { day: '2-digit', month: 'short', year: 'numeric' }) : '-'

export const today = () => new Date().toISOString().slice(0, 10)
export const isOverdue = (due: string | null, status: TaskStatus) => !!due && status !== 'done' && due < today()

export const statusLabel: Record<ProjectStatus, string> = {
  planning: 'Planning', active: 'Active', on_hold: 'On hold', completed: 'Completed',
}
export const taskStatusLabel: Record<TaskStatus, string> = {
  todo: 'To do', in_progress: 'In progress', blocked: 'Blocked', done: 'Done',
}
export const priorityLabel: Record<TaskPriority, string> = { low: 'Low', medium: 'Medium', high: 'High' }
export const roleLabel: Record<Role, string> = { admin: 'Admin', manager: 'Project Manager', engineer: 'Site Engineer' }

/** Restrained semantic colours; everything else stays neutral. */
export const toneClass = {
  neutral: 'bg-panel2 text-mute border-line',
  accent: 'bg-accent/10 text-accent border-accent/30',
  warn: 'bg-amber-400/10 text-amber-300 border-amber-400/30',
  danger: 'bg-red-400/10 text-red-300 border-red-400/30',
  ok: 'bg-emerald-400/10 text-emerald-300 border-emerald-400/30',
} as const
export type Tone = keyof typeof toneClass

export const projectTone: Record<ProjectStatus, Tone> = { planning: 'neutral', active: 'accent', on_hold: 'warn', completed: 'ok' }
export const taskTone: Record<TaskStatus, Tone> = { todo: 'neutral', in_progress: 'accent', blocked: 'danger', done: 'ok' }

export const canManage = (role: Role | undefined) => role === 'admin' || role === 'manager'
