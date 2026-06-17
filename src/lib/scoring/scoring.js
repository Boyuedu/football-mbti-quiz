import {
  ARCHETYPE_DIMENSION_KEYS,
  DIMENSION_KEYS,
} from "@/data/questions";
import {
  ARCHETYPES,
  getArchetypeComboByBaseCode,
  RESULT_DEFINITIONS,
} from "@/data/archetypes/results";
import { getUserVector } from "./userVector";
import {
  classifyVectorResultTier,
  getPrimaryArchetype,
  getSecondaryArchetype,
  rankArchetypes,
} from "./vectorSimilarity";

const dimensionKeys = DIMENSION_KEYS;

function getTier(topScore, secondScore) {
  const gap = topScore - secondScore;
  if (gap >= 8) return "Prime";
  if (gap >= 4) return "Core";
  return "Hybrid";
}

export function scoreAnswers(questions, answers) {
  const totals = dimensionKeys.reduce((acc, key) => {
    acc[key] = 0;
    return acc;
  }, {});

  questions.forEach((question, idx) => {
    const choiceIndex = answers[idx];
    if (choiceIndex === undefined) return;

    const choice = question.choices[choiceIndex];
    if (!choice?.scores) return;

    Object.entries(choice.scores).forEach(([dimension, points]) => {
      totals[dimension] += points;
    });
  });

  const ranked = [...dimensionKeys].sort((a, b) => totals[b] - totals[a]);
  const archetypeRanked = [...ARCHETYPE_DIMENSION_KEYS].sort(
    (a, b) => totals[b] - totals[a]
  );
  const topDimension = archetypeRanked[0];
  const secondDimension = archetypeRanked[1];
  const pairKeyTier = getTier(totals[topDimension], totals[secondDimension]);

  const pairKey = [topDimension, secondDimension].sort().join("_");
  const pairKeyMappingKey = `${pairKey}_${pairKeyTier}`;

  const pairKeyResult =
    RESULT_DEFINITIONS.find((item) => item.key === pairKeyMappingKey) ??
    RESULT_DEFINITIONS[0];

  const userVector = getUserVector(totals);
  const rankedArchetypes = rankArchetypes(userVector);
  const primary = getPrimaryArchetype(rankedArchetypes);
  const secondary = getSecondaryArchetype(rankedArchetypes);
  const d1 = primary.distance;
  const d2 = secondary.distance;
  const { tier: vectorTier, gap: vectorGap } = classifyVectorResultTier(d1, d2);

  const combo = getArchetypeComboByBaseCode(primary.code);
  const pairKeyFromVector = combo?.pairKey ?? null;
  const vectorLookupKey =
    pairKeyFromVector != null
      ? `${pairKeyFromVector}_${vectorTier}`
      : null;

  let vectorResult =
    vectorLookupKey != null
      ? RESULT_DEFINITIONS.find((item) => item.key === vectorLookupKey) ?? null
      : null;

  const vectorLookupFailed = !vectorResult || !combo;
  const result = vectorLookupFailed ? pairKeyResult : vectorResult;

  const activeMappingKey = vectorLookupFailed
    ? pairKeyMappingKey
    : vectorLookupKey;

  const primaryDef = ARCHETYPES[primary.code];

  return {
    result,
    totals,
    rankedDimensions: ranked,
    archetypeRankedDimensions: archetypeRanked,
    mappingKey: activeMappingKey,
    userVector,
    vectorClassification: {
      usedFallback: vectorLookupFailed,
      baseCode: primary.code,
      finalResultCode: result.resultCode,
      baseNameEn: primaryDef?.baseNameEn ?? "",
      baseNameZh: primaryDef?.baseNameZh ?? "",
      tier: vectorTier,
      mbtiCode: combo?.mbtiCode ?? null,
      lookupKey: activeMappingKey,
      pairKey: pairKeyFromVector,
      vectorMatch: {
        primaryCode: primary.code,
        secondaryCode: secondary.code,
        primaryDistance: d1,
        secondaryDistance: d2,
        gap: vectorGap,
        ranked: rankedArchetypes,
      },
    },
    explanationLayer: {
      pairKeyMappingKey,
      pairKey,
      dimensionTier: pairKeyTier,
      result: pairKeyResult,
    },
  };
}
