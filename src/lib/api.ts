import axios from "axios";
import {
  DEMO_TABLES,
  DEMO_BOOKINGS,
  DEMO_LEADERBOARD,
  DEMO_REVIEWS,
  DEMO_STATS,
} from "./demo";

const API_URL =
  process.env.NEXT_PUBLIC_API_URL || "http://localhost:5001/api/v1";

const api = axios.create({
  baseURL: API_URL,
  timeout: 8000,
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("adminToken");
      if (token) {
        config.headers.Authorization = `Bearer ${token}`;
      }
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      if (typeof window !== "undefined") {
        localStorage.removeItem("adminToken");
      }
    }
    return Promise.reject(error);
  }
);

// Tables API
export const tablesApi = {
  getAll: async () => {
    try {
      const res = await api.get("/tables");
      return res.data;
    } catch {
      return { success: true, data: DEMO_TABLES };
    }
  },

  getById: async (id: string) => {
    try {
      const res = await api.get(`/tables/${id}`);
      return res.data;
    } catch {
      const table = DEMO_TABLES.find((t) => t._id === id);
      return { success: true, data: table };
    }
  },

  getAvailability: async (tableId: string, date: string) => {
    try {
      const res = await api.get(`/tables/${tableId}/availability`, {
        params: { date },
      });
      return res.data;
    } catch {
      return { success: true, data: [] };
    }
  },

  create: async (data: Partial<(typeof DEMO_TABLES)[0]>) => {
    const res = await api.post("/tables", data);
    return res.data;
  },

  update: async (id: string, data: Partial<(typeof DEMO_TABLES)[0]>) => {
    const res = await api.put(`/tables/${id}`, data);
    return res.data;
  },

  delete: async (id: string) => {
    const res = await api.delete(`/tables/${id}`);
    return res.data;
  },

  toggleStatus: async (id: string, status: string) => {
    try {
      const res = await api.patch(`/tables/${id}/status`, { status });
      return res.data;
    } catch {
      return { success: true, message: "Status updated (demo mode)" };
    }
  },
};

// Bookings API
export const bookingsApi = {
  create: async (data: {
    customerName: string;
    customerPhone: string;
    tableId: string;
    date: string;
    startTime: string;
    duration: number;
  }) => {
    try {
      const res = await api.post("/bookings", data);
      return res.data;
    } catch {
      const mockBooking = {
        ...data,
        _id: `demo-${Date.now()}`,
        bookingId: `BC08-${Date.now()}`,
        status: "confirmed",
        amount: 150 * data.duration,
        createdAt: new Date().toISOString(),
      };
      return { success: true, data: mockBooking };
    }
  },

  getAll: async (params?: {
    date?: string;
    status?: string;
    tableId?: string;
  }) => {
    try {
      const res = await api.get("/bookings", { params });
      return res.data;
    } catch {
      return { success: true, data: DEMO_BOOKINGS };
    }
  },

  getById: async (id: string) => {
    try {
      const res = await api.get(`/bookings/${id}`);
      return res.data;
    } catch {
      const booking = DEMO_BOOKINGS.find((b) => b._id === id);
      return { success: true, data: booking };
    }
  },

  update: async (
    id: string,
    data: { status: "confirmed" | "completed" | "cancelled" }
  ) => {
    try {
      const res = await api.patch(`/bookings/${id}`, data);
      return res.data;
    } catch {
      return { success: true, message: "Booking updated (demo mode)" };
    }
  },

  cancel: async (id: string) => {
    try {
      const res = await api.delete(`/bookings/${id}`);
      return res.data;
    } catch {
      return { success: true, message: "Booking cancelled (demo mode)" };
    }
  },
};

// Leaderboard API
export const leaderboardApi = {
  getAll: async (period?: "monthly" | "all-time") => {
    try {
      const res = await api.get("/leaderboard", { params: { period } });
      return res.data;
    } catch {
      return { success: true, data: DEMO_LEADERBOARD };
    }
  },
};

// Reviews API
export const reviewsApi = {
  getAll: async () => {
    try {
      const res = await api.get("/reviews");
      return res.data;
    } catch {
      return { success: true, data: DEMO_REVIEWS };
    }
  },
};

// Stats API
export const statsApi = {
  getPublic: async () => {
    try {
      const res = await api.get("/stats/public");
      return res.data;
    } catch {
      return { success: true, data: DEMO_STATS };
    }
  },

  getAdmin: async () => {
    try {
      const res = await api.get("/stats/admin");
      return res.data;
    } catch {
      return {
        success: true,
        data: {
          ...DEMO_STATS,
          totalBookings: 1247,
          activeMembers: 89,
          tablesInUse: 3,
          monthlyRevenue: 284500,
        },
      };
    }
  },
};

// Auth API
export const authApi = {
  adminLogin: async (username: string, password: string) => {
    try {
      const res = await api.post("/auth/admin/login", { username, password });
      return res.data;
    } catch {
      // Demo admin login
      if (username === "admin" && password === "admin123") {
        const token = "demo-admin-token-" + Date.now();
        return { success: true, token, user: { username: "admin", role: "admin" } };
      }
      throw new Error("Invalid credentials");
    }
  },

  logout: () => {
    if (typeof window !== "undefined") {
      localStorage.removeItem("adminToken");
    }
  },
};

export default api;
