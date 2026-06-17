import { motion } from "framer-motion";
import ProgressBar from "@/components/common/ProgressBar";
import { useLanguage } from "@/i18n/LanguageContext";

function WorldCupMomentHeader({ momentNumber, t }) {
  const episode = momentNumber != null ? String(momentNumber).padStart(2, "0") : "";

  return (
    <div className="world-cup-moment-header relative overflow-hidden rounded-2xl border border-amber-400/35 bg-gradient-to-br from-emerald-950/90 via-slate-900/95 to-amber-950/80 px-5 py-5 shadow-[0_0_40px_rgba(251,191,36,0.12)] md:px-7 md:py-6">
      <div
        className="pointer-events-none absolute inset-0 opacity-30"
        aria-hidden
        style={{
          backgroundImage:
            "radial-gradient(circle at 12% 18%, rgba(52,211,153,0.35), transparent 42%), radial-gradient(circle at 88% 82%, rgba(251,191,36,0.28), transparent 40%)",
        }}
      />
      <div className="relative">
        <p className="text-[0.65rem] font-bold uppercase tracking-[0.28em] text-amber-200/90 md:text-xs">
          {t("worldCupSpecialBadge")}
        </p>
        <p className="mt-1 text-lg font-black tracking-wide text-white md:text-xl">
          {t("worldCupSpecialLabel")}
        </p>
        {episode ? (
          <p className="mt-2 text-xs font-semibold uppercase tracking-[0.22em] text-emerald-300/90">
            {t("worldCupMomentPrefix")} {episode}
          </p>
        ) : null}
      </div>
    </div>
  );
}

export default function QuizScreen({
  question,
  questionNumber,
  totalQuestions,
  selectedChoice,
  onSelectChoice,
  onPrev,
  onNext,
  canGoNext,
}) {
  const { language, t } = useLanguage();
  const isWorldCupMoment = question.specialMoment === "worldCup2026";

  const questionProgress =
    language === "zh"
      ? `第 ${questionNumber} / ${totalQuestions} 题`
      : `${t("questionLabel")} ${questionNumber} / ${totalQuestions}`;

  const sectionMotion = isWorldCupMoment
    ? {
        initial: { opacity: 0, scale: 0.94, y: 20 },
        animate: { opacity: 1, scale: 1, y: 0 },
        exit: { opacity: 0, scale: 0.97, y: -12 },
        transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] },
      }
    : {
        initial: { opacity: 0, x: 30 },
        animate: { opacity: 1, x: 0 },
        exit: { opacity: 0, x: -30 },
        transition: { duration: 0.35 },
      };

  const shellClass = isWorldCupMoment
    ? "mx-auto w-full max-w-3xl rounded-3xl border border-amber-400/40 bg-gradient-to-b from-emerald-950/50 via-slate-900/80 to-slate-900/70 p-6 shadow-[0_0_60px_rgba(16,185,129,0.12)] backdrop-blur md:p-10"
    : "mx-auto w-full max-w-3xl rounded-3xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-2xl backdrop-blur md:p-10";

  return (
    <motion.section key={question.id} {...sectionMotion} className={shellClass}>
      <ProgressBar
        current={questionNumber}
        total={totalQuestions}
        label={t("progress")}
      />

      {isWorldCupMoment ? (
        <div className="mt-7">
          <WorldCupMomentHeader
            momentNumber={question.momentNumber}
            t={t}
          />
        </div>
      ) : (
        <p className="mt-7 text-xs uppercase tracking-[0.2em] text-cyan-300">
          {questionProgress}
        </p>
      )}

      {isWorldCupMoment ? (
        <p className="mt-4 text-xs uppercase tracking-[0.2em] text-amber-200/70">
          {questionProgress}
        </p>
      ) : null}

      {question.title ? (
        <>
          <h2
            className={`mt-2 font-semibold leading-snug text-white md:text-3xl ${
              isWorldCupMoment
                ? "text-xl text-amber-50 md:text-2xl"
                : "text-2xl"
            }`}
          >
            {question.title}
          </h2>
          {question.scenario && (
            <p
              className={`mt-4 text-base leading-relaxed md:text-lg ${
                isWorldCupMoment ? "text-emerald-50/90" : "text-slate-300"
              }`}
            >
              {question.scenario}
            </p>
          )}
          {question.question && (
            <p
              className={`mt-4 text-lg font-medium md:text-xl ${
                isWorldCupMoment ? "text-amber-100" : "text-slate-100"
              }`}
            >
              {question.question}
            </p>
          )}
        </>
      ) : (
        <h2 className="mt-2 text-2xl font-semibold leading-snug text-white md:text-3xl">
          {question.prompt}
        </h2>
      )}

      <div className="mt-7 space-y-3">
        {question.choices.map((choice, idx) => {
          const selected = selectedChoice === idx;

          const choiceClass = isWorldCupMoment
            ? selected
              ? "border-amber-300 bg-amber-400/15 text-amber-50 shadow-[0_0_24px_rgba(251,191,36,0.18)]"
              : "border-emerald-800/80 bg-slate-900/70 text-slate-100 hover:border-amber-400/45 hover:bg-emerald-950/40"
            : selected
              ? "border-cyan-300 bg-cyan-400/15 text-cyan-100 shadow-neon"
              : "border-slate-700 bg-slate-800/60 text-slate-200 hover:border-slate-500";

          const badgeClass = isWorldCupMoment
            ? "border-amber-500/50 text-amber-100"
            : "border-slate-500";

          return (
            <button
              key={`${question.id}-${idx}`}
              onClick={() => onSelectChoice(idx)}
              className={`w-full rounded-2xl border px-4 py-4 text-left text-sm transition md:text-base ${choiceClass}`}
            >
              <span
                className={`mr-3 inline-flex h-7 w-7 shrink-0 items-center justify-center rounded-full border text-xs font-semibold ${badgeClass}`}
              >
                {String.fromCharCode(65 + idx)}
              </span>
              {choice.text}
            </button>
          );
        })}
      </div>

      <div className="mt-8 flex items-center justify-between gap-3">
        <button
          onClick={onPrev}
          disabled={questionNumber === 1}
          className="rounded-xl border border-slate-600 px-4 py-2 text-sm text-slate-200 transition hover:border-slate-400 disabled:cursor-not-allowed disabled:opacity-40"
        >
          {t("previous")}
        </button>
        <button
          onClick={onNext}
          disabled={!canGoNext}
          className={`rounded-xl px-5 py-2 text-sm font-semibold transition hover:brightness-110 disabled:cursor-not-allowed disabled:opacity-40 ${
            isWorldCupMoment
              ? "bg-gradient-to-r from-amber-400 via-emerald-400 to-amber-300 text-slate-950"
              : "bg-gradient-to-r from-cyan-400 to-violet-400 text-slate-950"
          }`}
        >
          {questionNumber === totalQuestions ? t("revealResult") : t("next")}
        </button>
      </div>
    </motion.section>
  );
}
