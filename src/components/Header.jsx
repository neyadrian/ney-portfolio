import { useState, useEffect } from "react";
import { useTheme } from "../context/ThemeContext";
import { useLanguage } from "../context/LanguageContext";

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { lang, toggleLang, t } = useLanguage();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`header ${scrolled ? "scrolled" : ""}`}>
      <div className="logo">&lt;Ney<span>Adrian</span>/&gt;</div>

      <nav>
        <ul>
          <li><a href="#about">{t.nav.about}</a></li>
          <li><a href="#skills">{t.nav.skills}</a></li>
          <li><a href="#projects">{t.nav.projects}</a></li>
          <li><a href="#contact">{t.nav.contact}</a></li>
        </ul>
      </nav>

      <div className="header-controls">
        <button
          type="button"
          className="lang-toggle"
          onClick={toggleLang}
          aria-label={t.langToggle}
        >
          <span className={lang === "en" ? "active" : ""}>EN</span>
          <span className="divider">/</span>
          <span className={lang === "pt" ? "active" : ""}>PT</span>
        </button>


      </div>
    </header>
  );
}
