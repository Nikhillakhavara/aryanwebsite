"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Search, Filter, Check, X, Download, ChevronLeft } from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { bookingsApi } from "@/lib/api";
import { DEMO_BOOKINGS, type Booking } from "@/lib/demo";
import { formatCurrency, getStatusColor } from "@/lib/utils";
import { cn } from "@/lib/utils";

export default function AdminBookingsPage() {
  const [bookings, setBookings] = useState<Booking[]>(DEMO_BOOKINGS);
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState("all");
  const [typeFilter, setTypeFilter] = useState("all");

  useEffect(() => {
    const token = typeof window !== "undefined" ? localStorage.getItem("adminToken") : null;
    if (!token) return;
    bookingsApi.getAll().then((res) => {
      if (res.data?.length) setBookings(res.data);
    });
  }, []);

  const filtered = bookings.filter((b) => {
    const matchSearch =
      !search ||
      b.customerName.toLowerCase().includes(search.toLowerCase()) ||
      b.bookingId.toLowerCase().includes(search.toLowerCase()) ||
      b.tableName.toLowerCase().includes(search.toLowerCase());
    const matchStatus = statusFilter === "all" || b.status === statusFilter;
    const matchType = typeFilter === "all" || b.tableType === typeFilter;
    return matchSearch && matchStatus && matchType;
  });

  const handleAction = async (id: string, status: "confirmed" | "completed" | "cancelled") => {
    try {
      await bookingsApi.update(id, { status });
      setBookings((prev) => prev.map((b) => (b._id === id ? { ...b, status } : b)));
      toast.success(`Booking ${status}`);
    } catch {
      toast.error("Action failed");
    }
  };

  const exportCSV = () => {
    const headers = ["ID", "Customer", "Phone", "Table", "Type", "Date", "Start", "Duration", "Amount", "Status"];
    const rows = filtered.map((b) => [
      b.bookingId, b.customerName, b.customerPhone, b.tableName, b.tableType,
      b.date, b.startTime, b.duration + "h", b.amount, b.status,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `bookings-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    toast.success("Exported successfully");
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link href="/admin" className="p-2 rounded-xl glass hover:bg-white/10 transition-colors text-gray-400 hover:text-white">
            <ChevronLeft className="w-5 h-5" />
          </Link>
          <div>
            <h1 className="text-3xl font-black text-white">Bookings Management</h1>
            <p className="text-gray-500 text-sm">{filtered.length} bookings found</p>
          </div>
          <button
            onClick={exportCSV}
            className="ml-auto flex items-center gap-2 px-4 py-2 rounded-xl glass text-gray-400 hover:text-white text-sm transition-colors"
          >
            <Download className="w-4 h-4" />
            Export CSV
          </button>
        </div>

        {/* Filters */}
        <div className="glass rounded-2xl p-4 mb-6 flex flex-wrap gap-4">
          <div className="flex-1 min-w-48 relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-500" />
            <input
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search by name, ID, or table..."
              className="w-full bg-dark-700 border border-white/10 rounded-xl pl-10 pr-4 py-2.5 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors text-sm"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-gray-500" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Status</option>
              <option value="pending">Pending</option>
              <option value="confirmed">Confirmed</option>
              <option value="completed">Completed</option>
              <option value="cancelled">Cancelled</option>
            </select>

            <select
              value={typeFilter}
              onChange={(e) => setTypeFilter(e.target.value)}
              className="bg-dark-700 border border-white/10 rounded-xl px-3 py-2.5 text-white text-sm focus:outline-none focus:border-brand-500"
            >
              <option value="all">All Types</option>
              <option value="pool">Pool</option>
              <option value="snooker">Snooker</option>
            </select>
          </div>
        </div>

        {/* Table */}
        <div className="glass rounded-2xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5 bg-dark-700/30">
                  <th className="text-left px-4 py-3">Booking ID</th>
                  <th className="text-left px-4 py-3">Customer</th>
                  <th className="text-left px-4 py-3">Table</th>
                  <th className="text-left px-4 py-3">Date & Time</th>
                  <th className="text-left px-4 py-3">Duration</th>
                  <th className="text-left px-4 py-3">Amount</th>
                  <th className="text-left px-4 py-3">Status</th>
                  <th className="text-left px-4 py-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={8} className="text-center py-12 text-gray-500">
                      No bookings found
                    </td>
                  </tr>
                ) : (
                  filtered.map((booking, i) => (
                    <motion.tr
                      key={booking._id}
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: i * 0.03 }}
                      className="hover:bg-white/3 transition-colors"
                    >
                      <td className="px-4 py-3 font-mono text-xs text-gray-500">{booking.bookingId}</td>
                      <td className="px-4 py-3">
                        <div className="font-medium text-white">{booking.customerName}</div>
                        <div className="text-xs text-gray-500">{booking.customerPhone}</div>
                      </td>
                      <td className="px-4 py-3">
                        <div className="text-white">{booking.tableName}</div>
                        <div className="text-xs text-gray-500 capitalize">{booking.tableType}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">
                        <div>{booking.date}</div>
                        <div className="text-xs">{booking.startTime} – {booking.endTime}</div>
                      </td>
                      <td className="px-4 py-3 text-gray-400">{booking.duration}h</td>
                      <td className="px-4 py-3 text-brand-500 font-semibold">{formatCurrency(booking.amount)}</td>
                      <td className="px-4 py-3">
                        <span className={cn("px-2.5 py-1 rounded-full text-xs font-semibold border", getStatusColor(booking.status))}>
                          {booking.status}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        <div className="flex gap-1">
                          {booking.status === "pending" && (
                            <>
                              <button
                                onClick={() => handleAction(booking._id, "confirmed")}
                                className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500 hover:bg-brand-500/20 transition-colors"
                                title="Confirm"
                              >
                                <Check className="w-3.5 h-3.5" />
                              </button>
                              <button
                                onClick={() => handleAction(booking._id, "cancelled")}
                                className="p-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
                                title="Cancel"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                          {booking.status === "confirmed" && (
                            <>
                              <button
                                onClick={() => handleAction(booking._id, "completed")}
                                className="px-2.5 py-1 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 text-xs transition-colors"
                              >
                                Done
                              </button>
                              <button
                                onClick={() => handleAction(booking._id, "cancelled")}
                                className="p-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
                              >
                                <X className="w-3.5 h-3.5" />
                              </button>
                            </>
                          )}
                        </div>
                      </td>
                    </motion.tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
