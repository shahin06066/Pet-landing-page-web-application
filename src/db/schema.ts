import { pgTable, serial, text, timestamp, varchar } from "drizzle-orm/pg-core";

export const bookings = pgTable("bookings", {
  id: serial("id").primaryKey(),
  ownerName: varchar("owner_name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  petName: varchar("pet_name", { length: 200 }).notNull(),
  petType: varchar("pet_type", { length: 50 }).notNull(),
  service: varchar("service", { length: 200 }).notNull(),
  plan: varchar("plan", { length: 50 }),
  preferredDate: varchar("preferred_date", { length: 50 }),
  notes: text("notes"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const contactMessages = pgTable("contact_messages", {
  id: serial("id").primaryKey(),
  name: varchar("name", { length: 200 }).notNull(),
  email: varchar("email", { length: 200 }).notNull(),
  phone: varchar("phone", { length: 50 }),
  subject: varchar("subject", { length: 300 }),
  message: text("message").notNull(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});
