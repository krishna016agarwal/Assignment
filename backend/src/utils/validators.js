import { z } from "zod";

export const registerSchema = z.object({
  name: z.string().min(2, "Name is required"),
  email: z.string().email("Valid email required"),
  password: z.string().min(6, "Password must be at least 6 characters")
});

export const loginSchema = z.object({
  email: z.string().email("Valid email required"),
  password: z.string().min(1, "Password is required")
});

export const volunteerSchema = z.object({
  fullName: z.string().min(2),
  email: z.string().email(),
  phone: z.string().min(8),
  city: z.string().min(2),
  state: z.string().min(2),
  age: z.coerce.number().min(14).max(80),
  gender: z.enum(["Male", "Female", "Other", "Prefer not to say"]),
  interestArea: z.enum(["Education", "Fundraising", "Social Media", "Field Work", "Events", "Content", "Operations"]),
  availability: z.enum(["Weekdays", "Weekends", "Flexible"]),
  skills: z.array(z.string()).default([]),
  motivation: z.string().min(10).max(1000)
});
