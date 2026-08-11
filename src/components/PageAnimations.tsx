"use client";

import { useEffect, type ReactNode } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function PageAnimations({ children }: { children: ReactNode }) {
  useEffect(() => {
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

    // Skip decorative animations for users who prefer reduced motion
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return () => window.removeEventListener("scroll", handleScroll);
    }

    // Hero entrance timeline
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
    const heroSection = document.getElementById("hero");
    if (heroSection) {
      gsap.to(".hero-image", {
        yPercent: 20,
        ease: "none",
        scrollTrigger: {
          trigger: heroSection,
          start: "top top",
          end: "bottom top",
          scrub: true,
        },
      });
    }

    // Features section animations
    const featuresSection = document.getElementById("features");
    if (featuresSection) {
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
            trigger: featuresSection,
            start: "top 80%",
          },
        }
      );
    }

    // Gallery animations
    const gallerySection = document.getElementById("gallery");
    if (gallerySection) {
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
            trigger: gallerySection,
            start: "top 75%",
          },
        }
      );
    }

    // Testimonials animations
    const testimonialsSection = document.getElementById("testimonials");
    if (testimonialsSection) {
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
            trigger: testimonialsSection,
            start: "top 80%",
          },
        }
      );
    }

    // Floating animation for decorative elements
    gsap.to(".floating", {
      y: -20,
      duration: 2,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
    });

    // Lazy-loaded gallery images shift layout after mount, so re-measure
    // scroll positions once everything has loaded
    const refreshTriggers = () => ScrollTrigger.refresh();
    window.addEventListener("load", refreshTriggers);

    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("load", refreshTriggers);
    };
  }, []);

  return <>{children}</>;
}
