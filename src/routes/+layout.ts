import type { LayoutLoad } from './$types'
import { getSupabase } from '@supabase/auth-helpers-sveltekit'

export const load: LayoutLoad = async (event) => {
  const supabase = await getSupabase(event)
  const { session } = supabase
  return { session }
}
