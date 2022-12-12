import { createClient } from '@supabase/auth-helpers-sveltekit'
import { env } from '$env/dynamic/public'

const { PUBLIC_SUPABASE_URL = '', PUBLIC_SUPABASE_ANON_KEY = '' } = env

export const supabase = createClient(PUBLIC_SUPABASE_URL, PUBLIC_SUPABASE_ANON_KEY)