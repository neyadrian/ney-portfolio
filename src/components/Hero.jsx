import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";
import FlowButton from "./FlowButton";
import HalftoneFlowHero from "./HalftoneFlowHero";

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
    <section className="hero" id="home">
      <HalftoneFlowHero />

      <div className="hero-inner">
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
      </div>
    </section>
  );
}
