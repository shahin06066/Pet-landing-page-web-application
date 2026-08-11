"use client";

import { createContext, useCallback, useContext, useMemo, useState, type ReactNode } from "react";
import dynamic from "next/dynamic";

// Load the booking form only when someone actually opens it
const BookingModal = dynamic(() => import("@/components/BookingModal"), {
  ssr: false,
});

type BookingContextValue = {
  openBooking: (plan?: string, service?: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

export function useBooking() {
  const ctx = useContext(BookingContext);
  if (!ctx) throw new Error("useBooking must be used within BookingProvider");
  return ctx;
}

export default function BookingProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [plan, setPlan] = useState<string | null>(null);
  const [service, setService] = useState<string | null>(null);

  const openBooking = useCallback((plan?: string, service?: string) => {
    setPlan(plan ?? null);
    setService(service ?? null);
    setIsOpen(true);
  }, []);

  const contextValue = useMemo(() => ({ openBooking }), [openBooking]);

  return (
    <BookingContext.Provider value={contextValue}>
      {children}
      {isOpen && (
        <BookingModal onClose={() => setIsOpen(false)} preselectedPlan={plan} preselectedService={service} />
      )}
    </BookingContext.Provider>
  );
}
