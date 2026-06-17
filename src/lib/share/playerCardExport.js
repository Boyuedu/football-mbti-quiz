import { toPng } from "html-to-image";

/**
 * Safe PNG filename from user-entered name. Falls back to `player-build.png`.
 * @param {string} rawName
 * @param {string} [fallbackBase='player-build']
 */
export function slugifyPlayerCardFileName(rawName, fallbackBase = "player-build") {
  const t = (rawName || "").trim().slice(0, 80);
  if (!t) return `${fallbackBase}.png`;
  const safe = t
    .replace(/[\\/:*?"<>|]+/g, "")
    .replace(/\s+/g, "-")
    .replace(/^\.+/, "")
    .replace(/-+/g, "-");
  return safe ? `${safe}-player-build.png` : `${fallbackBase}.png`;
}

/**
 * Renders `node` to a PNG and triggers download.
 * Browsers often skip painting nodes that are far off-screen (e.g. left: -12000px),
 * which makes html-to-image return a flat background. We briefly move the node
 * on-screen, wait for layout/paint, then restore.
 * @param {HTMLElement} node
 * @param {string} filename
 */
export async function exportPlayerCardPng(node, filename) {
  if (!node) {
    throw new Error("Missing export node");
  }

  const waitPaint = () =>
    new Promise((resolve) => {
      requestAnimationFrame(() => {
        requestAnimationFrame(() => {
          setTimeout(resolve, 30);
        });
      });
    });

  const waitFonts =
    typeof document !== "undefined" && document.fonts?.ready
      ? document.fonts.ready.catch(() => {})
      : Promise.resolve();

  const stage = document.createElement("div");
  const clone = node.cloneNode(true);

  try {
    Object.assign(stage.style, {
      position: "fixed",
      inset: "0",
      display: "flex",
      alignItems: "flex-start",
      justifyContent: "center",
      paddingTop: "24px",
      zIndex: "2147483646",
      pointerEvents: "none",
      overflow: "hidden",
      background: "#0C0E30",
    });

    Object.assign(clone.style, {
      width: "720px",
      maxWidth: "720px",
      margin: "0",
      background: "#0C0E30",
    });

    stage.appendChild(clone);
    document.body.appendChild(stage);

    await waitFonts;
    await waitPaint();

    const rect = clone.getBoundingClientRect();
    const exportWidth = Math.max(1, Math.round(rect.width || node.scrollWidth || 720));
    const exportHeight = Math.max(
      1,
      Math.round(rect.height || clone.scrollHeight || node.scrollHeight || 1080)
    );

    const dataUrl = await toPng(clone, {
      pixelRatio: 2,
      cacheBust: true,
      backgroundColor: "#0C0E30",
      width: exportWidth,
      height: exportHeight,
    });

    const a = document.createElement("a");
    a.download = filename;
    a.href = dataUrl;
    a.rel = "noopener";
    a.click();
  } finally {
    if (stage.parentNode) {
      stage.parentNode.removeChild(stage);
    }
  }
}
