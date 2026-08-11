"use client";

import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import BookingModal from "@/components/BookingModal";
import ContactSection from "@/components/ContactSection";

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
  const heroRef = useRef<HTMLDivElement>(null);
  const featuresRef = useRef<HTMLDivElement>(null);
  const galleryRef = useRef<HTMLDivElement>(null);
  const testimonialsRef = useRef<HTMLDivElement>(null);

  const [isBookingOpen, setIsBookingOpen] = useState(false);
  const [preselectedPlan, setPreselectedPlan] = useState<string | null>(null);
  const [preselectedService, setPreselectedService] = useState<string | null>(null);

  const openBooking = (plan?: string, service?: string) => {
    setPreselectedPlan(plan || null);
    setPreselectedService(service || null);
    setIsBookingOpen(true);
  };

  useEffect(() => {
    // Hero animations
    const heroTl = gsap.timeline();
    heroTl.fromTo(
      ".hero-title",
      { y: 100, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    );
    heroTl.fromTo(
      ".hero-subtitle",
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" },
      "-=0.8"
    );
    heroTl.fromTo(
      ".hero-cta",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, ease: "power3.out" },
      "-=0.6"
    );
    heroTl.fromTo(
      ".hero-image",
      { scale: 1.2, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1.5, ease: "power3.out" },
      "-=1.2"
    );

    // Parallax effect for hero image
    gsap.to(".hero-image", {
      yPercent: 20,
      ease: "none",
      scrollTrigger: {
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // Features section animations
    gsap.fromTo(
      ".feature-card",
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
          trigger: featuresRef.current,
          start: "top 80%",
        },
      }
    );

    // Gallery animations
    gsap.fromTo(
      ".gallery-item",
      { scale: 0.8, opacity: 0, rotation: -5 },
      {
        scale: 1,
        opacity: 1,
        rotation: 0,
        duration: 0.8,
        stagger: 0.12,
        ease: "back.out(1.7)",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 75%",
        },
      }
    );

    // Testimonials animations
    gsap.fromTo(
      ".testimonial-card",
      { x: -100, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: testimonialsRef.current,
          start: "top 80%",
        },
      }
    );

    // Floating animation for decorative elements
    gsap.to(".floating", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Navbar scroll effect
    const navbar = document.querySelector(".navbar");
    const handleScroll = () => {
      if (window.scrollY > 50) {
        navbar?.classList.add("scrolled");
      } else {
        navbar?.classList.remove("scrolled");
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 via-orange-50 to-rose-50">
      {/* Navigation */}
      <nav className="navbar fixed top-0 left-0 right-0 z-50 transition-all duration-300 px-6 py-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="text-3xl">🐾</span>
            <span className="text-2xl font-bold bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Pawfect
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Services
            </a>
            <a href="#gallery" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Gallery
            </a>
            <a href="#testimonials" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Reviews
            </a>
            <a href="#pricing" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Pricing
            </a>
            <a href="#contact" className="text-gray-700 hover:text-amber-600 transition-colors font-medium">
              Contact
            </a>
          </div>
          <button
            onClick={() => openBooking()}
            className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300"
          >
            Book Now
          </button>
        </div>
      </nav>

      {/* Hero Section */}
      <section ref={heroRef} className="relative min-h-screen flex items-center justify-center pt-20 overflow-hidden">
        <div className="floating absolute top-32 left-10 text-6xl opacity-20">🐾</div>
        <div className="floating absolute top-48 right-20 text-5xl opacity-20" style={{ animationDelay: "0.5s" }}>
          ❤️
        </div>
        <div className="floating absolute bottom-32 left-20 text-5xl opacity-20" style={{ animationDelay: "1s" }}>
          ⭐
        </div>

        <div className="max-w-7xl mx-auto px-6 grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="hero-title inline-flex items-center gap-2 bg-white/70 backdrop-blur-sm border border-amber-200 px-4 py-2 rounded-full text-sm font-medium text-amber-700 shadow-sm">
              <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse"></span>
              Premium Pet Care, Redefined
            </div>
            <h1 className="hero-title text-6xl md:text-7xl font-bold leading-[1.05] tracking-tight">
              Premium Care for Your{" "}
              <span className="bg-gradient-to-r from-amber-600 via-orange-600 to-rose-600 bg-clip-text text-transparent">
                Furry Friends
              </span>
            </h1>
            <p className="hero-subtitle text-xl text-gray-700 leading-relaxed">
              Experience the finest pet care services with love, attention, and expertise. Your pet deserves nothing
              but the best.
            </p>
            <div className="hero-cta flex flex-wrap gap-4">
              <button
                onClick={() => openBooking()}
                className="bg-gradient-to-r from-amber-500 to-rose-500 text-white px-8 py-4 rounded-full font-semibold text-lg hover:shadow-2xl hover:scale-105 transition-all duration-300"
              >
                Get Started
              </button>
              <a
                href="#features"
                className="border-2 border-amber-500 text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:bg-amber-50 transition-all duration-300 inline-flex items-center"
              >
                Learn More
              </a>
            </div>
            <div className="flex items-center gap-8 pt-4">
              <div>
                <div className="text-3xl font-bold text-gray-900">10K+</div>
                <div className="text-sm text-gray-600">Happy Pets</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">4.9⭐</div>
                <div className="text-sm text-gray-600">Rating</div>
              </div>
              <div>
                <div className="text-3xl font-bold text-gray-900">15+</div>
                <div className="text-sm text-gray-600">Years Exp</div>
              </div>
            </div>
          </div>
          <div className="relative hero-image">
            <div className="absolute inset-0 bg-gradient-to-r from-amber-400 to-rose-400 rounded-3xl blur-3xl opacity-30"></div>
            <img
              src="/images/hero-pet.jpg"
              alt="Happy golden retriever"
              className="relative rounded-3xl shadow-2xl object-cover w-full h-[600px]"
            />
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section ref={featuresRef} id="features" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Our Premium Services
            </h2>
            <p className="text-xl text-gray-700">Everything your pet needs to live their best life</p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { icon: "🏥", title: "Health Check", desc: "Comprehensive veterinary care" },
              { icon: "✂️", title: "Grooming Spa", desc: "Luxury grooming treatments" },
              { icon: "🦴", title: "Premium Food", desc: "Organic nutrition plans" },
              { icon: "🎾", title: "Play & Exercise", desc: "Fun activities & training" },
              { icon: "🏠", title: "Pet Boarding", desc: "Comfortable stay services" },
              { icon: "🚗", title: "Pet Transport", desc: "Safe pickup & delivery" },
              { icon: "💊", title: "Wellness Plans", desc: "Preventive healthcare" },
              { icon: "🎓", title: "Training", desc: "Professional pet training" },
            ].map((feature, index) => (
              <button
                key={index}
                onClick={() => openBooking(undefined, feature.title)}
                className="feature-card group bg-white rounded-2xl p-6 shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer border border-gray-100 text-left"
              >
                <div className="text-5xl mb-4 group-hover:scale-110 transition-transform duration-300">
                  {feature.icon}
                </div>
                <h3 className="text-xl font-bold mb-2 text-gray-900">{feature.title}</h3>
                <p className="text-gray-600 mb-3">{feature.desc}</p>
                <span className="text-amber-600 font-semibold text-sm inline-flex items-center gap-1 group-hover:gap-2 transition-all">
                  Book now <span>→</span>
                </span>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section ref={galleryRef} id="gallery" className="py-24 px-6 bg-gradient-to-b from-transparent to-amber-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Happy Moments
            </h2>
            <p className="text-xl text-gray-700">Capturing joy, one paw at a time</p>
          </div>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-5">
            {[
              { src: "/images/puppy-play.jpg", alt: "Playful puppy" },
              { src: "/images/cat-portrait.jpg", alt: "Elegant cat" },
              { src: "/images/pet-grooming.jpg", alt: "Pet grooming" },
              { src: "/images/pet-outdoor.jpg", alt: "Outdoor adventure" },
              { src: "/images/hero-pet.jpg", alt: "Golden retriever" },
              { src: "/images/pug-portrait.jpg", alt: "Charming pug" },
            ].map((image, index) => (
              <div key={index} className="gallery-item relative group overflow-hidden rounded-2xl shadow-lg">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-4">
                  <p className="text-white font-semibold">{image.alt}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section ref={testimonialsRef} id="testimonials" className="py-24 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              What Pet Parents Say
            </h2>
            <p className="text-xl text-gray-700">Real stories from our happy clients</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Sarah Johnson",
                pet: "Max (Golden Retriever)",
                text: "Absolutely amazing service! Max loves coming here and the staff treats him like family.",
                rating: 5,
              },
              {
                name: "Michael Chen",
                pet: "Luna (Persian Cat)",
                text: "The grooming spa is incredible. Luna always comes back looking and feeling fantastic!",
                rating: 5,
              },
              {
                name: "Emily Rodriguez",
                pet: "Charlie (Labrador)",
                text: "Best pet care experience ever. Professional, loving, and truly exceptional service.",
                rating: 5,
              },
            ].map((testimonial, index) => (
              <div
                key={index}
                className="testimonial-card bg-white rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300"
              >
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-2xl">
                      ⭐
                    </span>
                  ))}
                </div>
                <p className="text-gray-700 mb-6 text-lg italic">&ldquo;{testimonial.text}&rdquo;</p>
                <div className="border-t pt-4">
                  <div className="font-bold text-gray-900">{testimonial.name}</div>
                  <div className="text-sm text-gray-600">{testimonial.pet}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Pricing Section */}
      <section id="pricing" className="py-24 px-6 bg-gradient-to-b from-amber-50 to-rose-50">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-5xl font-bold mb-4 bg-gradient-to-r from-amber-600 to-rose-600 bg-clip-text text-transparent">
              Simple Pricing
            </h2>
            <p className="text-xl text-gray-700">Choose the perfect plan for your pet</p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "Basic",
                price: "$29",
                features: ["Basic grooming", "Health check", "Playtime", "Basic nutrition"],
                popular: false,
              },
              {
                name: "Premium",
                price: "$79",
                features: [
                  "Full grooming spa",
                  "Comprehensive health",
                  "Unlimited playtime",
                  "Premium nutrition",
                  "Training sessions",
                  "24/7 support",
                ],
                popular: true,
              },
              {
                name: "Elite",
                price: "$149",
                features: [
                  "All Premium features",
                  "Personal trainer",
                  "Luxury boarding",
                  "Pet transport",
                  "Wellness plans",
                  "Priority booking",
                ],
                popular: false,
              },
            ].map((plan, index) => (
              <div
                key={index}
                className={`relative rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 ${
                  plan.popular
                    ? "bg-gradient-to-br from-amber-500 to-rose-500 text-white scale-105"
                    : "bg-white"
                }`}
              >
                {plan.popular && (
                  <div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-white text-amber-600 px-6 py-2 rounded-full font-bold text-sm shadow-lg">
                    Most Popular
                  </div>
                )}
                <h3 className={`text-2xl font-bold mb-2 ${plan.popular ? "text-white" : "text-gray-900"}`}>
                  {plan.name}
                </h3>
                <div className="mb-6">
                  <span className={`text-5xl font-bold ${plan.popular ? "text-white" : "text-gray-900"}`}>
                    {plan.price}
                  </span>
                  <span className={plan.popular ? "text-white/80" : "text-gray-600"}>/month</span>
                </div>
                <ul className="space-y-3 mb-8">
                  {plan.features.map((feature, i) => (
                    <li key={i} className="flex items-center gap-2">
                      <span className="text-xl">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <button
                  onClick={() => openBooking(plan.name)}
                  className={`w-full py-3 rounded-full font-semibold transition-all duration-300 ${
                    plan.popular
                      ? "bg-white text-amber-600 hover:scale-105"
                      : "bg-gradient-to-r from-amber-500 to-rose-500 text-white hover:scale-105"
                  }`}
                >
                  Choose Plan
                </button>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="bg-gradient-to-br from-amber-500 to-rose-500 rounded-3xl p-12 shadow-2xl relative overflow-hidden">
            <div className="floating absolute top-8 right-8 text-6xl opacity-20">🐾</div>
            <div className="floating absolute bottom-8 left-8 text-6xl opacity-20" style={{ animationDelay: "1s" }}>
              ❤️
            </div>
            <h2 className="text-5xl font-bold text-white mb-6">Ready to Give Your Pet the Best?</h2>
            <p className="text-xl text-white/90 mb-8">
              Join thousands of happy pet parents who trust us with their furry family members
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => openBooking()}
                className="bg-white text-amber-600 px-8 py-4 rounded-full font-semibold text-lg hover:scale-105 transition-all duration-300 shadow-lg"
              >
                Start Free Trial
              </button>
              <a
                href="#contact"
                className="border-2 border-white text-white px-8 py-4 rounded-full font-semibold text-lg hover:bg-white/10 transition-all duration-300 inline-flex items-center"
              >
                Contact Us
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <ContactSection />

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <span className="text-3xl">🐾</span>
                <span className="text-2xl font-bold">Pawfect</span>
              </div>
              <p className="text-gray-400">Premium pet care services with love and expertise.</p>
            </div>
            <div>
              <h4 className="font-bold mb-4">Services</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Grooming</li>
                <li>Health Care</li>
                <li>Training</li>
                <li>Boarding</li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Company</h4>
              <ul className="space-y-2 text-gray-400">
                <li>About Us</li>
                <li>Careers</li>
                <li>Blog</li>
                <li>
                  <a href="#contact" className="hover:text-amber-400 transition-colors">
                    Contact
                  </a>
                </li>
              </ul>
            </div>
            <div>
              <h4 className="font-bold mb-4">Connect</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Facebook</li>
                <li>Instagram</li>
                <li>Twitter</li>
                <li>YouTube</li>
              </ul>
            </div>
          </div>
          <div className="border-t border-gray-800 pt-8 text-center text-gray-400">
            <p>&copy; 2026 Pawfect. All rights reserved. Made with ❤️ for pets.</p>
          </div>
        </div>
      </footer>

      {/* Booking Modal */}
      <BookingModal
        isOpen={isBookingOpen}
        onClose={() => setIsBookingOpen(false)}
        preselectedPlan={preselectedPlan}
        preselectedService={preselectedService}
      />
    </div>
  );
}
