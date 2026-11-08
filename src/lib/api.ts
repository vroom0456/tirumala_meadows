import type { Api } from './types'
import { demoApi } from './demoApi'
import { supabaseApi } from './supabaseApi'

const configured = Boolean(import.meta.env.VITE_SUPABASE_URL && import.meta.env.VITE_SUPABASE_ANON_KEY)

/** One switch: env vars present -> real Supabase backend, otherwise in-memory demo data. */
export const api: Api = configured ? supabaseApi : demoApi
