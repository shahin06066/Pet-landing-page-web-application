"use client";

import type { ButtonHTMLAttributes } from "react";
import { useBooking } from "./BookingProvider";

type BookButtonProps = {
  plan?: string;
  service?: string;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export default function BookButton({ plan, service, onClick, children, ...rest }: BookButtonProps) {
  const { openBooking } = useBooking();

  return (
    <button
      {...rest}
      onClick={(event) => {
        onClick?.(event);
        openBooking(plan, service);
      }}
    >
      {children}
    </button>
  );
}
