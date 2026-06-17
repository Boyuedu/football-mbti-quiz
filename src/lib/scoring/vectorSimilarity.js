import { ARCHETYPE_PROTOTYPES } from "@/data/archetypes/prototypes";

/**
 * Vector-based tier tuning (Euclidean space on 0–100 axes).
 * Hybrid: top-2 archetypes are similarly close (small gap).
 * Prime: user is close to the best prototype (small d1) and clearly ahead of #2 (large gap).
 * Core: everything else.
 */
export const HYBRID_GAP_THRESHOLD = 8;
export const PRIME_DISTANCE_THRESHOLD = 30;
export const PRIME_GAP_THRESHOLD = 10;

export function calculateEuclideanDistance(user, prototype) {
  return Math.sqrt(
    Math.pow(user.IQ - prototype.IQ, 2) +
      Math.pow(user.LEAD - prototype.LEAD, 2) +
      Math.pow(user.CREA - prototype.CREA, 2) +
      Math.pow(user.TEAM - prototype.TEAM, 2) +
      Math.pow(user.FLAIR - prototype.FLAIR, 2) +
      Math.pow(user.EMO - prototype.EMO, 2) +
      Math.pow((user.COUR ?? 0) - (prototype.COUR ?? 0), 2)
  );
}

export function computeAllDistances(userVector) {
  const results = [];

  for (const code in ARCHETYPE_PROTOTYPES) {
    const prototype = ARCHETYPE_PROTOTYPES[code];

    const distance = calculateEuclideanDistance(userVector, prototype);

    results.push({
      code: code,
      distance: distance,
    });
  }

  return results;
}

export function rankArchetypes(userVector) {
  const distances = computeAllDistances(userVector);

  distances.sort((a, b) => a.distance - b.distance);

  return distances;
}

export function getPrimaryArchetype(rankedList) {
  return rankedList[0];
}

export function getSecondaryArchetype(rankedList) {
  return rankedList[1];
}

export function getTopMatches(userVector) {
  const ranked = rankArchetypes(userVector);

  return {
    primary: getPrimaryArchetype(ranked),
    secondary: getSecondaryArchetype(ranked),
    all: ranked,
  };
}

/**
 * @returns {{ tier: "Prime" | "Core" | "Hybrid", gap: number }}
 */
export function classifyVectorResultTier(d1, d2) {
  const gap = d2 - d1;
  if (gap <= HYBRID_GAP_THRESHOLD) {
    return { tier: "Hybrid", gap };
  }
  if (d1 <= PRIME_DISTANCE_THRESHOLD && gap >= PRIME_GAP_THRESHOLD) {
    return { tier: "Prime", gap };
  }
  return { tier: "Core", gap };
}
