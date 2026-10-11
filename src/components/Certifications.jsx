import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const CREDLY_SRC = "https://cdn.credly.com/assets/utilities/embed.js";

const certs = [
  {
    key: "aws",
    href: "https://www.credly.com/badges/deb3a6b1-186a-413f-9322-ff8380e5745c",
    embed: true,
  },
  {
    key: "google",
    href: "https://www.coursera.org/professional-certificates/google-it-support",
    image: "/ney-portfolio/badges/google-it-support.svg",
  },
];

function loadCredly() {
  if (document.querySelector(`script[src="${CREDLY_SRC}"]`)) {
    window.credly_refresh?.();
    return;
  }
  const script = document.createElement("script");
  script.src = CREDLY_SRC;
  script.async = true;
  document.body.appendChild(script);
}

export default function Certifications() {
  const sectionRef = useRef(null);
  const { t } = useLanguage();

  useEffect(() => {
    loadCredly();
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

  return (
    <section className="certs-section" id="certifications" ref={sectionRef}>
      <p className="section-label fade-up">{t.certs.label}</p>
      <h2 className="section-title fade-up stagger-1">
        {t.certs.title} <span className="dim">{t.certs.titleDim}</span>
      </h2>
      <div className="certs-grid fade-up stagger-2">
        {certs.map((cert) => (
          <article key={cert.key} className="cert-card">
            <div className="cert-badge">
              {cert.embed ? (
                <div
                  data-iframe-width="150"
                  data-iframe-height="270"
                  data-share-badge-id="deb3a6b1-186a-413f-9322-ff8380e5745c"
                  data-share-badge-host="https://www.credly.com"
                />
              ) : (
                <a href={cert.href} target="_blank" rel="noreferrer">
                  <img src={cert.image} alt={t.certs.items[cert.key].title} />
                </a>
              )}
            </div>
            {cert.embed ? null : (
              <>
                <h3>{t.certs.items[cert.key].title}</h3>
                <p>{t.certs.items[cert.key].issuer}</p>
              </>
            )}
            <a href={cert.href} target="_blank" rel="noreferrer" className="cert-link">
              {t.certs.verify}
            </a>
          </article>
        ))}
      </div>
    </section>
  );
}
