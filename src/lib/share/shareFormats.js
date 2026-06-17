/**
 * Platform-specific share text for paste-first sharing.
 */

const WORLD_CUP_HASHTAGS = "#世界杯 #美加墨世界杯";

function topTwoLine(archetypeRankedDimensions, dimensionLabels) {
  const [a, b] = archetypeRankedDimensions;
  return `${dimensionLabels[a]} + ${dimensionLabels[b]}`;
}

export async function copyTextToClipboard(text) {
  try {
    await navigator.clipboard.writeText(text);
    return true;
  } catch {
    try {
      const ta = document.createElement("textarea");
      ta.value = text;
      ta.setAttribute("readonly", "");
      ta.style.position = "fixed";
      ta.style.left = "-9999px";
      document.body.appendChild(ta);
      ta.select();
      const ok = document.execCommand("copy");
      document.body.removeChild(ta);
      return ok;
    } catch {
      return false;
    }
  }
}

function extraBlock(extraSections) {
  return (
    `\u9ad8\u5149\u65f6\u523b\n${extraSections.worldCupMoment.content}\n\n` +
    `\u6700\u4f73\u62cd\u6863\uff1a${extraSections.bestTeammate.partners.join(" / ")}\n` +
    `${extraSections.bestTeammate.content}\n\n` +
    `\u4e0b\u4e00\u9636\u6bb5\u5347\u7ea7\n${extraSections.nextUpgrade.content}\n`
  );
}

function extraBlockEn(extraSections) {
  return (
    `Signature moment\n${extraSections.worldCupMoment.content}\n\n` +
    `Best teammates: ${extraSections.bestTeammate.partners.join(" / ")}\n` +
    `${extraSections.bestTeammate.content}\n\n` +
    `Next upgrade\n${extraSections.nextUpgrade.content}\n`
  );
}

/** WeChat: chat / Moments caption */
export function formatWeChatCN({
  brand,
  extraSections,
  localized,
  archetypeRankedDimensions,
  dimensionLabels,
}) {
  const top2 = topTwoLine(archetypeRankedDimensions, dimensionLabels);
  return (
    `\u3010${brand} | \u8db3\u7403\u57fa\u56e0\u6d4b\u8bd5\u3011\n\n` +
    `\u6211\u5728 ${brand} \u5b8c\u6210\u6d4b\u8bd5\uff0c\u8fd9\u662f\u6211\u7684\u7ed3\u679c\uff08\u4ec5\u4f9b\u5a31\u4e50\u4e0e\u81ea\u6211\u5bf9\u7167\uff09\u3002\n` +
    `\u7ed3\u679c\uff1a${localized.resultName}\uff08${localized.resultCode}\uff09\n` +
    `\u4e00\u53e5\u8bdd\uff1a${extraSections.hero.tagline}\n\n` +
    extraBlock(extraSections) +
    `\n\u7ef4\u5ea6\u503e\u5411\uff08\u524d\u4e8c\uff09\uff1a${top2}\n\n` +
    `\u2014\u2014\u590d\u5236\u4ee5\u4e0a\u5185\u5bb9\uff0c\u53ef\u76f4\u63a5\u7c98\u8d34\u5230\u5fae\u4fe1\u804a\u5929\u6216\u670b\u53cb\u5708\u914d\u6587\uff08\u5efa\u8bae\u914d\u672c\u9875\u622a\u56fe\uff09\u3002`
  );
}

/** Xiaohongshu: note-style + hashtags */
export function formatXiaohongshuCN({
  brand,
  extraSections,
  localized,
  archetypeRankedDimensions,
  dimensionLabels,
}) {
  const top2 = topTwoLine(archetypeRankedDimensions, dimensionLabels);
  return (
    `\u6d4b\u6d4b\u4f60\u7684\u8db3\u7403\u57fa\u56e0 \u00b7 ${brand}\n\n` +
    `\u7ed3\u679c\uff1a${localized.resultName}\n\n${extraSections.hero.tagline}\n\n` +
    extraBlock(extraSections) +
    `\u7ef4\u5ea6\u524d\u4e8c\uff1a${top2}\n\n` +
    `\u5982\u679c\u4f60\u4e5f\u8e22\u7403\u6216\u770b\u7403\uff0c\u6765\u6d4b\u6d4b\u4f60\u662f\u54ea\u79cd\u7403\u5458\u7c7b\u578b\u3002\n` +
    `\uff08\u5efa\u8bae\u914d 2-3 \u5f20\u7ed3\u679c\u9875\u622a\u56fe\uff09\n\n` +
    `#\u8db3\u7403 #\u8e22\u7403 #\u8db3\u7403\u6d4b\u8bd5 #\u8db3\u7403\u4eba\u683c #MBTI\u98ce\u683c #\u7403\u8bc4 #${brand} #\u5c0f\u7ea2\u4e66\u7403\u8bc4\u5927\u4f1a ${WORLD_CUP_HASHTAGS}`
  );
}

/** Douyin: short hook + hashtags */
export function formatDouyinCN({
  brand,
  extraSections,
  localized,
  archetypeRankedDimensions,
  dimensionLabels,
}) {
  const top2 = topTwoLine(archetypeRankedDimensions, dimensionLabels);
  return (
    `\u6d4b\u4e86${brand}\uff0c\u6211\u7684\u7ed3\u679c\uff1a${localized.resultName}\n\n` +
    `${extraSections.hero.tagline}\n\n` +
    `${extraSections.worldCupMoment.content}\n\n` +
    `\u7ef4\u5ea6\u524d\u4e8c\uff1a${top2}\n` +
    `\u6863\u6848\uff1a${localized.resultCode}\n\n` +
    `\u622a\u56fe\u53d1\u8bc4\u8bba\u533a\uff0c\u770b\u770b\u8c01\u8ddf\u4f60\u662f\u540c\u4e00\u7c7b\u578b\n\n` +
    `#\u8db3\u7403 #\u8e22\u7403 #\u8db3\u7403\u6d4b\u8bd5 #\u8db3\u7403\u4eba\u683c #${brand} ${WORLD_CUP_HASHTAGS}`
  );
}

/** Dongqiudi: editorial / tactical tone */
export function formatDongqiudiCN({
  brand,
  extraSections,
  localized,
  archetypeRankedDimensions,
  dimensionLabels,
}) {
  const top2 = topTwoLine(archetypeRankedDimensions, dimensionLabels);
  return (
    `\u3010\u6218\u672f\u4eba\u683c | \u8db3\u7403\u57fa\u56e0\u3011${brand}\n\n` +
    `\u7ed3\u679c\uff1a${localized.resultName}\uff08${localized.resultCode}\uff09\n\n` +
    `\u6bd4\u8d5b\u6c14\u8d28\uff1a${extraSections.hero.tagline}\n\n` +
    extraBlock(extraSections) +
    `\u7ef4\u5ea6\u503e\u5411\uff08\u524d\u4e8c\uff09\uff1a${top2}\n\n` +
    `\u2014\u2014\u61c2\u7403\u5e1d\u53d1\u5e16\u53ef\u76f4\u63a5\u7c98\u8d34\uff1b\u5efa\u8bae\u9644\u5e26\u7ed3\u679c\u9875\u622a\u56fe\u3002\n\n` +
    `#\u61c2\u7403\u5e1d #\u8db3\u7403 #\u6218\u672f #\u7403\u5458\u6a21\u677f #\u8db3\u7403\u4eba\u683c #${brand} ${WORLD_CUP_HASHTAGS}`
  );
}

export function formatGenericEN({
  brand,
  extraSections,
  localized,
  archetypeRankedDimensions,
  dimensionLabels,
}) {
  const top2 = topTwoLine(archetypeRankedDimensions, dimensionLabels);
  return (
    `${brand} | Football DNA Quiz\n` +
    `${localized.resultName} (${localized.resultCode})\n\n` +
    `${extraSections.hero.tagline}\n\n` +
    extraBlockEn(extraSections) +
    `Top dimensions: ${top2}\n\n` +
    `Tip: Screenshot this page for Instagram / X / TikTok.\n\n` +
    `Chinese apps (WeChat / Xiaohongshu / Douyin / Dongqiudi): use the copy buttons below for paste-ready captions.`
  );
}
