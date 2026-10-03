import { useLanguage } from "../context/LanguageContext";
import { motion } from "framer-motion";
import Card3D from "./Card3D";

const skills = [
  { key: "java", icon: "devicon-java-plain", theme: "warning" },
  { key: "spring", icon: "devicon-spring-original", theme: "success" },
  { key: "mysql", icon: "devicon-mysql-plain", theme: "info" },
  { key: "postgres", icon: "devicon-postgresql-plain", theme: "secondary" },
  { key: "docker", icon: "devicon-docker-plain", theme: "info" },
];

const itemVariants = {
  hidden: { opacity: 0, y: 40, rotateX: -15, scale: 0.95 },
  visible: {
    opacity: 1,
    y: 0,
    rotateX: 0,
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 12, mass: 0.7 },
  },
};

const containerVariants = {
  hidden: { opacity: 0, scale: 0.98 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.12,
      duration: 0.5,
      ease: [0.23, 1, 0.32, 1],
    },
  },
};

export default function Skills() {
  const { t } = useLanguage();

  return (
    <section className="skills-section" id="skills">
      <p className="section-label">{t.skills.label}</p>
      <h2 className="section-title">
        {t.skills.title} <span className="dim">{t.skills.titleDim}</span>
      </h2>
      <motion.div
        className="skills-3d-grid"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, amount: 0.2 }}
      >
        {skills.map((s) => (
          <motion.div
            key={s.key}
            className="skills-3d-item"
            variants={itemVariants}
          >
            <Card3D
              title={t.skills.items[s.key].title}
              description={t.skills.items[s.key].desc}
              icon={<i className={s.icon} />}
              theme={s.theme}
              size="md"
              variant="premium"
            />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
