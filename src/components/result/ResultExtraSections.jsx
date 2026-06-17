function ExtraCard({ icon, title, titleEn, children, className = "" }) {
  return (
    <article
      className={`rounded-2xl border border-slate-700/60 bg-slate-900/40 p-5 md:p-6 ${className}`}
    >
      <div className="flex items-start gap-3">
        <span className="text-xl leading-none" aria-hidden>
          {icon}
        </span>
        <div className="min-w-0 flex-1">
          <h3 className="text-base font-bold text-white md:text-lg">{title}</h3>
          <p className="mt-0.5 text-xs font-medium text-slate-400 md:text-sm">
            {titleEn}
          </p>
        </div>
      </div>
      <div className="mt-4">{children}</div>
    </article>
  );
}

export default function ResultExtraSections({ sections }) {
  if (!sections) return null;

  return (
    <section
      className="scroll-mt-6"
      aria-labelledby="result-extra-sections-heading"
    >
      <header className="mb-6 md:mb-8">
        <div className="flex flex-col gap-2 sm:flex-row sm:items-start sm:gap-3">
          <span className="text-2xl leading-none" aria-hidden>
            🏆
          </span>
          <div className="min-w-0">
            <h2
              id="result-extra-sections-heading"
              className="text-xl font-bold tracking-tight text-white md:text-2xl"
            >
              你的世界杯故事线
            </h2>
            <p className="mt-1 text-sm font-medium text-slate-400 md:text-base">
              Your World Cup Storyline
            </p>
          </div>
        </div>
      </header>

      <div className="grid gap-4 md:grid-cols-1 md:gap-5">
        <ExtraCard
          icon="⚡"
          title={sections.worldCupMoment.title}
          titleEn={sections.worldCupMoment.titleEn}
        >
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            {sections.worldCupMoment.content}
          </p>
        </ExtraCard>

        <ExtraCard
          icon="🤝"
          title={sections.bestTeammate.title}
          titleEn={sections.bestTeammate.titleEn}
        >
          <div className="mb-3 flex flex-wrap gap-2">
            {sections.bestTeammate.partners.map((name) => (
              <span
                key={name}
                className="rounded-full border border-cyan-400/30 bg-cyan-400/10 px-3 py-1 text-xs font-semibold text-cyan-100"
              >
                {name}
              </span>
            ))}
          </div>
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            {sections.bestTeammate.content}
          </p>
        </ExtraCard>

        <ExtraCard
          icon="📈"
          title={sections.nextUpgrade.title}
          titleEn={sections.nextUpgrade.titleEn}
        >
          <p className="text-sm leading-relaxed text-slate-300 md:text-base">
            {sections.nextUpgrade.content}
          </p>
        </ExtraCard>
      </div>
    </section>
  );
}
