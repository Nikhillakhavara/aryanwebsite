import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          50: "#e6fff3",
          100: "#ccffe7",
          200: "#99ffcf",
          300: "#66ffb7",
          400: "#33ff9f",
          500: "#00C16E",
          600: "#00A85E",
          700: "#008f4f",
          800: "#007640",
          900: "#005d32",
        },
        gold: {
          100: "#fdf3c7",
          200: "#fbe48f",
          300: "#f8d057",
          400: "#D4AF37",
          500: "#B8960C",
          600: "#9a7b08",
          700: "#7c6006",
        },
        dark: {
          900: "#0B0B0B",
          800: "#161616",
          700: "#1F1F1F",
          600: "#2A2A2A",
          500: "#363636",
          400: "#424242",
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-conic":
          "conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))",
        "hero-pattern":
          "linear-gradient(135deg, #0B0B0B 0%, #161616 50%, #0B0B0B 100%)",
      },
      animation: {
        float: "float 6s ease-in-out infinite",
        glow: "glow 2s ease-in-out infinite alternate",
        shimmer: "shimmer 2s linear infinite",
        particle: "particle 8s ease-in-out infinite",
        "pulse-slow": "pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "spin-slow": "spin 8s linear infinite",
        "bounce-slow": "bounce 3s infinite",
        "ping-slow": "ping 2s cubic-bezier(0, 0, 0.2, 1) infinite",
        "fade-in": "fadeIn 0.5s ease-in-out",
        "slide-up": "slideUp 0.5s ease-out",
        "slide-down": "slideDown 0.5s ease-out",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00C16E, 0 0 10px #00C16E" },
          "100%": {
            boxShadow: "0 0 20px #00C16E, 0 0 40px #00C16E, 0 0 60px #00C16E",
          },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        particle: {
          "0%, 100%": { transform: "translate(0, 0) scale(1)", opacity: "0.5" },
          "33%": {
            transform: "translate(30px, -50px) scale(1.2)",
            opacity: "1",
          },
          "66%": {
            transform: "translate(-20px, 30px) scale(0.8)",
            opacity: "0.7",
          },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        slideUp: {
          "0%": { transform: "translateY(20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
        slideDown: {
          "0%": { transform: "translateY(-20px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" },
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

export default config;
