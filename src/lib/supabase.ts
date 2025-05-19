import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://nwtfiyasmntgctshliwv.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im53dGZpeWFzbW50Z2N0c2hsaXd2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDczMDQxMDYsImV4cCI6MjA2Mjg4MDEwNn0.e_TtgplfN9fqmurVcYjj4cW7QnbunGq2Cspg821AcI0'

export const supabase = createClient(supabaseUrl, supabaseKey)
