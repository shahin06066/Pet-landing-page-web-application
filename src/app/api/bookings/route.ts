import { NextResponse } from "next/server";
import { db } from "@/db";
import { bookings } from "@/db/schema";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { ownerName, email, phone, petName, petType, service, plan, preferredDate, notes } = body;

    // Basic validation
    if (!ownerName || !email || !petName || !petType || !service) {
      return NextResponse.json(
        { error: "Owner name, email, pet name, pet type, and service are required" },
        { status: 400 }
      );
    }

    // Simple email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return NextResponse.json({ error: "Invalid email address" }, { status: 400 });
    }

    const [newBooking] = await db
      .insert(bookings)
      .values({
        ownerName: ownerName.trim(),
        email: email.trim().toLowerCase(),
        phone: phone?.trim() || null,
        petName: petName.trim(),
        petType: petType.trim(),
        service: service.trim(),
        plan: plan?.trim() || null,
        preferredDate: preferredDate?.trim() || null,
        notes: notes?.trim() || null,
      })
      .returning();

    return NextResponse.json(
      {
        success: true,
        booking: newBooking,
        message: "Booking confirmed! We'll be in touch soon.",
      },
      { status: 201 }
    );
  } catch (error) {
    console.error("Booking error:", error);
    return NextResponse.json(
      { error: "Failed to create booking. Please try again." },
      { status: 500 }
    );
  }
}
