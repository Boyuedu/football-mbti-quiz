import { ARCHETYPES, RESULT_DEFINITIONS } from "./results";

const BASE_CODES = Object.keys(ARCHETYPES);
const MANUAL_ARCHETYPE_REPORTS = {
  "FDNA-01": {
    baseNameEn: "The Defensive Commander",
    baseNameZh: "防线指挥官",
    coreIdentity: {
      en: "You are the on-field commander who controls structure and tempo.",
      zh: "你是掌控比赛节奏与结构的场上指挥官，通过组织与调度维持球队整体稳定。",
    },
    strengths: {
      en: ["Exceptional positional awareness to maintain team structure at all times", "Calm and reliable decision-making under pressure", "Natural leadership that organizes teammates and controls game flow",],
      zh: ["位置感极强，始终维持球队整体结构", "在压力下依然保持冷静与稳定决策", "具备领导能力，能够指挥并组织全队运转"],
    },
    risks: {
      en: ["Limited individual flair and explosive creativity", "Can become predictable when facing aggressive pressing"],
      zh: ["个人创造力与爆发力相对有限", "在高压逼抢下容易被针对与限制"],
    },
    tacticalFit: {
      en: "Structured build-up, controlled tempo systems",
      zh: "结构化控球、节奏掌控体系",
    },
    optimalSystem: {
      en: "Positional Play / Possession-based",
      zh: "位置足球 / 控球体系",
    },
    bestRole: {
      en: "Deep-lying playmaker / On-field organizer",
      zh: "拖后组织核心 / 队长型中场",
    },
    unsuitableScenarios: {
      en: "Chaotic transitions, fast counter systems",
      zh: "高速反击、无结构比赛",
    },
    legacy: {
      playerEn: "Xavi Hernandez",
      playerZh: "哈维（Xavi Hernandez）",
      reasonEn:
        "Elite control of tempo and structure, defining midfield leadership.",
      reasonZh: "以节奏掌控与体系组织能力著称的中场指挥官。",
    },
  },
  "FDNA-02": {
    baseNameEn: "The Offensive Brain",
    baseNameZh: "进攻大脑",
    coreIdentity: {
      en: "You design attacking patterns and unlock defenses.",
      zh: "你是构建进攻逻辑的战术设计者，通过创造性思维构建进攻逻辑并撕开防线。",
    },
    strengths: {
      en: ["Elite vision that identifies passing lanes others cannot see", "High-level creativity in designing attacking opportunities", "Wide passing range enabling both short combinations and long switches"],
      zh: ["具备顶级视野，能够发现隐蔽传球路线", "进攻创造力强，能设计复杂进攻方式", "传球能力全面，可完成短传配合与长距离调度"],
    },
    risks: {
      en: ["Low defensive intensity"],
      zh: ["防守参与较弱"],
    },
    tacticalFit: {
      en: "Creative attacking systems",
      zh: "进攻创造型体系",
    },
    optimalSystem: {
      en: "Advanced playmaker system",
      zh: "前腰核心体系",
    },
    bestRole: {
      en: "Free 8 / Advanced creator",
      zh: "自由前腰 / 进攻组织者",
    },
    unsuitableScenarios: {
      en: "Defensive low block teams",
      zh: "防守优先体系",
    },
    legacy: {
      playerEn: "Kevin De Bruyne",
      playerZh: "凯文·德布劳内（Kevin De Bruyne）",
      reasonEn:
        "Exceptional vision and attacking orchestration in advanced areas.",
      reasonZh: "以顶级视野与进攻组织能力驱动球队进攻。",
    },
  },
  "FDNA-03": {
    baseNameEn: "The Deep Organizer",
    baseNameZh: "后场组织者",
    coreIdentity: {
      en: "You synchronize team structure and rhythm.",
      zh: "你是维持体系运转的核心枢纽。",
    },
    strengths: {
      en: ["Exceptional positional discipline within team structure", "Consistency in performance regardless of match conditions"],
      zh: ["站位纪律性极强，始终符合战术要求", "表现稳定，很少出现波动"],
    },
    risks: {
      en: ["Lack of standout or game-changing moments"],
      zh: ["缺乏爆发性或决定比赛的能力"],
    },
    tacticalFit: {
      en: "System-heavy teams",
      zh: "体系化强队",
    },
    optimalSystem: {
      en: "Positional / Control systems",
      zh: "控制型体系 / 位置足球",
    },
    bestRole: {
      en: "Metronome midfielder / Central Back",
      zh: "节拍器中场 / 拖后型中卫",
    },
    unsuitableScenarios: {
      en: "Individual-driven teams",
      zh: "过度依赖个人发挥的球队",
    },
    legacy: {
      playerEn: "Sergio Busquets / Franz Beckenbauer",
      playerZh: "塞尔吉奥·布斯克茨（Sergio Busquets）/ 贝肯鲍尔 (Franz Beckenbauer)",
      reasonEn: "Master of positional discipline and system control.",
      reasonZh: "以站位与体系理解支撑球队运转的核心。",
    },
  },
  "FDNA-04": {
    baseNameEn: "The Wing Threat",
    baseNameZh: "边路爆点",
    coreIdentity: {
      en: "You break systems with calculated unpredictability.",
      zh: "你用理性方式打破规则。",
    },
    strengths: {
      en: ["Unpredictability combined with high football intelligence", "Ability to exploit defensive gaps with precision"],
      zh: ["不可预测性与高球商结合", "能够精准利用防守漏洞完成突破"],
    },
    risks: {
      en: ["Risk-taking errors"],
      zh: ["因高风险决策可能带来失误"],
    },
    tacticalFit: {
      en: "Flexible attacking systems that allow individual interpretation",
      zh: "允许个人自由发挥的灵活进攻体系",
    },
    optimalSystem: {
      en: "Hybrid / fluid systems",
      zh: "自由流动体系",
    },
    bestRole: {
      en: "Inverted playmaker",
      zh: "内切组织者",
    },
    unsuitableScenarios: {
      en: "Rigid systems with strict positional rules",
      zh: "高度纪律与固定站位体系",
    },
    legacy: {
      playerEn: "Leo Messi",
      playerZh: "里奥·梅西（Leo Messi）",
      reasonEn: "Master of controlled unpredictability and game-breaking intelligence.",
      reasonZh: "以理性与创造结合打破比赛平衡。",
    },
  },
  "FDNA-05": {
    baseNameEn: "The Inspired Attacker",
    baseNameZh: "灵感攻击手",
    coreIdentity: {
      en: "You ignite brilliance through individual creativity and expressive play.",
      zh: "你通过个人天赋与创造力点燃比赛。",
    },
    strengths: {
      en: ["Explosive flair and creativity in attacking moments", "Ability to create highlights and momentum shifts"],
      zh: ["具备爆发性创造力与表现力", "能够通过个人能力改变比赛节奏"],
    },
    risks: {
      en: ["Inconsistency", "Injury"],
      zh: ["稳定性较差", "频繁伤病"],
    },
    tacticalFit: {
      en: "Freedom-based attacking systems",
      zh: "自由进攻体系",
    },
    optimalSystem: {
      en: "Fluid attacking systems",
      zh: "自由流动进攻",
    },
    bestRole: {
      en: "Attacking midfielder / Winger",
      zh: "前腰 / 边锋",
    },
    unsuitableScenarios: {
      en: "Highly structured systems",
      zh: "强结构约束体系",
    },
    legacy: {
      playerEn: "Neymar Jr",
      playerZh: "内马尔（Neymar Jr）",
      reasonEn: "Explosive flair and creativity define his game.",
      reasonZh: "以天赋与个人创造力改变比赛节奏。",
    },
  },
  "FDNA-06": {
    baseNameEn: "The Team Anchor",
    baseNameZh: "球队后盾",
    coreIdentity: {
      en: "You are the foundation of defensive stability, maintaining structure, discipline, and balance at the back.",
      zh: "你是防线稳定性的核心，通过纪律性与站位维持球队防守结构。",
    },
    strengths: {
      en: [ "Strong defensive positioning and structural awareness", "High discipline in maintaining defensive shape",  "Reliable tackling, interception, and coverage ability", "Consistent performance with minimal errors"],
      zh: ["防守站位出色，结构意识强", "纪律性高，始终保持防线稳定", "具备稳定的抢断与拦截能力", "发挥稳定，失误率低"],
    },
    risks: {
      en: ["Limited creativity"],
      zh: ["创造力有限"],
    },
    tacticalFit: {
      en: "Balanced or defensive systems that rely on strong structural organization and defensive discipline",
      zh: "强调防守结构与纪律性的平衡或防守体系",
    },
    optimalSystem: {
      en: "Back-four or back-three defensive systems",
      zh: "四后卫或三中卫体系",
    },
    bestRole: {
      en: "Box-to-box midfielder or central back",
      zh: "全能中场/全能型中后卫",
    },
    unsuitableScenarios: {
      en: "High-risk build-up systems requiring aggressive ball-playing center-backs",
      zh: "需要高出球能力的激进控球体系",
    },
    legacy: {
      playerEn: "Paolo Maldini",
      playerZh: "保罗·马尔蒂尼（Paolo Maldini）",
      reasonEn: "Relentless work rate and discipline anchor the team.",
      reasonZh: "以纪律性、站位与稳定性著称的防线核心。",
    },
  },
  "FDNA-07": {
    baseNameEn: "The Clutch Captain",
    baseNameZh: "关键队长",
    coreIdentity: {
      en: "You dominate key moments under pressure.",
      zh: "你在关键时刻决定比赛。",
    },
    strengths: {
      en: ["Clutch performance in high-pressure situations"],
      zh: ["关键时刻表现能力极强"],
    },
    risks: {
      en: ["Inconsistent impact in lower-intensity matches"],
      zh: ["在普通比赛中稳定性较低"],
    },
    tacticalFit: {
      en: "High-stakes matches and competitive environments",
      zh: "高强度关键比赛",
    },
    optimalSystem: {
      en: "Direct attacking systems",
      zh: "直接进攻体系",
    },
    bestRole: {
      en: "Match-winning forward",
      zh: "中锋",
    },
    unsuitableScenarios: {
      en: "Low-tempo, low-intensity matches",
      zh: "节奏缓慢的比赛",
    },
    legacy: {
      playerEn: "Kylian Mbappe",
      playerZh: "基利安·姆巴佩（Kylian Mbappe）",
      reasonEn: "Defines winning mentality and decisive impact.",
      reasonZh: "以胜负心与关键能力著称。",
    },
  },
  "FDNA-08": {
    baseNameEn: "The Linking Core",
    baseNameZh: "串联核心",
    coreIdentity: {
      en: "You seamlessly connect different phases of play, ensuring fluid team transitions.",
      zh: "你负责连接球队各个环节，让比赛流畅运转。",
    },
    strengths: {
      en: ["Excellent link-up play between defense, midfield, and attack", "Strong teamwork and positional adaptability"],
      zh: ["具备出色的串联能力，连接各条线", "团队配合意识强，适应能力高"],
    },
    risks: {
      en: ["Not dominant individually"],
      zh: ["个人存在感较弱"],
    },
    tacticalFit: {
      en: "Possession-based systems emphasizing combination play",
      zh: "强调配合与控球的体系",
    },
    optimalSystem: {
      en: "Tiki-taka",
      zh: "传控体系",
    },
    bestRole: {
      en: "Linking midfielder",
      zh: "串联中场",
    },
    unsuitableScenarios: {
      en: "Isolation play",
      zh: "单打独斗体系",
    },
    legacy: {
      playerEn: "Luka Modric",
      playerZh: "卢卡·莫德里奇（Luka Modric）",
      reasonEn:
        "Elite connection play and transitional linking across midfield phases.",
      reasonZh: "以中场各阶段的衔接与串联能力著称。",
    },
  },
  "FDNA-09": {
    baseNameEn: "The Dribbling Magician",
    baseNameZh: "盘带魔术师",
    coreIdentity: {
      en: "You express football through flair, invention, and improvisation.",
      zh: "你通过风格、想象力与即兴表达足球。",
    },
    strengths: {
      en: ["Elite dribbling flair and expressive technique", "Unpredictable creativity"],
      zh: ["盘带能力强，风格鲜明", "创造性不可预测"],
    },
    risks: {
      en: ["Low tactical discipline"],
      zh: ["战术纪律性偏弱"],
    },
    tacticalFit: {
      en: "Free attacking environments",
      zh: "自由型进攻环境",
    },
    optimalSystem: {
      en: "Fluid / expressive attacking systems",
      zh: "自由流动型进攻体系",
    },
    bestRole: {
      en: "Dribbling winger / Free creator",
      zh: "突破型边锋 / 自由创造者",
    },
    unsuitableScenarios: {
      en: "Strict structured systems",
      zh: "高度结构化体系",
    },
    legacy: {
      playerEn: "Ronaldinho",
      playerZh: "罗纳尔迪尼奥（Ronaldinho）",
      reasonEn:
        "A symbol of improvisation, joy, and technical imagination in football.",
      reasonZh: "以即兴、技术想象力与表演性重塑比赛。",
    },
  },
  "FDNA-10": {
    baseNameEn: "The Tempo Master",
    baseNameZh: "节奏大师",
    coreIdentity: {
      en: "You control the speed and rhythm of the game.",
      zh: "你掌控比赛节奏的变化。",
    },
    strengths: {
      en: ["Rhythm control"],
      zh: ["节奏掌控强"],
    },
    risks: {
      en: ["Low explosiveness"],
      zh: ["爆发力不足"],
    },
    tacticalFit: {
      en: "Tempo-based systems",
      zh: "节奏控制体系",
    },
    optimalSystem: {
      en: "Midfield control system",
      zh: "中场控制体系",
    },
    bestRole: {
      en: "Tempo controller",
      zh: "节奏型中场",
    },
    unsuitableScenarios: {
      en: "High-speed chaos games",
      zh: "高速混乱比赛",
    },
    legacy: {
      playerEn: "Andrea Pirlo",
      playerZh: "安德烈亚·皮尔洛（Andrea Pirlo）",
      reasonEn:
        "A master of controlling rhythm and dictating the pace of play.",
      reasonZh: "以掌控节奏与调度比赛速度著称。",
    },
  },
};

function pickCoreResult(baseCode) {
  return (
    RESULT_DEFINITIONS.find((entry) => entry.resultCode === `${baseCode}-02`) ??
    RESULT_DEFINITIONS.find((entry) => entry.resultCode.startsWith(`${baseCode}-`)) ??
    null
  );
}

function buildReport(baseCode) {
  const archetype = ARCHETYPES[baseCode];
  const coreResult = pickCoreResult(baseCode);
  const manual = MANUAL_ARCHETYPE_REPORTS[baseCode];

  return {
    baseNameEn: archetype?.baseNameEn ?? "",
    baseNameZh: archetype?.baseNameZh ?? "",
    coreIdentity: {
      en: manual?.coreIdentity?.en ?? "",
      zh: manual?.coreIdentity?.zh ?? "",
    },
    strengthsAndRisks: {
      en: coreResult?.en?.shortSummary ?? "",
      zh: coreResult?.zh?.shortSummary ?? "",
    },
    tacticalFit: {
      en: manual?.tacticalFit?.en ?? coreResult?.en?.archetypeTitle ?? "",
      zh: manual?.tacticalFit?.zh ?? coreResult?.zh?.archetypeTitle ?? "",
    },
    optimalSystem: {
      en: manual?.optimalSystem?.en ?? "",
      zh: manual?.optimalSystem?.zh ?? "",
    },
    bestRole: {
      en: manual?.bestRole?.en ?? coreResult?.en?.idealRoleOnPitch ?? "",
      zh: manual?.bestRole?.zh ?? coreResult?.zh?.idealRoleOnPitch ?? "",
    },
    unsuitableScenarios: {
      en: manual?.unsuitableScenarios?.en ?? "",
      zh: manual?.unsuitableScenarios?.zh ?? "",
    },
    legacyStatement: {
      en: manual?.legacy?.reasonEn ?? "",
      zh: manual?.legacy?.reasonZh ?? "",
    },
    legacy: {
      playerEn: manual?.legacy?.playerEn ?? "",
      playerZh: manual?.legacy?.playerZh ?? "",
      reasonEn: manual?.legacy?.reasonEn ?? "",
      reasonZh: manual?.legacy?.reasonZh ?? "",
    },
  };
}

function mergeReport(baseReport, overrideReport) {
  if (!overrideReport) return baseReport;
  return {
    ...baseReport,
    ...overrideReport,
    coreIdentity: { ...baseReport.coreIdentity, ...overrideReport.coreIdentity },
    tacticalFit: { ...baseReport.tacticalFit, ...overrideReport.tacticalFit },
    optimalSystem: { ...baseReport.optimalSystem, ...overrideReport.optimalSystem },
    bestRole: { ...baseReport.bestRole, ...overrideReport.bestRole },
    unsuitableScenarios: {
      ...baseReport.unsuitableScenarios,
      ...overrideReport.unsuitableScenarios,
    },
    legacyStatement: {
      ...baseReport.legacyStatement,
      ...overrideReport.legacyStatement,
    },
    legacy: { ...baseReport.legacy, ...overrideReport.legacy },
    strengths: overrideReport.strengths ?? baseReport.strengths ?? undefined,
    risks: overrideReport.risks ?? baseReport.risks ?? undefined,
  };
}

export const archetypeReports = Object.fromEntries(
  BASE_CODES.map((baseCode) => [
    baseCode,
    mergeReport(buildReport(baseCode), MANUAL_ARCHETYPE_REPORTS[baseCode]),
  ])
);

export function deriveBaseCodeFromResultCode(resultCode) {
  if (typeof resultCode !== "string") return null;
  const matched = resultCode.match(/FDNA-\d{2}/);
  return matched?.[0] ?? null;
}

export function getArchetypeReport(baseCode, resultCode) {
  const key = baseCode || deriveBaseCodeFromResultCode(resultCode);
  if (!key) return null;
  return archetypeReports[key] ?? null;
}
