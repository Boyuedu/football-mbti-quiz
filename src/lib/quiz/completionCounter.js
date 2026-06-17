import { getSupabaseClient } from "@/lib/supabase/client";

export const QUIZ_COUNTED_SESSION_KEY = "football_quiz_counted";
const COUNTER_ROW_ID = "total_completions";

export function clearQuizCountedSession() {
  if (typeof window === "undefined") return;
  window.sessionStorage.removeItem(QUIZ_COUNTED_SESSION_KEY);
}

export function hasQuizBeenCountedThisSession() {
  if (typeof window === "undefined") return false;
  return window.sessionStorage.getItem(QUIZ_COUNTED_SESSION_KEY) === "1";
}

export async function fetchCompletionCount() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase
    .from("quiz_counter")
    .select("count")
    .eq("id", COUNTER_ROW_ID)
    .maybeSingle();

  if (error) throw error;
  return data?.count ?? null;
}

export async function incrementCompletionCount() {
  const supabase = getSupabaseClient();
  if (!supabase) return null;

  const { data, error } = await supabase.rpc("increment_quiz_counter");
  if (error) throw error;
  return data ?? null;
}
