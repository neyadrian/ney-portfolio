import { useMemo, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import foto from "../assets/foto.jpeg";

export default function About() {
  const { t } = useLanguage();
  const a = t.about;
  const [index, setIndex] = useState(0);

  const slides = useMemo(
    () =>
      (a.slides || []).map((slide) => ({
        title: slide.title,
        kicker: slide.kicker,
        body: slide.body,
      })),
    [a]
  );

  const current = slides[index] || slides[0];
  const next = () => setIndex((i) => (i + 1) % slides.length);
  const prev = () => setIndex((i) => (i - 1 + slides.length) % slides.length);

  if (!current) return null;

  return (
    <section className="about" id="about">
      <p className="section-label">{a.label}</p>
      <h2 className="section-title">
        {a.title} <span className="dim">{a.titleDim}</span>
      </h2>

      <div className="about-carousel">
        <div className="about-stage">
          <div className="about-photo">
            <img src={foto} alt={a.name} draggable={false} />
          </div>

          <div className="about-card">
            <AnimatePresence mode="wait">
              <motion.div
                key={`${current.title}-${index}`}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.35, ease: "easeInOut" }}
              >
                <p className="about-kicker">{current.kicker}</p>
                <h3>{current.title}</h3>
                <p className="about-body">{current.body}</p>
                <div className="about-socials">
                  <a
                    href="https://github.com/neyadrian"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="GitHub"
                  >
                    <i className="ri-github-fill" />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/ney-adrian-casimiro-oliveira-567b902bb/"
                    target="_blank"
                    rel="noreferrer"
                    aria-label="LinkedIn"
                  >
                    <i className="ri-linkedin-fill" />
                  </a>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>

        <div className="about-nav">
          <button type="button" onClick={prev} aria-label="Previous">
            <ChevronLeft size={22} />
          </button>
          <div className="about-dots">
            {slides.map((_, i) => (
              <button
                key={i}
                type="button"
                className={i === index ? "active" : ""}
                onClick={() => setIndex(i)}
                aria-label={`Slide ${i + 1}`}
              />
            ))}
          </div>
          <button type="button" onClick={next} aria-label="Next">
            <ChevronRight size={22} />
          </button>
        </div>
      </div>
    </section>
  );
}
