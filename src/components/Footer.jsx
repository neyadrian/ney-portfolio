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

function MarqueeRow({ items }) {
  const loop = [...items, ...items];
  return (
    <div className="footer-marquee-track">
      {loop.map((item, i) => (
        <span key={`${item}-${i}`} className="footer-marquee-item">
          {item}
          <span className="footer-marquee-dot">✦</span>
        </span>
      ))}
    </div>
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

      <div className="footer-marquee" aria-hidden="true">
        <MarqueeRow items={f.marquee} />
      </div>

      <div className="footer-main">
        <h2 className="footer-heading">{f.ready}</h2>

        <nav className="footer-pills" aria-label="Sections">
          {navLinks.map((link) => (
            <a key={link.href} href={link.href} className="footer-pill">
              {link.label}
            </a>
          ))}
        </nav>

        <div className="footer-pills footer-pills-social">
          {socials.map((s) => (
            <a
              key={s.label}
              href={s.href}
              target="_blank"
              rel="noreferrer"
              className="footer-pill footer-pill-sm"
            >
              {s.label}
            </a>
          ))}
        </div>
      </div>

      <p className="footer-copy">
        © {year} Ney Adrian. {f.tagline}
      </p>
    </footer>
  );
}
