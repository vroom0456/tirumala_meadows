import { createClient } from '@supabase/supabase-js'
import type { Api, Profile, Project, Milestone, Task, ProgressLog, DocumentRow } from './types'

const url = import.meta.env.VITE_SUPABASE_URL as string
const key = import.meta.env.VITE_SUPABASE_ANON_KEY as string
export const sb = url && key ? createClient(url, key) : (null as unknown as ReturnType<typeof createClient>)

function fail(error: { message: string } | null): void {
  if (error) throw new Error(error.message)
}

async function signed(bucket: string, paths: string[]): Promise<string[]> {
  if (!paths.length) return []
  const { data, error } = await sb.storage.from(bucket).createSignedUrls(paths, 3600)
  fail(error)
  return (data ?? []).map((d) => d.signedUrl ?? '')
}

async function myProfile(): Promise<Profile | null> {
  const { data: u } = await sb.auth.getUser()
  if (!u.user) return null
  const { data, error } = await sb.from('profiles').select('id, full_name, role').eq('id', u.user.id).single()
  fail(error)
  return data as Profile
}

const safeName = (n: string) => n.replace(/[^a-zA-Z0-9._-]/g, '_')

export const supabaseApi: Api = {
  mode: 'supabase',

  getSession: myProfile,
  async signIn(email, password) {
    const { error } = await sb.auth.signInWithPassword({ email, password })
    fail(error)
    const p = await myProfile()
    if (!p) throw new Error('Profile not found')
    return p
  },
  async signUp(email, password, fullName) {
    const { error } = await sb.auth.signUp({ email, password, options: { data: { full_name: fullName } } })
    fail(error)
  },
  async demoSignIn() { throw new Error('Demo sign-in is only available in demo mode') },
  async signOut() { await sb.auth.signOut() },

  async listProfiles() {
    const { data, error } = await sb.from('profiles').select('id, full_name, role').order('full_name')
    fail(error)
    return (data ?? []) as Profile[]
  },

  async listProjects() {
    const [p, pr] = await Promise.all([
      sb.from('projects').select('*').order('created_at', { ascending: false }),
      sb.from('project_progress').select('project_id, progress'),
    ])
    fail(p.error); fail(pr.error)
    const map = new Map((pr.data ?? []).map((r) => [r.project_id as string, Number(r.progress)]))
    return (p.data ?? []).map((r) => ({ ...r, progress: map.get(r.id) ?? 0 })) as Project[]
  },
  async getProject(id) {
    const list = await this.listProjects()
    return list.find((p) => p.id === id) ?? null
  },
  async createProject(p) {
    const { data: u } = await sb.auth.getUser()
    const { data, error } = await sb.from('projects').insert({
      name: p.name, location: p.location || null, description: p.description || null,
      status: p.status, start_date: p.start_date || null, end_date: p.end_date || null,
      created_by: u.user?.id,
    }).select().single()
    fail(error)
    return { ...(data as Project), progress: 0 }
  },

  async listMilestones(projectId) {
    const { data, error } = await sb.from('milestones').select('*').eq('project_id', projectId).order('due_date', { nullsFirst: false })
    fail(error)
    return (data ?? []) as Milestone[]
  },
  async addMilestone(m) {
    const { error } = await sb.from('milestones').insert({
      project_id: m.project_id, title: m.title, due_date: m.due_date || null, weight: m.weight,
    })
    fail(error)
  },
  async setMilestoneProgress(id, pct) {
    const { error } = await sb.rpc('update_milestone_progress', { mid: id, pct })
    fail(error)
  },

  async listTasks(projectId) {
    let q = sb.from('tasks').select('*, assignee:profiles(full_name), project:projects(name)').order('due_date', { nullsFirst: false })
    if (projectId) q = q.eq('project_id', projectId)
    const { data, error } = await q
    fail(error)
    return (data ?? []).map((t: any) => ({
      ...t, assignee_name: t.assignee?.full_name ?? null, project_name: t.project?.name,
    })) as Task[]
  },
  async addTask(t) {
    const { error } = await sb.from('tasks').insert({
      project_id: t.project_id, title: t.title, milestone_id: t.milestone_id || null,
      assignee_id: t.assignee_id || null, priority: t.priority, due_date: t.due_date || null,
    })
    fail(error)
  },
  async setTaskStatus(id, status) {
    const { error } = await sb.from('tasks').update({ status }).eq('id', id)
    fail(error)
  },

  async listLogs(projectId, limit = 50) {
    let q = sb.from('progress_logs')
      .select('*, author:profiles(full_name), project:projects(name), log_photos(storage_path)')
      .order('log_date', { ascending: false }).order('created_at', { ascending: false }).limit(limit)
    if (projectId) q = q.eq('project_id', projectId)
    const { data, error } = await q
    fail(error)
    return Promise.all((data ?? []).map(async (l: any) => ({
      ...l,
      author_name: l.author?.full_name ?? 'Unknown',
      project_name: l.project?.name,
      photos: await signed('site-photos', (l.log_photos ?? []).map((p: any) => p.storage_path)),
    }))) as Promise<ProgressLog[]>
  },
  async addLog(l) {
    const { data: u } = await sb.auth.getUser()
    if (!u.user) throw new Error('Not signed in')
    const { data, error } = await sb.from('progress_logs').insert({
      project_id: l.project_id, milestone_id: l.milestone_id || null, author_id: u.user.id,
      log_date: l.log_date, work_done: l.work_done, manpower: l.manpower ?? null, issues: l.issues || null,
    }).select('id').single()
    fail(error)
    for (const f of l.files) {
      const path = `${l.project_id}/${crypto.randomUUID()}-${safeName(f.name)}`
      const up = await sb.storage.from('site-photos').upload(path, f)
      fail(up.error)
      const ins = await sb.from('log_photos').insert({ log_id: data!.id, storage_path: path })
      fail(ins.error)
    }
  },

  async listDocs(projectId) {
    const { data, error } = await sb.from('documents')
      .select('*, uploader:profiles(full_name)').eq('project_id', projectId).order('created_at', { ascending: false })
    fail(error)
    return (data ?? []).map((d: any) => ({ ...d, uploaded_by_name: d.uploader?.full_name ?? 'Unknown' })) as DocumentRow[]
  },
  async addDoc(d) {
    const { data: u } = await sb.auth.getUser()
    if (!u.user) throw new Error('Not signed in')
    const path = `${d.project_id}/${crypto.randomUUID()}-${safeName(d.file.name)}`
    const up = await sb.storage.from('documents').upload(path, d.file)
    fail(up.error)
    const { error } = await sb.from('documents').insert({
      project_id: d.project_id, title: d.title, category: d.category, storage_path: path, uploaded_by: u.user.id,
    })
    fail(error)
  },
  async docUrl(path) {
    const [u] = await signed('documents', [path])
    return u
  },
}
