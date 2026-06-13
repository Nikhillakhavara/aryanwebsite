"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { Clock, Zap } from "lucide-react";
import { cn, getStatusColor, getStatusDotColor, formatCurrency } from "@/lib/utils";
import type { Table } from "@/lib/demo";

interface TableCardProps {
  table: Table;
  index?: number;
}

export default function TableCard({ table, index = 0 }: TableCardProps) {
  const statusColor = getStatusColor(table.status);
  const dotColor = getStatusDotColor(table.status);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.08, duration: 0.4 }}
      whileHover={{ y: -4 }}
      className="glass rounded-2xl p-5 card-hover group relative overflow-hidden"
    >
      {/* Background glow on hover */}
      <div className="absolute inset-0 bg-brand-500/0 group-hover:bg-brand-500/3 transition-all duration-500 rounded-2xl" />

      {/* Top row */}
      <div className="flex items-start justify-between mb-4">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-medium text-gray-500 uppercase tracking-widest">
              {table.tableType}
            </span>
          </div>
          <h3 className="text-xl font-black text-white tracking-wider">
            {table.tableNumber}
          </h3>
        </div>

        {/* Status badge */}
        <div
          className={cn(
            "flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold border",
            statusColor
          )}
        >
          <span
            className={cn(
              "w-1.5 h-1.5 rounded-full",
              dotColor,
              table.status === "occupied" && "animate-ping-slow"
            )}
          />
          {table.status.charAt(0).toUpperCase() + table.status.slice(1)}
        </div>
      </div>

      {/* Table visual */}
      <div className="mb-4 rounded-xl overflow-hidden relative h-20 felt-texture">
        <div className="absolute inset-2 border border-white/10 rounded-lg" />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="flex gap-1.5">
            {[...Array(table.tableType === "snooker" ? 6 : 4)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 rounded-full"
                style={{
                  background: i === 0 ? "#ffffff" : i === 1 ? "#ff4444" : i === 2 ? "#D4AF37" : i === 3 ? "#4444ff" : "#00C16E",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.5)",
                }}
              />
            ))}
          </div>
        </div>
      </div>

      {/* Info */}
      <div className="space-y-2 mb-4">
        <div className="flex items-center justify-between text-sm">
          <span className="text-gray-500">Rate</span>
          <span className="text-white font-semibold">
            {formatCurrency(table.ratePerHour)}/hr
          </span>
        </div>

        {table.status === "occupied" && table.currentBooking && (
          <div className="flex items-center justify-between text-sm">
            <span className="text-gray-500">Occupied by</span>
            <span className="text-gray-300">{table.currentBooking.customerName}</span>
          </div>
        )}

        {(table.status === "occupied" || table.status === "reserved") && table.nextAvailable && (
          <div className="flex items-center gap-1.5 text-xs text-yellow-400/80">
            <Clock className="w-3 h-3" />
            <span>Next available: {table.nextAvailable}</span>
          </div>
        )}
      </div>

      {/* CTA */}
      <Link
        href={`/book?table=${table._id}&type=${table.tableType}`}
        className={cn(
          "w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-200",
          table.status === "available"
            ? "bg-brand-500 hover:bg-brand-600 text-white hover:shadow-lg hover:shadow-brand-500/30"
            : "bg-white/5 text-gray-500 cursor-not-allowed"
        )}
        onClick={(e) => table.status !== "available" && e.preventDefault()}
      >
        <Zap className="w-3.5 h-3.5" />
        {table.status === "available" ? "Book Now" : "Unavailable"}
      </Link>
    </motion.div>
  );
}
