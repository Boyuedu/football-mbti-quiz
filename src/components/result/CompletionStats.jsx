import { useEffect, useState } from "react";
import { useLanguage } from "@/i18n/LanguageContext";
import {
  fetchCompletionCount,
  hasQuizBeenCountedThisSession,
  incrementCompletionCount,
  QUIZ_COUNTED_SESSION_KEY,
} from "@/lib/quiz/completionCounter";
import { isSupabaseConfigured } from "@/lib/supabase/client";

function formatCountLine(template, count, language) {
  const formatted = Number(count).toLocaleString(
    language === "zh" ? "zh-CN" : "en-US"
  );
  return template.replace("{count}", formatted);
}

export default function CompletionStats() {
  const { language, t } = useLanguage();
  const [count, setCount] = useState(null);
  const [status, setStatus] = useState("loading");

  useEffect(() => {
    if (!isSupabaseConfigured()) {
      if (import.meta.env.DEV) {
        console.warn(
          "[CompletionStats] Hidden: set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY in .env, then restart dev server."
        );
      }
      return undefined;
    }

    let cancelled = false;

    async function syncCompletionCount() {
      setStatus("loading");

      try {
        if (hasQuizBeenCountedThisSession()) {
          const existingCount = await fetchCompletionCount();
          if (cancelled) return;

          if (existingCount != null) {
            setCount(existingCount);
            setStatus("ready");
          } else {
            setStatus("error");
          }
          return;
        }

        const newCount = await incrementCompletionCount();
        if (cancelled) return;

        if (newCount != null) {
          setCount(newCount);
          window.sessionStorage.setItem(QUIZ_COUNTED_SESSION_KEY, "1");
          setStatus("ready");
          return;
        }

        const fallbackCount = await fetchCompletionCount();
        if (cancelled) return;

        if (fallbackCount != null) {
          setCount(fallbackCount);
          setStatus("ready");
        } else {
          setStatus("error");
        }
      } catch (error) {
        if (import.meta.env.DEV) {
          console.warn("[CompletionStats] sync failed", error);
        }

        try {
          const fallbackCount = await fetchCompletionCount();
          if (cancelled) return;

          if (fallbackCount != null) {
            setCount(fallbackCount);
            setStatus("ready");
          } else {
            setStatus("error");
          }
        } catch {
          if (!cancelled) setStatus("error");
        }
      }
    }

    void syncCompletionCount();

    return () => {
      cancelled = true;
    };
  }, []);

  if (!isSupabaseConfigured()) return null;

  const bodyText =
    status === "ready" && count != null
      ? formatCountLine(t("completionStatsCount"), count, language)
      : status === "loading"
        ? t("completionStatsLoading")
        : t("completionStatsUnavailable");

  return (
    <section
      className="scroll-mt-6"
      aria-labelledby="result-completion-stats-heading"
    >
      <div className="rounded-2xl border border-slate-700/60 bg-slate-800/45 p-6 md:p-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            📊
          </span>
          <div className="min-w-0">
            <h2
              id="result-completion-stats-heading"
              className="text-lg font-bold tracking-tight text-white md:text-xl"
            >
              {t("completionStatsTitle")}
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-400 md:text-base">
              {t("completionStatsTitleEn")}
            </p>
            <p
              className={`mt-4 text-sm leading-relaxed md:text-base ${
                status === "ready" ? "text-slate-200" : "text-slate-400"
              }`}
              aria-live="polite"
            >
              {bodyText}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
