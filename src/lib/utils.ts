import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function formatTime(time: string): string {
  const [hours, minutes] = time.split(":").map(Number);
  const period = hours >= 12 ? "PM" : "AM";
  const displayHours = hours % 12 || 12;
  return `${displayHours}:${String(minutes).padStart(2, "0")} ${period}`;
}

export function getStatusColor(status: string): string {
  switch (status.toLowerCase()) {
    case "available":
      return "text-brand-500 bg-brand-500/10 border-brand-500/30";
    case "occupied":
      return "text-red-400 bg-red-400/10 border-red-400/30";
    case "reserved":
      return "text-yellow-400 bg-yellow-400/10 border-yellow-400/30";
    case "maintenance":
      return "text-gray-400 bg-gray-400/10 border-gray-400/30";
    default:
      return "text-gray-400 bg-gray-400/10 border-gray-400/30";
  }
}

export function getStatusDotColor(status: string): string {
  switch (status.toLowerCase()) {
    case "available":
      return "bg-brand-500";
    case "occupied":
      return "bg-red-400";
    case "reserved":
      return "bg-yellow-400";
    case "maintenance":
      return "bg-gray-400";
    default:
      return "bg-gray-400";
  }
}

export function calculateAmount(
  ratePerHour: number,
  durationHours: number
): number {
  return ratePerHour * durationHours;
}

export function getNextAvailableSlot(occupiedUntil?: string): string {
  if (!occupiedUntil) return "Now";
  return occupiedUntil;
}

export function generateTimeSlots(
  startHour: number = 12,
  endHour: number = 24
): string[] {
  const slots: string[] = [];
  for (let hour = startHour; hour < endHour; hour++) {
    slots.push(`${String(hour).padStart(2, "0")}:00`);
    if (hour < endHour - 1) {
      slots.push(`${String(hour).padStart(2, "0")}:30`);
    }
  }
  return slots;
}

export function formatDuration(hours: number): string {
  if (hours === 1) return "1 hour";
  if (hours % 1 === 0) return `${hours} hours`;
  const wholeHours = Math.floor(hours);
  const minutes = (hours - wholeHours) * 60;
  if (wholeHours === 0) return `${minutes} minutes`;
  return `${wholeHours}h ${minutes}m`;
}
