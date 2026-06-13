"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { motion } from "framer-motion";
import BookingWizard from "@/components/BookingWizard";

function BookPageContent() {
  const searchParams = useSearchParams();
  const tableId = searchParams.get("table") || "";
  const tableType = searchParams.get("type") || "pool";

  return (
    <div className="min-h-screen bg-dark-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-10"
        >
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-brand-500/10 border border-brand-500/20 text-brand-500 text-xs font-medium mb-4">
            <span className="w-1.5 h-1.5 rounded-full bg-brand-500 animate-pulse" />
            Instant Booking
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-3">
            Book Your <span className="gradient-text">Table</span>
          </h1>
          <p className="text-gray-500 max-w-md mx-auto">
            Reserve your spot in under 60 seconds. No payment needed upfront.
          </p>
        </motion.div>

        <BookingWizard initialTableId={tableId} initialType={tableType} />
      </div>
    </div>
  );
}

export default function BookPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-dark-900 flex items-center justify-center">
          <div className="w-8 h-8 rounded-full border-2 border-brand-500 border-t-transparent animate-spin" />
        </div>
      }
    >
      <BookPageContent />
    </Suspense>
  );
}
