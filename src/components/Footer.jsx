import { useEffect, useRef } from "react";
import { useLanguage } from "../context/LanguageContext";

const socials = [
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/ney-adrian-casimiro-oliveira-567b902bb/",
  },
  {
    label: "GitHub",
    href: "https://github.com/neyadrian",
  },
  {
    label: "WhatsApp",
    href: "https://wa.me/5588993318560",
  },
];

function MagneticPill({ href, children }) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const onMove = (e) => {
      const rect = el.getBoundingClientRect();
      const x = e.clientX - rect.left - rect.width / 2;
      const y = e.clientY - rect.top - rect.height / 2;
      el.style.transform = `translate(${x * 0.35}px, ${y * 0.35}px) scale(1.05)`;
    };
    const onLeave = () => {
      el.style.transform = "translate(0, 0) scale(1)";
    };

    el.addEventListener("mousemove", onMove);
    el.addEventListener("mouseleave", onLeave);
    return () => {
      el.removeEventListener("mousemove", onMove);
      el.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <a
      ref={ref}
      href={href}
      target="_blank"
      rel="noreferrer"
      className="footer-pill"
    >
      {children}
    </a>
  );
}

export default function Footer() {
  const { t } = useLanguage();
  const year = new Date().getFullYear();
  const f = t.footer;

  const navLinks = [
    { label: t.nav.home, href: "#home" },
    { label: t.nav.about, href: "#about" },
    { label: t.nav.skills, href: "#skills" },
    { label: t.nav.projects, href: "#projects" },
    { label: t.nav.contact, href: "#contact" },
  ];

  return (
    <footer id="contact" className="site-footer">
      <div className="footer-aurora" aria-hidden="true" />
      <div className="footer-bg-grid" aria-hidden="true" />
      <div className="footer-giant" aria-hidden="true">
        NEY
      </div>

      <div className="footer-main">
        <h2 className="footer-heading">{f.ready}</h2>

        <nav className="footer-nav-text" aria-label="Sections">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-pills">
          {socials.map((s) => (
            <MagneticPill key={s.label} href={s.href}>
              {s.label}
            </MagneticPill>
          ))}
        </div>
      </div>

      <p className="footer-copy">
        © {year} Ney Adrian. {f.tagline}
      </p>
    </footer>
  );
}
