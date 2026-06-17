import {
  CORE_ATTRIBUTE_KEYS,
  DIMENSION_LABELS,
  getDisplayScore,
} from "./CoreAttributes";

const N = CORE_ATTRIBUTE_KEYS.length;
const TWO_PI = Math.PI * 2;

/** Angle for axis index i: top (−90°) then clockwise. */
export function axisAngle(index) {
  return -Math.PI / 2 + (index * TWO_PI) / N;
}

/**
 * Point on axis at given radius scale (0–1) from center.
 * @param {number} value0to100 — clamped to [0, 100] for length
 */
export function valueToPoint(cx, cy, maxRadius, index, value0to100) {
  const angle = axisAngle(index);
  const t = Math.min(100, Math.max(0, Number(value0to100) || 0)) / 100;
  const r = maxRadius * t;
  return {
    x: cx + Math.cos(angle) * r,
    y: cy + Math.sin(angle) * r,
    angle,
  };
}

function hexPolygonPath(cx, cy, radius) {
  const pts = [];
  for (let i = 0; i < N; i++) {
    const a = axisAngle(i);
    pts.push(`${cx + Math.cos(a) * radius},${cy + Math.sin(a) * radius}`);
  }
  return `M ${pts.join(" L ")} Z`;
}

/**
 * Single-user 6-axis radar (SVG). Uses displayScore from raw `userVector` for UI parity with Core Attributes.
 * @param {{ IQ: number, LEAD: number, CREA: number, TEAM: number, FLAIR: number, EMO: number, COUR: number }} data
 * @param {"en" | "zh"} locale
 * @param {"default" | "light"} [colorMode='default']
 */
export default function RadarChart({ data, locale, colorMode = "default" }) {
  const lang = locale === "zh" ? "zh" : "en";
  const isLightMode = colorMode === "light";
  const gridStroke = "rgba(255,255,255,0.18)";
  const axisStroke = "rgba(255,255,255,0.24)";
  const polygonFill = "rgba(56, 189, 248, 0.22)";
  const polygonStroke = "#38bdf8";
  const pointFill = "#7dd3fc";
  const pointStroke = "#38bdf8";
  const centerFill = "rgba(125, 211, 252, 0.45)";
  const labelFill = isLightMode ? "rgba(255,255,255,0.7)" : "rgba(255,255,255,0.7)";
  const valueFill = "#ffffff";

  const VB = 520;
  const cx = VB / 2;
  const cy = VB / 2;
  const maxR = 108;
  const gridLayers = 5;

  const values = CORE_ATTRIBUTE_KEYS.map((key) => {
    const raw =
      data?.[key] === undefined || data?.[key] === null
        ? 0
        : Math.min(100, Math.max(0, Math.round(Number(data[key]))));
    return getDisplayScore(raw);
  });

  const dataPoints = values.map((v, i) => valueToPoint(cx, cy, maxR, i, v));
  const dataPath = `M ${dataPoints.map((p) => `${p.x},${p.y}`).join(" L ")} Z`;

  const labelRadius = maxR + 38;

  return (
    <div className="mx-auto w-full max-w-md shrink-0">
      {/* Fixed aspect box: SVG + viewBox alone often collapses to 0 height without explicit ratio */}
      <div className="relative aspect-square w-full">
        <svg
          width="100%"
          height="100%"
          viewBox={`0 0 ${VB} ${VB}`}
          preserveAspectRatio="xMidYMid meet"
          className="block w-full overflow-visible text-slate-200"
          role="img"
          aria-label="Six-dimension attribute radar"
        >
        {/* Concentric hex grids */}
        {Array.from({ length: gridLayers }, (_, layer) => {
          const frac = (layer + 1) / gridLayers;
          const r = maxR * frac;
          return (
            <path
              key={`grid-${layer}`}
              d={hexPolygonPath(cx, cy, r)}
              fill="none"
              stroke={gridStroke}
              strokeWidth={layer === gridLayers - 1 ? 1.2 : 0.8}
            />
          );
        })}

        {/* Spokes */}
        {CORE_ATTRIBUTE_KEYS.map((_, i) => {
          const a = axisAngle(i);
          const x2 = cx + Math.cos(a) * maxR;
          const y2 = cy + Math.sin(a) * maxR;
          return (
            <line
              key={`spoke-${i}`}
              x1={cx}
              y1={cy}
              x2={x2}
              y2={y2}
              stroke={axisStroke}
              strokeWidth={1}
            />
          );
        })}

        {/* Data polygon */}
        <path
          d={dataPath}
          fill={polygonFill}
          stroke={polygonStroke}
          strokeWidth={2.5}
          strokeLinejoin="round"
          className="drop-shadow-[0_0_10px_rgba(56,189,248,0.45)]"
        />

        {/* Vertices */}
        {dataPoints.map((p, i) => (
          <circle
            key={`pt-${i}`}
            cx={p.x}
            cy={p.y}
            r={3.5}
            fill={pointFill}
            stroke={pointStroke}
            strokeWidth={1.2}
          />
        ))}

        {/* Center */}
        <circle cx={cx} cy={cy} r={3} fill={centerFill} />

        {/* Labels */}
        {CORE_ATTRIBUTE_KEYS.map((key, i) => {
          const a = axisAngle(i);
          const lx = cx + Math.cos(a) * labelRadius;
          const ly = cy + Math.sin(a) * labelRadius;
          const dimLabel = DIMENSION_LABELS[key][lang];
          const v = values[i];

          return (
            <g key={`lbl-${key}`} transform={`translate(${lx},${ly})`}>
              <text
                y={-5}
                textAnchor="middle"
                fill={labelFill}
                style={{ fontSize: "11px", fontWeight: 500 }}
              >
                {`${key} / ${dimLabel}`}
              </text>
              <text
                y={12}
                textAnchor="middle"
                fill={valueFill}
                style={{ fontSize: "13px", fontWeight: 700 }}
              >
                {v}
              </text>
            </g>
          );
        })}
        </svg>
      </div>
    </div>
  );
}
