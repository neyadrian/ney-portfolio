import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const skills = [
  { icon: "devicon-java-plain colored", label: "Java" },
  { icon: "devicon-spring-original colored", label: "Spring Boot" },
  { icon: "devicon-c-plain colored", label: "C" },
  { icon: "devicon-mysql-plain colored", label: "MySQL" },
  { icon: "devicon-postgresql-plain colored", label: "PostgreSQL" },
  { icon: "devicon-hibernate-plain colored", label: "Hibernate / JPA" },
  { icon: "devicon-maven-plain colored", label: "Maven" },
  { icon: "devicon-docker-plain colored", label: "Docker" },
  { icon: "devicon-git-plain colored", label: "Git" },
  { icon: "devicon-github-original colored", label: "GitHub" },
  { icon: "devicon-postman-plain colored", label: "Postman" },
];

export default function Skills() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

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
      { threshold: 0.15 }
    );
    if (sectionRef.current) observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  return (
    <section className="skills-section" id="skills" ref={sectionRef}>
      <p className="section-label fade-up">{t.skills.label}</p>
      <h2 className="section-title fade-up stagger-1">
        {t.skills.title} <span className="dim">{t.skills.titleDim}</span>
      </h2>
      <div className="skills-grid">
        {skills.map((s, i) => (
          <div
            key={s.label}
            className={`skill-card fade-up stagger-${Math.min(i + 1, 5)}`}
          >
            <i className={s.icon} />
            <span>{s.label}</span>
          </div>
        ))}
      </div>
    </section>
  );
}
