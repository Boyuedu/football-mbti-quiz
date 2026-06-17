import { motion } from "framer-motion";

/** Fixed 7D order for display (normalized 0–100; EMO = emotional control). */
export const CORE_ATTRIBUTE_KEYS = [
  "IQ",
  "LEAD",
  "CREA",
  "TEAM",
  "FLAIR",
  "EMO",
  "COUR",
];

export const DIMENSION_LABELS = {
  IQ: { en: "Football IQ", zh: "球商" },
  LEAD: { en: "Leadership", zh: "领导力" },
  CREA: { en: "Creativity", zh: "创造力" },
  TEAM: { en: "Teamwork", zh: "团队配合" },
  FLAIR: { en: "Flair", zh: "个人风格" },
  EMO: { en: "Emotional Control", zh: "情绪管理" },
  COUR: { en: "Courage", zh: "勇气" },
};

/** UI-only mapping: softens low raw scores while preserving order (strictly increasing in raw). */
export function getDisplayScore(rawScore) {
  const clamped = Math.min(100, Math.max(0, Number(rawScore) || 0));
  const display = 50 + clamped * 0.45;
  return Math.min(Math.round(display), 100);
}

/** Single fill style for all attribute bars (matches Leadership / mid-tier look). */
const BAR_FILL_CLASS =
  "bg-gradient-to-r from-blue-400 to-cyan-300";

/**
 * Horizontal bar chart for the 6D normalized profile (userVector).
 * Raw scores from `data` are unchanged; bars and labels use displayScore for UX only.
 * @param {{ IQ: number, LEAD: number, CREA: number, TEAM: number, FLAIR: number, EMO: number, COUR: number }} data
 * @param {"en" | "zh"} locale
 * @param {boolean} [enableBarMotion=true] — set false for static bars (e.g. PNG export)
 */
export default function CoreAttributes({
  data,
  locale,
  enableBarMotion = true,
}) {
  const lang = locale === "zh" ? "zh" : "en";

  return (
    <div className="space-y-4">
      {CORE_ATTRIBUTE_KEYS.map((key, index) => {
        const raw =
          data?.[key] === undefined || data?.[key] === null
            ? 0
            : Math.min(100, Math.max(0, Math.round(Number(data[key]))));
        const displayScore = getDisplayScore(raw);
        const label = DIMENSION_LABELS[key][lang];

        return (
          <div key={key}>
            <div className="mb-1.5 flex items-center justify-between gap-3 text-sm">
              <span className="min-w-0 text-slate-300">
                <span className="font-mono text-[0.65rem] uppercase tracking-wider text-slate-500">
                  {key}
                </span>
                <span className="mx-1.5 text-slate-600">·</span>
                <span>{label}</span>
              </span>
              <span className="shrink-0 font-bold tabular-nums text-white">
                {displayScore}
              </span>
            </div>
            <div className="h-2.5 overflow-hidden rounded-full bg-slate-950/90 ring-1 ring-slate-700/60">
              {enableBarMotion ? (
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${displayScore}%` }}
                  transition={{
                    duration: 0.55,
                    ease: [0.22, 1, 0.36, 1],
                    delay: index * 0.04,
                  }}
                  className={`h-full rounded-full ${BAR_FILL_CLASS}`}
                />
              ) : (
                <div
                  className={`h-full rounded-full ${BAR_FILL_CLASS}`}
                  style={{ width: `${displayScore}%` }}
                />
              )}
            </div>
          </div>
        );
      })}
    </div>
  );
}
