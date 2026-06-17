import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";

export default function IntroScreen({ onStart }) {
  const { t, strings } = useLanguage();

  return (
    <motion.section
      key="intro"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -24 }}
      transition={{ duration: 0.45 }}
      className="mx-auto w-full max-w-3xl rounded-3xl border border-slate-700/70 bg-slate-900/70 p-8 shadow-2xl backdrop-blur md:p-12"
    >
      <p className="mb-3 inline-flex rounded-full border border-cyan-300/50 bg-cyan-400/10 px-4 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-cyan-300">
        {t("introBadge")}
      </p>
      <h1 className="text-4xl font-black leading-tight text-white md:text-6xl">
        {t("introTitleBefore")}
        <span className="bg-gradient-to-r from-cyan-300 via-violet-300 to-emerald-300 bg-clip-text text-transparent">
          {" "}
          {t("introTitleHighlight")}
        </span>
      </h1>
      <p className="mt-5 max-w-2xl whitespace-pre-line text-base text-slate-300 md:text-lg">
        {t("introBody")}
      </p>

      <h2 className="mt-10 border-b border-slate-600/50 pb-2 text-sm font-semibold tracking-wide text-slate-100 md:text-base">
        {t("introDimensionsTitle")}
      </h2>
      <div className="mt-5 grid grid-cols-2 gap-3 text-sm text-slate-300 md:grid-cols-5">
        {strings.dimensionPills.map((item) => (
          <div
            key={item}
            className="rounded-xl border border-slate-700 bg-slate-800/80 px-3 py-2 text-center"
          >
            {item}
          </div>
        ))}
      </div>

      <button
        onClick={onStart}
        className="mt-10 inline-flex items-center rounded-xl bg-gradient-to-r from-cyan-400 via-violet-400 to-emerald-400 px-7 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:scale-[1.02] hover:shadow-neon active:scale-100"
      >
        {t("startQuiz")}
      </button>
    </motion.section>
  );
}
