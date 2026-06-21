/**
 * Upload dist/ to Aliyun OSS for China CDN static hosting.
 *
 * Prerequisites:
 *   1. npm run build
 *   2. Bucket configured for static website (index + 404 → index.html)
 *   3. CDN domain pointed at bucket (optional but recommended)
 *
 * Env: ALIYUN_OSS_REGION, ALIYUN_OSS_BUCKET, ALIYUN_OSS_ACCESS_KEY_ID,
 *      ALIYUN_OSS_ACCESS_KEY_SECRET, ALIYUN_OSS_PREFIX (optional folder)
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import OSS from "ali-oss";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.join(__dirname, "..");
const distDir = path.join(projectRoot, "dist");

function loadEnvFile() {
  const envPath = path.join(projectRoot, ".env");
  if (!fs.existsSync(envPath)) return;

  for (const line of fs.readFileSync(envPath, "utf8").split(/\r?\n/)) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith("#")) continue;
    const eq = trimmed.indexOf("=");
    if (eq === -1) continue;
    const key = trimmed.slice(0, eq).trim();
    const value = trimmed.slice(eq + 1).trim();
    if (!(key in process.env)) {
      process.env[key] = value;
    }
  }
}

loadEnvFile();

const region = process.env.ALIYUN_OSS_REGION;
const bucket = process.env.ALIYUN_OSS_BUCKET;
const accessKeyId = process.env.ALIYUN_OSS_ACCESS_KEY_ID;
const accessKeySecret = process.env.ALIYUN_OSS_ACCESS_KEY_SECRET;
const prefix = (process.env.ALIYUN_OSS_PREFIX ?? "").replace(/^\/|\/$/g, "");

function requireEnv(name, value) {
  if (!value) {
    console.error(`Missing env: ${name}`);
    console.error("Fill Aliyun OSS variables in .env at project root.");
    process.exit(1);
  }
}

requireEnv("ALIYUN_OSS_REGION", region);
requireEnv("ALIYUN_OSS_BUCKET", bucket);
requireEnv("ALIYUN_OSS_ACCESS_KEY_ID", accessKeyId);
requireEnv("ALIYUN_OSS_ACCESS_KEY_SECRET", accessKeySecret);

if (!fs.existsSync(distDir)) {
  console.error("dist/ not found. Run: npm run build");
  process.exit(1);
}

const client = new OSS({
  region,
  bucket,
  accessKeyId,
  accessKeySecret,
});

const MIME = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
  ".ico": "image/x-icon",
  ".woff": "font/woff",
  ".woff2": "font/woff2",
};

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      files.push(...walk(full));
    } else {
      files.push(full);
    }
  }
  return files;
}

function objectKey(relativePath) {
  const normalized = relativePath.split(path.sep).join("/");
  return prefix ? `${prefix}/${normalized}` : normalized;
}

function cacheControl(relativePath) {
  if (relativePath.startsWith(`assets${path.sep}`) || relativePath.includes("/assets/")) {
    return "public, max-age=31536000, immutable";
  }
  return "public, max-age=300";
}

const files = walk(distDir);
console.log(`Uploading ${files.length} file(s) to oss://${bucket}/${prefix || ""}`);

let uploaded = 0;
for (const filePath of files) {
  const relative = path.relative(distDir, filePath);
  const ext = path.extname(filePath).toLowerCase();
  const key = objectKey(relative);

  const contentType = MIME[ext] ?? "application/octet-stream";
  const headers = {
    "Content-Type": contentType,
    "Cache-Control": cacheControl(relative),
  };
  if (ext === ".html") {
    headers["Content-Disposition"] = "inline";
  }

  await client.put(key, filePath, {
    headers,
    mime: contentType.split(";")[0],
  });

  uploaded += 1;
  if (uploaded % 10 === 0 || uploaded === files.length) {
    console.log(`  ${uploaded}/${files.length}`);
  }
}

console.log("\nDone. Invalidate CDN cache in Aliyun console if files look stale.");
const bucketHost = `${bucket}.${region}.aliyuncs.com`;
console.log("\nOSS bucket host (upload target only — browsers force-download HTML here):");
console.log(`  https://${bucketHost}`);
console.log("\nTo let users open the quiz in a browser, bind a custom domain in OSS console:");
console.log("  Bucket → 传输管理 → 域名管理 → 绑定用户域名");
console.log("  Then add a CNAME at your DNS provider pointing to the value Aliyun shows.");
console.log("  Hong Kong bucket: no ICP filing required. See docs/deployment-dual-static.md");
console.log("\nUntil a custom domain is ready, share the Cloudflare URL for overseas users.");
