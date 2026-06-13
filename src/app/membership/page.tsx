"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { Check, Star, Trophy, Zap, Shield, Clock, Award, Users } from "lucide-react";
import toast from "react-hot-toast";
import { formatCurrency } from "@/lib/utils";

const PLANS = [
  {
    id: "bronze",
    name: "Bronze",
    icon: "🥉",
    price: 999,
    annualPrice: 9999,
    color: "#CD7F32",
    tagline: "For the weekend warrior",
    features: [
      { text: "5% discount on all bookings", included: true },
      { text: "Priority booking (1 hour early)", included: true },
      { text: "Monthly leaderboard access", included: true },
      { text: "Free cue & chalk rental", included: true },
      { text: "Member-only events (2/year)", included: true },
      { text: "Guest passes", included: false },
      { text: "VIP lounge access", included: false },
      { text: "Dedicated table reservation", included: false },
    ],
  },
  {
    id: "silver",
    name: "Silver",
    icon: "🥈",
    price: 1999,
    annualPrice: 19999,
    color: "#C0C0C0",
    popular: true,
    tagline: "For the serious player",
    features: [
      { text: "15% discount on all bookings", included: true },
      { text: "Priority booking (3 hours early)", included: true },
      { text: "All-time leaderboard access", included: true },
      { text: "Free premium equipment", included: true },
      { text: "Member-only events (6/year)", included: true },
      { text: "2 guest passes per month", included: true },
      { text: "Lounge access", included: true },
      { text: "Dedicated table reservation", included: false },
    ],
  },
  {
    id: "gold",
    name: "Gold",
    icon: "🥇",
    price: 3999,
    annualPrice: 39999,
    color: "#D4AF37",
    tagline: "For the elite champion",
    features: [
      { text: "25% discount on all bookings", included: true },
      { text: "Instant priority booking", included: true },
      { text: "Hall of Fame eligibility", included: true },
      { text: "Premium personal equipment locker", included: true },
      { text: "Unlimited events access", included: true },
      { text: "5 guest passes per month", included: true },
      { text: "VIP lounge access always", included: true },
      { text: "1 dedicated table reservation/week", included: true },
    ],
  },
];

const PERKS = [
  { icon: <Trophy className="w-5 h-5" />, title: "Exclusive Tournaments", desc: "Members-only monthly tournaments with cash prizes" },
  { icon: <Star className="w-5 h-5" />, title: "Priority Support", desc: "Dedicated WhatsApp support line for members" },
  { icon: <Shield className="w-5 h-5" />, title: "Booking Protection", desc: "Free cancellation up to 30 minutes before your slot" },
  { icon: <Clock className="w-5 h-5" />, title: "Extended Hours", desc: "Gold members can play until 1 AM on weekends" },
  { icon: <Award className="w-5 h-5" />, title: "Annual Trophy Ceremony", desc: "Recognition and awards for top members" },
  { icon: <Users className="w-5 h-5" />, title: "Community Events", desc: "Regular meetups, skill clinics, and social events" },
];

export default function MembershipPage() {
  const [billingPeriod, setBillingPeriod] = useState<"monthly" | "annual">("monthly");
  const [selectedPlan, setSelectedPlan] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [formData, setFormData] = useState({ name: "", phone: "", email: "" });

  const handleJoin = (planId: string) => {
    setSelectedPlan(planId);
    setShowForm(true);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    toast.success(`Welcome to ${selectedPlan?.charAt(0).toUpperCase()}${selectedPlan?.slice(1)} Membership! We'll contact you shortly.`);
    setShowForm(false);
    setFormData({ name: "", phone: "", email: "" });
  };

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-gold-400/10 border border-gold-400/20 text-gold-400 text-xs font-medium mb-4">
            <Award className="w-3 h-3" />
            Exclusive Memberships
          </div>
          <h1 className="text-5xl md:text-6xl font-black text-white mb-4">
            Unlock Your{" "}
            <span className="gold-text">Full Potential</span>
          </h1>
          <p className="text-gray-500 text-lg max-w-2xl mx-auto">
            Join thousands of players who have elevated their game with a Club 08 membership.
            Exclusive perks, priority access, and a community of champions await.
          </p>
        </motion.div>

        {/* Billing toggle */}
        <div className="flex justify-center mb-10">
          <div className="flex gap-1 glass rounded-xl p-1">
            {(["monthly", "annual"] as const).map((period) => (
              <button
                key={period}
                onClick={() => setBillingPeriod(period)}
                className={`px-6 py-2.5 rounded-lg text-sm font-semibold capitalize transition-all ${
                  billingPeriod === period
                    ? "bg-brand-500 text-white"
                    : "text-gray-400 hover:text-white"
                }`}
              >
                {period}
                {period === "annual" && (
                  <span className="ml-2 text-xs bg-gold-400/20 text-gold-400 px-1.5 py-0.5 rounded-full">
                    Save 17%
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Plans */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {PLANS.map((plan, i) => (
            <motion.div
              key={plan.id}
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.1 }}
              whileHover={{ y: -6 }}
              className={`relative glass rounded-3xl p-7 transition-all duration-300 ${
                plan.popular
                  ? "border-2 shadow-2xl"
                  : "border border-white/10"
              }`}
              style={
                plan.popular
                  ? { borderColor: `${plan.color}60`, boxShadow: `0 0 40px ${plan.color}15` }
                  : {}
              }
            >
              {plan.popular && (
                <div
                  className="absolute -top-4 left-1/2 -translate-x-1/2 px-5 py-1.5 rounded-full text-xs font-black text-dark-900"
                  style={{ background: plan.color }}
                >
                  ⭐ Most Popular
                </div>
              )}

              {/* Icon & name */}
              <div className="mb-5">
                <span className="text-4xl">{plan.icon}</span>
                <h3 className="text-2xl font-black text-white mt-2">{plan.name}</h3>
                <p className="text-gray-500 text-sm mt-1">{plan.tagline}</p>
              </div>

              {/* Price */}
              <div className="mb-6">
                <div className="flex items-baseline gap-1">
                  <span className="text-5xl font-black" style={{ color: plan.color }}>
                    {formatCurrency(billingPeriod === "monthly" ? plan.price : Math.floor(plan.annualPrice / 12))}
                  </span>
                  <span className="text-gray-500">/mo</span>
                </div>
                {billingPeriod === "annual" && (
                  <p className="text-xs text-gray-500 mt-1">
                    Billed {formatCurrency(plan.annualPrice)} annually
                  </p>
                )}
              </div>

              {/* Features */}
              <ul className="space-y-3 mb-8">
                {plan.features.map((f, j) => (
                  <li key={j} className="flex items-start gap-2.5 text-sm">
                    <div
                      className={`w-4.5 h-4.5 rounded-full flex items-center justify-center shrink-0 mt-0.5 ${
                        f.included ? "" : "opacity-30"
                      }`}
                      style={
                        f.included
                          ? { background: `${plan.color}20`, border: `1px solid ${plan.color}40` }
                          : { background: "rgba(100,100,100,0.1)", border: "1px solid rgba(100,100,100,0.2)" }
                      }
                    >
                      <Check
                        className="w-2.5 h-2.5"
                        style={{ color: f.included ? plan.color : "#555" }}
                      />
                    </div>
                    <span className={f.included ? "text-gray-300" : "text-gray-600"}>
                      {f.text}
                    </span>
                  </li>
                ))}
              </ul>

              <button
                onClick={() => handleJoin(plan.id)}
                className="w-full py-3.5 rounded-xl font-bold text-sm transition-all"
                style={
                  plan.popular
                    ? { background: plan.color, color: "#000" }
                    : { background: `${plan.color}15`, color: plan.color, border: `1px solid ${plan.color}30` }
                }
              >
                Get {plan.name} — {formatCurrency(billingPeriod === "monthly" ? plan.price : plan.annualPrice)}
              </button>
            </motion.div>
          ))}
        </div>

        {/* Perks section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <h2 className="text-3xl font-black text-white text-center mb-8">
            Member <span className="gradient-text">Perks</span>
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PERKS.map((perk, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.06 }}
                viewport={{ once: true }}
                className="glass rounded-2xl p-5 flex gap-4"
              >
                <div className="w-10 h-10 rounded-xl bg-brand-500/10 flex items-center justify-center text-brand-500 shrink-0">
                  {perk.icon}
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1">{perk.title}</h4>
                  <p className="text-gray-500 text-sm">{perk.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* Signup modal */}
        {showForm && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-dark-900/80 backdrop-blur-lg">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="glass rounded-3xl p-8 w-full max-w-md border border-white/10"
            >
              <h3 className="text-2xl font-black text-white mb-2">
                Join{" "}
                {selectedPlan?.charAt(0).toUpperCase()}{selectedPlan?.slice(1)} Membership
              </h3>
              <p className="text-gray-500 text-sm mb-6">
                Our team will contact you within 24 hours to complete your enrollment.
              </p>

              <form onSubmit={handleSubmit} className="space-y-4">
                <input
                  required
                  value={formData.name}
                  onChange={(e) => setFormData((p) => ({ ...p, name: e.target.value }))}
                  placeholder="Full Name"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <input
                  required
                  value={formData.phone}
                  onChange={(e) => setFormData((p) => ({ ...p, phone: e.target.value }))}
                  placeholder="Phone Number"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <input
                  value={formData.email}
                  onChange={(e) => setFormData((p) => ({ ...p, email: e.target.value }))}
                  placeholder="Email (optional)"
                  type="email"
                  className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                />
                <div className="flex gap-3">
                  <button
                    type="button"
                    onClick={() => setShowForm(false)}
                    className="flex-1 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all"
                  >
                    <Zap className="w-4 h-4" />
                    Submit
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </div>
    </div>
  );
}
