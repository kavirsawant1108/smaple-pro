import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://fllgatkeunsvatndbaxt.supabase.co";
const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImZsbGdhdGtldW5zdmF0bmRiYXh0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM4MTE1MDAsImV4cCI6MjA4OTM4NzUwMH0.Q6QRdw_ef6w0iZzACalXaedlH61O4ideL_veloqj-S8";

export const supabase = createClient(
  supabaseUrl,
  supabaseKey
);