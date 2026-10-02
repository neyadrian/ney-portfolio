import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const projectMeta = [
  {
    key: "commitcard",
    icon: "ri-id-card-line",
    tags: ["Java", "Spring Boot", "GitHub OAuth"],
    link: "https://commitcard.com.br",
    featured: true,
  },
  {
    key: "banco",
    icon: "ri-bank-line",
    tags: ["Java", "Swing", "MySQL", "MVC"],
    link: "https://github.com/neyadrian/projeto-banc-rio",
  },
  {
    key: "gps",
    icon: "ri-map-2-line",
    tags: ["C", "Graphs", "Dijkstra"],
    link: "https://github.com/neyadrian/sistema-gps",
  },
  {
    key: "cinema",
    icon: "ri-film-line",
    tags: ["Java", "OOP", "Arrays"],
    link: "https://github.com/neyadrian/sistema-cinema",
  },
  {
    key: "rh",
    icon: "ri-group-line",
    tags: ["Java", "OOP", "Collections"],
    link: "https://github.com/neyadrian/gestao-rh",
  },
  {
    key: "logitrack",
    icon: "ri-truck-line",
    tags: ["Java", "Design Patterns", "SOLID"],
    link: "https://github.com/neyadrian/Logi-Track",
  },
  {
    key: "supermercado",
    icon: "ri-shopping-cart-2-line",
    tags: ["Java", "Sockets", "TCP/UDP"],
    link: "https://github.com/neyadrian/sistema-supermercado",
  },
  {
    key: "geladao",
    icon: "ri-box-3-line",
    tags: ["Java", "Spring Boot", "Estoque"],
    link: "https://github.com/neyadrian/geladao-bebidas",
    featured: true,
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

  const featuredProjects = projectMeta.filter((p) => p.featured);
  const rest = projectMeta.filter((p) => !p.featured);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <p className="section-label fade-up">{t.projects.label}</p>
      <h2 className="section-title fade-up stagger-1">
        {t.projects.title} <span className="dim">{t.projects.titleDim}</span>
      </h2>

      {featuredProjects.map((featured, i) => (
        <a
          key={featured.key}
          href={featured.link}
          target="_blank"
          rel="noreferrer"
          className={`project-card project-card-featured fade-up stagger-${Math.min(i + 2, 5)}`}
        >
          <div className="project-header">
            <div className="project-icon"><i className={featured.icon}></i></div>
            <div className="project-tags">
              <span className="featured-badge">{t.projects.featured}</span>
              {featured.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
          </div>
          <h3 className="project-title">{t.projects.items[featured.key].title}</h3>
          <p className="project-desc">{t.projects.items[featured.key].desc}</p>
          <span className="project-link">{t.projects.visitSite} <i className="ri-arrow-right-line"></i></span>
        </a>
      ))}

      <div className="projects-grid">
        {rest.map((p, i) => (
          <div
            key={p.key}
            className={`project-card fade-up stagger-${Math.min(i + 3, 5)}`}
          >
            <div className="project-header">
              <div className="project-icon"><i className={p.icon}></i></div>
              <div className="project-tags">
                {p.tags.map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </div>
            <h3 className="project-title">{t.projects.items[p.key].title}</h3>
            <p className="project-desc">{t.projects.items[p.key].desc}</p>
            <a href={p.link} target="_blank" rel="noreferrer" className="project-link">
              {t.projects.viewGithub} <i className="ri-arrow-right-line"></i>
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
