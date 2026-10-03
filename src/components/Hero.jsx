import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import FlowButton from "./FlowButton";

export default function Hero() {
  const textRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    const el = textRef.current;
    if (!el) return;
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    const id = setTimeout(() => {
      el.style.transition = "opacity 0.8s ease, transform 0.8s ease";
      el.style.opacity = "1";
      el.style.transform = "translateY(0)";
    }, 100);
    return () => clearTimeout(id);
  }, []);

  return (
    <section className="hero" id="about">
      <div className="hero-bg-grid" />

      <div className="hero-text" ref={textRef}>
        <div className="role-badge">
          <span className="badge-dot" />
          {t.hero.badge}
        </div>

        <h1>
          {t.hero.titleLine}{" "}
          <span className="highlight">{t.hero.titleHighlight}</span>
        </h1>

        <p className="hero-desc">{t.hero.desc}</p>

        <div className="btn-group">
          <a
            href="https://www.linkedin.com/in/ney-adrian-casimiro-oliveira-567b902bb/"
            target="_blank"
            rel="noreferrer"
            className="btn btn-ghost"
          >
            <i className="ri-linkedin-fill"></i>
            {t.hero.ctaLinkedin}
          </a>
          <FlowButton
            text={t.hero.ctaWhatsapp}
            href="https://wa.me/5588993318560"
            target="_blank"
            rel="noreferrer"
          />
        </div>
      </div>

      <div className="hero-visual">
        <div className="img-frame">
          <div className="img-glow" />
          <div className="img-border">
            <img src="/ney-portfolio/foto.jpeg" alt="Ney Adrian" />
          </div>
          <div className="img-corner tl" />
          <div className="img-corner tr" />
          <div className="img-corner bl" />
          <div className="img-corner br" />
        </div>

        <div className="terminal-card">
          <div className="terminal-dots">
            <span />
            <span />
            <span />
          </div>
          <p className="terminal-label">{t.hero.terminalLabel}</p>
          <p className="terminal-line">
            <span className="prompt">$</span>
            {t.hero.terminalCmd}
          </p>
          <p className="terminal-output">{t.hero.terminalOutput1}</p>
          <p className="terminal-output">{t.hero.terminalOutput2}</p>
        </div>
      </div>
    </section>
  );
}
