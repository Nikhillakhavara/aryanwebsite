import type { Metadata } from "next";
import { Toaster } from "react-hot-toast";
import Navbar from "@/components/Navbar";
import LoadingScreen from "@/components/LoadingScreen";
import CursorGlow from "@/components/CursorGlow";
import "./globals.css";

export const metadata: Metadata = {
  title: "Billiards Club 08 | Premium Pool & Snooker — Ahmedabad",
  description:
    "Ahmedabad's most premium pool and snooker club. Book tables online, track your game, join tournaments. 8 professional tables, 12 PM - 12 AM daily.",
  keywords:
    "billiards club Ahmedabad, pool table booking, snooker club, billiards 08, pool club Gujarat",
  authors: [{ name: "Billiards Club 08" }],
  openGraph: {
    title: "Billiards Club 08 | Premium Pool & Snooker — Ahmedabad",
    description:
      "Book premium pool and snooker tables online. Ahmedabad's finest billiards club.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning className="dark">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin="anonymous"
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800;900&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-dark-900 text-white antialiased">
        <LoadingScreen />
        <CursorGlow />
        <Navbar />
        <main>{children}</main>
        <Toaster
          position="bottom-right"
          toastOptions={{
            style: {
              background: "#1F1F1F",
              color: "#fff",
              border: "1px solid rgba(255,255,255,0.1)",
              borderRadius: "12px",
            },
            success: {
              iconTheme: { primary: "#00C16E", secondary: "#fff" },
            },
            error: {
              iconTheme: { primary: "#ef4444", secondary: "#fff" },
            },
          }}
        />
      </body>
    </html>
  );
}
