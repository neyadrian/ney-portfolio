import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const projectMeta = [
  {
    key: "commitcard",
    icon: "🪪",
    tags: ["Java", "Spring Boot", "GitHub OAuth"],
    link: "https://commitcard.com.br",
    featured: true,
  },
  {
    key: "banco",
    icon: "🏦",
    tags: ["Java", "Swing", "MySQL", "MVC"],
    link: "https://github.com/neyadrian/projeto-banc-rio",
  },
  {
    key: "gps",
    icon: "🗺️",
    tags: ["C", "Graphs", "Dijkstra"],
    link: "https://github.com/neyadrian/sistema-gps",
  },
  {
    key: "cinema",
    icon: "🎬",
    tags: ["Java", "OOP", "Arrays"],
    link: "https://github.com/neyadrian/sistema-cinema",
  },
  {
    key: "rh",
    icon: "🧑‍💼",
    tags: ["Java", "OOP", "Collections"],
    link: "https://github.com/neyadrian/gestao-rh",
  },
  {
    key: "logitrack",
    icon: "🚛",
    tags: ["Java", "Design Patterns", "SOLID"],
    link: "https://github.com/neyadrian/Logi-Track",
  },
  {
    key: "supermercado",
    icon: "🛒",
    tags: ["Java", "Sockets", "TCP/UDP"],
    link: "https://github.com/neyadrian/sistema-supermercado",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 100);
            });
          }
        });
      },
      { threshold: 0.08 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  const featured = projectMeta.find((p) => p.featured);
  const rest = projectMeta.filter((p) => !p.featured);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <p className="section-label fade-up">{t.projects.label}</p>
      <h2 className="section-title fade-up stagger-1">
        {t.projects.title} <span className="dim">{t.projects.titleDim}</span>
      </h2>

      {featured && (
        <a
          href={featured.link}
          target="_blank"
          rel="noreferrer"
          className="project-card project-card-featured fade-up stagger-2"
        >
          <span className="featured-badge">{t.projects.featured}</span>
          <div className="project-header">
            <div className="project-icon">{featured.icon}</div>
            <div className="project-tags">
              {featured.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <h3 className="project-title">{t.projects.items[featured.key].title}</h3>
          <p className="project-desc">{t.projects.items[featured.key].desc}</p>
          <span className="project-link">{t.projects.visitSite}</span>
        </a>
      )}

      <div className="projects-grid">
        {rest.map((p, i) => (
          <div
            key={p.key}
            className={`project-card fade-up stagger-${Math.min(i + 3, 5)}`}
          >
            <div className="project-header">
              <div className="project-icon">{p.icon}</div>
              <div className="project-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <h3 className="project-title">{t.projects.items[p.key].title}</h3>
            <p className="project-desc">{t.projects.items[p.key].desc}</p>
            <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
              {t.projects.viewGithub}
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
