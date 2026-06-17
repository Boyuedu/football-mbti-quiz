import { useMemo, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useLanguage } from "@/i18n/LanguageContext";
import { getLocalizedResult } from "@/i18n/localize";
import { TAG_LABELS } from "@/i18n/tagLabels";
import {
  copyTextToClipboard,
  formatDongqiudiCN,
  formatDouyinCN,
  formatGenericEN,
  formatWeChatCN,
  formatXiaohongshuCN,
} from "@/lib/share/shareFormats";
import CoreAttributes from "./CoreAttributes";
import RadarChart from "./RadarChart";
import PlayerBuildShareCard from "./PlayerBuildShareCard";
import ResultExtraSections from "./ResultExtraSections";
import CompletionStats from "./CompletionStats";
import {
  exportPlayerCardPng,
  slugifyPlayerCardFileName,
} from "@/lib/share/playerCardExport";
import {
  deriveBaseCodeFromResultCode,
  getArchetypeReport,
} from "@/data/archetypes/reports";
import { getLocalizedResultExtraSections } from "@/data/content/resultExtraSections";

const RESULT_SECTION_HEADERS = {
  scout: {
    icon: "🧠",
    titleZh: "教练评估报告",
    titleEn: "Scout Report",
  },
  playerBuild: {
    icon: "🎮",
    titleZh: "球员属性构建",
    titleEn: "Player Build",
  },
};

function subHeadingClass() {
  return "text-xs font-semibold uppercase tracking-wider text-slate-500";
}

function scoutHeading(language, zh, en) {
  return language === "zh" ? zh : en;
}

function ResultSectionHeader({ icon, titleZh, titleEn, headingId }) {
  return (
    <header className="mb-8 md:mb-10">
      <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
        <span className="text-2xl leading-none" aria-hidden>
          {icon}
        </span>
        <div className="min-w-0">
          <h2
            id={headingId}
            className="text-xl font-bold tracking-tight text-white md:text-2xl"
          >
            {titleZh}
          </h2>
          <p className="mt-1 text-sm font-medium text-slate-400 md:text-base">
            {titleEn}
          </p>
        </div>
      </div>
    </header>
  );
}

export default function ResultScreen({ resultPayload, onRestart }) {
  const { language, t, strings } = useLanguage();
  const {
    result,
    archetypeRankedDimensions,
    userVector,
    vectorClassification,
  } = resultPayload;
  const [shareMessage, setShareMessage] = useState("");
  const [playerName, setPlayerName] = useState("");
  const [cardExportMessage, setCardExportMessage] = useState("");
  const playerCardExportRef = useRef(null);

  const localized = useMemo(
    () => getLocalizedResult(result, language),
    [result, language]
  );
  const resolvedBaseCode = useMemo(
    () =>
      result?.baseCode ??
      vectorClassification?.baseCode ??
      deriveBaseCodeFromResultCode(result?.resultCode ?? result?.code),
    [result, vectorClassification?.baseCode]
  );
  const extraSections = useMemo(
    () => getLocalizedResultExtraSections(resolvedBaseCode, language),
    [resolvedBaseCode, language]
  );
  const tierLabel = useMemo(() => {
    const tierKey = result?.key?.split("_").pop();
    if (!tierKey) return null;
    return (TAG_LABELS[language] ?? TAG_LABELS.en)[tierKey] ?? null;
  }, [result?.key, language]);
  const heroTags = useMemo(
    () =>
      tierLabel
        ? [...extraSections.hero.tags, tierLabel]
        : extraSections.hero.tags,
    [extraSections.hero.tags, tierLabel]
  );
  const archetypeReport = useMemo(
    () => getArchetypeReport(resolvedBaseCode, result?.resultCode ?? result?.code),
    [resolvedBaseCode, result]
  );
  if (import.meta.env.DEV) {
    console.debug("[ScoutReport] baseCode resolution", {
      resolvedBaseCode,
      hasArchetypeReport: Boolean(archetypeReport),
      source: "archetypeReports",
    });
  }
  const reportLocale = language === "zh" ? "zh" : "en";
  const reportCoreIdentity = archetypeReport?.coreIdentity?.[reportLocale] ?? "";
  const reportStrengths = archetypeReport?.strengths?.[reportLocale] ?? [];
  const reportRisks = archetypeReport?.risks?.[reportLocale] ?? [];
  const reportTacticalFit = archetypeReport?.tacticalFit?.[reportLocale] ?? "";
  const reportOptimalSystem = archetypeReport?.optimalSystem?.[reportLocale] ?? "";
  const reportBestRole = archetypeReport?.bestRole?.[reportLocale] ?? "";
  const reportUnsuitableScenarios =
    archetypeReport?.unsuitableScenarios?.[reportLocale] ?? "";
  const reportLegacyPlayer =
    reportLocale === "zh"
      ? archetypeReport?.legacy?.playerZh ?? archetypeReport?.legacy?.playerEn ?? ""
      : archetypeReport?.legacy?.playerEn ?? "";
  const reportLegacyReason =
    reportLocale === "zh"
      ? archetypeReport?.legacy?.reasonZh ?? ""
      : archetypeReport?.legacy?.reasonEn ?? "";
  const tagLabels = TAG_LABELS[language] ?? TAG_LABELS.en;

  const displayCardName =
    playerName.trim() || t("defaultPlayerCardName");

  async function handleDownloadPlayerCard() {
    const exportHost = playerCardExportRef.current;
    const node =
      exportHost?.querySelector?.("[data-player-build-export='true']") ??
      exportHost;
    if (!node) return;
    setCardExportMessage("");
    try {
      await exportPlayerCardPng(
        node,
        slugifyPlayerCardFileName(playerName.trim())
      );
      setCardExportMessage(t("downloadCardSuccess"));
    } catch {
      setCardExportMessage(t("downloadCardFailed"));
    }
    setTimeout(() => setCardExportMessage(""), 3200);
  }

  const shareArgs = useMemo(
    () => ({
      brand: t("brand"),
      extraSections,
      localized,
      archetypeRankedDimensions,
      dimensionLabels: strings.dimensions,
    }),
    [
      t,
      extraSections,
      localized,
      archetypeRankedDimensions,
      strings.dimensions,
    ]
  );

  const defaultShareText = useMemo(
    () =>
      language === "zh"
        ? formatWeChatCN(shareArgs)
        : formatGenericEN(shareArgs),
    [language, shareArgs]
  );

  const handleShare = async () => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: localized.resultName,
          text: defaultShareText,
        });
        return;
      }
    } catch {
      // Continue to clipboard fallback when native share is canceled/unsupported.
    }

    const ok = await copyTextToClipboard(defaultShareText);
    setShareMessage(ok ? t("copiedShare") : t("copyFailed"));
    setTimeout(() => setShareMessage(""), 2800);
  };

  const copyPlatformCaption = async (buildText, channelLabel) => {
    const ok = await copyTextToClipboard(buildText(shareArgs));
    setShareMessage(
      ok ? `${t("copiedPlatform")} ${channelLabel}` : t("copyFailed")
    );
    setTimeout(() => setShareMessage(""), 2800);
  };

  const sh = subHeadingClass();

  return (
    <motion.section
      key="result"
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45 }}
      className="result-glass-root mx-auto w-full max-w-4xl rounded-3xl border border-violet-300/25 border-t-white/10 p-8 md:p-12"
    >
      <div className="result-glass-blur" aria-hidden />
      <div className="result-glass-shade" aria-hidden />
      <div className="result-glass-rim" aria-hidden />
      <div className="relative z-10">
        {/* —— Hero: identity (unchanged) —— */}
        <header className="border-b border-slate-600/40 pb-10">
          <p
            className={`inline-flex rounded-full border border-cyan-300/35 bg-cyan-400/10 px-3 py-1 text-[0.65rem] font-semibold text-cyan-200 md:text-xs ${
              language === "zh" ? "tracking-wide" : "uppercase tracking-[0.16em]"
            }`}
          >
            {t("yourResult")}
          </p>
          <h1 className="mt-5 text-3xl font-black leading-[1.12] text-white md:text-5xl md:leading-tight">
            {localized.resultName}
          </h1>
          <p className="mt-3 font-mono text-xs text-cyan-300/95 md:text-sm">
            {resolvedBaseCode} · {localized.resultCode}
          </p>
          <p className="mt-6 max-w-3xl text-lg leading-relaxed text-slate-100 md:text-xl">
            {extraSections.hero.tagline}
          </p>
          <div className="mt-8 flex flex-wrap gap-2">
            {heroTags.map((tag) => (
              <span
                key={tag}
                className={`rounded-full border border-slate-500/80 bg-slate-800/90 px-3 py-1.5 text-xs text-slate-200 ${
                  language === "zh" ? "tracking-wide" : "uppercase tracking-wider"
                }`}
              >
                {tagLabels[tag] ?? tag}
              </span>
            ))}
          </div>
        </header>

        <div className="mt-12 space-y-16 md:space-y-20">
          <ResultExtraSections sections={extraSections} />

          {/* —— Section 1: Scout Report —— */}
          <section
            className="scroll-mt-6"
            aria-labelledby="result-section-scout-heading"
          >
            <ResultSectionHeader
              icon={RESULT_SECTION_HEADERS.scout.icon}
              titleZh={RESULT_SECTION_HEADERS.scout.titleZh}
              titleEn={RESULT_SECTION_HEADERS.scout.titleEn}
              headingId="result-section-scout-heading"
            />
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/45 p-6 md:p-8">
              {archetypeReport ? (
                <div className="space-y-10">
                <div>
                  <h3 className={sh}>
                    {scoutHeading(language, "核心结论", "Core Identity")}
                  </h3>
                  {reportCoreIdentity ? (
                    <p className="mt-4 max-w-3xl text-sm leading-relaxed text-slate-300 md:text-base">
                      {reportCoreIdentity}
                    </p>
                  ) : null}
                </div>

                <div className="border-t border-slate-600/40 pt-10">
                  <h3 className={sh}>
                    {scoutHeading(language, "优势 / 风险", "Strengths / Risks")}
                  </h3>
                  {reportStrengths.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {scoutHeading(language, "优势", "Strengths")}
                      </p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300 md:text-base">
                        {reportStrengths.map((item) => (
                          <li key={`strength-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                  {reportRisks.length ? (
                    <div className="mt-4">
                      <p className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                        {scoutHeading(language, "风险", "Risks")}
                      </p>
                      <ul className="mt-2 space-y-2 text-sm leading-relaxed text-slate-300 md:text-base">
                        {reportRisks.map((item) => (
                          <li key={`risk-${item}`}>{item}</li>
                        ))}
                      </ul>
                    </div>
                  ) : null}
                </div>

                <div className="border-t border-slate-600/40 pt-10">
                  <h3 className={sh}>
                    {scoutHeading(language, "战术适配", "Tactical Fit")}
                  </h3>
                  {reportTacticalFit ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                      {reportTacticalFit}
                    </p>
                  ) : null}
                </div>

                <div className="border-t border-slate-600/40 pt-10">
                  <h3 className={sh}>
                    {scoutHeading(language, "最优体系", "Optimal System")}
                  </h3>
                  {reportOptimalSystem ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                      {reportOptimalSystem}
                    </p>
                  ) : null}
                </div>

                <div className="border-t border-slate-600/40 pt-10">
                  <h3 className={sh}>
                    {scoutHeading(language, "最佳角色", "Best Role")}
                  </h3>
                  {reportBestRole ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                      {reportBestRole}
                    </p>
                  ) : null}
                </div>

                <div className="border-t border-slate-600/40 pt-10">
                  <h3 className={sh}>
                    {scoutHeading(language, "不适合场景", "Unsuitable Scenarios")}
                  </h3>
                  {reportUnsuitableScenarios ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-300 md:text-base">
                      {reportUnsuitableScenarios}
                    </p>
                  ) : null}
                </div>

                <div className="border-t border-slate-600/40 pt-10">
                  <h3 className={sh}>{scoutHeading(language, "风格参照", "Legacy")}</h3>
                  {reportLegacyPlayer ? (
                    <p className="mt-4 text-sm leading-relaxed text-slate-200 md:text-base">
                      {reportLegacyPlayer}
                    </p>
                  ) : null}
                  {reportLegacyReason ? (
                    <p className="mt-3 text-sm leading-relaxed text-slate-300 md:text-base">
                      {reportLegacyReason}
                    </p>
                  ) : null}
                </div>
              </div>
              ) : (
                <p className="text-sm leading-relaxed text-slate-300 md:text-base">
                  {language === "zh"
                    ? "未找到对应的球员原型报告。"
                    : "Archetype report not found."}
                </p>
              )}
            </div>
          </section>

          {/* —— Section 3: Player Build —— */}
          <section
            className="scroll-mt-6"
            aria-labelledby="result-section-build-heading"
          >
            <ResultSectionHeader
              icon={RESULT_SECTION_HEADERS.playerBuild.icon}
              titleZh={RESULT_SECTION_HEADERS.playerBuild.titleZh}
              titleEn={RESULT_SECTION_HEADERS.playerBuild.titleEn}
              headingId="result-section-build-heading"
            />
            <div className="rounded-2xl border border-slate-700/60 bg-slate-800/45 p-6 md:p-8">
              <div className="mb-8 max-w-xl space-y-3">
                <label
                  className="block text-xs font-semibold uppercase tracking-wider text-slate-400"
                  htmlFor="player-build-name"
                >
                  {t("enterPlayerName")}
                </label>
                <input
                  id="player-build-name"
                  type="text"
                  value={playerName}
                  onChange={(e) => setPlayerName(e.target.value)}
                  placeholder={t("enterPlayerName")}
                  maxLength={80}
                  autoComplete="off"
                  className="w-full rounded-xl border border-slate-600 bg-slate-950/60 px-4 py-3 text-sm text-white outline-none placeholder:text-slate-500 focus:border-cyan-400/60 focus:ring-2 focus:ring-cyan-500/20"
                />
                <button
                  type="button"
                  onClick={() => void handleDownloadPlayerCard()}
                  className="rounded-xl border border-cyan-400/40 bg-gradient-to-r from-blue-600/80 to-cyan-600/80 px-5 py-2.5 text-sm font-bold uppercase tracking-wider text-white transition hover:brightness-110"
                >
                  {t("downloadPlayerCard")}
                </button>
                {cardExportMessage ? (
                  <p className="text-xs text-cyan-300">{cardExportMessage}</p>
                ) : null}
              </div>

              <h3 className={sh}>{t("coreAttributes")}</h3>
              <div className="mt-5 max-w-xl">
                <CoreAttributes data={userVector ?? {}} locale={language} />
              </div>

              <div className="mt-10 border-t border-slate-600/40 pt-10">
                <h3 className={sh}>{t("radarProfile")}</h3>
                <div className="mt-6 flex justify-center overflow-x-auto rounded-2xl bg-[#0C0E30] px-2 py-6 ring-1 ring-white/10 sm:px-4">
                  <RadarChart data={userVector ?? {}} locale={language} />
                </div>
              </div>
            </div>

            <div
              ref={playerCardExportRef}
              className="pointer-events-none fixed left-[-12000px] top-0 z-0"
              aria-hidden
            >
              <PlayerBuildShareCard
                displayName={displayCardName}
                userVector={userVector ?? {}}
                locale={language}
                coreTitle={t("coreAttributes")}
                radarTitle={t("radarProfile")}
                subtitle={t("playerCardProfileSubtitle")}
                footerBrand={t("brand")}
                footerLine={t("tagline")}
                enableBarMotion={false}
              />
            </div>
          </section>

          <CompletionStats />

          {/* —— Actions —— */}
          <footer
            className="border-t border-slate-600/50 pt-10"
            aria-labelledby="result-actions"
          >
            <h2 id="result-actions" className="border-b border-slate-600/50 pb-2 text-sm font-semibold tracking-wide text-slate-100 md:text-base">
              {t("sectionActions")}
            </h2>
            <div className="mt-5 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={onRestart}
                className="rounded-xl bg-gradient-to-r from-emerald-300 to-cyan-300 px-6 py-3 text-sm font-bold uppercase tracking-wider text-slate-950 transition hover:brightness-110"
              >
                {t("retakeQuiz")}
              </button>
              <button
                type="button"
                onClick={handleShare}
                className="rounded-xl border border-slate-500 bg-slate-800 px-6 py-3 text-sm font-semibold uppercase tracking-wider text-slate-100 transition hover:border-cyan-300 hover:text-cyan-200"
              >
                {t("shareResult")}
              </button>
              {shareMessage ? (
                <span className="text-xs text-cyan-300">{shareMessage}</span>
              ) : null}
            </div>

            <div className="mt-8 rounded-2xl border border-slate-600/60 bg-slate-950/35 p-5 md:p-6">
              <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
                {t("shareChineseAppsTitle")}
              </h3>
              <p className="mt-2 text-xs leading-relaxed text-slate-500">
                {t("sharePasteHint")}
              </p>
              <div className="mt-4 grid grid-cols-2 gap-2 sm:grid-cols-4">
                <button
                  type="button"
                  onClick={() =>
                    void copyPlatformCaption(
                      formatWeChatCN,
                      t("shareChannelWeChat")
                    )
                  }
                  className="rounded-xl border border-slate-600 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-emerald-200"
                >
                  {t("copyForWeChat")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void copyPlatformCaption(
                      formatXiaohongshuCN,
                      t("shareChannelXHS")
                    )
                  }
                  className="rounded-xl border border-slate-600 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-emerald-200"
                >
                  {t("copyForXHS")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void copyPlatformCaption(
                      formatDouyinCN,
                      t("shareChannelDouyin")
                    )
                  }
                  className="rounded-xl border border-slate-600 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-emerald-200"
                >
                  {t("copyForDouyin")}
                </button>
                <button
                  type="button"
                  onClick={() =>
                    void copyPlatformCaption(
                      formatDongqiudiCN,
                      t("shareChannelDongqiudi")
                    )
                  }
                  className="rounded-xl border border-slate-600 bg-slate-800/90 px-3 py-2.5 text-xs font-semibold text-slate-100 transition hover:border-emerald-400/60 hover:text-emerald-200"
                >
                  {t("copyForDongqiudi")}
                </button>
              </div>
            </div>
          </footer>
        </div>
      </div>
    </motion.section>
  );
}
