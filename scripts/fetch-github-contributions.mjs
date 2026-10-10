import { writeFileSync } from "node:fs";
import { dirname, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import {
  fetchGitHubHtmlContributions,
  fetchJogruberContributions,
  fetchVercelContributions,
  isPlausible,
} from "../src/lib/githubContributions.js";

const root = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const outFile = resolve(root, "src/data/github-contributions.json");

const sources = [
  fetchGitHubHtmlContributions,
  fetchVercelContributions,
  fetchJogruberContributions,
];

let days = [];
for (const source of sources) {
  try {
    days = await source();
    if (isPlausible(days)) break;
  } catch (err) {
    console.warn(`${source.name} failed: ${err.message}`);
  }
}

if (!isPlausible(days)) {
  console.warn("Keeping existing snapshot: no complete calendar was fetched.");
  process.exit(0);
}

writeFileSync(outFile, `${JSON.stringify(days)}\n`);
console.log(`Wrote ${days.length} days (${days[0].date} → ${days[days.length - 1].date}) to ${outFile}`);
