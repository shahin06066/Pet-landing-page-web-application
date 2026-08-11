# 🐾 Pawfect — Premium Pet Care

A polished, high-converting landing page for a premium pet care service, built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**. The site showcases the full range of services — grooming, boarding, daycare, training, and more — with a photo gallery, customer testimonials, pricing plans, an interactive booking flow, and server-backed contact & booking forms.

**Live site:** [https://pawfect-pet-care.vercel.app](https://pawfect-pet-care.vercel.app)

![Next.js](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![React](https://img.shields.io/badge/React-19-61dafb) ![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1)

---

## Table of Contents

- [Features](#features)
- [Tech Stack](#tech-stack)
- [Project Structure](#project-structure)
- [Getting Started](#getting-started)
- [API Reference](#api-reference)
- [Deployment](#deployment)
- [Photo Attribution](#photo-attribution)
- [License](#license)

---

## Features

- **Hero section** — attention-grabbing intro with real pet photography and smooth GSAP animations
- **Service catalog** — 8 detailed service offerings (grooming, boarding, daycare, training & more)
- **Photo gallery** — high-quality, real pet photos
- **Testimonials** — authentic customer reviews
- **Pricing plans** — Basic, Premium & Elite tiers
- **Booking flow** — fully interactive booking modal
- **Contact form** — with server-side validation
- **API layer** — bookings & contact messages persisted to PostgreSQL via Drizzle ORM
- **Responsive design** — mobile-first, accessible on all screen sizes
- **Animations** — smooth GSAP-powered scroll interactions

## Tech Stack

| Technology     | Purpose                      |
| -------------- | ---------------------------- |
| Next.js 16     | React framework (App Router) |
| React 19       | UI library                   |
| TypeScript 5.9 | Type safety                  |
| Tailwind CSS 4 | Styling                      |
| GSAP           | Animations                   |
| Drizzle ORM    | Database access & schema     |
| PostgreSQL     | Database                     |
| pg             | PostgreSQL driver            |

## Project Structure

```
├── public/images/            # Static images (real pet photos)
├── src/
│   ├── app/
│   │   ├── api/
│   │   │   ├── bookings/     # POST /api/bookings
│   │   │   ├── contact/      # POST /api/contact
│   │   │   └── health/       # GET  /api/health
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx          # Main landing page
│   ├── components/
│   │   ├── BookingModal.tsx  # Booking modal component
│   │   └── ContactSection.tsx
│   └── db/
│       ├── index.ts          # Drizzle DB connection (lazy-initialized)
│       └── schema.ts         # Database schema (bookings, contact_messages)
├── drizzle.config.json       # Drizzle CLI config
├── next.config.ts
├── package.json
└── tsconfig.json
```

## Getting Started

### Prerequisites

- **Node.js** 18.18+ (20+ recommended)
- **PostgreSQL** database (local or cloud, e.g. Neon, Supabase, Vercel Postgres)

### 1. Clone & Install

```bash
git clone https://github.com/shahin06066/Pet-landing-page-web-application.git
cd Pet-landing-page-web-application
npm install
```

### 2. Configure Environment Variables

Create a `.env` file in the project root:

```bash
# Required for the booking & contact API routes
DATABASE_URL=postgresql://user:password@localhost:5432/pet_care
```

> **Note:** The site renders fine without a database — `DATABASE_URL` is only consulted when a visitor submits a booking or contact message (the `/api/bookings`, `/api/contact`, and `/api/health` routes).

### 3. Set Up the Database

```bash
# Create the tables from the Drizzle schema
npx drizzle-kit push

# Or generate & run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4. Run the App

```bash
# Development
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm run start
```

### 5. Quality Checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking
```

## API Reference

| Method | Endpoint        | Description                                 |
| ------ | --------------- | ------------------------------------------- |
| POST   | `/api/bookings` | Create a new booking (validated & stored)   |
| POST   | `/api/contact`  | Send a contact message (validated & stored) |
| GET    | `/api/health`   | Database health check (`{ ok: true }`)      |

**POST `/api/bookings`** — accepts `ownerName`, `email`, `phone`, `petName`, `petType`, `service`, `plan`, `preferredDate`, `notes`. Returns `201` with the created booking on success.

**POST `/api/contact`** — accepts `name`, `email`, `phone`, `subject`, `message`. Requires `name`, `email`, and a `message` of at least 10 characters.

## Deployment

The site is deployed to **Vercel** and wired to the GitHub repository for continuous deployment — every push to `main` triggers an automatic production deploy, and pull requests receive preview deployments automatically.

Production environment: set the `DATABASE_URL` environment variable to a reachable cloud PostgreSQL connection string for the booking and contact forms to persist data.

## Photo Attribution

All photographs used on this site are sourced from [Unsplash](https://unsplash.com) and are used under the [Unsplash License](https://unsplash.com/license), which permits free commercial and non-commercial use. Attribution is provided as a courtesy:

| Image (file)       | Description                          | Photographer     | Source                                                                         |
| ------------------ | ------------------------------------ | ---------------- | ------------------------------------------------------------------------------ |
| `hero-pet.jpg`     | Golden retriever on the beach        | Oscar Sutton     | [View photo](https://unsplash.com/photos/dog-running-on-beach-during-daytime-yihlaRCCvd4) |
| `puppy-play.jpg`   | French bulldog puppy in yellow shirt | Karsten Winegeart | [View photo](https://unsplash.com/photos/brown-french-bulldog-wearing-yellow-shirt-5PVXkqt2s9k) |
| `cat-portrait.jpg` | White & brown cat                    | Alvan Nee        | [View photo](https://unsplash.com/photos/white-and-brown-long-fur-cat-ZCHj_2lJP00) |
| `pet-grooming.jpg` | Dog being groomed                    | Autri Taheri     | [View photo](https://unsplash.com/photos/l0Gq4BmboYY)                          |
| `pet-outdoor.jpg`  | White dog near a mountain lake       | Jf Brou          | [View photo](https://unsplash.com/photos/a-white-dog-sitting-on-a-rock-formation-near-a-large-mountain-pond-915UJQaxtrk) |
| `pug-portrait.jpg` | Pug wearing a hoodie                 | Charles Deluvio  | [View photo](https://unsplash.com/photos/a-dog-wearing-a-hoodie-with-a-star-trek-symbol-on-it-bYXP-ITv4_s) |

### Footer credit

```html
Photos by <a href="https://unsplash.com">Unsplash</a>
```

For individual credits, use the standard "Photo by [Name] on [Unsplash](https://unsplash.com)" format, linking to each photo above.

## License

**Code:** All rights reserved. This project is proprietary and is **not** open source. The source code may not be copied, modified, distributed, or used in any form without explicit written permission from the owner.

**Photos:** Licensed under the [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use).

**© 2026 Pawfect. All rights reserved.**
