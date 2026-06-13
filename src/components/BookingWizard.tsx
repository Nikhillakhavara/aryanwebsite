"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import {
  ChevronRight,
  ChevronLeft,
  Check,
  Circle,
  Trophy,
  Clock,
  Calendar,
  User,
  Phone,
  Zap,
} from "lucide-react";
import { cn, formatCurrency, formatTime } from "@/lib/utils";
import { DEMO_TABLES } from "@/lib/demo";
import { bookingsApi } from "@/lib/api";

const POOL_RATE = 150;
const SNOOKER_RATE = 250;
const DURATION_OPTIONS = [1, 1.5, 2, 2.5, 3, 4];
const TIME_SLOTS = [
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30",
  "18:00", "18:30", "19:00", "19:30", "20:00", "20:30",
  "21:00", "21:30", "22:00", "22:30", "23:00",
];

interface BookingForm {
  customerName: string;
  customerPhone: string;
  tableId: string;
  tableType: "pool" | "snooker";
  date: string;
  startTime: string;
  duration: number;
}

interface BookingWizardProps {
  initialTableId?: string;
  initialType?: string;
}

export default function BookingWizard({ initialTableId, initialType }: BookingWizardProps) {
  const [step, setStep] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const [bookingId, setBookingId] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const today = new Date().toISOString().split("T")[0];

  const { register, watch, setValue, handleSubmit, formState: { errors } } = useForm<BookingForm>({
    defaultValues: {
      tableType: (initialType as "pool" | "snooker") || "pool",
      tableId: initialTableId || "",
      date: today,
      startTime: "18:00",
      duration: 1,
    },
  });

  const tableType = watch("tableType");
  const tableId = watch("tableId");
  const date = watch("date");
  const startTime = watch("startTime");
  const duration = watch("duration");

  const filteredTables = DEMO_TABLES.filter((t) => t.tableType === tableType && t.status === "available");
  const selectedTable = DEMO_TABLES.find((t) => t._id === tableId);
  const rate = tableType === "pool" ? POOL_RATE : SNOOKER_RATE;
  const amount = rate * duration;

  const stepVariants = {
    enter: { opacity: 0, x: 30 },
    center: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: -30 },
  };

  const onSubmit = async (data: BookingForm) => {
    setIsSubmitting(true);
    try {
      const res = await bookingsApi.create({
        customerName: data.customerName,
        customerPhone: data.customerPhone,
        tableId: data.tableId,
        date: data.date,
        startTime: data.startTime,
        duration: data.duration,
      });
      setBookingId(res.data?.bookingId || `BC08-${Date.now()}`);
      setIsSuccess(true);
    } catch {
      toast.error("Booking failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="glass rounded-3xl p-8 md:p-12 text-center max-w-xl mx-auto"
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: "spring", delay: 0.2 }}
          className="w-20 h-20 rounded-full bg-brand-500/20 border-2 border-brand-500 flex items-center justify-center mx-auto mb-6"
        >
          <Check className="w-10 h-10 text-brand-500" />
        </motion.div>

        <h2 className="text-3xl font-black text-white mb-2">Booking Confirmed!</h2>
        <p className="text-gray-400 mb-6">Your table has been reserved successfully</p>

        <div className="glass rounded-2xl p-4 mb-6 text-left space-y-3">
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Booking ID</span>
            <span className="text-brand-500 font-mono font-semibold text-sm">{bookingId}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Table</span>
            <span className="text-white text-sm">{selectedTable?.tableNumber} ({tableType})</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Date</span>
            <span className="text-white text-sm">{date}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Time</span>
            <span className="text-white text-sm">{formatTime(startTime)}</span>
          </div>
          <div className="flex justify-between">
            <span className="text-gray-500 text-sm">Duration</span>
            <span className="text-white text-sm">{duration} hour{duration !== 1 ? "s" : ""}</span>
          </div>
          <div className="flex justify-between border-t border-white/10 pt-3">
            <span className="text-gray-400 font-semibold">Amount</span>
            <span className="text-brand-500 font-bold text-lg">{formatCurrency(amount)}</span>
          </div>
        </div>

        <p className="text-gray-500 text-sm mb-6">
          Show this booking ID at the reception. Payment due at venue.
        </p>

        <button
          onClick={() => { setIsSuccess(false); setStep(1); }}
          className="px-8 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all"
        >
          Book Another Table
        </button>
      </motion.div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto">
      {/* Progress Steps */}
      <div className="flex items-center justify-center gap-3 mb-8">
        {[1, 2, 3].map((s) => (
          <div key={s} className="flex items-center gap-3">
            <div
              className={cn(
                "w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold transition-all duration-300",
                step > s
                  ? "bg-brand-500 text-white"
                  : step === s
                  ? "bg-brand-500/20 border-2 border-brand-500 text-brand-500"
                  : "bg-dark-700 border border-white/10 text-gray-600"
              )}
            >
              {step > s ? <Check className="w-4 h-4" /> : s}
            </div>
            <span
              className={cn(
                "text-xs font-medium hidden sm:block",
                step >= s ? "text-white" : "text-gray-600"
              )}
            >
              {s === 1 ? "Select Table" : s === 2 ? "Date & Time" : "Confirm"}
            </span>
            {s < 3 && <div className={cn("w-8 h-px", step > s ? "bg-brand-500" : "bg-white/10")} />}
          </div>
        ))}
      </div>

      <form onSubmit={handleSubmit(onSubmit)}>
        <AnimatePresence mode="wait">
          {/* Step 1: Table Type + Selection */}
          {step === 1 && (
            <motion.div
              key="step1"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Choose Your Game
              </h2>

              {/* Type selector */}
              <div className="grid grid-cols-2 gap-4 mb-6">
                {(["pool", "snooker"] as const).map((type) => (
                  <button
                    key={type}
                    type="button"
                    onClick={() => { setValue("tableType", type); setValue("tableId", ""); }}
                    className={cn(
                      "relative p-5 rounded-2xl border-2 transition-all duration-200 text-left",
                      tableType === type
                        ? "border-brand-500 bg-brand-500/10"
                        : "border-white/10 bg-white/5 hover:border-white/20"
                    )}
                  >
                    <div className="text-2xl mb-2">{type === "pool" ? "🎱" : "🎮"}</div>
                    <div className="font-bold text-white capitalize">{type}</div>
                    <div className="text-xs text-gray-500 mt-1">
                      {type === "pool" ? `${formatCurrency(POOL_RATE)}/hr` : `${formatCurrency(SNOOKER_RATE)}/hr`}
                    </div>
                    {tableType === type && (
                      <div className="absolute top-3 right-3 w-5 h-5 rounded-full bg-brand-500 flex items-center justify-center">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    )}
                  </button>
                ))}
              </div>

              {/* Table selection */}
              <h3 className="text-sm font-medium text-gray-400 mb-3 uppercase tracking-wider">
                Available Tables
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {filteredTables.length === 0 ? (
                  <p className="text-gray-500 col-span-3 text-center py-6">
                    No available {tableType} tables right now
                  </p>
                ) : (
                  filteredTables.map((t) => (
                    <button
                      key={t._id}
                      type="button"
                      onClick={() => setValue("tableId", t._id)}
                      className={cn(
                        "p-3 rounded-xl border transition-all duration-200 text-left",
                        tableId === t._id
                          ? "border-brand-500 bg-brand-500/10"
                          : "border-white/10 bg-white/5 hover:border-white/20"
                      )}
                    >
                      <div className="flex items-center gap-2 mb-1">
                        <Circle className="w-2 h-2 fill-brand-500 text-brand-500" />
                        <span className="text-xs text-brand-500 font-medium">Available</span>
                      </div>
                      <div className="font-bold text-white text-sm">{t.tableNumber}</div>
                    </button>
                  ))
                )}
              </div>

              <button
                type="button"
                onClick={() => {
                  if (!tableId) { toast.error("Please select a table"); return; }
                  setStep(2);
                }}
                className="mt-6 w-full flex items-center justify-center gap-2 py-3.5 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all"
              >
                Continue <ChevronRight className="w-4 h-4" />
              </button>
            </motion.div>
          )}

          {/* Step 2: Date, Time, Duration */}
          {step === 2 && (
            <motion.div
              key="step2"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                When do you want to play?
              </h2>

              <div className="space-y-5">
                {/* Date */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <Calendar className="w-4 h-4" /> Date
                  </label>
                  <input
                    type="date"
                    min={today}
                    {...register("date", { required: "Date is required" })}
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  {errors.date && <p className="text-red-400 text-xs mt-1">{errors.date.message}</p>}
                </div>

                {/* Time */}
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <Clock className="w-4 h-4" /> Start Time
                  </label>
                  <div className="grid grid-cols-4 sm:grid-cols-6 gap-2">
                    {TIME_SLOTS.map((slot) => (
                      <button
                        key={slot}
                        type="button"
                        onClick={() => setValue("startTime", slot)}
                        className={cn(
                          "py-2 rounded-lg text-xs font-medium transition-all",
                          startTime === slot
                            ? "bg-brand-500 text-white"
                            : "bg-dark-700 text-gray-400 hover:bg-dark-600"
                        )}
                      >
                        {formatTime(slot)}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Duration */}
                <div>
                  <label className="text-sm font-medium text-gray-400 mb-2 block">
                    Duration
                  </label>
                  <div className="flex gap-2 flex-wrap">
                    {DURATION_OPTIONS.map((d) => (
                      <button
                        key={d}
                        type="button"
                        onClick={() => setValue("duration", d)}
                        className={cn(
                          "px-4 py-2 rounded-lg text-sm font-medium transition-all",
                          duration === d
                            ? "bg-brand-500 text-white"
                            : "bg-dark-700 text-gray-400 hover:bg-dark-600"
                        )}
                      >
                        {d}h
                      </button>
                    ))}
                  </div>
                </div>

                {/* Amount preview */}
                <div className="glass rounded-xl p-4 flex items-center justify-between">
                  <span className="text-gray-400">Estimated Amount</span>
                  <span className="text-2xl font-black text-brand-500">{formatCurrency(amount)}</span>
                </div>
              </div>

              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="button"
                  onClick={() => setStep(3)}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-semibold transition-all"
                >
                  Review Booking <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Contact + Review */}
          {step === 3 && (
            <motion.div
              key="step3"
              variants={stepVariants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.3 }}
              className="glass rounded-3xl p-6 md:p-8"
            >
              <h2 className="text-2xl font-bold text-white mb-6">
                Review & Confirm
              </h2>

              {/* Booking summary */}
              <div className="glass rounded-2xl p-4 mb-6 space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Table</span>
                  <span className="text-white font-semibold">
                    {selectedTable?.tableNumber} · {tableType.charAt(0).toUpperCase() + tableType.slice(1)}
                  </span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Date</span>
                  <span className="text-white">{date}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Time</span>
                  <span className="text-white">{formatTime(startTime)}</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-gray-500 text-sm">Duration</span>
                  <span className="text-white">{duration} hour{duration !== 1 ? "s" : ""}</span>
                </div>
                <div className="border-t border-white/10 pt-3 flex justify-between items-center">
                  <span className="text-gray-300 font-semibold">Total Amount</span>
                  <span className="text-3xl font-black text-brand-500">{formatCurrency(amount)}</span>
                </div>
              </div>

              {/* Contact info */}
              <div className="space-y-4 mb-6">
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <User className="w-4 h-4" /> Your Name
                  </label>
                  <input
                    {...register("customerName", { required: "Name is required", minLength: { value: 2, message: "Name too short" } })}
                    placeholder="Enter your full name"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  {errors.customerName && <p className="text-red-400 text-xs mt-1">{errors.customerName.message}</p>}
                </div>
                <div>
                  <label className="flex items-center gap-2 text-sm font-medium text-gray-400 mb-2">
                    <Phone className="w-4 h-4" /> Phone Number
                  </label>
                  <input
                    {...register("customerPhone", {
                      required: "Phone is required",
                      pattern: { value: /^[0-9+\-\s]{10,15}$/, message: "Invalid phone number" },
                    })}
                    placeholder="+91 98765 43210"
                    className="w-full bg-dark-700 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-600 focus:outline-none focus:border-brand-500 transition-colors"
                  />
                  {errors.customerPhone && <p className="text-red-400 text-xs mt-1">{errors.customerPhone.message}</p>}
                </div>
              </div>

              <p className="text-gray-600 text-xs mb-4 text-center">
                💳 Payment collected at venue · Free cancellation up to 1 hour before
              </p>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 text-gray-400 hover:text-white hover:border-white/20 transition-all"
                >
                  <ChevronLeft className="w-4 h-4" /> Back
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl bg-brand-500 hover:bg-brand-600 text-white font-bold transition-all disabled:opacity-50"
                >
                  {isSubmitting ? (
                    <span className="animate-pulse">Processing...</span>
                  ) : (
                    <>
                      <Zap className="w-4 h-4" />
                      Confirm Booking · {formatCurrency(amount)}
                    </>
                  )}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </div>
  );
}
