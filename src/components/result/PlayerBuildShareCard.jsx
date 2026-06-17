import CoreAttributes from "./CoreAttributes";
import RadarChart from "./RadarChart";

/**
 * Polished stat card for PNG export (and optional preview). No inputs/buttons inside.
 */
export default function PlayerBuildShareCard({
  displayName,
  userVector,
  locale,
  coreTitle,
  radarTitle,
  subtitle,
  footerBrand,
  footerLine,
  enableBarMotion = false,
}) {
  return (
    <div
      className="box-border w-[720px] max-w-none rounded-3xl border border-cyan-500/20 bg-[#0C0E30] px-10 pb-12 pt-10 text-white shadow-2xl shadow-black/50"
      data-player-build-export="true"
    >
      <p className="text-center text-[0.65rem] font-semibold uppercase tracking-[0.35em] text-cyan-400/90">
        {subtitle}
      </p>
      <h2 className="mt-3 text-center text-4xl font-black leading-tight tracking-tight text-white md:text-5xl">
        {displayName}
      </h2>

      <div className="mt-10 border-t border-white/10 pt-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {coreTitle}
        </h3>
        <div className="mt-4 max-w-xl">
          <CoreAttributes
            data={userVector}
            locale={locale}
            enableBarMotion={enableBarMotion}
          />
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-8">
        <h3 className="text-xs font-semibold uppercase tracking-wider text-slate-400">
          {radarTitle}
        </h3>
        <div className="mt-6 flex justify-center rounded-2xl bg-[#0C0E30] px-3 py-5 ring-1 ring-white/10">
          <RadarChart data={userVector} locale={locale} colorMode="light" />
        </div>
      </div>

      <div className="mt-10 border-t border-white/10 pt-6 text-center">
        <p className="text-sm font-bold uppercase tracking-[0.2em] text-cyan-200/95">
          {footerBrand}
        </p>
        <p className="mt-1 text-[0.65rem] text-slate-500">{footerLine}</p>
      </div>
    </div>
  );
}
