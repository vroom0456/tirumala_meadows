import type { Api, Profile, Project, Milestone, Task, ProgressLog, DocumentRow, Role } from './types'

// DEMO MODE: in-memory sample data (fictional projects). Nothing is saved; refresh resets it.
const delay = <T,>(v: T): Promise<T> => new Promise((r) => setTimeout(() => r(v), 120))
const uid = () => Math.random().toString(36).slice(2, 10)
const day = (offset: number) => {
  const d = new Date(); d.setDate(d.getDate() + offset)
  return d.toISOString().slice(0, 10)
}

const profiles: Profile[] = [
  { id: 'u-admin', full_name: 'Demo Admin', role: 'admin' },
  { id: 'u-mgr', full_name: 'Demo Project Manager', role: 'manager' },
  { id: 'u-eng1', full_name: 'Demo Site Engineer', role: 'engineer' },
  { id: 'u-eng2', full_name: 'Demo Site Engineer 2', role: 'engineer' },
]

const projectsBase: Omit<Project, 'progress'>[] = [
  { id: 'p1', name: 'Skyline Residency (Demo)', location: 'Hyderabad', description: 'G+12 residential tower, 96 units.', status: 'active', start_date: day(-120), end_date: day(240) },
  { id: 'p2', name: 'Orchid Villas Phase 2 (Demo)', location: 'Shamshabad', description: '24 gated-community villas.', status: 'active', start_date: day(-60), end_date: day(300) },
  { id: 'p3', name: 'Lakeview Commercial Hub (Demo)', location: 'Gachibowli', description: '6-storey commercial complex with basement parking.', status: 'planning', start_date: day(20), end_date: day(500) },
  { id: 'p4', name: 'Greenfield Plots Development (Demo)', location: 'Medchal', description: 'Layout development with roads and drainage.', status: 'completed', start_date: day(-400), end_date: day(-30) },
]

const milestones: Milestone[] = [
  { id: 'm1', project_id: 'p1', title: 'Excavation & Foundation', due_date: day(-60), weight: 20, progress: 100 },
  { id: 'm2', project_id: 'p1', title: 'Structure up to 6th floor', due_date: day(30), weight: 30, progress: 70 },
  { id: 'm3', project_id: 'p1', title: 'Structure 7th floor to terrace', due_date: day(120), weight: 25, progress: 10 },
  { id: 'm4', project_id: 'p1', title: 'Masonry, MEP & finishing', due_date: day(220), weight: 25, progress: 0 },
  { id: 'm5', project_id: 'p2', title: 'Site clearing & roads', due_date: day(-10), weight: 20, progress: 90 },
  { id: 'm6', project_id: 'p2', title: 'Foundations (24 villas)', due_date: day(60), weight: 30, progress: 40 },
  { id: 'm7', project_id: 'p2', title: 'Superstructure', due_date: day(180), weight: 50, progress: 0 },
  { id: 'm8', project_id: 'p3', title: 'Approvals & design freeze', due_date: day(40), weight: 100, progress: 25 },
  { id: 'm9', project_id: 'p4', title: 'Layout, roads & drainage', due_date: day(-40), weight: 100, progress: 100 },
]

const tasks: Task[] = [
  { id: 't1', project_id: 'p1', milestone_id: 'm2', title: 'Pour 6th floor slab', description: null, assignee_id: 'u-eng1', assignee_name: 'Demo Site Engineer', status: 'in_progress', priority: 'high', due_date: day(5) },
  { id: 't2', project_id: 'p1', milestone_id: 'm2', title: 'Rebar inspection - 6th floor', description: null, assignee_id: 'u-eng1', assignee_name: 'Demo Site Engineer', status: 'todo', priority: 'high', due_date: day(-2) },
  { id: 't3', project_id: 'p1', milestone_id: 'm3', title: 'Order tower crane extension', description: null, assignee_id: 'u-mgr', assignee_name: 'Demo Project Manager', status: 'blocked', priority: 'medium', due_date: day(10) },
  { id: 't4', project_id: 'p2', milestone_id: 'm6', title: 'Footing excavation - villas 1-8', description: null, assignee_id: 'u-eng2', assignee_name: 'Demo Site Engineer 2', status: 'in_progress', priority: 'medium', due_date: day(12) },
  { id: 't5', project_id: 'p2', milestone_id: 'm5', title: 'Final road compaction test', description: null, assignee_id: 'u-eng2', assignee_name: 'Demo Site Engineer 2', status: 'todo', priority: 'low', due_date: day(-1) },
  { id: 't6', project_id: 'p3', milestone_id: 'm8', title: 'Submit building permit application', description: null, assignee_id: 'u-mgr', assignee_name: 'Demo Project Manager', status: 'done', priority: 'high', due_date: day(-5) },
]

const logs: Omit<ProgressLog, 'project_name'>[] = [
  { id: 'l1', project_id: 'p1', milestone_id: 'm2', author_id: 'u-eng1', author_name: 'Demo Site Engineer', log_date: day(0), work_done: '6th floor column shuttering completed; slab reinforcement 60% tied.', manpower: 34, issues: 'Cement delivery delayed by 3 hours.', photos: [] },
  { id: 'l2', project_id: 'p1', milestone_id: 'm2', author_id: 'u-eng1', author_name: 'Demo Site Engineer', log_date: day(-1), work_done: '5th floor slab curing continued. Started 6th floor column steel.', manpower: 31, issues: null, photos: [] },
  { id: 'l3', project_id: 'p2', milestone_id: 'm6', author_id: 'u-eng2', author_name: 'Demo Site Engineer 2', log_date: day(-1), work_done: 'Excavation for villas 1-4 complete; PCC started on villa 1.', manpower: 22, issues: 'Rain in the afternoon stopped work for 2 hours.', photos: [] },
]

const docs: DocumentRow[] = [
  { id: 'd1', project_id: 'p1', title: 'Structural drawings Rev C', category: 'drawing', storage_path: 'demo', uploaded_by_name: 'Demo Project Manager', created_at: day(-30) },
  { id: 'd2', project_id: 'p1', title: 'Contractor agreement', category: 'contract', storage_path: 'demo', uploaded_by_name: 'Demo Admin', created_at: day(-100) },
  { id: 'd3', project_id: 'p2', title: 'Layout approval', category: 'permit', storage_path: 'demo', uploaded_by_name: 'Demo Project Manager', created_at: day(-55) },
]

let me: Profile | null = null
const nameOf = (id?: string) => profiles.find((p) => p.id === id)?.full_name ?? null
const pName = (id: string) => projectsBase.find((p) => p.id === id)?.name
const rollup = (pid: string) => {
  const ms = milestones.filter((m) => m.project_id === pid)
  const w = ms.reduce((s, m) => s + m.weight, 0)
  return w ? Math.round((ms.reduce((s, m) => s + m.weight * m.progress, 0) / w) * 10) / 10 : 0
}
const withProgress = (p: Omit<Project, 'progress'>): Project => ({ ...p, progress: rollup(p.id) })
const visible = (pid: string) => !me || me.role !== 'engineer' || pid !== 'p3' // engineers don't see p3 (RLS demo)

export const demoApi: Api = {
  mode: 'demo',
  getSession: () => delay(me),
  async signIn() { throw new Error('Use a demo role button in demo mode') },
  async signUp() { throw new Error('Sign-up is disabled in demo mode') },
  async demoSignIn(role: Role) {
    me = profiles.find((p) => p.role === role)!
    return delay(me)
  },
  async signOut() { me = null },

  listProfiles: () => delay([...profiles]),
  listProjects: () => delay(projectsBase.filter((p) => visible(p.id)).map(withProgress)),
  async getProject(id) {
    const p = projectsBase.find((x) => x.id === id)
    return delay(p && visible(id) ? withProgress(p) : null)
  },
  async createProject(p) {
    const row = { id: uid(), name: p.name, location: p.location ?? null, description: p.description ?? null, status: p.status, start_date: p.start_date ?? null, end_date: p.end_date ?? null }
    projectsBase.unshift(row)
    return delay(withProgress(row))
  },

  listMilestones: (pid) => delay(milestones.filter((m) => m.project_id === pid)),
  async addMilestone(m) {
    milestones.push({ id: uid(), project_id: m.project_id, title: m.title, due_date: m.due_date ?? null, weight: m.weight, progress: 0 })
    await delay(0)
  },
  async setMilestoneProgress(id, pct) {
    const m = milestones.find((x) => x.id === id)
    if (m) m.progress = pct
    await delay(0)
  },

  listTasks: (pid) => delay(tasks.filter((t) => (!pid || t.project_id === pid) && visible(t.project_id)).map((t) => ({ ...t, project_name: pName(t.project_id) }))),
  async addTask(t) {
    tasks.push({
      id: uid(), project_id: t.project_id, milestone_id: t.milestone_id ?? null, title: t.title, description: null,
      assignee_id: t.assignee_id ?? null, assignee_name: nameOf(t.assignee_id), status: 'todo', priority: t.priority, due_date: t.due_date ?? null,
    })
    await delay(0)
  },
  async setTaskStatus(id, status) {
    const t = tasks.find((x) => x.id === id)
    if (t) t.status = status
    await delay(0)
  },

  listLogs: (pid, limit = 50) => delay(logs.filter((l) => (!pid || l.project_id === pid) && visible(l.project_id)).slice(0, limit).map((l) => ({ ...l, project_name: pName(l.project_id) }))),
  async addLog(l) {
    logs.unshift({
      id: uid(), project_id: l.project_id, milestone_id: l.milestone_id ?? null, author_id: me?.id ?? 'u-eng1',
      author_name: me?.full_name ?? 'Demo', log_date: l.log_date, work_done: l.work_done, manpower: l.manpower ?? null,
      issues: l.issues ?? null, photos: l.files.map((f) => URL.createObjectURL(f)),
    })
    await delay(0)
  },

  listDocs: (pid) => delay(docs.filter((d) => d.project_id === pid)),
  async addDoc(d) {
    docs.unshift({ id: uid(), project_id: d.project_id, title: d.title, category: d.category, storage_path: URL.createObjectURL(d.file), uploaded_by_name: me?.full_name ?? 'Demo', created_at: day(0) })
    await delay(0)
  },
  async docUrl(path) { return path.startsWith('blob:') ? path : '#' },
}
