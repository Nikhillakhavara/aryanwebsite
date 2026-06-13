"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Trophy, TrendingUp, Clock, Target } from "lucide-react";
import { DEMO_LEADERBOARD } from "@/lib/demo";
import { cn } from "@/lib/utils";

const MONTHLY_DATA = DEMO_LEADERBOARD.map((p, i) => ({
  ...p,
  hoursPlayed: Math.floor(p.hoursPlayed * 0.3),
  gamesWon: Math.floor(p.gamesWon * 0.3),
  rank: i + 1,
}));

export default function LeaderboardPage() {
  const [period, setPeriod] = useState<"all-time" | "monthly">("all-time");

  const data = period === "all-time" ? DEMO_LEADERBOARD : MONTHLY_DATA;

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs font-medium mb-4">
            <Trophy className="w-3 h-3" />
            Hall of Fame
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-3">
            <span className="gold-text">Leaderboard</span>
          </h1>
          <p className="text-gray-500 max-w-lg mx-auto">
            The legends who have conquered the felt. Every match counts. Every hour matters.
          </p>
        </motion.div>

        {/* Period toggle */}
        <div className="flex justify-center mb-8">
          <div className="flex gap-1 glass rounded-xl p-1">
            {(["all-time", "monthly"] as const).map((p) => (
              <button
                key={p}
                onClick={() => setPeriod(p)}
                className={cn(
                  "px-6 py-2.5 rounded-lg text-sm font-semibold transition-all capitalize",
                  period === p
                    ? "bg-gold-400 text-dark-900"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {p === "all-time" ? "All Time" : "This Month"}
              </button>
            ))}
          </div>
        </div>

        {/* Top 3 podium */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-3 gap-4 mb-8"
        >
          {[1, 0, 2].map((rankIdx) => {
            const player = data[rankIdx];
            const isFirst = rankIdx === 0;
            return (
              <motion.div
                key={rankIdx}
                whileHover={{ y: -4 }}
                className={`glass rounded-2xl p-5 text-center relative ${
                  isFirst ? "border border-gold-400/30 shadow-lg shadow-gold-400/10" : "border border-white/10"
                }`}
                style={{ order: rankIdx === 0 ? 2 : rankIdx === 1 ? 1 : 3 }}
              >
                {isFirst && (
                  <motion.div
                    animate={{ y: [-4, 4, -4] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="text-3xl mb-1"
                  >
                    👑
                  </motion.div>
                )}
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center text-lg font-black mx-auto mb-3"
                  style={{
                    background:
                      isFirst
                        ? "linear-gradient(135deg, #D4AF37, #B8960C)"
                        : rankIdx === 1
                        ? "linear-gradient(135deg, #C0C0C0, #888)"
                        : "linear-gradient(135deg, #CD7F32, #8B4513)",
                    color: "#000",
                  }}
                >
                  {player.avatar}
                </div>
                <p className="font-bold text-white text-sm">{player.name}</p>
                <p className="text-xs text-gray-500 mt-1">{player.hoursPlayed}h played</p>
                <div className="mt-2 text-2xl">
                  {isFirst ? "🥇" : rankIdx === 1 ? "🥈" : "🥉"}
                </div>
              </motion.div>
            );
          })}
        </motion.div>

        {/* Full rankings table */}
        <div className="glass rounded-3xl overflow-hidden">
          {/* Header */}
          <div className="grid grid-cols-12 px-6 py-3 bg-dark-700/50 border-b border-white/5 text-xs font-medium text-gray-500 uppercase tracking-wider">
            <div className="col-span-1">Rank</div>
            <div className="col-span-4">Player</div>
            <div className="col-span-2 text-center">Hours</div>
            <div className="col-span-2 text-center">Wins</div>
            <div className="col-span-3 text-center">Badge</div>
          </div>

          {data.map((player, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.04 + 0.2 }}
              className={`grid grid-cols-12 px-6 py-4 items-center border-b border-white/5 last:border-0 hover:bg-white/3 transition-colors ${
                i < 3 ? "bg-gold-400/5" : ""
              }`}
            >
              {/* Rank */}
              <div className="col-span-1 font-black">
                {i === 0 ? (
                  <span className="text-xl">🥇</span>
                ) : i === 1 ? (
                  <span className="text-xl">🥈</span>
                ) : i === 2 ? (
                  <span className="text-xl">🥉</span>
                ) : (
                  <span className="text-gray-600 text-sm">#{player.rank}</span>
                )}
              </div>

              {/* Player */}
              <div className="col-span-4 flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full flex items-center justify-center text-xs font-black shrink-0"
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
                <div>
                  <p className={`font-semibold text-sm ${i < 3 ? "text-white" : "text-gray-300"}`}>
                    {player.name}
                  </p>
                  <p className="text-xs text-gray-600">
                    Since {new Date(player.joinedDate).getFullYear()}
                  </p>
                </div>
              </div>

              {/* Hours */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Clock className="w-3 h-3 text-gray-600" />
                  <span className="text-white font-semibold text-sm">{player.hoursPlayed}h</span>
                </div>
              </div>

              {/* Wins */}
              <div className="col-span-2 text-center">
                <div className="flex items-center justify-center gap-1">
                  <Target className="w-3 h-3 text-gray-600" />
                  <span className="text-white font-semibold text-sm">{player.gamesWon}</span>
                </div>
              </div>

              {/* Badge */}
              <div className="col-span-3 flex justify-center">
                <span
                  className="px-3 py-1 rounded-full text-xs font-semibold capitalize flex items-center gap-1"
                  style={{
                    background:
                      player.badge === "gold"
                        ? "rgba(212, 175, 55, 0.15)"
                        : player.badge === "silver"
                        ? "rgba(192, 192, 192, 0.15)"
                        : player.badge === "bronze"
                        ? "rgba(205, 127, 50, 0.15)"
                        : "rgba(100, 100, 100, 0.1)",
                    color:
                      player.badge === "gold"
                        ? "#D4AF37"
                        : player.badge === "silver"
                        ? "#C0C0C0"
                        : player.badge === "bronze"
                        ? "#CD7F32"
                        : "#666",
                  }}
                >
                  {player.badge === "gold"
                    ? "🥇"
                    : player.badge === "silver"
                    ? "🥈"
                    : player.badge === "bronze"
                    ? "🥉"
                    : "⚪"}{" "}
                  {player.badge}
                </span>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="grid grid-cols-3 gap-4 mt-8"
        >
          {[
            { icon: <TrendingUp className="w-5 h-5" />, label: "Total Hours", value: data.reduce((acc, p) => acc + p.hoursPlayed, 0).toLocaleString() + "h" },
            { icon: <Trophy className="w-5 h-5" />, label: "Total Wins", value: data.reduce((acc, p) => acc + p.gamesWon, 0).toLocaleString() },
            { icon: <Target className="w-5 h-5" />, label: "Active Players", value: data.length.toString() },
          ].map((stat, i) => (
            <div key={i} className="glass rounded-2xl p-5 text-center">
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500 mx-auto mb-3">
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-xs text-gray-500 mt-1">{stat.label}</p>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
