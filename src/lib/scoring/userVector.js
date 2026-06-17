import { QUESTIONS } from "@/data/questions";

/** Raw dimension keys in scoring (`totals`); emotional control is stored as `EC`. */
const RAW_SCORE_KEYS = ["IQ", "LEAD", "CREA", "TEAM", "FLAIR", "EC", "COUR"];

/**
 * Normalized user vector keys — fixed order for similarity / ML use.
 * Emotional control from scores `EC` (or `EMO`) is exposed as `EMO`.
 */
export const USER_VECTOR_KEY_ORDER = [
  "IQ",
  "LEAD",
  "CREA",
  "TEAM",
  "FLAIR",
  "EMO",
  "COUR",
];

/**
 * Max achievable raw points per dimension for the given question set (best choice per question).
 */
export function computeScoreCeilings(questions) {
  const maxes = Object.fromEntries(RAW_SCORE_KEYS.map((k) => [k, 0]));
  for (const q of questions) {
    for (const k of RAW_SCORE_KEYS) {
      let best = 0;
      for (const c of q.choices) {
        const v = c.scores?.[k] ?? 0;
        if (v > best) best = v;
      }
      maxes[k] += best;
    }
  }
  return maxes;
}

/** Ceilings for the shipped `QUESTIONS` (used when `getUserVector` omits the second argument). */
export const SCORE_CEILINGS = computeScoreCeilings(QUESTIONS);

export function normalizeScore(value, maxValue) {
  if (maxValue <= 0) return 0;
  return Math.round((Number(value) / maxValue) * 100);
}

function resolveCeilings(maxScoresOrUniform) {
  if (maxScoresOrUniform == null) return SCORE_CEILINGS;
  if (typeof maxScoresOrUniform === "number") {
    return Object.fromEntries(
      RAW_SCORE_KEYS.map((k) => [k, maxScoresOrUniform])
    );
  }
  return maxScoresOrUniform;
}

/**
 * @param {Record<string, number>} scores — e.g. `totals` from `scoreAnswers` (`EC` for emotion)
 * @param {Record<string, number> | number | null | undefined} [maxScores] — per-dimension raw ceilings, or one number for all dimensions, or omit to use `SCORE_CEILINGS`
 * @returns {{ IQ: number, LEAD: number, CREA: number, TEAM: number, FLAIR: number, EMO: number, COUR: number }} — 0–100 per axis, order fixed by `USER_VECTOR_KEY_ORDER`
 */
export function getUserVector(scores, maxScores) {
  const ceilings = resolveCeilings(maxScores);
  const ecRaw = scores.EC ?? scores.EMO ?? 0;
  const ecMax = ceilings.EC ?? ceilings.EMO ?? 1;
  const courMax = ceilings.COUR ?? 1;

  return {
    IQ: normalizeScore(scores.IQ ?? 0, ceilings.IQ),
    LEAD: normalizeScore(scores.LEAD ?? 0, ceilings.LEAD),
    CREA: normalizeScore(scores.CREA ?? 0, ceilings.CREA),
    TEAM: normalizeScore(scores.TEAM ?? 0, ceilings.TEAM),
    FLAIR: normalizeScore(scores.FLAIR ?? 0, ceilings.FLAIR),
    EMO: normalizeScore(ecRaw, ecMax <= 0 ? 1 : ecMax),
    COUR: normalizeScore(scores.COUR ?? 0, courMax <= 0 ? 1 : courMax),
  };
}

/** Ordered array [IQ, LEAD, CREA, TEAM, FLAIR, EMO, COUR] — same order as `USER_VECTOR_KEY_ORDER`. */
export function userVectorToArray(v) {
  return USER_VECTOR_KEY_ORDER.map((k) => v[k]);
}
