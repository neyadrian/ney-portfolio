import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import ContributionSkyline from "./ContributionSkyline";
import fallback from "../data/github-contributions.json";

const GITHUB_USER = "neyadrian";

function toDays(list) {
  if (!Array.isArray(list)) return [];
  return list
    .map((d) => ({
      date: String(d.date || ""),
      count: Number(d.count) || 0,
    }))
    .filter((d) => /^\d{4}-\d{2}-\d{2}$/.test(d.date));
}

function isPlausible(days) {
  if (!days.length) return false;
  const total = days.reduce((sum, day) => sum + day.count, 0);
  const nonzero = days.filter((day) => day.count > 0).length;
  const max = days.reduce((best, day) => Math.max(best, day.count), 0);
  return total >= 10 && nonzero >= 10 && max <= total * 0.35;
}

function parseGitHubCalendar(html) {
  const days = [];
  const cellRe = /id="(contribution-day-component-\d+-\d+)"[^>]*data-date="(\d{4}-\d{2}-\d{2})"|data-date="(\d{4}-\d{2}-\d{2})"[^>]*id="(contribution-day-component-\d+-\d+)"/g;
  const ids = {};
  let match;
  while ((match = cellRe.exec(html))) {
    const id = match[1] || match[4];
    const date = match[2] || match[3];
    if (id && date) ids[id] = date;
  }

  const tipRe = /<tool-tip[^>]*for="([^"]+)"[^>]*>([^<]+)<\/tool-tip>/g;
  while ((match = tipRe.exec(html))) {
    const date = ids[match[1]];
    if (!date) continue;
    const text = match[2].trim();
    const countMatch = /^(\d+)/.exec(text);
    days.push({
      date,
      count: countMatch ? Number(countMatch[1]) : 0,
    });
  }
  return days;
}

async function loadContributions() {
  try {
    const res = await fetch("/api/github-contributions");
    if (res.ok) {
      const html = await res.text();
      const days = parseGitHubCalendar(html);
      if (isPlausible(days)) return days;
    }
  } catch {
    /* fall through to snapshot */
  }
  return toDays(fallback);
}

export default function Contributions() {
  const sectionRef = useRef(null);
  const { t, lang } = useLanguage();
  const [data, setData] = useState(() => toDays(fallback));

  useEffect(() => {
    let cancelled = false;
    loadContributions().then((days) => {
      if (!cancelled && isPlausible(days)) setData(days);
    });
    return () => {
      cancelled = true;
    };
  }, []);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 80);
            });
          }
        });
      },
      { threshold: 0.12 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const locale = lang === "pt" ? "pt-BR" : "en-US";

  return (
    <section className="contributions-section" id="contributions" ref={sectionRef}>
      <p className="section-label fade-up">{t.contributions.label}</p>
      <h2 className="section-title fade-up stagger-1">
        {t.contributions.title} <span className="dim">{t.contributions.titleDim}</span>
      </h2>
      <div className="contributions-chart fade-up stagger-2">
        <ContributionSkyline
          data={data}
          endDate={data.reduce((latest, day) => (day.date > latest ? day.date : latest), data[0]?.date) || new Date()}
          locale={locale}
          unit={t.contributions.unit}
          unitPlural={t.contributions.unitPlural}
          palette="github"
          defaultView="3d"
          footer={
            <a
              href={`https://github.com/${GITHUB_USER}`}
              target="_blank"
              rel="noreferrer"
              className="contributions-github-link"
            >
              github.com/{GITHUB_USER}
            </a>
          }
        />
      </div>
    </section>
  );
}
