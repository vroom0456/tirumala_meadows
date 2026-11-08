import { Link } from 'react-router-dom'
import { Bar, BarChart, CartesianGrid, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'
import { api } from '../lib/api'
import { Badge, Card, Empty, ErrorBox, PageHeader, ProgressBar, Spinner, useAsync } from '../components/ui'
import { fmtDate, isOverdue, taskTone, taskStatusLabel } from '../lib/utils'

function Stat({ label, value, tone }: { label: string; value: number | string; tone?: string }) {
  return (
    <Card className="p-4">
      <p className="text-xs text-mute">{label}</p>
      <p className={`mt-1 text-2xl font-semibold tabular-nums ${tone ?? ''}`}>{value}</p>
    </Card>
  )
}

export default function Dashboard() {
  const { data, error, loading } = useAsync(
    async () => {
      const [projects, tasks, logs] = await Promise.all([api.listProjects(), api.listTasks(), api.listLogs(undefined, 5)])
      return { projects, tasks, logs }
    }, [])

  if (loading) return <Spinner />
  if (error || !data) return <ErrorBox message={error || 'Failed to load'} />
  const { projects, tasks, logs } = data

  const active = projects.filter((p) => p.status === 'active')
  const overdue = tasks.filter((t) => isOverdue(t.due_date, t.status))
  const blocked = tasks.filter((t) => t.status === 'blocked')
  const avg = active.length ? Math.round(active.reduce((s, p) => s + p.progress, 0) / active.length) : 0
  const chart = projects.map((p) => ({ name: p.name.replace(/ \(Demo\)/, '').slice(0, 18), progress: p.progress }))

  return (
    <>
      <PageHeader title="Dashboard" subtitle="Portfolio overview across your projects" />
      <div className="grid grid-cols-2 gap-3 lg:grid-cols-4">
        <Stat label="Active projects" value={active.length} />
        <Stat label="Avg. active progress" value={`${avg}%`} />
        <Stat label="Overdue tasks" value={overdue.length} tone={overdue.length ? 'text-red-300' : ''} />
        <Stat label="Blocked tasks" value={blocked.length} tone={blocked.length ? 'text-amber-300' : ''} />
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-5">
        <Card className="p-4 lg:col-span-3">
          <h2 className="mb-3 text-sm font-medium">Progress by project</h2>
          {chart.length === 0 ? <Empty title="No projects yet" /> : (
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={chart} margin={{ left: -20, right: 8 }}>
                  <CartesianGrid stroke="#22304A" vertical={false} />
                  <XAxis dataKey="name" tick={{ fill: '#8A97B0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <YAxis domain={[0, 100]} tick={{ fill: '#8A97B0', fontSize: 11 }} axisLine={false} tickLine={false} />
                  <Tooltip cursor={{ fill: '#18233A' }} contentStyle={{ background: '#111A2B', border: '1px solid #22304A', borderRadius: 6, fontSize: 12 }} formatter={(v: number) => [`${v}%`, 'Progress']} />
                  <Bar dataKey="progress" radius={[3, 3, 0, 0]}>
                    {chart.map((_, i) => <Cell key={i} fill="#2DD4BF" />)}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          )}
        </Card>

        <Card className="p-4 lg:col-span-2">
          <h2 className="mb-3 text-sm font-medium">Needs attention</h2>
          {overdue.length + blocked.length === 0 ? <Empty title="Nothing overdue or blocked" /> : (
            <ul className="space-y-3">
              {[...overdue, ...blocked.filter((b) => !overdue.includes(b))].slice(0, 6).map((t) => (
                <li key={t.id} className="text-sm">
                  <div className="flex items-start justify-between gap-2">
                    <Link to={`/projects/${t.project_id}`} className="hover:text-accent">{t.title}</Link>
                    <Badge tone={isOverdue(t.due_date, t.status) ? 'danger' : taskTone[t.status]}>
                      {isOverdue(t.due_date, t.status) ? 'Overdue' : taskStatusLabel[t.status]}
                    </Badge>
                  </div>
                  <p className="text-xs text-mute">{t.project_name} · due {fmtDate(t.due_date)}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>

      <div className="mt-4 grid gap-4 lg:grid-cols-2">
        <Card className="p-4">
          <h2 className="mb-3 text-sm font-medium">Active projects</h2>
          {active.length === 0 ? <Empty title="No active projects" /> : (
            <ul className="space-y-4">
              {active.map((p) => (
                <li key={p.id}>
                  <div className="mb-1.5 flex items-center justify-between text-sm">
                    <Link to={`/projects/${p.id}`} className="hover:text-accent">{p.name}</Link>
                    <span className="tabular-nums text-mute">{p.progress}%</span>
                  </div>
                  <ProgressBar value={p.progress} />
                </li>
              ))}
            </ul>
          )}
        </Card>
        <Card className="p-4">
          <h2 className="mb-3 text-sm font-medium">Recent site updates</h2>
          {logs.length === 0 ? <Empty title="No progress logs yet" hint="Site engineers submit daily logs from a project page." /> : (
            <ul className="space-y-3">
              {logs.map((l) => (
                <li key={l.id} className="text-sm">
                  <p className="line-clamp-2">{l.work_done}</p>
                  <p className="text-xs text-mute">{l.project_name} · {l.author_name} · {fmtDate(l.log_date)}</p>
                </li>
              ))}
            </ul>
          )}
        </Card>
      </div>
      <p className="mt-6 text-xs text-mute">Progress is the weighted average of milestone progress.</p>
    </>
  )
}
