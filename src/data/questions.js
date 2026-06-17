/** Dimensions that define FDNA archetype pairs (lookup in results / life paths). */
export const ARCHETYPE_DIMENSION_KEYS = ["IQ", "LEAD", "CREA", "TEAM", "FLAIR"];

/** Keys used for scoring (includes supplemental dimensions such as EC, COUR). */
export const DIMENSION_KEYS = [...ARCHETYPE_DIMENSION_KEYS, "EC", "COUR"];

/** @deprecated Use UI_STRINGS[lang].dimensions — kept for quick reference in data editors */
export const DIMENSIONS = {
  IQ: "Football IQ",
  LEAD: "Leadership",
  CREA: "Creativity",
  TEAM: "Teamwork",
  FLAIR: "Flair",
  EC: "Emotional Control",
  COUR: "Courage",
};

export const QUESTIONS = [
  {
    id: 1,
    title: {
      en: "Fast break: How do you handle the last defender?",
      zh: "快速反击：你如何处理最后一名防守球员？",
    },
    scenario: {
      en: "62nd minute, score 1-1. Your team just won the ball and you're driving through the middle at pace. A teammate is supporting on the right. Only two defenders remain, and one is closing in on you.",
      zh: "比赛第 62 分钟，比分 1:1。你的球队刚刚完成抢断，你带球从中路高速推进。右侧有一名队友跟进，对方只剩两名后卫，其中一人开始向你靠近。",
    },
    question: {
      en: "What are you most likely to do?",
      zh: "你最可能怎么处理？",
    },
    choices: [
      {
        text: {
          en: "Carry to draw him, then pass right.",
          zh: "带球吸引后再传右侧。",
        },
        scores: { TEAM: 2, IQ: 1 },
      },
      {
        text: {
          en: "Slow down, read the defence, then decide.",
          zh: "减速观察后再决定。",
        },
        scores: { IQ: 3 },
      },
      {
        text: {
          en: "Burst or cut past the defender.",
          zh: "变向或加速突破。",
        },
        scores: { COUR: 2, FLAIR: 1 },
      },
      {
        text: {
          en: "Early disguised pass for a one-on-one.",
          zh: "早送斜传，队友单刀。",
        },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 2,
    title: {
      en: "Back to goal: Centre-back on your shoulder",
      zh: "背身接球：中后卫已经贴在身后",
    },
    scenario: {
      en: "You receive with your back to goal near the edge of the box. Their centre-back is tight on you, a teammate can offer on the right, and there's limited space in the box.",
      zh: "你在禁区弧顶附近背身接球。对方中后卫紧贴着你，右侧队友可以接应，禁区内还有少量空间。",
    },
    question: {
      en: "What's your first reaction?",
      zh: "你的第一反应是什么？",
    },
    choices: [
      {
        text: { en: "Lay-off, then spin in for the return.", zh: "一脚回做，再转身前插。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Check shoulder, turn out the other way.", zh: "看肩后空间，转身摆脱。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Shield the ball and bully through.", zh: "护球强突摆脱。" },
        scores: { FLAIR: 3 },
      },
      {
        text: { en: "Fake a lay-off, then trick turn.", zh: "假做回传，花式转身。" },
        scores: { CREA: 2, EC: 1 },
      },
    ],
  },
  {
    id: 3,
    title: {
      en: "Wide 1v1: Teammate overlapping",
      zh: "边路单挑：队友正在套边",
    },
    scenario: {
      en: "You receive on the left with only the full-back ahead. A teammate is overlapping outside, but you also have room to cut inside.",
      zh: "你在左侧接球，面前只有一名边后卫。队友已经开始从外侧套边，但你也有空间内切。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "Play the overlap, run into the box.", zh: "传给套边，再插进禁区。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Attack the side he can't turn to.", zh: "攻他难转身的一侧。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Feints and pace — beat him yourself.", zh: "假动作，亲自过人。" },
        scores: { LEAD: 2, EC: 1 },
      },
      {
        text: { en: "Fake wide, then cut in or cut back.", zh: "假传边路，内切或倒三角。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 4,
    title: {
      en: "Missed clear chance: The match isn't over",
      zh: "错失单刀：比赛还没有结束",
    },
    scenario: {
      en: "On 35 minutes you miss a clear one-on-one. The crowd sighs and the opposing keeper starts getting in your face.",
      zh: "你在第 35 分钟错失了一次非常好的单刀机会。场边观众发出明显叹息，对方门将开始向你挑衅。",
    },
    question: {
      en: "What are you more likely to do next?",
      zh: "接下来你更可能怎么做？",
    },
    choices: [
      {
        text: { en: "Reset and keep pressing as before.", zh: "立刻回比赛，继续逼抢。" },
        scores: { EC: 3 },
      },
      {
        text: { en: "Replay the miss, adjust next time.", zh: "复盘失误，下次调整。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Keep asking for the ball to score again.", zh: "继续要球，想再进一个。" },
        scores: { COUR: 2, EC: 1 },
      },
      {
        text: { en: "Rally teammates, press right away.", zh: "提醒队友，立刻前场逼抢。" },
        scores: { LEAD: 1, TEAM: 2 },
      },
    ],
  },
  {
    id: 5,
    specialMoment: "worldCup2026",
    momentNumber: 1,
    title: {
      en: "World Cup Final · Last three minutes of extra time",
      zh: "世界杯决赛 · 加时赛最后三分钟",
    },
    scenario: {
      en: "117th minute of the World Cup final, still 1-1. Your team break quickly. You take the ball at the edge of the box with only one defender ahead. A teammate is sprinting in on the right, but the passing lane could be shut at any moment. The whole stadium is waiting for your call.",
      zh: "世界杯决赛第 117 分钟，比分仍然是 1:1。你的球队完成一次快速反击。你在禁区前沿拿球，面前只剩一名后卫。右侧队友正在高速插上，但传球线路可能随时被封堵。全场观众都在等待你的决定。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么处理？",
    },
    choices: [
      {
        text: { en: "Draw the defender, pass when he commits.", zh: "带球吸引，上抢后再传。" },
        scores: { TEAM: 2, IQ: 1 },
      },
      {
        text: { en: "Read everyone, pick the best option.", zh: "观察全局，选成功率最高。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Take him on and shoot to win it.", zh: "突破射门，亲自终结。" },
        scores: { FLAIR: 3 },
      },
      {
        text: { en: "Fake the shot, then surprise pass.", zh: "假射，再妙传。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 6,
    title: {
      en: "Off-the-ball runs: You might never get the ball",
      zh: "无球跑动：你可能根本接不到球",
    },
    scenario: {
      en: "A teammate drives forward on the right; you're at the edge of the box. A marker has you in midfield and a far-side teammate is hunting space.",
      zh: "队友从右路带球推进，你在禁区前沿。中路已经有防守球员盯着你，远端队友正在寻找空间。",
    },
    question: {
      en: "How do you most likely move?",
      zh: "你最可能如何跑位？",
    },
    choices: [
      {
        text: { en: "Near-post run to free runners.", zh: "冲前点，带走中卫。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Split the gap between centre-backs.", zh: "插两中卫之间。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Spin in behind for a shot.", zh: "直插身后要射门。" },
        scores: { LEAD: 2, EC: 1 },
      },
      {
        text: { en: "Near post, then drop for cut-back.", zh: "前点后撤，等倒三角。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 7,
    title: {
      en: "High press: Goalkeeper on the ball",
      zh: "前场逼抢：门将正在出球",
    },
    scenario: {
      en: "Their keeper has it in the build-up; both centre-backs are wide. Your team is setting a high press.",
      zh: "对方门将在后场控球，两名中后卫拉开站位。你的球队准备进行高位逼抢。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "Curve run to block the pass lane.", zh: "弧线跑动，封传球路。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Call for a coordinated press.", zh: "喊队友一起逼抢。" },
        scores: { LEAD: 2, TEAM: 1 },
      },
      {
        text: { en: "Sprint at the keeper.", zh: "直冲门将。" },
        scores: { FLAIR: 2, EC: 1 },
      },
      {
        text: { en: "Wait, then press the weaker CB.", zh: "等球到弱侧后卫再扑。" },
        scores: { CREA: 2, IQ: 1 },
      },
    ],
  },
  {
    id: 8,
    title: {
      en: "Final five minutes: You need a goal",
      zh: "最后五分钟：球队需要一个进球",
    },
    scenario: {
      en: "85th minute, 0-1 down. They sit deep and the box is packed.",
      zh: "比赛第 85 分钟，你的球队 0:1 落后。对手已经收缩防守，禁区内非常拥挤。",
    },
    question: {
      en: "What are you more likely to do?",
      zh: "你更可能怎么做？",
    },
    choices: [
      {
        text: { en: "Patient short passes, wait for space.", zh: "耐心短传，等空档。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Blind-side run for one last chance.", zh: "盲区跑位，最后一击。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Seek 1v1s, cause chaos.", zh: "找一对一，制造混乱。" },
        scores: { FLAIR: 2, EC: 1 },
      },
      {
        text: { en: "Long shot, dummy, or backheel.", zh: "远射、漏球或脚后跟。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 9,
    title: {
      en: "One-on-one with the keeper",
      zh: "面对门将：单刀机会出现",
    },
    scenario: {
      en: "You're through. The keeper rushes out and a defender is chasing back. You have only a moment.",
      zh: "你获得单刀机会。门将快速出击，身后还有一名防守球员正在回追。你只有很短时间做出决定。",
    },
    question: {
      en: "What are you most likely to do?",
      zh: "你最可能怎么做？",
    },
    choices: [
      {
        text: { en: "Square it if teammate has an open goal.", zh: "队友空门就横传。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Read keeper, pick placed/chip/cut.", zh: "读门将，选推射/挑射/变向。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Instinct — finish quickly.", zh: "凭本能，快速射门。" },
        scores: { COUR: 2, FLAIR: 1 },
      },
      {
        text: { en: "Fake shot, then finish.", zh: "假射，再打进。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 10,
    title: {
      en: "Penalty shootout: Fifth kick to win",
      zh: "点球大战：第五轮主罚",
    },
    scenario: {
      en: "Knockout shootout. Score this fifth kick and you're through. The coach hasn't named the taker yet.",
      zh: "淘汰赛进入点球大战。第五轮只要罚进，球队就能晋级。教练还没有决定谁主罚。",
    },
    question: {
      en: "Which reaction is closer to you?",
      zh: "你更接近哪一种反应？",
    },
    choices: [
      {
        text: { en: "Take it if coach picks me.", zh: "教练安排就罚。" },
        scores: { EC: 2, TEAM: 1 },
      },
      {
        text: { en: "Who's in best form should take it.", zh: "谁状态好谁罚。" },
        scores: { IQ: 2, TEAM: 1 },
      },
      {
        text: { en: "Volunteer if I feel sharp.", zh: "状态好就主动请战。" },
        scores: { LEAD: 2, EC: 1 },
      },
      {
        text: { en: "More pressure, more I want it.", zh: "压力越大越想罚。" },
        scores: { COUR: 2, LEAD: 1 },
      },
    ],
  },
  {
    id: 11,
    title: {
      en: "Back to goal: Opponent pressing high",
      zh: "背身接球：对手正在高位逼抢",
    },
    scenario: {
      en: "Your centre-back plays it to you. You receive with your back to goal in midfield, an opponent is already closing in behind, and teammates on both sides can offer.",
      zh: "你的中后卫将球传给你。你在中场背身接球，身后已经有对手靠近，两侧队友都可以接应。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "One-touch back, move to new angle.", zh: "一脚回传，换角度接应。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Check shoulder, turn on momentum.", zh: "看肩后，顺势转身。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Shield, turn, drive out.", zh: "护球转身推进。" },
        scores: { FLAIR: 3 },
      },
      {
        text: { en: "Fake back pass, lay to other side.", zh: "假回传，漏给另一侧。" },
        scores: { CREA: 2, EC: 1 },
      },
    ],
  },
  {
    id: 12,
    title: {
      en: "Can't advance: Pressed for several minutes",
      zh: "球队无法推进：连续几分钟被压制",
    },
    scenario: {
      en: "Their midfield press is very tight and your team has failed several times in a row to move the ball into the final third.",
      zh: "对手的中场压迫非常紧密，你的球队连续几次无法将球推进到前场。",
    },
    question: {
      en: "What are you most likely to do?",
      zh: "你最可能怎么做？",
    },
    choices: [
      {
        text: { en: "Drop deep to help build out.", zh: "回撤帮后卫出球。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Switch to the open side.", zh: "转移到弱侧空档。" },
        scores: { IQ: 2, LEAD: 1 },
      },
      {
        text: { en: "Carry through the press line.", zh: "带球穿过逼抢线。" },
        scores: { COUR: 2, FLAIR: 1 },
      },
      {
        text: { en: "Swap positions to disrupt marks.", zh: "换位打乱盯人。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 13,
    title: {
      en: "The first second after losing the ball",
      zh: "丢球后的第一秒",
    },
    scenario: {
      en: "Your through-ball from midfield fails and they counter immediately. You're close to the ball carrier, but there's also a lot of space behind you.",
      zh: "你在中场尝试直塞失败，对手立刻发动反击。你离持球人很近，但身后也有大片空间。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "Press the ball carrier immediately.", zh: "立刻反抢持球人。" },
        scores: { TEAM: 2, COUR: 1 },
      },
      {
        text: { en: "Block their best forward pass.", zh: "封最危险的向前传球。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Organize who marks ball vs centre.", zh: "指挥盯人分工。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Anticipate and intercept early.", zh: "预判传球，提前拦截。" },
        scores: { CREA: 2, IQ: 1 },
      },
    ],
  },
  {
    id: 14,
    title: {
      en: "Deep block: Sideways passing isn't working",
      zh: "对手收缩防守：常规传球没有效果",
    },
    scenario: {
      en: "You have lots of possession but they've dropped everyone near the box. Continuous sideways passing isn't creating chances.",
      zh: "你的球队控球率很高，但对手全部退到禁区附近。连续横传已经无法创造机会。",
    },
    question: {
      en: "What are you more likely to do?",
      zh: "你更可能怎么做？",
    },
    choices: [
      {
        text: { en: "Keep shifting, wait for a gap.", zh: "耐心转移，等空档。" },
        scores: { IQ: 2, EC: 1 },
      },
      {
        text: { en: "Short combos to open space.", zh: "短传配合撕空间。" },
        scores: { TEAM: 2, LEAD: 1 },
      },
      {
        text: { en: "Carry in, force them to commit.", zh: "带球逼近，逼防线出来。" },
        scores: { FLAIR: 3 },
      },
      {
        text: { en: "Sudden through ball or switch.", zh: "突然直塞或长转移。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 15,
    title: {
      en: "Controlling tempo while ahead",
      zh: "领先后的节奏控制",
    },
    scenario: {
      en: "88th minute, 1-0 up. You have the ball in midfield and they're pushing everyone forward.",
      zh: "比赛第 88 分钟，你的球队 1:0 领先。你在中场拿球，对手开始大举压上。",
    },
    question: {
      en: "How do you handle it?",
      zh: "你会怎么处理？",
    },
    choices: [
      {
        text: { en: "Safe pass, run down the clock.", zh: "安全传球，耗时间。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Read space behind, then decide.", zh: "看身后空档再决定。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Drive forward for a second goal.", zh: "推进，找第二球。" },
        scores: { FLAIR: 3 },
      },
      {
        text: { en: "Fake back, ball in behind.", zh: "假回传，打身后。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 16,
    title: {
      en: "Tight marking: Hard to receive cleanly",
      zh: "被重点盯防：很难舒服接球",
    },
    scenario: {
      en: "They've assigned a defensive midfielder to mark you tightly. Every time you receive, you're immediately pressured.",
      zh: "对方安排一名防守型中场贴身限制你。你每次接球都会立刻受到干扰。",
    },
    question: {
      en: "How do you adjust?",
      zh: "你会如何调整？",
    },
    choices: [
      {
        text: { en: "Drag the marker for teammates.", zh: "跑动带走盯人，帮队友。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Change where I receive the ball.", zh: "换区域接球。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Physical duel, beat him 1v1.", zh: "身体对抗，正面突破。" },
        scores: { FLAIR: 3 },
      },
      {
        text: { en: "Swap often to lose the marker.", zh: "频繁换位脱盯。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 17,
    title: {
      en: "Teammate making consecutive mistakes",
      zh: "队友连续失误",
    },
    scenario: {
      en: "A teammate has lost the ball twice in similar spots and is clearly getting nervous. The match is still very tight.",
      zh: "你的队友连续两次在相似位置丢球，明显开始紧张。比赛仍然非常胶着。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "Move closer, give simple pass.", zh: "靠近，给简单传球。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Point out the fix for next time.", zh: "指出问题，教他调整。" },
        scores: { IQ: 2, LEAD: 1 },
      },
      {
        text: { en: "Reassure him, take the ball next.", zh: "安慰他，下次我来接。" },
        scores: { LEAD: 2, EC: 1 },
      },
      {
        text: { en: "Swap positions to reset rhythm.", zh: "换位帮球队恢复节奏。" },
        scores: { CREA: 2, TEAM: 1 },
      },
    ],
  },
  {
    id: 18,
    title: {
      en: "Fatigue setting in: Fifteen minutes left",
      zh: "体能下降：比赛还有十五分钟",
    },
    scenario: {
      en: "75th minute — you're clearly tired and the score is still close.",
      zh: "比赛第 75 分钟，你已经明显疲劳，双方比分仍然接近。",
    },
    question: {
      en: "What are you most likely to do?",
      zh: "你最可能怎么做？",
    },
    choices: [
      {
        text: { en: "Cut runs, stay in shape.", zh: "少无谓跑动，保持站位。" },
        scores: { IQ: 2, EC: 1 },
      },
      {
        text: { en: "Keep supporting and tracking back.", zh: "继续支援和回防。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Tell teammates to slow tempo.", zh: "喊队友降节奏。" },
        scores: { LEAD: 2, IQ: 1 },
      },
      {
        text: { en: "Save energy for one big moment.", zh: "留力等决胜瞬间。" },
        scores: { CREA: 1, FLAIR: 2 },
      },
    ],
  },
  {
    id: 19,
    title: {
      en: "Coach's plan vs on-field read",
      zh: "教练安排与临场判断发生冲突",
    },
    scenario: {
      en: "The coach wants fewer risky passes, but you can see more space opening behind their back line.",
      zh: "教练要求球队减少冒险传球。但你发现，对方防线身后的空档越来越明显。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "Stick to the coach's plan.", zh: "坚决执行教练安排。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Only play forward if odds are good.", zh: "成功率高才向前传。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Suggest a team adjustment.", zh: "建议全队调整战术。" },
        scores: { LEAD: 2, IQ: 1 },
      },
      {
        text: { en: "Trust my read, break the line.", zh: "信自己判断，打穿防线。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 20,
    specialMoment: "worldCup2026",
    momentNumber: 2,
    title: {
      en: "World Cup knockout · Holding the lead in stoppage time",
      zh: "世界杯淘汰赛 · 补时阶段守住领先",
    },
    scenario: {
      en: "93rd minute of a World Cup knockout tie, 1-0 up. They have one last attack. You're defending near the box as their winger prepares to cross. Two attackers are crossing runs in the area and your teammates are briefly losing their marks.",
      zh: "世界杯淘汰赛第 93 分钟，你的球队 1:0 领先。对手获得最后一次进攻机会。你在禁区附近防守，对方边锋已经准备传中。禁区内有两名进攻球员正在交叉跑位，你的队友开始出现短暂混乱。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么处理？",
    },
    choices: [
      {
        text: { en: "Hold my zone, ignore decoys.", zh: "守区域，不被假跑带走。" },
        scores: { EC: 2, TEAM: 1 },
      },
      {
        text: { en: "Read cross and runs, find danger.", zh: "预判传中落点。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Reset marks: near vs far post.", zh: "喊队友重确认人。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Step in early, kill the cross.", zh: "提前封堵，破坏传中。" },
        scores: { CREA: 1, IQ: 2 },
      },
    ],
  },
  {
    id: 21,
    title: {
      en: "2v2 counter: You're the last line",
      zh: "二打二反击：你是最后一道防线",
    },
    scenario: {
      en: "They've just won the ball for a 2v2 counter. The ball carrier is driving at pace and another attacker is making a run from the side. Your teammate is tracking back.",
      zh: "对方刚刚完成抢断，形成二打二反击。持球人高速推进，另一名进攻球员从侧面前插。你的队友正在回追。",
    },
    question: {
      en: "How do you handle it?",
      zh: "你会怎么处理？",
    },
    choices: [
      {
        text: { en: "Hold shape, delay for recovery.", zh: "保持站位，拖延回防。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Block pass lane, force wide.", zh: "封传球路，逼走边。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Teammate takes runner, I take ball.", zh: "队友盯无球，我限持球人。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Step in if touch is heavy.", zh: "触球大就上前抢。" },
        scores: { COUR: 3 },
      },
    ],
  },
  {
    id: 22,
    title: {
      en: "Building from the back: Striker pressing",
      zh: "后场出球：前锋正在逼抢",
    },
    scenario: {
      en: "You have the ball near your own box. Their striker is pressing quickly; the keeper and another centre-back can offer, and midfielders are trying to shake off markers.",
      zh: "你在本方禁区附近拿球。对方前锋快速逼抢，门将和另一名中后卫都可以接应，中场队友正在尝试摆脱盯防。",
    },
    question: {
      en: "What are you more likely to do?",
      zh: "你更可能怎么做？",
    },
    choices: [
      {
        text: { en: "Safe pass, rebuild attack.", zh: "安全传球，重新组织。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Break the first press line.", zh: "看破压迫，传出第一线。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Carry forward if space opens.", zh: "有空间就自己带球。" },
        scores: { FLAIR: 2, EC: 1 },
      },
      {
        text: { en: "Fake to keeper, pass behind press.", zh: "假传门将，打身后。" },
        scores: { CREA: 2, EC: 1 },
      },
    ],
  },
  {
    id: 23,
    title: {
      en: "1v1 defending on the wing",
      zh: "边路一对一防守",
    },
    scenario: {
      en: "Their winger has the ball wide with space behind you. He's fast and good at changing direction.",
      zh: "对方边锋在边路拿球，你身后有一定空间。他速度很快，也擅长变向。",
    },
    question: {
      en: "What's your first reaction?",
      zh: "你的第一反应是什么？",
    },
    choices: [
      {
        text: { en: "Hold off, wait for help.", zh: "保持距离，等协防。" },
        scores: { TEAM: 2, EC: 1 },
      },
      {
        text: { en: "Force him onto weak foot.", zh: "逼他走弱脚一侧。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Get tight, no easy acceleration.", zh: "贴身，不给起速。" },
        scores: { FLAIR: 2, EC: 1 },
      },
      {
        text: { en: "Bait him in, then close lane.", zh: "诱他启动，再封堵。" },
        scores: { CREA: 2, IQ: 1 },
      },
    ],
  },
  {
    id: 24,
    title: {
      en: "Defensive error: Your mistake led to a goal",
      zh: "防守失误：你的判断导致丢球",
    },
    scenario: {
      en: "A mistimed header or misplaced pass from you directly leads to a goal. There's still 25 minutes left.",
      zh: "你的一次冒顶或传球失误直接导致球队丢球。比赛还有 25 分钟。",
    },
    question: {
      en: "How do you adjust?",
      zh: "你会怎么调整？",
    },
    choices: [
      {
        text: { en: "Reset, play simple next.", zh: "立刻专注，下次做简单处理。" },
        scores: { EC: 3 },
      },
      {
        text: { en: "Fix positioning and scanning.", zh: "调整站位和观察习惯。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Own it, refocus the team.", zh: "示意责任，提醒专注。" },
        scores: { LEAD: 2, EC: 1 },
      },
      {
        text: { en: "Stay bold next time.", zh: "下次仍果断上抢。" },
        scores: { COUR: 2, EC: 1 },
      },
    ],
  },
  {
    id: 25,
    title: {
      en: "Defending a cross: Two attackers in the box",
      zh: "防守传中：禁区内有两名进攻球员",
    },
    scenario: {
      en: "Their winger has space to cross. Two attackers are in the box and you have only a moment to read the delivery.",
      zh: "对方边锋已经获得传中空间。禁区内有两名进攻球员，你需要在很短时间内判断落点。",
    },
    question: {
      en: "What are you more likely to do?",
      zh: "你更可能怎么做？",
    },
    choices: [
      {
        text: { en: "Confirm teammate's man, then zone.", zh: "先确认队友盯人，再守区域。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Read delivery, predict landing.", zh: "预判传中落点。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Attack the ball, clear first time.", zh: "抢第一点，立刻解围。" },
        scores: { COUR: 2, EC: 1 },
      },
      {
        text: { en: "Steer clear to safe area.", zh: "解不到就导向安全区。" },
        scores: { CREA: 1, IQ: 2 },
      },
    ],
  },
  {
    id: 26,
    title: {
      en: "Defensive line: A teammate is drifting out of position",
      zh: "防线位置：队友开始失位",
    },
    scenario: {
      en: "They're repeatedly threatening in behind your line. One teammate keeps dropping too deep and the offside trap isn't working.",
      zh: "对方连续在你的防线身后制造威胁。你发现一名队友总是回撤过深，导致越位线失效。",
    },
    question: {
      en: "What do you do?",
      zh: "你会怎么做？",
    },
    choices: [
      {
        text: { en: "Cover the space he leaves.", zh: "补位填他留下的空。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Tell him the line to hold.", zh: "死球时告诉他保持距离。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Read striker, step or drop.", zh: "研究前锋跑位，决定压退。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Tight on striker early.", zh: "提前贴身前锋。" },
        scores: { CREA: 2, FLAIR: 1 },
      },
    ],
  },
  {
    id: 27,
    title: {
      en: "Should the full-back push forward?",
      zh: "边后卫是否前插？",
    },
    scenario: {
      en: "Your team is attacking. The winger has the ball ahead, midfield has control, but their striker is still behind you waiting to counter.",
      zh: "你的球队正在进攻。边锋已经在前方拿球，中场队友控制住球权，但对方前锋仍然留在你的身后等待反击。",
    },
    question: {
      en: "What do you choose?",
      zh: "你会怎么选择？",
    },
    choices: [
      {
        text: { en: "Stay back, don't expose counter.", zh: "站位保守，防反击。" },
        scores: { EC: 1, TEAM: 2 },
      },
      {
        text: { en: "Check cover, then overlap.", zh: "看中场掩护再套边。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Overlap for a 2v1.", zh: "前插造二打一。" },
        scores: { TEAM: 3 },
      },
      {
        text: { en: "Fake overlap, reposition.", zh: "假套边，再换位置。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 28,
    title: {
      en: "Final minutes: You need an equaliser",
      zh: "比赛最后阶段：球队需要扳平比分",
    },
    scenario: {
      en: "89th minute, 0-1 down. You're a centre-back and your team is about to take a corner.",
      zh: "比赛第 89 分钟，你的球队 0:1 落后。你是一名中后卫，球队即将获得角球机会。",
    },
    question: {
      en: "What are you more likely to do?",
      zh: "你更可能怎么做？",
    },
    choices: [
      {
        text: { en: "Go up if someone's covering back.", zh: "有人留守就上前顶。" },
        scores: { IQ: 2, TEAM: 1 },
      },
      {
        text: { en: "Assign who stays, who second ball.", zh: "喊清谁留守、谁第二落点。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Attack the box for a header.", zh: "进禁区争头球。" },
        scores: { COUR: 2, LEAD: 1 },
      },
      {
        text: { en: "Late run, back post, or screen.", zh: "后点、迟跑或干扰盯人。" },
        scores: { CREA: 3 },
      },
    ],
  },
  {
    id: 29,
    title: {
      en: "Set-piece defence: They're running a complex routine",
      zh: "定位球防守：对方准备执行复杂战术",
    },
    scenario: {
      en: "They have a free kick in a dangerous area. Multiple players are swapping in the box and your teammates are getting confused.",
      zh: "对手获得前场任意球。禁区内有多名球员不断换位，你的队友开始出现沟通混乱。",
    },
    question: {
      en: "How do you handle it?",
      zh: "你会怎么处理？",
    },
    choices: [
      {
        text: { en: "Hold zone/man, ignore decoys.", zh: "守区域，不被假跑带走。" },
        scores: { EC: 2, TEAM: 1 },
      },
      {
        text: { en: "Spot the real threat.", zh: "找出真正威胁点。" },
        scores: { IQ: 3 },
      },
      {
        text: { en: "Take charge, remark everyone.", zh: "指挥队友重确认人。" },
        scores: { LEAD: 3 },
      },
      {
        text: { en: "Anticipate routine, intercept.", zh: "预判套路，拦关键线。" },
        scores: { CREA: 2, IQ: 1 },
      },
    ],
  },
  {
    id: 30,
    title: {
      en: "Away pressure: Constant provocation",
      zh: "客场压力：对手持续挑衅",
    },
    scenario: {
      en: "You're playing away. Their striker keeps getting physical and trying to bait you verbally. The crowd is booing throughout.",
      zh: "你在客场比赛。对方前锋频繁进行身体对抗，也不断尝试用语言激怒你。观众持续发出嘘声。",
    },
    question: {
      en: "What are you most likely to do?",
      zh: "你最可能怎么做？",
    },
    choices: [
      {
        text: { en: "Block noise, focus on defence.", zh: "屏蔽噪音，专注防守。" },
        scores: { EC: 3 },
      },
      {
        text: { en: "Stay calm, raise physicality.", zh: "保持冷静，加大对抗。" },
        scores: { IQ: 1, EC: 2 },
      },
      {
        text: { en: "Calm teammates down.", zh: "提醒队友别上头。" },
        scores: { LEAD: 2, EC: 1 },
      },
      {
        text: { en: "Answer with the next action.", zh: "用下一次防守回应。" },
        scores: { COUR: 2, EC: 1 },
      },
    ],
  },
];
