/**
 * Print all submitted ratings from SQLite (same DB as server/rating-api-example.js).
 * Usage: npm run ratings:view
 * Ensure ratings API has been run at least once so data/ratings.db exists.
 */
import Database from "better-sqlite3";
import path from "node:path";
import { fileURLToPath } from "node:url";

const dbPath = path.join(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
  "data",
  "ratings.db"
);

let db;
try {
  db = new Database(dbPath, { readonly: true });
} catch {
  console.error(`No database at ${dbPath}`);
  console.error("Start the API once (npm run server:rating) and submit a rating first.");
  process.exit(1);
}

const rows = db
  .prepare(
    `SELECT id, resultCode, rating, sessionId, timestamp
     FROM ratings ORDER BY id DESC`
  )
  .all();

if (rows.length === 0) {
  console.log("No ratings yet.");
  process.exit(0);
}

console.log(`\n${rows.length} rating(s) in ${dbPath}\n`);
console.table(rows);

const summary = db
  .prepare(
    `SELECT resultCode, COUNT(*) AS count, ROUND(AVG(rating), 2) AS avgRating
     FROM ratings GROUP BY resultCode ORDER BY count DESC`
  )
  .all();

console.log("\nBy prototype:\n");
console.table(summary);

db.close();
