import { useEffect, useRef } from "react";

export default function Hero() {
  const textRef = useRef(null);

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
  }, []);

  return (
    <section className="hero" id="about">
      <div className="hero-bg-grid" />

      <div className="hero-text" ref={textRef}>
        <div className="role-badge">
          <span className="badge-dot" />
          Back-End Developer
        </div>

        <h1>
          Construindo a lógica por trás da{" "}
          <span className="highlight">inovação.</span>
        </h1>

        <p className="hero-desc">
          Desenvolvedor Back-End em Java, Spring e C.<br />
          Estudante de Engenharia de Software pelo IFCE.
        </p>

        <div className="btn-group">
          <a href="#projects" className="btn btn-primary">
            Ver Projetos →
          </a>
          <a
            href="https://www.linkedin.com/in/ney-adrian-casimiro-oliveira-567b902bb/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            LinkedIn ↗
          </a>
        </div>
      </div>

      <div className="hero-visual">
        <div className="img-frame">
          <div className="img-glow" />
          <div className="img-border">
            <img src="Design sem nome (2).png" alt="Ney Adrian"
              onError={e => { e.target.style.display = "none"; e.target.parentNode.innerHTML += "👨‍💻"; }} />
          </div>
          <div className="img-corner tl" />
          <div className="img-corner tr" />
          <div className="img-corner bl" />
          <div className="img-corner br" />
        </div>

        <div className="floating-stat stat1">
          <div className="stat-num">2+</div>
          <div className="stat-label">anos estudando</div>
        </div>

        <div className="floating-stat stat2">
          <div className="stat-num">3+</div>
          <div className="stat-label">projetos</div>
        </div>
      </div>

      <div className="scroll-indicator">
        <div className="scroll-line" />
        SCROLL
      </div>
    </section>
  );
}
