/** 0-based slots: World Cup moments always appear as Q10 and Q20. */
const WORLD_CUP_FIXED_SLOTS = [
  { index: 9, momentNumber: 1 },
  { index: 19, momentNumber: 2 },
];

function fisherYatesShuffle(items) {
  const shuffled = [...items];
  for (let i = shuffled.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
  }
  return shuffled;
}

/**
 * Shuffle quiz questions while pinning World Cup special moments to Q10 and Q20.
 */
export function orderQuizQuestions(questions) {
  const fixedByMoment = new Map();
  const regular = [];

  for (const q of questions) {
    if (q.specialMoment === "worldCup2026" && q.momentNumber != null) {
      fixedByMoment.set(q.momentNumber, q);
    } else {
      regular.push(q);
    }
  }

  const shuffledRegular = fisherYatesShuffle(regular);
  const result = new Array(questions.length);

  let regularIndex = 0;
  for (let i = 0; i < result.length; i += 1) {
    const slot = WORLD_CUP_FIXED_SLOTS.find((s) => s.index === i);
    if (slot) {
      result[i] =
        fixedByMoment.get(slot.momentNumber) ??
        shuffledRegular[regularIndex++];
    } else {
      result[i] = shuffledRegular[regularIndex++];
    }
  }

  return result;
}
