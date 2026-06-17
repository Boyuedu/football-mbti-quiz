import fs from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";
import express from "express";
import Database from "better-sqlite3";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const dataDir = path.join(__dirname, "..", "data");
const dbPath = path.join(dataDir, "ratings.db");

if (!fs.existsSync(dataDir)) {
  fs.mkdirSync(dataDir, { recursive: true });
}

const db = new Database(dbPath);
db.exec(`
  CREATE TABLE IF NOT EXISTS ratings (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    resultCode TEXT NOT NULL,
    rating INTEGER NOT NULL,
    sessionId TEXT NOT NULL,
    timestamp TEXT NOT NULL
  );
`);

const insertRating = db.prepare(`
  INSERT INTO ratings (resultCode, rating, sessionId, timestamp)
  VALUES (@resultCode, @rating, @sessionId, @timestamp)
`);

const listRatings = db.prepare(`
  SELECT id, resultCode, rating, sessionId, timestamp
  FROM ratings
  ORDER BY id DESC
`);

const app = express();
app.use(express.json());

app.post("/api/rating", async (req, res) => {
  const { resultCode, rating, sessionId, timestamp } = req.body ?? {};

  if (
    typeof resultCode !== "string" ||
    !Number.isInteger(rating) ||
    rating < 1 ||
    rating > 10 ||
    typeof sessionId !== "string" ||
    typeof timestamp !== "string"
  ) {
    return res.status(400).json({ success: false, message: "Invalid payload" });
  }

  const record = { resultCode, rating, sessionId, timestamp };
  insertRating.run(record);
  console.log("Saved rating:", record);
  return res.json({ success: true });
});

app.get("/api/rating", (_req, res) => {
  const data = listRatings.all();
  res.json({ success: true, data });
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Rating API running on http://localhost:${PORT}`);
  console.log(`SQLite DB path: ${dbPath}`);
});
