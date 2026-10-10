import { useEffect, useRef, useState } from "react";
import { useLanguage } from "../context/LanguageContext";
import ContributionSkyline from "./ContributionSkyline";
import fallback from "../data/github-contributions.json";
import {
  GITHUB_USER,
  isPlausible,
  loadLiveContributions,
  todayKey,
  toDays,
} from "../lib/githubContributions";

export default function Contributions() {
  const sectionRef = useRef(null);
  const { t, lang } = useLanguage();
  const [data, setData] = useState(() => toDays(fallback));

  useEffect(() => {
    let cancelled = false;
    loadLiveContributions(fallback).then((days) => {
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
  const endDate = todayKey();

  return (
    <section className="contributions-section" id="contributions" ref={sectionRef}>
      <p className="section-label fade-up">{t.contributions.label}</p>
      <h2 className="section-title fade-up stagger-1">
        {t.contributions.title} <span className="dim">{t.contributions.titleDim}</span>
      </h2>
      <div className="contributions-chart fade-up stagger-2">
        <ContributionSkyline
          data={data}
          endDate={endDate}
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
