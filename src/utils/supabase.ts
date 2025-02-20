import { createClient } from "@supabase/supabase-js";

const SUPABASE_URL="https://ykkutlsuwensfdujbzbe.supabase.co" 
const SUPABASE_ANON_KEY = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Inlra3V0bHN1d2Vuc2ZkdWpiemJlIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjcwMDQ3MjIsImV4cCI6MjA0MjU4MDcyMn0.H1NCFJ8c6lFUS_9IauA5WcgugCYCJfpwZ_C5W15NcW4";

export const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);
