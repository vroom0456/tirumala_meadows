import { useState, type FormEvent } from 'react'
import { Link } from 'react-router-dom'
import { MapPin, Plus } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../lib/auth'
import { Badge, Button, Card, Empty, ErrorBox, Field, Input, Modal, PageHeader, ProgressBar, Select, Spinner, Textarea, useAsync } from '../components/ui'
import { canManage, fmtDate, projectTone, statusLabel } from '../lib/utils'
import type { ProjectStatus } from '../lib/types'

function NewProjectModal({ onClose, onDone }: { onClose: () => void; onDone: () => void }) {
  const [f, setF] = useState({ name: '', location: '', description: '', status: 'planning' as ProjectStatus, start_date: '', end_date: '' })
  const [error, setError] = useState('')
  const [busy, setBusy] = useState(false)
  const set = (k: keyof typeof f) => (e: { target: { value: string } }) => setF({ ...f, [k]: e.target.value })

  const submit = async (e: FormEvent) => {
    e.preventDefault()
    if (f.start_date && f.end_date && f.end_date < f.start_date) { setError('End date must be on or after start date'); return }
    setBusy(true); setError('')
    try { await api.createProject(f); onDone() } catch (err) { setError((err as Error).message); setBusy(false) }
  }
  return (
    <Modal title="New project" onClose={onClose}>
      <form onSubmit={submit} className="space-y-3">
        {error && <ErrorBox message={error} />}
        <Field label="Name"><Input required minLength={2} maxLength={120} value={f.name} onChange={set('name')} /></Field>
        <Field label="Location"><Input value={f.location} onChange={set('location')} /></Field>
        <Field label="Description"><Textarea value={f.description} onChange={set('description')} /></Field>
        <div className="grid grid-cols-3 gap-3">
          <Field label="Status">
            <Select value={f.status} onChange={set('status')}>
              {Object.entries(statusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
            </Select>
          </Field>
          <Field label="Start"><Input type="date" value={f.start_date} onChange={set('start_date')} /></Field>
          <Field label="End"><Input type="date" value={f.end_date} onChange={set('end_date')} /></Field>
        </div>
        <div className="flex justify-end gap-2 pt-2">
          <Button type="button" variant="ghost" onClick={onClose}>Cancel</Button>
          <Button disabled={busy}>{busy ? 'Creating...' : 'Create project'}</Button>
        </div>
      </form>
    </Modal>
  )
}

export default function Projects() {
  const { user } = useAuth()
  const { data, error, loading, reload } = useAsync(() => api.listProjects(), [])
  const [open, setOpen] = useState(false)
  const [filter, setFilter] = useState<'all' | ProjectStatus>('all')

  const list = (data ?? []).filter((p) => filter === 'all' || p.status === filter)

  return (
    <>
      <PageHeader title="Projects" subtitle="All construction projects you have access to"
        action={canManage(user?.role) && <Button onClick={() => setOpen(true)}><Plus className="h-4 w-4" />New project</Button>} />
      <div className="mb-4 w-44">
        <Select value={filter} onChange={(e) => setFilter(e.target.value as 'all' | ProjectStatus)} aria-label="Filter by status">
          <option value="all">All statuses</option>
          {Object.entries(statusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
        </Select>
      </div>
      {loading ? <Spinner /> : error ? <ErrorBox message={error} /> : list.length === 0 ? (
        <Card><Empty title="No projects found" hint={canManage(user?.role) ? 'Create your first project to get started.' : 'You have not been added to any project yet.'} /></Card>
      ) : (
        <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
          {list.map((p) => (
            <Link key={p.id} to={`/projects/${p.id}`}>
              <Card className="h-full p-4 transition hover:border-accent/50">
                <div className="mb-2 flex items-start justify-between gap-2">
                  <h3 className="text-sm font-medium">{p.name}</h3>
                  <Badge tone={projectTone[p.status]}>{statusLabel[p.status]}</Badge>
                </div>
                {p.location && <p className="mb-3 flex items-center gap-1 text-xs text-mute"><MapPin className="h-3 w-3" />{p.location}</p>}
                <div className="mb-1 flex justify-between text-xs"><span className="text-mute">Progress</span><span className="tabular-nums">{p.progress}%</span></div>
                <ProgressBar value={p.progress} />
                <p className="mt-3 text-xs text-mute">{fmtDate(p.start_date)} to {fmtDate(p.end_date)}</p>
              </Card>
            </Link>
          ))}
        </div>
      )}
      {open && <NewProjectModal onClose={() => setOpen(false)} onDone={() => { setOpen(false); reload() }} />}
    </>
  )
}
