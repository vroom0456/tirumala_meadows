import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { LayoutDashboard, FolderKanban, LogOut, HardHat } from 'lucide-react'
import { useAuth } from '../lib/auth'
import { api } from '../lib/api'
import { roleLabel } from '../lib/utils'

const links = [
  { to: '/portal', label: 'Dashboard', icon: LayoutDashboard, end: true },
  { to: '/portal/projects', label: 'Projects', icon: FolderKanban, end: false },
]

export default function Layout() {
  const { user, setUser } = useAuth()
  const nav = useNavigate()
  const out = async () => { await api.signOut(); setUser(null); nav('/login') }
  return (
    <div className="min-h-screen md:flex">
      <aside className="border-b border-line bg-panel md:fixed md:inset-y-0 md:w-56 md:border-b-0 md:border-r">
        <div className="flex items-center justify-between px-4 h-14">
          <div className="flex items-center gap-2">
            <HardHat className="h-5 w-5 text-accent" />
            <span className="font-semibold tracking-tight">BuildTrack</span>
          </div>
        </div>
        <div className="px-3 pb-2">
          <Link to="/" className="inline-flex items-center gap-1.5 text-xs text-hotpink hover:underline">
            <span>← Mansani Thirumala Meadows</span>
          </Link>
        </div>
        <nav className="flex gap-1 px-2 pb-2 md:flex-col md:pb-0">
          {links.map((l) => (
            <NavLink key={l.to} to={l.to} end={l.end}
              className={({ isActive }) => `flex items-center gap-2 rounded-md px-3 h-9 text-sm ${isActive ? 'bg-panel2 text-fg' : 'text-mute hover:bg-panel2 hover:text-fg'}`}>
              <l.icon className="h-4 w-4" />{l.label}
            </NavLink>
          ))}
        </nav>
        <div className="hidden md:block absolute bottom-0 inset-x-0 border-t border-line p-3">
          <p className="truncate text-sm">{user?.full_name}</p>
          <p className="text-xs text-mute">{user && roleLabel[user.role]}</p>
          <button onClick={out} className="mt-2 flex items-center gap-1.5 text-xs text-mute hover:text-fg"><LogOut className="h-3.5 w-3.5" />Sign out</button>
        </div>
      </aside>
      <main className="min-w-0 flex-1 md:ml-56">
        {api.mode === 'demo' && (
          <div className="border-b border-amber-400/30 bg-amber-400/10 px-4 py-1.5 text-center text-xs text-amber-300">
            Demo mode: sample data with fictional projects. Changes are not saved.
          </div>
        )}
        <div className="mx-auto max-w-6xl p-4 md:p-8"><Outlet /></div>
        <div className="md:hidden border-t border-line p-3 flex items-center justify-between text-xs text-mute">
          <span>{user?.full_name}</span>
          <button onClick={out} className="flex items-center gap-1"><LogOut className="h-3.5 w-3.5" />Sign out</button>
        </div>
      </main>
    </div>
  )
}
