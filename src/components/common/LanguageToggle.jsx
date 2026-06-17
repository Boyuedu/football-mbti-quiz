import { useLanguage } from "@/i18n/LanguageContext";

export default function LanguageToggle() {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div
      className="flex items-center gap-1 rounded-xl border border-slate-600/80 bg-slate-800/80 p-1"
      role="group"
      aria-label={t("language")}
    >
      <button
        type="button"
        onClick={() => setLanguage("en")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold uppercase tracking-wider transition ${
          language === "en"
            ? "bg-gradient-to-r from-cyan-400/90 to-violet-400/90 text-slate-950 shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {t("langEnglish")}
      </button>
      <button
        type="button"
        onClick={() => setLanguage("zh")}
        className={`rounded-lg px-3 py-1.5 text-xs font-semibold tracking-wide transition ${
          language === "zh"
            ? "bg-gradient-to-r from-cyan-400/90 to-violet-400/90 text-slate-950 shadow-sm"
            : "text-slate-400 hover:text-slate-200"
        }`}
      >
        {t("langChinese")}
      </button>
    </div>
  );
}
