import { createClient } from "@supabase/supabase-js";
const supabaseUrl = "https://hytdelgicgamiaqebswt.supabase.co";
const supabaseKey = process.env.DATABASE_KEY!;
const db = createClient(supabaseUrl, supabaseKey);

export default db;
