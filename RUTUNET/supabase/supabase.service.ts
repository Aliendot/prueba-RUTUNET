import { createClient } from '@supabase/supabase-js'
import { Database } from './supabase.types';

// Configura tu cliente Supabase
const supabaseUrl = 'https://snjcnbpulzypqjstanqb.supabase.co/'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InNuamNuYnB1bHp5cHFqc3RhbnFiIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjQ2NDAxMTAsImV4cCI6MjA0MDIxNjExMH0.oix3ScQDB5Cc2bQIk2O0O-HA0vMlSC4mccEIjMpnydo'

const supabase = createClient<Database>(supabaseUrl, supabaseKey)

export default supabase;