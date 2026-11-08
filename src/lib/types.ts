export type Role = 'admin' | 'manager' | 'engineer'
export type ProjectStatus = 'planning' | 'active' | 'on_hold' | 'completed'
export type TaskStatus = 'todo' | 'in_progress' | 'blocked' | 'done'
export type TaskPriority = 'low' | 'medium' | 'high'
export type DocCategory = 'drawing' | 'contract' | 'permit' | 'report' | 'other'

export interface Profile { id: string; full_name: string; role: Role }

export interface Project {
  id: string
  name: string
  location: string | null
  description: string | null
  status: ProjectStatus
  start_date: string | null
  end_date: string | null
  progress: number // weighted rollup of milestones, 0-100
}

export interface Milestone {
  id: string; project_id: string; title: string
  due_date: string | null; weight: number; progress: number
}

export interface Task {
  id: string; project_id: string; milestone_id: string | null
  title: string; description: string | null
  assignee_id: string | null; assignee_name: string | null
  status: TaskStatus; priority: TaskPriority; due_date: string | null
  project_name?: string
}

export interface ProgressLog {
  id: string; project_id: string; milestone_id: string | null
  author_id: string; author_name: string
  log_date: string; work_done: string
  manpower: number | null; issues: string | null
  photos: string[] // viewable URLs
  project_name?: string
}

export interface DocumentRow {
  id: string; project_id: string; title: string; category: DocCategory
  storage_path: string; uploaded_by_name: string; created_at: string
}

export interface NewProject {
  name: string; location?: string; description?: string
  status: ProjectStatus; start_date?: string; end_date?: string
}
export interface NewMilestone { project_id: string; title: string; due_date?: string; weight: number }
export interface NewTask {
  project_id: string; title: string; milestone_id?: string
  assignee_id?: string; priority: TaskPriority; due_date?: string
}
export interface NewLog {
  project_id: string; milestone_id?: string; log_date: string
  work_done: string; manpower?: number; issues?: string; files: File[]
}
export interface NewDoc { project_id: string; title: string; category: DocCategory; file: File }

export interface Api {
  mode: 'demo' | 'supabase'
  // auth
  getSession(): Promise<Profile | null>
  signIn(email: string, password: string): Promise<Profile>
  signUp(email: string, password: string, fullName: string): Promise<void>
  demoSignIn(role: Role): Promise<Profile>
  signOut(): Promise<void>
  // data
  listProfiles(): Promise<Profile[]>
  listProjects(): Promise<Project[]>
  getProject(id: string): Promise<Project | null>
  createProject(p: NewProject): Promise<Project>
  listMilestones(projectId: string): Promise<Milestone[]>
  addMilestone(m: NewMilestone): Promise<void>
  setMilestoneProgress(id: string, pct: number): Promise<void>
  listTasks(projectId?: string): Promise<Task[]>
  addTask(t: NewTask): Promise<void>
  setTaskStatus(id: string, status: TaskStatus): Promise<void>
  listLogs(projectId?: string, limit?: number): Promise<ProgressLog[]>
  addLog(l: NewLog): Promise<void>
  listDocs(projectId: string): Promise<DocumentRow[]>
  addDoc(d: NewDoc): Promise<void>
  docUrl(path: string): Promise<string>
}
