# 🐾 Pawfect — Premium Pet Care Landing Page

A beautifully crafted, high-converting landing page for a premium pet care service. Built with **Next.js 16**, **React 19**, **TypeScript**, and **Tailwind CSS 4**, it features a hero section, service cards, photo gallery, customer testimonials, pricing plans, a booking modal, and a contact form backed by a PostgreSQL database.

![Tech Stack](https://img.shields.io/badge/Next.js-16-black) ![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue) ![React](https://img.shields.io/badge/React-19-61dafb) ![Tailwind](https://img.shields.io/badge/Tailwind_CSS-4-38bdf8) ![PostgreSQL](https://img.shields.io/badge/PostgreSQL-16-4169e1)

---

## ✨ Features

- **Hero section** — eye-catching intro with a real golden retriever photo and GSAP-powered animations
- **Premium services** — 8 detailed service cards (grooming, boarding, daycare, training & more)
- **Photo gallery** — real, high-quality pet photos
- **Testimonials** — happy customer reviews
- **Pricing plans** — Basic, Premium & Elite tiers
- **Booking modal** — fully interactive booking flow
- **Contact section** — form with server-side validation
- **API routes** — bookings & contact messages stored in PostgreSQL via Drizzle ORM
- **Fully responsive** — mobile-first design
- **Animations** — smooth GSAP scroll animations

## 🛠️ Tech Stack

| Technology     | Purpose                          |
| -------------- | -------------------------------- |
| Next.js 16     | React framework (App Router)     |
| React 19       | UI library                       |
| TypeScript 5.9 | Type safety                      |
| Tailwind CSS 4 | Styling                          |
| GSAP 3.15      | Animations                       |
| Drizzle ORM    | Database access & schema         |
| PostgreSQL     | Database                         |
| pg             | PostgreSQL driver                |

## 📁 Project Structure

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
│       ├── index.ts          # Drizzle DB connection
│       └── schema.ts         # Database schema (bookings, contact_messages)
├── drizzle.config.json       # Drizzle CLI config
├── next.config.ts
├── package.json
└── tsconfig.json
```

## 🚀 Getting Started

### Prerequisites

- **Node.js** 18.18+ (or 20+ recommended)
- **PostgreSQL** database (local or cloud, e.g. Neon, Supabase)

### 1. Clone & install

```bash
git clone https://github.com/shahin06066/Pet-landing-page-web-application.git
cd Pet-landing-page-web-application
npm install
```

### 2. Configure environment variables

Create a `.env` file in the project root:

```bash
# Required for the booking & contact API routes
DATABASE_URL=postgresql://user:password@localhost:5432/pet_care
```

> **Note:** The site itself renders fine without a database — the `DATABASE_URL` is only used when submitting bookings or contact messages (the `/api/bookings`, `/api/contact`, and `/api/health` routes).

### 3. Set up the database

```bash
# Create the tables from the Drizzle schema
npx drizzle-kit push

# Or generate & run migrations
npx drizzle-kit generate
npx drizzle-kit migrate
```

### 4. Run the app

```bash
# Development
npm run dev
# → http://localhost:3000

# Production build
npm run build
npm run start
```

### 5. Quality checks

```bash
npm run lint       # ESLint
npm run typecheck  # TypeScript type checking
```

## 🔌 API Reference

| Method | Endpoint         | Description                                |
| ------ | ---------------- | ------------------------------------------ |
| POST   | `/api/bookings`  | Create a new booking (validates & stores)  |
| POST   | `/api/contact`   | Send a contact message (validates & stores)|
| GET    | `/api/health`    | Database health check (`{ ok: true }`)     |

**POST `/api/bookings`** — accepts `ownerName`, `email`, `phone`, `petName`, `petType`, `service`, `plan`, `preferredDate`, `notes`. Returns `201` with the created booking on success.

**POST `/api/contact`** — accepts `name`, `email`, `phone`, `subject`, `message`. Requires `name`, `email`, and a `message` of at least 10 characters.

## 📸 Photo Attribution

All photos used on this site are from [Unsplash](https://unsplash.com) and are free to use under the [Unsplash License](https://unsplash.com/license) (free for commercial and non-commercial use). Attribution is provided as good practice:

| Image (file)        | Description                        | Photographer     | Source                                                                  |
| ------------------- | ---------------------------------- | ---------------- | ----------------------------------------------------------------------- |
| `hero-pet.jpg`      | Golden retriever on the beach      | Oscar Sutton     | [View photo](https://unsplash.com/photos/dog-running-on-beach-during-daytime-yihlaRCCvd4) |
| `puppy-play.jpg`    | French bulldog puppy in yellow shirt | Karsten Winegeart | [View photo](https://unsplash.com/photos/brown-french-bulldog-wearing-yellow-shirt-5PVXkqt2s9k) |
| `cat-portrait.jpg`  | White & brown cat                  | Alvan Nee        | [View photo](https://unsplash.com/photos/white-and-brown-long-fur-cat-ZCHj_2lJP00) |
| `pet-grooming.jpg`  | Dog being groomed                  | Autri Taheri     | [View photo](https://unsplash.com/photos/l0Gq4BmboYY)                   |
| `pet-outdoor.jpg`   | White dog near a mountain lake     | Jf Brou          | [View photo](https://unsplash.com/photos/a-white-dog-sitting-on-a-rock-formation-near-a-large-mountain-pond-915UJQaxtrk) |
| `pug-portrait.jpg`  | Pug wearing a hoodie               | Charles Deluvio  | [View photo](https://unsplash.com/photos/a-dog-wearing-a-hoodie-with-a-star-trek-symbol-on-it-bYXP-ITv4_s) |

### Recommended footer credit

```html
Photos by <a href="https://unsplash.com">Unsplash</a>
```

Or, for individual credits, use the standard "Photo by [Name] on [Unsplash](https://unsplash.com)" format linked to each photo above.

## 📄 License

- **Code:** This project is open source — feel free to use, modify, and learn from it.
- **Photos:** Licensed under the [Unsplash License](https://unsplash.com/license).
