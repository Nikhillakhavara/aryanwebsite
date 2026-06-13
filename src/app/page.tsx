"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { motion, AnimatePresence, useInView, useScroll, useTransform } from "framer-motion";
import {
  Zap,
  Star,
  Trophy,
  Shield,
  Clock,
  MapPin,
  Phone,
  MessageCircle,
  ChevronLeft,
  ChevronRight,
  Check,
  TrendingUp,
  Users,
  Target,
  Award,
  Wifi,
  Coffee,
  Music,
  Camera,
} from "lucide-react";
import TableCard from "@/components/TableCard";
import { DEMO_TABLES, DEMO_LEADERBOARD, DEMO_REVIEWS, DEMO_STATS } from "@/lib/demo";
import { formatCurrency } from "@/lib/utils";

const FEATURES = [
  { icon: <Trophy className="w-6 h-6" />, title: "Pro-Grade Tables", desc: "Championship-quality pool and snooker tables maintained to tournament standards" },
  { icon: <Zap className="w-6 h-6" />, title: "Instant Booking", desc: "Book your table in under 60 seconds — online, anytime, from anywhere" },
  { icon: <TrendingUp className="w-6 h-6" />, title: "Live Leaderboard", desc: "Track your rankings, compete with friends, climb the hall of fame" },
  { icon: <Shield className="w-6 h-6" />, title: "Secure Payments", desc: "Pay at venue with complete booking confirmation sent instantly" },
  { icon: <Wifi className="w-6 h-6" />, title: "High-Speed WiFi", desc: "Stay connected with complimentary high-speed internet throughout" },
  { icon: <Coffee className="w-6 h-6" />, title: "Premium Lounge", desc: "Relax in our exclusive lounge with premium beverages and snacks" },
  { icon: <Music className="w-6 h-6" />, title: "Curated Ambiance", desc: "Immersive lighting and music engineered for the ultimate game experience" },
  { icon: <Camera className="w-6 h-6" />, title: "24/7 Security", desc: "CCTV surveillance and professional security for your peace of mind" },
];

const MEMBERSHIPS = [
  {
    name: "Bronze",
    price: 999,
    period: "month",
    color: "#CD7F32",
    features: [
      "5% discount on bookings",
      "Priority booking (1 hour early)",
      "Monthly leaderboard access",
      "Free equipment rental",
      "Member-only events",
    ],
  },
  {
    name: "Silver",
    price: 1999,
    period: "month",
    color: "#C0C0C0",
    popular: true,
    features: [
      "15% discount on bookings",
      "Priority booking (3 hours early)",
      "All-time leaderboard access",
      "Free premium equipment",
      "Guest passes (2/month)",
      "Exclusive tournaments",
      "Lounge access",
    ],
  },
  {
    name: "Gold",
    price: 3999,
    period: "month",
    color: "#D4AF37",
    features: [
      "25% discount on bookings",
      "Instant priority booking",
      "Hall of Fame eligibility",
      "Dedicated table reservation",
      "Guest passes (5/month)",
      "VIP lounge access",
      "Personal score tracker",
      "Annual trophy ceremony",
    ],
  },
];

function SectionWrapper({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

export default function HomePage() {
  const [reviewIndex, setReviewIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const heroOpacity = useTransform(scrollY, [0, 600], [1, 0]);
  const heroY = useTransform(scrollY, [0, 600], [0, 150]);

  useEffect(() => {
    const timer = setInterval(() => {
      setReviewIndex((prev) => (prev + 1) % DEMO_REVIEWS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, []);

  const poolTables = DEMO_TABLES.filter((t) => t.tableType === "pool");
  const snookerTables = DEMO_TABLES.filter((t) => t.tableType === "snooker");

  return (
    <div className="bg-dark-900 min-h-screen">
      {/* ═══════════════ HERO SECTION ═══════════════ */}
      <section ref={heroRef} className="relative min-h-screen flex items-center overflow-hidden">
        {/* Animated background */}
        <div className="absolute inset-0">
          {/* Base gradient */}
          <div className="absolute inset-0 bg-gradient-to-br from-dark-900 via-dark-800 to-dark-900" />

          {/* Billiard ball pattern */}
          <div className="absolute inset-0 overflow-hidden">
            {[
              { size: 80, x: "10%", y: "20%", color: "#ff4444", delay: 0 },
              { size: 60, x: "85%", y: "15%", color: "#D4AF37", delay: 1 },
              { size: 100, x: "75%", y: "70%", color: "#4444ff", delay: 2 },
              { size: 50, x: "20%", y: "75%", color: "#00C16E", delay: 0.5 },
              { size: 70, x: "50%", y: "85%", color: "#ff8800", delay: 3 },
              { size: 40, x: "40%", y: "10%", color: "#ffffff", delay: 1.5 },
            ].map((ball, i) => (
              <motion.div
                key={i}
                className="absolute rounded-full opacity-5"
                style={{
                  width: ball.size,
                  height: ball.size,
                  left: ball.x,
                  top: ball.y,
                  background: `radial-gradient(circle at 35% 35%, ${ball.color}, ${ball.color}88)`,
                  boxShadow: `0 0 30px ${ball.color}44`,
                }}
                animate={{
                  y: [-20, 20, -20],
                  x: [-10, 10, -10],
                  rotate: [0, 360],
                }}
                transition={{
                  duration: 8 + i,
                  repeat: Infinity,
                  delay: ball.delay,
                  ease: "easeInOut",
                }}
              />
            ))}
          </div>

          {/* Green felt lines */}
          <div
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(0,193,110,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(0,193,110,0.3) 1px, transparent 1px)
              `,
              backgroundSize: "60px 60px",
            }}
          />

          {/* Bottom fade */}
          <div className="absolute bottom-0 left-0 right-0 h-48 bg-gradient-to-t from-dark-900 to-transparent" />
        </div>

        {/* Particles */}
        <div className="particles">
          {[...Array(5)].map((_, i) => (
            <div key={i} className="particle" />
          ))}
        </div>

        {/* Hero content */}
        <motion.div
          style={{ opacity: heroOpacity, y: heroY }}
          className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-24 pb-16"
        >
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              {/* Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-brand-500/10 border border-brand-500/30 text-brand-500 text-sm font-medium mb-6"
              >
                <span className="w-2 h-2 rounded-full bg-brand-500 animate-pulse" />
                Now Open · 12 PM – 12 AM Daily
              </motion.div>

              {/* Heading */}
              <motion.h1
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.7, delay: 0.1 }}
                className="text-5xl md:text-6xl xl:text-7xl font-black leading-[1.05] mb-6"
              >
                <span className="text-white">Ahmedabad&apos;s</span>
                <br />
                <span className="gradient-text">Most Premium</span>
                <br />
                <span className="text-white">Pool & Snooker</span>
              </motion.h1>

              {/* Subheading */}
              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
                className="text-gray-400 text-lg md:text-xl leading-relaxed mb-8 max-w-lg"
              >
                Book your table in seconds. Play like a champion. Eight
                professional-grade tables, zero waiting — just pure game.
              </motion.p>

              {/* CTAs */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: 0.3 }}
                className="flex flex-wrap gap-4"
              >
                <Link
                  href="/book"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg transition-all hover:shadow-xl hover:shadow-brand-500/30 hover:-translate-y-1"
                >
                  <Zap className="w-5 h-5" />
                  Book a Table
                </Link>
                <Link
                  href="/availability"
                  className="flex items-center gap-2 px-8 py-4 rounded-2xl border border-white/20 text-white hover:bg-white/5 hover:border-white/30 font-semibold text-lg transition-all hover:-translate-y-1"
                >
                  View Availability
                </Link>
              </motion.div>
            </div>

            {/* Live stats */}
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="flex flex-col gap-4"
            >
              {[
                { label: "Tables Available", value: `${DEMO_STATS.tablesAvailable} Tables`, icon: "🎱", color: "brand" },
                { label: "Players Today", value: `${DEMO_STATS.playersToday} Players`, icon: "👥", color: "blue" },
                { label: "Games Played", value: `${DEMO_STATS.totalGames.toLocaleString()} Games`, icon: "🏆", color: "gold" },
              ].map((stat, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.5 + i * 0.1 }}
                  whileHover={{ x: 4 }}
                  className="glass rounded-2xl p-5 flex items-center gap-4"
                >
                  <div className="text-3xl">{stat.icon}</div>
                  <div>
                    <div className="text-gray-500 text-xs font-medium uppercase tracking-wider">
                      {stat.label}
                    </div>
                    <div
                      className={`text-2xl font-black ${
                        stat.color === "brand"
                          ? "text-brand-500"
                          : stat.color === "gold"
                          ? "text-gold-400"
                          : "text-blue-400"
                      }`}
                    >
                      {stat.value}
                    </div>
                  </div>
                  <div className="ml-auto">
                    <div
                      className={`w-2 h-2 rounded-full animate-pulse ${
                        stat.color === "brand"
                          ? "bg-brand-500"
                          : stat.color === "gold"
                          ? "bg-gold-400"
                          : "bg-blue-400"
                      }`}
                    />
                  </div>
                </motion.div>
              ))}

              {/* Cue stick accent */}
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1, delay: 0.8 }}
                className="h-px bg-gradient-to-r from-transparent via-brand-500/50 to-transparent"
              />
            </motion.div>
          </div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          <div className="w-6 h-10 rounded-full border-2 border-white/20 flex items-center justify-center">
            <div className="w-1 h-3 rounded-full bg-brand-500/60" />
          </div>
        </motion.div>
      </section>

      {/* ═══════════════ TABLE AVAILABILITY ═══════════════ */}
      <section id="tables" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-medium mb-4">
              <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
              Real-Time Availability
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Choose Your <span className="neon-glow-text text-brand-500">Table</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              8 premium tables, all professionally maintained. Book instantly
              and start playing within minutes.
            </p>
          </div>

          {/* Pool Tables */}
          <div className="mb-12">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Pool Tables</h3>
                <p className="text-gray-500 text-sm">{formatCurrency(150)} per hour</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-brand-500/10 text-brand-500 border border-brand-500/20">
                {poolTables.filter((t) => t.status === "available").length} Available
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {poolTables.slice(0, 4).map((table, i) => (
                <TableCard key={table._id} table={table} index={i} />
              ))}
            </div>
          </div>

          {/* Snooker Tables */}
          <div>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Snooker Tables</h3>
                <p className="text-gray-500 text-sm">{formatCurrency(250)} per hour</p>
              </div>
              <span className="px-3 py-1 rounded-full text-xs font-medium bg-blue-500/10 text-blue-400 border border-blue-500/20">
                {snookerTables.filter((t) => t.status === "available").length} Available
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
              {snookerTables.map((table, i) => (
                <TableCard key={table._id} table={table} index={i} />
              ))}
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ BOOKING SECTION ═══════════════ */}
      <section id="book" className="py-20 bg-dark-800/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-medium mb-4">
                <Zap className="w-3 h-3" />
                Lightning Fast Booking
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Book a Table{" "}
                <span className="gradient-text">Right Now</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Three simple steps. Under 60 seconds. Your table is waiting.
              </p>
            </div>

            <div className="grid lg:grid-cols-2 gap-12 items-center">
              {/* Left: Steps */}
              <div className="space-y-6">
                {[
                  { step: 1, title: "Choose Your Game", desc: "Select pool or snooker, pick your preferred table" },
                  { step: 2, title: "Pick Date & Time", desc: "Choose your slot from real-time availability" },
                  { step: 3, title: "Confirm & Play", desc: "Get instant confirmation — pay at the venue" },
                ].map((item) => (
                  <motion.div
                    key={item.step}
                    whileHover={{ x: 4 }}
                    className="flex items-start gap-4 glass rounded-2xl p-5"
                  >
                    <div className="w-10 h-10 rounded-xl bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-brand-500 font-black text-lg shrink-0">
                      {item.step}
                    </div>
                    <div>
                      <h4 className="font-bold text-white mb-1">{item.title}</h4>
                      <p className="text-gray-500 text-sm">{item.desc}</p>
                    </div>
                  </motion.div>
                ))}

                <div className="glass rounded-2xl p-5 border border-brand-500/20">
                  <div className="flex items-center gap-3 mb-3">
                    <Clock className="w-5 h-5 text-brand-500" />
                    <span className="font-semibold text-white">Opening Hours</span>
                  </div>
                  <div className="text-gray-400">
                    <p className="text-2xl font-black text-white">12:00 PM – 12:00 AM</p>
                    <p className="text-sm text-gray-500 mt-1">Open 7 days a week, 365 days a year</p>
                  </div>
                </div>
              </div>

              {/* Right: Quick book CTA */}
              <div className="glass rounded-3xl p-8 text-center border border-brand-500/20">
                <div className="text-6xl mb-6">🎱</div>
                <h3 className="text-2xl font-black text-white mb-3">Ready to Play?</h3>
                <p className="text-gray-500 mb-6">
                  Book your table instantly. No registration required for basic bookings.
                </p>
                <Link
                  href="/book"
                  className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold text-lg w-full justify-center transition-all hover:shadow-xl hover:shadow-brand-500/30"
                >
                  <Zap className="w-5 h-5" />
                  Book Now — It&apos;s Free
                </Link>
                <p className="text-gray-600 text-xs mt-4">
                  Pay only at the venue · Instant confirmation
                </p>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════ WHY CHOOSE US ═══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Why <span className="gold-text">Club 08</span>?
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              We&apos;ve reimagined the billiards experience from the ground up.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {FEATURES.map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05, duration: 0.5 }}
                viewport={{ once: true }}
                whileHover={{ y: -4 }}
                className="glass rounded-2xl p-5 card-hover group"
              >
                <div className="w-11 h-11 rounded-xl bg-brand-500/10 group-hover:bg-brand-500/20 transition-colors flex items-center justify-center text-brand-500 mb-4">
                  {feature.icon}
                </div>
                <h4 className="font-bold text-white mb-2">{feature.title}</h4>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ MEMBERSHIP ═══════════════ */}
      <section id="membership" className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-12">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs font-medium mb-4">
                <Award className="w-3 h-3" />
                Exclusive Memberships
              </div>
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Level Up Your <span className="gold-text">Game</span>
              </h2>
              <p className="text-gray-500 max-w-xl mx-auto">
                Join our membership and unlock exclusive benefits, discounts, and privileges.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {MEMBERSHIPS.map((plan, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -6 }}
                  className={`relative glass rounded-3xl p-7 transition-all duration-300 ${
                    plan.popular
                      ? "border border-gold-400/40 shadow-2xl shadow-gold-400/10"
                      : "border border-white/10"
                  }`}
                >
                  {plan.popular && (
                    <div
                      className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold text-dark-900"
                      style={{ background: plan.color }}
                    >
                      Most Popular
                    </div>
                  )}

                  {/* Header */}
                  <div className="mb-6">
                    <div
                      className="w-12 h-12 rounded-2xl flex items-center justify-center mb-3 text-2xl"
                      style={{ background: `${plan.color}20`, border: `1px solid ${plan.color}40` }}
                    >
                      {i === 0 ? "🥉" : i === 1 ? "🥈" : "🥇"}
                    </div>
                    <h3 className="text-xl font-black text-white">{plan.name}</h3>
                    <div className="mt-2">
                      <span className="text-4xl font-black" style={{ color: plan.color }}>
                        {formatCurrency(plan.price)}
                      </span>
                      <span className="text-gray-500 text-sm">/{plan.period}</span>
                    </div>
                  </div>

                  {/* Features */}
                  <ul className="space-y-3 mb-7">
                    {plan.features.map((f, j) => (
                      <li key={j} className="flex items-start gap-2 text-sm">
                        <div
                          className="w-4 h-4 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                          style={{ background: `${plan.color}20` }}
                        >
                          <Check className="w-2.5 h-2.5" style={{ color: plan.color }} />
                        </div>
                        <span className="text-gray-300">{f}</span>
                      </li>
                    ))}
                  </ul>

                  <Link
                    href="/membership"
                    className="w-full flex items-center justify-center py-3 rounded-xl font-semibold transition-all text-sm"
                    style={
                      plan.popular
                        ? { background: plan.color, color: "#000" }
                        : {
                            background: `${plan.color}15`,
                            color: plan.color,
                            border: `1px solid ${plan.color}30`,
                          }
                    }
                  >
                    Get {plan.name} Membership
                  </Link>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════ LEADERBOARD ═══════════════ */}
      <section id="leaderboard" className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs font-medium mb-4">
              <Trophy className="w-3 h-3" />
              Hall of Fame
            </div>
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              Top <span className="gold-text">Players</span>
            </h2>
            <p className="text-gray-500 max-w-xl mx-auto">
              Our legends who have mastered the felt. Can you claim a spot?
            </p>
          </div>

          <div className="glass rounded-3xl overflow-hidden">
            {/* Header */}
            <div className="grid grid-cols-12 px-6 py-3 bg-dark-700/50 text-xs font-medium text-gray-500 uppercase tracking-wider">
              <div className="col-span-1">Rank</div>
              <div className="col-span-5">Player</div>
              <div className="col-span-3 text-center">Hours</div>
              <div className="col-span-3 text-center">Badge</div>
            </div>

            {DEMO_LEADERBOARD.map((player, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                viewport={{ once: true }}
                className={`grid grid-cols-12 px-6 py-4 items-center border-t border-white/5 hover:bg-white/3 transition-colors ${
                  i < 3 ? "bg-gold-400/5" : ""
                }`}
              >
                {/* Rank */}
                <div className="col-span-1 font-black">
                  {i === 0 ? (
                    <span className="text-gold-400 text-xl">🥇</span>
                  ) : i === 1 ? (
                    <span className="text-gray-300 text-xl">🥈</span>
                  ) : i === 2 ? (
                    <span className="text-orange-400 text-xl">🥉</span>
                  ) : (
                    <span className="text-gray-500">#{player.rank}</span>
                  )}
                </div>

                {/* Player */}
                <div className="col-span-5 flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold shrink-0"
                    style={{
                      background:
                        i === 0
                          ? "linear-gradient(135deg, #D4AF37, #B8960C)"
                          : i === 1
                          ? "linear-gradient(135deg, #C0C0C0, #888)"
                          : i === 2
                          ? "linear-gradient(135deg, #CD7F32, #8B4513)"
                          : "linear-gradient(135deg, #2A2A2A, #1F1F1F)",
                      color: i < 3 ? "#000" : "#fff",
                    }}
                  >
                    {player.avatar}
                  </div>
                  <span className={`font-semibold ${i < 3 ? "text-white" : "text-gray-300"}`}>
                    {player.name}
                  </span>
                </div>

                {/* Hours */}
                <div className="col-span-3 text-center">
                  <span className="text-white font-semibold">{player.hoursPlayed}h</span>
                </div>

                {/* Badge */}
                <div className="col-span-3 flex justify-center">
                  <span
                    className="px-2.5 py-1 rounded-full text-xs font-semibold capitalize"
                    style={{
                      background:
                        player.badge === "gold"
                          ? "rgba(212, 175, 55, 0.15)"
                          : player.badge === "silver"
                          ? "rgba(192, 192, 192, 0.15)"
                          : player.badge === "bronze"
                          ? "rgba(205, 127, 50, 0.15)"
                          : "rgba(100, 100, 100, 0.15)",
                      color:
                        player.badge === "gold"
                          ? "#D4AF37"
                          : player.badge === "silver"
                          ? "#C0C0C0"
                          : player.badge === "bronze"
                          ? "#CD7F32"
                          : "#888",
                    }}
                  >
                    {player.badge}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-6">
            <Link
              href="/leaderboard"
              className="inline-flex items-center gap-2 text-gold-400 hover:text-gold-300 text-sm font-medium transition-colors"
            >
              View Full Leaderboard <ChevronRight className="w-4 h-4" />
            </Link>
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ GALLERY ═══════════════ */}
      <section className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                The <span className="gradient-text">Experience</span>
              </h2>
              <p className="text-gray-500">A glimpse into Billiards Club 08</p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { label: "Main Hall", h: "h-64", emoji: "🎱", color: "#00C16E" },
                { label: "Snooker Room", h: "h-48", emoji: "🟢", color: "#1a4a2e" },
                { label: "VIP Area", h: "h-48", emoji: "👑", color: "#D4AF37" },
                { label: "Pool Section", h: "h-48", emoji: "🔵", color: "#2563EB" },
                { label: "Lounge", h: "h-48", emoji: "🛋️", color: "#9333ea" },
                { label: "Entrance", h: "h-64", emoji: "✨", color: "#00C16E" },
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ delay: i * 0.05 }}
                  viewport={{ once: true }}
                  whileHover={{ scale: 1.02 }}
                  className={`${item.h} rounded-2xl overflow-hidden relative group cursor-pointer`}
                  style={{
                    background: `radial-gradient(circle at 40% 40%, ${item.color}22, #161616)`,
                    border: `1px solid ${item.color}20`,
                  }}
                >
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-5xl mb-3">{item.emoji}</span>
                    <span className="text-gray-500 text-sm">{item.label}</span>
                  </div>
                  <div className="absolute inset-0 bg-dark-900/80 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
                    <div className="text-center">
                      <span className="text-white font-bold">{item.label}</span>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════ TESTIMONIALS ═══════════════ */}
      <section className="py-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <SectionWrapper>
          <div className="text-center mb-12">
            <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
              What Players <span className="gradient-text">Say</span>
            </h2>
          </div>

          {/* Reviews carousel */}
          <div className="relative max-w-3xl mx-auto">
            <AnimatePresence mode="wait">
              {DEMO_REVIEWS.slice(reviewIndex, reviewIndex + 1).map((review) => (
                <motion.div
                  key={review._id}
                  initial={{ opacity: 0, x: 30 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -30 }}
                  transition={{ duration: 0.4 }}
                  className="glass rounded-3xl p-8 text-center"
                >
                  {/* Stars */}
                  <div className="flex justify-center gap-1 mb-4">
                    {[...Array(review.rating)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-gold-400 text-gold-400" />
                    ))}
                  </div>

                  <p className="text-gray-300 text-lg leading-relaxed mb-6 italic">
                    &quot;{review.review}&quot;
                  </p>

                  <div className="flex items-center justify-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-brand-500/20 border border-brand-500/30 flex items-center justify-center text-sm font-bold text-brand-500">
                      {review.avatar}
                    </div>
                    <div className="text-left">
                      <div className="font-semibold text-white">{review.name}</div>
                      <div className="text-xs text-gray-500">{review.tableType} player</div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Navigation */}
            <div className="flex items-center justify-center gap-4 mt-6">
              <button
                onClick={() => setReviewIndex((prev) => (prev - 1 + DEMO_REVIEWS.length) % DEMO_REVIEWS.length)}
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <ChevronLeft className="w-4 h-4 text-gray-400" />
              </button>

              <div className="flex gap-2">
                {DEMO_REVIEWS.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setReviewIndex(i)}
                    className={`w-2 h-2 rounded-full transition-all ${
                      i === reviewIndex ? "bg-brand-500 w-6" : "bg-white/20"
                    }`}
                  />
                ))}
              </div>

              <button
                onClick={() => setReviewIndex((prev) => (prev + 1) % DEMO_REVIEWS.length)}
                className="p-2 rounded-full glass hover:bg-white/10 transition-colors"
              >
                <ChevronRight className="w-4 h-4 text-gray-400" />
              </button>
            </div>
          </div>
        </SectionWrapper>
      </section>

      {/* ═══════════════ CONTACT ═══════════════ */}
      <section id="contact" className="py-20 bg-dark-800/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <SectionWrapper>
            <div className="text-center mb-12">
              <h2 className="text-4xl md:text-5xl font-black text-white mb-4">
                Find <span className="gradient-text">Us</span>
              </h2>
            </div>

            <div className="grid md:grid-cols-2 gap-8">
              {/* Contact info */}
              <div className="space-y-6">
                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <MapPin className="w-5 h-5 text-brand-500" />
                    <h3 className="font-bold text-white">Location</h3>
                  </div>
                  <p className="text-gray-400 leading-relaxed">
                    Billiards Club 08<br />
                    Near SG Highway, Bodakdev<br />
                    Ahmedabad, Gujarat 380054
                  </p>
                </div>

                <div className="glass rounded-2xl p-6">
                  <div className="flex items-center gap-3 mb-4">
                    <Clock className="w-5 h-5 text-brand-500" />
                    <h3 className="font-bold text-white">Hours</h3>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Mon – Sun</span>
                    <span className="text-white font-semibold">12:00 PM – 12:00 AM</span>
                  </div>
                </div>

                <div className="flex gap-3">
                  <a
                    href="tel:+919876543210"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl glass hover:bg-white/10 text-white font-medium transition-all"
                  >
                    <Phone className="w-4 h-4 text-brand-500" />
                    Call Us
                  </a>
                  <a
                    href="https://wa.me/919876543210"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-green-600/20 border border-green-600/30 text-green-400 font-medium hover:bg-green-600/30 transition-all"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>

              {/* Contact form */}
              <div className="glass rounded-2xl p-6">
                <h3 className="font-bold text-white mb-5">Send a Message</h3>
                <div className="space-y-4">
                  <input
                    type="text"
                    placeholder="Your Name"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  <textarea
                    rows={3}
                    placeholder="Your message..."
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors resize-none"
                  />
                  <button className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all">
                    Send Message
                  </button>
                </div>
              </div>
            </div>
          </SectionWrapper>
        </div>
      </section>

      {/* ═══════════════ FOOTER ═══════════════ */}
      <footer className="border-t border-white/5 bg-dark-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Brand */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 mb-4">
                <span className="text-2xl">🎱</span>
                <span className="font-black text-xl">
                  <span className="text-white">Billiards </span>
                  <span className="text-brand-500">Club</span>
                  <span className="text-gold-400"> 08</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
                Ahmedabad&apos;s most premium pool and snooker experience. Professional tables,
                cinematic ambiance, unmatched service.
              </p>
            </div>

            {/* Quick links */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Quick Links
              </h4>
              <ul className="space-y-2 text-sm">
                {[
                  { label: "Book a Table", href: "/book" },
                  { label: "Availability", href: "/availability" },
                  { label: "Membership", href: "/membership" },
                  { label: "Leaderboard", href: "/leaderboard" },
                ].map((link) => (
                  <li key={link.href}>
                    <Link
                      href={link.href}
                      className="text-gray-500 hover:text-brand-500 transition-colors"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact */}
            <div>
              <h4 className="font-semibold text-white mb-4 text-sm uppercase tracking-wider">
                Contact
              </h4>
              <ul className="space-y-2 text-sm text-gray-500">
                <li className="flex items-center gap-2">
                  <Phone className="w-3.5 h-3.5 text-brand-500" />
                  +91 98765 43210
                </li>
                <li className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-brand-500" />
                  Bodakdev, Ahmedabad
                </li>
                <li className="flex items-center gap-2">
                  <Clock className="w-3.5 h-3.5 text-brand-500" />
                  12 PM – 12 AM Daily
                </li>
              </ul>
            </div>
          </div>

          <div className="border-t border-white/5 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-gray-600">
            <p>© 2026 Billiards Club 08. All rights reserved.</p>
            <div className="flex items-center gap-1">
              <span>Made with</span>
              <span className="text-red-400">♥</span>
              <span>in Ahmedabad</span>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
