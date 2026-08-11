import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Poppins, Playfair_Display } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800", "900"],
  variable: "--font-playfair",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Pawfect — Premium Pet Care",
  description:
    "Premium pet care services with love, attention, and expertise. Your furry friends deserve nothing but the best.",
  keywords: ["pet care", "dog grooming", "cat care", "premium pet services"],
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} ${playfair.variable}`} suppressHydrationWarning>
      <head>
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🐾</text></svg>"
        />
      </head>
      <body className="font-sans bg-amber-50 text-slate-900 antialiased overflow-x-hidden">
        {children}
      </body>
    </html>
  );
}
