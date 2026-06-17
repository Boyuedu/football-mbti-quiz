/** Localize a question for display (scoring uses original `choices[].scores`). */
export function getLocalizedQuestion(question, lang) {
  const locale = lang === "zh" ? "zh" : "en";
  return {
    id: question.id,
    specialMoment: question.specialMoment ?? null,
    momentNumber: question.momentNumber ?? null,
    title: question.title?.[locale],
    scenario: question.scenario?.[locale],
    question: question.question?.[locale],
    prompt: question.prompt?.[locale] ?? question.question?.[locale],
    choices: question.choices.map((c) => ({
      text: c.text[locale],
      scores: c.scores,
    })),
  };
}

export function getLocalizedResult(result, lang) {
  const locale = lang === "zh" ? "zh" : "en";
  const copy = result[locale] ?? result.en;
  return {
    resultCode: result.resultCode,
    mbtiCode: result.mbtiCode,
    resultName: copy.resultName,
    archetypeTitle: copy.archetypeTitle,
    shortSummary: copy.shortSummary,
    footballInterpretation: copy.footballInterpretation,
    idealRoleOnPitch: copy.idealRoleOnPitch,
    tags: result.tags,
  };
}
