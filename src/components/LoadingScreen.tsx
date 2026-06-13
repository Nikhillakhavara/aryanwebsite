"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export default function LoadingScreen() {
  const [show, setShow] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShow(false), 2500);
    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-[9999] bg-dark-900 flex flex-col items-center justify-center"
          exit={{ opacity: 0, scale: 1.05 }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {/* Animated 8-ball */}
          <motion.div
            initial={{ scale: 0.5, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, ease: "easeOut" }}
            className="relative mb-8"
          >
            <motion.div
              className="w-24 h-24 rounded-full relative"
              style={{
                background: "radial-gradient(circle at 35% 35%, #2a2a2a, #000)",
                boxShadow: "0 0 30px rgba(0, 193, 110, 0.3), inset 0 0 20px rgba(0,0,0,0.5)",
              }}
              animate={{ rotate: 360 }}
              transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
            >
              {/* White circle with 8 */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-10 h-10 rounded-full bg-white flex items-center justify-center">
                  <span className="text-black font-black text-xl">8</span>
                </div>
              </div>
            </motion.div>

            {/* Glow ring */}
            <motion.div
              className="absolute inset-[-8px] rounded-full border-2 border-brand-500/30"
              animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.8, 0.3] }}
              transition={{ duration: 1.5, repeat: Infinity }}
            />
          </motion.div>

          {/* Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.6 }}
            className="text-center mb-8"
          >
            <h1 className="text-3xl font-black tracking-wider text-white mb-1">
              <span className="text-brand-500">BILLIARDS</span> CLUB{" "}
              <span className="text-gold-400">08</span>
            </h1>
            <p className="text-gray-500 text-sm tracking-widest uppercase">
              Ahmedabad&apos;s Premium Pool Experience
            </p>
          </motion.div>

          {/* Loading bar */}
          <motion.div
            className="w-64 h-0.5 bg-dark-700 rounded-full overflow-hidden"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            <motion.div
              className="h-full rounded-full"
              style={{
                background: "linear-gradient(90deg, #00C16E, #2563EB)",
              }}
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 2, delay: 0.5, ease: "easeInOut" }}
            />
          </motion.div>

          <motion.p
            className="text-gray-600 text-xs mt-3 tracking-widest uppercase"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8 }}
          >
            Loading...
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
