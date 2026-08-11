"use client";

import { useEffect, useRef, useState, type FormEvent } from "react";
import { gsap } from "gsap";

export type BookingModalProps = {
  onClose: () => void;
  preselectedPlan?: string | null;
  preselectedService?: string | null;
};

const SERVICES = [
  "Health Check",
  "Grooming Spa",
  "Premium Food Plan",
  "Play & Exercise",
  "Pet Boarding",
  "Pet Transport",
  "Wellness Plan",
  "Training",
];

const PLANS = ["Basic", "Premium", "Elite"];

type Status = "idle" | "submitting" | "success" | "error";

export default function BookingModal({ onClose, preselectedPlan, preselectedService }: BookingModalProps) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const modalRef = useRef<HTMLDivElement>(null);

  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  // Fresh state on every open — the parent only mounts this modal when it's visible
  const [form, setForm] = useState({
    ownerName: "",
    email: "",
    phone: "",
    petName: "",
    petType: "Dog",
    service: preselectedService || "",
    plan: preselectedPlan || "",
    preferredDate: "",
    notes: "",
  });

  // Entrance animation (runs once, when the modal is opened)
  useEffect(() => {
    document.body.style.overflow = "hidden";

    if (!window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      if (overlayRef.current && modalRef.current) {
        gsap.fromTo(overlayRef.current, { opacity: 0 }, { opacity: 1, duration: 0.3 });
        gsap.fromTo(
          modalRef.current,
          { y: 40, opacity: 0, scale: 0.95 },
          { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
        );
      }
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    try {
      const res = await fetch("/api/bookings", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error || "Failed to create booking");
      }
      setStatus("success");
    } catch (err) {
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong");
      setStatus("error");
    }
  };

  const handleClose = () => {
    if (status === "submitting") return;
    onClose();
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
      onClick={handleClose}
    >
      <div
        ref={modalRef}
        className="relative bg-white rounded-3xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Decorative gradient */}
        <div className="absolute top-0 left-0 right-0 h-32 bg-gradient-to-br from-amber-400 via-orange-400 to-rose-400 rounded-t-3xl opacity-90"></div>
        <div className="absolute top-6 right-6 text-5xl opacity-30">🐾</div>

        {/* Close button */}
        <button
          onClick={handleClose}
          className="absolute top-4 right-4 z-10 w-10 h-10 rounded-full bg-white/90 hover:bg-white flex items-center justify-center shadow-lg transition-transform hover:scale-110"
          aria-label="Close"
        >
          <span className="text-2xl leading-none text-gray-700">×</span>
        </button>

        <div className="relative p-8 pt-14">
          {status === "success" ? (
            <div className="text-center py-8">
              <div className="text-7xl mb-4">🎉</div>
              <h2 className="text-3xl font-bold mb-3 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                Booking Confirmed!
              </h2>
              <p className="text-gray-700 mb-2 text-lg">
                Thank you, <span className="font-semibold">{form.ownerName}</span>!
              </p>
              <p className="text-gray-600 mb-8">
                We&apos;ve received your booking for <span className="font-semibold">{form.petName}</span>.
                Our team will contact you at <span className="font-semibold">{form.email}</span> within the next few hours to confirm all the details.
              </p>
              <button
                onClick={handleClose}
                className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-8 py-3 rounded-full font-semibold hover:shadow-xl hover:scale-105 transition-all"
              >
                Done
              </button>
            </div>
          ) : (
            <>
              <div className="mb-6">
                <h2 className="text-3xl font-bold mb-2 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
                  Book a Premium Service
                </h2>
                <p className="text-gray-600">Fill in the details below and we&apos;ll take care of the rest.</p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-5">
                {/* Owner + Pet Name */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Your Name *</label>
                    <input
                      required
                      type="text"
                      name="ownerName"
                      value={form.ownerName}
                      onChange={handleChange}
                      placeholder="Jane Doe"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pet&apos;s Name *</label>
                    <input
                      required
                      type="text"
                      name="petName"
                      value={form.petName}
                      onChange={handleChange}
                      placeholder="Max"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Email + Phone */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Email *</label>
                    <input
                      required
                      type="email"
                      name="email"
                      value={form.email}
                      onChange={handleChange}
                      placeholder="jane@example.com"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Phone</label>
                    <input
                      type="tel"
                      name="phone"
                      value={form.phone}
                      onChange={handleChange}
                      placeholder="+1 (555) 123-4567"
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Pet Type + Service */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Pet Type *</label>
                    <select
                      required
                      name="petType"
                      value={form.petType}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-white"
                    >
                      <option value="Dog">🐕 Dog</option>
                      <option value="Cat">🐈 Cat</option>
                      <option value="Bird">🦜 Bird</option>
                      <option value="Rabbit">🐇 Rabbit</option>
                      <option value="Other">🐾 Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Service *</label>
                    <select
                      required
                      name="service"
                      value={form.service}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-white"
                    >
                      <option value="">Select a service</option>
                      {SERVICES.map((s) => (
                        <option key={s} value={s}>
                          {s}
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Plan + Preferred Date */}
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Plan (optional)</label>
                    <select
                      name="plan"
                      value={form.plan}
                      onChange={handleChange}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all bg-white"
                    >
                      <option value="">Select a plan</option>
                      {PLANS.map((p) => (
                        <option key={p} value={p}>
                          {p}
                        </option>
                      ))}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-1.5">Preferred Date</label>
                    <input
                      type="date"
                      name="preferredDate"
                      value={form.preferredDate}
                      onChange={handleChange}
                      min={new Date().toISOString().split("T")[0]}
                      className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all"
                    />
                  </div>
                </div>

                {/* Notes */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-1.5">Additional Notes</label>
                  <textarea
                    name="notes"
                    value={form.notes}
                    onChange={handleChange}
                    rows={3}
                    placeholder="Any special requirements or information we should know..."
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:border-amber-400 focus:ring-2 focus:ring-amber-200 outline-none transition-all resize-none"
                  />
                </div>

                {status === "error" && errorMsg && (
                  <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-xl text-sm">
                    {errorMsg}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "submitting"}
                  className="w-full bg-gradient-to-r from-amber-500 to-rose-500 text-white py-4 rounded-full font-semibold text-lg hover:shadow-xl hover:scale-[1.02] transition-all disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100"
                >
                  {status === "submitting" ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" viewBox="0 0 24 24" fill="none">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z"
                        />
                      </svg>
                      Booking...
                    </span>
                  ) : (
                    "Confirm Booking"
                  )}
                </button>
              </form>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
