import { createClient } from "@supabase/supabase-js";

function normalizeSupabaseUrl(raw) {
  const trimmed = (raw ?? "").trim().replace(/\/+$/, "");
  return trimmed.replace(/\/rest\/v1$/i, "");
}

const supabaseUrl = normalizeSupabaseUrl(import.meta.env.VITE_SUPABASE_URL);
const supabaseAnonKey = (import.meta.env.VITE_SUPABASE_ANON_KEY ?? "").trim();

let client = null;

export function isSupabaseConfigured() {
  return Boolean(supabaseUrl && supabaseAnonKey);
}

export function getSupabaseClient() {
  if (!isSupabaseConfigured()) return null;
  if (!client) {
    client = createClient(supabaseUrl, supabaseAnonKey);
  }
  return client;
}
