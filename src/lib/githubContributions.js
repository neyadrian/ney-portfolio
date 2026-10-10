export const GITHUB_USER = "neyadrian";

const JOGRUBER_URL = `https://github-contributions-api.jogruber.de/v4/${GITHUB_USER}`;
const VERCEL_URL = `https://github-contributions.vercel.app/api/v1/${GITHUB_USER}`;
const GITHUB_HTML_URL = `https://github.com/users/${GITHUB_USER}/contributions`;
const DEV_PROXY_URL = "/api/github-contributions";

export function toDays(list) {
  if (!Array.isArray(list)) return [];
  const byDate = new Map();
  for (const item of list) {
    const date = String(item?.date || "").slice(0, 10);
    if (!/^\d{4}-\d{2}-\d{2}$/.test(date)) continue;
    const count = Number(item?.count ?? item?.contributionCount) || 0;
    byDate.set(date, (byDate.get(date) || 0) + count);
  }
  return [...byDate.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}

export function todayKey() {
  const d = new Date();
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function isPlausible(days) {
  return Array.isArray(days) && days.length >= 300;
}

function countFromLabel(text) {
  const value = String(text || "")
    .replace(/<[^>]+>/g, " ")
    .replace(/\s+/g, " ")
    .trim();
  if (!value || /^No /i.test(value)) return 0;
  const match = /^(\d+)/.exec(value);
  return match ? Number(match[1]) : 0;
}

export function parseGitHubCalendar(html) {
  const byDate = new Map();
  const source = String(html || "");

  const ids = {};
  const cellRe =
    /id="(contribution-day-component-\d+-\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"|data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-\d+-\d+)"/g;
  let match;
  while ((match = cellRe.exec(source))) {
    const id = match[1] || match[4];
    const date = match[2] || match[3];
    if (id && date) {
      ids[id] = date;
      if (!byDate.has(date)) byDate.set(date, 0);
    }
  }

  const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([\s\S]*?)<\/tool-tip>/g;
  while ((match = tipRe.exec(source))) {
    const date = ids[match[1]];
    if (!date) continue;
    byDate.set(date, countFromLabel(match[2]));
  }

  return [...byDate.entries()]
    .map(([date, count]) => ({ date, count }))
    .sort((a, b) => (a.date < b.date ? -1 : 1));
}

async function fetchOk(url) {
  const ctrl = new AbortController();
  const timer = setTimeout(() => ctrl.abort(), 15000);
  try {
    const headers = {};
    if (typeof window === "undefined") headers["User-Agent"] = "ney-portfolio-contributions";
    const res = await fetch(url, { cache: "no-store", signal: ctrl.signal, headers });
    if (!res.ok) throw new Error(`HTTP ${res.status}`);
    return res;
  } finally {
    clearTimeout(timer);
  }
}

export async function fetchGitHubHtmlContributions() {
  const res = await fetchOk(GITHUB_HTML_URL);
  return parseGitHubCalendar(await res.text());
}

export async function fetchVercelContributions() {
  const res = await fetchOk(VERCEL_URL);
  const json = await res.json();
  return toDays(json?.contributions);
}

export async function fetchJogruberContributions() {
  const res = await fetchOk(JOGRUBER_URL);
  const json = await res.json();
  return toDays(json?.contributions);
}

export async function fetchProxyContributions() {
  const res = await fetchOk(DEV_PROXY_URL);
  return parseGitHubCalendar(await res.text());
}

export async function loadLiveContributions(fallback) {
  const inBrowser = typeof window !== "undefined";
  const sources = inBrowser
    ? [fetchVercelContributions, fetchJogruberContributions, fetchProxyContributions]
    : [fetchGitHubHtmlContributions, fetchVercelContributions, fetchJogruberContributions];

  for (const source of sources) {
    try {
      const days = await source();
      if (isPlausible(days)) return days;
    } catch {
      continue;
    }
  }
  return toDays(fallback);
}
