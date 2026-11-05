import { useState, useEffect, useLayoutEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Home, User, Code2, Briefcase, Mail } from "lucide-react";
import { useLanguage } from "../context/LanguageContext";
import LogoTypewriter from "./LogoTypewriter";

const SECTION_IDS = ["home", "about", "skills", "projects", "contact"];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("home");
  const [lamp, setLamp] = useState({ x: 0, width: 0 });
  const lockUntil = useRef(0);
  const innerRef = useRef(null);
  const linkRefs = useRef({});
  const { lang, toggleLang, t } = useLanguage();

  const items = [
    { id: "home", name: t.nav.home, url: "#home", icon: Home },
    { id: "about", name: t.nav.about, url: "#about", icon: User },
    { id: "skills", name: t.nav.skills, url: "#skills", icon: Code2 },
    { id: "projects", name: t.nav.projects, url: "#projects", icon: Briefcase },
    { id: "contact", name: t.nav.contact, url: "#contact", icon: Mail },
  ];

  const goTo = (id) => {
    const el = document.getElementById(id);
    if (!el) return;
    lockUntil.current = Date.now() + 900;
    setActiveTab(id);
    el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 48);
      if (Date.now() < lockUntil.current) return;
      let current = "home";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (!el) continue;
        if (el.getBoundingClientRect().top <= 140) current = id;
      }
      setActiveTab(current);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useLayoutEffect(() => {
    const nav = innerRef.current;
    const link = linkRefs.current[activeTab];
    if (!nav || !link) return;
    const navBox = nav.getBoundingClientRect();
    const box = link.getBoundingClientRect();
    setLamp({ x: box.left - navBox.left, width: box.width });
  }, [activeTab, lang, scrolled]);

  return (
    <motion.header
      className={`header ${scrolled ? "scrolled" : "floating"}`}
      animate={{
        paddingTop: scrolled ? 8 : 22,
        paddingBottom: scrolled ? 8 : 0,
      }}
      transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
    >
      <div className="header-brand">
        <a href="#home" onClick={(e) => { e.preventDefault(); goTo("home"); }}>
          <LogoTypewriter />
        </a>
      </div>

      <nav className="tube-nav" aria-label="Primary">
        <div className="tube-nav-inner" ref={innerRef}>
          <motion.div
            className="tube-lamp"
            animate={{ x: lamp.x, width: lamp.width }}
            transition={{ type: "spring", stiffness: 380, damping: 36, mass: 0.7 }}
          >
            <div className="tube-lamp-cap">
              <div className="tube-glow g1" />
              <div className="tube-glow g2" />
              <div className="tube-glow g3" />
            </div>
          </motion.div>
          {items.map((item) => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <a
                key={item.id}
                href={item.url}
                ref={(node) => {
                  linkRefs.current[item.id] = node;
                }}
                onClick={(e) => {
                  e.preventDefault();
                  goTo(item.id);
                }}
                className={`tube-link ${isActive ? "active" : ""}`}
              >
                <span className="tube-label">{item.name}</span>
                <span className="tube-icon">
                  <Icon size={18} strokeWidth={2.5} />
                </span>
              </a>
            );
          })}
        </div>
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
    </motion.header>
  );
}
