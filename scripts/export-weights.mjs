import { writeFileSync } from "fs";
import { QUESTIONS, DIMENSION_KEYS } from "../src/data/questions.js";
import { ARCHETYPE_PROTOTYPES } from "../src/data/archetypes/prototypes.js";
import { RESULT_DEFINITIONS } from "../src/data/archetypes/results.js";

function computeScoreCeilings(questions) {
  const keys = [...DIMENSION_KEYS];
  const maxes = Object.fromEntries(keys.map((k) => [k, 0]));
  for (const q of questions) {
    for (const k of keys) {
      let best = 0;
      for (const c of q.choices) {
        best = Math.max(best, c.scores?.[k] ?? 0);
      }
      maxes[k] += best;
    }
  }
  return maxes;
}

const DIM_ZH = {
  IQ: "球商",
  LEAD: "领导力",
  CREA: "创造力",
  TEAM: "团队配合",
  FLAIR: "个人风采",
  EC: "情绪管理",
  COUR: "勇气",
};

const ceil = computeScoreCeilings(QUESTIONS);

let md = "# 足球基因测试 · 权重清单\n\n";
md += "## 维度代码\n\n";
md += DIMENSION_KEYS.map((k) => `- **${k}** = ${DIM_ZH[k]}`).join("\n");
md += "\n\n## 各维度理论最高分（30题全选最优选项）\n\n";
md += "| 维度 | 最高分 |\n|------|--------|\n";
for (const k of DIMENSION_KEYS) {
  md += `| ${DIM_ZH[k]} (${k}) | ${ceil[k]} |\n`;
}

md += "\n## 每题选项权重\n\n";
for (const q of QUESTIONS) {
  md += `### Q${q.id} ${q.title?.zh ?? ""}\n\n`;
  md += "| 选项 | 权重 | 总分 |\n|------|------|------|\n";
  q.choices.forEach((c, i) => {
    const label = String.fromCharCode(65 + i);
    const w = Object.entries(c.scores)
      .map(([k, v]) => `${DIM_ZH[k] || k}+${v}`)
      .join(", ");
    const total = Object.values(c.scores).reduce((a, b) => a + b, 0);
    md += `| ${label} | ${w} | ${total} |\n`;
  });
  md += "\n";
}

md += "## 10 个原型向量（0–100，用于最终匹配）\n\n";
md += "| 原型 | 球商 | 领导力 | 创造力 | 团队 | 风采 | 情绪 | 勇气 |\n";
md += "|------|------|--------|--------|------|------|------|------|\n";
for (const [code, v] of Object.entries(ARCHETYPE_PROTOTYPES)) {
  md += `| ${code} | ${v.IQ} | ${v.LEAD} | ${v.CREA} | ${v.TEAM} | ${v.FLAIR} | ${v.EMO} | ${v.COUR} |\n`;
}

md += "\n## 30 种结果类型（10原型 × 3层级）\n\n";
md += "| lookupKey | resultCode | 中文名 | 主导维度对 | 层级 |\n";
md += "|-----------|------------|--------|------------|------|\n";
for (const r of RESULT_DEFINITIONS) {
  const tier = r.key.split("_").pop();
  const pair = r.key.replace(/_Prime|_Core|_Hybrid/, "");
  md += `| ${r.key} | ${r.resultCode} | ${r.zh.resultName} | ${pair} | ${tier} |\n`;
}

writeFileSync("docs/scoring-weights-reference.md", md, "utf8");
console.log("Wrote docs/scoring-weights-reference.md");
