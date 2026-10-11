import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PREFIX = "<Ney";
const ACCENT = "Adrian";
const SUFFIX = "/>";
const FULL = `${PREFIX}${ACCENT}${SUFFIX}`;
const TYPE_MS = 70;
const LOOP_MS = 60_000;

export default function LogoTypewriter() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    const delay = count >= FULL.length ? LOOP_MS : TYPE_MS;
    const timeout = window.setTimeout(
      () => setCount((value) => (value >= FULL.length ? 0 : value + 1)),
      delay
    );
    return () => window.clearTimeout(timeout);
  }, [count]);

  const visible = FULL.slice(0, count);
  const prefix = visible.slice(0, PREFIX.length);
  const accent = visible.slice(PREFIX.length, PREFIX.length + ACCENT.length);
  const suffix = visible.slice(PREFIX.length + ACCENT.length);

  return (
    <div className="logo typewriter" aria-label={FULL}>
      {prefix}
      {accent ? <span>{accent}</span> : null}
      {suffix}
      <motion.span
        aria-hidden
        className="typewriter-caret"
        animate={{ opacity: [1, 0, 1] }}
        transition={{ duration: 0.7, repeat: Infinity, ease: "linear" }}
      />
    </div>
  );
}
