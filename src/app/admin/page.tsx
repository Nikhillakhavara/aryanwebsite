"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import {
  AreaChart, Area, BarChart, Bar, XAxis, YAxis, CartesianGrid,
  Tooltip, ResponsiveContainer,
} from "recharts";
import {
  TrendingUp, Users, Table2, DollarSign, Check, X,
  LogOut, BookOpen, Settings, ChevronRight,
} from "lucide-react";
import Link from "next/link";
import toast from "react-hot-toast";
import { authApi, statsApi, bookingsApi } from "@/lib/api";
import { DEMO_BOOKINGS, DAILY_REVENUE_DATA } from "@/lib/demo";
import { formatCurrency, getStatusColor } from "@/lib/utils";

function LoginForm({ onLogin }: { onLogin: () => void }) {
  const [username, setUsername] = useState("admin");
  const [password, setPassword] = useState("admin123");
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await authApi.adminLogin(username, password);
      if (res.success && res.token) {
        localStorage.setItem("adminToken", res.token);
        toast.success("Welcome back, Admin!");
        onLogin();
      }
    } catch {
      toast.error("Invalid credentials");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-dark-900 flex items-center justify-center p-4">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 w-full max-w-md"
      >
        <div className="text-center mb-8">
          <div className="text-5xl mb-4">🔐</div>
          <h1 className="text-2xl font-black text-white">Admin Panel</h1>
          <p className="text-gray-500 text-sm mt-1">Billiards Club 08 Management</p>
          <div className="mt-2 px-3 py-1.5 rounded-lg bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs inline-block">
            Demo: admin / admin123
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Username</label>
            <input
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <div>
            <label className="text-sm text-gray-400 mb-2 block">Password</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
            />
          </div>
          <button
            type="submit"
            disabled={loading}
            className="w-full py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all disabled:opacity-50"
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>
      </motion.div>
    </div>
  );
}

export default function AdminPage() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [stats, setStats] = useState({
    totalBookings: 1247,
    revenueToday: 18500,
    activeMembers: 89,
    tablesInUse: 3,
  });
  const [bookings, setBookings] = useState(DEMO_BOOKINGS);

  useEffect(() => {
    const token = localStorage.getItem("adminToken");
    if (token) setIsAuthenticated(true);
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      statsApi.getAdmin().then((res) => {
        if (res.data) setStats(res.data);
      });
      bookingsApi.getAll().then((res) => {
        if (res.data) setBookings(res.data);
      });
    }
  }, [isAuthenticated]);

  const handleLogout = () => {
    authApi.logout();
    setIsAuthenticated(false);
    toast.success("Logged out");
  };

  const handleBookingAction = async (id: string, status: "confirmed" | "completed" | "cancelled") => {
    try {
      await bookingsApi.update(id, { status });
      setBookings((prev) =>
        prev.map((b) => (b._id === id ? { ...b, status } : b))
      );
      toast.success(`Booking ${status}`);
    } catch {
      toast.error("Action failed");
    }
  };

  if (!isAuthenticated) {
    return <LoginForm onLogin={() => setIsAuthenticated(true)} />;
  }

  const STAT_CARDS = [
    { label: "Total Bookings", value: stats.totalBookings.toLocaleString(), icon: <BookOpen className="w-5 h-5" />, color: "text-blue-400", bg: "bg-blue-400/10" },
    { label: "Revenue Today", value: formatCurrency(stats.revenueToday), icon: <DollarSign className="w-5 h-5" />, color: "text-brand-500", bg: "bg-brand-500/10" },
    { label: "Active Members", value: stats.activeMembers.toString(), icon: <Users className="w-5 h-5" />, color: "text-purple-400", bg: "bg-purple-400/10" },
    { label: "Tables In Use", value: `${stats.tablesInUse}/8`, icon: <Table2 className="w-5 h-5" />, color: "text-gold-400", bg: "bg-gold-400/10" },
  ];

  return (
    <div className="min-h-screen bg-dark-900 pt-20 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-black text-white">Admin Dashboard</h1>
            <p className="text-gray-500 text-sm">Billiards Club 08 Management</p>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/admin/bookings"
              className="px-4 py-2 rounded-xl glass text-gray-400 hover:text-white text-sm transition-colors"
            >
              Bookings
            </Link>
            <Link
              href="/admin/tables"
              className="px-4 py-2 rounded-xl glass text-gray-400 hover:text-white text-sm transition-colors"
            >
              Tables
            </Link>
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-xl text-red-400 hover:bg-red-400/10 text-sm transition-colors"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </button>
          </div>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {STAT_CARDS.map((stat, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.08 }}
              className="glass rounded-2xl p-5"
            >
              <div className={`w-10 h-10 rounded-xl ${stat.bg} flex items-center justify-center ${stat.color} mb-3`}>
                {stat.icon}
              </div>
              <p className="text-2xl font-black text-white">{stat.value}</p>
              <p className="text-gray-500 text-sm mt-1">{stat.label}</p>
            </motion.div>
          ))}
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6 mb-8">
          {/* Revenue chart */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Daily Revenue</h3>
              <TrendingUp className="w-4 h-4 text-brand-500" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <AreaChart data={DAILY_REVENUE_DATA}>
                <defs>
                  <linearGradient id="revenueGrad" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#00C16E" stopOpacity={0.3} />
                    <stop offset="95%" stopColor="#00C16E" stopOpacity={0} />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} tickFormatter={(v) => `₹${(v / 1000).toFixed(0)}k`} />
                <Tooltip
                  contentStyle={{ background: "#1F1F1F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                  formatter={(v: number) => [formatCurrency(v), "Revenue"]}
                />
                <Area type="monotone" dataKey="revenue" stroke="#00C16E" strokeWidth={2} fill="url(#revenueGrad)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>

          {/* Bookings chart */}
          <div className="glass rounded-2xl p-6">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-bold text-white">Booking Trends</h3>
              <BookOpen className="w-4 h-4 text-blue-400" />
            </div>
            <ResponsiveContainer width="100%" height={220}>
              <BarChart data={DAILY_REVENUE_DATA}>
                <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.05)" />
                <XAxis dataKey="day" tick={{ fill: "#6b7280", fontSize: 12 }} axisLine={false} tickLine={false} />
                <YAxis tick={{ fill: "#6b7280", fontSize: 11 }} axisLine={false} tickLine={false} />
                <Tooltip
                  contentStyle={{ background: "#1F1F1F", border: "1px solid rgba(255,255,255,0.1)", borderRadius: "12px", color: "#fff" }}
                />
                <Bar dataKey="bookings" fill="#2563EB" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Recent Bookings */}
        <div className="glass rounded-2xl p-6 mb-6">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-white">Recent Bookings</h3>
            <Link href="/admin/bookings" className="flex items-center gap-1 text-brand-500 text-sm hover:text-brand-400 transition-colors">
              View all <ChevronRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full text-sm">
              <thead>
                <tr className="text-gray-500 text-xs uppercase tracking-wider border-b border-white/5">
                  <th className="text-left pb-3">ID</th>
                  <th className="text-left pb-3">Customer</th>
                  <th className="text-left pb-3">Table</th>
                  <th className="text-left pb-3">Date</th>
                  <th className="text-left pb-3">Amount</th>
                  <th className="text-left pb-3">Status</th>
                  <th className="text-left pb-3">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/5">
                {bookings.slice(0, 5).map((booking) => (
                  <tr key={booking._id} className="hover:bg-white/3 transition-colors">
                    <td className="py-3 font-mono text-xs text-gray-500">{booking.bookingId}</td>
                    <td className="py-3 text-white font-medium">{booking.customerName}</td>
                    <td className="py-3 text-gray-400">{booking.tableName} ({booking.tableType})</td>
                    <td className="py-3 text-gray-400">{booking.date} {booking.startTime}</td>
                    <td className="py-3 text-brand-500 font-semibold">{formatCurrency(booking.amount)}</td>
                    <td className="py-3">
                      <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(booking.status)}`}>
                        {booking.status}
                      </span>
                    </td>
                    <td className="py-3">
                      {booking.status === "pending" && (
                        <div className="flex gap-1">
                          <button
                            onClick={() => handleBookingAction(booking._id, "confirmed")}
                            className="p-1.5 rounded-lg bg-brand-500/10 text-brand-500 hover:bg-brand-500/20 transition-colors"
                          >
                            <Check className="w-3 h-3" />
                          </button>
                          <button
                            onClick={() => handleBookingAction(booking._id, "cancelled")}
                            className="p-1.5 rounded-lg bg-red-400/10 text-red-400 hover:bg-red-400/20 transition-colors"
                          >
                            <X className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                      {booking.status === "confirmed" && (
                        <button
                          onClick={() => handleBookingAction(booking._id, "completed")}
                          className="px-2 py-1 rounded-lg bg-blue-400/10 text-blue-400 hover:bg-blue-400/20 text-xs transition-colors"
                        >
                          Complete
                        </button>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick actions */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {[
            { label: "Manage Bookings", href: "/admin/bookings", icon: <BookOpen className="w-5 h-5" /> },
            { label: "Manage Tables", href: "/admin/tables", icon: <Table2 className="w-5 h-5" /> },
            { label: "Settings", href: "/admin", icon: <Settings className="w-5 h-5" /> },
          ].map((action, i) => (
            <Link
              key={i}
              href={action.href}
              className="glass rounded-2xl p-5 flex items-center gap-3 hover:bg-white/5 transition-colors group"
            >
              <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500 group-hover:bg-brand-500/20 transition-colors">
                {action.icon}
              </div>
              <span className="font-semibold text-white text-sm">{action.label}</span>
              <ChevronRight className="w-4 h-4 text-gray-600 ml-auto group-hover:text-brand-500 transition-colors" />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
