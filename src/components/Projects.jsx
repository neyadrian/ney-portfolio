import { useEffect, useRef } from "react";

const projects = [
  {
    icon: "✅",
    tags: ["Java", "Spring"],
    title: "To-Do List",
    desc: "Aplicação para criar, organizar e concluir tarefas, focada em organização e produtividade do usuário.",
    link: "https://github.com/neyadrian/todolist-java",
    linkLabel: "Ver no GitHub",
  },
  {
    icon: "🗺️",
    tags: ["C", "Grafos", "Dijkstra"],
    title: "Sistema de GPS",
    desc: "Sistema em C que usa grafos e Dijkstra para calcular o caminho mais curto entre cidades, com persistência em arquivo e log automático.",
    link: "https://github.com/neyadrian/sistema-gps",
    linkLabel: "Ver no GitHub",
  },
  {
    icon: "👴",
    tags: ["Photoshop", "UI/UX"],
    title: "Inclusão Digital na Melhor Idade",
    desc: "Projeto IDMI — ensina pessoas a usar tecnologia para ganhar autonomia, segurança e conexão social no mundo digital.",
    link: "https://github.com/neyadrian/sistema-gps",
    linkLabel: "Ver Projeto",
  },
];

export default function Projects() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll(".fade-up").forEach((el, i) => {
              setTimeout(() => el.classList.add("visible"), i * 120);
            });
          }
        });
      },
      { threshold: 0.1 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="projects-section" id="projects" ref={sectionRef}>
      <p className="section-label fade-up">Portfólio</p>
      <h2 className="section-title fade-up stagger-1">
        Projetos <span className="dim">recentes</span>
      </h2>
      <div className="projects-grid">
        {projects.map((p, i) => (
          <div
            key={p.title}
            className={`project-card fade-up stagger-${Math.min(i + 2, 5)}`}
          >
            <div className="project-header">
              <div className="project-icon">{p.icon}</div>
              <div className="project-tags">
                {p.tags.map((t) => (
                  <span key={t} className="tag">{t}</span>
                ))}
              </div>
            </div>
            <h3 className="project-title">{p.title}</h3>
            <p className="project-desc">{p.desc}</p>
            <a
              href={p.link}
              target="_blank"
              rel="noreferrer"
              className="project-link"
            >
              {p.linkLabel} →
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}
