import React, { useState, useCallback, useMemo } from "react";
import { motion } from "framer-motion";

const THEMES = {
  primary: "linear-gradient(to bottom right, #334155, #1e293b, #0f172a)",
  secondary: "linear-gradient(to bottom right, #2563eb, #1d4ed8, #1e40af)",
  accent: "linear-gradient(to bottom right, #9333ea, #7e22ce, #6b21a8)",
  success: "linear-gradient(to bottom right, #059669, #047857, #065f46)",
  warning: "linear-gradient(to bottom right, #d97706, #b45309, #92400e)",
  danger: "linear-gradient(to bottom right, #dc2626, #b91c1c, #991b1b)",
  info: "linear-gradient(to bottom right, #0891b2, #0e7490, #155e75)",
  neutral: "linear-gradient(to bottom right, #4b5563, #374151, #1f2937)",
};

const Card3D = React.forwardRef(function Card3D(
  {
    title,
    description,
    icon,
    theme = "primary",
    gradient,
    className = "",
    size = "md",
    variant = "premium",
  },
  ref
) {
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [hovered, setHovered] = useState(false);

  const finalGradient = useMemo(
    () => gradient || THEMES[theme] || THEMES.primary,
    [gradient, theme]
  );
  const patternId = useMemo(
    () => `pattern-${theme}-${String(title).replace(/\s+/g, "-").toLowerCase()}`,
    [theme, title]
  );

  const handleMove = useCallback((e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setMousePos({
      x: (x / rect.width - 0.5) * 25,
      y: (y / rect.height - 0.5) * -25,
    });
  }, []);

  const handleEnter = useCallback(() => setHovered(true), []);

  const handleLeave = useCallback(() => {
    setHovered(false);
    setMousePos({ x: 0, y: 0 });
  }, []);

  return (
    <motion.div
      ref={ref}
      className={`card3d card3d-${size} card3d-${variant} ${className}`.trim()}
      onMouseMove={handleMove}
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      animate={{
        rotateX: mousePos.y,
        rotateY: mousePos.x,
        z: hovered ? 30 : 0,
      }}
      transition={{ type: "spring", stiffness: 400, damping: 35, mass: 0.8 }}
      style={{ transformStyle: "preserve-3d", perspective: "1200px" }}
      role="article"
    >
      <motion.div
        className="card3d-bg"
        animate={{ scale: hovered ? 1.02 : 1 }}
        transition={{ duration: 0.4 }}
        style={{ background: finalGradient, transform: "translateZ(-10px)" }}
      />

      <div className="card3d-pattern">
        <svg className="card3d-pattern-svg" viewBox="0 0 100 100">
          <defs>
            <pattern
              id={patternId}
              x="0"
              y="0"
              width="20"
              height="20"
              patternUnits="userSpaceOnUse"
            >
              <circle cx="10" cy="10" r="1" fill="currentColor" opacity="0.3" />
            </pattern>
          </defs>
          <rect width="100" height="100" fill={`url(#${patternId})`} />
        </svg>
        <motion.div
          className="card3d-ornament"
          animate={{ rotate: hovered ? 180 : 0 }}
          transition={{ duration: 0.8 }}
        >
          <svg viewBox="0 0 100 100">
            <rect x="20" y="20" width="60" height="60" fill="none" stroke="currentColor" strokeWidth="1" rx="8" />
            <rect x="35" y="35" width="30" height="30" fill="none" stroke="currentColor" strokeWidth="0.5" rx="4" />
          </svg>
        </motion.div>
      </div>

      <motion.div
        className="card3d-shade"
        style={{ transform: "translateZ(5px)" }}
        animate={{ opacity: hovered ? 0.5 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div className="card3d-shine" style={{ transform: "translateZ(15px)" }}>
        <motion.div
          className="card3d-shine-inner"
          animate={{
            background: hovered
              ? `linear-gradient(${mousePos.x + 135}deg, transparent 40%, rgba(255,255,255,0.25) 50%, transparent 60%)`
              : "transparent",
          }}
          transition={{ duration: 0.3 }}
        />
      </motion.div>

      <motion.div className="card3d-body" style={{ transform: "translateZ(20px)" }}>
        <div className="card3d-top">
          {icon && (
            <motion.div
              className="card3d-icon"
              animate={{ rotateZ: hovered ? 5 : 0, y: hovered ? -2 : 0 }}
              transition={{ duration: 0.3 }}
            >
              {icon}
            </motion.div>
          )}
          <motion.div
            className="card3d-dot-wrap"
            animate={{ scale: hovered ? 1.2 : 1 }}
            transition={{ duration: 0.3 }}
          >
            <div className="card3d-dot" />
            <motion.div
              className="card3d-dot-pulse"
              animate={{
                scale: hovered ? [1, 1.4, 1] : 1,
                opacity: hovered ? [0.7, 0.3, 0.7] : 0.7,
              }}
              transition={{
                duration: 1.5,
                repeat: hovered ? Infinity : 0,
                ease: "easeInOut",
              }}
            />
          </motion.div>
        </div>

        <motion.div
          className="card3d-copy"
          animate={{ y: hovered ? -3 : 0 }}
          transition={{ duration: 0.3 }}
        >
          <motion.h3
            animate={{ scale: hovered ? 1.02 : 1 }}
            transition={{ duration: 0.3 }}
          >
            {title}
          </motion.h3>
          <motion.p
            animate={{ opacity: hovered ? 1 : 0.85 }}
            transition={{ duration: 0.3 }}
          >
            {description}
          </motion.p>
        </motion.div>
      </motion.div>

      <motion.div
        className="card3d-gloss"
        style={{ transform: "translateZ(25px)" }}
        animate={{ opacity: hovered ? 1 : 0.7 }}
        transition={{ duration: 0.3 }}
      />

      <motion.div
        className="card3d-glow"
        style={{ background: finalGradient }}
        animate={{ opacity: hovered ? 0.2 : 0 }}
        transition={{ duration: 0.4 }}
      />
    </motion.div>
  );
});

export default Card3D;
