"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { ChevronLeft, ChevronRight, Zap } from "lucide-react";
import { DEMO_TABLES } from "@/lib/demo";
import { cn, formatCurrency } from "@/lib/utils";

const TIME_SLOTS = [
  "12:00", "13:00", "14:00", "15:00", "16:00", "17:00",
  "18:00", "19:00", "20:00", "21:00", "22:00", "23:00",
];

const DAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

function getWeekDates(baseDate: Date): Date[] {
  const dayOfWeek = baseDate.getDay();
  const monday = new Date(baseDate);
  monday.setDate(baseDate.getDate() - dayOfWeek);
  return Array.from({ length: 7 }, (_, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    return d;
  });
}

function getSlotStatus(tableId: string, time: string, date: Date): "available" | "occupied" | "reserved" {
  const hash = (tableId + time + date.toDateString()).split("").reduce((acc, c) => acc + c.charCodeAt(0), 0);
  if (hash % 4 === 0) return "occupied";
  if (hash % 7 === 0) return "reserved";
  return "available";
}

export default function AvailabilityPage() {
  const [activeType, setActiveType] = useState<"pool" | "snooker">("pool");
  const [currentWeek, setCurrentWeek] = useState(0);
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [viewMode, setViewMode] = useState<"week" | "day">("day");

  const today = new Date();
  const baseDate = new Date(today);
  baseDate.setDate(today.getDate() + currentWeek * 7);
  const weekDates = getWeekDates(baseDate);

  const filteredTables = DEMO_TABLES.filter((t) => t.tableType === activeType);

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-8"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Live Availability
          </div>
          <h1 className="text-4xl font-black text-white mb-2">
            Table <span className="gradient-text">Availability</span>
          </h1>
          <p className="text-gray-500">Real-time slot availability for all tables</p>
        </motion.div>

        {/* Controls */}
        <div className="flex flex-wrap gap-4 mb-8">
          {/* Type tabs */}
          <div className="flex gap-1 glass rounded-xl p-1">
            {(["pool", "snooker"] as const).map((type) => (
              <button
                key={type}
                onClick={() => setActiveType(type)}
                className={cn(
                  "px-5 py-2 rounded-lg text-sm font-semibold capitalize transition-all",
                  activeType === type
                    ? "bg-brand-500 text-white"
                    : "text-gray-400 hover:text-white"
                )}
              >
                {type} ({formatCurrency(type === "pool" ? 150 : 250)}/hr)
              </button>
            ))}
          </div>

          {/* View mode */}
          <div className="flex gap-1 glass rounded-xl p-1">
            {(["day", "week"] as const).map((mode) => (
              <button
                key={mode}
                onClick={() => setViewMode(mode)}
                className={cn(
                  "px-4 py-2 rounded-lg text-sm font-medium capitalize transition-all",
                  viewMode === mode
                    ? "bg-dark-600 text-white"
                    : "text-gray-500 hover:text-white"
                )}
              >
                {mode}
              </button>
            ))}
          </div>
        </div>

        {/* Week navigation */}
        <div className="flex items-center justify-between mb-6 glass rounded-2xl p-4">
          <button
            onClick={() => setCurrentWeek((w) => w - 1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <ChevronLeft className="w-5 h-5" />
          </button>

          <div className="flex gap-2 overflow-x-auto">
            {weekDates.map((date, i) => {
              const isToday = date.toDateString() === today.toDateString();
              const isSelected = date.toDateString() === selectedDate.toDateString();
              return (
                <button
                  key={i}
                  onClick={() => setSelectedDate(date)}
                  className={cn(
                    "flex flex-col items-center gap-1 px-3 py-2 rounded-xl transition-all min-w-[52px]",
                    isSelected
                      ? "bg-brand-500 text-white"
                      : isToday
                      ? "border border-brand-500/40 text-brand-500"
                      : "hover:bg-white/5 text-gray-400"
                  )}
                >
                  <span className="text-xs font-medium">{DAYS[date.getDay()]}</span>
                  <span className="text-lg font-black">{date.getDate()}</span>
                  <span className="text-xs opacity-60">
                    {date.toLocaleDateString("en-IN", { month: "short" })}
                  </span>
                </button>
              );
            })}
          </div>

          <button
            onClick={() => setCurrentWeek((w) => w + 1)}
            className="p-2 rounded-lg hover:bg-white/10 transition-colors text-gray-400 hover:text-white"
          >
            <ChevronRight className="w-5 h-5" />
          </button>
        </div>

        {/* Legend */}
        <div className="flex gap-4 mb-6 text-xs">
          {[
            { color: "bg-brand-500/30 border-brand-500/50", label: "Available" },
            { color: "bg-red-500/30 border-red-500/50", label: "Occupied" },
            { color: "bg-yellow-500/30 border-yellow-500/50", label: "Reserved" },
          ].map((item) => (
            <div key={item.label} className="flex items-center gap-1.5">
              <div className={`w-3 h-3 rounded border ${item.color}`} />
              <span className="text-gray-500">{item.label}</span>
            </div>
          ))}
        </div>

        {/* Availability grid */}
        <div className="glass rounded-3xl overflow-hidden">
          {/* Time header */}
          <div
            className="grid gap-px bg-dark-700/50 border-b border-white/5"
            style={{ gridTemplateColumns: `140px repeat(${TIME_SLOTS.length}, 1fr)` }}
          >
            <div className="px-4 py-3 text-xs text-gray-500 font-medium">Table</div>
            {TIME_SLOTS.map((time) => (
              <div key={time} className="px-2 py-3 text-xs text-gray-500 text-center font-medium">
                {time}
              </div>
            ))}
          </div>

          {/* Table rows */}
          {filteredTables.map((table, ti) => (
            <motion.div
              key={table._id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: ti * 0.05 }}
              className="grid gap-px border-b border-white/5 last:border-0"
              style={{ gridTemplateColumns: `140px repeat(${TIME_SLOTS.length}, 1fr)` }}
            >
              {/* Table name */}
              <div className="px-4 py-3 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-brand-500" />
                <span className="text-white font-semibold text-sm">{table.tableNumber}</span>
              </div>

              {/* Slots */}
              {TIME_SLOTS.map((time) => {
                const status = getSlotStatus(table._id, time, selectedDate);
                return (
                  <Link
                    key={time}
                    href={
                      status === "available"
                        ? `/book?table=${table._id}&type=${table.tableType}&time=${time}&date=${selectedDate.toISOString().split("T")[0]}`
                        : "#"
                    }
                    className={cn(
                      "mx-0.5 my-1.5 rounded-lg transition-all text-xs font-medium flex items-center justify-center h-8",
                      status === "available"
                        ? "bg-brand-500/20 border border-brand-500/30 text-brand-500 hover:bg-brand-500/40 cursor-pointer"
                        : status === "occupied"
                        ? "bg-red-500/15 border border-red-500/20 text-red-400/50 cursor-not-allowed"
                        : "bg-yellow-500/15 border border-yellow-500/20 text-yellow-400/50 cursor-not-allowed"
                    )}
                    onClick={(e) => status !== "available" && e.preventDefault()}
                  >
                    {status === "available" ? <Zap className="w-3 h-3" /> : "—"}
                  </Link>
                );
              })}
            </motion.div>
          ))}
        </div>

        {/* CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-8 text-center"
        >
          <Link
            href="/book"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-2xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all hover:shadow-xl hover:shadow-brand-500/30"
          >
            <Zap className="w-5 h-5" />
            Book Now
          </Link>
        </motion.div>
      </div>
    </div>
  );
}
