const PAIR_META = {
  IQ_LEAD: {
    en: {
      family: "Tactical Command",
      role: "Deep-Lying Playmaker Captain",
    },
    zh: {
      family: "战术统帅",
      role: "拖后组织核心 / 队长型中场",
    },
  },
  IQ_CREA: {
    en: {
      family: "Visionary Design",
      role: "Free 8 / Advanced Creator",
    },
    zh: {
      family: "视野型设计",
      role: "自由人 8 号位 / 进攻组织核心",
    },
  },
  IQ_TEAM: {
    en: {
      family: "System Engine",
      role: "Metronome Midfielder",
    },
    zh: {
      family: "体系引擎",
      role: "节拍器型中场",
    },
  },
  IQ_FLAIR: {
    en: {
      family: "Calculated Showman",
      role: "Inverted Playmaker",
    },
    zh: {
      family: "理性表演者",
      role: "内收型组织边锋",
    },
  },
  LEAD_CREA: {
    en: {
      family: "Inspirational Artist",
      role: "Attacking Captain",
    },
    zh: {
      family: "灵感领袖",
      role: "进攻型队长 / 前场核心",
    },
  },
  LEAD_TEAM: {
    en: {
      family: "Collective General",
      role: "Box-to-Box Commander",
    },
    zh: {
      family: "集体指挥官",
      role: "全能中场指挥官",
    },
  },
  LEAD_FLAIR: {
    en: {
      family: "Star Authority",
      role: "Match-Winning Forward",
    },
    zh: {
      family: "球星气场",
      role: "决定比赛的前锋 / 边锋",
    },
  },
  CREA_TEAM: {
    en: {
      family: "Collaborative Architect",
      role: "Chance-Creating Midfielder",
    },
    zh: {
      family: "协作建筑师",
      role: "机会创造型中场",
    },
  },
  CREA_FLAIR: {
    en: {
      family: "Chaos Inventor",
      role: "Street-Tech Trequartista",
    },
    zh: {
      family: "混乱发明家",
      role: "街头感前腰 / 影子前锋",
    },
  },
  TEAM_FLAIR: {
    en: {
      family: "Rhythm Connector",
      role: "Dynamic Wide Playmaker",
    },
    zh: {
      family: "节奏连接者",
      role: "动态边路组织点",
    },
  },
};

const DIM_SHORT_EN = {
  IQ: "Football IQ",
  LEAD: "Leadership",
  CREA: "Creativity",
  TEAM: "Teamwork",
  FLAIR: "Flair",
};

const DIM_SHORT_ZH = {
  IQ: "球商",
  LEAD: "领导力",
  CREA: "创造力",
  TEAM: "团队配合",
  FLAIR: "个人风采",
};

const TIER_COPY = {
  Prime: {
    en: {
      label: "Signature",
      summaryAdj: "high-contrast, signature-leaning",
      interpretation:
        "Your profile shows a sharp separation between your top strengths—matches often bend around your clearest traits.",
    },
    zh: {
      label: "鲜明型",
      summaryAdj: "对比鲜明、辨识度极高",
      interpretation:
        "你的维度分布落差清晰，比赛往往会被你最突出的特质所牵引，风格辨识度很高。",
    },
  },
  Core: {
    en: {
      label: "Balanced",
      summaryAdj: "balanced and reliable",
      interpretation:
        "You blend identity with adaptability—strong tendencies without becoming one-note.",
    },
    zh: {
      label: "均衡型",
      summaryAdj: "均衡稳定、强项明确",
      interpretation:
        "你在稳定倾向与临场应变之间取得平衡，强项明确但不单一。",
    },
  },
  Hybrid: {
    en: {
      label: "Hybrid",
      summaryAdj: "adaptive multi-tool",
      interpretation:
        "You carry multiple football identities at once—dangerous because you can shift roles within a match.",
    },
    zh: {
      label: "融合型",
      summaryAdj: "多面手、适应性强",
      interpretation:
        "你同时具备多种足球人格侧面，比赛中能根据局势切换角色，让对手更难针对。",
    },
  },
};

const COMBOS = [
  {
    pairKey: "IQ_LEAD",
    baseCode: "FDNA-01",
    mbtiCode: "TCSR",
    en: { baseName: "The Defensive Commander" },
    zh: { baseName: "防线指挥官" },
  },
  {
    pairKey: "IQ_CREA",
    baseCode: "FDNA-02",
    mbtiCode: "TIDR",
    en: { baseName: "The Offensive Brain" },
    zh: { baseName: "进攻大脑" },
  },
  {
    pairKey: "IQ_TEAM",
    baseCode: "FDNA-03",
    mbtiCode: "TCSR",
    en: { baseName: "The Deep Organizer" },
    zh: { baseName: "后场组织者" },
  },
  {
    pairKey: "IQ_FLAIR",
    baseCode: "FDNA-04",
    mbtiCode: "TIDR",
    en: { baseName: "The Wing Threat" },
    zh: { baseName: "边路爆点" },
  },
  {
    pairKey: "LEAD_CREA",
    baseCode: "FDNA-05",
    mbtiCode: "ECDX",
    en: { baseName: "The Inspired Attacker" },
    zh: { baseName: "灵感攻击手" },
  },
  {
    pairKey: "LEAD_TEAM",
    baseCode: "FDNA-06",
    mbtiCode: "TCSR",
    en: { baseName: "The Team Anchor" },
    zh: { baseName: "球队后盾" },
  },
  {
    pairKey: "LEAD_FLAIR",
    baseCode: "FDNA-07",
    mbtiCode: "ECDX",
    en: { baseName: "The Clutch Captain" },
    zh: { baseName: "关键队长" },
  },
  {
    pairKey: "CREA_TEAM",
    baseCode: "FDNA-08",
    mbtiCode: "ECDR",
    en: { baseName: "The Linking Core" },
    zh: { baseName: "串联核心" },
  },
  {
    pairKey: "CREA_FLAIR",
    baseCode: "FDNA-09",
    mbtiCode: "EIDX",
    en: { baseName: "The Dribbling Magician" },
    zh: { baseName: "盘带魔术师" },
  },
  {
    pairKey: "TEAM_FLAIR",
    baseCode: "FDNA-10",
    mbtiCode: "TCDR",
    en: { baseName: "The Tempo Master" },
    zh: { baseName: "节奏大师" },
  },
];

/** Base archetype labels by FDNA code (vector layer; same base names as COMBOS). */
export const ARCHETYPES = Object.fromEntries(
  COMBOS.map((c) => [
    c.baseCode,
    { baseNameEn: c.en.baseName, baseNameZh: c.zh.baseName },
  ])
);

export function getArchetypeComboByBaseCode(baseCode) {
  return COMBOS.find((c) => c.baseCode === baseCode) ?? null;
}

const TIERS = ["Prime", "Core", "Hybrid"];

function buildResult(pairKey, tierKey, baseCode, baseNameEn, baseNameZh, mbtiCode) {
  const [d1, d2] = pairKey.split("_");
  const theme = PAIR_META[pairKey];
  const tierEn = TIER_COPY[tierKey].en;
  const tierZh = TIER_COPY[tierKey].zh;
  const idx = TIERS.indexOf(tierKey);
  const numeric = String(idx + 1).padStart(2, "0");

  return {
    key: `${pairKey}_${tierKey}`,
    resultCode: `${baseCode}-${numeric}`,
    mbtiCode,
    tags: [d1, d2, tierKey, "FootballDNA"],
    en: {
      resultName: `${baseNameEn} ${tierEn.label}`,
      archetypeTitle: `${theme.en.family} / ${tierEn.label}`,
      shortSummary: `A ${tierEn.summaryAdj} profile led by ${DIM_SHORT_EN[d1]} + ${DIM_SHORT_EN[d2]}—built for modern football identity mapping.`,
      footballInterpretation: tierEn.interpretation,
      idealRoleOnPitch: theme.en.role,
    },
    zh: {
      resultName: `${baseNameZh} · ${tierZh.label}`,
      archetypeTitle: `${theme.zh.family} / ${tierZh.label}`,
      shortSummary: `整体为${tierZh.summaryAdj}的足球人格，在「${DIM_SHORT_ZH[d1]}」与「${DIM_SHORT_ZH[d2]}」上最为突出。`,
      footballInterpretation: tierZh.interpretation,
      idealRoleOnPitch: theme.zh.role,
    },
  };
}

export { COMBOS };

export const RESULT_DEFINITIONS = COMBOS.flatMap((combo) =>
  TIERS.map((tierKey) =>
    buildResult(
      combo.pairKey,
      tierKey,
      combo.baseCode,
      combo.en.baseName,
      combo.zh.baseName,
      combo.mbtiCode
    )
  )
);
