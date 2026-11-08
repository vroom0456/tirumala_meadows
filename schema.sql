-- BuildTrack schema v1 (Supabase / PostgreSQL)
-- Run in Supabase SQL Editor, top to bottom, once.

-- ========== ENUMS ==========
create type app_role as enum ('admin', 'manager', 'engineer');
create type project_status as enum ('planning', 'active', 'on_hold', 'completed');
create type task_status as enum ('todo', 'in_progress', 'blocked', 'done');
create type task_priority as enum ('low', 'medium', 'high');
create type doc_category as enum ('drawing', 'contract', 'permit', 'report', 'other');

-- ========== TABLES ==========
create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  full_name text not null default '',
  role app_role not null default 'engineer',
  created_at timestamptz not null default now()
);

create table projects (
  id uuid primary key default gen_random_uuid(),
  name text not null check (length(name) between 2 and 120),
  location text,
  description text,
  status project_status not null default 'planning',
  start_date date,
  end_date date,
  created_by uuid references profiles(id),
  created_at timestamptz not null default now(),
  check (end_date is null or start_date is null or end_date >= start_date)
);

create table project_members (
  project_id uuid not null references projects(id) on delete cascade,
  user_id uuid not null references profiles(id) on delete cascade,
  primary key (project_id, user_id)
);

create table milestones (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  due_date date,
  weight int not null default 10 check (weight between 1 and 100),
  progress int not null default 0 check (progress between 0 and 100),
  created_at timestamptz not null default now()
);

create table tasks (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  milestone_id uuid references milestones(id) on delete set null,
  title text not null,
  description text,
  assignee_id uuid references profiles(id) on delete set null,
  status task_status not null default 'todo',
  priority task_priority not null default 'medium',
  due_date date,
  created_at timestamptz not null default now()
);

create table progress_logs (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  milestone_id uuid references milestones(id) on delete set null,
  author_id uuid not null references profiles(id),
  log_date date not null default current_date,
  work_done text not null,
  manpower int check (manpower is null or manpower >= 0),
  issues text,
  created_at timestamptz not null default now()
);

create table log_photos (
  id uuid primary key default gen_random_uuid(),
  log_id uuid not null references progress_logs(id) on delete cascade,
  storage_path text not null,
  created_at timestamptz not null default now()
);

create table documents (
  id uuid primary key default gen_random_uuid(),
  project_id uuid not null references projects(id) on delete cascade,
  title text not null,
  category doc_category not null default 'other',
  storage_path text not null,
  uploaded_by uuid not null references profiles(id),
  created_at timestamptz not null default now()
);

-- ========== INDEXES (FK lookups) ==========
create index on project_members (user_id);
create index on milestones (project_id);
create index on tasks (project_id);
create index on tasks (assignee_id);
create index on tasks (milestone_id);
create index on progress_logs (project_id, log_date desc);
create index on log_photos (log_id);
create index on documents (project_id);

-- ========== HELPER FUNCTIONS ==========
create function public.my_role() returns app_role
language sql stable security definer set search_path = public as $$
  select role from profiles where id = auth.uid()
$$;

create function public.can_access_project(pid uuid) returns boolean
language sql stable security definer set search_path = public as $$
  select exists (select 1 from profiles p where p.id = auth.uid() and p.role in ('admin','manager'))
      or exists (select 1 from project_members m where m.project_id = pid and m.user_id = auth.uid())
$$;

-- Auto-create profile on signup (default role: engineer; admin promotes later)
create function public.handle_new_user() returns trigger
language plpgsql security definer set search_path = public as $$
begin
  insert into profiles (id, full_name)
  values (new.id, coalesce(new.raw_user_meta_data->>'full_name', split_part(new.email, '@', 1)));
  return new;
end $$;

create trigger on_auth_user_created
after insert on auth.users for each row execute function public.handle_new_user();

-- Business logic: members can update milestone progress (only that column)
create function public.update_milestone_progress(mid uuid, pct int) returns void
language plpgsql security definer set search_path = public as $$
declare pid uuid;
begin
  if pct < 0 or pct > 100 then raise exception 'progress must be 0-100'; end if;
  select project_id into pid from milestones where id = mid;
  if pid is null then raise exception 'milestone not found'; end if;
  if not can_access_project(pid) then raise exception 'not allowed'; end if;
  update milestones set progress = pct where id = mid;
end $$;

-- ========== PROGRESS VIEW (weighted rollup) ==========
create view project_progress with (security_invoker = true) as
select p.id as project_id,
       coalesce(round(sum(m.weight * m.progress)::numeric / nullif(sum(m.weight), 0), 1), 0) as progress
from projects p
left join milestones m on m.project_id = p.id
group by p.id;

-- ========== ROW LEVEL SECURITY ==========
alter table profiles enable row level security;
alter table projects enable row level security;
alter table project_members enable row level security;
alter table milestones enable row level security;
alter table tasks enable row level security;
alter table progress_logs enable row level security;
alter table log_photos enable row level security;
alter table documents enable row level security;

-- profiles: everyone signed in can read (for assignee names); only admin changes roles
create policy profiles_read on profiles for select to authenticated using (true);
create policy profiles_admin_update on profiles for update to authenticated
  using (my_role() = 'admin') with check (my_role() = 'admin');

-- projects
create policy projects_read on projects for select to authenticated using (can_access_project(id));
create policy projects_insert on projects for insert to authenticated
  with check (my_role() in ('admin','manager'));
create policy projects_update on projects for update to authenticated
  using (my_role() in ('admin','manager')) with check (my_role() in ('admin','manager'));
create policy projects_delete on projects for delete to authenticated using (my_role() = 'admin');

-- project_members
create policy members_read on project_members for select to authenticated using (can_access_project(project_id));
create policy members_write on project_members for all to authenticated
  using (my_role() in ('admin','manager')) with check (my_role() in ('admin','manager'));

-- milestones (progress edited via update_milestone_progress for engineers)
create policy milestones_read on milestones for select to authenticated using (can_access_project(project_id));
create policy milestones_write on milestones for all to authenticated
  using (my_role() in ('admin','manager')) with check (my_role() in ('admin','manager'));

-- tasks
create policy tasks_read on tasks for select to authenticated using (can_access_project(project_id));
create policy tasks_insert on tasks for insert to authenticated
  with check (my_role() in ('admin','manager'));
create policy tasks_update on tasks for update to authenticated
  using (my_role() in ('admin','manager') or (assignee_id = auth.uid() and can_access_project(project_id)))
  with check (my_role() in ('admin','manager') or (assignee_id = auth.uid() and can_access_project(project_id)));
create policy tasks_delete on tasks for delete to authenticated using (my_role() in ('admin','manager'));

-- progress_logs
create policy logs_read on progress_logs for select to authenticated using (can_access_project(project_id));
create policy logs_insert on progress_logs for insert to authenticated
  with check (can_access_project(project_id) and author_id = auth.uid());
create policy logs_update on progress_logs for update to authenticated
  using (author_id = auth.uid() or my_role() in ('admin','manager'))
  with check (author_id = auth.uid() or my_role() in ('admin','manager'));
create policy logs_delete on progress_logs for delete to authenticated
  using (author_id = auth.uid() or my_role() in ('admin','manager'));

-- log_photos
create policy photos_read on log_photos for select to authenticated
  using (exists (select 1 from progress_logs l where l.id = log_id and can_access_project(l.project_id)));
create policy photos_insert on log_photos for insert to authenticated
  with check (exists (select 1 from progress_logs l where l.id = log_id and l.author_id = auth.uid()));
create policy photos_delete on log_photos for delete to authenticated
  using (exists (select 1 from progress_logs l where l.id = log_id
         and (l.author_id = auth.uid() or my_role() in ('admin','manager'))));

-- documents
create policy docs_read on documents for select to authenticated using (can_access_project(project_id));
create policy docs_insert on documents for insert to authenticated
  with check (can_access_project(project_id) and uploaded_by = auth.uid());
create policy docs_delete on documents for delete to authenticated
  using (my_role() in ('admin','manager'));

-- ========== STORAGE ==========
-- Path convention: {project_id}/{filename}
insert into storage.buckets (id, name, public) values
  ('site-photos', 'site-photos', false),
  ('documents', 'documents', false)
on conflict (id) do nothing;

create policy storage_read on storage.objects for select to authenticated
  using (bucket_id in ('site-photos','documents')
         and can_access_project(((storage.foldername(name))[1])::uuid));
create policy storage_insert on storage.objects for insert to authenticated
  with check (bucket_id in ('site-photos','documents')
         and can_access_project(((storage.foldername(name))[1])::uuid));
create policy storage_delete on storage.objects for delete to authenticated
  using (bucket_id in ('site-photos','documents') and my_role() in ('admin','manager'));

-- ========== AFTER SIGNUP ==========
-- Sign up your own account in the app, then promote yourself once:
--   update profiles set role = 'admin' where id = '<your-user-uuid>';
