import { ENV_VARIABLES } from '@/lib/env'
import { createClient } from '@supabase/supabase-js'

const supabase = createClient(
  ENV_VARIABLES.SUPABASE_URL,
  ENV_VARIABLES.SUPABASE_ANON_KEY
)

export default supabase
