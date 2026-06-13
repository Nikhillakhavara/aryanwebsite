export interface Table {
  _id: string;
  tableNumber: string;
  tableType: "pool" | "snooker";
  status: "available" | "occupied" | "reserved" | "maintenance";
  ratePerHour: number;
  currentBooking?: {
    customerName: string;
    endTime: string;
  };
  nextAvailable?: string;
  description?: string;
}

export interface Booking {
  _id: string;
  bookingId: string;
  customerName: string;
  customerPhone: string;
  tableId: string;
  tableName: string;
  tableType: "pool" | "snooker";
  date: string;
  startTime: string;
  endTime: string;
  duration: number;
  amount: number;
  status: "confirmed" | "pending" | "completed" | "cancelled";
  createdAt: string;
}

export interface LeaderboardPlayer {
  rank: number;
  name: string;
  hoursPlayed: number;
  gamesWon: number;
  badge: "gold" | "silver" | "bronze" | "regular";
  avatar: string;
  joinedDate: string;
}

export interface Review {
  _id: string;
  name: string;
  avatar: string;
  rating: number;
  review: string;
  date: string;
  tableType?: string;
}

export interface Stats {
  tablesAvailable: number;
  playersToday: number;
  totalGames: number;
  revenueToday: number;
}

export const DEMO_TABLES: Table[] = [
  {
    _id: "1",
    tableNumber: "NYR",
    tableType: "pool",
    status: "available",
    ratePerHour: 150,
    description: "Premium pool table with professional-grade felt",
  },
  {
    _id: "2",
    tableNumber: "ORION",
    tableType: "pool",
    status: "occupied",
    ratePerHour: 150,
    currentBooking: {
      customerName: "Rahul M.",
      endTime: "10:30 PM",
    },
    nextAvailable: "10:30 PM",
    description: "Competition-standard pool table",
  },
  {
    _id: "3",
    tableNumber: "VELOCITY",
    tableType: "pool",
    status: "available",
    ratePerHour: 150,
    description: "High-speed responsive pool table",
  },
  {
    _id: "4",
    tableNumber: "SHADOW",
    tableType: "pool",
    status: "reserved",
    ratePerHour: 150,
    nextAvailable: "11:00 PM",
    description: "Tournament grade pool table",
  },
  {
    _id: "5",
    tableNumber: "ECLIPSE",
    tableType: "pool",
    status: "available",
    ratePerHour: 150,
    description: "Premium billiards experience",
  },
  {
    _id: "6",
    tableNumber: "TITAN",
    tableType: "snooker",
    status: "available",
    ratePerHour: 250,
    description: "Full-size championship snooker table",
  },
  {
    _id: "7",
    tableNumber: "ASGARD",
    tableType: "snooker",
    status: "occupied",
    ratePerHour: 250,
    currentBooking: {
      customerName: "Priya S.",
      endTime: "11:00 PM",
    },
    nextAvailable: "11:00 PM",
    description: "Professional snooker table with LED surrounds",
  },
  {
    _id: "8",
    tableNumber: "ZEUS",
    tableType: "snooker",
    status: "available",
    ratePerHour: 250,
    description: "Olympic-grade snooker table",
  },
];

export const DEMO_BOOKINGS: Booking[] = [
  {
    _id: "b1",
    bookingId: "BC08-2025-001",
    customerName: "Arjun Mehta",
    customerPhone: "+91 98765 43210",
    tableId: "1",
    tableName: "NYR",
    tableType: "pool",
    date: "2025-01-15",
    startTime: "18:00",
    endTime: "19:30",
    duration: 1.5,
    amount: 225,
    status: "confirmed",
    createdAt: "2025-01-14T10:30:00Z",
  },
  {
    _id: "b2",
    bookingId: "BC08-2025-002",
    customerName: "Sneha Patel",
    customerPhone: "+91 87654 32109",
    tableId: "6",
    tableName: "TITAN",
    tableType: "snooker",
    date: "2025-01-15",
    startTime: "20:00",
    endTime: "22:00",
    duration: 2,
    amount: 500,
    status: "confirmed",
    createdAt: "2025-01-14T14:00:00Z",
  },
  {
    _id: "b3",
    bookingId: "BC08-2025-003",
    customerName: "Karan Shah",
    customerPhone: "+91 76543 21098",
    tableId: "3",
    tableName: "VELOCITY",
    tableType: "pool",
    date: "2025-01-15",
    startTime: "19:00",
    endTime: "21:00",
    duration: 2,
    amount: 300,
    status: "completed",
    createdAt: "2025-01-14T16:00:00Z",
  },
  {
    _id: "b4",
    bookingId: "BC08-2025-004",
    customerName: "Priya Sharma",
    customerPhone: "+91 65432 10987",
    tableId: "7",
    tableName: "ASGARD",
    tableType: "snooker",
    date: "2025-01-16",
    startTime: "21:00",
    endTime: "23:00",
    duration: 2,
    amount: 500,
    status: "pending",
    createdAt: "2025-01-15T09:00:00Z",
  },
  {
    _id: "b5",
    bookingId: "BC08-2025-005",
    customerName: "Rohit Verma",
    customerPhone: "+91 54321 09876",
    tableId: "2",
    tableName: "ORION",
    tableType: "pool",
    date: "2025-01-15",
    startTime: "22:00",
    endTime: "23:30",
    duration: 1.5,
    amount: 225,
    status: "confirmed",
    createdAt: "2025-01-15T11:00:00Z",
  },
];

export const DEMO_LEADERBOARD: LeaderboardPlayer[] = [
  {
    rank: 1,
    name: "Arjun Mehta",
    hoursPlayed: 342,
    gamesWon: 189,
    badge: "gold",
    avatar: "AM",
    joinedDate: "2024-01-15",
  },
  {
    rank: 2,
    name: "Priya Sharma",
    hoursPlayed: 298,
    gamesWon: 156,
    badge: "gold",
    avatar: "PS",
    joinedDate: "2024-02-20",
  },
  {
    rank: 3,
    name: "Karan Shah",
    hoursPlayed: 267,
    gamesWon: 142,
    badge: "gold",
    avatar: "KS",
    joinedDate: "2024-01-08",
  },
  {
    rank: 4,
    name: "Sneha Patel",
    hoursPlayed: 234,
    gamesWon: 118,
    badge: "silver",
    avatar: "SP",
    joinedDate: "2024-03-12",
  },
  {
    rank: 5,
    name: "Rohit Verma",
    hoursPlayed: 212,
    gamesWon: 103,
    badge: "silver",
    avatar: "RV",
    joinedDate: "2024-02-05",
  },
  {
    rank: 6,
    name: "Ananya Joshi",
    hoursPlayed: 189,
    gamesWon: 92,
    badge: "silver",
    avatar: "AJ",
    joinedDate: "2024-04-18",
  },
  {
    rank: 7,
    name: "Vikram Singh",
    hoursPlayed: 167,
    gamesWon: 78,
    badge: "bronze",
    avatar: "VS",
    joinedDate: "2024-05-22",
  },
  {
    rank: 8,
    name: "Meera Nair",
    hoursPlayed: 145,
    gamesWon: 67,
    badge: "bronze",
    avatar: "MN",
    joinedDate: "2024-06-10",
  },
  {
    rank: 9,
    name: "Dev Kapoor",
    hoursPlayed: 123,
    gamesWon: 55,
    badge: "bronze",
    avatar: "DK",
    joinedDate: "2024-07-05",
  },
  {
    rank: 10,
    name: "Riya Bose",
    hoursPlayed: 98,
    gamesWon: 42,
    badge: "regular",
    avatar: "RB",
    joinedDate: "2024-08-14",
  },
];

export const DEMO_REVIEWS: Review[] = [
  {
    _id: "r1",
    name: "Arjun M.",
    avatar: "AM",
    rating: 5,
    review:
      "Absolutely incredible experience! The tables are top-notch, the ambiance is premium, and the staff is super friendly. Best billiards club in Ahmedabad by far!",
    date: "2025-01-10",
    tableType: "snooker",
  },
  {
    _id: "r2",
    name: "Sneha P.",
    avatar: "SP",
    rating: 5,
    review:
      "The online booking system is so smooth! Booked a table in under 2 minutes. The tables are perfectly maintained and the atmosphere is just amazing.",
    date: "2025-01-08",
    tableType: "pool",
  },
  {
    _id: "r3",
    name: "Karan S.",
    avatar: "KS",
    rating: 5,
    review:
      "We come here every weekend with our friend group. The membership is totally worth it. Love the leaderboard feature — keeps the competition alive!",
    date: "2025-01-05",
    tableType: "pool",
  },
  {
    _id: "r4",
    name: "Priya V.",
    avatar: "PV",
    rating: 4,
    review:
      "Great place with a fantastic dark ambiance. The snooker tables are regulation size and in perfect condition. Highly recommend for serious players.",
    date: "2025-01-02",
    tableType: "snooker",
  },
  {
    _id: "r5",
    name: "Rohit K.",
    avatar: "RK",
    rating: 5,
    review:
      "This is what a modern billiards club should look like. The lighting, the music, the vibe — everything is on point. Already planning my next visit!",
    date: "2024-12-28",
    tableType: "pool",
  },
];

export const DEMO_STATS: Stats = {
  tablesAvailable: 5,
  playersToday: 247,
  totalGames: 12483,
  revenueToday: 18500,
};

export const DAILY_REVENUE_DATA = [
  { day: "Mon", revenue: 12400, bookings: 48 },
  { day: "Tue", revenue: 15800, bookings: 62 },
  { day: "Wed", revenue: 11200, bookings: 41 },
  { day: "Thu", revenue: 18900, bookings: 74 },
  { day: "Fri", revenue: 24500, bookings: 98 },
  { day: "Sat", revenue: 32100, bookings: 127 },
  { day: "Sun", revenue: 28700, bookings: 112 },
];
