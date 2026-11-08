import { useState, type FormEvent } from 'react'
import { Link, useParams } from 'react-router-dom'
import { ArrowLeft, Download, Plus } from 'lucide-react'
import { api } from '../lib/api'
import { useAuth } from '../lib/auth'
import { Badge, Button, Card, Empty, ErrorBox, Field, Input, Modal, PageHeader, ProgressBar, Select, Spinner, Textarea, useAsync } from '../components/ui'
import { canManage, fmtDate, isOverdue, priorityLabel, projectTone, statusLabel, taskStatusLabel, taskTone, today } from '../lib/utils'
import type { DocCategory, Milestone, TaskPriority, TaskStatus } from '../lib/types'

type Tab = 'overview' | 'tasks' | 'logs' | 'documents'
const tabs: { id: Tab; label: string }[] = [
  { id: 'overview', label: 'Overview & milestones' }, { id: 'tasks', label: 'Tasks' },
  { id: 'logs', label: 'Progress logs' }, { id: 'documents', label: 'Documents' },
]

/* ---------- Milestones ---------- */
function MilestonesTab({ pid, onChange }: { pid: string; onChange: () => void }) {
  const { user } = useAuth()
  const { data, error, loading, reload } = useAsync(() => api.listMilestones(pid), [pid])
  const [adding, setAdding] = useState(false)
  const [f, setF] = useState({ title: '', due_date: '', weight: 10 })
  const [err, setErr] = useState('')

  const update = async (m: Milestone, pct: number) => {
    setErr('')
    try { await api.setMilestoneProgress(m.id, pct); reload(); onChange() } catch (e) { setErr((e as Error).message) }
  }
  const add = async (e: FormEvent) => {
    e.preventDefault(); setErr('')
    try { await api.addMilestone({ project_id: pid, ...f }); setAdding(false); setF({ title: '', due_date: '', weight: 10 }); reload(); onChange() }
    catch (e2) { setErr((e2 as Error).message) }
  }

  if (loading) return <Spinner />
  if (error) return <ErrorBox message={error} />
  const ms = data ?? []
  return (
    <div>
      <div className="mb-3 flex items-center justify-between">
        <p className="text-xs text-mute">Project progress is the weight-averaged progress of its milestones.</p>
        {canManage(user?.role) && <Button variant="ghost" onClick={() => setAdding(true)}><Plus className="h-4 w-4" />Milestone</Button>}
      </div>
      {err && <div className="mb-3"><ErrorBox message={err} /></div>}
      {ms.length === 0 ? <Card><Empty title="No milestones" hint="Add milestones to start tracking progress." /></Card> : (
        <div className="space-y-2">
          {ms.map((m) => (
            <Card key={m.id} className="p-4">
              <div className="mb-2 flex flex-wrap items-center justify-between gap-2">
                <div>
                  <p className="text-sm font-medium">{m.title}</p>
                  <p className="text-xs text-mute">Due {fmtDate(m.due_date)} · weight {m.weight}</p>
                </div>
                <span className="text-sm tabular-nums">{m.progress}%</span>
              </div>
              <ProgressBar value={m.progress} />
              <input type="range" min={0} max={100} step={5} defaultValue={m.progress} aria-label={`Progress for ${m.title}`}
                onMouseUp={(e) => update(m, Number((e.target as HTMLInputElement).value))}
                onTouchEnd={(e) => update(m, Number((e.target as HTMLInputElement).value))}
                onKeyUp={(e) => update(m, Number((e.target as HTMLInputElement).value))}
                className="mt-3 w-full accent-[#2DD4BF]" />
            </Card>
          ))}
        </div>
      )}
      {adding && (
        <Modal title="New milestone" onClose={() => setAdding(false)}>
          <form onSubmit={add} className="space-y-3">
            <Field label="Title"><Input required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Due date"><Input type="date" value={f.due_date} onChange={(e) => setF({ ...f, due_date: e.target.value })} /></Field>
              <Field label="Weight (1-100)"><Input type="number" min={1} max={100} required value={f.weight} onChange={(e) => setF({ ...f, weight: Number(e.target.value) })} /></Field>
            </div>
            <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button>Add</Button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ---------- Tasks ---------- */
function TasksTab({ pid }: { pid: string }) {
  const { user } = useAuth()
  const { data, error, loading, reload } = useAsync(async () => {
    const [tasks, ms, people] = await Promise.all([api.listTasks(pid), api.listMilestones(pid), api.listProfiles()])
    return { tasks, ms, people }
  }, [pid])
  const [adding, setAdding] = useState(false)
  const [f, setF] = useState({ title: '', milestone_id: '', assignee_id: '', priority: 'medium' as TaskPriority, due_date: '' })
  const [err, setErr] = useState('')

  const setStatus = async (id: string, s: TaskStatus) => {
    setErr('')
    try { await api.setTaskStatus(id, s); reload() } catch (e) { setErr((e as Error).message) }
  }
  const add = async (e: FormEvent) => {
    e.preventDefault(); setErr('')
    try { await api.addTask({ project_id: pid, ...f }); setAdding(false); setF({ ...f, title: '' }); reload() } catch (e2) { setErr((e2 as Error).message) }
  }

  if (loading) return <Spinner />
  if (error || !data) return <ErrorBox message={error} />
  const { tasks, ms, people } = data
  const msName = (id: string | null) => ms.find((m) => m.id === id)?.title ?? '-'
  return (
    <div>
      <div className="mb-3 flex justify-end">
        {canManage(user?.role) && <Button variant="ghost" onClick={() => setAdding(true)}><Plus className="h-4 w-4" />Task</Button>}
      </div>
      {err && <div className="mb-3"><ErrorBox message={err} /></div>}
      {tasks.length === 0 ? <Card><Empty title="No tasks yet" /></Card> : (
        <Card className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-sm">
            <thead><tr className="border-b border-line text-left text-xs text-mute">
              <th className="p-3 font-medium">Task</th><th className="p-3 font-medium">Milestone</th><th className="p-3 font-medium">Assignee</th>
              <th className="p-3 font-medium">Due</th><th className="p-3 font-medium">Status</th>
            </tr></thead>
            <tbody>
              {tasks.map((t) => {
                const mine = t.assignee_id === user?.id
                const editable = canManage(user?.role) || mine
                return (
                  <tr key={t.id} className="border-b border-line last:border-0">
                    <td className="p-3">{t.title}<div className="mt-0.5 text-xs text-mute">{priorityLabel[t.priority]} priority</div></td>
                    <td className="p-3 text-mute">{msName(t.milestone_id)}</td>
                    <td className="p-3 text-mute">{t.assignee_name ?? 'Unassigned'}</td>
                    <td className="p-3">
                      <span className={isOverdue(t.due_date, t.status) ? 'text-red-300' : 'text-mute'}>{fmtDate(t.due_date)}</span>
                    </td>
                    <td className="p-3">
                      {editable ? (
                        <Select value={t.status} onChange={(e) => setStatus(t.id, e.target.value as TaskStatus)} className="w-36" aria-label={`Status for ${t.title}`}>
                          {Object.entries(taskStatusLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                        </Select>
                      ) : <Badge tone={taskTone[t.status]}>{taskStatusLabel[t.status]}</Badge>}
                    </td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </Card>
      )}
      {adding && (
        <Modal title="New task" onClose={() => setAdding(false)}>
          <form onSubmit={add} className="space-y-3">
            <Field label="Title"><Input required value={f.title} onChange={(e) => setF({ ...f, title: e.target.value })} /></Field>
            <div className="grid grid-cols-2 gap-3">
              <Field label="Milestone">
                <Select value={f.milestone_id} onChange={(e) => setF({ ...f, milestone_id: e.target.value })}>
                  <option value="">None</option>{ms.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
                </Select>
              </Field>
              <Field label="Assignee">
                <Select value={f.assignee_id} onChange={(e) => setF({ ...f, assignee_id: e.target.value })}>
                  <option value="">Unassigned</option>{people.map((p) => <option key={p.id} value={p.id}>{p.full_name}</option>)}
                </Select>
              </Field>
              <Field label="Priority">
                <Select value={f.priority} onChange={(e) => setF({ ...f, priority: e.target.value as TaskPriority })}>
                  {Object.entries(priorityLabel).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                </Select>
              </Field>
              <Field label="Due date"><Input type="date" value={f.due_date} onChange={(e) => setF({ ...f, due_date: e.target.value })} /></Field>
            </div>
            <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button>Add task</Button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ---------- Progress logs ---------- */
function LogsTab({ pid }: { pid: string }) {
  const { data, error, loading, reload } = useAsync(async () => {
    const [logs, ms] = await Promise.all([api.listLogs(pid), api.listMilestones(pid)])
    return { logs, ms }
  }, [pid])
  const [adding, setAdding] = useState(false)
  const [f, setF] = useState({ log_date: today(), milestone_id: '', work_done: '', manpower: '', issues: '' })
  const [files, setFiles] = useState<File[]>([])
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const add = async (e: FormEvent) => {
    e.preventDefault(); setErr(''); setBusy(true)
    try {
      await api.addLog({ project_id: pid, log_date: f.log_date, milestone_id: f.milestone_id || undefined, work_done: f.work_done,
        manpower: f.manpower === '' ? undefined : Number(f.manpower), issues: f.issues || undefined, files })
      setAdding(false); setFiles([]); setF({ ...f, work_done: '', manpower: '', issues: '' }); reload()
    } catch (e2) { setErr((e2 as Error).message) } finally { setBusy(false) }
  }

  if (loading) return <Spinner />
  if (error || !data) return <ErrorBox message={error} />
  const { logs, ms } = data
  return (
    <div>
      <div className="mb-3 flex justify-end"><Button onClick={() => setAdding(true)}><Plus className="h-4 w-4" />Add daily log</Button></div>
      {logs.length === 0 ? <Card><Empty title="No logs yet" hint="Record today's site progress with photos." /></Card> : (
        <div className="space-y-3">
          {logs.map((l) => (
            <Card key={l.id} className="p-4">
              <div className="mb-1 flex items-center justify-between text-xs text-mute">
                <span>{fmtDate(l.log_date)} · {l.author_name}</span>
                {l.manpower != null && <span>{l.manpower} workers</span>}
              </div>
              <p className="text-sm">{l.work_done}</p>
              {l.issues && <p className="mt-2 text-xs text-amber-300">Issue: {l.issues}</p>}
              {l.milestone_id && <p className="mt-1 text-xs text-mute">Milestone: {ms.find((m) => m.id === l.milestone_id)?.title}</p>}
              {l.photos.length > 0 && (
                <div className="mt-3 flex flex-wrap gap-2">
                  {l.photos.map((u, i) => <a key={i} href={u} target="_blank" rel="noreferrer"><img src={u} alt="Site photo" className="h-20 w-20 rounded border border-line object-cover" /></a>)}
                </div>
              )}
            </Card>
          ))}
        </div>
      )}
      {adding && (
        <Modal title="Daily progress log" onClose={() => setAdding(false)}>
          <form onSubmit={add} className="space-y-3">
            {err && <ErrorBox message={err} />}
            <div className="grid grid-cols-2 gap-3">
              <Field label="Date"><Input type="date" required max={today()} value={f.log_date} onChange={(e) => setF({ ...f, log_date: e.target.value })} /></Field>
              <Field label="Workers on site"><Input type="number" min={0} value={f.manpower} onChange={(e) => setF({ ...f, manpower: e.target.value })} /></Field>
            </div>
            <Field label="Milestone">
              <Select value={f.milestone_id} onChange={(e) => setF({ ...f, milestone_id: e.target.value })}>
                <option value="">General</option>{ms.map((m) => <option key={m.id} value={m.id}>{m.title}</option>)}
              </Select>
            </Field>
            <Field label="Work done"><Textarea required value={f.work_done} onChange={(e) => setF({ ...f, work_done: e.target.value })} /></Field>
            <Field label="Issues / delays (optional)"><Textarea value={f.issues} onChange={(e) => setF({ ...f, issues: e.target.value })} /></Field>
            <Field label="Site photos">
              <input type="file" accept="image/*" multiple onChange={(e) => setFiles(Array.from(e.target.files ?? []))} className="block w-full text-xs text-mute file:mr-3 file:rounded file:border file:border-line file:bg-panel2 file:px-2 file:py-1 file:text-fg" />
            </Field>
            <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button disabled={busy}>{busy ? 'Saving...' : 'Save log'}</Button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ---------- Documents ---------- */
function DocsTab({ pid }: { pid: string }) {
  const { data, error, loading, reload } = useAsync(() => api.listDocs(pid), [pid])
  const [adding, setAdding] = useState(false)
  const [title, setTitle] = useState('')
  const [category, setCategory] = useState<DocCategory>('other')
  const [file, setFile] = useState<File | null>(null)
  const [err, setErr] = useState('')
  const [busy, setBusy] = useState(false)

  const add = async (e: FormEvent) => {
    e.preventDefault()
    if (!file) { setErr('Choose a file'); return }
    if (file.size > 20 * 1024 * 1024) { setErr('File must be under 20 MB'); return }
    setErr(''); setBusy(true)
    try { await api.addDoc({ project_id: pid, title, category, file }); setAdding(false); setTitle(''); setFile(null); reload() }
    catch (e2) { setErr((e2 as Error).message) } finally { setBusy(false) }
  }
  const open = async (path: string) => { const u = await api.docUrl(path); if (u !== '#') window.open(u, '_blank') }

  if (loading) return <Spinner />
  if (error) return <ErrorBox message={error} />
  const docs = data ?? []
  return (
    <div>
      <div className="mb-3 flex justify-end"><Button variant="ghost" onClick={() => setAdding(true)}><Plus className="h-4 w-4" />Upload document</Button></div>
      {docs.length === 0 ? <Card><Empty title="No documents" hint="Upload drawings, contracts and permits." /></Card> : (
        <Card>
          <ul>
            {docs.map((d) => (
              <li key={d.id} className="flex items-center justify-between gap-3 border-b border-line p-3 last:border-0">
                <div className="min-w-0">
                  <p className="truncate text-sm">{d.title}</p>
                  <p className="text-xs text-mute">{d.uploaded_by_name} · {fmtDate(d.created_at)}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Badge>{d.category}</Badge>
                  <button onClick={() => open(d.storage_path)} aria-label={`Open ${d.title}`} className="rounded p-1.5 text-mute hover:bg-panel2 hover:text-fg"><Download className="h-4 w-4" /></button>
                </div>
              </li>
            ))}
          </ul>
        </Card>
      )}
      {adding && (
        <Modal title="Upload document" onClose={() => setAdding(false)}>
          <form onSubmit={add} className="space-y-3">
            {err && <ErrorBox message={err} />}
            <Field label="Title"><Input required value={title} onChange={(e) => setTitle(e.target.value)} /></Field>
            <Field label="Category">
              <Select value={category} onChange={(e) => setCategory(e.target.value as DocCategory)}>
                {['drawing', 'contract', 'permit', 'report', 'other'].map((c) => <option key={c} value={c}>{c}</option>)}
              </Select>
            </Field>
            <Field label="File"><input type="file" required onChange={(e) => setFile(e.target.files?.[0] ?? null)} className="block w-full text-xs text-mute file:mr-3 file:rounded file:border file:border-line file:bg-panel2 file:px-2 file:py-1 file:text-fg" /></Field>
            <div className="flex justify-end gap-2 pt-2"><Button type="button" variant="ghost" onClick={() => setAdding(false)}>Cancel</Button><Button disabled={busy}>{busy ? 'Uploading...' : 'Upload'}</Button></div>
          </form>
        </Modal>
      )}
    </div>
  )
}

/* ---------- Page ---------- */
export default function ProjectDetail() {
  const { id = '' } = useParams()
  const { data: p, error, loading, reload } = useAsync(() => api.getProject(id), [id])
  const [tab, setTab] = useState<Tab>('overview')

  if (loading) return <Spinner />
  if (error) return <ErrorBox message={error} />
  if (!p) return <Card><Empty title="Project not found" hint="It may not exist or you may not have access." /></Card>

  return (
    <>
      <Link to="/projects" className="mb-3 inline-flex items-center gap-1 text-xs text-mute hover:text-fg"><ArrowLeft className="h-3.5 w-3.5" />Projects</Link>
      <PageHeader title={p.name} subtitle={[p.location, `${fmtDate(p.start_date)} to ${fmtDate(p.end_date)}`].filter(Boolean).join(' · ')}
        action={<Badge tone={projectTone[p.status]}>{statusLabel[p.status]}</Badge>} />
      <Card className="mb-5 p-4">
        <div className="mb-1.5 flex justify-between text-sm"><span className="text-mute">Overall progress</span><span className="tabular-nums">{p.progress}%</span></div>
        <ProgressBar value={p.progress} />
        {p.description && <p className="mt-3 text-sm text-mute">{p.description}</p>}
      </Card>
      <div className="mb-4 flex gap-1 overflow-x-auto border-b border-line" role="tablist">
        {tabs.map((t) => (
          <button key={t.id} role="tab" aria-selected={tab === t.id} onClick={() => setTab(t.id)}
            className={`whitespace-nowrap border-b-2 px-3 py-2 text-sm ${tab === t.id ? 'border-accent text-fg' : 'border-transparent text-mute hover:text-fg'}`}>{t.label}</button>
        ))}
      </div>
      {tab === 'overview' && <MilestonesTab pid={id} onChange={reload} />}
      {tab === 'tasks' && <TasksTab pid={id} />}
      {tab === 'logs' && <LogsTab pid={id} />}
      {tab === 'documents' && <DocsTab pid={id} />}
    </>
  )
}
