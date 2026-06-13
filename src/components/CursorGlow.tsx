"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CursorGlow() {
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const updatePosition = (e: MouseEvent) => {
      setPosition({ x: e.clientX, y: e.clientY });
      if (!isVisible) setIsVisible(true);
    };

    const handleLeave = () => setIsVisible(false);

    window.addEventListener("mousemove", updatePosition);
    document.addEventListener("mouseleave", handleLeave);

    return () => {
      window.removeEventListener("mousemove", updatePosition);
      document.removeEventListener("mouseleave", handleLeave);
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <>
      {/* Main cursor glow */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full"
        style={{
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(0, 193, 110, 0.04) 0%, transparent 70%)",
          left: position.x - 150,
          top: position.y - 150,
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
      />
      {/* Small cursor dot */}
      <motion.div
        className="fixed pointer-events-none z-50 rounded-full bg-brand-500"
        style={{
          width: 6,
          height: 6,
          left: position.x - 3,
          top: position.y - 3,
          boxShadow: "0 0 8px rgba(0, 193, 110, 0.8)",
        }}
        animate={{
          opacity: isVisible ? 1 : 0,
          scale: isVisible ? 1 : 0,
        }}
        transition={{ duration: 0.15 }}
      />
    </>
  );
}
